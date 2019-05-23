import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { AreaadmistrativaSharedLibsModule, AreaadmistrativaSharedCommonModule, JhiLoginModalComponent, HasAnyAuthorityDirective } from './';

@NgModule({
  imports: [AreaadmistrativaSharedLibsModule, AreaadmistrativaSharedCommonModule],
  declarations: [JhiLoginModalComponent, HasAnyAuthorityDirective],
  entryComponents: [JhiLoginModalComponent],
  exports: [AreaadmistrativaSharedCommonModule, JhiLoginModalComponent, HasAnyAuthorityDirective],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AreaadmistrativaSharedModule {
  static forRoot() {
    return {
      ngModule: AreaadmistrativaSharedModule
    };
  }
}
