GTCEuStartupEvents.registry('gtceu:material', event => {
    console.log('inside registry event')
    try {
        event.create('clay_pipe_material')
        .ingot()
        .color(0xB66A3A)
        .ore()
        .iconSet(GTMaterialIconSet.DULL)
        .fluidPipeProperties(99, 60, false, false, false, false)
        .components('1x clay')
        console.log('material.create finished without throwing')
    } catch (e) {
        console.log('ERROR CAUGHT: ' + e)
    }
})
