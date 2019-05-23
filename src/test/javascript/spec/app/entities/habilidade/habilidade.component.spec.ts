/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { AreaadmistrativaTestModule } from '../../../test.module';
import { HabilidadeComponent } from 'app/entities/habilidade/habilidade.component';
import { HabilidadeService } from 'app/entities/habilidade/habilidade.service';
import { Habilidade } from 'app/shared/model/habilidade.model';

describe('Component Tests', () => {
  describe('Habilidade Management Component', () => {
    let comp: HabilidadeComponent;
    let fixture: ComponentFixture<HabilidadeComponent>;
    let service: HabilidadeService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [AreaadmistrativaTestModule],
        declarations: [HabilidadeComponent],
        providers: []
      })
        .overrideTemplate(HabilidadeComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(HabilidadeComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(HabilidadeService);
    });

    it('Should call load all on init', () => {
      // GIVEN
      const headers = new HttpHeaders().append('link', 'link;link');
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [new Habilidade(123)],
            headers
          })
        )
      );

      // WHEN
      comp.ngOnInit();

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.habilidades[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });
  });
});
