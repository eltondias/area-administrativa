import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { IDoacao } from 'app/shared/model/doacao.model';
import { AccountService } from 'app/core';
import { DoacaoService } from './doacao.service';

@Component({
  selector: 'jhi-doacao',
  templateUrl: './doacao.component.html'
})
export class DoacaoComponent implements OnInit, OnDestroy {
  doacaos: IDoacao[];
  currentAccount: any;
  eventSubscriber: Subscription;

  constructor(
    protected doacaoService: DoacaoService,
    protected jhiAlertService: JhiAlertService,
    protected eventManager: JhiEventManager,
    protected accountService: AccountService
  ) {}

  loadAll() {
    this.doacaoService
      .query()
      .pipe(
        filter((res: HttpResponse<IDoacao[]>) => res.ok),
        map((res: HttpResponse<IDoacao[]>) => res.body)
      )
      .subscribe(
        (res: IDoacao[]) => {
          this.doacaos = res;
        },
        (res: HttpErrorResponse) => this.onError(res.message)
      );
  }

  ngOnInit() {
    this.loadAll();
    this.accountService.identity().then(account => {
      this.currentAccount = account;
    });
    this.registerChangeInDoacaos();
  }

  ngOnDestroy() {
    this.eventManager.destroy(this.eventSubscriber);
  }

  trackId(index: number, item: IDoacao) {
    return item.id;
  }

  registerChangeInDoacaos() {
    this.eventSubscriber = this.eventManager.subscribe('doacaoListModification', response => this.loadAll());
  }

  protected onError(errorMessage: string) {
    this.jhiAlertService.error(errorMessage, null, null);
  }
}
