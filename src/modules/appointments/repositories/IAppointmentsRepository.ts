import Appointment from '../infra/typeorm/entities/Appointment';

import ICreateAppointmentDTO from '../dtos/ICreateAppointmentDTO';
import IFindAllInMonthPerProviderDTO from '../dtos/IFindAllInMonthPerProviderDTO';
import IFindAllInDayPerProviderDTO from '../dtos/IFindAllInDayPerProviderDTO';

export default interface IAppointmentsRepository {
  create(data: ICreateAppointmentDTO): Promise<Appointment>;
  findByDate(data: Date, provider_id: string): Promise<Appointment | undefined>;
  findAllInMonthPerProvider(
    data: IFindAllInMonthPerProviderDTO,
  ): Promise<Appointment[]>;
  findAllInDayPerProvider(
    data: IFindAllInDayPerProviderDTO,
  ): Promise<Appointment[]>;
}
