import { Moment } from 'moment';
import { IVoluntario } from 'app/shared/model/voluntario.model';
import { IRecursoNecessario } from 'app/shared/model/recurso-necessario.model';

export interface ICampanha {
  id?: number;
  nome?: string;
  descricao?: string;
  slogan?: string;
  dataHoraInicio?: Moment;
  dataHoraFim?: Moment;
  coordenador?: IVoluntario;
  recursoNecessarios?: IRecursoNecessario[];
}

export class Campanha implements ICampanha {
  constructor(
    public id?: number,
    public nome?: string,
    public descricao?: string,
    public slogan?: string,
    public dataHoraInicio?: Moment,
    public dataHoraFim?: Moment,
    public coordenador?: IVoluntario,
    public recursoNecessarios?: IRecursoNecessario[]
  ) {}
}
