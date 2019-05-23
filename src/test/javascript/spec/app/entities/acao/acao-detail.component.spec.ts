/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { AreaadmistrativaTestModule } from '../../../test.module';
import { AcaoDetailComponent } from 'app/entities/acao/acao-detail.component';
import { Acao } from 'app/shared/model/acao.model';

describe('Component Tests', () => {
  describe('Acao Management Detail Component', () => {
    let comp: AcaoDetailComponent;
    let fixture: ComponentFixture<AcaoDetailComponent>;
    const route = ({ data: of({ acao: new Acao(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [AreaadmistrativaTestModule],
        declarations: [AcaoDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }]
      })
        .overrideTemplate(AcaoDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(AcaoDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should call load all on init', () => {
        // GIVEN

        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.acao).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
