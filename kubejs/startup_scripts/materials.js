// ============================================================================
// materials.js — CENTRAL hub for GregTech material CREATION and SHAPE mods.
//
// Single home for the pack's generic custom materials (alloys, misc dusts,
// generic fluids) AND for modifying the shapes/forms of *stock* GTCEu materials
// (giving a material the pack didn't create a new plate/frame/etc. form). If
// you're adding a new material, or giving an existing one a new form, do it HERE.
//
// Merged from the old material.js + partMaker/New_materials.js + partMaker/fluids.js.
//
// Two domain-specific material sets keep their own files by design — they are
// self-contained processing chains, NOT duplicated here:
//   - Medical chain (poppy / blood / morphine / …):  partMaker/medical_materials.js
//   - Chem-weapon gases + fuels (mustard_gas / phosgene / kerosene / napalm /
//     jet_fuel):                                     wf_chem_fluids.js
//
// All startup scripts -> a change here needs a FULL Minecraft restart (NOT /reload).
// ============================================================================


// ============================================================================
// 1. MATERIAL CREATION
// ============================================================================

// ---- Alloys / structural metals ------------------------------------------
GTCEuStartupEvents.registry('gtceu:material', event => {
    event.create('gun_metal')
        .ingot()
        .liquid()
        .components('1x steel', '1x carbon')
        .color(0x0F0F0F).iconSet(GTMaterialIconSet.DULL)
        .flags(GTMaterialFlags.GENERATE_PLATE, GTMaterialFlags.GENERATE_GEAR, GTMaterialFlags.GENERATE_SMALL_GEAR, GTMaterialFlags.GENERATE_ROD,  GTMaterialFlags.GENERATE_LONG_ROD, GTMaterialFlags.GENERATE_SPRING_SMALL, GTMaterialFlags.GENERATE_SPRING )
})

GTCEuStartupEvents.registry('gtceu:material', event => {
    event.create('aircraft_grade_metal')
        .ingot()
        .liquid()
        .components('1x steel', '1x aluminum')
        .blastTemp(1776, "low", GTValues.VA[GTValues.LV], 1600)
        .color(0x68DEDB).iconSet(GTMaterialIconSet.DULL)
        .flags(GTMaterialFlags.GENERATE_PLATE, GTMaterialFlags.GENERATE_GEAR, GTMaterialFlags.GENERATE_SMALL_GEAR, GTMaterialFlags.GENERATE_ROD)
})

GTCEuStartupEvents.registry('gtceu:material', event => {
    event.create('tank_grade_metal')
        .ingot()
        .liquid()
        .components('1x steel', '1x cobalt')
        .color(0x3F3F3F).iconSet(GTMaterialIconSet.DULL)
        .flags(GTMaterialFlags.GENERATE_PLATE, GTMaterialFlags.GENERATE_GEAR, GTMaterialFlags.GENERATE_SMALL_GEAR, GTMaterialFlags.GENERATE_ROD)
})

GTCEuStartupEvents.registry('gtceu:material', event => {
    event.create('tung_tung_tungsten')
        .ingot()
        .liquid()
        .components('3x tungsten')
        .color(0x7D683C).iconSet(GTMaterialIconSet.DULL)
        .flags(GTMaterialFlags.GENERATE_PLATE, GTMaterialFlags.GENERATE_GEAR, GTMaterialFlags.GENERATE_SMALL_GEAR, GTMaterialFlags.GENERATE_ROD)
})

GTCEuStartupEvents.registry('gtceu:material', event => {
    event.create('vehicle_metal')
        .ingot()
        .liquid()
        .components('1x steel', '1x red_alloy')
        .color(0x4d3939).iconSet(GTMaterialIconSet.DULL)
        .flags(GTMaterialFlags.GENERATE_PLATE, GTMaterialFlags.GENERATE_GEAR, GTMaterialFlags.GENERATE_SMALL_GEAR, GTMaterialFlags.GENERATE_ROD,  GTMaterialFlags.GENERATE_LONG_ROD, GTMaterialFlags.GENERATE_SPRING_SMALL, GTMaterialFlags.GENERATE_SPRING )
})

GTCEuStartupEvents.registry('gtceu:material', event => {
    event.create('advanced_aircraft_metal')
    .ingot()
    .liquid()
    .components('1x aluminium', '1x stainless_steel')
    .color(0x7ff5e9).iconSet(GTMaterialIconSet.DULL)
    .flags(GTMaterialFlags.GENERATE_PLATE, GTMaterialFlags.GENERATE_GEAR, GTMaterialFlags.GENERATE_SMALL_GEAR, GTMaterialFlags.GENERATE_ROD,  GTMaterialFlags.GENERATE_LONG_ROD, GTMaterialFlags.GENERATE_SPRING_SMALL, GTMaterialFlags.GENERATE_SPRING )
})

// Heavy Duty Fabric — a synthetic textile "woven" from polyethylene, standing in for leather.
// A polymer material so GT autogen makes the sheet (`gtceu:heavy_duty_fabric_plate`) — the polymer
// property is what qualifies a material for the plate prefix (same as stock Polyethylene, whose
// plate exists); GENERATE_PLATE is belt-and-suspenders so the sheet registers regardless. It has no
// GT recipe of its own, so it's produced explicitly in server_scripts/misc/backpacks.js.
GTCEuStartupEvents.registry('gtceu:material', event => {
    event.create('heavy_duty_fabric')
        .polymer()
        .color(0x2E2E32).iconSet(GTMaterialIconSet.DULL)
        .flags(GTMaterialFlags.GENERATE_PLATE)
})

// ---- Misc dusts & special materials --------------------------------------
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
// for white-phosphorus / incendiary crafting.
GTCEuStartupEvents.registry("gtceu:material", (event) => {
    event
    .create("white_phosphorus")
    .dust()
    .color(0xF2EFD0)
    .iconSet(GTMaterialIconSet.DULL);
});

// RDX (cyclonite) — high-performance military explosive; off-white crystalline dust.
// Used in thermobaric, heavy bunker buster, and tunneller missiles.
// Produced via large_chemical_reactor nitration (see server_scripts/wfcore/missiles.js).
GTCEuStartupEvents.registry("gtceu:material", (event) => {
    event
    .create("rdx")
    .dust()
    .color(0xF0EDE5)
    .iconSet(GTMaterialIconSet.DULL);
});

// ---- Generic fluids -------------------------------------------------------
GTCEuStartupEvents.registry('gtceu:material', event => {
    event.create('early_rocket_fuel')
        .liquid()
        .color(0xE3DE96)
        .iconSet(GTMaterialIconSet.DULL)
})


// ============================================================================
// 2. STOCK MATERIAL SHAPE MODIFICATIONS
//    Add forms/flags to materials GTCEu already ships. These run in the
//    dedicated materialModification phase (after stock materials exist, before
//    their items/recipes are generated), so both the new prefix item and its
//    autogenerated recipe register correctly.
// ============================================================================
GTCEuStartupEvents.materialModification(event => {
    // Vanadium Steel — add the frame form (gtceu:vanadium_steel_frame) so it can
    // serve as a missile airframe (see server_scripts/wfcore/missiles.js cluster
    // family). VanadiumSteel already carries GENERATE_ROD (via EXT2_METAL), so the
    // frame's autogen craft recipe (rods -> frame) comes along for free.
    GTMaterials.VanadiumSteel.addFlags(GTMaterialFlags.GENERATE_FRAME)
    GTMaterials.Lead.addFlags(GTMaterialFlags.GENERATE_ROUND)
})
