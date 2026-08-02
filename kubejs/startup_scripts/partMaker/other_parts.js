StartupEvents.registry('item', event => {
event.create('solid_rocket_fuel').texture('kubejs:item/propellant').maxStackSize(64).displayName('Solid Rocket Propellant')
event.create('tank_icon').texture('kubejs:item/medium_tank_cropped').maxStackSize(64).displayName('Tank Icon')
event.create('plane_icon').texture('kubejs:item/fighter').maxStackSize(64).displayName('Plane Icon')
event.create('infantry_icon').texture('kubejs:item/techtree_infantry_tab').maxStackSize(64).displayName('Infantry Icon')
event.create('infantry_icon_1').texture('kubejs:item/infantry_weapons').maxStackSize(64).displayName('Early Modern Weapons')
event.create('infantry_icon_2').texture('kubejs:item/infantry_weapons2').maxStackSize(64).displayName('Early Cold War Pistols')
event.create('infantry_icon_3').texture('kubejs:item/infantry_weapons3').maxStackSize(64).displayName('research icon')
event.create('infantry_icon_4').texture('kubejs:item/support_weapons').maxStackSize(64).displayName('research icon')
event.create('infantry_icon_5').texture('kubejs:item/support_weapons2').maxStackSize(64).displayName('research icon')

// RAM modules — the RAM sticks slotted into a Computation Mainframe's RAM slots
// (4 per slot). Each tier's throughput caps that mainframe's CWU (a full slot =
// the tier ceiling); see startup_scripts/wfcore_compute.js.
event.create('mv_ram').texture('kubejs:item/mv_ram').maxStackSize(16).displayName('DDR1 RAM Module')  // 24/stick → slot 96
event.create('hv_ram').texture('kubejs:item/hv_ram').maxStackSize(16).displayName('DDR2 RAM Module')  // 32/stick → slot 128
event.create('ev_ram').texture('kubejs:item/ev_ram').maxStackSize(16).displayName('DDR3 RAM Module')  // 48/stick → slot 192
event.create('iv_ram').texture('kubejs:item/iv_ram').maxStackSize(16).displayName('DDR4 RAM Module')  // 128/stick → slot 512
})
