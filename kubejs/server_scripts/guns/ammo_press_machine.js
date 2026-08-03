// Build recipes for the Ammo Press machine — registered in
// startup_scripts/custom_machines.js as a tiered `simple` electric machine plus
// a steam variant, both of which ship without a survival recipe (like the pack's
// other KJS-added machines). Machine item ids are gtceu:<tier>_electric_ammo_press
// and gtceu:lp_steam_ammo_press / gtceu:hp_steam_ammo_press.
ServerEvents.recipes(event => {
    const g = event.recipes.gtceu

    // --- Electric Ammo Press (LV -> EV) --------------------------------------
    // Tier's machine casing + an electric piston (the press ram) + circuits + plate.
    g.assembler('kubejs:ammo_press_lv')
        .itemInputs(
            'gtceu:lv_machine_casing',
            'gtceu:lv_electric_piston',
            '2x #gtceu:circuits/lv',
            '4x gtceu:steel_plate')
        .itemOutputs('gtceu:lv_electric_ammo_press')
        .duration(200).EUt(32)

    g.assembler('kubejs:ammo_press_mv')
        .itemInputs(
            'gtceu:mv_machine_casing',
            'gtceu:mv_electric_piston',
            '2x #gtceu:circuits/mv',
            '4x gtceu:steel_plate')
        .itemOutputs('gtceu:mv_electric_ammo_press')
        .duration(200).EUt(120)

    g.assembler('kubejs:ammo_press_hv')
        .itemInputs(
            'gtceu:hv_machine_casing',
            'gtceu:hv_electric_piston',
            '2x #gtceu:circuits/hv',
            '4x gtceu:steel_plate')
        .itemOutputs('gtceu:hv_electric_ammo_press')
        .duration(200).EUt(480)

    g.assembler('kubejs:ammo_press_ev')
        .itemInputs(
            'gtceu:ev_machine_casing',
            'gtceu:ev_electric_piston',
            '2x #gtceu:circuits/ev',
            '4x gtceu:steel_plate')
        .itemOutputs('gtceu:ev_electric_ammo_press')
        .duration(200).EUt(1920)
    // (luv..uxv tiers also exist — add here if ever needed.)

    // --- Low-Pressure Steam Ammo Press (steam age) — hand-crafted -------------
    event.shaped('gtceu:lp_steam_ammo_press', [
        'PPP',
        'PCP',
        'PGP'
    ], {
        P: 'gtceu:bronze_plate',
        C: 'gtceu:bronze_machine_casing',
        G: 'gtceu:steel_gearbox'
    })

    // --- High-Pressure Steam Ammo Press (steam age, HP upgrade) — hand-crafted -
    // Mirrors the LP recipe with HP-tier (steel) components: solid steel casing +
    // steel plates. Was registered in custom_machines.js but shipped without a recipe.
    event.shaped('gtceu:hp_steam_ammo_press', [
        'PPP',
        'PCP',
        'PGP'
    ], {
        P: 'gtceu:steel_plate',
        C: 'gtceu:steel_machine_casing',
        G: 'gtceu:steel_gearbox'
    })
})
