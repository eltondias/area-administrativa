/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { Observable, of } from 'rxjs';

import { AreaadmistrativaTestModule } from '../../../test.module';
import { VoluntarioUpdateComponent } from 'app/entities/voluntario/voluntario-update.component';
import { VoluntarioService } from 'app/entities/voluntario/voluntario.service';
import { Voluntario } from 'app/shared/model/voluntario.model';

describe('Component Tests', () => {
  describe('Voluntario Management Update Component', () => {
    let comp: VoluntarioUpdateComponent;
    let fixture: ComponentFixture<VoluntarioUpdateComponent>;
    let service: VoluntarioService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [AreaadmistrativaTestModule],
        declarations: [VoluntarioUpdateComponent],
        providers: [FormBuilder]
      })
        .overrideTemplate(VoluntarioUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(VoluntarioUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(VoluntarioService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new Voluntario(123);
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
        const entity = new Voluntario();
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
