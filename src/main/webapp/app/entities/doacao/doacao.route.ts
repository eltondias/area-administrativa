import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { Doacao } from 'app/shared/model/doacao.model';
import { DoacaoService } from './doacao.service';
import { DoacaoComponent } from './doacao.component';
import { DoacaoDetailComponent } from './doacao-detail.component';
import { DoacaoUpdateComponent } from './doacao-update.component';
import { DoacaoDeletePopupComponent } from './doacao-delete-dialog.component';
import { IDoacao } from 'app/shared/model/doacao.model';

@Injectable({ providedIn: 'root' })
export class DoacaoResolve implements Resolve<IDoacao> {
  constructor(private service: DoacaoService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<IDoacao> {
    const id = route.params['id'] ? route.params['id'] : null;
    if (id) {
      return this.service.find(id).pipe(
        filter((response: HttpResponse<Doacao>) => response.ok),
        map((doacao: HttpResponse<Doacao>) => doacao.body)
      );
    }
    return of(new Doacao());
  }
}

export const doacaoRoute: Routes = [
  {
    path: '',
    component: DoacaoComponent,
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'areaadmistrativaApp.doacao.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/view',
    component: DoacaoDetailComponent,
    resolve: {
      doacao: DoacaoResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'areaadmistrativaApp.doacao.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: 'new',
    component: DoacaoUpdateComponent,
    resolve: {
      doacao: DoacaoResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'areaadmistrativaApp.doacao.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/edit',
    component: DoacaoUpdateComponent,
    resolve: {
      doacao: DoacaoResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'areaadmistrativaApp.doacao.home.title'
    },
    canActivate: [UserRouteAccessService]
  }
];

export const doacaoPopupRoute: Routes = [
  {
    path: ':id/delete',
    component: DoacaoDeletePopupComponent,
    resolve: {
      doacao: DoacaoResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'areaadmistrativaApp.doacao.home.title'
    },
    canActivate: [UserRouteAccessService],
    outlet: 'popup'
  }
];
