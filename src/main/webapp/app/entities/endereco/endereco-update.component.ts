import { Component, OnInit } from '@angular/core';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { JhiAlertService } from 'ng-jhipster';
import { IEndereco, Endereco } from 'app/shared/model/endereco.model';
import { EnderecoService } from './endereco.service';
import { IVoluntario } from 'app/shared/model/voluntario.model';
import { VoluntarioService } from 'app/entities/voluntario';
import { ICidade } from 'app/shared/model/cidade.model';
import { CidadeService } from 'app/entities/cidade';
import { IAcao } from 'app/shared/model/acao.model';
import { AcaoService } from 'app/entities/acao';

@Component({
  selector: 'jhi-endereco-update',
  templateUrl: './endereco-update.component.html'
})
export class EnderecoUpdateComponent implements OnInit {
  endereco: IEndereco;
  isSaving: boolean;

  voluntarios: IVoluntario[];

  cidades: ICidade[];

  acaos: IAcao[];

  editForm = this.fb.group({
    id: [],
    logradouro: [null, [Validators.required]],
    numero: [null, [Validators.required]],
    complemento: [],
    bairro: [null, [Validators.required]],
    cep: [],
    latitude: [],
    longitude: [],
    voluntario: [],
    cidade: [null, Validators.required],
    acao: []
  });

  constructor(
    protected jhiAlertService: JhiAlertService,
    protected enderecoService: EnderecoService,
    protected voluntarioService: VoluntarioService,
    protected cidadeService: CidadeService,
    protected acaoService: AcaoService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.isSaving = false;
    this.activatedRoute.data.subscribe(({ endereco }) => {
      this.updateForm(endereco);
      this.endereco = endereco;
    });
    this.voluntarioService
      .query()
      .pipe(
        filter((mayBeOk: HttpResponse<IVoluntario[]>) => mayBeOk.ok),
        map((response: HttpResponse<IVoluntario[]>) => response.body)
      )
      .subscribe((res: IVoluntario[]) => (this.voluntarios = res), (res: HttpErrorResponse) => this.onError(res.message));
    this.cidadeService
      .query()
      .pipe(
        filter((mayBeOk: HttpResponse<ICidade[]>) => mayBeOk.ok),
        map((response: HttpResponse<ICidade[]>) => response.body)
      )
      .subscribe((res: ICidade[]) => (this.cidades = res), (res: HttpErrorResponse) => this.onError(res.message));
    this.acaoService
      .query()
      .pipe(
        filter((mayBeOk: HttpResponse<IAcao[]>) => mayBeOk.ok),
        map((response: HttpResponse<IAcao[]>) => response.body)
      )
      .subscribe((res: IAcao[]) => (this.acaos = res), (res: HttpErrorResponse) => this.onError(res.message));
  }

  updateForm(endereco: IEndereco) {
    this.editForm.patchValue({
      id: endereco.id,
      logradouro: endereco.logradouro,
      numero: endereco.numero,
      complemento: endereco.complemento,
      bairro: endereco.bairro,
      cep: endereco.cep,
      latitude: endereco.latitude,
      longitude: endereco.longitude,
      voluntario: endereco.voluntario,
      cidade: endereco.cidade,
      acao: endereco.acao
    });
  }

  previousState() {
    window.history.back();
  }

  save() {
    this.isSaving = true;
    const endereco = this.createFromForm();
    if (endereco.id !== undefined) {
      this.subscribeToSaveResponse(this.enderecoService.update(endereco));
    } else {
      this.subscribeToSaveResponse(this.enderecoService.create(endereco));
    }
  }

  private createFromForm(): IEndereco {
    const entity = {
      ...new Endereco(),
      id: this.editForm.get(['id']).value,
      logradouro: this.editForm.get(['logradouro']).value,
      numero: this.editForm.get(['numero']).value,
      complemento: this.editForm.get(['complemento']).value,
      bairro: this.editForm.get(['bairro']).value,
      cep: this.editForm.get(['cep']).value,
      latitude: this.editForm.get(['latitude']).value,
      longitude: this.editForm.get(['longitude']).value,
      voluntario: this.editForm.get(['voluntario']).value,
      cidade: this.editForm.get(['cidade']).value,
      acao: this.editForm.get(['acao']).value
    };
    return entity;
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IEndereco>>) {
    result.subscribe((res: HttpResponse<IEndereco>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
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

  trackCidadeById(index: number, item: ICidade) {
    return item.id;
  }

  trackAcaoById(index: number, item: IAcao) {
    return item.id;
  }
}
