// GT assembler recipes for the WFCore Vehicle Charging Station (wfcore:<tier>_vehicle_charger).
// Charges nearby energy-based SBW vehicles (those NOT under the fluid-fuel override)
// within a 4-block radius at V[tier] * 4A. No research gate — base infrastructure;
// the vehicles and drones that need it are individually gated.

const CHARGER_DURATION = 200

ServerEvents.recipes(event => {
    const g = event.recipes.gtceu

    // LV — 32 EU/t * 4A = 128 EU/t charge budget
    g.assembler('wfcore:lv_vehicle_charger')
        .itemInputs('gtceu:lv_machine_casing', 'gtceu:lv_electric_motor',
            '2x gtceu:lv_sensor', '2x #gtceu:circuits/lv',
            '4x gtceu:red_alloy_single_cable')
        .itemOutputs('wfcore:lv_vehicle_charger')
        .duration(CHARGER_DURATION).EUt(32)

    // MV — 128 EU/t * 4A = 512 EU/t
    g.assembler('wfcore:mv_vehicle_charger')
        .itemInputs('gtceu:mv_machine_casing', 'gtceu:mv_electric_motor',
            '2x gtceu:mv_sensor', '2x #gtceu:circuits/mv',
            '4x gtceu:annealed_copper_single_cable')
        .itemOutputs('wfcore:mv_vehicle_charger')
        .duration(CHARGER_DURATION).EUt(128)

    // HV — 512 EU/t * 4A = 2048 EU/t
    g.assembler('wfcore:hv_vehicle_charger')
        .itemInputs('gtceu:hv_machine_casing', 'gtceu:hv_electric_motor',
            '2x gtceu:hv_sensor', '2x #gtceu:circuits/hv',
            '4x gtceu:electrum_single_cable')
        .itemOutputs('wfcore:hv_vehicle_charger')
        .duration(CHARGER_DURATION).EUt(512)

    // EV — 2048 EU/t * 4A = 8192 EU/t
    g.assembler('wfcore:ev_vehicle_charger')
        .itemInputs('gtceu:ev_machine_casing', 'gtceu:ev_electric_motor',
            '2x gtceu:ev_sensor', '2x #gtceu:circuits/ev',
            '4x gtceu:black_steel_single_cable')
        .itemOutputs('wfcore:ev_vehicle_charger')
        .duration(CHARGER_DURATION).EUt(2048)

    // IV — 8192 EU/t * 4A = 32768 EU/t
    g.assembler('wfcore:iv_vehicle_charger')
        .itemInputs('gtceu:iv_machine_casing', 'gtceu:iv_electric_motor',
            '2x gtceu:iv_sensor', '2x #gtceu:circuits/iv',
            '4x gtceu:platinum_single_cable')
        .itemOutputs('wfcore:iv_vehicle_charger')
        .duration(CHARGER_DURATION).EUt(8192)
})
