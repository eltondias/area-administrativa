/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { AreaadmistrativaTestModule } from '../../../test.module';
import { VoluntarioDetailComponent } from 'app/entities/voluntario/voluntario-detail.component';
import { Voluntario } from 'app/shared/model/voluntario.model';

describe('Component Tests', () => {
  describe('Voluntario Management Detail Component', () => {
    let comp: VoluntarioDetailComponent;
    let fixture: ComponentFixture<VoluntarioDetailComponent>;
    const route = ({ data: of({ voluntario: new Voluntario(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [AreaadmistrativaTestModule],
        declarations: [VoluntarioDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }]
      })
        .overrideTemplate(VoluntarioDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(VoluntarioDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should call load all on init', () => {
        // GIVEN

        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.voluntario).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
