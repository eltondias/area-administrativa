import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IHabilidade } from 'app/shared/model/habilidade.model';
import { HabilidadeService } from './habilidade.service';

@Component({
  selector: 'jhi-habilidade-delete-dialog',
  templateUrl: './habilidade-delete-dialog.component.html'
})
export class HabilidadeDeleteDialogComponent {
  habilidade: IHabilidade;

  constructor(
    protected habilidadeService: HabilidadeService,
    public activeModal: NgbActiveModal,
    protected eventManager: JhiEventManager
  ) {}

  clear() {
    this.activeModal.dismiss('cancel');
  }

  confirmDelete(id: number) {
    this.habilidadeService.delete(id).subscribe(response => {
      this.eventManager.broadcast({
        name: 'habilidadeListModification',
        content: 'Deleted an habilidade'
      });
      this.activeModal.dismiss(true);
    });
  }
}

@Component({
  selector: 'jhi-habilidade-delete-popup',
  template: ''
})
export class HabilidadeDeletePopupComponent implements OnInit, OnDestroy {
  protected ngbModalRef: NgbModalRef;

  constructor(protected activatedRoute: ActivatedRoute, protected router: Router, protected modalService: NgbModal) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ habilidade }) => {
      setTimeout(() => {
        this.ngbModalRef = this.modalService.open(HabilidadeDeleteDialogComponent as Component, { size: 'lg', backdrop: 'static' });
        this.ngbModalRef.componentInstance.habilidade = habilidade;
        this.ngbModalRef.result.then(
          result => {
            this.router.navigate(['/habilidade', { outlets: { popup: null } }]);
            this.ngbModalRef = null;
          },
          reason => {
            this.router.navigate(['/habilidade', { outlets: { popup: null } }]);
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
