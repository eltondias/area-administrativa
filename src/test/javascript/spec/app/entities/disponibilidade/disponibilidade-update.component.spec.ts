/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { Observable, of } from 'rxjs';

import { AreaadmistrativaTestModule } from '../../../test.module';
import { DisponibilidadeUpdateComponent } from 'app/entities/disponibilidade/disponibilidade-update.component';
import { DisponibilidadeService } from 'app/entities/disponibilidade/disponibilidade.service';
import { Disponibilidade } from 'app/shared/model/disponibilidade.model';

describe('Component Tests', () => {
  describe('Disponibilidade Management Update Component', () => {
    let comp: DisponibilidadeUpdateComponent;
    let fixture: ComponentFixture<DisponibilidadeUpdateComponent>;
    let service: DisponibilidadeService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [AreaadmistrativaTestModule],
        declarations: [DisponibilidadeUpdateComponent],
        providers: [FormBuilder]
      })
        .overrideTemplate(DisponibilidadeUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(DisponibilidadeUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(DisponibilidadeService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new Disponibilidade(123);
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
        const entity = new Disponibilidade();
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
