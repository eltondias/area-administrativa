/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { AreaadmistrativaTestModule } from '../../../test.module';
import { HabilidadeDetailComponent } from 'app/entities/habilidade/habilidade-detail.component';
import { Habilidade } from 'app/shared/model/habilidade.model';

describe('Component Tests', () => {
  describe('Habilidade Management Detail Component', () => {
    let comp: HabilidadeDetailComponent;
    let fixture: ComponentFixture<HabilidadeDetailComponent>;
    const route = ({ data: of({ habilidade: new Habilidade(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [AreaadmistrativaTestModule],
        declarations: [HabilidadeDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }]
      })
        .overrideTemplate(HabilidadeDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(HabilidadeDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should call load all on init', () => {
        // GIVEN

        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.habilidade).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
