import { Moment } from 'moment';
import { IProfissaoNecessariaAcao } from 'app/shared/model/profissao-necessaria-acao.model';
import { IParticipacao } from 'app/shared/model/participacao.model';
import { IEndereco } from 'app/shared/model/endereco.model';
import { IRecursoNecessario } from 'app/shared/model/recurso-necessario.model';

export const enum SituacaoAcaoEnum {
  PRE_ACAO = 'PRE_ACAO',
  EM_ACAO = 'EM_ACAO',
  SUSPENSA = 'SUSPENSA',
  PAUSADA = 'PAUSADA'
}

export interface IAcao {
  id?: number;
  nome?: string;
  descricao?: string;
  meta?: string;
  banner?: string;
  dataHoraInicio?: Moment;
  dataHoraFim?: Moment;
  custos?: number;
  situacaoAcao?: SituacaoAcaoEnum;
  profissaoNecessariaAcaos?: IProfissaoNecessariaAcao[];
  participacaos?: IParticipacao[];
  enderecos?: IEndereco[];
  recursoNecessarios?: IRecursoNecessario[];
}

export class Acao implements IAcao {
  constructor(
    public id?: number,
    public nome?: string,
    public descricao?: string,
    public meta?: string,
    public banner?: string,
    public dataHoraInicio?: Moment,
    public dataHoraFim?: Moment,
    public custos?: number,
    public situacaoAcao?: SituacaoAcaoEnum,
    public profissaoNecessariaAcaos?: IProfissaoNecessariaAcao[],
    public participacaos?: IParticipacao[],
    public enderecos?: IEndereco[],
    public recursoNecessarios?: IRecursoNecessario[]
  ) {}
}
