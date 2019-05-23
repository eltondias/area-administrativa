import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { IHabilidade } from 'app/shared/model/habilidade.model';
import { AccountService } from 'app/core';
import { HabilidadeService } from './habilidade.service';

@Component({
  selector: 'jhi-habilidade',
  templateUrl: './habilidade.component.html'
})
export class HabilidadeComponent implements OnInit, OnDestroy {
  habilidades: IHabilidade[];
  currentAccount: any;
  eventSubscriber: Subscription;

  constructor(
    protected habilidadeService: HabilidadeService,
    protected jhiAlertService: JhiAlertService,
    protected eventManager: JhiEventManager,
    protected accountService: AccountService
  ) {}

  loadAll() {
    this.habilidadeService
      .query()
      .pipe(
        filter((res: HttpResponse<IHabilidade[]>) => res.ok),
        map((res: HttpResponse<IHabilidade[]>) => res.body)
      )
      .subscribe(
        (res: IHabilidade[]) => {
          this.habilidades = res;
        },
        (res: HttpErrorResponse) => this.onError(res.message)
      );
  }

  ngOnInit() {
    this.loadAll();
    this.accountService.identity().then(account => {
      this.currentAccount = account;
    });
    this.registerChangeInHabilidades();
  }

  ngOnDestroy() {
    this.eventManager.destroy(this.eventSubscriber);
  }

  trackId(index: number, item: IHabilidade) {
    return item.id;
  }

  registerChangeInHabilidades() {
    this.eventSubscriber = this.eventManager.subscribe('habilidadeListModification', response => this.loadAll());
  }

  protected onError(errorMessage: string) {
    this.jhiAlertService.error(errorMessage, null, null);
  }
}
