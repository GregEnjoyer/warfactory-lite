// Alloy / special-material production recipes.
ServerEvents.recipes(event => {

    // advanced aircraft metal — hydrogen/oxygen bath (was HV.js)
    event.recipes.gtceu.chemical_reactor('kubejs:advanced_aircraft_metal')
        .inputFluids('gtceu:oxygen 3000')
        .inputFluids('gtceu:hydrogen 3000')
        .outputFluids('gtceu:advanced_aircraft_metal 2000')
        .duration(200)
        .EUt(256)

    // gun metal (was Parts/gunrParts.js)
    event.recipes.gtceu.chemical_reactor('kubejs:gunmetal')
        .itemInputs(Item.of('gtceu:carbon_fiber_mesh'), Item.of('gtceu:fine_borosilicate_glass_wire'))
        .inputFluids(Fluid.of('gtceu:polytetrafluoroethylene', 1000))
        .itemOutputs(Item.of('gtceu:gun_metal_ingot'))
        .duration(200)
        .EUt(480)
})
