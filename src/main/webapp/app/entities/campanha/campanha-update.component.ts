import { Component, OnInit } from '@angular/core';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import * as moment from 'moment';
import { DATE_TIME_FORMAT } from 'app/shared/constants/input.constants';
import { JhiAlertService } from 'ng-jhipster';
import { ICampanha, Campanha } from 'app/shared/model/campanha.model';
import { CampanhaService } from './campanha.service';
import { IVoluntario } from 'app/shared/model/voluntario.model';
import { VoluntarioService } from 'app/entities/voluntario';

@Component({
  selector: 'jhi-campanha-update',
  templateUrl: './campanha-update.component.html'
})
export class CampanhaUpdateComponent implements OnInit {
  campanha: ICampanha;
  isSaving: boolean;

  coordenadors: IVoluntario[];

  editForm = this.fb.group({
    id: [],
    nome: [null, [Validators.required]],
    descricao: [null, [Validators.required]],
    slogan: [],
    dataHoraInicio: [null, [Validators.required]],
    dataHoraFim: [null, [Validators.required]],
    coordenador: [null, Validators.required]
  });

  constructor(
    protected jhiAlertService: JhiAlertService,
    protected campanhaService: CampanhaService,
    protected voluntarioService: VoluntarioService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.isSaving = false;
    this.activatedRoute.data.subscribe(({ campanha }) => {
      this.updateForm(campanha);
      this.campanha = campanha;
    });
    this.voluntarioService
      .query({ filter: 'campanha-is-null' })
      .pipe(
        filter((mayBeOk: HttpResponse<IVoluntario[]>) => mayBeOk.ok),
        map((response: HttpResponse<IVoluntario[]>) => response.body)
      )
      .subscribe(
        (res: IVoluntario[]) => {
          if (!this.campanha.coordenador || !this.campanha.coordenador.id) {
            this.coordenadors = res;
          } else {
            this.voluntarioService
              .find(this.campanha.coordenador.id)
              .pipe(
                filter((subResMayBeOk: HttpResponse<IVoluntario>) => subResMayBeOk.ok),
                map((subResponse: HttpResponse<IVoluntario>) => subResponse.body)
              )
              .subscribe(
                (subRes: IVoluntario) => (this.coordenadors = [subRes].concat(res)),
                (subRes: HttpErrorResponse) => this.onError(subRes.message)
              );
          }
        },
        (res: HttpErrorResponse) => this.onError(res.message)
      );
  }

  updateForm(campanha: ICampanha) {
    this.editForm.patchValue({
      id: campanha.id,
      nome: campanha.nome,
      descricao: campanha.descricao,
      slogan: campanha.slogan,
      dataHoraInicio: campanha.dataHoraInicio != null ? campanha.dataHoraInicio.format(DATE_TIME_FORMAT) : null,
      dataHoraFim: campanha.dataHoraFim != null ? campanha.dataHoraFim.format(DATE_TIME_FORMAT) : null,
      coordenador: campanha.coordenador
    });
  }

  previousState() {
    window.history.back();
  }

  save() {
    this.isSaving = true;
    const campanha = this.createFromForm();
    if (campanha.id !== undefined) {
      this.subscribeToSaveResponse(this.campanhaService.update(campanha));
    } else {
      this.subscribeToSaveResponse(this.campanhaService.create(campanha));
    }
  }

  private createFromForm(): ICampanha {
    const entity = {
      ...new Campanha(),
      id: this.editForm.get(['id']).value,
      nome: this.editForm.get(['nome']).value,
      descricao: this.editForm.get(['descricao']).value,
      slogan: this.editForm.get(['slogan']).value,
      dataHoraInicio:
        this.editForm.get(['dataHoraInicio']).value != null
          ? moment(this.editForm.get(['dataHoraInicio']).value, DATE_TIME_FORMAT)
          : undefined,
      dataHoraFim:
        this.editForm.get(['dataHoraFim']).value != null ? moment(this.editForm.get(['dataHoraFim']).value, DATE_TIME_FORMAT) : undefined,
      coordenador: this.editForm.get(['coordenador']).value
    };
    return entity;
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<ICampanha>>) {
    result.subscribe((res: HttpResponse<ICampanha>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
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
