import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IProfissaoNecessariaAcao } from 'app/shared/model/profissao-necessaria-acao.model';

@Component({
  selector: 'jhi-profissao-necessaria-acao-detail',
  templateUrl: './profissao-necessaria-acao-detail.component.html'
})
export class ProfissaoNecessariaAcaoDetailComponent implements OnInit {
  profissaoNecessariaAcao: IProfissaoNecessariaAcao;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ profissaoNecessariaAcao }) => {
      this.profissaoNecessariaAcao = profissaoNecessariaAcao;
    });
  }

  previousState() {
    window.history.back();
  }
}
