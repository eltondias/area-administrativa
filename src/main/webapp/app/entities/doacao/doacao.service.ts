import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { DATE_FORMAT } from 'app/shared/constants/input.constants';
import { map } from 'rxjs/operators';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IDoacao } from 'app/shared/model/doacao.model';

type EntityResponseType = HttpResponse<IDoacao>;
type EntityArrayResponseType = HttpResponse<IDoacao[]>;

@Injectable({ providedIn: 'root' })
export class DoacaoService {
  public resourceUrl = SERVER_API_URL + 'api/doacaos';

  constructor(protected http: HttpClient) {}

  create(doacao: IDoacao): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(doacao);
    return this.http
      .post<IDoacao>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  update(doacao: IDoacao): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(doacao);
    return this.http
      .put<IDoacao>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http
      .get<IDoacao>(`${this.resourceUrl}/${id}`, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<IDoacao[]>(this.resourceUrl, { params: options, observe: 'response' })
      .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
  }

  delete(id: number): Observable<HttpResponse<any>> {
    return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  protected convertDateFromClient(doacao: IDoacao): IDoacao {
    const copy: IDoacao = Object.assign({}, doacao, {
      dataHora: doacao.dataHora != null && doacao.dataHora.isValid() ? doacao.dataHora.toJSON() : null
    });
    return copy;
  }

  protected convertDateFromServer(res: EntityResponseType): EntityResponseType {
    if (res.body) {
      res.body.dataHora = res.body.dataHora != null ? moment(res.body.dataHora) : null;
    }
    return res;
  }

  protected convertDateArrayFromServer(res: EntityArrayResponseType): EntityArrayResponseType {
    if (res.body) {
      res.body.forEach((doacao: IDoacao) => {
        doacao.dataHora = doacao.dataHora != null ? moment(doacao.dataHora) : null;
      });
    }
    return res;
  }
}
