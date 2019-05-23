import { IVoluntario } from 'app/shared/model/voluntario.model';
import { ICidade } from 'app/shared/model/cidade.model';
import { IAcao } from 'app/shared/model/acao.model';

export interface IEndereco {
  id?: number;
  logradouro?: string;
  numero?: string;
  complemento?: string;
  bairro?: string;
  cep?: string;
  latitude?: string;
  longitude?: string;
  voluntario?: IVoluntario;
  cidade?: ICidade;
  acao?: IAcao;
}

export class Endereco implements IEndereco {
  constructor(
    public id?: number,
    public logradouro?: string,
    public numero?: string,
    public complemento?: string,
    public bairro?: string,
    public cep?: string,
    public latitude?: string,
    public longitude?: string,
    public voluntario?: IVoluntario,
    public cidade?: ICidade,
    public acao?: IAcao
  ) {}
}
