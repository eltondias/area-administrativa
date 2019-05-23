import { Component, OnInit } from '@angular/core';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { JhiAlertService } from 'ng-jhipster';
import { IRecursoNecessario, RecursoNecessario } from 'app/shared/model/recurso-necessario.model';
import { RecursoNecessarioService } from './recurso-necessario.service';
import { IAcao } from 'app/shared/model/acao.model';
import { AcaoService } from 'app/entities/acao';
import { ICampanha } from 'app/shared/model/campanha.model';
import { CampanhaService } from 'app/entities/campanha';

@Component({
  selector: 'jhi-recurso-necessario-update',
  templateUrl: './recurso-necessario-update.component.html'
})
export class RecursoNecessarioUpdateComponent implements OnInit {
  recursoNecessario: IRecursoNecessario;
  isSaving: boolean;

  acaos: IAcao[];

  campanhas: ICampanha[];

  editForm = this.fb.group({
    id: [],
    nome: [null, [Validators.required]],
    descricao: [null, [Validators.required]],
    quantidade: [null, [Validators.required]],
    isFinanceiro: [null, [Validators.required]],
    valor: [null, [Validators.required]],
    acao: [],
    campanha: [null, Validators.required]
  });

  constructor(
    protected jhiAlertService: JhiAlertService,
    protected recursoNecessarioService: RecursoNecessarioService,
    protected acaoService: AcaoService,
    protected campanhaService: CampanhaService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.isSaving = false;
    this.activatedRoute.data.subscribe(({ recursoNecessario }) => {
      this.updateForm(recursoNecessario);
      this.recursoNecessario = recursoNecessario;
    });
    this.acaoService
      .query()
      .pipe(
        filter((mayBeOk: HttpResponse<IAcao[]>) => mayBeOk.ok),
        map((response: HttpResponse<IAcao[]>) => response.body)
      )
      .subscribe((res: IAcao[]) => (this.acaos = res), (res: HttpErrorResponse) => this.onError(res.message));
    this.campanhaService
      .query()
      .pipe(
        filter((mayBeOk: HttpResponse<ICampanha[]>) => mayBeOk.ok),
        map((response: HttpResponse<ICampanha[]>) => response.body)
      )
      .subscribe((res: ICampanha[]) => (this.campanhas = res), (res: HttpErrorResponse) => this.onError(res.message));
  }

  updateForm(recursoNecessario: IRecursoNecessario) {
    this.editForm.patchValue({
      id: recursoNecessario.id,
      nome: recursoNecessario.nome,
      descricao: recursoNecessario.descricao,
      quantidade: recursoNecessario.quantidade,
      isFinanceiro: recursoNecessario.isFinanceiro,
      valor: recursoNecessario.valor,
      acao: recursoNecessario.acao,
      campanha: recursoNecessario.campanha
    });
  }

  previousState() {
    window.history.back();
  }

  save() {
    this.isSaving = true;
    const recursoNecessario = this.createFromForm();
    if (recursoNecessario.id !== undefined) {
      this.subscribeToSaveResponse(this.recursoNecessarioService.update(recursoNecessario));
    } else {
      this.subscribeToSaveResponse(this.recursoNecessarioService.create(recursoNecessario));
    }
  }

  private createFromForm(): IRecursoNecessario {
    const entity = {
      ...new RecursoNecessario(),
      id: this.editForm.get(['id']).value,
      nome: this.editForm.get(['nome']).value,
      descricao: this.editForm.get(['descricao']).value,
      quantidade: this.editForm.get(['quantidade']).value,
      isFinanceiro: this.editForm.get(['isFinanceiro']).value,
      valor: this.editForm.get(['valor']).value,
      acao: this.editForm.get(['acao']).value,
      campanha: this.editForm.get(['campanha']).value
    };
    return entity;
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IRecursoNecessario>>) {
    result.subscribe((res: HttpResponse<IRecursoNecessario>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
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

  trackAcaoById(index: number, item: IAcao) {
    return item.id;
  }

  trackCampanhaById(index: number, item: ICampanha) {
    return item.id;
  }
}
