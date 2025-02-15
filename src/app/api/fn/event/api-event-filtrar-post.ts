import { Evento } from './../../models/evento';
/* tslint:disable */
/* eslint-disable */
/* Code generated by ng-openapi-gen DO NOT EDIT. */

import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { EventoFiltroDto } from '../../models/evento-filtro-dto';

export interface ApiEventFiltrarPost$Params {
      body?: EventoFiltroDto
}

export function apiEventFiltrarPost(http: HttpClient, rootUrl: string, params?: ApiEventFiltrarPost$Params, context?: HttpContext): Observable<StrictHttpResponse<Evento[]>> {
  const rb = new RequestBuilder(rootUrl, apiEventFiltrarPost.PATH, 'post');
  if (params) {
    rb.body(params.body, 'application/*+json');
  }

  return http.request<StrictHttpResponse<Evento[]>>(
    rb.build({ responseType: 'json', accept: 'application/json', context })
  ).pipe(
    filter((r: any) => r instanceof HttpResponse),
    map((r: StrictHttpResponse<Evento[]>) => r)
  );
}


apiEventFiltrarPost.PATH = '/api/Event/filtrar';
