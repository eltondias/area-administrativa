import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IHabilidade } from 'app/shared/model/habilidade.model';

@Component({
  selector: 'jhi-habilidade-detail',
  templateUrl: './habilidade-detail.component.html'
})
export class HabilidadeDetailComponent implements OnInit {
  habilidade: IHabilidade;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ habilidade }) => {
      this.habilidade = habilidade;
    });
  }

  previousState() {
    window.history.back();
  }
}
