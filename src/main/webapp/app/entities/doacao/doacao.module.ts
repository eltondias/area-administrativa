import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';
import { JhiLanguageService } from 'ng-jhipster';
import { JhiLanguageHelper } from 'app/core';

import { AreaadmistrativaSharedModule } from 'app/shared';
import {
  DoacaoComponent,
  DoacaoDetailComponent,
  DoacaoUpdateComponent,
  DoacaoDeletePopupComponent,
  DoacaoDeleteDialogComponent,
  doacaoRoute,
  doacaoPopupRoute
} from './';

const ENTITY_STATES = [...doacaoRoute, ...doacaoPopupRoute];

@NgModule({
  imports: [AreaadmistrativaSharedModule, RouterModule.forChild(ENTITY_STATES)],
  declarations: [DoacaoComponent, DoacaoDetailComponent, DoacaoUpdateComponent, DoacaoDeleteDialogComponent, DoacaoDeletePopupComponent],
  entryComponents: [DoacaoComponent, DoacaoUpdateComponent, DoacaoDeleteDialogComponent, DoacaoDeletePopupComponent],
  providers: [{ provide: JhiLanguageService, useClass: JhiLanguageService }],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AreaadmistrativaDoacaoModule {
  constructor(private languageService: JhiLanguageService, private languageHelper: JhiLanguageHelper) {
    this.languageHelper.language.subscribe((languageKey: string) => {
      if (languageKey !== undefined) {
        this.languageService.changeLanguage(languageKey);
      }
    });
  }
}
