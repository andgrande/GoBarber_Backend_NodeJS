import { v4 as uuid } from 'uuid';
import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import ICreateUserDTO from '@modules/users/dtos/ICreateUserDTO';
import IFindAllProvidersDTO from '@modules/users/dtos/IFindAllProvidersDTO';

// import UserRoutesController from '@modules/users/infra/http/controllers/UserRoutesController';
import User from '../../infra/typeorm/entities/User';
// import usersRouter from '../../http/routes/users.routes';

class FakeUsersRepository implements IUsersRepository {
  private usersRepository: User[] = [];

  public async findById(id: string): Promise<User | undefined> {
    const findUser = this.usersRepository.find(user => user.id === id);

    return findUser;
  }

  public async findByEmail(email: string): Promise<User | undefined> {
    const findUser = this.usersRepository.find(user => user.email === email);

    return findUser;
  }

  public async findAllProviders({
    except_user_id,
  }: IFindAllProvidersDTO): Promise<User[]> {
    let users = this.usersRepository;

    if (except_user_id) {
      users = this.usersRepository.filter(user => user.id !== except_user_id);
    }

    return users;
  }

  public async create(userData: ICreateUserDTO): Promise<User> {
    const newUser = new User();

    Object.assign(newUser, { id: uuid() }, userData);

    this.usersRepository.push(newUser);

    return newUser;
  }

  public async save(user: User): Promise<User> {
    const userIndex = this.usersRepository.findIndex(
      findUser => findUser.id === user.id,
    );

    this.usersRepository[userIndex] = user;

    return user;
  }
}

export default FakeUsersRepository;
