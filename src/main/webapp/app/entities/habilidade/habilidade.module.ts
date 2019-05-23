import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';
import { JhiLanguageService } from 'ng-jhipster';
import { JhiLanguageHelper } from 'app/core';

import { AreaadmistrativaSharedModule } from 'app/shared';
import {
  HabilidadeComponent,
  HabilidadeDetailComponent,
  HabilidadeUpdateComponent,
  HabilidadeDeletePopupComponent,
  HabilidadeDeleteDialogComponent,
  habilidadeRoute,
  habilidadePopupRoute
} from './';

const ENTITY_STATES = [...habilidadeRoute, ...habilidadePopupRoute];

@NgModule({
  imports: [AreaadmistrativaSharedModule, RouterModule.forChild(ENTITY_STATES)],
  declarations: [
    HabilidadeComponent,
    HabilidadeDetailComponent,
    HabilidadeUpdateComponent,
    HabilidadeDeleteDialogComponent,
    HabilidadeDeletePopupComponent
  ],
  entryComponents: [HabilidadeComponent, HabilidadeUpdateComponent, HabilidadeDeleteDialogComponent, HabilidadeDeletePopupComponent],
  providers: [{ provide: JhiLanguageService, useClass: JhiLanguageService }],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AreaadmistrativaHabilidadeModule {
  constructor(private languageService: JhiLanguageService, private languageHelper: JhiLanguageHelper) {
    this.languageHelper.language.subscribe((languageKey: string) => {
      if (languageKey !== undefined) {
        this.languageService.changeLanguage(languageKey);
      }
    });
  }
}
