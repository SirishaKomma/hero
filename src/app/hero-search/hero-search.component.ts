import { Component, OnInit } from '@angular/core';
import{debounceTime,distinctUntilChanged,switchMap} from 'rxjs/operators';
import{Hero} from '../hero';
import{Observable,Subject} from 'rxjs';
import{HeroService} from '../hero.service';
@Component({
  selector: 'app-hero-search',
  templateUrl: './hero-search.component.html',
  styleUrls: ['./hero-search.component.css']
})
export class HeroSearchComponent implements OnInit {
heroes$:Observable<Hero[]>;
searchTerm=new Subject<string>()
  constructor(private heroService:HeroService) { }

  ngOnInit() {
    this.heroes$=this.searchTerm.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      switchMap((term:string)=>this.heroService.searchHeroes(term))

    ) 
  }
search(term){
 this.searchTerm.next(term);
}
}
