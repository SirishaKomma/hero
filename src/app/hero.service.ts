import { Injectable } from '@angular/core';
import { HEROES } from './mock-heroes';
import { Hero } from './hero';
import { Observable, of } from 'rxjs';
import { MessagesService } from './messages.service';
@Injectable({
  providedIn: 'root'
})
export class HeroService {

  constructor(private messageService: MessagesService) { }
  getHeroes(): Observable<Hero[]> {
    this.messageService.add('heroService:Fetched all heroes');
    return of(HEROES);
  }
  getHero(id):Observable<Hero> {
    return of(HEROES.find(hero=>hero.id===id))
  }
}
