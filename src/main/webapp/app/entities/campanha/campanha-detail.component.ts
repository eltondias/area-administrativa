import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ICampanha } from 'app/shared/model/campanha.model';

@Component({
  selector: 'jhi-campanha-detail',
  templateUrl: './campanha-detail.component.html'
})
export class CampanhaDetailComponent implements OnInit {
  campanha: ICampanha;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ campanha }) => {
      this.campanha = campanha;
    });
  }

  previousState() {
    window.history.back();
  }
}
