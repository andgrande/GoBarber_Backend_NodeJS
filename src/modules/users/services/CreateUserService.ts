/* eslint-disable class-methods-use-this */
import AppError from '@shared/errors/AppError';
import User from '@modules/users/infra/typeorm/entities/User';
import { injectable, inject } from 'tsyringe';
import ICacheProvider from '@shared/container/providers/CacheProvider/models/ICacheProvider';
import IHashProvider from '../providers/HashProvider/models/IHashProvider';

import IUsersRepository from '../repositories/IUsersRepository';

interface IRequestDTO {
  name: string;
  email: string;
  password: string;
}

@injectable()
class CreateUserService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('HashProvider')
    private hashProvider: IHashProvider,

    @inject('CacheProvider')
    private cacheProvider: ICacheProvider,
  ) {}

  public async execute({ name, email, password }: IRequestDTO): Promise<User> {
    if (!email.includes('@')) {
      throw new AppError('Please set a valid email address');
    }

    const isEmailExistentInDB = await this.usersRepository.findByEmail(email);

    if (isEmailExistentInDB) {
      throw new AppError('Email already in use. Please try a different one.');
    }

    const hashedPassword = await this.hashProvider.generateHash(password);

    const user = await this.usersRepository.create({
      name,
      email,
      password: hashedPassword,
    });

    await this.cacheProvider.invalidatePrefix('providers-list');

    return user;
  }
}

export default CreateUserService;
