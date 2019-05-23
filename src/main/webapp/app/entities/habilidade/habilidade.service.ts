import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IHabilidade } from 'app/shared/model/habilidade.model';

type EntityResponseType = HttpResponse<IHabilidade>;
type EntityArrayResponseType = HttpResponse<IHabilidade[]>;

@Injectable({ providedIn: 'root' })
export class HabilidadeService {
  public resourceUrl = SERVER_API_URL + 'api/habilidades';

  constructor(protected http: HttpClient) {}

  create(habilidade: IHabilidade): Observable<EntityResponseType> {
    return this.http.post<IHabilidade>(this.resourceUrl, habilidade, { observe: 'response' });
  }

  update(habilidade: IHabilidade): Observable<EntityResponseType> {
    return this.http.put<IHabilidade>(this.resourceUrl, habilidade, { observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IHabilidade>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IHabilidade[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<any>> {
    return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }
}
