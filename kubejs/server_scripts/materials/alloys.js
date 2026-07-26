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

    // netherrack
    event.recipes.gtceu.chemical_reactor('minecraft:netherrack')
        .itemInputs(Item.of('minecraft:sand'))
        .inputFluids(Fluid.of('minecraft:lava', 1000))
        .itemOutputs(Item.of('minecraft:netherrack'))
        .duration(80)
        .EUt(128)

    // nether air
    event.recipes.wfcore.gas_extractor('gtceu:nether_air')
        .itemInputs(Item.of('minecraft:netherrack'))
        .inputFluids(Fluid.of('gtceu:air', 20000))
        .outputFluids(Fluid.of('gtceu:nether_air', 20000))
        .duration(160)
        .EUt(480)

    // ender air
    event.recipes.wfcore.gas_extractor('gtceu:ender_air')
        .itemInputs(Item.of('minecraft:ender_pearl'))
        .inputFluids(Fluid.of('gtceu:air', 20000))
        .outputFluids(Fluid.of('gtceu:ender_air', 20000))
        .duration(80)
        .EUt(480)

    // black steel — water-cooled hot black steel (replaces the two default GTCEu cool-down recipes)
    event.recipes.gtceu.chemical_bath('kubejs:cooling_black_steel')
        .itemInputs(Item.of('gtceu:hot_black_steel_ingot'))
        .inputFluids(Fluid.of('minecraft:water', 100))
        .itemOutputs(Item.of('gtceu:black_steel_ingot'))
        .duration(200)
        .EUt(32)

    event.remove({ id: 'gtceu:chemical_bath/black_steel_cool_down'})
    event.remove({ id: 'gtceu:chemical_bath/black_steel_cool_down_distilled_water'})
})
