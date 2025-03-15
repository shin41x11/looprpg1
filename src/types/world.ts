export type WorldBase = {
  world: {
    name: string;
    description: string;
    era: string;
    mainTheme: string;
    prophecy: string;
    cosmology: Cosmology;
    history: History;
    geography: Geography;
    culture: Culture;
  };
  locations: {
    towns: Town[];
    dungeons: Dungeon[];
    landmarks: Landmark[];
  };
  keyItems: KeyItem[];
  characters: {
    allies: Ally[];
    enemies: {
      boss: Boss;
      regular: string[];
    };
  };
  quests: {
    main: MainQuest;
    side: SideQuest[];
  };
  gameRules: GameRules;
};

export type Town = {
  name: string;
  type: 'castle_town' | 'remote_town' | 'village';
  description: string;
  features: string[];
  importance: 'starting_point' | 'key_location' | 'story_location';
};

export type Dungeon = {
  name: string;
  type: 'cave' | 'tower' | 'castle';
  description: string;
  difficulty: 'easy' | 'medium' | 'hard' | 'very_hard';
  requiredItems: string[];
};

export type Landmark = {
  name: string;
  type: 'volcano' | 'forest' | 'spring';
  description: string;
};

export type KeyItem = {
  name: string;
  type: 'weapon' | 'armor' | 'key_item';
  description: string;
  location: string;
};

export type Ally = {
  name: string;
  role: string;
  description: string;
};

export type Boss = {
  name: string;
  title: string;
  description: string;
  location: string;
  minions: string[];
};

export type MainQuest = {
  title: string;
  description: string;
  steps: string[];
};

export type SideQuest = {
  title: string;
  description: string;
  location: string;
};

export type GameRules = {
  levelCap: number;
  startingItems: string[];
  currency: string;
  savePoints: string[];
  transportMethods: string[];
  magicTypes: string[];
  statusEffects: string[];
};

export type DivineBeing = {
  name: string;
  title?: string;
  domain: string;
  description?: string;
};

export type StarGod = {
  name: string;
  domain: string;
};

export type Artifact = {
  name: string;
  count?: number;
  description: string;
  status: string;
};

export type Cosmology = {
  creation: string;
  divineBeings: [
    DivineBeing,
    {
      name: string;
      members: StarGod[];
    }
  ];
  artifacts: Artifact[];
};

export type HistoricalAge = {
  name: string;
  description: string;
};

export type MajorEvent = {
  name: string;
  description: string;
  impact?: string;
  outcome?: string;
};

export type History = {
  ages: HistoricalAge[];
  majorEvents: MajorEvent[];
};

export type Continent = {
  name: string;
  description: string;
  climate: string;
  features: string[];
};

export type Ocean = {
  name: string;
  description: string;
  features: string[];
};

export type SpecialLocation = {
  name: string;
  description: string;
  access?: string;
  status?: string;
};

export type Geography = {
  continents: Continent[];
  oceans: Ocean[];
  specialLocations: SpecialLocation[];
};

export type Season = {
  name: string;
  features: string;
};

export type Calendar = {
  system: string;
  description: string;
  seasons: Season[];
};

export type Religion = {
  name: string;
  description: string;
  practices: string[];
  status: string;
};

export type Language = {
  name: string;
  description: string;
  status: string;
};

export type Culture = {
  calendar: Calendar;
  religions: Religion[];
  languages: Language[];
}; 