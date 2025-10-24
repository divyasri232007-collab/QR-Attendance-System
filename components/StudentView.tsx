
import React from 'react';
import { QRCodeData } from '../types';
import { CameraIcon, CheckCircleIcon, ExclamationTriangleIcon, SpinnerIcon } from './icons';

interface StudentViewProps {
    qrCodeData: QRCodeData | null;
    onScan: (data: QRCodeData) => void;
    isLoading: boolean;
    error: string | null;
    successMessage: string | null;
}

const StudentView: React.FC<StudentViewProps> = ({ qrCodeData, onScan, isLoading, error, successMessage }) => {
    const handleScanClick = () => {
        if (qrCodeData) {
            onScan(qrCodeData);
        } else {
            alert("No active QR code available to scan. Please ask the admin to generate one.");
        }
    };

    return (
        <div className="bg-white rounded-lg shadow-lg p-6 mb-6 text-center transform hover:scale-105 transition-transform duration-300">
            <h2 className="text-2xl font-bold text-brand-dark mb-2">Student Attendance</h2>
            <p className="text-gray-600 mb-6">
                Click the button below to scan the QR code displayed by your teacher/admin.
            </p>

            <button
                onClick={handleScanClick}
                disabled={!qrCodeData || isLoading}
                className="w-full bg-brand-primary hover:bg-blue-600 text-white font-bold py-4 px-4 rounded-lg transition-all duration-300 shadow-md hover:shadow-lg disabled:bg-gray-400 disabled:cursor-not-allowed flex items-center justify-center space-x-3 text-lg"
            >
                {isLoading ? (
                    <>
                        <SpinnerIcon />
                        <span>Scanning & Submitting...</span>
                    </>
                ) : (
                    <>
                        <CameraIcon />
                        <span>Scan Attendance QR Code</span>
                    </>
                )}
            </button>
            
            <div className="mt-4 min-h-[40px]">
                {successMessage && (
                    <div className="bg-green-100 border-l-4 border-green-500 text-green-700 p-3 rounded-md flex items-center animate-fade-in" role="alert">
                        <CheckCircleIcon />
                        <p className="ml-3 font-semibold">{successMessage}</p>
                    </div>
                )}
                {error && (
                    <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-3 rounded-md flex items-center animate-fade-in" role="alert">
                       <ExclamationTriangleIcon />
                        <p className="ml-3 font-semibold">{error}</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default StudentView;
