GTCEuStartupEvents.registry("gtceu:material", (event) => {
    event
    .create("fluix")
    .dust()
    .components("1x nether_quartz", "1x certus_quartz", "1x redstone")
    .color(0x8f5ccb)
    .iconSet(GTMaterialIconSet.DULL)
    .flags(GTMaterialFlags.GENERATE_PLATE, GTMaterialFlags.GENERATE_GEAR);
});

// White phosphorus — its own dust (.dust() also gives the small/tiny "piles").
// Produced by centrifuging phosphorus (see server_scripts/chemicals.js) and used
// for white-phosphorus / incendiary crafting. Startup -> needs a full restart.
GTCEuStartupEvents.registry("gtceu:material", (event) => {
    event
    .create("white_phosphorus")
    .dust()
    .color(0xF2EFD0) // TODO final color
    .iconSet(GTMaterialIconSet.DULL);
});
