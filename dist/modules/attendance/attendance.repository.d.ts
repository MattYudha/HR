import { Attendance } from '@prisma/client';
export declare class AttendanceRepository {
    createAttendance(data: {
        employeeId: string;
        checkIn?: Date;
        checkOut?: Date;
        date: Date;
        status?: string;
        notes?: string;
    }): Promise<Attendance>;
    updateAttendance(id: string, data: Partial<Attendance>): Promise<Attendance>;
    findAttendanceByEmployeeAndDate(employeeId: string, date: Date): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        employeeId: string;
        checkIn: Date | null;
        checkOut: Date | null;
        date: Date;
        status: string;
        notes: string | null;
    } | null>;
    findAttendancesByEmployeeAndDateRange(employeeId: string, from: Date, to: Date): Promise<({
        employee: {
            user: {
                id: string;
                createdAt: Date;
                updatedAt: Date;
                email: string;
                password: string;
                roleId: string;
                isActive: boolean;
            };
        } & {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            userId: string;
            fullName: string;
            phone: string | null;
            address: string | null;
            position: string | null;
            department: string | null;
            joinDate: Date;
            baseSalary: import("@prisma/client-runtime-utils").Decimal;
        };
    } & {
        id: string;
        createdAt: Date;
        updatedAt: Date;
        employeeId: string;
        checkIn: Date | null;
        checkOut: Date | null;
        date: Date;
        status: string;
        notes: string | null;
    })[]>;
}
declare const _default: AttendanceRepository;
export default _default;
//# sourceMappingURL=attendance.repository.d.ts.map