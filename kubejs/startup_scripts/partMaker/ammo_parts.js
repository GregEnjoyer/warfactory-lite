StartupEvents.registry('item', event => {
  //small casing
event.create('bullet_casing_small').texture('kubejs:textures/item/bullet_casing_small').maxStackSize(16).displayName('Pistol Casings')

//large casing
event.create('bullet_casing_large').texture('kubejs:textures/item/bullet_casing_large').maxStackSize(16).displayName('Heavy Rifle Casings')

//medium casing
event.create('bullet_casing_medium').texture('kubejs:textures/item/bullet_casing_medium').maxStackSize(16).displayName('Rifle Casing')

//extra large casing
event.create('bullet_casing_xl').texture('kubejs:textures/item/bullet_casing_xl').maxStackSize(16).displayName('Vehicle Sized Casing')

  })