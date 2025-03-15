import { WorldBase } from '../types/world';

export class WorldGenerator {
  private baseWorld: WorldBase;
  private seed: string;

  constructor(baseWorld: WorldBase, seed: string) {
    this.baseWorld = baseWorld;
    this.seed = seed;
  }

  /**
   * シード値から一貫した乱数を生成
   */
  private generateRandomNumber(index: number): number {
    const seedNum = this.seed.split('').reduce((acc, char, i) => acc + char.charCodeAt(0) * (i + 1), 0);
    return (seedNum * (index + 1)) % 100 / 100;
  }

  /**
   * 配列からランダムに要素を選択
   */
  private pickRandom<T>(array: T[], index: number): T {
    const randomIndex = Math.floor(this.generateRandomNumber(index) * array.length);
    return array[randomIndex];
  }

  /**
   * 文字列テンプレートの変数を置換
   */
  private replaceTemplateVariables(text: string, variables: Record<string, string>): string {
    return text.replace(/\{\{(\w+)\}\}/g, (match, key) => variables[key] || match);
  }

  /**
   * 世界の基本情報を生成
   */
  generateWorldInfo(): Partial<WorldBase['world']> {
    const variations = {
      era: ['古代', '中世', '戦乱'],
      theme: ['復讐', '冒険', '救済']
    };

    return {
      name: this.baseWorld.world.name,
      description: this.replaceTemplateVariables(this.baseWorld.world.description, {
        era: this.pickRandom(variations.era, 0),
        theme: this.pickRandom(variations.theme, 1)
      }),
      mainTheme: this.baseWorld.world.mainTheme
    };
  }

  /**
   * ダンジョンの配置を生成
   */
  generateDungeonPlacements(): Array<{ name: string; coordinates: { x: number; y: number } }> {
    return this.baseWorld.locations.dungeons.map((dungeon, index) => ({
      name: dungeon.name,
      coordinates: {
        x: Math.floor(this.generateRandomNumber(index * 2) * 100),
        y: Math.floor(this.generateRandomNumber(index * 2 + 1) * 100)
      }
    }));
  }

  /**
   * クエストの順序を生成
   */
  generateQuestSequence(): string[] {
    const mainSteps = [...this.baseWorld.quests.main.steps];
    const sideQuests = this.baseWorld.quests.side.map(quest => quest.title);
    
    // メインクエストの各ステップの間にサイドクエストをランダムに配置
    const sequence: string[] = [];
    mainSteps.forEach((step, index) => {
      sequence.push(step);
      if (index < mainSteps.length - 1 && sideQuests.length > 0) {
        const randomSideQuest = this.pickRandom(sideQuests, index);
        sequence.push(randomSideQuest);
      }
    });

    return sequence;
  }

  /**
   * 敵の出現パターンを生成
   */
  generateEnemyEncounters(area: string): string[] {
    const regularEnemies = this.baseWorld.characters.enemies.regular;
    const areaIndex = this.baseWorld.locations.dungeons.findIndex(d => d.name === area);
    
    // エリアごとに出現する敵を決定
    const numEnemies = 3 + Math.floor(this.generateRandomNumber(areaIndex) * 3);
    const encounters: string[] = [];
    
    for (let i = 0; i < numEnemies; i++) {
      encounters.push(this.pickRandom(regularEnemies, areaIndex * 100 + i));
    }

    return encounters;
  }

  /**
   * アイテムの配置を生成
   */
  generateItemPlacements(): Record<string, string> {
    const placements: Record<string, string> = {};
    
    this.baseWorld.keyItems.forEach((item, index) => {
      const locations = [
        ...this.baseWorld.locations.dungeons.map(d => d.name),
        ...this.baseWorld.locations.landmarks.map(l => l.name)
      ];
      
      // 特定のアイテムは固定の場所に配置
      if (item.location) {
        placements[item.name] = item.location;
      } else {
        placements[item.name] = this.pickRandom(locations, index);
      }
    });

    return placements;
  }

  /**
   * 完全な世界データを生成
   */
  generateWorld(): {
    worldInfo: Partial<WorldBase['world']>;
    dungeonPlacements: Array<{ name: string; coordinates: { x: number; y: number } }>;
    questSequence: string[];
    enemyEncounters: Record<string, string[]>;
    itemPlacements: Record<string, string>;
  } {
    const dungeonPlacements = this.generateDungeonPlacements();
    const enemyEncounters: Record<string, string[]> = {};
    
    this.baseWorld.locations.dungeons.forEach(dungeon => {
      enemyEncounters[dungeon.name] = this.generateEnemyEncounters(dungeon.name);
    });

    return {
      worldInfo: this.generateWorldInfo(),
      dungeonPlacements,
      questSequence: this.generateQuestSequence(),
      enemyEncounters,
      itemPlacements: this.generateItemPlacements()
    };
  }
} 