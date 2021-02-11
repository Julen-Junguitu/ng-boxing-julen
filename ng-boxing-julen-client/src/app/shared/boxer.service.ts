import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable, of, throwError } from 'rxjs';
import { catchError, tap, map } from 'rxjs/operators';

import { Boxer } from './boxer';

@Injectable({
  providedIn: 'root'
})
export class BoxerService {
  private boxersUrl = 'localhost:8000/boxers';

  constructor(private http: HttpClient) { }

  getBoxers(): Observable<Boxer[]> {
    return this.http.get<Boxer[]>(this.boxersUrl)
      .pipe(
        tap(data => console.log(JSON.stringify(data))),
        catchError(this.handleError)
      );
  }

  getMaxBoxerId(): Observable<Boxer> {
    return this.http.get<Boxer[]>(this.boxersUrl)
    .pipe(
      // Get max value from an array
      map(data => Math.max.apply(Math, data.map(function(o) { return o.id; }))   ),
      catchError(this.handleError)
    );
  }

  getBoxerById(id: number): Observable<Boxer> {
    const url = `${this.boxersUrl}/${id}`;
    return this.http.get<Boxer>(url)
      .pipe(
        tap(data => console.log('getBoxer: ' + JSON.stringify(data))),
        catchError(this.handleError)
      );
  }

  createBoxer(boxer: Boxer): Observable<Boxer> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    boxer.id = null;
    return this.http.post<Boxer>(this.boxersUrl, boxer, { headers: headers })
      .pipe(
        tap(data => console.log('createBoxer: ' + JSON.stringify(data))),
        catchError(this.handleError)
      );
  }

  deleteBoxer(id: number): Observable<{}> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    const url = `${this.boxersUrl}/${id}`;
    return this.http.delete<Boxer>(url, { headers: headers })
      .pipe(
        tap(data => console.log('deleteBoxer: ' + id)),
        catchError(this.handleError)
      );
  }

  updateBoxer(boxer: Boxer): Observable<Boxer> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    const url = `${this.boxersUrl}/${boxer.id}`;
    return this.http.put<Boxer>(url, boxer, { headers: headers })
      .pipe(
        tap(() => console.log('updateBoxer: ' + boxer.id)),
        // Return the boxer on an update
        map(() => boxer),
        catchError(this.handleError)
      );
  }

  private handleError(err) {
    // in a real world app, we may send the server to some remote logging infrastructure
    // instead of just logging it to the console
    let errorMessage: string;
    if (err.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      errorMessage = `An error occurred: ${err.error.message}`;
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      errorMessage = `Backend returned code ${err.status}: ${err.body.error}`;
    }
    console.error(err);
    return throwError(errorMessage);
  }

}
