/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { AreaadmistrativaTestModule } from '../../../test.module';
import { DisponibilidadeComponent } from 'app/entities/disponibilidade/disponibilidade.component';
import { DisponibilidadeService } from 'app/entities/disponibilidade/disponibilidade.service';
import { Disponibilidade } from 'app/shared/model/disponibilidade.model';

describe('Component Tests', () => {
  describe('Disponibilidade Management Component', () => {
    let comp: DisponibilidadeComponent;
    let fixture: ComponentFixture<DisponibilidadeComponent>;
    let service: DisponibilidadeService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [AreaadmistrativaTestModule],
        declarations: [DisponibilidadeComponent],
        providers: []
      })
        .overrideTemplate(DisponibilidadeComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(DisponibilidadeComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(DisponibilidadeService);
    });

    it('Should call load all on init', () => {
      // GIVEN
      const headers = new HttpHeaders().append('link', 'link;link');
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [new Disponibilidade(123)],
            headers
          })
        )
      );

      // WHEN
      comp.ngOnInit();

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.disponibilidades[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });
  });
});
