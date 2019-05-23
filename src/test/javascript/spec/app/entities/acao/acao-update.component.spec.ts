/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { Observable, of } from 'rxjs';

import { AreaadmistrativaTestModule } from '../../../test.module';
import { AcaoUpdateComponent } from 'app/entities/acao/acao-update.component';
import { AcaoService } from 'app/entities/acao/acao.service';
import { Acao } from 'app/shared/model/acao.model';

describe('Component Tests', () => {
  describe('Acao Management Update Component', () => {
    let comp: AcaoUpdateComponent;
    let fixture: ComponentFixture<AcaoUpdateComponent>;
    let service: AcaoService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [AreaadmistrativaTestModule],
        declarations: [AcaoUpdateComponent],
        providers: [FormBuilder]
      })
        .overrideTemplate(AcaoUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(AcaoUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(AcaoService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new Acao(123);
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
        const entity = new Acao();
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
