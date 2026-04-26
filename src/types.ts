export interface Resources {
  stones: number;
  qi: number;
  prestige: number;
  herbs: number;
  ore: number;
}

export interface Buildings {
  mainHall: number;
  mine: number;
  cave: number;
  alchemyLab: number;
  herbGarden: number;
}

export interface Inventory {
  breakthroughPills: number;
}

export type FormationType = 'Клинок прорыва' | 'Черепаха' | 'Круговая оборона' | 'Волчья стая' | 'Лотос';
export type Rarity = 'Обычный' | 'Редкий' | 'Эпический' | 'Легендарный';
export type Role = 'Воин' | 'Маг' | 'Атакующий' | 'Танк' | 'Поддержка' | 'Ассасин';
export type Element = 'Огонь' | 'Вода' | 'Дерево' | 'Металл' | 'Земля';

export const CULTIVATION_STAGES = [
  'Плавка Ци',
  'Фундамент',
  'Золотая Пилюля',
  'Младенец-Душа',
  'Трансформация Духа',
];

export interface Disciple {
  id: string;
  name: string;
  rarity: Rarity;
  role: Role;
  element: Element;
  level: number;
  exp?: number;
  power: number;
  loyalty: number;
  cultivationStage: number; // index in CULTIVATION_STAGES
}

export interface GameState {
  resources: Resources;
  buildings: Buildings;
  inventory: Inventory;
  disciples: Disciple[];
  team: string[];
  formation: FormationType;
  lastUpdate: number;
}
