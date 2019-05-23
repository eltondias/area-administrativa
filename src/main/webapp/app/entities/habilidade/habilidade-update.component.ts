import { Component, OnInit } from '@angular/core';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { JhiAlertService } from 'ng-jhipster';
import { IHabilidade, Habilidade } from 'app/shared/model/habilidade.model';
import { HabilidadeService } from './habilidade.service';
import { IVoluntario } from 'app/shared/model/voluntario.model';
import { VoluntarioService } from 'app/entities/voluntario';

@Component({
  selector: 'jhi-habilidade-update',
  templateUrl: './habilidade-update.component.html'
})
export class HabilidadeUpdateComponent implements OnInit {
  habilidade: IHabilidade;
  isSaving: boolean;

  voluntarios: IVoluntario[];

  editForm = this.fb.group({
    id: [],
    nome: [null, [Validators.required]],
    descricao: [null, [Validators.required]]
  });

  constructor(
    protected jhiAlertService: JhiAlertService,
    protected habilidadeService: HabilidadeService,
    protected voluntarioService: VoluntarioService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.isSaving = false;
    this.activatedRoute.data.subscribe(({ habilidade }) => {
      this.updateForm(habilidade);
      this.habilidade = habilidade;
    });
    this.voluntarioService
      .query()
      .pipe(
        filter((mayBeOk: HttpResponse<IVoluntario[]>) => mayBeOk.ok),
        map((response: HttpResponse<IVoluntario[]>) => response.body)
      )
      .subscribe((res: IVoluntario[]) => (this.voluntarios = res), (res: HttpErrorResponse) => this.onError(res.message));
  }

  updateForm(habilidade: IHabilidade) {
    this.editForm.patchValue({
      id: habilidade.id,
      nome: habilidade.nome,
      descricao: habilidade.descricao
    });
  }

  previousState() {
    window.history.back();
  }

  save() {
    this.isSaving = true;
    const habilidade = this.createFromForm();
    if (habilidade.id !== undefined) {
      this.subscribeToSaveResponse(this.habilidadeService.update(habilidade));
    } else {
      this.subscribeToSaveResponse(this.habilidadeService.create(habilidade));
    }
  }

  private createFromForm(): IHabilidade {
    const entity = {
      ...new Habilidade(),
      id: this.editForm.get(['id']).value,
      nome: this.editForm.get(['nome']).value,
      descricao: this.editForm.get(['descricao']).value
    };
    return entity;
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IHabilidade>>) {
    result.subscribe((res: HttpResponse<IHabilidade>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
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
