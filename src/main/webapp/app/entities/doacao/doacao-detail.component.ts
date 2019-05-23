import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IDoacao } from 'app/shared/model/doacao.model';

@Component({
  selector: 'jhi-doacao-detail',
  templateUrl: './doacao-detail.component.html'
})
export class DoacaoDetailComponent implements OnInit {
  doacao: IDoacao;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ doacao }) => {
      this.doacao = doacao;
    });
  }

  previousState() {
    window.history.back();
  }
}
