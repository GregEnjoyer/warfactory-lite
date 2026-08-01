// Infantry research tab — all category('infantry') nodes.
// Runs in ServerEvents.recipes (fires on server start AND /reload).
ServerEvents.recipes(event => {

    WFResearch.builder('infantry_combat_1')
        .category('infantry').pos(0, 0)
        .nodeColor(0xFF2F6BD8)
        .name('Infantry Combat 1')
        .description('Early bolt-action rifles and the calibres they fire. Unlocks the Kar98, Type 38, and Mosin M91.')
        .runs(5).ticksPerRun(300).eut(32).cwuPerRun(0)
        .unlocks(
            Item.of('tacz:modern_kinetic_gun', '{GunCurrentAmmoCount:5,GunFireMode:"SEMI",GunId:"tacz:kar98",HasBulletInBarrel:0b}'),
            Item.of('tacz:modern_kinetic_gun', '{GunCurrentAmmoCount:5,GunFireMode:"SEMI",GunId:"ww:type38",HasBulletInBarrel:1b}'),
            Item.of('tacz:modern_kinetic_gun', '{GunCurrentAmmoCount:5,GunFireMode:"SEMI",GunId:"ww:m91",HasBulletInBarrel:1b}')
        )
        .icon(Item.of('tacz:modern_kinetic_gun', '{GunCurrentAmmoCount:5,GunFireMode:"SEMI",GunId:"tacz:kar98",HasBulletInBarrel:0b}'))
        .register()

    WFResearch.builder('short_barreled_1')
        .category('infantry').pos(-1, 1)
        .nodeColor(0xFF2F6BD8)
        .name('Short Barreled I')
        .description('Compact sidearms for officers and crew: the Luger P08 and Walther P38.')
        .requires('infantry_combat_1')
        .runs(15).ticksPerRun(220).eut(24).cwuPerRun(0)
        .itemPerRun(Item.of('gtceu:steel_plate', 2))
        .itemPerRun(Item.of('tacz:ammo', '{AmmoId:"tacz:9mm"}').withCount(2))
        .itemPerRun(Item.of('minecraft:gunpowder', 10))
        .unlocks(
            Item.of('tacz:modern_kinetic_gun', '{GunCurrentAmmoCount:8,GunFireMode:"SEMI",GunId:"ww:p08",HasBulletInBarrel:1b}'),
            Item.of('tacz:modern_kinetic_gun', '{GunCurrentAmmoCount:8,GunFireMode:"SEMI",GunId:"ww:p38",HasBulletInBarrel:1b}')
        )
        .icon(Item.of('tacz:modern_kinetic_gun', '{GunCurrentAmmoCount:8,GunFireMode:"SEMI",GunId:"ww:p08",HasBulletInBarrel:1b}'))
        .register()

    WFResearch.builder('pump_action_1')
        .category('infantry').pos(0, 1)
        .nodeColor(0xFF2F6BD8)
        .name('Pump Action I')
        .description('Repeating shotgun designs for close-quarters combat: the Winchester M1897.')
        .requires('infantry_combat_1')
        .runs(10).ticksPerRun(180).eut(24).cwuPerRun(0)
        .itemPerRun(Item.of('gtceu:steel_plate', 8))
        .itemTagPerRun('gtceu:circuits/hv', 2)
        .itemPerRun(Item.of('tacz:ammo', '{AmmoId:"tacz:12g"}').withCount(6))
        .itemPerRun(Item.of('minecraft:gunpowder', 15))
        .unlocks(
            Item.of('tacz:modern_kinetic_gun', '{GunCurrentAmmoCount:5,GunFireMode:"SEMI",GunId:"ww:m1897",HasBulletInBarrel:1b}')
        )
        .icon(Item.of('tacz:modern_kinetic_gun', '{GunCurrentAmmoCount:5,GunFireMode:"SEMI",GunId:"ww:m1897",HasBulletInBarrel:1b}'))
        .register()

    WFResearch.builder('automatic_weapons_1')
        .category('infantry').pos(1, 1)
        .nodeColor(0xFF2F6BD8)
        .name('Automatic Weapons I')
        .description('Select-fire and full-auto small arms from the WWI-WWII era: the M712 Schnellfeuer and Sten.')
        .requires('infantry_combat_1')
        .runs(30).ticksPerRun(300).eut(32).cwuPerRun(0)
        .itemPerRun(Item.of('gtceu:small_steel_spring', 9))
        .itemTagPerRun('gtceu:circuits/hv', 2)
        .itemPerRun(Item.of('tacz:ammo', '{AmmoId:"tacz:9mm"}').withCount(2))
        .itemPerRun(Item.of('minecraft:gunpowder', 15))
        .unlocks(
            Item.of('tacz:modern_kinetic_gun', '{GunCurrentAmmoCount:10,GunFireMode:"SEMI",GunId:"ww:m712",HasBulletInBarrel:1b}'),
            Item.of('tacz:modern_kinetic_gun', '{GunCurrentAmmoCount:16,GunFireMode:"SEMI",GunId:"ww:sten",HasBulletInBarrel:1b}')
        )
        .icon(Item.of('tacz:modern_kinetic_gun', '{GunCurrentAmmoCount:10,GunFireMode:"SEMI",GunId:"ww:m712",HasBulletInBarrel:1b}'))
        .register()

    // Placeholder — unlocked by ANY ONE of the three branches above.
    WFResearch.builder('infantry_combat_1_placeholder')
        .category('infantry').pos(0, 2)
        .nodeColor(0xFF2F6BD8)
        .name('???')
        .description('Further infantry research coming soon.')
        .anyOf('short_barreled_1', 'pump_action_1', 'automatic_weapons_1')
        .runs(1).ticksPerRun(1).eut(32).cwuPerRun(0)
        .icon(Item.of('minecraft:nether_star'))
        .register()

})
