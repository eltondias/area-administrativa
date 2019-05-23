import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { IFormaPagamento } from 'app/shared/model/forma-pagamento.model';
import { AccountService } from 'app/core';
import { FormaPagamentoService } from './forma-pagamento.service';

@Component({
  selector: 'jhi-forma-pagamento',
  templateUrl: './forma-pagamento.component.html'
})
export class FormaPagamentoComponent implements OnInit, OnDestroy {
  formaPagamentos: IFormaPagamento[];
  currentAccount: any;
  eventSubscriber: Subscription;

  constructor(
    protected formaPagamentoService: FormaPagamentoService,
    protected jhiAlertService: JhiAlertService,
    protected eventManager: JhiEventManager,
    protected accountService: AccountService
  ) {}

  loadAll() {
    this.formaPagamentoService
      .query()
      .pipe(
        filter((res: HttpResponse<IFormaPagamento[]>) => res.ok),
        map((res: HttpResponse<IFormaPagamento[]>) => res.body)
      )
      .subscribe(
        (res: IFormaPagamento[]) => {
          this.formaPagamentos = res;
        },
        (res: HttpErrorResponse) => this.onError(res.message)
      );
  }

  ngOnInit() {
    this.loadAll();
    this.accountService.identity().then(account => {
      this.currentAccount = account;
    });
    this.registerChangeInFormaPagamentos();
  }

  ngOnDestroy() {
    this.eventManager.destroy(this.eventSubscriber);
  }

  trackId(index: number, item: IFormaPagamento) {
    return item.id;
  }

  registerChangeInFormaPagamentos() {
    this.eventSubscriber = this.eventManager.subscribe('formaPagamentoListModification', response => this.loadAll());
  }

  protected onError(errorMessage: string) {
    this.jhiAlertService.error(errorMessage, null, null);
  }
}
