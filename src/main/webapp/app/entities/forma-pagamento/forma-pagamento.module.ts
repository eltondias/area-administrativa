import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';
import { JhiLanguageService } from 'ng-jhipster';
import { JhiLanguageHelper } from 'app/core';

import { AreaadmistrativaSharedModule } from 'app/shared';
import {
  FormaPagamentoComponent,
  FormaPagamentoDetailComponent,
  FormaPagamentoUpdateComponent,
  FormaPagamentoDeletePopupComponent,
  FormaPagamentoDeleteDialogComponent,
  formaPagamentoRoute,
  formaPagamentoPopupRoute
} from './';

const ENTITY_STATES = [...formaPagamentoRoute, ...formaPagamentoPopupRoute];

@NgModule({
  imports: [AreaadmistrativaSharedModule, RouterModule.forChild(ENTITY_STATES)],
  declarations: [
    FormaPagamentoComponent,
    FormaPagamentoDetailComponent,
    FormaPagamentoUpdateComponent,
    FormaPagamentoDeleteDialogComponent,
    FormaPagamentoDeletePopupComponent
  ],
  entryComponents: [
    FormaPagamentoComponent,
    FormaPagamentoUpdateComponent,
    FormaPagamentoDeleteDialogComponent,
    FormaPagamentoDeletePopupComponent
  ],
  providers: [{ provide: JhiLanguageService, useClass: JhiLanguageService }],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AreaadmistrativaFormaPagamentoModule {
  constructor(private languageService: JhiLanguageService, private languageHelper: JhiLanguageHelper) {
    this.languageHelper.language.subscribe((languageKey: string) => {
      if (languageKey !== undefined) {
        this.languageService.changeLanguage(languageKey);
      }
    });
  }
}
