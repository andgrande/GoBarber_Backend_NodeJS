import FakeCacheProvider from '@shared/container/providers/CacheProvider/fakes/FakeCacheProvider';
import FakeAppointmentsRepository from '../repositories/fakes/FakeAppointmentsRepository';
import ListProvidersAppointmentsService from './ListProvidersAppointmentsService';

let fakeAppointmentsRepository: FakeAppointmentsRepository;
let listProvidersAppointments: ListProvidersAppointmentsService;
let fakeCacheProvider: FakeCacheProvider;

describe('List Providers Appointments', () => {
  beforeEach(() => {
    fakeAppointmentsRepository = new FakeAppointmentsRepository();
    fakeCacheProvider = new FakeCacheProvider();

    listProvidersAppointments = new ListProvidersAppointmentsService(
      fakeAppointmentsRepository,
      fakeCacheProvider,
    );
  });

  it('should be able to list the providers appointments', async () => {
    const appointment1 = await fakeAppointmentsRepository.create({
      date: new Date(2021, 11, 18, 13, 0, 0),
      provider_id: 'user',
      user_id: '123123123',
    });

    const appointment2 = await fakeAppointmentsRepository.create({
      date: new Date(2021, 11, 18, 14, 0, 0),
      provider_id: 'user',
      user_id: '123123123',
    });

    const appointments = await listProvidersAppointments.execute({
      day: 18,
      month: 12,
      provider_id: 'user',
      year: 2021,
    });

    expect(appointments).toEqual([appointment1, appointment2]);
  });
});
