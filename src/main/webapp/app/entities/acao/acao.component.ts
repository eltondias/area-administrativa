import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { IAcao } from 'app/shared/model/acao.model';
import { AccountService } from 'app/core';
import { AcaoService } from './acao.service';

@Component({
  selector: 'jhi-acao',
  templateUrl: './acao.component.html'
})
export class AcaoComponent implements OnInit, OnDestroy {
  acaos: IAcao[];
  currentAccount: any;
  eventSubscriber: Subscription;

  constructor(
    protected acaoService: AcaoService,
    protected jhiAlertService: JhiAlertService,
    protected eventManager: JhiEventManager,
    protected accountService: AccountService
  ) {}

  loadAll() {
    this.acaoService
      .query()
      .pipe(
        filter((res: HttpResponse<IAcao[]>) => res.ok),
        map((res: HttpResponse<IAcao[]>) => res.body)
      )
      .subscribe(
        (res: IAcao[]) => {
          this.acaos = res;
        },
        (res: HttpErrorResponse) => this.onError(res.message)
      );
  }

  ngOnInit() {
    this.loadAll();
    this.accountService.identity().then(account => {
      this.currentAccount = account;
    });
    this.registerChangeInAcaos();
  }

  ngOnDestroy() {
    this.eventManager.destroy(this.eventSubscriber);
  }

  trackId(index: number, item: IAcao) {
    return item.id;
  }

  registerChangeInAcaos() {
    this.eventSubscriber = this.eventManager.subscribe('acaoListModification', response => this.loadAll());
  }

  protected onError(errorMessage: string) {
    this.jhiAlertService.error(errorMessage, null, null);
  }
}
