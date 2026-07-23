// 1. DATA DECLARATIONS (Must be at the top)
const RECIPES = [
  { name: "Simple Salad", category: "Salad", ingredients: "1x Leaf + 1x Any Ingredient", effect: "Neutral", buff: "Leafage Upgrade" },
  { name: "Leppa Salad", category: "Salad", ingredients: "1x Leaf + 1x Leppa Berry", effect: "Sweet", buff: "Leafage Upgrade" },
  { name: "Simple Bread", category: "Bread", ingredients: "1x Wheat + 2x Any Ingredient", effect: "Neutral", buff: "Cut Upgrade" },
  { name: "Simple Hamburger Steak", category: "Steak", ingredients: "1x Bean + 3x Any Ingredient", effect: "Neutral", buff: "Rock Smash Upgrade" },
  { name: "Simple Soup", category: "Soup", ingredients: "1x Fresh Water + 2x Any Ingredient", effect: "Neutral", buff: "Water Gun Upgrade" }
];

// Fallback configs by type
const HABITAT_CONFIGS = {
  "Grass": { habitatName: "Tree-Shaded Tall Grass", blocks: "Large Tree x1, Tall Grass x4", envStyle: "Bright", roommates: "Ivysaur, Oddish, Bellsprout" },
  "Fire": { habitatName: "Campsite", blocks: "Campfire (Lit) x1, Straw Table x1, Stool x1", envStyle: "Warm", roommates: "Charmeleon, Magby, Torchic" },
  "Water": { habitatName: "Hydrated Tall Grass", blocks: "Tall Grass x4, Water x2", envStyle: "Humid", roommates: "Wartortle, Slowpoke, Lotad" },
  "Electric": { habitatName: "Picnic Set / Generator", blocks: "Seat x2, Table x1, Picnic Basket x1", envStyle: "Bright", roommates: "Raichu, Mareep, Pawmi" },
  "Normal": { habitatName: "Pretty Flower Bed", blocks: "Wildflowers x4", envStyle: "Bright", roommates: "Eevee, Snorlax, Pidgey" },
  "Ghost/Dark": { habitatName: "Grave Offering", blocks: "Gravestone x1, Slender Candle x2", envStyle: "Dark", roommates: "Gastly, Haunter, Litwick" },
  "Fighting/Rock": { habitatName: "Boulder-Shaded Tall Grass", blocks: "Tall Grass x4, Boulder x1", envStyle: "Cool", roommates: "Machop, Timburr, Onix" },
  "Flying/Bug": { habitatName: "Elevated Tall Grass", blocks: "Tall Grass x4, High Elevation Block x1", envStyle: "Cool", roommates: "Pidgeotto, Scyther, Noctowl" }
};

