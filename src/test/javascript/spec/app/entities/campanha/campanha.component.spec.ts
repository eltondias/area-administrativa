/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { AreaadmistrativaTestModule } from '../../../test.module';
import { CampanhaComponent } from 'app/entities/campanha/campanha.component';
import { CampanhaService } from 'app/entities/campanha/campanha.service';
import { Campanha } from 'app/shared/model/campanha.model';

describe('Component Tests', () => {
  describe('Campanha Management Component', () => {
    let comp: CampanhaComponent;
    let fixture: ComponentFixture<CampanhaComponent>;
    let service: CampanhaService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [AreaadmistrativaTestModule],
        declarations: [CampanhaComponent],
        providers: []
      })
        .overrideTemplate(CampanhaComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(CampanhaComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(CampanhaService);
    });

    it('Should call load all on init', () => {
      // GIVEN
      const headers = new HttpHeaders().append('link', 'link;link');
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [new Campanha(123)],
            headers
          })
        )
      );

      // WHEN
      comp.ngOnInit();

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.campanhas[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });
  });
});
