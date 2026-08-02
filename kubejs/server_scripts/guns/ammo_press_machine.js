// Build recipes for the Ammo Press machine — registered in
// startup_scripts/custom_machines.js as a tiered `simple` electric machine plus
// a steam variant, both of which ship without a survival recipe (like the pack's
// other KJS-added machines). Machine item ids are gtceu:<tier>_electric_ammo_press
// and gtceu:lp_steam_ammo_press / gtceu:hp_steam_ammo_press.
ServerEvents.recipes(event => {
    const g = event.recipes.gtceu

    // --- Electric Ammo Press (LV -> EV) --------------------------------------
    // Tier's machine casing + an electric piston (the press ram) + circuits + plate.
    const press = (tier, eut) => g.assembler(`kubejs:ammo_press_${tier}`)
        .itemInputs(
            `gtceu:${tier}_machine_casing`,
            `gtceu:${tier}_electric_piston`,
            `2x #gtceu:circuits/${tier}`,
            '4x gtceu:steel_plate')
        .itemOutputs(`gtceu:${tier}_electric_ammo_press`)
        .duration(200).EUt(eut)

    press('lv', 32)
    press('mv', 120)
    press('hv', 480)
    press('ev', 1920)
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
