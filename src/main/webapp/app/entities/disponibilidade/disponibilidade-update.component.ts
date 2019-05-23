import { Component, OnInit } from '@angular/core';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import * as moment from 'moment';
import { DATE_TIME_FORMAT } from 'app/shared/constants/input.constants';
import { JhiAlertService } from 'ng-jhipster';
import { IDisponibilidade, Disponibilidade } from 'app/shared/model/disponibilidade.model';
import { DisponibilidadeService } from './disponibilidade.service';
import { IVoluntario } from 'app/shared/model/voluntario.model';
import { VoluntarioService } from 'app/entities/voluntario';

@Component({
  selector: 'jhi-disponibilidade-update',
  templateUrl: './disponibilidade-update.component.html'
})
export class DisponibilidadeUpdateComponent implements OnInit {
  disponibilidade: IDisponibilidade;
  isSaving: boolean;

  voluntarios: IVoluntario[];

  editForm = this.fb.group({
    id: [],
    horaInicio: [null, [Validators.required]],
    horaFim: [null, [Validators.required]],
    diaSemana: [null, [Validators.required]],
    turno: [null, [Validators.required]],
    voluntario: [null, Validators.required]
  });

  constructor(
    protected jhiAlertService: JhiAlertService,
    protected disponibilidadeService: DisponibilidadeService,
    protected voluntarioService: VoluntarioService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.isSaving = false;
    this.activatedRoute.data.subscribe(({ disponibilidade }) => {
      this.updateForm(disponibilidade);
      this.disponibilidade = disponibilidade;
    });
    this.voluntarioService
      .query()
      .pipe(
        filter((mayBeOk: HttpResponse<IVoluntario[]>) => mayBeOk.ok),
        map((response: HttpResponse<IVoluntario[]>) => response.body)
      )
      .subscribe((res: IVoluntario[]) => (this.voluntarios = res), (res: HttpErrorResponse) => this.onError(res.message));
  }

  updateForm(disponibilidade: IDisponibilidade) {
    this.editForm.patchValue({
      id: disponibilidade.id,
      horaInicio: disponibilidade.horaInicio != null ? disponibilidade.horaInicio.format(DATE_TIME_FORMAT) : null,
      horaFim: disponibilidade.horaFim != null ? disponibilidade.horaFim.format(DATE_TIME_FORMAT) : null,
      diaSemana: disponibilidade.diaSemana,
      turno: disponibilidade.turno,
      voluntario: disponibilidade.voluntario
    });
  }

  previousState() {
    window.history.back();
  }

  save() {
    this.isSaving = true;
    const disponibilidade = this.createFromForm();
    if (disponibilidade.id !== undefined) {
      this.subscribeToSaveResponse(this.disponibilidadeService.update(disponibilidade));
    } else {
      this.subscribeToSaveResponse(this.disponibilidadeService.create(disponibilidade));
    }
  }

  private createFromForm(): IDisponibilidade {
    const entity = {
      ...new Disponibilidade(),
      id: this.editForm.get(['id']).value,
      horaInicio:
        this.editForm.get(['horaInicio']).value != null ? moment(this.editForm.get(['horaInicio']).value, DATE_TIME_FORMAT) : undefined,
      horaFim: this.editForm.get(['horaFim']).value != null ? moment(this.editForm.get(['horaFim']).value, DATE_TIME_FORMAT) : undefined,
      diaSemana: this.editForm.get(['diaSemana']).value,
      turno: this.editForm.get(['turno']).value,
      voluntario: this.editForm.get(['voluntario']).value
    };
    return entity;
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IDisponibilidade>>) {
    result.subscribe((res: HttpResponse<IDisponibilidade>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
  }

  protected onSaveSuccess() {
    this.isSaving = false;
    this.previousState();
  }

  protected onSaveError() {
    this.isSaving = false;
  }
  protected onError(errorMessage: string) {
    this.jhiAlertService.error(errorMessage, null, null);
  }

  trackVoluntarioById(index: number, item: IVoluntario) {
    return item.id;
  }
}
