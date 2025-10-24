
import React, { useState, useEffect, useCallback } from 'react';
import AdminView from './components/AdminView';
import StudentView from './components/StudentView';
import AttendanceLog from './components/AttendanceLog';
import { UserRole, QRCodeData, AttendanceRecord, EventType } from './types';
import { recordAttendance, getAttendanceLog } from './services/mockSupabase';
import { AppIcon } from './components/icons';

const App: React.FC = () => {
    const [userRole, setUserRole] = useState<UserRole>(UserRole.Admin);
    const [qrCodeData, setQrCodeData] = useState<QRCodeData | null>(null);
    const [attendanceLog, setAttendanceLog] = useState<AttendanceRecord[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    const [successMessage, setSuccessMessage] = useState<string | null>(null);
    const [deviceId, setDeviceId] = useState<string>('');

    useEffect(() => {
        let storedDeviceId = localStorage.getItem('studentDeviceId');
        if (!storedDeviceId) {
            storedDeviceId = `device_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
            localStorage.setItem('studentDeviceId', storedDeviceId);
        }
        setDeviceId(storedDeviceId);
        setAttendanceLog(getAttendanceLog());
    }, []);

    const showTemporaryMessage = (setter: React.Dispatch<React.SetStateAction<string | null>>, message: string) => {
        setter(message);
        setTimeout(() => setter(null), 3000);
    };

    const handleScan = useCallback(async (scannedData: QRCodeData) => {
        setIsLoading(true);
        setError(null);
        setSuccessMessage(null);

        try {
            const position = await new Promise<GeolocationPosition>((resolve, reject) => {
                navigator.geolocation.getCurrentPosition(resolve, reject, {
                    enableHighAccuracy: true,
                    timeout: 5000,
                    maximumAge: 0
                });
            });

            const { latitude, longitude } = position.coords;
            const newRecord = await recordAttendance({
                sessionId: scannedData.sessionId,
                eventType: scannedData.eventType,
                deviceId,
                location: { latitude, longitude },
                ipAddress: `192.168.1.${Math.floor(Math.random() * 254) + 1}`, // Mock IP
            });

            setAttendanceLog(prevLog => [...prevLog, newRecord]);
            showTemporaryMessage(setSuccessMessage, `Attendance for ${scannedData.eventType.toUpperCase()} marked successfully!`);
        } catch (err: any) {
            if (err.code === err.PERMISSION_DENIED) {
                 showTemporaryMessage(setError, 'Location access denied. Please enable location services.');
            } else {
                 showTemporaryMessage(setError, err.message || 'An unexpected error occurred.');
            }
        } finally {
            setIsLoading(false);
        }
    }, [deviceId]);

    return (
        <div className="min-h-screen bg-gray-50 font-sans text-brand-dark">
            <header className="bg-white shadow-md">
                <div className="container mx-auto px-4 py-4 flex justify-between items-center">
                    <div className="flex items-center space-x-3">
                        <AppIcon />
                        <h1 className="text-2xl font-bold text-brand-primary">Attendance System</h1>
                    </div>
                    <div className="flex items-center bg-gray-200 rounded-full p-1">
                        <button
                            onClick={() => setUserRole(UserRole.Admin)}
                            className={`px-4 py-1.5 text-sm font-semibold rounded-full transition-colors duration-300 ${userRole === UserRole.Admin ? 'bg-brand-primary text-white shadow' : 'text-gray-600 hover:bg-gray-300'}`}
                        >
                            Admin
                        </button>
                        <button
                            onClick={() => setUserRole(UserRole.Student)}
                            className={`px-4 py-1.5 text-sm font-semibold rounded-full transition-colors duration-300 ${userRole === UserRole.Student ? 'bg-brand-primary text-white shadow' : 'text-gray-600 hover:bg-gray-300'}`}
                        >
                            Student
                        </button>
                    </div>
                </div>
            </header>

            <main className="container mx-auto p-4 md:p-6">
                <div className="max-w-2xl mx-auto">
                    {userRole === UserRole.Admin ? (
                        <AdminView setQrCodeData={setQrCodeData} qrCodeData={qrCodeData} />
                    ) : (
                        <StudentView
                            qrCodeData={qrCodeData}
                            onScan={handleScan}
                            isLoading={isLoading}
                            error={error}
                            successMessage={successMessage}
                        />
                    )}

                    <AttendanceLog records={attendanceLog} />
                </div>
            </main>
             <footer className="text-center py-4 text-gray-500 text-sm">
                <p>&copy; {new Date().getFullYear()} QR Attendance System. All rights reserved.</p>
            </footer>
        </div>
    );
};

export default App;
