import { Component, OnInit } from '@angular/core';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { JhiAlertService } from 'ng-jhipster';
import { ITelefone, Telefone } from 'app/shared/model/telefone.model';
import { TelefoneService } from './telefone.service';
import { IVoluntario } from 'app/shared/model/voluntario.model';
import { VoluntarioService } from 'app/entities/voluntario';

@Component({
  selector: 'jhi-telefone-update',
  templateUrl: './telefone-update.component.html'
})
export class TelefoneUpdateComponent implements OnInit {
  telefone: ITelefone;
  isSaving: boolean;

  voluntarios: IVoluntario[];

  editForm = this.fb.group({
    id: [],
    ddd: [],
    numero: [],
    voluntario: [null, Validators.required]
  });

  constructor(
    protected jhiAlertService: JhiAlertService,
    protected telefoneService: TelefoneService,
    protected voluntarioService: VoluntarioService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.isSaving = false;
    this.activatedRoute.data.subscribe(({ telefone }) => {
      this.updateForm(telefone);
      this.telefone = telefone;
    });
    this.voluntarioService
      .query()
      .pipe(
        filter((mayBeOk: HttpResponse<IVoluntario[]>) => mayBeOk.ok),
        map((response: HttpResponse<IVoluntario[]>) => response.body)
      )
      .subscribe((res: IVoluntario[]) => (this.voluntarios = res), (res: HttpErrorResponse) => this.onError(res.message));
  }

  updateForm(telefone: ITelefone) {
    this.editForm.patchValue({
      id: telefone.id,
      ddd: telefone.ddd,
      numero: telefone.numero,
      voluntario: telefone.voluntario
    });
  }

  previousState() {
    window.history.back();
  }

  save() {
    this.isSaving = true;
    const telefone = this.createFromForm();
    if (telefone.id !== undefined) {
      this.subscribeToSaveResponse(this.telefoneService.update(telefone));
    } else {
      this.subscribeToSaveResponse(this.telefoneService.create(telefone));
    }
  }

  private createFromForm(): ITelefone {
    const entity = {
      ...new Telefone(),
      id: this.editForm.get(['id']).value,
      ddd: this.editForm.get(['ddd']).value,
      numero: this.editForm.get(['numero']).value,
      voluntario: this.editForm.get(['voluntario']).value
    };
    return entity;
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<ITelefone>>) {
    result.subscribe((res: HttpResponse<ITelefone>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
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
