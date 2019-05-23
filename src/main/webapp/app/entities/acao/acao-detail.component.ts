import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IAcao } from 'app/shared/model/acao.model';

@Component({
  selector: 'jhi-acao-detail',
  templateUrl: './acao-detail.component.html'
})
export class AcaoDetailComponent implements OnInit {
  acao: IAcao;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ acao }) => {
      this.acao = acao;
    });
  }

  previousState() {
    window.history.back();
  }
}
