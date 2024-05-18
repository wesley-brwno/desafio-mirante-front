import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Cidade } from '@domain/cidade';
import { Observable, catchError, from, map } from 'rxjs';
    
@Injectable()
export class ProjetoService {

    API_URL: string = "http://localhost:8080/mirante/cidades";

    constructor(private http: HttpClient) {}

    //------------------------------------------------
    /** Recupera a lista de cidades */
    //------------------------------------------------
    pesquisarCidades(): Observable<Cidade[]> {
        return this.http.get<Cidade[]>(this.API_URL).pipe(
            map(response => {                
                return response;
            }),
            catchError((error: HttpErrorResponse) => {
                throw new Error(error.message);
            })
        )
    }

    //------------------------------------------------
    /** Exclui a cidade informada */
    //------------------------------------------------
    excluir(cidade: Cidade): Observable<any> {        
        return this.http.delete(`${this.API_URL}/${cidade.id}`).pipe(
            catchError((error: HttpErrorResponse) => {
                throw new Error(error.message);
            })
        )
    }

    //------------------------------------------------
    /** Salva a cidade informada */
    //------------------------------------------------    
    salvar(cidade: Cidade): Observable<any> {
        if(cidade.id) {
            return this.http.put<Cidade>(this.API_URL, cidade).pipe(
                map(response => response),
                catchError((error: HttpErrorResponse) => {
                    throw new Error(error.message);
                })
            )
        } else {
            return this.http.post<Cidade>(this.API_URL, cidade).pipe(
                map(response => response),
                catchError((error: HttpErrorResponse) => {
                    throw new Error(error.message);
                })
            )
        }
    }

};