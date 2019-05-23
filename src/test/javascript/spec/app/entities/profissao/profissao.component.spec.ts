/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { AreaadmistrativaTestModule } from '../../../test.module';
import { ProfissaoComponent } from 'app/entities/profissao/profissao.component';
import { ProfissaoService } from 'app/entities/profissao/profissao.service';
import { Profissao } from 'app/shared/model/profissao.model';

describe('Component Tests', () => {
  describe('Profissao Management Component', () => {
    let comp: ProfissaoComponent;
    let fixture: ComponentFixture<ProfissaoComponent>;
    let service: ProfissaoService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [AreaadmistrativaTestModule],
        declarations: [ProfissaoComponent],
        providers: []
      })
        .overrideTemplate(ProfissaoComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(ProfissaoComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(ProfissaoService);
    });

    it('Should call load all on init', () => {
      // GIVEN
      const headers = new HttpHeaders().append('link', 'link;link');
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [new Profissao(123)],
            headers
          })
        )
      );

      // WHEN
      comp.ngOnInit();

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.profissaos[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });
  });
});
