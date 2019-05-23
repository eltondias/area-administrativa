import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { IVoluntario } from 'app/shared/model/voluntario.model';
import { AccountService } from 'app/core';
import { VoluntarioService } from './voluntario.service';

@Component({
  selector: 'jhi-voluntario',
  templateUrl: './voluntario.component.html'
})
export class VoluntarioComponent implements OnInit, OnDestroy {
  voluntarios: IVoluntario[];
  currentAccount: any;
  eventSubscriber: Subscription;

  constructor(
    protected voluntarioService: VoluntarioService,
    protected jhiAlertService: JhiAlertService,
    protected eventManager: JhiEventManager,
    protected accountService: AccountService
  ) {}

  loadAll() {
    this.voluntarioService
      .query()
      .pipe(
        filter((res: HttpResponse<IVoluntario[]>) => res.ok),
        map((res: HttpResponse<IVoluntario[]>) => res.body)
      )
      .subscribe(
        (res: IVoluntario[]) => {
          this.voluntarios = res;
        },
        (res: HttpErrorResponse) => this.onError(res.message)
      );
  }

  ngOnInit() {
    this.loadAll();
    this.accountService.identity().then(account => {
      this.currentAccount = account;
    });
    this.registerChangeInVoluntarios();
  }

  ngOnDestroy() {
    this.eventManager.destroy(this.eventSubscriber);
  }

  trackId(index: number, item: IVoluntario) {
    return item.id;
  }

  registerChangeInVoluntarios() {
    this.eventSubscriber = this.eventManager.subscribe('voluntarioListModification', response => this.loadAll());
  }

  protected onError(errorMessage: string) {
    this.jhiAlertService.error(errorMessage, null, null);
  }
}
