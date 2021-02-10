import FakeAppointmentsRepository from '@modules/appointments/repositories/fakes/FakeAppointmentsRepository';
import ListProviderMonthAvailabilityService from './ListProviderMonthAvailabilityService';

let fakeAppointmentsRepository: FakeAppointmentsRepository;
let listMonthAvailability: ListProviderMonthAvailabilityService;

describe('List Month Availability', () => {
  beforeEach(() => {
    fakeAppointmentsRepository = new FakeAppointmentsRepository();

    listMonthAvailability = new ListProviderMonthAvailabilityService(
      fakeAppointmentsRepository,
    );
  });

  it('should be able to list the providers month availability', async () => {
    await fakeAppointmentsRepository.create({
      date: new Date(2020, 11, 18, 8, 0, 0),
      provider_id: 'user',
      user_id: '123123123',
    });

    await fakeAppointmentsRepository.create({
      date: new Date(2020, 11, 18, 9, 0, 0),
      provider_id: 'user',
      user_id: '123123123',
    });

    await fakeAppointmentsRepository.create({
      date: new Date(2020, 11, 18, 10, 0, 0),
      provider_id: 'user',
      user_id: '123123123',
    });

    await fakeAppointmentsRepository.create({
      date: new Date(2020, 11, 18, 11, 0, 0),
      provider_id: 'user',
      user_id: '123123123',
    });

    await fakeAppointmentsRepository.create({
      date: new Date(2020, 11, 18, 12, 0, 0),
      provider_id: 'user',
      user_id: '123123123',
    });

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
      date: new Date(2020, 11, 18, 15, 0, 0),
      provider_id: 'user',
      user_id: '123123123',
    });

    await fakeAppointmentsRepository.create({
      date: new Date(2020, 11, 18, 16, 0, 0),
      provider_id: 'user',
      user_id: '123123123',
    });

    await fakeAppointmentsRepository.create({
      date: new Date(2020, 11, 18, 17, 0, 0),
      provider_id: 'user',
      user_id: '123123123',
    });

    await fakeAppointmentsRepository.create({
      date: new Date(2020, 11, 19, 11, 0, 0),
      provider_id: 'user',
      user_id: '123123123',
    });

    await fakeAppointmentsRepository.create({
      date: new Date(2020, 11, 20, 9, 0, 0),
      provider_id: 'user',
      user_id: '123123123',
    });

    await fakeAppointmentsRepository.create({
      date: new Date(2020, 11, 21, 9, 0, 0),
      provider_id: 'user',
      user_id: '123123123',
    });

    const availability = await listMonthAvailability.execute({
      month: 12,
      provider_id: 'user',
      year: 2020,
    });

    expect(availability).toEqual(
      expect.arrayContaining([
        { day: 18, available: false },
        { day: 19, available: true },
        { day: 20, available: true },
        { day: 21, available: true },
      ]),
    );
  });
});
