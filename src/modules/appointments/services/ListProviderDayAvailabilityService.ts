import { injectable, inject } from 'tsyringe';

// import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import IAppointmentsRepository from '@modules/appointments/repositories/IAppointmentsRepository';
import { getHours } from 'date-fns';

// import User from '@modules/users/infra/typeorm/entities/User';
// import { getDaysInMonth } from 'date-fns';

interface IRequest {
  provider_id: string;
  day: number;
  month: number;
  year: number;
}

type IResponse = Array<{
  hour: number;
  available: boolean;
}>;

@injectable()
class ListProviderDayAvailabilityService {
  constructor(
    @inject('AppointmentsRepository')
    private appointmentsRepository: IAppointmentsRepository,
  ) {}

  public async execute({
    provider_id,
    day,
    month,
    year,
  }: IRequest): Promise<IResponse> {
    const appointmentsInDay = await this.appointmentsRepository.findAllInDayPerProvider(
      { provider_id, day, month, year },
    );

    const startWorkingHour = 8;
    const hoursInCurrentDay = 10;
    const eachHourArray = Array.from(
      {
        length: hoursInCurrentDay,
      },
      (_, index) => index + startWorkingHour,
    );

    const currentDate = new Date(Date.now());

    const availability = eachHourArray.map(hour => {
      const appointmentsInHour = appointmentsInDay.find(appointment => {
        return getHours(appointment.date) === hour;
      });

      const compareDate = new Date(year, month - 1, day, hour);

      return {
        hour,
        available: !appointmentsInHour && compareDate > currentDate,
      };
    });

    return availability;
  }
}

export default ListProviderDayAvailabilityService;
