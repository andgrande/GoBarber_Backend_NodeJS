import { v4 as uuid } from 'uuid';
import IUserTokensRepository from '@modules/users/repositories/IUserTokensRepository';

import UserToken from '../../infra/typeorm/entities/UserToken';

class FakeUserTokensRepository implements IUserTokensRepository {
  private tokensRepository: UserToken[] = [];

  public async generateToken(user_id: string): Promise<UserToken> {
    const newUserToken = new UserToken();

    Object.assign(newUserToken, {
      token: uuid(),
      id: uuid(),
      user_id,
      created_at: new Date(),
      updated_at: new Date(),
    });

    this.tokensRepository.push(newUserToken);

    return newUserToken;
  }

  public async findToken(token: string): Promise<UserToken | undefined> {
    const userToken = this.tokensRepository.find(
      thisToken => thisToken.token === token,
    );

    return userToken;
  }
}

export default FakeUserTokensRepository;
