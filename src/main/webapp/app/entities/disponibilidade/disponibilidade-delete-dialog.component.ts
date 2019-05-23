import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IDisponibilidade } from 'app/shared/model/disponibilidade.model';
import { DisponibilidadeService } from './disponibilidade.service';

@Component({
  selector: 'jhi-disponibilidade-delete-dialog',
  templateUrl: './disponibilidade-delete-dialog.component.html'
})
export class DisponibilidadeDeleteDialogComponent {
  disponibilidade: IDisponibilidade;

  constructor(
    protected disponibilidadeService: DisponibilidadeService,
    public activeModal: NgbActiveModal,
    protected eventManager: JhiEventManager
  ) {}

  clear() {
    this.activeModal.dismiss('cancel');
  }

  confirmDelete(id: number) {
    this.disponibilidadeService.delete(id).subscribe(response => {
      this.eventManager.broadcast({
        name: 'disponibilidadeListModification',
        content: 'Deleted an disponibilidade'
      });
      this.activeModal.dismiss(true);
    });
  }
}

@Component({
  selector: 'jhi-disponibilidade-delete-popup',
  template: ''
})
export class DisponibilidadeDeletePopupComponent implements OnInit, OnDestroy {
  protected ngbModalRef: NgbModalRef;

  constructor(protected activatedRoute: ActivatedRoute, protected router: Router, protected modalService: NgbModal) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ disponibilidade }) => {
      setTimeout(() => {
        this.ngbModalRef = this.modalService.open(DisponibilidadeDeleteDialogComponent as Component, { size: 'lg', backdrop: 'static' });
        this.ngbModalRef.componentInstance.disponibilidade = disponibilidade;
        this.ngbModalRef.result.then(
          result => {
            this.router.navigate(['/disponibilidade', { outlets: { popup: null } }]);
            this.ngbModalRef = null;
          },
          reason => {
            this.router.navigate(['/disponibilidade', { outlets: { popup: null } }]);
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
