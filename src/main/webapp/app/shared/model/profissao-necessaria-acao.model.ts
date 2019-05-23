import { IProfissao } from 'app/shared/model/profissao.model';
import { IAcao } from 'app/shared/model/acao.model';

export interface IProfissaoNecessariaAcao {
  id?: number;
  quantidadeMinima?: number;
  profissao?: IProfissao;
  acao?: IAcao;
}

export class ProfissaoNecessariaAcao implements IProfissaoNecessariaAcao {
  constructor(public id?: number, public quantidadeMinima?: number, public profissao?: IProfissao, public acao?: IAcao) {}
}
