import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IDoacao } from 'app/shared/model/doacao.model';
import { DoacaoService } from './doacao.service';

@Component({
  selector: 'jhi-doacao-delete-dialog',
  templateUrl: './doacao-delete-dialog.component.html'
})
export class DoacaoDeleteDialogComponent {
  doacao: IDoacao;

  constructor(protected doacaoService: DoacaoService, public activeModal: NgbActiveModal, protected eventManager: JhiEventManager) {}

  clear() {
    this.activeModal.dismiss('cancel');
  }

  confirmDelete(id: number) {
    this.doacaoService.delete(id).subscribe(response => {
      this.eventManager.broadcast({
        name: 'doacaoListModification',
        content: 'Deleted an doacao'
      });
      this.activeModal.dismiss(true);
    });
  }
}

@Component({
  selector: 'jhi-doacao-delete-popup',
  template: ''
})
export class DoacaoDeletePopupComponent implements OnInit, OnDestroy {
  protected ngbModalRef: NgbModalRef;

  constructor(protected activatedRoute: ActivatedRoute, protected router: Router, protected modalService: NgbModal) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ doacao }) => {
      setTimeout(() => {
        this.ngbModalRef = this.modalService.open(DoacaoDeleteDialogComponent as Component, { size: 'lg', backdrop: 'static' });
        this.ngbModalRef.componentInstance.doacao = doacao;
        this.ngbModalRef.result.then(
          result => {
            this.router.navigate(['/doacao', { outlets: { popup: null } }]);
            this.ngbModalRef = null;
          },
          reason => {
            this.router.navigate(['/doacao', { outlets: { popup: null } }]);
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
