import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IVoluntario } from 'app/shared/model/voluntario.model';

@Component({
  selector: 'jhi-voluntario-detail',
  templateUrl: './voluntario-detail.component.html'
})
export class VoluntarioDetailComponent implements OnInit {
  voluntario: IVoluntario;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ voluntario }) => {
      this.voluntario = voluntario;
    });
  }

  previousState() {
    window.history.back();
  }
}
