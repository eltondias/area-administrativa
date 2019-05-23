import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { RecursoNecessario } from 'app/shared/model/recurso-necessario.model';
import { RecursoNecessarioService } from './recurso-necessario.service';
import { RecursoNecessarioComponent } from './recurso-necessario.component';
import { RecursoNecessarioDetailComponent } from './recurso-necessario-detail.component';
import { RecursoNecessarioUpdateComponent } from './recurso-necessario-update.component';
import { RecursoNecessarioDeletePopupComponent } from './recurso-necessario-delete-dialog.component';
import { IRecursoNecessario } from 'app/shared/model/recurso-necessario.model';

@Injectable({ providedIn: 'root' })
export class RecursoNecessarioResolve implements Resolve<IRecursoNecessario> {
  constructor(private service: RecursoNecessarioService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<IRecursoNecessario> {
    const id = route.params['id'] ? route.params['id'] : null;
    if (id) {
      return this.service.find(id).pipe(
        filter((response: HttpResponse<RecursoNecessario>) => response.ok),
        map((recursoNecessario: HttpResponse<RecursoNecessario>) => recursoNecessario.body)
      );
    }
    return of(new RecursoNecessario());
  }
}

export const recursoNecessarioRoute: Routes = [
  {
    path: '',
    component: RecursoNecessarioComponent,
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'areaadmistrativaApp.recursoNecessario.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/view',
    component: RecursoNecessarioDetailComponent,
    resolve: {
      recursoNecessario: RecursoNecessarioResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'areaadmistrativaApp.recursoNecessario.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: 'new',
    component: RecursoNecessarioUpdateComponent,
    resolve: {
      recursoNecessario: RecursoNecessarioResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'areaadmistrativaApp.recursoNecessario.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/edit',
    component: RecursoNecessarioUpdateComponent,
    resolve: {
      recursoNecessario: RecursoNecessarioResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'areaadmistrativaApp.recursoNecessario.home.title'
    },
    canActivate: [UserRouteAccessService]
  }
];

export const recursoNecessarioPopupRoute: Routes = [
  {
    path: ':id/delete',
    component: RecursoNecessarioDeletePopupComponent,
    resolve: {
      recursoNecessario: RecursoNecessarioResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'areaadmistrativaApp.recursoNecessario.home.title'
    },
    canActivate: [UserRouteAccessService],
    outlet: 'popup'
  }
];
