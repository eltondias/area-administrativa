import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';
import { JhiLanguageService } from 'ng-jhipster';
import { JhiLanguageHelper } from 'app/core';

import { AreaadmistrativaSharedModule } from 'app/shared';
import {
  RedeSocialComponent,
  RedeSocialDetailComponent,
  RedeSocialUpdateComponent,
  RedeSocialDeletePopupComponent,
  RedeSocialDeleteDialogComponent,
  redeSocialRoute,
  redeSocialPopupRoute
} from './';

const ENTITY_STATES = [...redeSocialRoute, ...redeSocialPopupRoute];

@NgModule({
  imports: [AreaadmistrativaSharedModule, RouterModule.forChild(ENTITY_STATES)],
  declarations: [
    RedeSocialComponent,
    RedeSocialDetailComponent,
    RedeSocialUpdateComponent,
    RedeSocialDeleteDialogComponent,
    RedeSocialDeletePopupComponent
  ],
  entryComponents: [RedeSocialComponent, RedeSocialUpdateComponent, RedeSocialDeleteDialogComponent, RedeSocialDeletePopupComponent],
  providers: [{ provide: JhiLanguageService, useClass: JhiLanguageService }],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AreaadmistrativaRedeSocialModule {
  constructor(private languageService: JhiLanguageService, private languageHelper: JhiLanguageHelper) {
    this.languageHelper.language.subscribe((languageKey: string) => {
      if (languageKey !== undefined) {
        this.languageService.changeLanguage(languageKey);
      }
    });
  }
}
