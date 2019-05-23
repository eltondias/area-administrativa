import { Component, OnInit } from '@angular/core';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { JhiAlertService } from 'ng-jhipster';
import { IEmail, Email } from 'app/shared/model/email.model';
import { EmailService } from './email.service';
import { IVoluntario } from 'app/shared/model/voluntario.model';
import { VoluntarioService } from 'app/entities/voluntario';

@Component({
  selector: 'jhi-email-update',
  templateUrl: './email-update.component.html'
})
export class EmailUpdateComponent implements OnInit {
  email: IEmail;
  isSaving: boolean;

  voluntarios: IVoluntario[];

  editForm = this.fb.group({
    id: [],
    email: [],
    voluntario: [null, Validators.required]
  });

  constructor(
    protected jhiAlertService: JhiAlertService,
    protected emailService: EmailService,
    protected voluntarioService: VoluntarioService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.isSaving = false;
    this.activatedRoute.data.subscribe(({ email }) => {
      this.updateForm(email);
      this.email = email;
    });
    this.voluntarioService
      .query()
      .pipe(
        filter((mayBeOk: HttpResponse<IVoluntario[]>) => mayBeOk.ok),
        map((response: HttpResponse<IVoluntario[]>) => response.body)
      )
      .subscribe((res: IVoluntario[]) => (this.voluntarios = res), (res: HttpErrorResponse) => this.onError(res.message));
  }

  updateForm(email: IEmail) {
    this.editForm.patchValue({
      id: email.id,
      email: email.email,
      voluntario: email.voluntario
    });
  }

  previousState() {
    window.history.back();
  }

  save() {
    this.isSaving = true;
    const email = this.createFromForm();
    if (email.id !== undefined) {
      this.subscribeToSaveResponse(this.emailService.update(email));
    } else {
      this.subscribeToSaveResponse(this.emailService.create(email));
    }
  }

  private createFromForm(): IEmail {
    const entity = {
      ...new Email(),
      id: this.editForm.get(['id']).value,
      email: this.editForm.get(['email']).value,
      voluntario: this.editForm.get(['voluntario']).value
    };
    return entity;
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IEmail>>) {
    result.subscribe((res: HttpResponse<IEmail>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
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
