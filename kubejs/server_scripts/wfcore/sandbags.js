// Sandbags crafting recipe.
//
// wfcore:sandbags ships without a survival recipe. Craft it from 4 Polyvinyl Chloride Foil (the bag
// sacking) around a block of sand. Shapeless — the four foils + one sand block in any layout.
ServerEvents.recipes(event => {
    event.shapeless('wfcore:sandbags', [
        '4x gtceu:polyvinyl_chloride_foil',
        'minecraft:sand'
    ])

    // Same materials, automatable in the GTCEu Assembler (LV).
    event.recipes.gtceu.assembler('wfcore:sandbags')
        .itemInputs('4x gtceu:polyvinyl_chloride_foil', 'minecraft:sand')
        .itemOutputs('wfcore:sandbags')
        .duration(100)
        .EUt(16) // LV
})
