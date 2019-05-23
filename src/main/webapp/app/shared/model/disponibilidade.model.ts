import { Moment } from 'moment';
import { IVoluntario } from 'app/shared/model/voluntario.model';

export const enum DiaSemanaEnum {
  SEGUNDA = 'SEGUNDA',
  TERCA = 'TERCA',
  QUARTA = 'QUARTA',
  QUINTA = 'QUINTA',
  SEXTA = 'SEXTA',
  SABADO = 'SABADO',
  DOMINGO = 'DOMINGO'
}

export const enum TurnoEnum {
  MANHA = 'MANHA',
  TARDE = 'TARDE',
  NOITE = 'NOITE',
  INTERMEDIARIO = 'INTERMEDIARIO'
}

export interface IDisponibilidade {
  id?: number;
  horaInicio?: Moment;
  horaFim?: Moment;
  diaSemana?: DiaSemanaEnum;
  turno?: TurnoEnum;
  voluntario?: IVoluntario;
}

export class Disponibilidade implements IDisponibilidade {
  constructor(
    public id?: number,
    public horaInicio?: Moment,
    public horaFim?: Moment,
    public diaSemana?: DiaSemanaEnum,
    public turno?: TurnoEnum,
    public voluntario?: IVoluntario
  ) {}
}
