import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { ICampanha } from 'app/shared/model/campanha.model';
import { AccountService } from 'app/core';
import { CampanhaService } from './campanha.service';

@Component({
  selector: 'jhi-campanha',
  templateUrl: './campanha.component.html'
})
export class CampanhaComponent implements OnInit, OnDestroy {
  campanhas: ICampanha[];
  currentAccount: any;
  eventSubscriber: Subscription;

  constructor(
    protected campanhaService: CampanhaService,
    protected jhiAlertService: JhiAlertService,
    protected eventManager: JhiEventManager,
    protected accountService: AccountService
  ) {}

  loadAll() {
    this.campanhaService
      .query()
      .pipe(
        filter((res: HttpResponse<ICampanha[]>) => res.ok),
        map((res: HttpResponse<ICampanha[]>) => res.body)
      )
      .subscribe(
        (res: ICampanha[]) => {
          this.campanhas = res;
        },
        (res: HttpErrorResponse) => this.onError(res.message)
      );
  }

  ngOnInit() {
    this.loadAll();
    this.accountService.identity().then(account => {
      this.currentAccount = account;
    });
    this.registerChangeInCampanhas();
  }

  ngOnDestroy() {
    this.eventManager.destroy(this.eventSubscriber);
  }

  trackId(index: number, item: ICampanha) {
    return item.id;
  }

  registerChangeInCampanhas() {
    this.eventSubscriber = this.eventManager.subscribe('campanhaListModification', response => this.loadAll());
  }

  protected onError(errorMessage: string) {
    this.jhiAlertService.error(errorMessage, null, null);
  }
}
