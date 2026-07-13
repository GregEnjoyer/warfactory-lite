GTCEuServerEvents.oreVeins(event => {
    event.add('kubejs:clay_pipe_material_vein', vein => {
        vein.weight(100)
        vein.clusterSize(30)
        vein.density(0.2)
        vein.discardChanceOnAirExposure(0)
        vein.layer('stone')
        vein.dimensions('minecraft:overworld')
        vein.biomes('minecraft:swamp', 'minecraft:river')
        vein.heightRangeUniform(-32, 64)
        vein.dikeVeinGenerator(generator => generator
        .withBlock(GTMaterials.get('clay_pipe_material'), 1, 0, 100)
        )
        vein.surfaceIndicatorGenerator(indicator => indicator
        .block(Block.getBlock('gtceu:clay_pipe_material_ore'))
        .placement('above')
        .density(0.4)
        .radius(5)
        )
    })
})
