/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { AreaadmistrativaTestModule } from '../../../test.module';
import { DoacaoDetailComponent } from 'app/entities/doacao/doacao-detail.component';
import { Doacao } from 'app/shared/model/doacao.model';

describe('Component Tests', () => {
  describe('Doacao Management Detail Component', () => {
    let comp: DoacaoDetailComponent;
    let fixture: ComponentFixture<DoacaoDetailComponent>;
    const route = ({ data: of({ doacao: new Doacao(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [AreaadmistrativaTestModule],
        declarations: [DoacaoDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }]
      })
        .overrideTemplate(DoacaoDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(DoacaoDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should call load all on init', () => {
        // GIVEN

        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.doacao).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
