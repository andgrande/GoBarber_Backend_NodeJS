import { isEqual } from "date-fns";
import Appointment from "../models/Appointment";

interface AppointmentDTO {
  service: string,
  date: Date
}

class AppointmentsRepository {
  private appointments: Appointment[];

  constructor() {
    this.appointments = [];

  }

  public getAllRepositories(): Appointment[] {
    return this.appointments;
  }

  public findAppointmentByDate(date: Date): Appointment | null {
    const appointmentDate = this.appointments.find(appointment =>
      isEqual(date, appointment.date)
    );

    return appointmentDate || null;
  }

  public createAppointment({ service, date } : AppointmentDTO): Appointment{
    const appointment = new Appointment({service, date});

    this.appointments.push(appointment);

    return appointment;
  }

}

export default AppointmentsRepository;
