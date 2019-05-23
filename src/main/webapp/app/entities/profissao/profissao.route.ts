import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { Profissao } from 'app/shared/model/profissao.model';
import { ProfissaoService } from './profissao.service';
import { ProfissaoComponent } from './profissao.component';
import { ProfissaoDetailComponent } from './profissao-detail.component';
import { ProfissaoUpdateComponent } from './profissao-update.component';
import { ProfissaoDeletePopupComponent } from './profissao-delete-dialog.component';
import { IProfissao } from 'app/shared/model/profissao.model';

@Injectable({ providedIn: 'root' })
export class ProfissaoResolve implements Resolve<IProfissao> {
  constructor(private service: ProfissaoService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<IProfissao> {
    const id = route.params['id'] ? route.params['id'] : null;
    if (id) {
      return this.service.find(id).pipe(
        filter((response: HttpResponse<Profissao>) => response.ok),
        map((profissao: HttpResponse<Profissao>) => profissao.body)
      );
    }
    return of(new Profissao());
  }
}

export const profissaoRoute: Routes = [
  {
    path: '',
    component: ProfissaoComponent,
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'areaadmistrativaApp.profissao.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/view',
    component: ProfissaoDetailComponent,
    resolve: {
      profissao: ProfissaoResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'areaadmistrativaApp.profissao.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: 'new',
    component: ProfissaoUpdateComponent,
    resolve: {
      profissao: ProfissaoResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'areaadmistrativaApp.profissao.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/edit',
    component: ProfissaoUpdateComponent,
    resolve: {
      profissao: ProfissaoResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'areaadmistrativaApp.profissao.home.title'
    },
    canActivate: [UserRouteAccessService]
  }
];

export const profissaoPopupRoute: Routes = [
  {
    path: ':id/delete',
    component: ProfissaoDeletePopupComponent,
    resolve: {
      profissao: ProfissaoResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'areaadmistrativaApp.profissao.home.title'
    },
    canActivate: [UserRouteAccessService],
    outlet: 'popup'
  }
];
