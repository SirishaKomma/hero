import { Injectable } from '@angular/core';
import { HEROES } from './mock-heroes';
import { Hero } from './hero';
import { Observable, of } from 'rxjs';
import { MessagesService } from './messages.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { httpClientInMemBackendServiceFactory } from 'angular-in-memory-web-api';
import { catchError, map, tap } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'Application/json' })
};
export class HeroService {
  private heroesUrl = 'api/heroes';

  constructor(private messageService: MessagesService, private http: HttpClient) { }
  private log(message) {
    this.messageService.add('heroService:${message}');
  }
  getHeroes(): Observable<Hero[]> {
    this.messageService.add('heroService:Fetched all heroes');
    // return of(HEROES);
    return this.http.get<Hero[]>(this.heroesUrl).pipe(tap(_ => this.log('fetched heroes')),
      catchError(this.handleError('getHeroes', [])));
  }
  getHeroNo404(id: number): Observable<Hero> {
    const url = `${this.heroesUrl}/?id=${id}`;
    return this.http.get(url).pipe(map(result => result[0]),
      tap(r => {
        const outCome = r ? 'fetched' : 'not fetched';
        this.log(`${outCome} hero id=${id}`);
      }),
      catchError(
        this.handleError<Hero>(`getHero id=${id}`)
      )
    );
  }
  getHero(id): Observable<Hero> {
    const url = `${this.heroesUrl}/${id}`;
    return this.http.get<Hero>(url).pipe(tap(_ => {
      this.log(`getHero id=${id}`);
    }),
      catchError(this.handleError<Hero>(`GetHero id=${id}`))
    );
  }
  searchHeroes(term): Observable<Hero[]> {
    const url = `${this.heroesUrl}/?name=${term}`;
    if (!term) {
      return of([]);
    }
    return this.http.get<Hero[]>(url).pipe(
      tap(_ => { this.log(`found heroes matching term ${term}`) }),
      catchError(this.handleError<Hero[]>(`searchHeroes `, []))
    );
  }

  addHero(hero) {
    return this.http.post<Hero>(this.heroesUrl, hero, httpOptions).pipe(
      tap(h => this.log(`added hero with id=${h.id}`)),
      catchError(this.handleError<Hero>(`AddHero`))
    );
  }
  updateHero(hero): Observable<any> {
    return this.http.put<Hero>(this.heroesUrl, hero, httpOptions).pipe(
      tap(_ => this.log(`updated hero with id=${hero.id}`)),
      catchError(this.handleError<any>('updateHero'))
    );
  }
  deleteHero(hero: Hero | number): Observable<Hero> {
    const id = typeof hero === 'number' ? hero : hero.id;
    const url = `this.heroesUrl/${id}`;
    return this.http.delete<Hero>(this.heroesUrl, httpOptions).pipe(
      tap(_ => this.log(`deleteHero with id=${id}`)),
      catchError(this.handleError<Hero>('deleteHero'))
    );
  }
  handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      this.log('${operation} failed : ${error.message}');
      return of(result as T);
    };
  }

}
