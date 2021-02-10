import UserToken from '../infra/typeorm/entities/UserToken';

export default interface IUserTokensRepository {
  generateToken(user_id: string): Promise<UserToken>;
  findToken(token: string): Promise<UserToken | undefined>;
}
