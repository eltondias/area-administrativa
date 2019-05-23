import { IVoluntario } from 'app/shared/model/voluntario.model';

export const enum TipoRedeSocial {
  FACEBOOK = 'FACEBOOK',
  TWITER = 'TWITER',
  LINKEDIN = 'LINKEDIN',
  INSTAGRAN = 'INSTAGRAN',
  YOUTUBE = 'YOUTUBE'
}

export interface IRedeSocial {
  id?: number;
  tipoRedeSocial?: TipoRedeSocial;
  url?: string;
  voluntario?: IVoluntario;
}

export class RedeSocial implements IRedeSocial {
  constructor(public id?: number, public tipoRedeSocial?: TipoRedeSocial, public url?: string, public voluntario?: IVoluntario) {}
}
