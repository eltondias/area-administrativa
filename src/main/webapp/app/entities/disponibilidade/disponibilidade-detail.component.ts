import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IDisponibilidade } from 'app/shared/model/disponibilidade.model';

@Component({
  selector: 'jhi-disponibilidade-detail',
  templateUrl: './disponibilidade-detail.component.html'
})
export class DisponibilidadeDetailComponent implements OnInit {
  disponibilidade: IDisponibilidade;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ disponibilidade }) => {
      this.disponibilidade = disponibilidade;
    });
  }

  previousState() {
    window.history.back();
  }
}
