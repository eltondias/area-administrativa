import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { DATE_FORMAT } from 'app/shared/constants/input.constants';
import { map } from 'rxjs/operators';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IParticipacao } from 'app/shared/model/participacao.model';

type EntityResponseType = HttpResponse<IParticipacao>;
type EntityArrayResponseType = HttpResponse<IParticipacao[]>;

@Injectable({ providedIn: 'root' })
export class ParticipacaoService {
  public resourceUrl = SERVER_API_URL + 'api/participacaos';

  constructor(protected http: HttpClient) {}

  create(participacao: IParticipacao): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(participacao);
    return this.http
      .post<IParticipacao>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  update(participacao: IParticipacao): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(participacao);
    return this.http
      .put<IParticipacao>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http
      .get<IParticipacao>(`${this.resourceUrl}/${id}`, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<IParticipacao[]>(this.resourceUrl, { params: options, observe: 'response' })
      .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
  }

  delete(id: number): Observable<HttpResponse<any>> {
    return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  protected convertDateFromClient(participacao: IParticipacao): IParticipacao {
    const copy: IParticipacao = Object.assign({}, participacao, {
      dataHoraEmissaoCertificado:
        participacao.dataHoraEmissaoCertificado != null && participacao.dataHoraEmissaoCertificado.isValid()
          ? participacao.dataHoraEmissaoCertificado.toJSON()
          : null
    });
    return copy;
  }

  protected convertDateFromServer(res: EntityResponseType): EntityResponseType {
    if (res.body) {
      res.body.dataHoraEmissaoCertificado =
        res.body.dataHoraEmissaoCertificado != null ? moment(res.body.dataHoraEmissaoCertificado) : null;
    }
    return res;
  }

  protected convertDateArrayFromServer(res: EntityArrayResponseType): EntityArrayResponseType {
    if (res.body) {
      res.body.forEach((participacao: IParticipacao) => {
        participacao.dataHoraEmissaoCertificado =
          participacao.dataHoraEmissaoCertificado != null ? moment(participacao.dataHoraEmissaoCertificado) : null;
      });
    }
    return res;
  }
}
