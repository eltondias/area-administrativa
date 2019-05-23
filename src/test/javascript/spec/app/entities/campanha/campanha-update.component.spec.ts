/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { Observable, of } from 'rxjs';

import { AreaadmistrativaTestModule } from '../../../test.module';
import { CampanhaUpdateComponent } from 'app/entities/campanha/campanha-update.component';
import { CampanhaService } from 'app/entities/campanha/campanha.service';
import { Campanha } from 'app/shared/model/campanha.model';

describe('Component Tests', () => {
  describe('Campanha Management Update Component', () => {
    let comp: CampanhaUpdateComponent;
    let fixture: ComponentFixture<CampanhaUpdateComponent>;
    let service: CampanhaService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [AreaadmistrativaTestModule],
        declarations: [CampanhaUpdateComponent],
        providers: [FormBuilder]
      })
        .overrideTemplate(CampanhaUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(CampanhaUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(CampanhaService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new Campanha(123);
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
        const entity = new Campanha();
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
