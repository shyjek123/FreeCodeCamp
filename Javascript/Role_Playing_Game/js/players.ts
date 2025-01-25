export class Player {
  health: number;
  xp: number;
  gold: number;
  inventory: string[];
  damage: number;

  constructor(health: number, xp: number, gold: number, damage: number) {
    this.health = health;
    this.xp = xp;
    this.gold = gold;
    this.inventory = ["stick"];
    this.damage = damage;
  }
}
