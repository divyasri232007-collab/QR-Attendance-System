import React from 'react';
// FIX: The 'qrcode.react' library removed its default export in recent versions. Using a named import for `QRCodeCanvas` and aliasing it as `QRCode` for compatibility.
import { QRCodeCanvas as QRCode } from 'qrcode.react';
import { QRCodeData, EventType } from '../types';
import { QrCodeIcon } from './icons';

interface AdminViewProps {
    setQrCodeData: (data: QRCodeData | null) => void;
    qrCodeData: QRCodeData | null;
}

const AdminView: React.FC<AdminViewProps> = ({ setQrCodeData, qrCodeData }) => {
    const generateQRCode = (eventType: EventType) => {
        const newSessionId = `session_${Date.now()}`;
        setQrCodeData({ sessionId: newSessionId, eventType });
    };

    return (
        <div className="bg-white rounded-lg shadow-lg p-6 mb-6 transform hover:scale-105 transition-transform duration-300">
            <div className="flex items-center mb-4">
                <QrCodeIcon />
                <h2 className="text-2xl font-bold ml-3 text-brand-dark">Admin Panel: QR Code Generator</h2>
            </div>
            <p className="text-gray-600 mb-6">
                Generate a unique QR code for each attendance session. Students will scan this code to mark their attendance.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 mb-6">
                <button
                    onClick={() => generateQRCode(EventType.Entry)}
                    className="flex-1 bg-brand-success hover:bg-green-600 text-white font-bold py-3 px-4 rounded-lg transition-colors duration-300 shadow-md hover:shadow-lg"
                >
                    Generate ENTRY QR
                </button>
                <button
                    onClick={() => generateQRCode(EventType.Exit)}
                    className="flex-1 bg-brand-danger hover:bg-red-600 text-white font-bold py-3 px-4 rounded-lg transition-colors duration-300 shadow-md hover:shadow-lg"
                >
                    Generate EXIT QR
                </button>
            </div>

            {qrCodeData && (
                <div className="bg-gray-100 p-6 rounded-lg text-center animate-fade-in">
                    <h3 className="text-xl font-semibold mb-2">
                        Scan for: <span className={`font-bold ${qrCodeData.eventType === EventType.Entry ? 'text-brand-success' : 'text-brand-danger'}`}>{qrCodeData.eventType.toUpperCase()}</span>
                    </h3>
                    <p className="text-xs text-gray-500 mb-4 break-all">Session ID: {qrCodeData.sessionId}</p>
                    <div className="flex justify-center p-4 bg-white rounded-md shadow-inner">
                        <QRCode
                            value={JSON.stringify(qrCodeData)}
                            size={256}
                            level="H"
                            includeMargin={true}
                        />
                    </div>
                </div>
            )}
        </div>
    );
};

export default AdminView;
