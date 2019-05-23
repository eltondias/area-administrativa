import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { IProfissao } from 'app/shared/model/profissao.model';
import { AccountService } from 'app/core';
import { ProfissaoService } from './profissao.service';

@Component({
  selector: 'jhi-profissao',
  templateUrl: './profissao.component.html'
})
export class ProfissaoComponent implements OnInit, OnDestroy {
  profissaos: IProfissao[];
  currentAccount: any;
  eventSubscriber: Subscription;

  constructor(
    protected profissaoService: ProfissaoService,
    protected jhiAlertService: JhiAlertService,
    protected eventManager: JhiEventManager,
    protected accountService: AccountService
  ) {}

  loadAll() {
    this.profissaoService
      .query()
      .pipe(
        filter((res: HttpResponse<IProfissao[]>) => res.ok),
        map((res: HttpResponse<IProfissao[]>) => res.body)
      )
      .subscribe(
        (res: IProfissao[]) => {
          this.profissaos = res;
        },
        (res: HttpErrorResponse) => this.onError(res.message)
      );
  }

  ngOnInit() {
    this.loadAll();
    this.accountService.identity().then(account => {
      this.currentAccount = account;
    });
    this.registerChangeInProfissaos();
  }

  ngOnDestroy() {
    this.eventManager.destroy(this.eventSubscriber);
  }

  trackId(index: number, item: IProfissao) {
    return item.id;
  }

  registerChangeInProfissaos() {
    this.eventSubscriber = this.eventManager.subscribe('profissaoListModification', response => this.loadAll());
  }

  protected onError(errorMessage: string) {
    this.jhiAlertService.error(errorMessage, null, null);
  }
}
