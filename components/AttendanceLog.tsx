
import React from 'react';
import { AttendanceRecord, EventType } from '../types';
import { LogIcon, LocationMarkerIcon } from './icons';

interface AttendanceLogProps {
    records: AttendanceRecord[];
}

const AttendanceLog: React.FC<AttendanceLogProps> = ({ records }) => {
    return (
        <div className="bg-white rounded-lg shadow-lg p-6">
             <div className="flex items-center mb-4">
                <LogIcon />
                <h2 className="text-2xl font-bold ml-3 text-brand-dark">Daily Attendance Log</h2>
            </div>
            <div className="overflow-x-auto">
                {records.length === 0 ? (
                    <p className="text-gray-500 text-center py-8">No attendance records yet.</p>
                ) : (
                    <ul className="space-y-4">
                        {records.slice().reverse().map((record) => (
                            <li key={record.id} className="bg-gray-50 p-4 rounded-lg shadow-sm border border-gray-200 animate-fade-in">
                                <div className="flex flex-col sm:flex-row justify-between sm:items-center">
                                    <div>
                                        <p className="font-semibold text-brand-dark">
                                            <span className={`px-2 py-1 rounded-full text-xs font-bold text-white ${record.eventType === EventType.Entry ? 'bg-brand-success' : 'bg-brand-danger'}`}>
                                                {record.eventType.toUpperCase()}
                                            </span>
                                            <span className="ml-3">{new Date(record.timestamp).toLocaleTimeString()}</span>
                                        </p>
                                        <p className="text-sm text-gray-500 mt-1 truncate">Device ID: {record.deviceId}</p>
                                    </div>
                                    <div className="flex items-center text-sm text-gray-600 mt-2 sm:mt-0">
                                        <LocationMarkerIcon />
                                        <span className="ml-1">{record.location.latitude.toFixed(4)}, {record.location.longitude.toFixed(4)}</span>
                                    </div>
                                </div>
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        </div>
    );
};

export default AttendanceLog;
