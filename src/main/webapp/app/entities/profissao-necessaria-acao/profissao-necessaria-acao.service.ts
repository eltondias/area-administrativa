import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IProfissaoNecessariaAcao } from 'app/shared/model/profissao-necessaria-acao.model';

type EntityResponseType = HttpResponse<IProfissaoNecessariaAcao>;
type EntityArrayResponseType = HttpResponse<IProfissaoNecessariaAcao[]>;

@Injectable({ providedIn: 'root' })
export class ProfissaoNecessariaAcaoService {
  public resourceUrl = SERVER_API_URL + 'api/profissao-necessaria-acaos';

  constructor(protected http: HttpClient) {}

  create(profissaoNecessariaAcao: IProfissaoNecessariaAcao): Observable<EntityResponseType> {
    return this.http.post<IProfissaoNecessariaAcao>(this.resourceUrl, profissaoNecessariaAcao, { observe: 'response' });
  }

  update(profissaoNecessariaAcao: IProfissaoNecessariaAcao): Observable<EntityResponseType> {
    return this.http.put<IProfissaoNecessariaAcao>(this.resourceUrl, profissaoNecessariaAcao, { observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IProfissaoNecessariaAcao>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IProfissaoNecessariaAcao[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<any>> {
    return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }
}
