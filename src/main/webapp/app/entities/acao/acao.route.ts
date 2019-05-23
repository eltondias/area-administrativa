import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { Acao } from 'app/shared/model/acao.model';
import { AcaoService } from './acao.service';
import { AcaoComponent } from './acao.component';
import { AcaoDetailComponent } from './acao-detail.component';
import { AcaoUpdateComponent } from './acao-update.component';
import { AcaoDeletePopupComponent } from './acao-delete-dialog.component';
import { IAcao } from 'app/shared/model/acao.model';

@Injectable({ providedIn: 'root' })
export class AcaoResolve implements Resolve<IAcao> {
  constructor(private service: AcaoService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<IAcao> {
    const id = route.params['id'] ? route.params['id'] : null;
    if (id) {
      return this.service.find(id).pipe(
        filter((response: HttpResponse<Acao>) => response.ok),
        map((acao: HttpResponse<Acao>) => acao.body)
      );
    }
    return of(new Acao());
  }
}

export const acaoRoute: Routes = [
  {
    path: '',
    component: AcaoComponent,
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'areaadmistrativaApp.acao.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/view',
    component: AcaoDetailComponent,
    resolve: {
      acao: AcaoResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'areaadmistrativaApp.acao.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: 'new',
    component: AcaoUpdateComponent,
    resolve: {
      acao: AcaoResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'areaadmistrativaApp.acao.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/edit',
    component: AcaoUpdateComponent,
    resolve: {
      acao: AcaoResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'areaadmistrativaApp.acao.home.title'
    },
    canActivate: [UserRouteAccessService]
  }
];

export const acaoPopupRoute: Routes = [
  {
    path: ':id/delete',
    component: AcaoDeletePopupComponent,
    resolve: {
      acao: AcaoResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'areaadmistrativaApp.acao.home.title'
    },
    canActivate: [UserRouteAccessService],
    outlet: 'popup'
  }
];
