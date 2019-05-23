import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';
import { JhiLanguageService } from 'ng-jhipster';
import { JhiLanguageHelper } from 'app/core';

import { AreaadmistrativaSharedModule } from 'app/shared';
import {
  DisponibilidadeComponent,
  DisponibilidadeDetailComponent,
  DisponibilidadeUpdateComponent,
  DisponibilidadeDeletePopupComponent,
  DisponibilidadeDeleteDialogComponent,
  disponibilidadeRoute,
  disponibilidadePopupRoute
} from './';

const ENTITY_STATES = [...disponibilidadeRoute, ...disponibilidadePopupRoute];

@NgModule({
  imports: [AreaadmistrativaSharedModule, RouterModule.forChild(ENTITY_STATES)],
  declarations: [
    DisponibilidadeComponent,
    DisponibilidadeDetailComponent,
    DisponibilidadeUpdateComponent,
    DisponibilidadeDeleteDialogComponent,
    DisponibilidadeDeletePopupComponent
  ],
  entryComponents: [
    DisponibilidadeComponent,
    DisponibilidadeUpdateComponent,
    DisponibilidadeDeleteDialogComponent,
    DisponibilidadeDeletePopupComponent
  ],
  providers: [{ provide: JhiLanguageService, useClass: JhiLanguageService }],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AreaadmistrativaDisponibilidadeModule {
  constructor(private languageService: JhiLanguageService, private languageHelper: JhiLanguageHelper) {
    this.languageHelper.language.subscribe((languageKey: string) => {
      if (languageKey !== undefined) {
        this.languageService.changeLanguage(languageKey);
      }
    });
  }
}
