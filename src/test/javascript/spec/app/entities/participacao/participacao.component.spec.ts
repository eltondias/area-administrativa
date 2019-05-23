/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { AreaadmistrativaTestModule } from '../../../test.module';
import { ParticipacaoComponent } from 'app/entities/participacao/participacao.component';
import { ParticipacaoService } from 'app/entities/participacao/participacao.service';
import { Participacao } from 'app/shared/model/participacao.model';

describe('Component Tests', () => {
  describe('Participacao Management Component', () => {
    let comp: ParticipacaoComponent;
    let fixture: ComponentFixture<ParticipacaoComponent>;
    let service: ParticipacaoService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [AreaadmistrativaTestModule],
        declarations: [ParticipacaoComponent],
        providers: []
      })
        .overrideTemplate(ParticipacaoComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(ParticipacaoComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(ParticipacaoService);
    });

    it('Should call load all on init', () => {
      // GIVEN
      const headers = new HttpHeaders().append('link', 'link;link');
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [new Participacao(123)],
            headers
          })
        )
      );

      // WHEN
      comp.ngOnInit();

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.participacaos[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });
  });
});
