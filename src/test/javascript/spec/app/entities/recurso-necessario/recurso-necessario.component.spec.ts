/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { AreaadmistrativaTestModule } from '../../../test.module';
import { RecursoNecessarioComponent } from 'app/entities/recurso-necessario/recurso-necessario.component';
import { RecursoNecessarioService } from 'app/entities/recurso-necessario/recurso-necessario.service';
import { RecursoNecessario } from 'app/shared/model/recurso-necessario.model';

describe('Component Tests', () => {
  describe('RecursoNecessario Management Component', () => {
    let comp: RecursoNecessarioComponent;
    let fixture: ComponentFixture<RecursoNecessarioComponent>;
    let service: RecursoNecessarioService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [AreaadmistrativaTestModule],
        declarations: [RecursoNecessarioComponent],
        providers: []
      })
        .overrideTemplate(RecursoNecessarioComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(RecursoNecessarioComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(RecursoNecessarioService);
    });

    it('Should call load all on init', () => {
      // GIVEN
      const headers = new HttpHeaders().append('link', 'link;link');
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [new RecursoNecessario(123)],
            headers
          })
        )
      );

      // WHEN
      comp.ngOnInit();

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.recursoNecessarios[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });
  });
});
