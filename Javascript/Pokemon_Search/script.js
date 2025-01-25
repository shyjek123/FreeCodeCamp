var pokemonUrl = "https://pokeapi-proxy.freecodecamp.rocks/api/pokemon/";
const pokemonInput = document.getElementById("search-input");
const searchBtn = document.getElementById("search-button");
const pokeContainer = document.getElementById("pokemon-data");
const pokeImg = document.getElementById("poke-img");
const nameTag = document.getElementById("pokemon-name");
const idTag = document.getElementById("pokemon-id");
const weightTag = document.getElementById("weight");
const heightTag = document.getElementById("height");
const typesTag = document.getElementById("types");
const hpTag = document.getElementById("hp");
const attackTag = document.getElementById("attack");
const defenseTag = document.getElementById("defense");
const spAttackTag = document.getElementById("special-attack");
const spDefenseTag = document.getElementById("special-defense");
const speedTag = document.getElementById("speed");

const updateUI = (data) => {
  const { name, id, weight, height, types, sprites } = data;
  const sprite = sprites.front_default;
  const stats = data.stats.map((stat) => stat.base_stat);
  nameTag.innerHTML = `<p>${name.toUpperCase()}</p>`;
  idTag.innerHTML = `<p>#${id}</p>`;
  weightTag.innerHTML = `<td>${weight}</td>`;
  heightTag.innerHTML = `<td>${height}</td>`;
  typesTag.innerHTML = types
    .map(
      (type) =>
        `<p class="type ${type.type.name}">${type.type.name.toUpperCase()}</p>`,
    )
    .join(" ");
  hpTag.innerHTML = `${stats[0]}`;
  attackTag.innerHTML = `${stats[1]}`;
  defenseTag.innerHTML = `${stats[2]}`;
  spAttackTag.innerHTML = `${stats[3]}`;
  spAttackTag.innerHTML = `${stats[4]}`;
  speed.innerHTML = `${stats[5]}`;
  pokeImg.innerHTML = `<img id="sprite" src=${sprite} />`;
};

const cleanInput = (str) =>
  str
    .replace(/[^a-zA-Z0-9.\s_♀♂]/g, "")
    .replace(/[.\s_]/g, "-")
    .replace(/[♀]/, "-f")
    .replace(/[♂]/, "-m")
    .toLowerCase();

const getPokeData = async (id) => {
  try {
    const res = await fetch(pokemonUrl + id);
    const data = await res.json();
    updateUI(data);
  } catch (err) {
    alert("Pokémon not found");
    console.log(err);
    resetPage();
    return;
  }
};

const resetPage = () => {};

searchBtn.addEventListener("click", () => {
  const cleanedId = cleanInput(pokemonInput.value);
  getPokeData(cleanedId);
});
