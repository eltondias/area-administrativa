import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IAcao } from 'app/shared/model/acao.model';
import { AcaoService } from './acao.service';

@Component({
  selector: 'jhi-acao-delete-dialog',
  templateUrl: './acao-delete-dialog.component.html'
})
export class AcaoDeleteDialogComponent {
  acao: IAcao;

  constructor(protected acaoService: AcaoService, public activeModal: NgbActiveModal, protected eventManager: JhiEventManager) {}

  clear() {
    this.activeModal.dismiss('cancel');
  }

  confirmDelete(id: number) {
    this.acaoService.delete(id).subscribe(response => {
      this.eventManager.broadcast({
        name: 'acaoListModification',
        content: 'Deleted an acao'
      });
      this.activeModal.dismiss(true);
    });
  }
}

@Component({
  selector: 'jhi-acao-delete-popup',
  template: ''
})
export class AcaoDeletePopupComponent implements OnInit, OnDestroy {
  protected ngbModalRef: NgbModalRef;

  constructor(protected activatedRoute: ActivatedRoute, protected router: Router, protected modalService: NgbModal) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ acao }) => {
      setTimeout(() => {
        this.ngbModalRef = this.modalService.open(AcaoDeleteDialogComponent as Component, { size: 'lg', backdrop: 'static' });
        this.ngbModalRef.componentInstance.acao = acao;
        this.ngbModalRef.result.then(
          result => {
            this.router.navigate(['/acao', { outlets: { popup: null } }]);
            this.ngbModalRef = null;
          },
          reason => {
            this.router.navigate(['/acao', { outlets: { popup: null } }]);
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
