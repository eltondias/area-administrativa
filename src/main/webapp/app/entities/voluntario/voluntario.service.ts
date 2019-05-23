import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { DATE_FORMAT } from 'app/shared/constants/input.constants';
import { map } from 'rxjs/operators';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IVoluntario } from 'app/shared/model/voluntario.model';

type EntityResponseType = HttpResponse<IVoluntario>;
type EntityArrayResponseType = HttpResponse<IVoluntario[]>;

@Injectable({ providedIn: 'root' })
export class VoluntarioService {
  public resourceUrl = SERVER_API_URL + 'api/voluntarios';

  constructor(protected http: HttpClient) {}

  create(voluntario: IVoluntario): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(voluntario);
    return this.http
      .post<IVoluntario>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  update(voluntario: IVoluntario): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(voluntario);
    return this.http
      .put<IVoluntario>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http
      .get<IVoluntario>(`${this.resourceUrl}/${id}`, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<IVoluntario[]>(this.resourceUrl, { params: options, observe: 'response' })
      .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
  }

  delete(id: number): Observable<HttpResponse<any>> {
    return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  protected convertDateFromClient(voluntario: IVoluntario): IVoluntario {
    const copy: IVoluntario = Object.assign({}, voluntario, {
      dataNascimento: voluntario.dataNascimento != null && voluntario.dataNascimento.isValid() ? voluntario.dataNascimento.toJSON() : null,
      dataCadastro: voluntario.dataCadastro != null && voluntario.dataCadastro.isValid() ? voluntario.dataCadastro.toJSON() : null
    });
    return copy;
  }

  protected convertDateFromServer(res: EntityResponseType): EntityResponseType {
    if (res.body) {
      res.body.dataNascimento = res.body.dataNascimento != null ? moment(res.body.dataNascimento) : null;
      res.body.dataCadastro = res.body.dataCadastro != null ? moment(res.body.dataCadastro) : null;
    }
    return res;
  }

  protected convertDateArrayFromServer(res: EntityArrayResponseType): EntityArrayResponseType {
    if (res.body) {
      res.body.forEach((voluntario: IVoluntario) => {
        voluntario.dataNascimento = voluntario.dataNascimento != null ? moment(voluntario.dataNascimento) : null;
        voluntario.dataCadastro = voluntario.dataCadastro != null ? moment(voluntario.dataCadastro) : null;
      });
    }
    return res;
  }
}
