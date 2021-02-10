import AppError from '@shared/errors/AppError';
import FakeNotificationRepository from '@modules/notifications/repositories/fakes/FakeNotificationsRepository';
import FakeCacheProvider from '@shared/container/providers/CacheProvider/fakes/FakeCacheProvider';
import FakeAppointmentsRepository from '../repositories/fakes/FakeAppointmentsRepository';
import CreateAppointmentService from './CreateAppointmentService';

let fakeAppointmentsRepository: FakeAppointmentsRepository;
let createAppointment: CreateAppointmentService;
let fakeNotificationRepository: FakeNotificationRepository;
let fakeCacheProvider: FakeCacheProvider;

describe('CreateAppointment', () => {
  beforeEach(() => {
    fakeAppointmentsRepository = new FakeAppointmentsRepository();
    fakeNotificationRepository = new FakeNotificationRepository();
    fakeCacheProvider = new FakeCacheProvider();

    createAppointment = new CreateAppointmentService(
      fakeAppointmentsRepository,
      fakeNotificationRepository,
      fakeCacheProvider,
    );
  });

  it('should be able to create a new appointment', async () => {
    jest.spyOn(Date, 'now').mockImplementationOnce(() => {
      return new Date(2020, 11, 10, 9).getTime();
    });
    const appointment = await createAppointment.execute({
      date: new Date(2020, 11, 10, 10),
      provider_id: '213456789',
      user_id: '123123123',
    });

    expect(appointment).toHaveProperty('id');
    expect(appointment.provider_id).toBe('213456789');
  });

  it('should not be able to create two appointments on the same time', async () => {
    jest.spyOn(Date, 'now').mockImplementationOnce(() => {
      return new Date(2020, 11, 10, 10).getTime();
    });

    const appointmentDate = new Date(2020, 11, 10, 12);

    await createAppointment.execute({
      date: appointmentDate,
      provider_id: 'provider_1',
      user_id: 'user_1',
    });

    jest.spyOn(Date, 'now').mockImplementationOnce(() => {
      return new Date(2020, 11, 10, 10).getTime();
    });

    await expect(
      createAppointment.execute({
        date: appointmentDate,
        provider_id: 'provider_1',
        user_id: 'user_1',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to create an appointment on the past', async () => {
    jest.spyOn(Date, 'now').mockImplementationOnce(() => {
      return new Date(2020, 11, 18, 11).getTime();
    });

    await expect(
      createAppointment.execute({
        date: new Date(2020, 10, 10, 11),
        provider_id: '213456789',
        user_id: '123123123',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to create an appointment with the same user as the provider', async () => {
    jest.spyOn(Date, 'now').mockImplementationOnce(() => {
      return new Date(2020, 11, 10, 12).getTime();
    });

    await expect(
      createAppointment.execute({
        date: new Date(2020, 11, 10, 13),
        user_id: 'user-id',
        provider_id: 'user-id',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to create an appointment outside business hours', async () => {
    jest.spyOn(Date, 'now').mockImplementationOnce(() => {
      return new Date(2020, 4, 10, 12).getTime();
    });

    await expect(
      createAppointment.execute({
        date: new Date(2020, 11, 11, 7),
        user_id: 'user-id',
        provider_id: 'provider-id',
      }),
    ).rejects.toBeInstanceOf(AppError);

    await expect(
      createAppointment.execute({
        date: new Date(2020, 11, 11, 18),
        user_id: 'user-id',
        provider_id: 'provider-id',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should be able to create an appointment for different providers in the same time', async () => {
    jest.spyOn(Date, 'now').mockImplementationOnce(() => {
      return new Date(2020, 11, 30, 12).getTime();
    });

    const firstAppointment = await createAppointment.execute({
      date: new Date(2020, 11, 30, 14),
      user_id: 'user-01',
      provider_id: 'provider-01',
    });

    jest.spyOn(Date, 'now').mockImplementationOnce(() => {
      return new Date(2020, 11, 30, 12).getTime();
    });

    await expect(
      createAppointment.execute({
        date: new Date(2020, 11, 30, 14),
        user_id: 'user-02',
        provider_id: 'provider-01',
      }),
    ).rejects.toBeInstanceOf(AppError);

    expect(firstAppointment).toHaveProperty('id');
  });
});
