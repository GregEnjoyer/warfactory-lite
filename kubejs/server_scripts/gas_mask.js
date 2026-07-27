// TACZ Tactical Breaching gas mask + basic filter, built in the GregTech Assembler.
//
// The gas mask ties into wfcore's gas-protection system (a working mask blocks wfballistics gas — see
// WFBallisticsGasMaskMixin). It comes prepackaged with a Basic filter: the mod stores an installed filter
// as NBT (GasMaskItem.installFilter writes GasMaskFilter = the filter type's id and GasMaskFilterDurability
// = its max durability), so a Basic filter at full charge is {GasMaskFilter:"basic",GasMaskFilterDurability:6000}.
ServerEvents.recipes(event => {
    // Gas mask: 10 rubber plates (any rubber via the forge tag) + 2 glass lenses + 2 GT Gas Mask Filters,
    // output prepackaged with a full Basic filter.
    event.recipes.gtceu.assembler('kubejs:tacz_gas_mask')
        .itemInputs('10x #forge:plates/rubber', '2x gtceu:glass_lens', '2x gtceu:mask_filter')
        .itemOutputs(Item.of('tacz_tactical_breaching:gas_mask',
            '{GasMaskFilter:"basic",GasMaskFilterDurability:6000}'))
        .duration(300)
        .EUt(30) // LV

    // Basic filter: 4 polyvinyl foil (sacking) + 3 activated carbon dust (the sorbent).
    event.recipes.gtceu.assembler('kubejs:tacz_basic_filter')
        .itemInputs('4x gtceu:polyvinyl_chloride_foil', '3x gtceu:activated_carbon_dust')
        .itemOutputs('tacz_tactical_breaching:basic_filter')
        .duration(200)
        .EUt(30) // LV
})
