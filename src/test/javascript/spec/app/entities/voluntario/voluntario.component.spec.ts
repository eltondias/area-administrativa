/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { AreaadmistrativaTestModule } from '../../../test.module';
import { VoluntarioComponent } from 'app/entities/voluntario/voluntario.component';
import { VoluntarioService } from 'app/entities/voluntario/voluntario.service';
import { Voluntario } from 'app/shared/model/voluntario.model';

describe('Component Tests', () => {
  describe('Voluntario Management Component', () => {
    let comp: VoluntarioComponent;
    let fixture: ComponentFixture<VoluntarioComponent>;
    let service: VoluntarioService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [AreaadmistrativaTestModule],
        declarations: [VoluntarioComponent],
        providers: []
      })
        .overrideTemplate(VoluntarioComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(VoluntarioComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(VoluntarioService);
    });

    it('Should call load all on init', () => {
      // GIVEN
      const headers = new HttpHeaders().append('link', 'link;link');
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [new Voluntario(123)],
            headers
          })
        )
      );

      // WHEN
      comp.ngOnInit();

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.voluntarios[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });
  });
});
