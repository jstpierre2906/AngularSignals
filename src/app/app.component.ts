import {
  Component,
  computed,
  Signal,
  signal,
  WritableSignal,
} from '@angular/core';

const heroNames = ['Batman', 'Robin'] as const;
type HeroName = (typeof heroNames)[number];
type Hero = { name: HeroName; currentlyFightsVillain: boolean };

const villainNames = ['Joker', 'Penguin', 'Catwoman'] as const;
type VillainName = (typeof villainNames)[number];
type VillainDescription = 'evil' | 'most evil' | 'dangerous';
type Villain = {
  name: VillainName;
  currentlyFightsHero: boolean;
  description: VillainDescription;
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
  robinAndCatwoman: Signal<string>;

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
    this.robinAndCatwoman = computed(() => {
      if (
        this.activeHero().name === 'Robin' &&
        this.activeVillain().name === 'Catwoman'
      ) {
        return '(Whoa! Did you see how Robin looks at Catwoman!?)';
      }
      return '';
    });
  }

  get heroNames(): string[] {
    return this.heroes.map((h) => h.name);
  }

  get villainNames(): string[] {
    return this.villains.map((v) => v.name);
  }

  heroBtnDisabled(heroName: string): boolean {
    if (!this.heroNames.find((n) => n === heroName)) {
      return false;
    }
    return !!this.heroes.find(
      (h) => h.name === heroName && h.currentlyFightsVillain
    );
  }

  villainBtnDisabled(villainName: string): boolean {
    if (!this.villainNames.find((v) => v === villainName)) {
      return false;
    }
    return !!this.villains.find(
      (v) => v.name === villainName && v.currentlyFightsHero
    );
  }

  setHero(heroName: string) {
    if (!this.heroNames.find((n) => n === heroName)) {
      return;
    }
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
    if (!this.villainNames.find((n) => n === villainName)) {
      return;
    }
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
