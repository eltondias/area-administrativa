import { Component, OnInit } from '@angular/core';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import * as moment from 'moment';
import { DATE_TIME_FORMAT } from 'app/shared/constants/input.constants';
import { JhiAlertService } from 'ng-jhipster';
import { IFormaPagamento, FormaPagamento } from 'app/shared/model/forma-pagamento.model';
import { FormaPagamentoService } from './forma-pagamento.service';
import { IDoacao } from 'app/shared/model/doacao.model';
import { DoacaoService } from 'app/entities/doacao';

@Component({
  selector: 'jhi-forma-pagamento-update',
  templateUrl: './forma-pagamento-update.component.html'
})
export class FormaPagamentoUpdateComponent implements OnInit {
  formaPagamento: IFormaPagamento;
  isSaving: boolean;

  doacaos: IDoacao[];

  editForm = this.fb.group({
    id: [],
    nome: [null, [Validators.required]],
    descricao: [],
    doacao: [null, Validators.required]
  });

  constructor(
    protected jhiAlertService: JhiAlertService,
    protected formaPagamentoService: FormaPagamentoService,
    protected doacaoService: DoacaoService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.isSaving = false;
    this.activatedRoute.data.subscribe(({ formaPagamento }) => {
      this.updateForm(formaPagamento);
      this.formaPagamento = formaPagamento;
    });
    this.doacaoService
      .query({ filter: 'formapagamento-is-null' })
      .pipe(
        filter((mayBeOk: HttpResponse<IDoacao[]>) => mayBeOk.ok),
        map((response: HttpResponse<IDoacao[]>) => response.body)
      )
      .subscribe(
        (res: IDoacao[]) => {
          if (!this.formaPagamento.doacao || !this.formaPagamento.doacao.id) {
            this.doacaos = res;
          } else {
            this.doacaoService
              .find(this.formaPagamento.doacao.id)
              .pipe(
                filter((subResMayBeOk: HttpResponse<IDoacao>) => subResMayBeOk.ok),
                map((subResponse: HttpResponse<IDoacao>) => subResponse.body)
              )
              .subscribe(
                (subRes: IDoacao) => (this.doacaos = [subRes].concat(res)),
                (subRes: HttpErrorResponse) => this.onError(subRes.message)
              );
          }
        },
        (res: HttpErrorResponse) => this.onError(res.message)
      );
  }

  updateForm(formaPagamento: IFormaPagamento) {
    this.editForm.patchValue({
      id: formaPagamento.id,
      nome: formaPagamento.nome,
      descricao: formaPagamento.descricao != null ? formaPagamento.descricao.format(DATE_TIME_FORMAT) : null,
      doacao: formaPagamento.doacao
    });
  }

  previousState() {
    window.history.back();
  }

  save() {
    this.isSaving = true;
    const formaPagamento = this.createFromForm();
    if (formaPagamento.id !== undefined) {
      this.subscribeToSaveResponse(this.formaPagamentoService.update(formaPagamento));
    } else {
      this.subscribeToSaveResponse(this.formaPagamentoService.create(formaPagamento));
    }
  }

  private createFromForm(): IFormaPagamento {
    const entity = {
      ...new FormaPagamento(),
      id: this.editForm.get(['id']).value,
      nome: this.editForm.get(['nome']).value,
      descricao:
        this.editForm.get(['descricao']).value != null ? moment(this.editForm.get(['descricao']).value, DATE_TIME_FORMAT) : undefined,
      doacao: this.editForm.get(['doacao']).value
    };
    return entity;
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IFormaPagamento>>) {
    result.subscribe((res: HttpResponse<IFormaPagamento>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
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

  trackDoacaoById(index: number, item: IDoacao) {
    return item.id;
  }
}
