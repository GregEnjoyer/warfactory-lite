// Load classes
const $RecipeLogic = Java.loadClass('com.gregtechceu.gtceu.api.machine.trait.RecipeLogic')
const $List = Java.loadClass('java.util.List')
const $Vector3f = Java.loadClass('org.joml.Vector3f')

// =====================================================
// RECIPE TYPE REGISTRATION
// =====================================================

// Ammo Press recipe type — 6 item input slots (was 4). GTCEu simple machines
// take their slot count from the recipe type, so every ammo press (steam + all
// electric tiers) exposes 6 inputs; the extra headroom is what lets the heavier
// recipes (e.g. Infantry Munitions 3 heavy/sniper ammo: casing + steel + copper
// + gunpowder + circuit = 5 slots) fit. Higher-voltage presses are the ones with
// the EU to actually run those bigger loads.
GTCEuStartupEvents.registry('gtceu:recipe_type', event => {
    event.create('ammo_press')
    .category('ammo_press')
    .setEUIO('in')
    .setMaxIOSize(6, 2, 0, 0)
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