// Base Roster
const BASE_ROSTER = [
  { num: 1, name: "Bulbasaur", region: "Withered Wastelands", type: "Grass", habitatName: "Bench with Greenery", blocks: "Hedge x2, Seat x1", envStyle: "Bright", idealRoommates: "Ivysaur, Venusaur, Oddish" },
  { num: 2, name: "Ivysaur", region: "Withered Wastelands", type: "Grass", habitatName: "Field of Flowers", blocks: "Wildflowers x8", envStyle: "Bright", idealRoommates: "Bulbasaur, Venusaur, Bellossom" },
  { num: 3, name: "Venusaur", region: "Withered Wastelands", type: "Grass", habitatName: "Garden Terrace", blocks: "Hedge x4, Wildflowers x8", envStyle: "Bright", idealRoommates: "Ivysaur, Vileplume, Tangrowth" },
  { num: 4, name: "Charmander", region: "Rocky Ridges", type: "Fire", habitatName: "Tall Grass", blocks: "Tall Grass x4", envStyle: "Warm", idealRoommates: "Charmeleon, Gulpin, Magby" },
  { num: 5, name: "Charmeleon", region: "Rocky Ridges", type: "Fire", habitatName: "Campsite", blocks: "Campfire x1, Straw Table x1", envStyle: "Warm", idealRoommates: "Charmander, Charizard, Torchic" },
  { num: 6, name: "Charizard", region: "Rocky Ridges", type: "Fire", habitatName: "Berry-Feast Campsite", blocks: "Campfire x3, Berry Tree x1", envStyle: "Warm", idealRoommates: "Blaziken, Scorbunny, Arcanine" },
  { num: 7, name: "Squirtle", region: "Bleak Beach", type: "Water", habitatName: "Hydrated Tall Grass", blocks: "Tall Grass x4, Water x2", envStyle: "Humid", idealRoommates: "Wartortle, Blastoise, Cramorant" },
  { num: 8, name: "Wartortle", region: "Bleak Beach", type: "Water", habitatName: "Hydrated Tall Grass", blocks: "Tall Grass x4, Water x2", envStyle: "Humid", idealRoommates: "Squirtle, Psyduck, Slowpoke" },
  { num: 9, name: "Blastoise", region: "Bleak Beach", type: "Water", habitatName: "Floating In The Shade", blocks: "Aquatic Habitat, Water x4", envStyle: "Humid", idealRoommates: "Gyarados, Lapras, Slowking" },
  { num: 25, name: "Pikachu", region: "Sparkling Skylands", type: "Electric", habitatName: "Picnic Set", blocks: "Seat x2, Table x1, Picnic Basket x1", envStyle: "Bright", idealRoommates: "Pichu, Eevee, Pawmi" },
  { num: 131, name: "Lapras", region: "Bleak Beach", type: "Water", habitatName: "Seaside Reef", blocks: "Ocean Water x4, Coral Rock x1", envStyle: "Humid", idealRoommates: "Slowpoke, Gyarados, Dewgong" }
];

// Generates full 300 list
function buildFullList() {
  const full = [...BASE_ROSTER];
  const existing = new Set(full.map(p => p.num));

  for (let i = 1; i <= 300; i++) {
    if (!existing.has(i)) {
      const types = ["Grass", "Fire", "Water", "Electric", "Normal", "Ghost/Dark", "Fighting/Rock", "Flying/Bug"];
      const t = types[i % types.length];
      const cfg = HABITAT_CONFIGS[t];

      full.push({
        id: `p${i}`,
        num: i,
        name: `Pokémon #${i}`,
        region: i % 2 === 0 ? "Withered Wastelands" : "Bleak Beach",
        habitatName: cfg.habitatName,
        blocks: cfg.blocks,
        envStyle: cfg.envStyle,
        idealRoommates: cfg.roommates
      });
    } else {
      const item = full.find(p => p.num === i);
      item.id = item.id || `p${i}`;
    }
  }
  return full.sort((a, b) => a.num - b.num);
}

const POKEMON = buildFullList();

// Saved list initialization
let caughtList = [];
try {
  caughtList = JSON.parse(localStorage.getItem("pokopia_caught")) || [];
} catch (e) {
  caughtList = [];
}

// 2. RENDER FUNCTIONS
function saveCaughtList() {
  localStorage.setItem("pokopia_caught", JSON.stringify(caughtList));
  updateStats();
}

function updateStats() {
  const total = POKEMON.length;
  const count = caughtList.length;
  const percent = total > 0 ? Math.round((count / total) * 100) : 0;
  
  const statsEl = document.getElementById("tracker-stats");
  if (statsEl) {
    statsEl.innerHTML = `<strong>Collection Progress:</strong> ${count} / ${total} Befriended (${percent}%)`;
  }
}

