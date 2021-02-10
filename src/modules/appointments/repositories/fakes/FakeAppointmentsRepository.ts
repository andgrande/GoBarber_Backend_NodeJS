import { v4 as uuid } from 'uuid';
import { isEqual, getMonth, getYear, getDate } from 'date-fns';
import IAppointmentsRepository from '@modules/appointments/repositories/IAppointmentsRepository';
import ICreateAppointmentDTO from '@modules/appointments/dtos/ICreateAppointmentDTO';
import Appointment from '@modules/appointments/infra/typeorm/entities/Appointment';
import IFindAllInMonthPerProviderDTO from '../../dtos/IFindAllInMonthPerProviderDTO';
import IFindAllInDayPerProviderDTO from '../../dtos/IFindAllInDayPerProviderDTO';

class AppointmentsRepository implements IAppointmentsRepository {
  private appointments: Appointment[] = [];

  public async findAllInDayPerProvider({
    provider_id,
    day,
    month,
    year,
  }: IFindAllInDayPerProviderDTO): Promise<Appointment[]> {
    const findAppointment = this.appointments.filter(
      appointment =>
        appointment.provider_id === provider_id &&
        // appointment.date.getDate() === day &&
        // appointment.date.getMonth() + 1 === month &&
        // appointment.date.getFullYear() === year,
        getMonth(appointment.date) + 1 === month &&
        getYear(appointment.date) === year &&
        getDate(appointment.date) === day,
    );

    return findAppointment;
  }

  public async findAllInMonthPerProvider({
    provider_id,
    month,
    year,
  }: IFindAllInMonthPerProviderDTO): Promise<Appointment[]> {
    const findAppointment = this.appointments.filter(
      appointment =>
        appointment.provider_id === provider_id &&
        getMonth(appointment.date) + 1 === month &&
        getYear(appointment.date) === year,
    );

    return findAppointment;
  }

  public async findByDate(
    date: Date,
    provider_id: string,
  ): Promise<Appointment | undefined> {
    const findAppointment = this.appointments.find(
      appointment =>
        isEqual(appointment.date, date) &&
        appointment.provider_id === provider_id,
    );

    return findAppointment;
  }

  public async create({
    provider_id,
    user_id,
    date,
  }: ICreateAppointmentDTO): Promise<Appointment> {
    const appointment = new Appointment();

    Object.assign(appointment, { id: uuid(), date, provider_id, user_id });

    this.appointments.push(appointment);

    return appointment;
  }
}

export default AppointmentsRepository;
