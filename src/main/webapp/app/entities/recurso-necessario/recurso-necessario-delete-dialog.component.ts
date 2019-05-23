import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IRecursoNecessario } from 'app/shared/model/recurso-necessario.model';
import { RecursoNecessarioService } from './recurso-necessario.service';

@Component({
  selector: 'jhi-recurso-necessario-delete-dialog',
  templateUrl: './recurso-necessario-delete-dialog.component.html'
})
export class RecursoNecessarioDeleteDialogComponent {
  recursoNecessario: IRecursoNecessario;

  constructor(
    protected recursoNecessarioService: RecursoNecessarioService,
    public activeModal: NgbActiveModal,
    protected eventManager: JhiEventManager
  ) {}

  clear() {
    this.activeModal.dismiss('cancel');
  }

  confirmDelete(id: number) {
    this.recursoNecessarioService.delete(id).subscribe(response => {
      this.eventManager.broadcast({
        name: 'recursoNecessarioListModification',
        content: 'Deleted an recursoNecessario'
      });
      this.activeModal.dismiss(true);
    });
  }
}

@Component({
  selector: 'jhi-recurso-necessario-delete-popup',
  template: ''
})
export class RecursoNecessarioDeletePopupComponent implements OnInit, OnDestroy {
  protected ngbModalRef: NgbModalRef;

  constructor(protected activatedRoute: ActivatedRoute, protected router: Router, protected modalService: NgbModal) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ recursoNecessario }) => {
      setTimeout(() => {
        this.ngbModalRef = this.modalService.open(RecursoNecessarioDeleteDialogComponent as Component, { size: 'lg', backdrop: 'static' });
        this.ngbModalRef.componentInstance.recursoNecessario = recursoNecessario;
        this.ngbModalRef.result.then(
          result => {
            this.router.navigate(['/recurso-necessario', { outlets: { popup: null } }]);
            this.ngbModalRef = null;
          },
          reason => {
            this.router.navigate(['/recurso-necessario', { outlets: { popup: null } }]);
            this.ngbModalRef = null;
          }
        );
      }, 0);
    });
  }

  ngOnDestroy() {
    this.ngbModalRef = null;
  }
}
