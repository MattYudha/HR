export declare class AttendanceService {
    checkIn(userId: string): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        employeeId: string;
        checkIn: Date | null;
        checkOut: Date | null;
        date: Date;
        status: string;
        notes: string | null;
    }>;
    checkOut(userId: string): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        employeeId: string;
        checkIn: Date | null;
        checkOut: Date | null;
        date: Date;
        status: string;
        notes: string | null;
    }>;
    getMyAttendance(userId: string, from?: string, to?: string): Promise<({
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
declare const _default: AttendanceService;
export default _default;
//# sourceMappingURL=attendance.service.d.ts.map