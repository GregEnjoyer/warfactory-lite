StartupEvents.registry('item', event => {
  //small casing
event.create('bullet_casing_small').texture('kubejs:item/bullet_casing_small').maxStackSize(16).displayName('Pistol Casings')

//large casing
event.create('bullet_casing_large').texture('kubejs:item/bullet_casing_large').maxStackSize(16).displayName('Heavy Rifle Casings')

//medium casing
event.create('bullet_casing_medium').texture('kubejs:item/bullet_casing_medium').maxStackSize(16).displayName('Rifle Casing')

//extra large casing
event.create('bullet_casing_xl').texture('kubejs:item/bullet_casing_xl').maxStackSize(16).displayName('Vehicle Sized Casing')

//steel casing
event.create('steel_bullet_casing').texture('kubejs:item/steel_bullet_casing').maxStackSize(16).displayName('Steel Bullet Casing')

  })