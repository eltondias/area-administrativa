import { Component, OnInit } from '@angular/core';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import * as moment from 'moment';
import { DATE_TIME_FORMAT } from 'app/shared/constants/input.constants';
import { JhiAlertService } from 'ng-jhipster';
import { IDoacao, Doacao } from 'app/shared/model/doacao.model';
import { DoacaoService } from './doacao.service';
import { IVoluntario } from 'app/shared/model/voluntario.model';
import { VoluntarioService } from 'app/entities/voluntario';
import { IRecursoNecessario } from 'app/shared/model/recurso-necessario.model';
import { RecursoNecessarioService } from 'app/entities/recurso-necessario';

@Component({
  selector: 'jhi-doacao-update',
  templateUrl: './doacao-update.component.html'
})
export class DoacaoUpdateComponent implements OnInit {
  doacao: IDoacao;
  isSaving: boolean;

  voluntarios: IVoluntario[];

  recursonecessarios: IRecursoNecessario[];

  editForm = this.fb.group({
    id: [],
    descricao: [null, [Validators.required]],
    quantidade: [null, [Validators.required]],
    isFinanceiro: [null, [Validators.required]],
    isAnomina: [null, [Validators.required]],
    dataHora: [null, [Validators.required]],
    doador: [null, Validators.required],
    recursoNecessario: [null, Validators.required]
  });

  constructor(
    protected jhiAlertService: JhiAlertService,
    protected doacaoService: DoacaoService,
    protected voluntarioService: VoluntarioService,
    protected recursoNecessarioService: RecursoNecessarioService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.isSaving = false;
    this.activatedRoute.data.subscribe(({ doacao }) => {
      this.updateForm(doacao);
      this.doacao = doacao;
    });
    this.voluntarioService
      .query()
      .pipe(
        filter((mayBeOk: HttpResponse<IVoluntario[]>) => mayBeOk.ok),
        map((response: HttpResponse<IVoluntario[]>) => response.body)
      )
      .subscribe((res: IVoluntario[]) => (this.voluntarios = res), (res: HttpErrorResponse) => this.onError(res.message));
    this.recursoNecessarioService
      .query()
      .pipe(
        filter((mayBeOk: HttpResponse<IRecursoNecessario[]>) => mayBeOk.ok),
        map((response: HttpResponse<IRecursoNecessario[]>) => response.body)
      )
      .subscribe((res: IRecursoNecessario[]) => (this.recursonecessarios = res), (res: HttpErrorResponse) => this.onError(res.message));
  }

  updateForm(doacao: IDoacao) {
    this.editForm.patchValue({
      id: doacao.id,
      descricao: doacao.descricao,
      quantidade: doacao.quantidade,
      isFinanceiro: doacao.isFinanceiro,
      isAnomina: doacao.isAnomina,
      dataHora: doacao.dataHora != null ? doacao.dataHora.format(DATE_TIME_FORMAT) : null,
      doador: doacao.doador,
      recursoNecessario: doacao.recursoNecessario
    });
  }

  previousState() {
    window.history.back();
  }

  save() {
    this.isSaving = true;
    const doacao = this.createFromForm();
    if (doacao.id !== undefined) {
      this.subscribeToSaveResponse(this.doacaoService.update(doacao));
    } else {
      this.subscribeToSaveResponse(this.doacaoService.create(doacao));
    }
  }

  private createFromForm(): IDoacao {
    const entity = {
      ...new Doacao(),
      id: this.editForm.get(['id']).value,
      descricao: this.editForm.get(['descricao']).value,
      quantidade: this.editForm.get(['quantidade']).value,
      isFinanceiro: this.editForm.get(['isFinanceiro']).value,
      isAnomina: this.editForm.get(['isAnomina']).value,
      dataHora: this.editForm.get(['dataHora']).value != null ? moment(this.editForm.get(['dataHora']).value, DATE_TIME_FORMAT) : undefined,
      doador: this.editForm.get(['doador']).value,
      recursoNecessario: this.editForm.get(['recursoNecessario']).value
    };
    return entity;
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IDoacao>>) {
    result.subscribe((res: HttpResponse<IDoacao>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
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

  trackRecursoNecessarioById(index: number, item: IRecursoNecessario) {
    return item.id;
  }
}
