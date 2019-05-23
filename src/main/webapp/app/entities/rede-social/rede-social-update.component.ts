import { Component, OnInit } from '@angular/core';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { JhiAlertService } from 'ng-jhipster';
import { IRedeSocial, RedeSocial } from 'app/shared/model/rede-social.model';
import { RedeSocialService } from './rede-social.service';
import { IVoluntario } from 'app/shared/model/voluntario.model';
import { VoluntarioService } from 'app/entities/voluntario';

@Component({
  selector: 'jhi-rede-social-update',
  templateUrl: './rede-social-update.component.html'
})
export class RedeSocialUpdateComponent implements OnInit {
  redeSocial: IRedeSocial;
  isSaving: boolean;

  voluntarios: IVoluntario[];

  editForm = this.fb.group({
    id: [],
    tipoRedeSocial: [],
    url: [],
    voluntario: [null, Validators.required]
  });

  constructor(
    protected jhiAlertService: JhiAlertService,
    protected redeSocialService: RedeSocialService,
    protected voluntarioService: VoluntarioService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.isSaving = false;
    this.activatedRoute.data.subscribe(({ redeSocial }) => {
      this.updateForm(redeSocial);
      this.redeSocial = redeSocial;
    });
    this.voluntarioService
      .query()
      .pipe(
        filter((mayBeOk: HttpResponse<IVoluntario[]>) => mayBeOk.ok),
        map((response: HttpResponse<IVoluntario[]>) => response.body)
      )
      .subscribe((res: IVoluntario[]) => (this.voluntarios = res), (res: HttpErrorResponse) => this.onError(res.message));
  }

  updateForm(redeSocial: IRedeSocial) {
    this.editForm.patchValue({
      id: redeSocial.id,
      tipoRedeSocial: redeSocial.tipoRedeSocial,
      url: redeSocial.url,
      voluntario: redeSocial.voluntario
    });
  }

  previousState() {
    window.history.back();
  }

  save() {
    this.isSaving = true;
    const redeSocial = this.createFromForm();
    if (redeSocial.id !== undefined) {
      this.subscribeToSaveResponse(this.redeSocialService.update(redeSocial));
    } else {
      this.subscribeToSaveResponse(this.redeSocialService.create(redeSocial));
    }
  }

  private createFromForm(): IRedeSocial {
    const entity = {
      ...new RedeSocial(),
      id: this.editForm.get(['id']).value,
      tipoRedeSocial: this.editForm.get(['tipoRedeSocial']).value,
      url: this.editForm.get(['url']).value,
      voluntario: this.editForm.get(['voluntario']).value
    };
    return entity;
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IRedeSocial>>) {
    result.subscribe((res: HttpResponse<IRedeSocial>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
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
