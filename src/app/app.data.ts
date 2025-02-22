const heroNames = ['Batman', 'Robin'] as const;
type HeroName = (typeof heroNames)[number];
export type Hero = { name: HeroName; currentlyFightsVillain: boolean };

const villainNames = ['Joker', 'Penguin', 'Catwoman'] as const;
type VillainName = (typeof villainNames)[number];
type VillainDescription = 'evil' | 'most evil' | 'dangerous';
export type Villain = {
  name: VillainName;
  currentlyFightsHero: boolean;
  description: VillainDescription;
};
