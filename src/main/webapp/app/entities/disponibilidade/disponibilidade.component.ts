import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { IDisponibilidade } from 'app/shared/model/disponibilidade.model';
import { AccountService } from 'app/core';
import { DisponibilidadeService } from './disponibilidade.service';

@Component({
  selector: 'jhi-disponibilidade',
  templateUrl: './disponibilidade.component.html'
})
export class DisponibilidadeComponent implements OnInit, OnDestroy {
  disponibilidades: IDisponibilidade[];
  currentAccount: any;
  eventSubscriber: Subscription;

  constructor(
    protected disponibilidadeService: DisponibilidadeService,
    protected jhiAlertService: JhiAlertService,
    protected eventManager: JhiEventManager,
    protected accountService: AccountService
  ) {}

  loadAll() {
    this.disponibilidadeService
      .query()
      .pipe(
        filter((res: HttpResponse<IDisponibilidade[]>) => res.ok),
        map((res: HttpResponse<IDisponibilidade[]>) => res.body)
      )
      .subscribe(
        (res: IDisponibilidade[]) => {
          this.disponibilidades = res;
        },
        (res: HttpErrorResponse) => this.onError(res.message)
      );
  }

  ngOnInit() {
    this.loadAll();
    this.accountService.identity().then(account => {
      this.currentAccount = account;
    });
    this.registerChangeInDisponibilidades();
  }

  ngOnDestroy() {
    this.eventManager.destroy(this.eventSubscriber);
  }

  trackId(index: number, item: IDisponibilidade) {
    return item.id;
  }

  registerChangeInDisponibilidades() {
    this.eventSubscriber = this.eventManager.subscribe('disponibilidadeListModification', response => this.loadAll());
  }

  protected onError(errorMessage: string) {
    this.jhiAlertService.error(errorMessage, null, null);
  }
}
