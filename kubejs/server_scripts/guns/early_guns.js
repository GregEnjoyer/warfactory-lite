// priority: 0
// Visit the wiki for more info - https://kubejs.com/
ServerEvents.recipes(event => {
  // Removes unwanted stuff
  event.replaceInput({}, 'superbwarfare:steel_ingot', 'gtceu:steel_ingot')
  event.shapeless(
    Item.of('gtceu:programmed_circuit', '{Configuration:0}'),
                  ['gtceu:vacuum_tube']
  )

  // Wrought Iron smelting recipe
  event.smelting(
    'gtceu:wrought_iron_ingot',
    'minecraft:iron_ingot',
    0.7,
    400
  )

  // Springfield 1873 (its .45-70 bootstrap ammo now lives in ../guns/ammo.js)
  event.shaped(
    Item.of('tacz:modern_kinetic_gun', '{GunCurrentAmmoCount:0,GunFireMode:"SEMI",GunId:"tacz:springfield1873"}'),
    [
      ' P ',
      'API',
      ' W '
    ],
    {
      A: '#forge:bolts/wrought_iron',
      P: 'superbwarfare:iron_barrel',
      I: 'gtceu:iron_ring',
      W: 'kubejs:stock_wooden'
    }
  )

  event.shaped(
    Item.of('tacz:modern_kinetic_gun', '{GunCurrentAmmoCount:0,GunFireMode:"SEMI",GunId:"tacz:taurus943",HasBulletInBarrel:0b}'),
    [
      '   ',
      'API',
      ' W '
    ],
    {
      A: 'gtceu:small_iron_gear',
      P: 'superbwarfare:iron_barrel',
      I: 'gtceu:iron_ring',
      W: 'kubejs:grip_wooden'
    }
  )


event.shaped(
    Item.of('superbwarfare:iron_barrel'),
    [
      '   ',
      ' I ',
      'I  '
    ],
    {
      I: 'gtceu:long_wrought_iron_rod',
    }
  )
  // WW Bolt-Action Rifles
  const ww1rifles = [
    Item.of('tacz:modern_kinetic_gun', '{GunCurrentAmmoCount:5,GunFireMode:"SEMI",GunId:"ww:m1903",HasBulletInBarrel:1b}'),
                     Item.of('tacz:modern_kinetic_gun', '{GunCurrentAmmoCount:5,GunFireMode:"SEMI",GunId:"ww:type99",HasBulletInBarrel:1b}'),
                     Item.of('tacz:modern_kinetic_gun', '{GunCurrentAmmoCount:10,GunFireMode:"SEMI",GunId:"ww:lee",HasBulletInBarrel:1b}'),
                     Item.of('tacz:modern_kinetic_gun', '{GunCurrentAmmoCount:5,GunFireMode:"SEMI",GunId:"ww:kar98k",HasBulletInBarrel:1b}'),
  ]
  ww1rifles.forEach(gun => {
    event.shaped(gun, [
      'SII',
      'SGS',
      'PPP'
    ], {
      I: 'gtceu:long_steel_rod',
      G: 'gtceu:small_steel_gear',
      S: 'gtceu:steel_screw',
      P: 'gtceu:treated_wood_plate',
    })
  })

  // WW Pistols (p08, p38 moved to short_barreled_1 gate; m712 moved to automatic_weapons_1 gate)
  const ww1pistols = [
Item.of('tacz:modern_kinetic_gun', '{GunCurrentAmmoCount:7,GunFireMode:"SEMI",GunId:"ww:cph",HasBulletInBarrel:1b}'),
Item.of('tacz:modern_kinetic_gun', '{GunCurrentAmmoCount:10,GunFireMode:"SEMI",GunId:"ww:c96",HasBulletInBarrel:1b}'),
Item.of('tacz:modern_kinetic_gun', '{GunCurrentAmmoCount:7,GunFireMode:"SEMI",GunId:"ww:m1911a1",HasBulletInBarrel:1b}'),
  ]
  ww1pistols.forEach(gun => {
    event.shaped(gun, [
      ' I ',
      'SG ',
      ' P '
    ], {
      I: 'gtceu:long_steel_rod',
      G: 'gtceu:small_steel_gear',
      S: 'gtceu:steel_screw',
      P: 'gtceu:treated_wood_plate',
    })
  })

  // infantry_combat_1 gated rifles (type38 = 6.5mm Arisaka, m91 = 7.62x54R)
  ;[
    Item.of('tacz:modern_kinetic_gun', '{GunCurrentAmmoCount:5,GunFireMode:"SEMI",GunId:"ww:type38",HasBulletInBarrel:1b}'),
    Item.of('tacz:modern_kinetic_gun', '{GunCurrentAmmoCount:5,GunFireMode:"SEMI",GunId:"ww:m91",HasBulletInBarrel:1b}'),
  ].forEach(gun => {
    event.recipes.gtceu.assembler(`infantry_c1_${gun.nbt.getString('GunId').replace(':','_')}`)
    .itemInputs(
      Item.of('gtceu:long_steel_rod', 2),
      Item.of('gtceu:small_steel_gear', 1),
      Item.of('gtceu:steel_screw', 3),
      Item.of('gtceu:treated_wood_plate', 3)
    )
    .itemOutputs(gun)
    .circuit(1)
    .duration(200)
    .EUt(32)
    .addCondition(WFResearch.condition('infantry_combat_1'))
  })

  // short_barreled_1 gated pistols (p08, p38)
  ;[
    Item.of('tacz:modern_kinetic_gun', '{GunCurrentAmmoCount:8,GunFireMode:"SEMI",GunId:"ww:p08",HasBulletInBarrel:1b}'),
    Item.of('tacz:modern_kinetic_gun', '{GunCurrentAmmoCount:8,GunFireMode:"SEMI",GunId:"ww:p38",HasBulletInBarrel:1b}'),
  ].forEach(gun => {
    event.recipes.gtceu.assembler(`short_barrel_${gun.nbt.getString('GunId').replace(':','_')}`)
    .itemInputs(
      Item.of('gtceu:long_steel_rod', 1),
      Item.of('gtceu:small_steel_gear', 1),
      Item.of('gtceu:steel_screw', 1),
      Item.of('gtceu:treated_wood_plate', 1)
    )
    .itemOutputs(gun)
    .circuit(1)
    .duration(200)
    .EUt(32)
    .addCondition(WFResearch.condition('short_barreled_1'))
  })

  // automatic_weapons_1 gated pistol (m712 Schnellfeuer)
  event.recipes.gtceu.assembler('auto_weapons_ww_m712')
  .itemInputs(
    Item.of('gtceu:long_steel_rod', 1),
    Item.of('gtceu:small_steel_gear', 1),
    Item.of('gtceu:steel_screw', 1),
    Item.of('gtceu:treated_wood_plate', 1)
  )
  .itemOutputs(Item.of('tacz:modern_kinetic_gun', '{GunCurrentAmmoCount:10,GunFireMode:"SEMI",GunId:"ww:m712",HasBulletInBarrel:1b}'))
  .circuit(2)
  .duration(200)
  .EUt(32)
  .addCondition(WFResearch.condition('automatic_weapons_1'))

  // WW LMGs
  const ww1lmgs = [
    Item.of('tacz:modern_kinetic_gun', '{GunCurrentAmmoCount:20,GunFireMode:"AUTO",GunId:"ww:m1918",HasBulletInBarrel:1b}'),
    Item.of('tacz:modern_kinetic_gun', '{GunCurrentAmmoCount:6,GunFireMode:"SEMI",GunId:"ww:m1918a1",HasBulletInBarrel:1b}'),
    Item.of('tacz:modern_kinetic_gun', '{GunCurrentAmmoCount:20,GunFireMode:"AUTO",GunId:"ww:m1918a2",HasBulletInBarrel:1b}')
  ]
  ww1lmgs.forEach(gun => {
    event.shaped(gun, [
      'BBB',
      'I I',
      'SSS'
    ], {
      B: 'gtceu:wrought_iron_rod',
      I: 'gtceu:wrought_iron_gear',
      S: 'gtceu:treated_wood_plate'
    })
  })
})
