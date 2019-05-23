/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { AreaadmistrativaTestModule } from '../../../test.module';
import { DisponibilidadeDeleteDialogComponent } from 'app/entities/disponibilidade/disponibilidade-delete-dialog.component';
import { DisponibilidadeService } from 'app/entities/disponibilidade/disponibilidade.service';

describe('Component Tests', () => {
  describe('Disponibilidade Management Delete Component', () => {
    let comp: DisponibilidadeDeleteDialogComponent;
    let fixture: ComponentFixture<DisponibilidadeDeleteDialogComponent>;
    let service: DisponibilidadeService;
    let mockEventManager: any;
    let mockActiveModal: any;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [AreaadmistrativaTestModule],
        declarations: [DisponibilidadeDeleteDialogComponent]
      })
        .overrideTemplate(DisponibilidadeDeleteDialogComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(DisponibilidadeDeleteDialogComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(DisponibilidadeService);
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
