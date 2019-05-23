import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';
import { JhiLanguageService } from 'ng-jhipster';
import { JhiLanguageHelper } from 'app/core';

import { AreaadmistrativaSharedModule } from 'app/shared';
import {
  EnderecoComponent,
  EnderecoDetailComponent,
  EnderecoUpdateComponent,
  EnderecoDeletePopupComponent,
  EnderecoDeleteDialogComponent,
  enderecoRoute,
  enderecoPopupRoute
} from './';

const ENTITY_STATES = [...enderecoRoute, ...enderecoPopupRoute];

@NgModule({
  imports: [AreaadmistrativaSharedModule, RouterModule.forChild(ENTITY_STATES)],
  declarations: [
    EnderecoComponent,
    EnderecoDetailComponent,
    EnderecoUpdateComponent,
    EnderecoDeleteDialogComponent,
    EnderecoDeletePopupComponent
  ],
  entryComponents: [EnderecoComponent, EnderecoUpdateComponent, EnderecoDeleteDialogComponent, EnderecoDeletePopupComponent],
  providers: [{ provide: JhiLanguageService, useClass: JhiLanguageService }],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AreaadmistrativaEnderecoModule {
  constructor(private languageService: JhiLanguageService, private languageHelper: JhiLanguageHelper) {
    this.languageHelper.language.subscribe((languageKey: string) => {
      if (languageKey !== undefined) {
        this.languageService.changeLanguage(languageKey);
      }
    });
  }
}
