ServerEvents.recipes(event => {
event.shaped(
  Item.of('wfcore:detonator'), 
  [
    'ACA',
    'BDB', 
    'ACA'
],
  {
    A: 'gtceu:wrought_iron_screw',
    B: 'gtceu:iron_spring', 
    C: 'gtceu:red_alloy_single_wire',
    D: 'minecraft:stone_button'
  }
)


event.shaped(
  Item.of('wfcore:mining_charge'), 
  [
    'ABA',
    'BBB', 
    'ABA'
],
  {
    A: 'minecraft:paper',
    B: 'minecraft:gunpowder', 

  }
)

event.shaped(
  Item.of('wfcore:deep_mining_charge'), 
  [
    'ACA',
    'CBC', 
    'ACA'
],
  {
    A: 'minecraft:paper',
    B: 'minecraft:gunpowder',
    C: 'wfcore:mining_charge'

  }
)

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
    C: 'gtceu:vacuum_tube',
    D: 'gtceu:bronze_frame'

  }
)
})