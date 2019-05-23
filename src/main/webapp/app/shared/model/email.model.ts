import { IVoluntario } from 'app/shared/model/voluntario.model';

export interface IEmail {
  id?: number;
  email?: string;
  voluntario?: IVoluntario;
}

export class Email implements IEmail {
  constructor(public id?: number, public email?: string, public voluntario?: IVoluntario) {}
}
