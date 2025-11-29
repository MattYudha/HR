import attendanceRepository from './attendance.repository';
import employeesRepository from '../employees/employees.repository';

export class AttendanceService {
  async checkIn(userId: string) {
    const employee = await employeesRepository.findEmployeeByUserId(userId);

    if (!employee) {
      throw new Error('Employee not found');
    }

    const today = new Date();
    const existingAttendance = await attendanceRepository.findAttendanceByEmployeeAndDate(
      employee.id,
      today
    );

    if (existingAttendance) {
      throw new Error('Already checked in today');
    }

    return await attendanceRepository.createAttendance({
      employeeId: employee.id,
      checkIn: new Date(),
      date: today,
      status: 'PRESENT'
    });
  }

  async checkOut(userId: string) {
    const employee = await employeesRepository.findEmployeeByUserId(userId);

    if (!employee) {
      throw new Error('Employee not found');
    }

    const today = new Date();
    const attendance = await attendanceRepository.findAttendanceByEmployeeAndDate(
      employee.id,
      today
    );

    if (!attendance) {
      throw new Error('No check-in record found for today');
    }

    if (attendance.checkOut) {
      throw new Error('Already checked out today');
    }

    return await attendanceRepository.updateAttendance(attendance.id, {
      checkOut: new Date()
    });
  }

  async getMyAttendance(userId: string, from?: string, to?: string) {
    const employee = await employeesRepository.findEmployeeByUserId(userId);

    if (!employee) {
      throw new Error('Employee not found');
    }

    const fromDate = from ? new Date(from) : new Date(new Date().setDate(1));
    const toDate = to ? new Date(to) : new Date();

    return await attendanceRepository.findAttendancesByEmployeeAndDateRange(
      employee.id,
      fromDate,
      toDate
    );
  }
}

export default new AttendanceService();
