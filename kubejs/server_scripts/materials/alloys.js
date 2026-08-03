// Alloy / special-material production recipes.
ServerEvents.recipes(event => {

    // NOTE: the old advanced_aircraft_metal + gunmetal recipes were removed — the
    // `balance` commit (eddfc5d) dropped their materials (gtceu:advanced_aircraft_metal,
    // gtceu:gun_metal) from startup and nothing consumed either, so the recipes were
    // orphaned. advanced_aircraft_metal was throwing "Invalid or empty output fluid".

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
