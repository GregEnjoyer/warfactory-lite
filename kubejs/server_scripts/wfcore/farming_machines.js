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
    const gh = (id, input) => event.recipes.wfcore.greenhouse('kubejs:greenhouse_' + id)
        .itemInputs(input, 'gtceu:fertilizer')
        .inputFluids(Fluid.of('minecraft:water', 100))
        .duration(200)
        .EUt(30)

    gh('wheat',      'minecraft:wheat_seeds').itemOutputs(Item.of('minecraft:wheat', 2), 'minecraft:wheat_seeds')
    gh('carrot',     'minecraft:carrot').itemOutputs(Item.of('minecraft:carrot', 3))
    gh('potato',     'minecraft:potato').itemOutputs(Item.of('minecraft:potato', 3))
    gh('beetroot',   'minecraft:beetroot_seeds').itemOutputs(Item.of('minecraft:beetroot', 2), 'minecraft:beetroot_seeds')
    gh('melon',      'minecraft:melon_seeds').itemOutputs(Item.of('minecraft:melon_slice', 4))
    gh('pumpkin',    'minecraft:pumpkin_seeds').itemOutputs('minecraft:pumpkin', 'minecraft:pumpkin_seeds')
    gh('sugarcane',  'minecraft:sugar_cane').itemOutputs(Item.of('minecraft:sugar_cane', 3))
    gh('cocoa',      'minecraft:cocoa_beans').itemOutputs(Item.of('minecraft:cocoa_beans', 3))
    gh('netherwart', 'minecraft:nether_wart').itemOutputs(Item.of('minecraft:nether_wart', 3))

    // ------------------------------------------------------------------ mob farmer (MV)
    // A Programmed Circuit selects the mob; power yields its drops. Chanced outputs are per-10000
    // (e.g. 3300 = 33%). EUt 120 keeps it at MV (under the MV cap of 128).
    const mob = (id, circuit) => event.recipes.wfcore.mob_farmer('kubejs:mob_' + id)
        .circuit(circuit)
        .duration(200)
        .EUt(120)

    mob('zombie', 1).itemOutputs(Item.of('minecraft:rotten_flesh', 2))
        .chancedOutput(Item.of('minecraft:iron_ingot', 1), 300, 0)
        .chancedOutput(Item.of('minecraft:carrot', 1), 200, 0)
        .chancedOutput(Item.of('minecraft:potato', 1), 200, 0)

    mob('skeleton', 2).itemOutputs(Item.of('minecraft:bone', 2), Item.of('minecraft:arrow', 2))
        .chancedOutput(Item.of('minecraft:bow', 1), 200, 0)

    mob('spider', 3).itemOutputs(Item.of('minecraft:string', 2))
        .chancedOutput(Item.of('minecraft:spider_eye', 1), 3300, 0)

    mob('creeper', 4).itemOutputs(Item.of('minecraft:gunpowder', 2))

    mob('enderman', 5).itemOutputs(Item.of('minecraft:ender_pearl', 1))

    mob('cow', 6).itemOutputs(Item.of('minecraft:leather', 2), Item.of('minecraft:beef', 2))

    mob('pig', 7).itemOutputs(Item.of('minecraft:porkchop', 3))

    mob('chicken', 8).itemOutputs(Item.of('minecraft:feather', 2), Item.of('minecraft:chicken', 1))
        .chancedOutput(Item.of('minecraft:egg', 1), 2000, 0)

    mob('blaze', 9).itemOutputs(Item.of('minecraft:blaze_rod', 2))

    mob('wither_skeleton', 10).itemOutputs(Item.of('minecraft:bone', 2), Item.of('minecraft:coal', 1))
        .chancedOutput(Item.of('minecraft:wither_skeleton_skull', 1), 250, 0)
})
