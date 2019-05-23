/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { AreaadmistrativaTestModule } from '../../../test.module';
import { ProfissaoNecessariaAcaoDetailComponent } from 'app/entities/profissao-necessaria-acao/profissao-necessaria-acao-detail.component';
import { ProfissaoNecessariaAcao } from 'app/shared/model/profissao-necessaria-acao.model';

describe('Component Tests', () => {
  describe('ProfissaoNecessariaAcao Management Detail Component', () => {
    let comp: ProfissaoNecessariaAcaoDetailComponent;
    let fixture: ComponentFixture<ProfissaoNecessariaAcaoDetailComponent>;
    const route = ({ data: of({ profissaoNecessariaAcao: new ProfissaoNecessariaAcao(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [AreaadmistrativaTestModule],
        declarations: [ProfissaoNecessariaAcaoDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }]
      })
        .overrideTemplate(ProfissaoNecessariaAcaoDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(ProfissaoNecessariaAcaoDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should call load all on init', () => {
        // GIVEN

        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.profissaoNecessariaAcao).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
