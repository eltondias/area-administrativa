import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';
import { JhiLanguageService } from 'ng-jhipster';
import { JhiLanguageHelper } from 'app/core';

import { AreaadmistrativaSharedModule } from 'app/shared';
import {
  VoluntarioComponent,
  VoluntarioDetailComponent,
  VoluntarioUpdateComponent,
  VoluntarioDeletePopupComponent,
  VoluntarioDeleteDialogComponent,
  voluntarioRoute,
  voluntarioPopupRoute
} from './';

const ENTITY_STATES = [...voluntarioRoute, ...voluntarioPopupRoute];

@NgModule({
  imports: [AreaadmistrativaSharedModule, RouterModule.forChild(ENTITY_STATES)],
  declarations: [
    VoluntarioComponent,
    VoluntarioDetailComponent,
    VoluntarioUpdateComponent,
    VoluntarioDeleteDialogComponent,
    VoluntarioDeletePopupComponent
  ],
  entryComponents: [VoluntarioComponent, VoluntarioUpdateComponent, VoluntarioDeleteDialogComponent, VoluntarioDeletePopupComponent],
  providers: [{ provide: JhiLanguageService, useClass: JhiLanguageService }],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AreaadmistrativaVoluntarioModule {
  constructor(private languageService: JhiLanguageService, private languageHelper: JhiLanguageHelper) {
    this.languageHelper.language.subscribe((languageKey: string) => {
      if (languageKey !== undefined) {
        this.languageService.changeLanguage(languageKey);
      }
    });
  }
}
