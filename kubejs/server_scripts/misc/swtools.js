ServerEvents.recipes(event => {

event.recipes.gtceu.assembler("gregtech:sw_defuser")
.itemInputs(Item.of(' 2x gtceu:steel_rod'), Item.of(' 1x gtceu:steel_screw'), Item.of('2x gtceu:rubber_plate'))
.itemOutputs(Item.of('superbwarfare:defuser', 1))
.duration(200)
.EUt(128)

event.recipes.gtceu.assembler("gregtech:sw_repair_tool")
.itemInputs(Item.of(' 16x gtceu:fine_annealed_copper_wire'), Item.of(' 4x gtceu:black_steel_plate'), Item.of('gtceu:mv_battery_hull'))
.itemOutputs(Item.of('superbwarfare:repair_tool', 1))
.duration(200)
.EUt(128)
})