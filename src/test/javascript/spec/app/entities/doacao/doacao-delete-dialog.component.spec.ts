/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { AreaadmistrativaTestModule } from '../../../test.module';
import { DoacaoDeleteDialogComponent } from 'app/entities/doacao/doacao-delete-dialog.component';
import { DoacaoService } from 'app/entities/doacao/doacao.service';

describe('Component Tests', () => {
  describe('Doacao Management Delete Component', () => {
    let comp: DoacaoDeleteDialogComponent;
    let fixture: ComponentFixture<DoacaoDeleteDialogComponent>;
    let service: DoacaoService;
    let mockEventManager: any;
    let mockActiveModal: any;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [AreaadmistrativaTestModule],
        declarations: [DoacaoDeleteDialogComponent]
      })
        .overrideTemplate(DoacaoDeleteDialogComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(DoacaoDeleteDialogComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(DoacaoService);
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
