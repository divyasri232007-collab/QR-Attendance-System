
export enum UserRole {
    Admin = 'admin',
    Student = 'student',
}

export enum EventType {
    Entry = 'entry',
    Exit = 'exit',
}

export interface QRCodeData {
    sessionId: string;
    eventType: EventType;
}

export interface GeoLocation {
    latitude: number;
    longitude: number;
}

export interface AttendanceData {
    sessionId: string;
    eventType: EventType;
    deviceId: string;
    location: GeoLocation;
    ipAddress: string;
}

export interface AttendanceRecord extends AttendanceData {
    id: string;
    timestamp: string;
}
