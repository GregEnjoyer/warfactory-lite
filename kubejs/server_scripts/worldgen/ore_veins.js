const WorldGenLayers = Java.loadClass("com.gregtechceu.gtceu.api.data.worldgen.WorldGenLayers");

const VEINS = {
  banded_iron_vein:   { layer: WorldGenLayers.STONE,     height: null },
  beryllium_vein:     { layer: WorldGenLayers.STONE,     height: null },
  manganese_vein:     { layer: WorldGenLayers.STONE,     height: null },
  molybdenum_vein:    { layer: WorldGenLayers.STONE,     height: null },
  monazite_vein:      { layer: WorldGenLayers.STONE,     height: null },
  redstone_vein:      { layer: WorldGenLayers.STONE,     height: null },

  sulfur_vein:        { layer: WorldGenLayers.STONE,     height: [10, 45] },
  nether_quartz_vein: { layer: WorldGenLayers.STONE,     height: [20, 55] },
  saltpeter_vein:     { layer: WorldGenLayers.STONE,     height: [25, 60] },

  certus_quartz:      { layer: WorldGenLayers.DEEPSLATE, height: [-60, -8] },
  topaz_vein:         { layer: WorldGenLayers.DEEPSLATE, height: [-60, -8] },
  tetrahedrite_vein:  { layer: WorldGenLayers.DEEPSLATE, height: [-60, -8], retargetGenerator: true },
};

GTCEuServerEvents.oreVeins((event) => {
  Object.keys(VEINS).forEach((name) => {
    const cfg = VEINS[name];
    event.modify(`gtceu:${name}`, (vein) => {
      vein.layer(cfg.layer);
      vein.dimensions("minecraft:overworld");
      vein.biomes("#minecraft:is_overworld");
      if (cfg.height) {
        vein.heightRangeUniform(cfg.height[0], cfg.height[1]);
        if (cfg.retargetGenerator) {
          vein.veinGenerator().minYLevel(cfg.height[0]).maxYLevel(cfg.height[1]);
        }
      }
    });
  });
});
