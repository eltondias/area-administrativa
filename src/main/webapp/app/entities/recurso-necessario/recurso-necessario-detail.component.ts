import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IRecursoNecessario } from 'app/shared/model/recurso-necessario.model';

@Component({
  selector: 'jhi-recurso-necessario-detail',
  templateUrl: './recurso-necessario-detail.component.html'
})
export class RecursoNecessarioDetailComponent implements OnInit {
  recursoNecessario: IRecursoNecessario;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ recursoNecessario }) => {
      this.recursoNecessario = recursoNecessario;
    });
  }

  previousState() {
    window.history.back();
  }
}
