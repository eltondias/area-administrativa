import { Component, OnInit } from '@angular/core';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { JhiAlertService } from 'ng-jhipster';
import { IProfissaoNecessariaAcao, ProfissaoNecessariaAcao } from 'app/shared/model/profissao-necessaria-acao.model';
import { ProfissaoNecessariaAcaoService } from './profissao-necessaria-acao.service';
import { IProfissao } from 'app/shared/model/profissao.model';
import { ProfissaoService } from 'app/entities/profissao';
import { IAcao } from 'app/shared/model/acao.model';
import { AcaoService } from 'app/entities/acao';

@Component({
  selector: 'jhi-profissao-necessaria-acao-update',
  templateUrl: './profissao-necessaria-acao-update.component.html'
})
export class ProfissaoNecessariaAcaoUpdateComponent implements OnInit {
  profissaoNecessariaAcao: IProfissaoNecessariaAcao;
  isSaving: boolean;

  profissaos: IProfissao[];

  acaos: IAcao[];

  editForm = this.fb.group({
    id: [],
    quantidadeMinima: [null, [Validators.required]],
    profissao: [null, Validators.required],
    acao: [null, Validators.required]
  });

  constructor(
    protected jhiAlertService: JhiAlertService,
    protected profissaoNecessariaAcaoService: ProfissaoNecessariaAcaoService,
    protected profissaoService: ProfissaoService,
    protected acaoService: AcaoService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.isSaving = false;
    this.activatedRoute.data.subscribe(({ profissaoNecessariaAcao }) => {
      this.updateForm(profissaoNecessariaAcao);
      this.profissaoNecessariaAcao = profissaoNecessariaAcao;
    });
    this.profissaoService
      .query()
      .pipe(
        filter((mayBeOk: HttpResponse<IProfissao[]>) => mayBeOk.ok),
        map((response: HttpResponse<IProfissao[]>) => response.body)
      )
      .subscribe((res: IProfissao[]) => (this.profissaos = res), (res: HttpErrorResponse) => this.onError(res.message));
    this.acaoService
      .query()
      .pipe(
        filter((mayBeOk: HttpResponse<IAcao[]>) => mayBeOk.ok),
        map((response: HttpResponse<IAcao[]>) => response.body)
      )
      .subscribe((res: IAcao[]) => (this.acaos = res), (res: HttpErrorResponse) => this.onError(res.message));
  }

  updateForm(profissaoNecessariaAcao: IProfissaoNecessariaAcao) {
    this.editForm.patchValue({
      id: profissaoNecessariaAcao.id,
      quantidadeMinima: profissaoNecessariaAcao.quantidadeMinima,
      profissao: profissaoNecessariaAcao.profissao,
      acao: profissaoNecessariaAcao.acao
    });
  }

  previousState() {
    window.history.back();
  }

  save() {
    this.isSaving = true;
    const profissaoNecessariaAcao = this.createFromForm();
    if (profissaoNecessariaAcao.id !== undefined) {
      this.subscribeToSaveResponse(this.profissaoNecessariaAcaoService.update(profissaoNecessariaAcao));
    } else {
      this.subscribeToSaveResponse(this.profissaoNecessariaAcaoService.create(profissaoNecessariaAcao));
    }
  }

  private createFromForm(): IProfissaoNecessariaAcao {
    const entity = {
      ...new ProfissaoNecessariaAcao(),
      id: this.editForm.get(['id']).value,
      quantidadeMinima: this.editForm.get(['quantidadeMinima']).value,
      profissao: this.editForm.get(['profissao']).value,
      acao: this.editForm.get(['acao']).value
    };
    return entity;
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IProfissaoNecessariaAcao>>) {
    result.subscribe((res: HttpResponse<IProfissaoNecessariaAcao>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
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

  trackProfissaoById(index: number, item: IProfissao) {
    return item.id;
  }

  trackAcaoById(index: number, item: IAcao) {
    return item.id;
  }
}
