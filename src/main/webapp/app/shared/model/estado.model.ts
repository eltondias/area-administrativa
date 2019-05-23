import { ICidade } from 'app/shared/model/cidade.model';

export interface IEstado {
  id?: number;
  nome?: string;
  sigla?: string;
  cidades?: ICidade[];
}

export class Estado implements IEstado {
  constructor(public id?: number, public nome?: string, public sigla?: string, public cidades?: ICidade[]) {}
}
