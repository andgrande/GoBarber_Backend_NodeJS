import AppError from '@shared/errors/AppError';

import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import FakeUserTokensRepository from '../repositories/fakes/FakeUserTokenRepository';
import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider';
import ResetPasswordService from './ResetPasswordService';

let fakeUsersRepository: FakeUsersRepository;
let fakeUserTokensRepository: FakeUserTokensRepository;
let fakeHashProvider: FakeHashProvider;
let resetPassword: ResetPasswordService;

describe('Reset Password', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    fakeUserTokensRepository = new FakeUserTokensRepository();
    fakeHashProvider = new FakeHashProvider();

    resetPassword = new ResetPasswordService(
      fakeUsersRepository,
      fakeUserTokensRepository,
      fakeHashProvider,
    );
  });

  it('should generate a reset password token', async () => {
    const user = await fakeUsersRepository.create({
      name: 'John Doe',
      email: 'John_Doe@example.com',
      password: '123345',
    });

    const { token } = await fakeUserTokensRepository.generateToken(user.id);

    const generateHash = jest.spyOn(fakeHashProvider, 'generateHash');

    await resetPassword.execute({
      password: '123456',
      token,
    });

    const findUpdatedUser = await fakeUsersRepository.findById(user.id);

    expect(generateHash).toHaveBeenCalledWith('123456');
    expect(findUpdatedUser?.password).toBe('123456');
  });

  it('should not be allowed to reset the password with non-existing token', async () => {
    await expect(
      resetPassword.execute({
        password: '123456',
        token: 'non-existing-token',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be allowed to reset the password with non-existing user', async () => {
    const { token } = await fakeUserTokensRepository.generateToken(
      'non-existing-user',
    );

    await expect(
      resetPassword.execute({
        password: '123456',
        token,
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be allowed to reset the password if passed more than 2 hour', async () => {
    const user = await fakeUsersRepository.create({
      name: 'John Doe',
      email: 'John_Doe@example.com',
      password: '123345',
    });

    const { token } = await fakeUserTokensRepository.generateToken(user.id);

    jest.spyOn(Date, 'now').mockImplementationOnce(() => {
      const customDate = new Date();

      return customDate.setHours(customDate.getHours() + 3);
    });

    await expect(
      resetPassword.execute({
        password: '123456',
        token,
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
