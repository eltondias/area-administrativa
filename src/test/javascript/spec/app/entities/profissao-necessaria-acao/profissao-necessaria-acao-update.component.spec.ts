/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { Observable, of } from 'rxjs';

import { AreaadmistrativaTestModule } from '../../../test.module';
import { ProfissaoNecessariaAcaoUpdateComponent } from 'app/entities/profissao-necessaria-acao/profissao-necessaria-acao-update.component';
import { ProfissaoNecessariaAcaoService } from 'app/entities/profissao-necessaria-acao/profissao-necessaria-acao.service';
import { ProfissaoNecessariaAcao } from 'app/shared/model/profissao-necessaria-acao.model';

describe('Component Tests', () => {
  describe('ProfissaoNecessariaAcao Management Update Component', () => {
    let comp: ProfissaoNecessariaAcaoUpdateComponent;
    let fixture: ComponentFixture<ProfissaoNecessariaAcaoUpdateComponent>;
    let service: ProfissaoNecessariaAcaoService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [AreaadmistrativaTestModule],
        declarations: [ProfissaoNecessariaAcaoUpdateComponent],
        providers: [FormBuilder]
      })
        .overrideTemplate(ProfissaoNecessariaAcaoUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(ProfissaoNecessariaAcaoUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(ProfissaoNecessariaAcaoService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new ProfissaoNecessariaAcao(123);
        spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
        comp.updateForm(entity);
        // WHEN
        comp.save();
        tick(); // simulate async

        // THEN
        expect(service.update).toHaveBeenCalledWith(entity);
        expect(comp.isSaving).toEqual(false);
      }));

      it('Should call create service on save for new entity', fakeAsync(() => {
        // GIVEN
        const entity = new ProfissaoNecessariaAcao();
        spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
        comp.updateForm(entity);
        // WHEN
        comp.save();
        tick(); // simulate async

        // THEN
        expect(service.create).toHaveBeenCalledWith(entity);
        expect(comp.isSaving).toEqual(false);
      }));
    });
  });
});
