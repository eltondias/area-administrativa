import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { Disponibilidade } from 'app/shared/model/disponibilidade.model';
import { DisponibilidadeService } from './disponibilidade.service';
import { DisponibilidadeComponent } from './disponibilidade.component';
import { DisponibilidadeDetailComponent } from './disponibilidade-detail.component';
import { DisponibilidadeUpdateComponent } from './disponibilidade-update.component';
import { DisponibilidadeDeletePopupComponent } from './disponibilidade-delete-dialog.component';
import { IDisponibilidade } from 'app/shared/model/disponibilidade.model';

@Injectable({ providedIn: 'root' })
export class DisponibilidadeResolve implements Resolve<IDisponibilidade> {
  constructor(private service: DisponibilidadeService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<IDisponibilidade> {
    const id = route.params['id'] ? route.params['id'] : null;
    if (id) {
      return this.service.find(id).pipe(
        filter((response: HttpResponse<Disponibilidade>) => response.ok),
        map((disponibilidade: HttpResponse<Disponibilidade>) => disponibilidade.body)
      );
    }
    return of(new Disponibilidade());
  }
}

export const disponibilidadeRoute: Routes = [
  {
    path: '',
    component: DisponibilidadeComponent,
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'areaadmistrativaApp.disponibilidade.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/view',
    component: DisponibilidadeDetailComponent,
    resolve: {
      disponibilidade: DisponibilidadeResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'areaadmistrativaApp.disponibilidade.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: 'new',
    component: DisponibilidadeUpdateComponent,
    resolve: {
      disponibilidade: DisponibilidadeResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'areaadmistrativaApp.disponibilidade.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/edit',
    component: DisponibilidadeUpdateComponent,
    resolve: {
      disponibilidade: DisponibilidadeResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'areaadmistrativaApp.disponibilidade.home.title'
    },
    canActivate: [UserRouteAccessService]
  }
];

export const disponibilidadePopupRoute: Routes = [
  {
    path: ':id/delete',
    component: DisponibilidadeDeletePopupComponent,
    resolve: {
      disponibilidade: DisponibilidadeResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'areaadmistrativaApp.disponibilidade.home.title'
    },
    canActivate: [UserRouteAccessService],
    outlet: 'popup'
  }
];
