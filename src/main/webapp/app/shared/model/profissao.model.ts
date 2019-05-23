import { IProfissaoNecessariaAcao } from 'app/shared/model/profissao-necessaria-acao.model';
import { IVoluntario } from 'app/shared/model/voluntario.model';

export interface IProfissao {
  id?: number;
  nome?: string;
  descricao?: string;
  profissaoNecessariaAcaos?: IProfissaoNecessariaAcao[];
  voluntarios?: IVoluntario[];
}

export class Profissao implements IProfissao {
  constructor(
    public id?: number,
    public nome?: string,
    public descricao?: string,
    public profissaoNecessariaAcaos?: IProfissaoNecessariaAcao[],
    public voluntarios?: IVoluntario[]
  ) {}
}
