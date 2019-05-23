/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { AreaadmistrativaTestModule } from '../../../test.module';
import { DisponibilidadeDetailComponent } from 'app/entities/disponibilidade/disponibilidade-detail.component';
import { Disponibilidade } from 'app/shared/model/disponibilidade.model';

describe('Component Tests', () => {
  describe('Disponibilidade Management Detail Component', () => {
    let comp: DisponibilidadeDetailComponent;
    let fixture: ComponentFixture<DisponibilidadeDetailComponent>;
    const route = ({ data: of({ disponibilidade: new Disponibilidade(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [AreaadmistrativaTestModule],
        declarations: [DisponibilidadeDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }]
      })
        .overrideTemplate(DisponibilidadeDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(DisponibilidadeDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should call load all on init', () => {
        // GIVEN

        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.disponibilidade).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
