import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IProfissao } from 'app/shared/model/profissao.model';
import { ProfissaoService } from './profissao.service';

@Component({
  selector: 'jhi-profissao-delete-dialog',
  templateUrl: './profissao-delete-dialog.component.html'
})
export class ProfissaoDeleteDialogComponent {
  profissao: IProfissao;

  constructor(protected profissaoService: ProfissaoService, public activeModal: NgbActiveModal, protected eventManager: JhiEventManager) {}

  clear() {
    this.activeModal.dismiss('cancel');
  }

  confirmDelete(id: number) {
    this.profissaoService.delete(id).subscribe(response => {
      this.eventManager.broadcast({
        name: 'profissaoListModification',
        content: 'Deleted an profissao'
      });
      this.activeModal.dismiss(true);
    });
  }
}

@Component({
  selector: 'jhi-profissao-delete-popup',
  template: ''
})
export class ProfissaoDeletePopupComponent implements OnInit, OnDestroy {
  protected ngbModalRef: NgbModalRef;

  constructor(protected activatedRoute: ActivatedRoute, protected router: Router, protected modalService: NgbModal) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ profissao }) => {
      setTimeout(() => {
        this.ngbModalRef = this.modalService.open(ProfissaoDeleteDialogComponent as Component, { size: 'lg', backdrop: 'static' });
        this.ngbModalRef.componentInstance.profissao = profissao;
        this.ngbModalRef.result.then(
          result => {
            this.router.navigate(['/profissao', { outlets: { popup: null } }]);
            this.ngbModalRef = null;
          },
          reason => {
            this.router.navigate(['/profissao', { outlets: { popup: null } }]);
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
