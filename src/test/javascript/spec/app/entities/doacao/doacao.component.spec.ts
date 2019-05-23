/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { AreaadmistrativaTestModule } from '../../../test.module';
import { DoacaoComponent } from 'app/entities/doacao/doacao.component';
import { DoacaoService } from 'app/entities/doacao/doacao.service';
import { Doacao } from 'app/shared/model/doacao.model';

describe('Component Tests', () => {
  describe('Doacao Management Component', () => {
    let comp: DoacaoComponent;
    let fixture: ComponentFixture<DoacaoComponent>;
    let service: DoacaoService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [AreaadmistrativaTestModule],
        declarations: [DoacaoComponent],
        providers: []
      })
        .overrideTemplate(DoacaoComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(DoacaoComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(DoacaoService);
    });

    it('Should call load all on init', () => {
      // GIVEN
      const headers = new HttpHeaders().append('link', 'link;link');
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [new Doacao(123)],
            headers
          })
        )
      );

      // WHEN
      comp.ngOnInit();

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.doacaos[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });
  });
});
