import FakeUsersRepository from '@modules/users/repositories/fakes/FakeUsersRepository';
import FakeCacheProvider from '@shared/container/providers/CacheProvider/fakes/FakeCacheProvider';
import ListProviderService from './ListProviderService';

let fakeUsersRepository: FakeUsersRepository;
let listProvider: ListProviderService;
let fakeCacheProvider: FakeCacheProvider;

describe('List Providers', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    fakeCacheProvider = new FakeCacheProvider();

    listProvider = new ListProviderService(
      fakeUsersRepository,
      fakeCacheProvider,
    );
  });

  it('should be able to list the providers', async () => {
    const user = await fakeUsersRepository.create({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: '123456',
    });

    const invalidUser = await listProvider.execute({
      user_id: 'non-existent-user_id',
    });

    const providers = await listProvider.execute({
      user_id: user.id,
    });

    expect(providers).toBeDefined();
  });

  it('should be able to list the providers except the logged one', async () => {
    const userOne = await fakeUsersRepository.create({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: '123456',
    });

    const userTwo = await fakeUsersRepository.create({
      name: 'Mary Doe',
      email: 'mary@example.com',
      password: '123456454',
    });

    const loggedUser = await fakeUsersRepository.create({
      name: 'Jhonny Doe',
      email: 'Jhonnyexample.com',
      password: '321654',
    });

    const providers = await listProvider.execute({
      user_id: loggedUser.id,
    });

    expect(providers).toEqual([userOne, userTwo]);
  });
});
