import {
  Component,
  computed,
  Signal,
  signal,
  WritableSignal,
} from '@angular/core';

type HeroName = 'Batman' | 'Robin';
type VillainName = 'Joker' | 'Penguin' | 'Catwoman';
type Hero = { name: HeroName; currentlyFightsVillain: boolean };
type Villain = {
  name: VillainName;
  currentlyFightsHero: boolean;
  description: 'evil' | 'most evil' | 'dangerous';
};

@Component({
  selector: 'app-root',
  styleUrl: 'app.component.css',
  templateUrl: 'app.component.html',
})
export class AppComponent {
  private readonly heroes: Hero[] = [
    { name: 'Batman', currentlyFightsVillain: true },
    { name: 'Robin', currentlyFightsVillain: false },
  ];
  private readonly villains: Villain[] = [
    { name: 'Joker', currentlyFightsHero: true, description: 'evil' },
    { name: 'Penguin', currentlyFightsHero: false, description: 'most evil' },
    { name: 'Catwoman', currentlyFightsHero: false, description: 'dangerous' },
  ];
  activeHero: WritableSignal<Hero>;
  activeVillain: WritableSignal<Villain>;
  actionDesc: Signal<string>;

  constructor() {
    this.activeHero = signal(
      this.heroes
        .filter((h) => h.currentlyFightsVillain)
        .reduce((acc, curr) => (acc = curr), {} as Hero)
    );
    this.activeVillain = signal(
      this.villains
        .filter((v) => v.currentlyFightsHero)
        .reduce((acc, curr) => (acc = curr), {} as Villain)
    );
    this.actionDesc = computed(
      () =>
        `${this.activeHero().name} fights ${this.activeVillain().description} ${
          this.activeVillain().name
        }`
    );
  }

  get heroNames(): string[] {
    return this.heroes.map((v) => v.name);
  }

  get villainNames(): string[] {
    return this.villains.map((v) => v.name);
  }

  setHero(heroName: string) {
    const activeHero: Hero = this.heroes
      .map((h) => {
        h.currentlyFightsVillain = false;
        return h;
      })
      .filter((h) => h.name === heroName)
      .map((h) => {
        h.currentlyFightsVillain = true;
        return h;
      })
      .reduce((acc, curr) => (acc = curr), {} as Hero);
    this.activeHero.set(activeHero);
  }

  setVillain(villainName: string) {
    const activeVillain: Villain = this.villains
      .map((v) => {
        v.currentlyFightsHero = false;
        return v;
      })
      .filter((v) => v.name === villainName)
      .map((v) => {
        v.currentlyFightsHero = true;
        return v;
      })
      .reduce((acc, curr) => (acc = curr), {} as Villain);
    this.activeVillain.set(activeVillain);
  }
}
