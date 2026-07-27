// Brimm armor -> GT crafting chains (LV -> EV).
//
// Brimm's own Workbench block is uncraftable in this pack (see misc/armor.js), so these GT
// recipes are the ONLY way to obtain the armor. Two stages per piece:
//   1. Bending Machine: GT metal plates -> a tiered kubejs:ballistic_panel_* core.
//   2. Assembler:       panels + soft-armor polymer (+ optics/circuit, + the tier below for
//                       HV/EV upgrades) -> the finished brimm:* item.
//
// Tier gating is by recipe voltage (canonical GT VA values): LV 30, MV 120, HV 480, EV 1920.
// Rescaled armor stats for each tier live in config/brimm/overrides/*.xml.
ServerEvents.recipes(event => {

    // ---------- Stage 1: ballistic panel cores (Bending Machine) ----------
    const panel = (id, plate, plateCount, panelId, dur, eut) =>
        event.recipes.gtceu.bender(id)
            .itemInputs(Item.of(plate, plateCount))
            .itemOutputs(Item.of(panelId, 1))
            .duration(dur).EUt(eut)

    panel('brimm_panel_lv', 'gtceu:steel_plate',          3, 'kubejs:ballistic_panel_lv', 200, 30)
    panel('brimm_panel_mv', 'gtceu:aluminium_plate',      3, 'kubejs:ballistic_panel_mv', 300, 120)
    panel('brimm_panel_hv', 'gtceu:titanium_plate',       3, 'kubejs:ballistic_panel_hv', 400, 480)
    panel('brimm_panel_ev', 'gtceu:tungsten_steel_plate', 3, 'kubejs:ballistic_panel_ev', 500, 1920)

    // ---------- Stage 2: final assembly (Assembler) ----------
    const asm = (id, inputs, out, circuit, dur, eut) => {
        const r = event.recipes.gtceu.assembler(id)
            .itemInputs(inputs)
            .itemOutputs(Item.of(out, 1))
        if (circuit) r.circuit(circuit)
        return r.duration(dur).EUt(eut)
    }

    // LV (EUt 30) — entry helmets
    asm('brimm_mk_ii_h', [
        Item.of('kubejs:ballistic_panel_lv', 2),
        Item.of('gtceu:rubber_plate', 2),
        Item.of('minecraft:leather', 2),
    ], 'brimm:mk_ii_h', 1, 300, 30)

    asm('brimm_tshfour_green_h', [
        Item.of('kubejs:ballistic_panel_lv', 2),
        Item.of('gtceu:silicone_rubber_plate', 2),
        Item.of('minecraft:green_dye', 2),
    ], 'brimm:tshfour_green_h', 2, 300, 30)

    // MV (EUt 120) — first real combat kit
    asm('brimm_ratnik_h', [
        Item.of('kubejs:ballistic_panel_mv', 3),
        Item.of('gtceu:polyethylene_plate', 2),
        Item.of('gtceu:good_electronic_circuit', 1),
    ], 'brimm:ratnik_h', 1, 400, 120)

    asm('brimm_nato_h', [
        Item.of('kubejs:ballistic_panel_mv', 3),
        Item.of('gtceu:polyethylene_plate', 2),
        Item.of('gtceu:good_electronic_circuit', 1),
        Item.of('minecraft:blue_dye', 1),
    ], 'brimm:nato_h', 2, 400, 120)

    asm('brimm_ratnik_advance', [
        Item.of('kubejs:ballistic_panel_mv', 5),
        Item.of('gtceu:polyethylene_plate', 3),
        Item.of('gtceu:steel_plate', 2),
    ], 'brimm:ratnik_advance', 3, 450, 120)

    // HV (EUt 480) — upgrades from the MV pieces
    asm('brimm_nato_ii', [
        Item.of('brimm:ratnik_advance', 1),
        Item.of('kubejs:ballistic_panel_hv', 4),
        Item.of('gtceu:polytetrafluoroethylene_plate', 3),
    ], 'brimm:nato_ii', 1, 500, 480)

    asm('brimm_veteran_h', [
        Item.of('brimm:nato_h', 1),
        Item.of('kubejs:ballistic_panel_hv', 3),
        Item.of('gtceu:advanced_integrated_circuit', 1),
    ], 'brimm:veteran_h', 2, 500, 480)

    // EV (EUt 1920) — top of the ladder
    asm('brimm_veteran', [
        Item.of('brimm:nato_ii', 1),
        Item.of('kubejs:ballistic_panel_ev', 4),
        Item.of('gtceu:carbon_fiber_plate', 2),
        Item.of('gtceu:advanced_integrated_circuit', 1),
    ], 'brimm:veteran', 1, 600, 1920)
})
