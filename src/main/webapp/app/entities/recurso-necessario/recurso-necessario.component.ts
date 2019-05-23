import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { IRecursoNecessario } from 'app/shared/model/recurso-necessario.model';
import { AccountService } from 'app/core';
import { RecursoNecessarioService } from './recurso-necessario.service';

@Component({
  selector: 'jhi-recurso-necessario',
  templateUrl: './recurso-necessario.component.html'
})
export class RecursoNecessarioComponent implements OnInit, OnDestroy {
  recursoNecessarios: IRecursoNecessario[];
  currentAccount: any;
  eventSubscriber: Subscription;

  constructor(
    protected recursoNecessarioService: RecursoNecessarioService,
    protected jhiAlertService: JhiAlertService,
    protected eventManager: JhiEventManager,
    protected accountService: AccountService
  ) {}

  loadAll() {
    this.recursoNecessarioService
      .query()
      .pipe(
        filter((res: HttpResponse<IRecursoNecessario[]>) => res.ok),
        map((res: HttpResponse<IRecursoNecessario[]>) => res.body)
      )
      .subscribe(
        (res: IRecursoNecessario[]) => {
          this.recursoNecessarios = res;
        },
        (res: HttpErrorResponse) => this.onError(res.message)
      );
  }

  ngOnInit() {
    this.loadAll();
    this.accountService.identity().then(account => {
      this.currentAccount = account;
    });
    this.registerChangeInRecursoNecessarios();
  }

  ngOnDestroy() {
    this.eventManager.destroy(this.eventSubscriber);
  }

  trackId(index: number, item: IRecursoNecessario) {
    return item.id;
  }

  registerChangeInRecursoNecessarios() {
    this.eventSubscriber = this.eventManager.subscribe('recursoNecessarioListModification', response => this.loadAll());
  }

  protected onError(errorMessage: string) {
    this.jhiAlertService.error(errorMessage, null, null);
  }
}
