import AppError from '@shared/errors/AppError';

import FakeMailProvider from '@shared/container/providers/MailProvider/fakes/FakeMailProvider';
import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import SendForgotPasswordEmailService from './SendForgotPasswordEmailService';
import FakeUserTokensRepository from '../repositories/fakes/FakeUserTokenRepository';

let fakeUsersRepository: FakeUsersRepository;
let fakeUserTokensRepository: FakeUserTokensRepository;
let fakeMailProvider: FakeMailProvider;
let sendPasswordEmail: SendForgotPasswordEmailService;

describe('SendForgotPasswordEmail', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    fakeUserTokensRepository = new FakeUserTokensRepository();
    fakeMailProvider = new FakeMailProvider();

    sendPasswordEmail = new SendForgotPasswordEmailService(
      fakeUsersRepository,
      fakeMailProvider,
      fakeUserTokensRepository,
    );
  });

  it('should be able to send an email to an user', async () => {
    const sendMail = jest.spyOn(fakeMailProvider, 'sendMail');

    await fakeUsersRepository.create({
      name: 'John Doe',
      email: 'John_Doe@example.com',
      password: '123345',
    });

    await sendPasswordEmail.execute({ email: 'John_Doe@example.com' });

    expect(sendMail).toHaveBeenCalled();
  });

  it('should not be able to send an email to non existing user', async () => {
    await expect(
      sendPasswordEmail.execute({
        email: 'JohnDoe@example.com',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should generate a reset password token', async () => {
    const generateToken = jest.spyOn(fakeUserTokensRepository, 'generateToken');

    const user = await fakeUsersRepository.create({
      name: 'John Doe',
      email: 'John_Doe@example.com',
      password: '123345',
    });

    await sendPasswordEmail.execute({ email: 'John_Doe@example.com' });

    expect(generateToken).toHaveBeenCalledWith(user.id);
  });
});
