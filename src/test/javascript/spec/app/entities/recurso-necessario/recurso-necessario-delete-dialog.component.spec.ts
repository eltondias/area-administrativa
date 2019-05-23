/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { AreaadmistrativaTestModule } from '../../../test.module';
import { RecursoNecessarioDeleteDialogComponent } from 'app/entities/recurso-necessario/recurso-necessario-delete-dialog.component';
import { RecursoNecessarioService } from 'app/entities/recurso-necessario/recurso-necessario.service';

describe('Component Tests', () => {
  describe('RecursoNecessario Management Delete Component', () => {
    let comp: RecursoNecessarioDeleteDialogComponent;
    let fixture: ComponentFixture<RecursoNecessarioDeleteDialogComponent>;
    let service: RecursoNecessarioService;
    let mockEventManager: any;
    let mockActiveModal: any;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [AreaadmistrativaTestModule],
        declarations: [RecursoNecessarioDeleteDialogComponent]
      })
        .overrideTemplate(RecursoNecessarioDeleteDialogComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(RecursoNecessarioDeleteDialogComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(RecursoNecessarioService);
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
