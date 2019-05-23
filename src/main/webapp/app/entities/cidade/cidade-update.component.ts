import { Component, OnInit } from '@angular/core';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { JhiAlertService } from 'ng-jhipster';
import { ICidade, Cidade } from 'app/shared/model/cidade.model';
import { CidadeService } from './cidade.service';
import { IEstado } from 'app/shared/model/estado.model';
import { EstadoService } from 'app/entities/estado';

@Component({
  selector: 'jhi-cidade-update',
  templateUrl: './cidade-update.component.html'
})
export class CidadeUpdateComponent implements OnInit {
  cidade: ICidade;
  isSaving: boolean;

  estados: IEstado[];

  editForm = this.fb.group({
    id: [],
    nome: [null, [Validators.required]],
    latitude: [],
    longitude: [],
    estado: [null, Validators.required]
  });

  constructor(
    protected jhiAlertService: JhiAlertService,
    protected cidadeService: CidadeService,
    protected estadoService: EstadoService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.isSaving = false;
    this.activatedRoute.data.subscribe(({ cidade }) => {
      this.updateForm(cidade);
      this.cidade = cidade;
    });
    this.estadoService
      .query()
      .pipe(
        filter((mayBeOk: HttpResponse<IEstado[]>) => mayBeOk.ok),
        map((response: HttpResponse<IEstado[]>) => response.body)
      )
      .subscribe((res: IEstado[]) => (this.estados = res), (res: HttpErrorResponse) => this.onError(res.message));
  }

  updateForm(cidade: ICidade) {
    this.editForm.patchValue({
      id: cidade.id,
      nome: cidade.nome,
      latitude: cidade.latitude,
      longitude: cidade.longitude,
      estado: cidade.estado
    });
  }

  previousState() {
    window.history.back();
  }

  save() {
    this.isSaving = true;
    const cidade = this.createFromForm();
    if (cidade.id !== undefined) {
      this.subscribeToSaveResponse(this.cidadeService.update(cidade));
    } else {
      this.subscribeToSaveResponse(this.cidadeService.create(cidade));
    }
  }

  private createFromForm(): ICidade {
    const entity = {
      ...new Cidade(),
      id: this.editForm.get(['id']).value,
      nome: this.editForm.get(['nome']).value,
      latitude: this.editForm.get(['latitude']).value,
      longitude: this.editForm.get(['longitude']).value,
      estado: this.editForm.get(['estado']).value
    };
    return entity;
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<ICidade>>) {
    result.subscribe((res: HttpResponse<ICidade>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
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

  trackEstadoById(index: number, item: IEstado) {
    return item.id;
  }
}
