import { Moment } from 'moment';
import { IDisponibilidade } from 'app/shared/model/disponibilidade.model';
import { IDoacao } from 'app/shared/model/doacao.model';
import { IParticipacao } from 'app/shared/model/participacao.model';
import { IEndereco } from 'app/shared/model/endereco.model';
import { ITelefone } from 'app/shared/model/telefone.model';
import { IEmail } from 'app/shared/model/email.model';
import { IRedeSocial } from 'app/shared/model/rede-social.model';
import { IHabilidade } from 'app/shared/model/habilidade.model';
import { IProfissao } from 'app/shared/model/profissao.model';

export const enum EstadoVoluntarioEnum {
  ATIVO = 'ATIVO',
  INATIVO = 'INATIVO',
  SUSPENSO = 'SUSPENSO'
}

export interface IVoluntario {
  id?: number;
  nome?: string;
  urlFotoPerfil?: string;
  cpf?: string;
  login?: string;
  senha?: string;
  isAdmin?: boolean;
  dataNascimento?: Moment;
  dataCadastro?: Moment;
  situacao?: EstadoVoluntarioEnum;
  disponibilidades?: IDisponibilidade[];
  doacaos?: IDoacao[];
  participacaos?: IParticipacao[];
  enderecos?: IEndereco[];
  telefones?: ITelefone[];
  emails?: IEmail[];
  redeSocials?: IRedeSocial[];
  habilidades?: IHabilidade[];
  profissaos?: IProfissao[];
}

export class Voluntario implements IVoluntario {
  constructor(
    public id?: number,
    public nome?: string,
    public urlFotoPerfil?: string,
    public cpf?: string,
    public login?: string,
    public senha?: string,
    public isAdmin?: boolean,
    public dataNascimento?: Moment,
    public dataCadastro?: Moment,
    public situacao?: EstadoVoluntarioEnum,
    public disponibilidades?: IDisponibilidade[],
    public doacaos?: IDoacao[],
    public participacaos?: IParticipacao[],
    public enderecos?: IEndereco[],
    public telefones?: ITelefone[],
    public emails?: IEmail[],
    public redeSocials?: IRedeSocial[],
    public habilidades?: IHabilidade[],
    public profissaos?: IProfissao[]
  ) {
    this.isAdmin = this.isAdmin || false;
  }
}
