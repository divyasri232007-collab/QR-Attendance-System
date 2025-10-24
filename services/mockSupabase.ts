
import { AttendanceData, AttendanceRecord, EventType } from '../types';

// Use a simple in-memory array to simulate the Supabase table
const mockDatabase: AttendanceRecord[] = [];

// Function to get the current log
export const getAttendanceLog = (): AttendanceRecord[] => {
    return [...mockDatabase];
};

// Function to simulate recording attendance
export const recordAttendance = (data: AttendanceData): Promise<AttendanceRecord> => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            // Simulate server-side validation
            const isDuplicate = mockDatabase.some(
                record => record.sessionId === data.sessionId && record.deviceId === data.deviceId && record.eventType === data.eventType
            );

            if (isDuplicate) {
                return reject(new Error('Duplicate attendance record for this session event.'));
            }

            // Simulate creating a new record with a server-side timestamp and ID
            const newRecord: AttendanceRecord = {
                ...data,
                id: `rec_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
                timestamp: new Date().toISOString(),
            };

            mockDatabase.push(newRecord);
            console.log('Mock Supabase: New record added', newRecord);
            console.log('Mock Supabase: Current DB state', mockDatabase);

            resolve(newRecord);
        }, 1000); // Simulate network latency
    });
};
