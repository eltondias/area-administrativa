import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { ProfissaoNecessariaAcao } from 'app/shared/model/profissao-necessaria-acao.model';
import { ProfissaoNecessariaAcaoService } from './profissao-necessaria-acao.service';
import { ProfissaoNecessariaAcaoComponent } from './profissao-necessaria-acao.component';
import { ProfissaoNecessariaAcaoDetailComponent } from './profissao-necessaria-acao-detail.component';
import { ProfissaoNecessariaAcaoUpdateComponent } from './profissao-necessaria-acao-update.component';
import { ProfissaoNecessariaAcaoDeletePopupComponent } from './profissao-necessaria-acao-delete-dialog.component';
import { IProfissaoNecessariaAcao } from 'app/shared/model/profissao-necessaria-acao.model';

@Injectable({ providedIn: 'root' })
export class ProfissaoNecessariaAcaoResolve implements Resolve<IProfissaoNecessariaAcao> {
  constructor(private service: ProfissaoNecessariaAcaoService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<IProfissaoNecessariaAcao> {
    const id = route.params['id'] ? route.params['id'] : null;
    if (id) {
      return this.service.find(id).pipe(
        filter((response: HttpResponse<ProfissaoNecessariaAcao>) => response.ok),
        map((profissaoNecessariaAcao: HttpResponse<ProfissaoNecessariaAcao>) => profissaoNecessariaAcao.body)
      );
    }
    return of(new ProfissaoNecessariaAcao());
  }
}

export const profissaoNecessariaAcaoRoute: Routes = [
  {
    path: '',
    component: ProfissaoNecessariaAcaoComponent,
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'areaadmistrativaApp.profissaoNecessariaAcao.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/view',
    component: ProfissaoNecessariaAcaoDetailComponent,
    resolve: {
      profissaoNecessariaAcao: ProfissaoNecessariaAcaoResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'areaadmistrativaApp.profissaoNecessariaAcao.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: 'new',
    component: ProfissaoNecessariaAcaoUpdateComponent,
    resolve: {
      profissaoNecessariaAcao: ProfissaoNecessariaAcaoResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'areaadmistrativaApp.profissaoNecessariaAcao.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/edit',
    component: ProfissaoNecessariaAcaoUpdateComponent,
    resolve: {
      profissaoNecessariaAcao: ProfissaoNecessariaAcaoResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'areaadmistrativaApp.profissaoNecessariaAcao.home.title'
    },
    canActivate: [UserRouteAccessService]
  }
];

export const profissaoNecessariaAcaoPopupRoute: Routes = [
  {
    path: ':id/delete',
    component: ProfissaoNecessariaAcaoDeletePopupComponent,
    resolve: {
      profissaoNecessariaAcao: ProfissaoNecessariaAcaoResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'areaadmistrativaApp.profissaoNecessariaAcao.home.title'
    },
    canActivate: [UserRouteAccessService],
    outlet: 'popup'
  }
];
