// --- Relocate GregTech Nether ore veins into the Overworld (was nether_to_overworld_ores.js) ---
// Move all GregTech Nether ore veins into the Overworld, so the Nether is not
// required for progression, and spread them vertically:
//   - saltpeter and sulfur are placed HIGH (surface / mountains).
//   - topaz, tetrahedrite and certus quartz are placed DEEP (deepslate, near bedrock).
//   - the rest keep their original (nether) Y range in Overworld stone.
//
// GTCEu gates a vein's dimension by BOTH the worldgen `layer` (which medium it replaces
// and which dimension it applies to) AND the `dimensionFilter`. So we retarget both:
// STONE layer for stone-depth veins, DEEPSLATE layer for the deep ones, plus Overworld.
//
// CAVEATS:
//   - Only affects NEWLY generated chunks. GTCEu caches vein placement per world
//     (saves/<world>/data/gtceu_ore_vein_cache.dat), so test in fresh chunks or a new world.
//   - Verify in the EMI/JEI "Ore Veins" tab that each vein shows Overworld + the new height
//     and actually generates. A couple use custom generators; if one comes up empty it may
//     need its internal pattern adjusted.

const WorldGenLayers = Java.loadClass("com.gregtechceu.gtceu.api.data.worldgen.WorldGenLayers");

// vein id -> { layer, height: [minY, maxY] or null to keep the original range }
const VEINS = {
  banded_iron_vein:   { layer: WorldGenLayers.STONE,     height: null },
  beryllium_vein:     { layer: WorldGenLayers.STONE,     height: null },
  manganese_vein:     { layer: WorldGenLayers.STONE,     height: null },
  molybdenum_vein:    { layer: WorldGenLayers.STONE,     height: null },
  monazite_vein:      { layer: WorldGenLayers.STONE,     height: null },
  nether_quartz_vein: { layer: WorldGenLayers.STONE,     height: null },
  redstone_vein:      { layer: WorldGenLayers.STONE,     height: null },

  // HIGH UP (surface / mountains)
  saltpeter_vein:     { layer: WorldGenLayers.STONE,     height: [64, 128] },
  sulfur_vein:        { layer: WorldGenLayers.STONE,     height: [64, 128] },

  // DEEP UNDERGROUND (deepslate, near bedrock)
  certus_quartz:      { layer: WorldGenLayers.DEEPSLATE, height: [-60, -8] },
  tetrahedrite_vein:  { layer: WorldGenLayers.DEEPSLATE, height: [-60, -8] },
  topaz_vein:         { layer: WorldGenLayers.DEEPSLATE, height: [-60, -8] },
};

GTCEuServerEvents.oreVeins((event) => {
  Object.keys(VEINS).forEach((name) => {
    const cfg = VEINS[name];
    event.modify(`gtceu:${name}`, (vein) => {
      vein.layer(cfg.layer); // medium (stone/deepslate) + overworld applicability
      vein.dimensions("minecraft:overworld");
      if (cfg.height) vein.heightRangeUniform(cfg.height[0], cfg.height[1]);
    });
  });
});
