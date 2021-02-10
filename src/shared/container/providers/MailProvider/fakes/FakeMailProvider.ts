import IMailProvider from '../models/IMailProvider';
import ISendMailDTO from '../dtos/ISendMailDTO';

class FakeMailProvider implements IMailProvider {
  private mailRepo: ISendMailDTO[] = [];

  public async sendMail(message: ISendMailDTO): Promise<void> {
    this.mailRepo.push(message);
  }
}

export default FakeMailProvider;
