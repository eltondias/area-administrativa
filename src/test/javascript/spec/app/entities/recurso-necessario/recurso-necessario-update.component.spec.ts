/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { Observable, of } from 'rxjs';

import { AreaadmistrativaTestModule } from '../../../test.module';
import { RecursoNecessarioUpdateComponent } from 'app/entities/recurso-necessario/recurso-necessario-update.component';
import { RecursoNecessarioService } from 'app/entities/recurso-necessario/recurso-necessario.service';
import { RecursoNecessario } from 'app/shared/model/recurso-necessario.model';

describe('Component Tests', () => {
  describe('RecursoNecessario Management Update Component', () => {
    let comp: RecursoNecessarioUpdateComponent;
    let fixture: ComponentFixture<RecursoNecessarioUpdateComponent>;
    let service: RecursoNecessarioService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [AreaadmistrativaTestModule],
        declarations: [RecursoNecessarioUpdateComponent],
        providers: [FormBuilder]
      })
        .overrideTemplate(RecursoNecessarioUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(RecursoNecessarioUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(RecursoNecessarioService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new RecursoNecessario(123);
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
        const entity = new RecursoNecessario();
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
