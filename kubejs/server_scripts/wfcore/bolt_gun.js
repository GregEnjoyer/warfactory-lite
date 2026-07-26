// HV Bolt Gun recipe.
//
// wfcore:bolt_tool (the "Bolt Gun") is the tool that bolts Coated Beryllium (boltable) casings into
// their BOLTED variant, which the Radar multiblock requires. WFCore ships it with no survival recipe,
// so it is added here at HV tier.
ServerEvents.recipes(event => {
    event.recipes.gtceu.assembler('wfcore:bolt_tool')
        .itemInputs(
            'gtceu:hv_electric_motor',
            '4x gtceu:stainless_steel_plate',
            '2x gtceu:stainless_steel_rod',
            'gtceu:stainless_steel_gear',
            '4x gtceu:stainless_steel_screw'
        )
        .itemOutputs('wfcore:bolt_tool')
        .circuit(1)
        .duration(300)
        .EUt(480) // HV (GTValues.VA[HV])
})
