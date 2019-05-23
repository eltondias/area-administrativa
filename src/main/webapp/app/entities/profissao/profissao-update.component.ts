import { Component, OnInit } from '@angular/core';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { JhiAlertService } from 'ng-jhipster';
import { IProfissao, Profissao } from 'app/shared/model/profissao.model';
import { ProfissaoService } from './profissao.service';
import { IVoluntario } from 'app/shared/model/voluntario.model';
import { VoluntarioService } from 'app/entities/voluntario';

@Component({
  selector: 'jhi-profissao-update',
  templateUrl: './profissao-update.component.html'
})
export class ProfissaoUpdateComponent implements OnInit {
  profissao: IProfissao;
  isSaving: boolean;

  voluntarios: IVoluntario[];

  editForm = this.fb.group({
    id: [],
    nome: [null, [Validators.required]],
    descricao: [null, [Validators.required]]
  });

  constructor(
    protected jhiAlertService: JhiAlertService,
    protected profissaoService: ProfissaoService,
    protected voluntarioService: VoluntarioService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.isSaving = false;
    this.activatedRoute.data.subscribe(({ profissao }) => {
      this.updateForm(profissao);
      this.profissao = profissao;
    });
    this.voluntarioService
      .query()
      .pipe(
        filter((mayBeOk: HttpResponse<IVoluntario[]>) => mayBeOk.ok),
        map((response: HttpResponse<IVoluntario[]>) => response.body)
      )
      .subscribe((res: IVoluntario[]) => (this.voluntarios = res), (res: HttpErrorResponse) => this.onError(res.message));
  }

  updateForm(profissao: IProfissao) {
    this.editForm.patchValue({
      id: profissao.id,
      nome: profissao.nome,
      descricao: profissao.descricao
    });
  }

  previousState() {
    window.history.back();
  }

  save() {
    this.isSaving = true;
    const profissao = this.createFromForm();
    if (profissao.id !== undefined) {
      this.subscribeToSaveResponse(this.profissaoService.update(profissao));
    } else {
      this.subscribeToSaveResponse(this.profissaoService.create(profissao));
    }
  }

  private createFromForm(): IProfissao {
    const entity = {
      ...new Profissao(),
      id: this.editForm.get(['id']).value,
      nome: this.editForm.get(['nome']).value,
      descricao: this.editForm.get(['descricao']).value
    };
    return entity;
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IProfissao>>) {
    result.subscribe((res: HttpResponse<IProfissao>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
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

  getSelected(selectedVals: Array<any>, option: any) {
    if (selectedVals) {
      for (let i = 0; i < selectedVals.length; i++) {
        if (option.id === selectedVals[i].id) {
          return selectedVals[i];
        }
      }
    }
    return option;
  }
}
