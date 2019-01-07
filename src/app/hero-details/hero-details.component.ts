import { Component, OnInit, Input } from '@angular/core';
import { Hero } from '../hero';
import { ActivatedRoute } from '@angular/router';
import { HeroService } from '../hero.service';
import{Location} from '@angular/common';
@Component({
  selector: 'app-hero-details',
  templateUrl: './hero-details.component.html',
  styleUrls: ['./hero-details.component.css']
})
export class HeroDetailsComponent implements OnInit {
  hero: Hero;
  constructor(private route: ActivatedRoute, private heroService: HeroService,private location :Location) { }

  ngOnInit() {
    this.getHero();
  }
  getHero() {
    const id = this.route.snapshot.paramMap.get('id')
    this.heroService.getHero(id).subscribe((hero: Hero) => {
      this.hero = hero;
    })
  }
  goBack(){
    this.location.back();
  }
  updateHero(hero){
    this.heroService.updateHero(hero).subscribe(()=>{
      this.goBack();
    })
  }
}
