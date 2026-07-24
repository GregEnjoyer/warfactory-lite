ServerEvents.recipes(event => {





 event.remove({ output: 'walkietalkie:wooden_walkietalkie'})
  event.remove({ output: 'walkietalkie:stone_walkietalkie'})
  event.remove({ output: 'walkietalkie:iron_walkietalkie'})
event.remove({ output: 'walkietalkie:golden_walkietalkie'})
event.remove({ output: 'walkietalkie:diamond_walkietalkie'})
event.remove({ output: 'walkietalkie:netherite_walkietalkie'})


event.shaped(Item.of('walkietalkie:iron_walkietalkie'), [
    'QS',
    'BS'
], {
    S: 'gtceu:steel_plate',
    Q: 'gtceu:quartzite_gem',
    B: 'gtceu:fine_copper_wire'
})

event.recipes.gtceu.assembler("gregtech:golden_talkie")
.itemInputs(Item.of('gtceu:fine_gold_wire'), Item.of('3x gtceu:steel_plate'), Item.of('gtceu:quartzite_gem'))
.itemOutputs(Item.of('walkietalkie:golden_walkietalkie', 1))
.duration(200)
.EUt(32)

event.recipes.gtceu.assembler("gregtech:diamond_talkie")
.itemInputs(Item.of('gtceu:fine_gold_wire'), Item.of(' 3x gtceu:polyethylene_plate'), Item.of('gtceu:flawless_quartzite_gem'))
.itemOutputs(Item.of('walkietalkie:golden_walkietalkie', 1))
.duration(200)
.EUt(128)


event.recipes.gtceu.assembler("gregtech:netherite_talkie")
.itemInputs(Item.of('gtceu:fine_platinum_wire'), Item.of(' 3x gtceu:polyethylene_plate'), Item.of('gtceu:exquisite_quartzite_gem'))
.itemOutputs(Item.of('walkietalkie:diamond_walkietalkie', 1))
.duration(200)
.EUt(256)
})

