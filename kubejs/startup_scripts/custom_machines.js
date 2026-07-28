// Load classes
const $RecipeLogic = Java.loadClass('com.gregtechceu.gtceu.api.machine.trait.RecipeLogic')
const $List = Java.loadClass('java.util.List')
const $Vector3f = Java.loadClass('org.joml.Vector3f')

// =====================================================
// RECIPE TYPE REGISTRATION
// =====================================================

// Ammo Press recipe type
GTCEuStartupEvents.registry('gtceu:recipe_type', event => {
    event.create('ammo_press')
    .category('ammo_press')
    .setEUIO('in')
    .setMaxIOSize(4, 2, 0, 0)
    .setSlotOverlay(false, false, GuiTextures.COMPRESSOR_OVERLAY)
    .setProgressBar(GuiTextures.PROGRESS_BAR_ARROW, FillDirection.LEFT_TO_RIGHT)
    .setSound(GTSoundEntries.COMPRESSOR) // reuse the compressor's running sound
})

// Ammo Factory recipe type
GTCEuStartupEvents.registry('gtceu:recipe_type', event => {
    event.create('ammo_factory')
    .category('ammo_factory')
    .setEUIO('in')
    .setMaxIOSize(4, 2, 1, 0)
    .setSlotOverlay(false, false, GuiTextures.COMPRESSOR_OVERLAY)
    .setProgressBar(GuiTextures.PROGRESS_BAR_ARROW, FillDirection.LEFT_TO_RIGHT)
    .setSound(GTSoundEntries.FORGE_HAMMER)
})

// Rocket Factory recipe type
GTCEuStartupEvents.registry('gtceu:recipe_type', event => {
    event.create('rocket_factory')
    .category('rocket_factory')
    .setEUIO('in')
    .setMaxIOSize(4, 2, 2, 0)
    .setSlotOverlay(false, false, GuiTextures.COMPRESSOR_OVERLAY)
    .setProgressBar(GuiTextures.PROGRESS_BAR_ARROW, FillDirection.LEFT_TO_RIGHT)
    .setSound(GTSoundEntries.FORGE_HAMMER)
})

// Vehicle Factory recipe type
GTCEuStartupEvents.registry('gtceu:recipe_type', event => {
    event.create('vehicle_factory')
    .category('vehicle_factory')
    .setEUIO('in')
    .setMaxIOSize(5, 1, 2, 0)
    .setSlotOverlay(false, false, GuiTextures.COMPRESSOR_OVERLAY)
    .setProgressBar(GuiTextures.PROGRESS_BAR_ARROW, FillDirection.LEFT_TO_RIGHT)
    .setSound(GTSoundEntries.FORGE_HAMMER)
})

// =====================================================
// SIMPLE MACHINE REGISTRATION
// =====================================================

// Electric Ammo Press (single block machine)
GTCEuStartupEvents.registry('gtceu:machine', event => {
    event.create('electric_ammo_press', 'simple')
    .tiers(
        GTValues.ULV, GTValues.LV, GTValues.MV, GTValues.HV,
        GTValues.EV, GTValues.IV, GTValues.LuV, GTValues.ZPM,
        GTValues.UV, GTValues.UHV, GTValues.UEV, GTValues.UIV, GTValues.UXV
    )
    .definition((tier, builder) => builder
    .langValue(GTValues.VLVH[tier] + " Ammo Press")
    .recipeType('ammo_press')
    .workableTieredHullModel('gtceu:block/machines/compressor') // reuse the compressor face
    )
})
GTCEuStartupEvents.registry('gtceu:machine', event => {
    event.create('steam_ammo_press', 'steam')
    .hasHighPressure(true)
    .definition((isHighPressure, builder) => builder
    .recipeType('ammo_press')
    .workableTieredHullModel('gtceu:block/machines/compressor') // reuse the compressor face
    )
})



GTCEuStartupEvents.registry('gtceu:machine', event => {
    event.create('new_multiblock', 'multiblock')
    .rotationState(RotationState.NON_Y_AXIS)
    .recipeTypes('new_process')
    .pattern(definition => FactoryBlockPattern.start()
    .aisle("CCCCCCC", "BWWWBWB", "ABBBBBA")
    .aisle("CCCCCCC", "BGGGGGB", "BBBBBBB")
    .aisle("CCCCCCC", "BGGGGGB", "BBBBBBB")
    .aisle("CCCCCCC", "BCCCCKB", "ABBBBBA")
    .where('C', Predicates.blocks('gtceu:bronze_machine_casing'))
    .where('B', Predicates.blocks('gtceu:steam_machine_casing'))
    .where('W', Predicates.blocks('gtceu:steel_frame'))
     .where('G', Predicates.blocks('gtceu:steel_gearbox'))
    .where('A', Predicates.air())
    .where('K', Predicates.controller(Predicates.blocks(definition.get())))

    .build())
});
