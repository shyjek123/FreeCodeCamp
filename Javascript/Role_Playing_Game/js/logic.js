import { Player } from "./dist/players.js";

var player = new Player(100, 0, 50, 6);
var boss = new Player(300, 0, 0, 100);

const [b1, b2, b3, p, hp, xp, gold, monsterDiv, mName, mHealth] =
  selectElementsByIds([
    "button1",
    "button2",
    "button3",
    "text",
    "healthtext",
    "xptext",
    "goldtext",
    "monsterStats",
    "monsterName",
    "monsterHealth",
  ]);

async function getClickId() {
  return new Promise((resolve) => {
    document.querySelectorAll("#controls button").forEach((button) => {
      button.onclick = function () {
        resolve(this.id);
      };
    });
  });
}

function selectElementsByIds(ids) {
  return ids
    .map((id) => document.getElementById(id))
    .filter((element) => element !== null);
}

async function sellWeapon() {
  player.gold += 15;
  gold.innerText = player.gold;
  const firstWeapon = player.inventory.shift();
  p.innerText =
    "You sold a " +
    firstWeapon +
    ". In your inventory you have: " +
    player.inventory;
}

async function store() {
  b1.innerText = "Buy 10 health (10 gold)";
  b2.innerText = "Buy weapon (30 gold)";
  b3.innerText = "Go to town square";
  p.innerText = "You enter the store.";

  while (true) {
    let divId = await getClickId();
    if (divId === "button1") {
      if (player.gold >= 10) {
        player.health += 10;
        hp.innerText = player.health;
        player.gold -= 10;
        gold.innerText = player.gold;
      } else {
        p.innerText = "You do not have enough gold to buy health.";
      }
      continue;
    } else if (divId === "button2") {
      if (b2.innerText === "Sell weapon for 15 gold") {
        await sellWeapon();
        continue;
      } else {
        if (player.gold >= 30) {
          player.gold -= 30;
          gold.innerText = player.gold;
          if (player.inventory.includes("dagger")) {
            if (player.inventory.includes("claw hammer")) {
              if (player.inventory.includes("sword")) {
                p.innerText = "You already have the most powerful weapon";
                b2.innerText = "Sell weapon for 15 gold";
                continue;
              } else {
                p.innerText =
                  "You now have a sword. In your inventory you have: " +
                  player.inventory;
                player.inventory.push("sword");
                player.damage = 102;
              }
            } else {
              p.innerText =
                "You now have a claw hammer. In your inventory you have: " +
                player.inventory;
              player.inventory.push("claw hammer");
              player.damage = 51;
            }
          } else {
            player.inventory.push("dagger");
            player.damage = 31;
            p.innerText =
              "You now have a dagger. In your inventory you have: " +
              player.inventory;
          }
        } else {
          p.innerText = "You do not have enough gold to buy a weapon.";
        }
      }
    } else if (divId === "button3") {
      break;
    }
  }
}

function start() {
  b1.innerText = "Go to store";
  b2.innerText = "Go to cave";
  b3.innerText = "Fight dragon";
  p.innerText = 'You are in the town square. You see a sign that says "Store".';
}

async function monsterSlayed() {
  p.innerText =
    'The monster screams "Arg!" as it dies. You gain experience points and find gold.';
  b1.innerText = "Go to town square";
  b2.innerText = "Go to town square";
  b3.innerText = "Go to town square";
  monsterDiv.style.display = "none";

  if (mName.innerText === "slime") {
    player.xp += 2;
    xp.innerText = player.xp;
  } else {
    player.xp += 8;
    xp.innerText = player.xp;
  }

  const divId = await getClickId();
  if (divId === "button3") {
    await mystery();
    return;
  } else {
    return;
  }
}

