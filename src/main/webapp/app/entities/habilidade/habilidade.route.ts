import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { Habilidade } from 'app/shared/model/habilidade.model';
import { HabilidadeService } from './habilidade.service';
import { HabilidadeComponent } from './habilidade.component';
import { HabilidadeDetailComponent } from './habilidade-detail.component';
import { HabilidadeUpdateComponent } from './habilidade-update.component';
import { HabilidadeDeletePopupComponent } from './habilidade-delete-dialog.component';
import { IHabilidade } from 'app/shared/model/habilidade.model';

@Injectable({ providedIn: 'root' })
export class HabilidadeResolve implements Resolve<IHabilidade> {
  constructor(private service: HabilidadeService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<IHabilidade> {
    const id = route.params['id'] ? route.params['id'] : null;
    if (id) {
      return this.service.find(id).pipe(
        filter((response: HttpResponse<Habilidade>) => response.ok),
        map((habilidade: HttpResponse<Habilidade>) => habilidade.body)
      );
    }
    return of(new Habilidade());
  }
}

export const habilidadeRoute: Routes = [
  {
    path: '',
    component: HabilidadeComponent,
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'areaadmistrativaApp.habilidade.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/view',
    component: HabilidadeDetailComponent,
    resolve: {
      habilidade: HabilidadeResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'areaadmistrativaApp.habilidade.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: 'new',
    component: HabilidadeUpdateComponent,
    resolve: {
      habilidade: HabilidadeResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'areaadmistrativaApp.habilidade.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/edit',
    component: HabilidadeUpdateComponent,
    resolve: {
      habilidade: HabilidadeResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'areaadmistrativaApp.habilidade.home.title'
    },
    canActivate: [UserRouteAccessService]
  }
];

export const habilidadePopupRoute: Routes = [
  {
    path: ':id/delete',
    component: HabilidadeDeletePopupComponent,
    resolve: {
      habilidade: HabilidadeResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'areaadmistrativaApp.habilidade.home.title'
    },
    canActivate: [UserRouteAccessService],
    outlet: 'popup'
  }
];
