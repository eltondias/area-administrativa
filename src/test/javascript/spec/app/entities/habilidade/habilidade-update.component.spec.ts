/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { Observable, of } from 'rxjs';

import { AreaadmistrativaTestModule } from '../../../test.module';
import { HabilidadeUpdateComponent } from 'app/entities/habilidade/habilidade-update.component';
import { HabilidadeService } from 'app/entities/habilidade/habilidade.service';
import { Habilidade } from 'app/shared/model/habilidade.model';

describe('Component Tests', () => {
  describe('Habilidade Management Update Component', () => {
    let comp: HabilidadeUpdateComponent;
    let fixture: ComponentFixture<HabilidadeUpdateComponent>;
    let service: HabilidadeService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [AreaadmistrativaTestModule],
        declarations: [HabilidadeUpdateComponent],
        providers: [FormBuilder]
      })
        .overrideTemplate(HabilidadeUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(HabilidadeUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(HabilidadeService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new Habilidade(123);
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
        const entity = new Habilidade();
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
