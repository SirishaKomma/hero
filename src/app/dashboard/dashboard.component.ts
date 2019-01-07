import { Component, OnInit } from '@angular/core';
import { HeroService } from '../hero.service';
import { Hero } from '../hero';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  heroes: Hero[];
  constructor(private heroService: HeroService) { }

  ngOnInit() {
    this.getHeroes();
  }
  remove(hero){
    this.heroes=this.heroes.filter(h=>h.id!==hero.id);
    this.heroService.deleteHero(hero.id).subscribe()
  }
  getHeroes() {
    this.heroService.getHeroes().subscribe((heroes: Hero[]) => {
      this.heroes = heroes.slice(1, 5);
    });
  }
}
