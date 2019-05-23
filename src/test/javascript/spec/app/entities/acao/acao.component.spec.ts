/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { AreaadmistrativaTestModule } from '../../../test.module';
import { AcaoComponent } from 'app/entities/acao/acao.component';
import { AcaoService } from 'app/entities/acao/acao.service';
import { Acao } from 'app/shared/model/acao.model';

describe('Component Tests', () => {
  describe('Acao Management Component', () => {
    let comp: AcaoComponent;
    let fixture: ComponentFixture<AcaoComponent>;
    let service: AcaoService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [AreaadmistrativaTestModule],
        declarations: [AcaoComponent],
        providers: []
      })
        .overrideTemplate(AcaoComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(AcaoComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(AcaoService);
    });

    it('Should call load all on init', () => {
      // GIVEN
      const headers = new HttpHeaders().append('link', 'link;link');
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [new Acao(123)],
            headers
          })
        )
      );

      // WHEN
      comp.ngOnInit();

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.acaos[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });
  });
});
