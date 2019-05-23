import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';
import { JhiLanguageService } from 'ng-jhipster';
import { JhiLanguageHelper } from 'app/core';

import { AreaadmistrativaSharedModule } from 'app/shared';
import {
  RecursoNecessarioComponent,
  RecursoNecessarioDetailComponent,
  RecursoNecessarioUpdateComponent,
  RecursoNecessarioDeletePopupComponent,
  RecursoNecessarioDeleteDialogComponent,
  recursoNecessarioRoute,
  recursoNecessarioPopupRoute
} from './';

const ENTITY_STATES = [...recursoNecessarioRoute, ...recursoNecessarioPopupRoute];

@NgModule({
  imports: [AreaadmistrativaSharedModule, RouterModule.forChild(ENTITY_STATES)],
  declarations: [
    RecursoNecessarioComponent,
    RecursoNecessarioDetailComponent,
    RecursoNecessarioUpdateComponent,
    RecursoNecessarioDeleteDialogComponent,
    RecursoNecessarioDeletePopupComponent
  ],
  entryComponents: [
    RecursoNecessarioComponent,
    RecursoNecessarioUpdateComponent,
    RecursoNecessarioDeleteDialogComponent,
    RecursoNecessarioDeletePopupComponent
  ],
  providers: [{ provide: JhiLanguageService, useClass: JhiLanguageService }],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AreaadmistrativaRecursoNecessarioModule {
  constructor(private languageService: JhiLanguageService, private languageHelper: JhiLanguageHelper) {
    this.languageHelper.language.subscribe((languageKey: string) => {
      if (languageKey !== undefined) {
        this.languageService.changeLanguage(languageKey);
      }
    });
  }
}
