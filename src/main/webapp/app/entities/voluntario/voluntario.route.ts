import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { Voluntario } from 'app/shared/model/voluntario.model';
import { VoluntarioService } from './voluntario.service';
import { VoluntarioComponent } from './voluntario.component';
import { VoluntarioDetailComponent } from './voluntario-detail.component';
import { VoluntarioUpdateComponent } from './voluntario-update.component';
import { VoluntarioDeletePopupComponent } from './voluntario-delete-dialog.component';
import { IVoluntario } from 'app/shared/model/voluntario.model';

@Injectable({ providedIn: 'root' })
export class VoluntarioResolve implements Resolve<IVoluntario> {
  constructor(private service: VoluntarioService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<IVoluntario> {
    const id = route.params['id'] ? route.params['id'] : null;
    if (id) {
      return this.service.find(id).pipe(
        filter((response: HttpResponse<Voluntario>) => response.ok),
        map((voluntario: HttpResponse<Voluntario>) => voluntario.body)
      );
    }
    return of(new Voluntario());
  }
}

export const voluntarioRoute: Routes = [
  {
    path: '',
    component: VoluntarioComponent,
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'areaadmistrativaApp.voluntario.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/view',
    component: VoluntarioDetailComponent,
    resolve: {
      voluntario: VoluntarioResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'areaadmistrativaApp.voluntario.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: 'new',
    component: VoluntarioUpdateComponent,
    resolve: {
      voluntario: VoluntarioResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'areaadmistrativaApp.voluntario.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/edit',
    component: VoluntarioUpdateComponent,
    resolve: {
      voluntario: VoluntarioResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'areaadmistrativaApp.voluntario.home.title'
    },
    canActivate: [UserRouteAccessService]
  }
];

export const voluntarioPopupRoute: Routes = [
  {
    path: ':id/delete',
    component: VoluntarioDeletePopupComponent,
    resolve: {
      voluntario: VoluntarioResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'areaadmistrativaApp.voluntario.home.title'
    },
    canActivate: [UserRouteAccessService],
    outlet: 'popup'
  }
];
