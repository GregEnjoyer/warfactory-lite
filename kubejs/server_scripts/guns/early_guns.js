// priority: 0
// Visit the wiki for more info - https://kubejs.com/
ServerEvents.recipes(event => {
  // NOTE: intentionally NOT doing `event.replaceInput({}, 'superbwarfare:steel_ingot', 'gtceu:steel_ingot')`.
  // superbwarfare:steel_ingot lives in #forge:ingots/steel, and KubeJS input-matching is tag-aware
  // (SingleItemMatch.contains -> Ingredient.test), so an unscoped {} replace rewrites the
  // #forge:ingots/steel tag input of EVERY GregTech recipe into a hardcoded single gtceu:steel_ingot,
  // stripping tag flexibility across the whole GT tree. SBW steel is already unobtainable (its output
  // recipes are removed in worldgen/ore_removals.js) and no kept recipe references it, so nothing
  // needs the swap. Same footgun class as the ore_removals.js { input: ... } removal.
  event.shapeless(
    Item.of('gtceu:programmed_circuit', '{Configuration:0}'),
                  ['#gtceu:circuits/ulv']
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
  event.shaped(
    Item.of('tacz:modern_kinetic_gun', '{GunCurrentAmmoCount:5,GunFireMode:"SEMI",GunId:"ww:m1903",HasBulletInBarrel:1b}'),
    [
      'SII',
      'SGS',
      'PPP'
    ],
    {
      I: 'gtceu:long_steel_rod',
      G: 'gtceu:small_steel_gear',
      S: 'gtceu:steel_screw',
      P: 'gtceu:treated_wood_plate',
    }
  )

  event.shaped(
    Item.of('tacz:modern_kinetic_gun', '{GunCurrentAmmoCount:5,GunFireMode:"SEMI",GunId:"ww:type99",HasBulletInBarrel:1b}'),
    [
      'SII',
      'SGS',
      'PPP'
    ],
    {
      I: 'gtceu:long_steel_rod',
      G: 'gtceu:small_steel_gear',
      S: 'gtceu:steel_screw',
      P: 'gtceu:treated_wood_plate',
    }
  )

  event.shaped(
    Item.of('tacz:modern_kinetic_gun', '{GunCurrentAmmoCount:10,GunFireMode:"SEMI",GunId:"ww:lee",HasBulletInBarrel:1b}'),
    [
      'SII',
      'SGS',
      'PPP'
    ],
    {
      I: 'gtceu:long_steel_rod',
      G: 'gtceu:small_steel_gear',
      S: 'gtceu:steel_screw',
      P: 'gtceu:treated_wood_plate',
    }
  )

  event.shaped(
    Item.of('tacz:modern_kinetic_gun', '{GunCurrentAmmoCount:5,GunFireMode:"SEMI",GunId:"ww:kar98k",HasBulletInBarrel:1b}'),
    [
      'SII',
      'SGS',
      'PPP'
    ],
    {
      I: 'gtceu:long_steel_rod',
      G: 'gtceu:small_steel_gear',
      S: 'gtceu:steel_screw',
      P: 'gtceu:treated_wood_plate',
    }
  )

  event.shaped(
    Item.of('tacz:modern_kinetic_gun', '{GunCurrentAmmoCount:5,GunFireMode:"SEMI",GunId:"ww:m1903",HasBulletInBarrel:1b}'),
    [
      'SII',
      'SGS',
      'PPP'
    ],
    {
      I: 'gtceu:long_steel_rod',
      G: 'gtceu:small_steel_gear',
      S: 'gtceu:steel_screw',
      P: 'gtceu:treated_wood_plate',
    }
  )

  event.shaped(
    Item.of('tacz:modern_kinetic_gun', '{GunCurrentAmmoCount:3,GunFireMode:"SEMI",GunId:"tacz:taurus943",HasBulletInBarrel:1b}'),
    [
      'SII',
      'SGS',
      'PPP'
    ],
    {
      I: 'gtceu:long_steel_rod',
      G: 'gtceu:small_steel_gear',
      S: 'gtceu:steel_screw',
      P: 'gtceu:treated_wood_plate',
    }
  )

  // WW Pistols (p08, p38 moved to short_barreled_1 gate; m712 moved to automatic_weapons_1 gate)
  event.shaped(
    Item.of('tacz:modern_kinetic_gun', '{GunCurrentAmmoCount:7,GunFireMode:"SEMI",GunId:"ww:cph",HasBulletInBarrel:1b}'),
    [
      ' I ',
      'SG ',
      ' P '
    ],
    {
      I: 'gtceu:long_steel_rod',
      G: 'gtceu:small_steel_gear',
      S: 'gtceu:steel_screw',
      P: 'gtceu:treated_wood_plate',
    }
  )

  event.shaped(
    Item.of('tacz:modern_kinetic_gun', '{GunCurrentAmmoCount:10,GunFireMode:"SEMI",GunId:"ww:c96",HasBulletInBarrel:1b}'),
    [
      ' I ',
      'SG ',
      ' P '
    ],
    {
      I: 'gtceu:long_steel_rod',
      G: 'gtceu:small_steel_gear',
      S: 'gtceu:steel_screw',
      P: 'gtceu:treated_wood_plate',
    }
  )

  event.shaped(
    Item.of('tacz:modern_kinetic_gun', '{GunCurrentAmmoCount:7,GunFireMode:"SEMI",GunId:"ww:m1911a1",HasBulletInBarrel:1b}'),
    [
      ' I ',
      'SG ',
      ' P '
    ],
    {
      I: 'gtceu:long_steel_rod',
      G: 'gtceu:small_steel_gear',
      S: 'gtceu:steel_screw',
      P: 'gtceu:treated_wood_plate',
    }
  )

  event.shaped(
    Item.of('tacz:modern_kinetic_gun', '{GunCurrentAmmoCount:6,GunFireMode:"SEMI",GunId:"ww:m1911a1",HasBulletInBarrel:1b}'),
    [
      ' I ',
      'SG ',
      ' P '
    ],
    {
      I: 'gtceu:long_steel_rod',
      G: 'gtceu:small_steel_gear',
      S: 'gtceu:steel_screw',
      P: 'gtceu:treated_wood_plate',
    }
  )


  // short_barreled_1 gated pistols (p08, p38)
  event.recipes.gtceu.assembler('short_barrel_ww_p08')
  .itemInputs(
    Item.of('gtceu:long_steel_rod', 1),
    Item.of('gtceu:small_steel_gear', 1),
    Item.of('gtceu:steel_screw', 1),
    Item.of('gtceu:treated_wood_plate', 1)
  )
  .itemOutputs(Item.of('tacz:modern_kinetic_gun', '{GunCurrentAmmoCount:8,GunFireMode:"SEMI",GunId:"ww:p08",HasBulletInBarrel:1b}'))
  .circuit(1)
  .duration(200)
  .EUt(32)

  event.recipes.gtceu.assembler('short_barrel_ww_p38')
  .itemInputs(
    Item.of('gtceu:long_steel_rod', 1),
    Item.of('gtceu:small_steel_gear', 1),
    Item.of('gtceu:steel_screw', 1),
    Item.of('gtceu:treated_wood_plate', 1)
  )
  .itemOutputs(Item.of('tacz:modern_kinetic_gun', '{GunCurrentAmmoCount:8,GunFireMode:"SEMI",GunId:"ww:p38",HasBulletInBarrel:1b}'))
  .circuit(1)
  .duration(200)
  .EUt(32)

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


})
