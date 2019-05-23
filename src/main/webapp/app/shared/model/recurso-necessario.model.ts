import { IDoacao } from 'app/shared/model/doacao.model';
import { IAcao } from 'app/shared/model/acao.model';
import { ICampanha } from 'app/shared/model/campanha.model';

export interface IRecursoNecessario {
  id?: number;
  nome?: string;
  descricao?: string;
  quantidade?: number;
  isFinanceiro?: boolean;
  valor?: number;
  doacaos?: IDoacao[];
  acao?: IAcao;
  campanha?: ICampanha;
}

export class RecursoNecessario implements IRecursoNecessario {
  constructor(
    public id?: number,
    public nome?: string,
    public descricao?: string,
    public quantidade?: number,
    public isFinanceiro?: boolean,
    public valor?: number,
    public doacaos?: IDoacao[],
    public acao?: IAcao,
    public campanha?: ICampanha
  ) {
    this.isFinanceiro = this.isFinanceiro || false;
  }
}
