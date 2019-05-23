import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';
import { JhiLanguageService } from 'ng-jhipster';
import { JhiLanguageHelper } from 'app/core';

import { AreaadmistrativaSharedModule } from 'app/shared';
import {
  ProfissaoNecessariaAcaoComponent,
  ProfissaoNecessariaAcaoDetailComponent,
  ProfissaoNecessariaAcaoUpdateComponent,
  ProfissaoNecessariaAcaoDeletePopupComponent,
  ProfissaoNecessariaAcaoDeleteDialogComponent,
  profissaoNecessariaAcaoRoute,
  profissaoNecessariaAcaoPopupRoute
} from './';

const ENTITY_STATES = [...profissaoNecessariaAcaoRoute, ...profissaoNecessariaAcaoPopupRoute];

@NgModule({
  imports: [AreaadmistrativaSharedModule, RouterModule.forChild(ENTITY_STATES)],
  declarations: [
    ProfissaoNecessariaAcaoComponent,
    ProfissaoNecessariaAcaoDetailComponent,
    ProfissaoNecessariaAcaoUpdateComponent,
    ProfissaoNecessariaAcaoDeleteDialogComponent,
    ProfissaoNecessariaAcaoDeletePopupComponent
  ],
  entryComponents: [
    ProfissaoNecessariaAcaoComponent,
    ProfissaoNecessariaAcaoUpdateComponent,
    ProfissaoNecessariaAcaoDeleteDialogComponent,
    ProfissaoNecessariaAcaoDeletePopupComponent
  ],
  providers: [{ provide: JhiLanguageService, useClass: JhiLanguageService }],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AreaadmistrativaProfissaoNecessariaAcaoModule {
  constructor(private languageService: JhiLanguageService, private languageHelper: JhiLanguageHelper) {
    this.languageHelper.language.subscribe((languageKey: string) => {
      if (languageKey !== undefined) {
        this.languageService.changeLanguage(languageKey);
      }
    });
  }
}
