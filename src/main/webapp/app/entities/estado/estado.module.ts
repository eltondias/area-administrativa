import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';
import { JhiLanguageService } from 'ng-jhipster';
import { JhiLanguageHelper } from 'app/core';

import { AreaadmistrativaSharedModule } from 'app/shared';
import {
  EstadoComponent,
  EstadoDetailComponent,
  EstadoUpdateComponent,
  EstadoDeletePopupComponent,
  EstadoDeleteDialogComponent,
  estadoRoute,
  estadoPopupRoute
} from './';

const ENTITY_STATES = [...estadoRoute, ...estadoPopupRoute];

@NgModule({
  imports: [AreaadmistrativaSharedModule, RouterModule.forChild(ENTITY_STATES)],
  declarations: [EstadoComponent, EstadoDetailComponent, EstadoUpdateComponent, EstadoDeleteDialogComponent, EstadoDeletePopupComponent],
  entryComponents: [EstadoComponent, EstadoUpdateComponent, EstadoDeleteDialogComponent, EstadoDeletePopupComponent],
  providers: [{ provide: JhiLanguageService, useClass: JhiLanguageService }],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AreaadmistrativaEstadoModule {
  constructor(private languageService: JhiLanguageService, private languageHelper: JhiLanguageHelper) {
    this.languageHelper.language.subscribe((languageKey: string) => {
      if (languageKey !== undefined) {
        this.languageService.changeLanguage(languageKey);
      }
    });
  }
}
