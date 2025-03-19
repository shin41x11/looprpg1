export interface MapSize {
  width: number;
  height: number;
}

export interface TileType {
  name: string;
  walkable: boolean;
  encounterRate: number;
  enemies: string[];
}

export interface Position {
  x: number;
  y: number;
}

export interface Size {
  width: number;
  height: number;
}

export interface Location {
  id: string;
  name: string;
  type: 'town' | 'dungeon' | 'landmark';
  position: Position;
  connections: string[];
  requirements?: string[];
  features?: string[];
}

export interface Area {
  name: string;
  description: string;
  npcs: NPC[];
  shops: Shop[];
  quests: Quest[];
}

export interface Quest {
  id: string;
  title: string;
  description: string;
  objectives: QuestObjective[];
  rewards: QuestReward[];
}

export interface QuestObjective {
  type: string;
  target: string;
  amount: number;
  current: number;
}

export interface QuestReward {
  type: string;
  amount: number;
  item?: string;
}

export interface Progression {
  initial_accessible: string[];
  requirements: {
    [key: string]: string[];
  };
}

export interface Quests {
  main: Quest[];
  side: Quest[];
}

export interface WorldMap {
  width: number;
  height: number;
  tiles: string[][];
  areas: {
    [key: string]: Area;
  };
}

export interface NPC {
  id: string;
  name: string;
  dialogue: string[];
}

export interface Shop {
  id: string;
  name: string;
  items: ShopItem[];
}

export interface ShopItem {
  id: string;
  name: string;
  price: number;
  description: string;
} 