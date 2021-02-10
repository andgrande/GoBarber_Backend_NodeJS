import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import IHashProvider from '../providers/HashProvider/models/IHashProvider';

import User from '../infra/typeorm/entities/User';
import IUsersRepository from '../repositories/IUsersRepository';

interface IRequest {
  user_id: string;
  name: string;
  email?: string;
  old_password?: string;
  password?: string;
}

@injectable()
class UpdateUserAvatarService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('HashProvider')
    private hashProvider: IHashProvider,
  ) {}

  public async execute({
    user_id,
    name,
    email,
    old_password,
    password,
  }: IRequest): Promise<User> {
    const user = await this.usersRepository.findById(user_id);

    if (!user) {
      throw new AppError('User must be logged to update profile', 401);
    }

    if (name) {
      user.name = name;
    }

    // this should be kept on hold to define whether email can be changed or not;
    // and in case of change where it is not informed, what will be passed as email data
    if (email) {
      const isEmailExistent = await this.usersRepository.findByEmail(email);

      if (isEmailExistent) {
        throw new AppError('Cannot change your email to an existing one');
      }

      user.email = email;
    }

    if (password) {
      if (!old_password) {
        throw new AppError(
          'Please inform the old password to set a new password',
        );
      }
      const checkOldPassword = await this.hashProvider.compareHash(
        old_password,
        user.password,
      );

      if (!checkOldPassword) {
        throw new AppError('Invalid password provided');
      }

      user.password = await this.hashProvider.generateHash(password);
    }

    await this.usersRepository.save(user);

    return user;
  }
}

export default UpdateUserAvatarService;
