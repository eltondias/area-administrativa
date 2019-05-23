/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { AreaadmistrativaTestModule } from '../../../test.module';
import { ProfissaoNecessariaAcaoDeleteDialogComponent } from 'app/entities/profissao-necessaria-acao/profissao-necessaria-acao-delete-dialog.component';
import { ProfissaoNecessariaAcaoService } from 'app/entities/profissao-necessaria-acao/profissao-necessaria-acao.service';

describe('Component Tests', () => {
  describe('ProfissaoNecessariaAcao Management Delete Component', () => {
    let comp: ProfissaoNecessariaAcaoDeleteDialogComponent;
    let fixture: ComponentFixture<ProfissaoNecessariaAcaoDeleteDialogComponent>;
    let service: ProfissaoNecessariaAcaoService;
    let mockEventManager: any;
    let mockActiveModal: any;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [AreaadmistrativaTestModule],
        declarations: [ProfissaoNecessariaAcaoDeleteDialogComponent]
      })
        .overrideTemplate(ProfissaoNecessariaAcaoDeleteDialogComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(ProfissaoNecessariaAcaoDeleteDialogComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(ProfissaoNecessariaAcaoService);
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
