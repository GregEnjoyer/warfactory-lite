ServerEvents.recipes(event => {

    // Brimm Armors' workbench block is normally free-craftable (3 iron ingots, 3 oak
    // planks, 2 sticks). Removed so it isn't obtainable outside whatever progression
    // path is set up for it.
    event.remove({ id: "brimm:workbench_recipe" });

    event.remove({output: 'superbwarfare:armor_plate'})

    event.recipes.gtceu.forge_hammer('superbwarfarearmorplate')
    .itemInputs(Item.of('gtceu:steel_plate', 2), 'minecraft:brick_slab')
    .itemOutputs(Item.of('superbwarfare:armor_plate', 4))
    .duration(200)
    .EUt(6)

     });
