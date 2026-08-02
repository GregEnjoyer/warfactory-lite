ServerEvents.recipes(event => {

// --- WFCore explosives — assembler routes (same cheap steam-age ingredient balance
//     as the old shaped recipes, now built in the Assembler). -------------------

// Detonator — the electric trigger: screws + spring striker + red-alloy signal wire.
event.recipes.gtceu.assembler('wfcore:detonator')
    .itemInputs('4x gtceu:wrought_iron_screw', '2x gtceu:iron_spring', '2x gtceu:red_alloy_single_wire', 'minecraft:stone_button')
    .itemOutputs('wfcore:detonator')
    .circuit(1)
    .duration(200)
    .EUt(30)

// Mining Charge — paper-wrapped gunpowder charge.
event.recipes.gtceu.assembler('wfcore:mining_charge')
    .itemInputs('4x minecraft:paper', '5x minecraft:gunpowder')
    .itemOutputs('wfcore:mining_charge')
    .circuit(1)
    .duration(200)
    .EUt(16)

// Deep Mining Charge — a cluster of mining charges around a gunpowder core.
event.recipes.gtceu.assembler('wfcore:deep_mining_charge')
    .itemInputs('4x wfcore:mining_charge', '4x minecraft:paper', 'minecraft:gunpowder')
    .itemOutputs('wfcore:deep_mining_charge')
    .circuit(2)
    .duration(300)
    .EUt(16)

event.shaped(
  Item.of('wfcore:steam_wiremill'), 
  [
    'ADA',
    'CBC', 
    'ADA'
],
  {
    A: 'gtceu:bronze_machine_casing',
    B: 'gtceu:bronze_gearbox',
    C: '#gtceu:circuits/ulv',
    D: 'gtceu:bronze_frame'

  }
)
})