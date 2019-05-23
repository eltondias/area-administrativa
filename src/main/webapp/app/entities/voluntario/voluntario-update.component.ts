import { Component, OnInit } from '@angular/core';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import * as moment from 'moment';
import { DATE_TIME_FORMAT } from 'app/shared/constants/input.constants';
import { JhiAlertService } from 'ng-jhipster';
import { IVoluntario, Voluntario } from 'app/shared/model/voluntario.model';
import { VoluntarioService } from './voluntario.service';
import { IHabilidade } from 'app/shared/model/habilidade.model';
import { HabilidadeService } from 'app/entities/habilidade';
import { IProfissao } from 'app/shared/model/profissao.model';
import { ProfissaoService } from 'app/entities/profissao';

@Component({
  selector: 'jhi-voluntario-update',
  templateUrl: './voluntario-update.component.html'
})
export class VoluntarioUpdateComponent implements OnInit {
  voluntario: IVoluntario;
  isSaving: boolean;

  habilidades: IHabilidade[];

  profissaos: IProfissao[];

  editForm = this.fb.group({
    id: [],
    nome: [null, [Validators.required]],
    urlFotoPerfil: [],
    cpf: [null, [Validators.required]],
    login: [null, [Validators.required]],
    senha: [null, [Validators.required]],
    isAdmin: [null, [Validators.required]],
    dataNascimento: [],
    dataCadastro: [],
    situacao: [null, [Validators.required]],
    habilidades: [],
    profissaos: []
  });

  constructor(
    protected jhiAlertService: JhiAlertService,
    protected voluntarioService: VoluntarioService,
    protected habilidadeService: HabilidadeService,
    protected profissaoService: ProfissaoService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.isSaving = false;
    this.activatedRoute.data.subscribe(({ voluntario }) => {
      this.updateForm(voluntario);
      this.voluntario = voluntario;
    });
    this.habilidadeService
      .query()
      .pipe(
        filter((mayBeOk: HttpResponse<IHabilidade[]>) => mayBeOk.ok),
        map((response: HttpResponse<IHabilidade[]>) => response.body)
      )
      .subscribe((res: IHabilidade[]) => (this.habilidades = res), (res: HttpErrorResponse) => this.onError(res.message));
    this.profissaoService
      .query()
      .pipe(
        filter((mayBeOk: HttpResponse<IProfissao[]>) => mayBeOk.ok),
        map((response: HttpResponse<IProfissao[]>) => response.body)
      )
      .subscribe((res: IProfissao[]) => (this.profissaos = res), (res: HttpErrorResponse) => this.onError(res.message));
  }

  updateForm(voluntario: IVoluntario) {
    this.editForm.patchValue({
      id: voluntario.id,
      nome: voluntario.nome,
      urlFotoPerfil: voluntario.urlFotoPerfil,
      cpf: voluntario.cpf,
      login: voluntario.login,
      senha: voluntario.senha,
      isAdmin: voluntario.isAdmin,
      dataNascimento: voluntario.dataNascimento != null ? voluntario.dataNascimento.format(DATE_TIME_FORMAT) : null,
      dataCadastro: voluntario.dataCadastro != null ? voluntario.dataCadastro.format(DATE_TIME_FORMAT) : null,
      situacao: voluntario.situacao,
      habilidades: voluntario.habilidades,
      profissaos: voluntario.profissaos
    });
  }

  previousState() {
    window.history.back();
  }

  save() {
    this.isSaving = true;
    const voluntario = this.createFromForm();
    if (voluntario.id !== undefined) {
      this.subscribeToSaveResponse(this.voluntarioService.update(voluntario));
    } else {
      this.subscribeToSaveResponse(this.voluntarioService.create(voluntario));
    }
  }

  private createFromForm(): IVoluntario {
    const entity = {
      ...new Voluntario(),
      id: this.editForm.get(['id']).value,
      nome: this.editForm.get(['nome']).value,
      urlFotoPerfil: this.editForm.get(['urlFotoPerfil']).value,
      cpf: this.editForm.get(['cpf']).value,
      login: this.editForm.get(['login']).value,
      senha: this.editForm.get(['senha']).value,
      isAdmin: this.editForm.get(['isAdmin']).value,
      dataNascimento:
        this.editForm.get(['dataNascimento']).value != null
          ? moment(this.editForm.get(['dataNascimento']).value, DATE_TIME_FORMAT)
          : undefined,
      dataCadastro:
        this.editForm.get(['dataCadastro']).value != null ? moment(this.editForm.get(['dataCadastro']).value, DATE_TIME_FORMAT) : undefined,
      situacao: this.editForm.get(['situacao']).value,
      habilidades: this.editForm.get(['habilidades']).value,
      profissaos: this.editForm.get(['profissaos']).value
    };
    return entity;
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IVoluntario>>) {
    result.subscribe((res: HttpResponse<IVoluntario>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
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

  trackHabilidadeById(index: number, item: IHabilidade) {
    return item.id;
  }

  trackProfissaoById(index: number, item: IProfissao) {
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
