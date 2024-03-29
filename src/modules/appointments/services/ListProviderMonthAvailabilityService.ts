import { injectable, inject } from 'tsyringe';

// import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import IAppointmentsRepository from '@modules/appointments/repositories/IAppointmentsRepository';

// import User from '@modules/users/infra/typeorm/entities/User';

interface IRequest {
  provider_id: string;
  month: number;
  year: number;
}

type IResponse = Array<{
  day: number;
  available: boolean;
}>;

@injectable()
class ListProviderMonthAvailabilityService {
  constructor(
    @inject('AppointmentsRepository')
    private appointmentsRepository: IAppointmentsRepository,
  ) {}

  public async execute({
    provider_id,
    month,
    year,
  }: IRequest): Promise<IResponse> {
    const appointmentsInMonth = await this.appointmentsRepository.findAllInMonthPerProvider(
      { provider_id, month, year },
    );

    const daysInCurrentMonth = new Date(year, month, 0).getDate();
    // const daysInCurrentMonth = getDaysInMonth(new Date(year, month - 1));
    const eachDayArray = Array.from(
      {
        length: daysInCurrentMonth,
      },
      (_, index) => index + 1,
    );

    const availability = eachDayArray.map(day => {
      const compareDate = new Date(year, month - 1, day, 23, 59, 59);

      const appointmentsInDay = appointmentsInMonth.filter(appointment => {
        return appointment.date.getDate() === day;
      });

      return {
        day,
        available: compareDate > new Date() && appointmentsInDay.length < 10,
      };
    });

    return availability;
  }
}

export default ListProviderMonthAvailabilityService;
