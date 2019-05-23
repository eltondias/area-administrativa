import { Component, OnInit } from '@angular/core';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { DATE_TIME_FORMAT } from 'app/shared/constants/input.constants';
import { IAcao, Acao } from 'app/shared/model/acao.model';
import { AcaoService } from './acao.service';

@Component({
  selector: 'jhi-acao-update',
  templateUrl: './acao-update.component.html'
})
export class AcaoUpdateComponent implements OnInit {
  acao: IAcao;
  isSaving: boolean;

  editForm = this.fb.group({
    id: [],
    nome: [null, [Validators.required]],
    descricao: [null, [Validators.required]],
    meta: [],
    banner: [],
    dataHoraInicio: [null, [Validators.required]],
    dataHoraFim: [null, [Validators.required]],
    custos: [],
    situacaoAcao: [null, [Validators.required]]
  });

  constructor(protected acaoService: AcaoService, protected activatedRoute: ActivatedRoute, private fb: FormBuilder) {}

  ngOnInit() {
    this.isSaving = false;
    this.activatedRoute.data.subscribe(({ acao }) => {
      this.updateForm(acao);
      this.acao = acao;
    });
  }

  updateForm(acao: IAcao) {
    this.editForm.patchValue({
      id: acao.id,
      nome: acao.nome,
      descricao: acao.descricao,
      meta: acao.meta,
      banner: acao.banner,
      dataHoraInicio: acao.dataHoraInicio != null ? acao.dataHoraInicio.format(DATE_TIME_FORMAT) : null,
      dataHoraFim: acao.dataHoraFim != null ? acao.dataHoraFim.format(DATE_TIME_FORMAT) : null,
      custos: acao.custos,
      situacaoAcao: acao.situacaoAcao
    });
  }

  previousState() {
    window.history.back();
  }

  save() {
    this.isSaving = true;
    const acao = this.createFromForm();
    if (acao.id !== undefined) {
      this.subscribeToSaveResponse(this.acaoService.update(acao));
    } else {
      this.subscribeToSaveResponse(this.acaoService.create(acao));
    }
  }

  private createFromForm(): IAcao {
    const entity = {
      ...new Acao(),
      id: this.editForm.get(['id']).value,
      nome: this.editForm.get(['nome']).value,
      descricao: this.editForm.get(['descricao']).value,
      meta: this.editForm.get(['meta']).value,
      banner: this.editForm.get(['banner']).value,
      dataHoraInicio:
        this.editForm.get(['dataHoraInicio']).value != null
          ? moment(this.editForm.get(['dataHoraInicio']).value, DATE_TIME_FORMAT)
          : undefined,
      dataHoraFim:
        this.editForm.get(['dataHoraFim']).value != null ? moment(this.editForm.get(['dataHoraFim']).value, DATE_TIME_FORMAT) : undefined,
      custos: this.editForm.get(['custos']).value,
      situacaoAcao: this.editForm.get(['situacaoAcao']).value
    };
    return entity;
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IAcao>>) {
    result.subscribe((res: HttpResponse<IAcao>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
  }

  protected onSaveSuccess() {
    this.isSaving = false;
    this.previousState();
  }

  protected onSaveError() {
    this.isSaving = false;
  }
}
