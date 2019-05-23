import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';
import { JhiLanguageService } from 'ng-jhipster';
import { JhiLanguageHelper } from 'app/core';

import { AreaadmistrativaSharedModule } from 'app/shared';
import {
  AcaoComponent,
  AcaoDetailComponent,
  AcaoUpdateComponent,
  AcaoDeletePopupComponent,
  AcaoDeleteDialogComponent,
  acaoRoute,
  acaoPopupRoute
} from './';

const ENTITY_STATES = [...acaoRoute, ...acaoPopupRoute];

@NgModule({
  imports: [AreaadmistrativaSharedModule, RouterModule.forChild(ENTITY_STATES)],
  declarations: [AcaoComponent, AcaoDetailComponent, AcaoUpdateComponent, AcaoDeleteDialogComponent, AcaoDeletePopupComponent],
  entryComponents: [AcaoComponent, AcaoUpdateComponent, AcaoDeleteDialogComponent, AcaoDeletePopupComponent],
  providers: [{ provide: JhiLanguageService, useClass: JhiLanguageService }],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AreaadmistrativaAcaoModule {
  constructor(private languageService: JhiLanguageService, private languageHelper: JhiLanguageHelper) {
    this.languageHelper.language.subscribe((languageKey: string) => {
      if (languageKey !== undefined) {
        this.languageService.changeLanguage(languageKey);
      }
    });
  }
}
