// Radar (multiblock controller) assembly recipe.
//
// wfcore:radar is the Radar controller block. Like the Bolt Gun (see bolt_gun.js), WFCore ships it
// without a survival recipe, so it's added here. Built in an EV-tier Assembler — the Radar runs on
// EV power and is gated behind EV circuitry.
ServerEvents.recipes(event => {
    event.recipes.gtceu.assembler('wfcore:radar')
        .itemInputs(
            '16x #gtceu:circuits/ev',      // 16 EV circuits
            '8x gtceu:hv_sensor',          // 8 HV sensors
            'gtceu:hv_machine_casing',     // HV casing
            '6x gtceu:diamond_lens',       // 6 diamond lenses
            '32x gtceu:ram_chip',          // 32 RAM chips
            'wfcore:cooling_fan_cover_hv'  // HV fan (HV Cooling Fan Cover)
        )
        .itemOutputs('wfcore:radar')
        .duration(600)
        .EUt(1920) // EV (GTValues.VA[EV])
})
