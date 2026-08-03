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
    event.recipes.gtceu.bender('brimm_panel_lv')
        .itemInputs(Item.of('gtceu:steel_plate', 3))
        .itemOutputs(Item.of('kubejs:ballistic_panel_lv', 1))
        .duration(200).EUt(30)

    event.recipes.gtceu.bender('brimm_panel_mv')
        .itemInputs(Item.of('gtceu:aluminium_plate', 3))
        .itemOutputs(Item.of('kubejs:ballistic_panel_mv', 1))
        .duration(300).EUt(120)

    event.recipes.gtceu.bender('brimm_panel_hv')
        .itemInputs(Item.of('gtceu:titanium_plate', 3))
        .itemOutputs(Item.of('kubejs:ballistic_panel_hv', 1))
        .duration(400).EUt(480)

    event.recipes.gtceu.bender('brimm_panel_ev')
        .itemInputs(Item.of('gtceu:tungsten_steel_plate', 3))
        .itemOutputs(Item.of('kubejs:ballistic_panel_ev', 1))
        .duration(500).EUt(1920)

    // ---------- Stage 2: final assembly (Assembler) ----------

    // LV (EUt 30) — entry helmets
    event.recipes.gtceu.assembler('brimm_mk_ii_h')
        .itemInputs([
            Item.of('kubejs:ballistic_panel_lv', 2),
            Item.of('gtceu:rubber_plate', 2),
            Item.of('minecraft:leather', 2),
        ])
        .itemOutputs(Item.of('brimm:mk_ii_h', 1))
        .circuit(1)
        .duration(300).EUt(30)

    event.recipes.gtceu.assembler('brimm_tshfour_green_h')
        .itemInputs([
            Item.of('kubejs:ballistic_panel_lv', 2),
            Item.of('gtceu:silicone_rubber_plate', 2),
            Item.of('minecraft:green_dye', 2),
        ])
        .itemOutputs(Item.of('brimm:tshfour_green_h', 1))
        .circuit(2)
        .duration(300).EUt(30)

    // MV (EUt 120) — first real combat kit
    event.recipes.gtceu.assembler('brimm_ratnik_h')
        .itemInputs([
            Item.of('kubejs:ballistic_panel_mv', 3),
            Item.of('gtceu:polyethylene_plate', 2),
            '#gtceu:circuits/mv',
        ])
        .itemOutputs(Item.of('brimm:ratnik_h', 1))
        .circuit(1)
        .duration(400).EUt(120)

    event.recipes.gtceu.assembler('brimm_nato_h')
        .itemInputs([
            Item.of('kubejs:ballistic_panel_mv', 3),
            Item.of('gtceu:polyethylene_plate', 2),
            '#gtceu:circuits/mv',
            Item.of('minecraft:blue_dye', 1),
        ])
        .itemOutputs(Item.of('brimm:nato_h', 1))
        .circuit(2)
        .duration(400).EUt(120)

    event.recipes.gtceu.assembler('brimm_ratnik_advance')
        .itemInputs([
            Item.of('kubejs:ballistic_panel_mv', 5),
            Item.of('gtceu:polyethylene_plate', 3),
            Item.of('gtceu:steel_plate', 2),
        ])
        .itemOutputs(Item.of('brimm:ratnik_advance', 1))
        .circuit(3)
        .duration(450).EUt(120)

    // HV (EUt 480) — upgrades from the MV pieces
    event.recipes.gtceu.assembler('brimm_nato_ii')
        .itemInputs([
            Item.of('brimm:ratnik_advance', 1),
            Item.of('kubejs:ballistic_panel_hv', 4),
            Item.of('gtceu:polytetrafluoroethylene_plate', 3),
        ])
        .itemOutputs(Item.of('brimm:nato_ii', 1))
        .circuit(1)
        .duration(500).EUt(480)

    event.recipes.gtceu.assembler('brimm_veteran_h')
        .itemInputs([
            Item.of('brimm:nato_h', 1),
            Item.of('kubejs:ballistic_panel_hv', 3),
            '#gtceu:circuits/hv',
        ])
        .itemOutputs(Item.of('brimm:veteran_h', 1))
        .circuit(2)
        .duration(500).EUt(480)

    // EV (EUt 1920) — top of the ladder
    event.recipes.gtceu.assembler('brimm_veteran')
        .itemInputs([
            Item.of('brimm:nato_ii', 1),
            Item.of('kubejs:ballistic_panel_ev', 4),
            Item.of('gtceu:carbon_fiber_plate', 2),
            '#gtceu:circuits/hv',
        ])
        .itemOutputs(Item.of('brimm:veteran', 1))
        .circuit(1)
        .duration(600).EUt(1920)
})
