// Recipes for the two wfcore farming multiblocks: the Greenhouse (LV) and the Mob Farmer (MV).
// The controllers (wfcore:greenhouse / wfcore:mob_farmer) ship with no recipe from the mod, so — like
// the Radar (see radar.js) — their crafting recipes are authored here, alongside the machines' operation
// recipes on the wfcore:greenhouse / wfcore:mob_farmer recipe types.
ServerEvents.recipes(event => {

    // ------------------------------------------------------------------ controllers

    // Greenhouse controller — LV-tier assembly.
    event.recipes.gtceu.assembler('wfcore:greenhouse')
        .itemInputs('4x gtceu:steel_plate', '4x gtceu:tempered_glass', '2x #gtceu:circuits/lv',
            'minecraft:iron_hoe')
        .itemOutputs('wfcore:greenhouse')
        .duration(200)
        .EUt(30)

    // Mob Farmer controller — MV-tier assembly.
    event.recipes.gtceu.assembler('wfcore:mob_farmer')
        .itemInputs('4x gtceu:steel_plate', '4x gtceu:steel_frame', '2x #gtceu:circuits/mv',
            '2x minecraft:iron_sword')
        .itemOutputs('wfcore:mob_farmer')
        .duration(200)
        .EUt(120)

    // ------------------------------------------------------------------ greenhouse (LV)
    // Each recipe: a seed/crop + fertilizer (bone meal) + 100 mB water -> harvested crop. Seed-based crops
    // return one seed so the loop is self-sustaining. Runs at LV (32 EU/t).

    event.recipes.wfcore.greenhouse('kubejs:greenhouse_wheat')
        .itemInputs('minecraft:wheat_seeds')
        .inputFluids(Fluid.of('minecraft:water', 100))
        .duration(200)
        .EUt(30)
        .itemOutputs(Item.of('minecraft:wheat', 2), 'minecraft:wheat_seeds')

    event.recipes.wfcore.greenhouse('kubejs:greenhouse_carrot')
        .itemInputs('minecraft:carrot')
        .inputFluids(Fluid.of('minecraft:water', 100))
        .duration(200)
        .EUt(30)
        .itemOutputs(Item.of('minecraft:carrot', 3))

    event.recipes.wfcore.greenhouse('kubejs:greenhouse_potato')
        .itemInputs('minecraft:potato')
        .inputFluids(Fluid.of('minecraft:water', 100))
        .duration(200)
        .EUt(30)
        .itemOutputs(Item.of('minecraft:potato', 3))

    event.recipes.wfcore.greenhouse('kubejs:greenhouse_beetroot')
        .itemInputs('minecraft:beetroot_seeds')
        .inputFluids(Fluid.of('minecraft:water', 100))
        .duration(200)
        .EUt(30)
        .itemOutputs(Item.of('minecraft:beetroot', 2), 'minecraft:beetroot_seeds')

    event.recipes.wfcore.greenhouse('kubejs:greenhouse_melon')
        .itemInputs('minecraft:melon_seeds')
        .inputFluids(Fluid.of('minecraft:water', 100))
        .duration(200)
        .EUt(30)
        .itemOutputs(Item.of('minecraft:melon_slice', 4))

    event.recipes.wfcore.greenhouse('kubejs:greenhouse_pumpkin')
        .itemInputs('minecraft:pumpkin_seeds')
        .inputFluids(Fluid.of('minecraft:water', 100))
        .duration(200)
        .EUt(30)
        .itemOutputs('minecraft:pumpkin', 'minecraft:pumpkin_seeds')

    event.recipes.wfcore.greenhouse('kubejs:greenhouse_sugarcane')
        .itemInputs('minecraft:sugar_cane')
        .inputFluids(Fluid.of('minecraft:water', 100))
        .duration(200)
        .EUt(30)
        .itemOutputs(Item.of('minecraft:sugar_cane', 3))

    event.recipes.wfcore.greenhouse('kubejs:greenhouse_cocoa')
        .itemInputs('minecraft:cocoa_beans')
        .inputFluids(Fluid.of('minecraft:water', 100))
        .duration(200)
        .EUt(30)
        .itemOutputs(Item.of('minecraft:cocoa_beans', 3))

    event.recipes.wfcore.greenhouse('kubejs:greenhouse_netherwart')
        .itemInputs('minecraft:nether_wart')
        .inputFluids(Fluid.of('minecraft:water', 100))
        .duration(200)
        .EUt(30)
        .itemOutputs(Item.of('minecraft:nether_wart', 3))

    event.recipes.wfcore.greenhouse('kubejs:greenhouse_wood')
        .itemInputs('minecraft:oak_sapling')
        .inputFluids(Fluid.of('minecraft:water', 100))
        .duration(200)
        .EUt(30)
        .itemOutputs(Item.of('minecraft:oak_log', 64), Item.of('minecraft:oak_sapling', 3))


    // ------------------------------------------------------------------ mob farmer (MV)
    // A Programmed Circuit selects the mob; power yields its drops. Chanced outputs are per-10000
    // (e.g. 3300 = 33%). EUt 120 keeps it at MV (under the MV cap of 128).

    event.recipes.wfcore.mob_farmer('kubejs:mob_zombie')
        .circuit(1)
        .duration(200)
        .EUt(64)
        .itemOutputs(Item.of('minecraft:rotten_flesh', 2))

    event.recipes.wfcore.mob_farmer('kubejs:mob_skeleton')
        .circuit(2)
        .duration(400)
        .EUt(64)
        .itemOutputs(Item.of('minecraft:bone', 2), Item.of('minecraft:arrow', 2))
        .chancedOutput(Item.of('minecraft:bow', 1), 200, 0)

    event.recipes.wfcore.mob_farmer('kubejs:mob_spider')
        .circuit(3)
        .duration(400)
        .EUt(120)
        .itemOutputs(Item.of('minecraft:string', 2))
        .chancedOutput(Item.of('minecraft:spider_eye', 1), 3300, 0)


    event.recipes.wfcore.mob_farmer('kubejs:mob_enderman')
        .circuit(5)
        .duration(400)
        .EUt(512)
        .itemOutputs(Item.of('minecraft:ender_pearl', 4))

    event.recipes.wfcore.mob_farmer('kubejs:mob_cow')
        .circuit(6)
        .duration(600)
        .EUt(120)
        .itemOutputs(Item.of('minecraft:leather', 2), Item.of('minecraft:beef', 2))

    event.recipes.wfcore.mob_farmer('kubejs:mob_pig')
        .circuit(7)
        .duration(600)
        .EUt(120)
        .itemOutputs(Item.of('minecraft:porkchop', 3))

    event.recipes.wfcore.mob_farmer('kubejs:mob_chicken')
        .circuit(8)
        .duration(600)
        .EUt(120)
        .itemOutputs(Item.of('minecraft:feather', 2), Item.of('minecraft:chicken', 1))
        .chancedOutput(Item.of('minecraft:egg', 1), 2000, 0)

    event.recipes.wfcore.mob_farmer('kubejs:mob_blaze')
        .circuit(9)
        .duration(400)
        .EUt(120)
        .itemOutputs(Item.of('minecraft:blaze_rod', 2))

    event.recipes.wfcore.mob_farmer('kubejs:mob_wither_skeleton')
        .circuit(4)
        .duration(600)
        .EUt(512)
        .inputFluids(Fluid.of('gtceu:blood', 50))
        .itemOutputs(Item.of('minecraft:wither_skeleton_skull', 1),Item.of('minecraft:bone', 2), Item.of('minecraft:coal', 1))

    event.recipes.wfcore.mob_farmer('kubejs:mob_wither')
        .circuit(10)
        .duration(600)
        .EUt(512)
        .itemInputs(Item.of('minecraft:wither_skeleton_skull', 3))
        .inputFluids(Fluid.of('gtceu:blood', 100))
        .itemOutputs(Item.of('minecraft:nether_star', 1))
        .chancedOutput(Item.of('minecraft:nether_star', 1), 1000, 1000)
})
