import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IVoluntario } from 'app/shared/model/voluntario.model';
import { VoluntarioService } from './voluntario.service';

@Component({
  selector: 'jhi-voluntario-delete-dialog',
  templateUrl: './voluntario-delete-dialog.component.html'
})
export class VoluntarioDeleteDialogComponent {
  voluntario: IVoluntario;

  constructor(
    protected voluntarioService: VoluntarioService,
    public activeModal: NgbActiveModal,
    protected eventManager: JhiEventManager
  ) {}

  clear() {
    this.activeModal.dismiss('cancel');
  }

  confirmDelete(id: number) {
    this.voluntarioService.delete(id).subscribe(response => {
      this.eventManager.broadcast({
        name: 'voluntarioListModification',
        content: 'Deleted an voluntario'
      });
      this.activeModal.dismiss(true);
    });
  }
}

@Component({
  selector: 'jhi-voluntario-delete-popup',
  template: ''
})
export class VoluntarioDeletePopupComponent implements OnInit, OnDestroy {
  protected ngbModalRef: NgbModalRef;

  constructor(protected activatedRoute: ActivatedRoute, protected router: Router, protected modalService: NgbModal) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ voluntario }) => {
      setTimeout(() => {
        this.ngbModalRef = this.modalService.open(VoluntarioDeleteDialogComponent as Component, { size: 'lg', backdrop: 'static' });
        this.ngbModalRef.componentInstance.voluntario = voluntario;
        this.ngbModalRef.result.then(
          result => {
            this.router.navigate(['/voluntario', { outlets: { popup: null } }]);
            this.ngbModalRef = null;
          },
          reason => {
            this.router.navigate(['/voluntario', { outlets: { popup: null } }]);
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
