/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { AreaadmistrativaTestModule } from '../../../test.module';
import { RecursoNecessarioDetailComponent } from 'app/entities/recurso-necessario/recurso-necessario-detail.component';
import { RecursoNecessario } from 'app/shared/model/recurso-necessario.model';

describe('Component Tests', () => {
  describe('RecursoNecessario Management Detail Component', () => {
    let comp: RecursoNecessarioDetailComponent;
    let fixture: ComponentFixture<RecursoNecessarioDetailComponent>;
    const route = ({ data: of({ recursoNecessario: new RecursoNecessario(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [AreaadmistrativaTestModule],
        declarations: [RecursoNecessarioDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }]
      })
        .overrideTemplate(RecursoNecessarioDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(RecursoNecessarioDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should call load all on init', () => {
        // GIVEN

        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.recursoNecessario).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
