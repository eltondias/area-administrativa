import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { DATE_FORMAT } from 'app/shared/constants/input.constants';
import { map } from 'rxjs/operators';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IDisponibilidade } from 'app/shared/model/disponibilidade.model';

type EntityResponseType = HttpResponse<IDisponibilidade>;
type EntityArrayResponseType = HttpResponse<IDisponibilidade[]>;

@Injectable({ providedIn: 'root' })
export class DisponibilidadeService {
  public resourceUrl = SERVER_API_URL + 'api/disponibilidades';

  constructor(protected http: HttpClient) {}

  create(disponibilidade: IDisponibilidade): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(disponibilidade);
    return this.http
      .post<IDisponibilidade>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  update(disponibilidade: IDisponibilidade): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(disponibilidade);
    return this.http
      .put<IDisponibilidade>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http
      .get<IDisponibilidade>(`${this.resourceUrl}/${id}`, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<IDisponibilidade[]>(this.resourceUrl, { params: options, observe: 'response' })
      .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
  }

  delete(id: number): Observable<HttpResponse<any>> {
    return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  protected convertDateFromClient(disponibilidade: IDisponibilidade): IDisponibilidade {
    const copy: IDisponibilidade = Object.assign({}, disponibilidade, {
      horaInicio: disponibilidade.horaInicio != null && disponibilidade.horaInicio.isValid() ? disponibilidade.horaInicio.toJSON() : null,
      horaFim: disponibilidade.horaFim != null && disponibilidade.horaFim.isValid() ? disponibilidade.horaFim.toJSON() : null
    });
    return copy;
  }

  protected convertDateFromServer(res: EntityResponseType): EntityResponseType {
    if (res.body) {
      res.body.horaInicio = res.body.horaInicio != null ? moment(res.body.horaInicio) : null;
      res.body.horaFim = res.body.horaFim != null ? moment(res.body.horaFim) : null;
    }
    return res;
  }

  protected convertDateArrayFromServer(res: EntityArrayResponseType): EntityArrayResponseType {
    if (res.body) {
      res.body.forEach((disponibilidade: IDisponibilidade) => {
        disponibilidade.horaInicio = disponibilidade.horaInicio != null ? moment(disponibilidade.horaInicio) : null;
        disponibilidade.horaFim = disponibilidade.horaFim != null ? moment(disponibilidade.horaFim) : null;
      });
    }
    return res;
  }
}
