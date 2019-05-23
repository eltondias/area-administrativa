/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { Observable, of } from 'rxjs';

import { AreaadmistrativaTestModule } from '../../../test.module';
import { DoacaoUpdateComponent } from 'app/entities/doacao/doacao-update.component';
import { DoacaoService } from 'app/entities/doacao/doacao.service';
import { Doacao } from 'app/shared/model/doacao.model';

describe('Component Tests', () => {
  describe('Doacao Management Update Component', () => {
    let comp: DoacaoUpdateComponent;
    let fixture: ComponentFixture<DoacaoUpdateComponent>;
    let service: DoacaoService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [AreaadmistrativaTestModule],
        declarations: [DoacaoUpdateComponent],
        providers: [FormBuilder]
      })
        .overrideTemplate(DoacaoUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(DoacaoUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(DoacaoService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new Doacao(123);
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
        const entity = new Doacao();
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
