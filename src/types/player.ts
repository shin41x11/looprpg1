export interface PlayerStats {
  hp: number;
  maxHp: number;
  mp: number;
  maxMp: number;
  level: number;
  attack: number;
  defense: number;
  speed: number;
}

export interface PlayerInventory {
  items: string[];
  equipment: {
    weapon?: string;
    armor?: string;
    accessory?: string;
  };
  gold: number;
}

export interface PlayerPosition {
  x: number;
  y: number;
  areaId: string;
}

export interface PlayerState {
  stats: PlayerStats;
  inventory: Item[];
  position: PlayerPosition;
  completedQuests: string[];
  visitedLocations: string[];
}

export interface Item {
  id: string;
  name: string;
  description: string;
  type: string;
  value: number;
} 