function renderApp() {
  const habitatDiv = document.getElementById("habitat");
  const cookingDiv = document.getElementById("cooking");
  const trackerDiv = document.getElementById("tracker");

  // HABITATS TAB
  if (habitatDiv) {
    habitatDiv.innerHTML = POKEMON.map(p => {
      const roommates = p.idealRoommates || p.roommates || p.roommate || p.bestRoommates || 'None listed';
      return `
        <div class="card item-card">
          <div class="card-info">
            <h3>#${p.num || '?'} ${p.name || 'Unknown'} <span class="tag">${p.region || 'Unknown Region'}</span></h3>
            <p><strong>Habitat Name:</strong> ${p.habitatName || 'N/A'}</p>
            <p><strong>Build Requirements:</strong> ${p.blocks || 'N/A'}</p>
            <p><strong>Env. Style:</strong> <span class="buff-tag">${p.envStyle || 'Normal'}</span></p>
            <p><strong>Ideal Roommates:</strong> ${roommates}</p>
          </div>
        </div>
      `;
    }).join("");
  }

  // RECIPES TAB
  if (cookingDiv) {
    cookingDiv.innerHTML = RECIPES.map(r => `
      <div class="card item-card">
        <div class="card-info">
          <h3>${r.name} <span class="tag">${r.category}</span><span class="buff-tag">${r.buff}</span></h3>
          <p><strong>Ingredients:</strong> ${r.ingredients}</p>
          <p><strong>Flavor:</strong> ${r.effect}</p>
        </div>
      </div>
    `).join("");
  }

  // CHECKLIST TAB
  if (trackerDiv) {
    trackerDiv.innerHTML = `
      <div id="tracker-stats" style="background: #0f172a; padding: 12px; border-radius: 8px; border: 1px solid #334155; margin-bottom: 15px; text-align: center; color: #f59e0b;"></div>
      <div id="tracker-list">
        ${POKEMON.map(p => {
          const pokemonId = p.id || `p${p.num}`;
          const isCaught = caughtList.includes(pokemonId);
          const roommates = p.idealRoommates || p.roommates || p.roommate || p.bestRoommates || 'None listed';

          return `
            <div class="card item-card">
              <div class="card-info">
                <h3>#${p.num || '?'} ${p.name || 'Unknown'}</h3>
                <p><strong>Region:</strong> ${p.region || 'N/A'}</p>
                <p><strong>Roommates:</strong> ${roommates}</p>
              </div>
              <button class="check-btn ${isCaught ? 'done' : ''}" data-id="${pokemonId}">
                ${isCaught ? '✓ Befriended' : 'Mark Befriended'}
              </button>
            </div>
          `;
        }).join("")}
      </div>
    `;
  }

  updateStats();
}

function switchTab(tabId, targetBtn) {
  document.querySelectorAll(".tab-content").forEach(e => e.classList.remove("active"));
  document.querySelectorAll(".tab-btn").forEach(e => e.classList.remove("active"));
  
  const selectedTab = document.getElementById(tabId);
  if (selectedTab) selectedTab.classList.add("active");
  if (targetBtn) targetBtn.classList.add("active");
}

// 3. LISTENERS
document.addEventListener("click", (e) => {
  if (e.target.id === "btn-habitat") switchTab("habitat", e.target);
  if (e.target.id === "btn-cooking") switchTab("cooking", e.target);
  if (e.target.id === "btn-tracker") switchTab("tracker", e.target);

  if (e.target.classList.contains("check-btn")) {
    const id = e.target.getAttribute("data-id");
    if (caughtList.includes(id)) {
      caughtList = caughtList.filter(item => item !== id);
      e.target.classList.remove("done");
      e.target.textContent = "Mark Befriended";
    } else {
      caughtList.push(id);
      e.target.classList.add("done");
      e.target.textContent = "✓ Befriended";
    }
    saveCaughtList();
  }
});

// Search Filter
const searchInput = document.getElementById("searchInput");
if (searchInput) {
  searchInput.addEventListener("keyup", (e) => {
    const query = e.target.value.toLowerCase();
    document.querySelectorAll(".item-card").forEach(card => {
      card.style.display = card.innerText.toLowerCase().includes(query) ? "flex" : "none";
    });
  });
}

// Initial Run
renderApp();