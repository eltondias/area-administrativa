import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { IParticipacao } from 'app/shared/model/participacao.model';
import { AccountService } from 'app/core';
import { ParticipacaoService } from './participacao.service';

@Component({
  selector: 'jhi-participacao',
  templateUrl: './participacao.component.html'
})
export class ParticipacaoComponent implements OnInit, OnDestroy {
  participacaos: IParticipacao[];
  currentAccount: any;
  eventSubscriber: Subscription;

  constructor(
    protected participacaoService: ParticipacaoService,
    protected jhiAlertService: JhiAlertService,
    protected eventManager: JhiEventManager,
    protected accountService: AccountService
  ) {}

  loadAll() {
    this.participacaoService
      .query()
      .pipe(
        filter((res: HttpResponse<IParticipacao[]>) => res.ok),
        map((res: HttpResponse<IParticipacao[]>) => res.body)
      )
      .subscribe(
        (res: IParticipacao[]) => {
          this.participacaos = res;
        },
        (res: HttpErrorResponse) => this.onError(res.message)
      );
  }

  ngOnInit() {
    this.loadAll();
    this.accountService.identity().then(account => {
      this.currentAccount = account;
    });
    this.registerChangeInParticipacaos();
  }

  ngOnDestroy() {
    this.eventManager.destroy(this.eventSubscriber);
  }

  trackId(index: number, item: IParticipacao) {
    return item.id;
  }

  registerChangeInParticipacaos() {
    this.eventSubscriber = this.eventManager.subscribe('participacaoListModification', response => this.loadAll());
  }

  protected onError(errorMessage: string) {
    this.jhiAlertService.error(errorMessage, null, null);
  }
}
