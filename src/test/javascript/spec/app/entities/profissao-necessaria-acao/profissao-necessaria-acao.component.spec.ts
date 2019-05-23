/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { AreaadmistrativaTestModule } from '../../../test.module';
import { ProfissaoNecessariaAcaoComponent } from 'app/entities/profissao-necessaria-acao/profissao-necessaria-acao.component';
import { ProfissaoNecessariaAcaoService } from 'app/entities/profissao-necessaria-acao/profissao-necessaria-acao.service';
import { ProfissaoNecessariaAcao } from 'app/shared/model/profissao-necessaria-acao.model';

describe('Component Tests', () => {
  describe('ProfissaoNecessariaAcao Management Component', () => {
    let comp: ProfissaoNecessariaAcaoComponent;
    let fixture: ComponentFixture<ProfissaoNecessariaAcaoComponent>;
    let service: ProfissaoNecessariaAcaoService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [AreaadmistrativaTestModule],
        declarations: [ProfissaoNecessariaAcaoComponent],
        providers: []
      })
        .overrideTemplate(ProfissaoNecessariaAcaoComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(ProfissaoNecessariaAcaoComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(ProfissaoNecessariaAcaoService);
    });

    it('Should call load all on init', () => {
      // GIVEN
      const headers = new HttpHeaders().append('link', 'link;link');
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [new ProfissaoNecessariaAcao(123)],
            headers
          })
        )
      );

      // WHEN
      comp.ngOnInit();

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.profissaoNecessariaAcaos[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });
  });
});
