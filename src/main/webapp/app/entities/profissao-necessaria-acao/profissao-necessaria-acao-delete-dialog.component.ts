import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IProfissaoNecessariaAcao } from 'app/shared/model/profissao-necessaria-acao.model';
import { ProfissaoNecessariaAcaoService } from './profissao-necessaria-acao.service';

@Component({
  selector: 'jhi-profissao-necessaria-acao-delete-dialog',
  templateUrl: './profissao-necessaria-acao-delete-dialog.component.html'
})
export class ProfissaoNecessariaAcaoDeleteDialogComponent {
  profissaoNecessariaAcao: IProfissaoNecessariaAcao;

  constructor(
    protected profissaoNecessariaAcaoService: ProfissaoNecessariaAcaoService,
    public activeModal: NgbActiveModal,
    protected eventManager: JhiEventManager
  ) {}

  clear() {
    this.activeModal.dismiss('cancel');
  }

  confirmDelete(id: number) {
    this.profissaoNecessariaAcaoService.delete(id).subscribe(response => {
      this.eventManager.broadcast({
        name: 'profissaoNecessariaAcaoListModification',
        content: 'Deleted an profissaoNecessariaAcao'
      });
      this.activeModal.dismiss(true);
    });
  }
}

@Component({
  selector: 'jhi-profissao-necessaria-acao-delete-popup',
  template: ''
})
export class ProfissaoNecessariaAcaoDeletePopupComponent implements OnInit, OnDestroy {
  protected ngbModalRef: NgbModalRef;

  constructor(protected activatedRoute: ActivatedRoute, protected router: Router, protected modalService: NgbModal) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ profissaoNecessariaAcao }) => {
      setTimeout(() => {
        this.ngbModalRef = this.modalService.open(ProfissaoNecessariaAcaoDeleteDialogComponent as Component, {
          size: 'lg',
          backdrop: 'static'
        });
        this.ngbModalRef.componentInstance.profissaoNecessariaAcao = profissaoNecessariaAcao;
        this.ngbModalRef.result.then(
          result => {
            this.router.navigate(['/profissao-necessaria-acao', { outlets: { popup: null } }]);
            this.ngbModalRef = null;
          },
          reason => {
            this.router.navigate(['/profissao-necessaria-acao', { outlets: { popup: null } }]);
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
