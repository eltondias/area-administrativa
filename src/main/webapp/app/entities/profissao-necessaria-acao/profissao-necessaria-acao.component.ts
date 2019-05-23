import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { IProfissaoNecessariaAcao } from 'app/shared/model/profissao-necessaria-acao.model';
import { AccountService } from 'app/core';
import { ProfissaoNecessariaAcaoService } from './profissao-necessaria-acao.service';

@Component({
  selector: 'jhi-profissao-necessaria-acao',
  templateUrl: './profissao-necessaria-acao.component.html'
})
export class ProfissaoNecessariaAcaoComponent implements OnInit, OnDestroy {
  profissaoNecessariaAcaos: IProfissaoNecessariaAcao[];
  currentAccount: any;
  eventSubscriber: Subscription;

  constructor(
    protected profissaoNecessariaAcaoService: ProfissaoNecessariaAcaoService,
    protected jhiAlertService: JhiAlertService,
    protected eventManager: JhiEventManager,
    protected accountService: AccountService
  ) {}

  loadAll() {
    this.profissaoNecessariaAcaoService
      .query()
      .pipe(
        filter((res: HttpResponse<IProfissaoNecessariaAcao[]>) => res.ok),
        map((res: HttpResponse<IProfissaoNecessariaAcao[]>) => res.body)
      )
      .subscribe(
        (res: IProfissaoNecessariaAcao[]) => {
          this.profissaoNecessariaAcaos = res;
        },
        (res: HttpErrorResponse) => this.onError(res.message)
      );
  }

  ngOnInit() {
    this.loadAll();
    this.accountService.identity().then(account => {
      this.currentAccount = account;
    });
    this.registerChangeInProfissaoNecessariaAcaos();
  }

  ngOnDestroy() {
    this.eventManager.destroy(this.eventSubscriber);
  }

  trackId(index: number, item: IProfissaoNecessariaAcao) {
    return item.id;
  }

  registerChangeInProfissaoNecessariaAcaos() {
    this.eventSubscriber = this.eventManager.subscribe('profissaoNecessariaAcaoListModification', response => this.loadAll());
  }

  protected onError(errorMessage: string) {
    this.jhiAlertService.error(errorMessage, null, null);
  }
}
