import { Component, OnInit } from '@angular/core';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { IEstado, Estado } from 'app/shared/model/estado.model';
import { EstadoService } from './estado.service';

@Component({
  selector: 'jhi-estado-update',
  templateUrl: './estado-update.component.html'
})
export class EstadoUpdateComponent implements OnInit {
  estado: IEstado;
  isSaving: boolean;

  editForm = this.fb.group({
    id: [],
    nome: [null, [Validators.required]],
    sigla: [null, [Validators.required]]
  });

  constructor(protected estadoService: EstadoService, protected activatedRoute: ActivatedRoute, private fb: FormBuilder) {}

  ngOnInit() {
    this.isSaving = false;
    this.activatedRoute.data.subscribe(({ estado }) => {
      this.updateForm(estado);
      this.estado = estado;
    });
  }

  updateForm(estado: IEstado) {
    this.editForm.patchValue({
      id: estado.id,
      nome: estado.nome,
      sigla: estado.sigla
    });
  }

  previousState() {
    window.history.back();
  }

  save() {
    this.isSaving = true;
    const estado = this.createFromForm();
    if (estado.id !== undefined) {
      this.subscribeToSaveResponse(this.estadoService.update(estado));
    } else {
      this.subscribeToSaveResponse(this.estadoService.create(estado));
    }
  }

  private createFromForm(): IEstado {
    const entity = {
      ...new Estado(),
      id: this.editForm.get(['id']).value,
      nome: this.editForm.get(['nome']).value,
      sigla: this.editForm.get(['sigla']).value
    };
    return entity;
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IEstado>>) {
    result.subscribe((res: HttpResponse<IEstado>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
  }

  protected onSaveSuccess() {
    this.isSaving = false;
    this.previousState();
  }

  protected onSaveError() {
    this.isSaving = false;
  }
}
