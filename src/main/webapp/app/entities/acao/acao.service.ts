import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { DATE_FORMAT } from 'app/shared/constants/input.constants';
import { map } from 'rxjs/operators';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IAcao } from 'app/shared/model/acao.model';

type EntityResponseType = HttpResponse<IAcao>;
type EntityArrayResponseType = HttpResponse<IAcao[]>;

@Injectable({ providedIn: 'root' })
export class AcaoService {
  public resourceUrl = SERVER_API_URL + 'api/acaos';

  constructor(protected http: HttpClient) {}

  create(acao: IAcao): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(acao);
    return this.http
      .post<IAcao>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  update(acao: IAcao): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(acao);
    return this.http
      .put<IAcao>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http
      .get<IAcao>(`${this.resourceUrl}/${id}`, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<IAcao[]>(this.resourceUrl, { params: options, observe: 'response' })
      .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
  }

  delete(id: number): Observable<HttpResponse<any>> {
    return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  protected convertDateFromClient(acao: IAcao): IAcao {
    const copy: IAcao = Object.assign({}, acao, {
      dataHoraInicio: acao.dataHoraInicio != null && acao.dataHoraInicio.isValid() ? acao.dataHoraInicio.toJSON() : null,
      dataHoraFim: acao.dataHoraFim != null && acao.dataHoraFim.isValid() ? acao.dataHoraFim.toJSON() : null
    });
    return copy;
  }

  protected convertDateFromServer(res: EntityResponseType): EntityResponseType {
    if (res.body) {
      res.body.dataHoraInicio = res.body.dataHoraInicio != null ? moment(res.body.dataHoraInicio) : null;
      res.body.dataHoraFim = res.body.dataHoraFim != null ? moment(res.body.dataHoraFim) : null;
    }
    return res;
  }

  protected convertDateArrayFromServer(res: EntityArrayResponseType): EntityArrayResponseType {
    if (res.body) {
      res.body.forEach((acao: IAcao) => {
        acao.dataHoraInicio = acao.dataHoraInicio != null ? moment(acao.dataHoraInicio) : null;
        acao.dataHoraFim = acao.dataHoraFim != null ? moment(acao.dataHoraFim) : null;
      });
    }
    return res;
  }
}
