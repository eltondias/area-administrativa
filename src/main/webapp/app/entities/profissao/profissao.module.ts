import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';
import { JhiLanguageService } from 'ng-jhipster';
import { JhiLanguageHelper } from 'app/core';

import { AreaadmistrativaSharedModule } from 'app/shared';
import {
  ProfissaoComponent,
  ProfissaoDetailComponent,
  ProfissaoUpdateComponent,
  ProfissaoDeletePopupComponent,
  ProfissaoDeleteDialogComponent,
  profissaoRoute,
  profissaoPopupRoute
} from './';

const ENTITY_STATES = [...profissaoRoute, ...profissaoPopupRoute];

@NgModule({
  imports: [AreaadmistrativaSharedModule, RouterModule.forChild(ENTITY_STATES)],
  declarations: [
    ProfissaoComponent,
    ProfissaoDetailComponent,
    ProfissaoUpdateComponent,
    ProfissaoDeleteDialogComponent,
    ProfissaoDeletePopupComponent
  ],
  entryComponents: [ProfissaoComponent, ProfissaoUpdateComponent, ProfissaoDeleteDialogComponent, ProfissaoDeletePopupComponent],
  providers: [{ provide: JhiLanguageService, useClass: JhiLanguageService }],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AreaadmistrativaProfissaoModule {
  constructor(private languageService: JhiLanguageService, private languageHelper: JhiLanguageHelper) {
    this.languageHelper.language.subscribe((languageKey: string) => {
      if (languageKey !== undefined) {
        this.languageService.changeLanguage(languageKey);
      }
    });
  }
}
