import IParseMailTemplateDTO from '@shared/container/providers/MailTemplateProvider/dtos/IParseMailTemplateDTO';

interface IMailContacts {
  name: string;
  email: string;
}

export default interface ISendMailDTO {
  to: IMailContacts;
  from?: IMailContacts;
  subject: string;
  templateData: IParseMailTemplateDTO;
}
