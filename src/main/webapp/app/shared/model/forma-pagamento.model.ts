import { Moment } from 'moment';
import { IDoacao } from 'app/shared/model/doacao.model';

export interface IFormaPagamento {
  id?: number;
  nome?: string;
  descricao?: Moment;
  doacao?: IDoacao;
}

export class FormaPagamento implements IFormaPagamento {
  constructor(public id?: number, public nome?: string, public descricao?: Moment, public doacao?: IDoacao) {}
}
