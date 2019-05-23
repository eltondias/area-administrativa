/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { AreaadmistrativaTestModule } from '../../../test.module';
import { HabilidadeDeleteDialogComponent } from 'app/entities/habilidade/habilidade-delete-dialog.component';
import { HabilidadeService } from 'app/entities/habilidade/habilidade.service';

describe('Component Tests', () => {
  describe('Habilidade Management Delete Component', () => {
    let comp: HabilidadeDeleteDialogComponent;
    let fixture: ComponentFixture<HabilidadeDeleteDialogComponent>;
    let service: HabilidadeService;
    let mockEventManager: any;
    let mockActiveModal: any;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [AreaadmistrativaTestModule],
        declarations: [HabilidadeDeleteDialogComponent]
      })
        .overrideTemplate(HabilidadeDeleteDialogComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(HabilidadeDeleteDialogComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(HabilidadeService);
      mockEventManager = fixture.debugElement.injector.get(JhiEventManager);
      mockActiveModal = fixture.debugElement.injector.get(NgbActiveModal);
    });

    describe('confirmDelete', () => {
      it('Should call delete service on confirmDelete', inject(
        [],
        fakeAsync(() => {
          // GIVEN
          spyOn(service, 'delete').and.returnValue(of({}));

          // WHEN
          comp.confirmDelete(123);
          tick();

          // THEN
          expect(service.delete).toHaveBeenCalledWith(123);
          expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
          expect(mockEventManager.broadcastSpy).toHaveBeenCalled();
        })
      ));
    });
  });
});
