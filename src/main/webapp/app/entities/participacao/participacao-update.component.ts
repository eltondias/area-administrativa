import { Component, OnInit } from '@angular/core';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import * as moment from 'moment';
import { DATE_TIME_FORMAT } from 'app/shared/constants/input.constants';
import { JhiAlertService } from 'ng-jhipster';
import { IParticipacao, Participacao } from 'app/shared/model/participacao.model';
import { ParticipacaoService } from './participacao.service';
import { IVoluntario } from 'app/shared/model/voluntario.model';
import { VoluntarioService } from 'app/entities/voluntario';
import { IAcao } from 'app/shared/model/acao.model';
import { AcaoService } from 'app/entities/acao';

@Component({
  selector: 'jhi-participacao-update',
  templateUrl: './participacao-update.component.html'
})
export class ParticipacaoUpdateComponent implements OnInit {
  participacao: IParticipacao;
  isSaving: boolean;

  voluntarios: IVoluntario[];

  acaos: IAcao[];

  editForm = this.fb.group({
    id: [],
    dataHoraEmissaoCertificado: [],
    cargaHoraria: [],
    voluntario: [null, Validators.required],
    acao: [null, Validators.required]
  });

  constructor(
    protected jhiAlertService: JhiAlertService,
    protected participacaoService: ParticipacaoService,
    protected voluntarioService: VoluntarioService,
    protected acaoService: AcaoService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.isSaving = false;
    this.activatedRoute.data.subscribe(({ participacao }) => {
      this.updateForm(participacao);
      this.participacao = participacao;
    });
    this.voluntarioService
      .query()
      .pipe(
        filter((mayBeOk: HttpResponse<IVoluntario[]>) => mayBeOk.ok),
        map((response: HttpResponse<IVoluntario[]>) => response.body)
      )
      .subscribe((res: IVoluntario[]) => (this.voluntarios = res), (res: HttpErrorResponse) => this.onError(res.message));
    this.acaoService
      .query()
      .pipe(
        filter((mayBeOk: HttpResponse<IAcao[]>) => mayBeOk.ok),
        map((response: HttpResponse<IAcao[]>) => response.body)
      )
      .subscribe((res: IAcao[]) => (this.acaos = res), (res: HttpErrorResponse) => this.onError(res.message));
  }

  updateForm(participacao: IParticipacao) {
    this.editForm.patchValue({
      id: participacao.id,
      dataHoraEmissaoCertificado:
        participacao.dataHoraEmissaoCertificado != null ? participacao.dataHoraEmissaoCertificado.format(DATE_TIME_FORMAT) : null,
      cargaHoraria: participacao.cargaHoraria,
      voluntario: participacao.voluntario,
      acao: participacao.acao
    });
  }

  previousState() {
    window.history.back();
  }

  save() {
    this.isSaving = true;
    const participacao = this.createFromForm();
    if (participacao.id !== undefined) {
      this.subscribeToSaveResponse(this.participacaoService.update(participacao));
    } else {
      this.subscribeToSaveResponse(this.participacaoService.create(participacao));
    }
  }

  private createFromForm(): IParticipacao {
    const entity = {
      ...new Participacao(),
      id: this.editForm.get(['id']).value,
      dataHoraEmissaoCertificado:
        this.editForm.get(['dataHoraEmissaoCertificado']).value != null
          ? moment(this.editForm.get(['dataHoraEmissaoCertificado']).value, DATE_TIME_FORMAT)
          : undefined,
      cargaHoraria: this.editForm.get(['cargaHoraria']).value,
      voluntario: this.editForm.get(['voluntario']).value,
      acao: this.editForm.get(['acao']).value
    };
    return entity;
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IParticipacao>>) {
    result.subscribe((res: HttpResponse<IParticipacao>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
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

  trackAcaoById(index: number, item: IAcao) {
    return item.id;
  }
}
