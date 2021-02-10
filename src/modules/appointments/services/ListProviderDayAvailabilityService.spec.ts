import FakeAppointmentsRepository from '@modules/appointments/repositories/fakes/FakeAppointmentsRepository';
import ListProviderDayAvailabilityService from './ListProviderDayAvailabilityService';

let fakeAppointmentsRepository: FakeAppointmentsRepository;
let listDayAvailability: ListProviderDayAvailabilityService;

describe('List Hour Availability', () => {
  beforeEach(() => {
    fakeAppointmentsRepository = new FakeAppointmentsRepository();

    listDayAvailability = new ListProviderDayAvailabilityService(
      fakeAppointmentsRepository,
    );
  });

  it('should be able to list the providers hour availability', async () => {
    await fakeAppointmentsRepository.create({
      date: new Date(2020, 11, 18, 13, 0, 0),
      provider_id: 'user',
      user_id: '123123123',
    });

    await fakeAppointmentsRepository.create({
      date: new Date(2020, 11, 18, 14, 0, 0),
      provider_id: 'user',
      user_id: '123123123',
    });

    await fakeAppointmentsRepository.create({
      date: new Date(2020, 11, 18, 16, 0, 0),
      provider_id: 'user',
      user_id: '123123123',
    });

    jest.spyOn(Date, 'now').mockImplementationOnce(() => {
      return new Date(2020, 11, 18, 11).getTime();
    });

    const availability = await listDayAvailability.execute({
      day: 18,
      month: 12,
      provider_id: 'user',
      year: 2020,
    });

    expect(availability).toEqual(
      expect.arrayContaining([
        { hour: 8, available: false },
        { hour: 9, available: false },
        { hour: 10, available: false },
        { hour: 11, available: false },
        { hour: 12, available: true },
        { hour: 13, available: false },
        { hour: 14, available: false },
        { hour: 15, available: true },
        { hour: 16, available: false },
        { hour: 17, available: true },
      ]),
    );
  });
});