async function fightMonster(name, monster) {
  b1.innerText = "Attack";
  b2.innerText = "Dodge";
  b3.innerText = "Run";
  p.innerText = "You are fighting a monster.";
  monsterDiv.style.display = "block";
  mName.innerText = name;
  mHealth.innerText = monster.health;

  while (true) {
    const divId = await getClickId();
    if (divId === "button1") {
      let weapon = player.inventory.at(-1);
      if (weapon === "stick") {
        monster.health -= 6;
        mHealth.innerText = monster.health;

        player.health -= monster.damage;
        hp.innerText = player.health;
      } else {
        monster.health -= 31;
        mHealth.innerText = monster.health;

        player.health -= monster.damage;
        hp.innerText = player.health;
      }

      if (monster.health <= 0) {
        return true;
      } else if (player.health <= 0) {
        return false;
      }

      p.innerText =
        "The " + name + " attacks. You attack it with your " + weapon + ".";
    } else if (divId === "button2") {
      p.innerText = "You dodge the attack from the " + name;
      continue;
    } else if (divId === "button3") {
      monsterDiv.style.display = "none";
      break;
    }
  }
}

async function cave() {
  b1.innerText = "Fight slime";
  b2.innerText = "Fight fanged beast";
  b3.innerText = "Go to town square";
  p.innerText = "You enter the cave. You see some monsters.";

  let divId = await getClickId();
  if (divId === "button1") {
    const slime = new Player(15, 0, 0, 10);
    if (await fightMonster("slime", slime)) {
      await monsterSlayed();
      return;
    } else {
      return;
    }
  } else if (divId === "button2") {
    const fBeast = new Player(60, 0, 0, 40);
    if (await fightMonster("fanged beast", fBeast)) {
      await monsterSlayed();
      return;
    } else {
      return;
    }
  } else if (divId === "button3") {
    return;
  }
}

async function dragon() {
  await fightMonster("boss", boss);
}

async function mystery() {
  b1.innerText = "2";
  b2.innerText = "8";
  b3.innerText = "Go to town square?";
  p.innerText =
    "You find a secret game. Pick a number above. Ten numbers will be randomly chosen between 0 and 10. If the number you choose matches one of the random numbers, you win!";
  var pickedNum = 0;
  while (player.health > 0) {
    let divId = await getClickId();
    if (divId === "button1") {
      pickedNum = 2;
    } else if (divId === "button2") {
      pickedNum = 8;
    } else if (divId === "button3") {
      break;
    }

    ranNumsGame(10, pickedNum);
  }
}

function ranNumsGame(numOfRanNums, guess) {
  const nums = [];
  for (let i = 0; i < numOfRanNums; i++) {
    const ranNum = Math.floor(Math.random() * (numOfRanNums + 1));
    nums.push(ranNum);
  }

  if (nums.includes(guess)) {
    p.innerText = "You picked " + guess + " Here are the random numbers:\n";
    for (let i = 0; i < numOfRanNums; i++) {
      p.innerText += nums[i] + "\n";
    }
    p.innerText += "Right! You win 20 gold!";
    player.gold += 20;
    gold.innerText = player.gold;
  } else {
    p.innerText = "You picked " + guess + " Here are the random numbers:\n";

    for (let i = 0; i < numOfRanNums; i++) {
      p.innerText += nums[i] + "\n";
    }
    p.innerText += "Wrong! You lose 10 health!";
    player.health -= 10;
    hp.innerText = player.health;
  }
}

async function game() {
  while (player.health > 0) {
    if (boss.health <= 0) {
      return true;
    }

    let divId = await getClickId();
    if (divId === "button1") {
      await store();
    } else if (divId === "button2") {
      await cave();
    } else if (divId === "button3") {
      await dragon();
    }
    start();
  }
  return false;
}

async function win() {
  player = new Player(100, 0, 50, 6);
  hp.innerText = player.health;
  xp.innerText = player.xp;
  gold.innerText = player.gold;

  boss = new Player(300, 0, 0, 100);
  b1.innerText = "REPLAY???";
  b2.innerText = "REPLAY???";
  b3.innerText = "REPLAY???";
  p.innerText = "You WON";
  monsterDiv.style.display = "none";

  await getClickId();
  start();
  main();
}

async function lose() {
  player = new Player(100, 0, 50, 6);
  hp.innerText = player.health;
  xp.innerText = player.xp;
  gold.innerText = player.gold;

  boss = new Player(300, 0, 0, 100);
  b1.innerText = "REPLAY???";
  b2.innerText = "REPLAY???";
  b3.innerText = "REPLAY???";
  p.innerText = "You died";
  monsterDiv.style.display = "none";

  await getClickId();
  start();
  main();
}

async function main() {
  if (await game()) {
    await win();
  } else {
    await lose();
  }
}
main();
