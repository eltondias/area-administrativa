import { Moment } from 'moment';
import { IVoluntario } from 'app/shared/model/voluntario.model';
import { IRecursoNecessario } from 'app/shared/model/recurso-necessario.model';

export interface IDoacao {
  id?: number;
  descricao?: string;
  quantidade?: number;
  isFinanceiro?: boolean;
  isAnomina?: boolean;
  dataHora?: Moment;
  doador?: IVoluntario;
  recursoNecessario?: IRecursoNecessario;
}

export class Doacao implements IDoacao {
  constructor(
    public id?: number,
    public descricao?: string,
    public quantidade?: number,
    public isFinanceiro?: boolean,
    public isAnomina?: boolean,
    public dataHora?: Moment,
    public doador?: IVoluntario,
    public recursoNecessario?: IRecursoNecessario
  ) {
    this.isFinanceiro = this.isFinanceiro || false;
    this.isAnomina = this.isAnomina || false;
  }
}
