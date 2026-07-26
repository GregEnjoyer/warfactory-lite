ServerEvents.recipes(event => {

    // =========================
    // LV - Pistol
    // =========================
    event.remove({ output: Item.of('tacz:modern_kinetic_gun', '{GunCurrentAmmoCount:7,GunFireMode:"SEMI",GunId:"tacz:m1911",HasBulletInBarrel:1b}') });
    event.recipes.gtceu.assembler('lv_pistol_m1911')
        .itemInputs(
            Item.of('gtceu:steel_plate', 2),
            Item.of('gtceu:small_steel_gear', 1),
            Item.of('gtceu:steel_screw', 1)
        )
        .itemOutputs(Item.of('tacz:modern_kinetic_gun', 1, '{GunCurrentAmmoCount:7,GunFireMode:"SEMI",GunId:"tacz:m1911",HasBulletInBarrel:1b}'))
        .circuit(1)
        .duration(200)
        .EUt(32);

    // =========================
    // MV - Rifle
    // =========================
    event.remove({ output: Item.of('tacz:modern_kinetic_gun', '{GunCurrentAmmoCount:5,GunFireMode:"SEMI",GunId:"tacz:kar98",HasBulletInBarrel:0b}') });
    event.recipes.gtceu.assembler('mv_rifle_kar98')
        .itemInputs(
            Item.of('gtceu:polyethylene_plate', 3),
            Item.of('gtceu:small_steel_gear', 1),
            'kubejs:barrel_steel'
        )
        .itemOutputs(Item.of('tacz:modern_kinetic_gun', 1, '{GunCurrentAmmoCount:5,GunFireMode:"SEMI",GunId:"tacz:kar98",HasBulletInBarrel:0b}'))
        .circuit(1)
        .duration(20)
        .EUt(4)
        .addCondition(WFResearch.condition('guns1'));

    // =========================
    // MV - Pistols
    // =========================
    event.remove({ output: Item.of('tacz:modern_kinetic_gun', '{GunCurrentAmmoCount:12,GunFireMode:"SEMI",GunId:"ronmc:usp45",HasBulletInBarrel:0b}') });
    event.recipes.gtceu.assembler('mv_pistol_usp45')
        .itemInputs(
            Item.of('gtceu:polyethylene_plate', 2),
            Item.of('gtceu:small_steel_gear', 1),
            'kubejs:barrel_steel'
        )
        .itemOutputs(Item.of('tacz:modern_kinetic_gun', 1, '{GunCurrentAmmoCount:12,GunFireMode:"SEMI",GunId:"ronmc:usp45",HasBulletInBarrel:0b}'))
        .circuit(1)
        .duration(20)
        .EUt(4)
        .addCondition(WFResearch.condition('guns2'));

    event.remove({ output: Item.of('tacz:modern_kinetic_gun', '{GunCurrentAmmoCount:15,GunFireMode:"SEMI",GunId:"ronmc:fp9c_g19",HasBulletInBarrel:0b}') });
    event.recipes.gtceu.assembler('mv_pistol_fp9c_g19')
        .itemInputs(
            Item.of('gtceu:polyethylene_plate', 2),
            Item.of('gtceu:small_steel_gear', 1),
            'kubejs:barrel_steel'
        )
        .itemOutputs(Item.of('tacz:modern_kinetic_gun', 1, '{GunCurrentAmmoCount:15,GunFireMode:"SEMI",GunId:"ronmc:fp9c_g19",HasBulletInBarrel:0b}'))
        .circuit(2)
        .duration(20)
        .EUt(4)
        .addCondition(WFResearch.condition('guns2'));

    // =========================
    // EV - Assault Rifles
    // =========================
    event.remove({ output: Item.of('tacz:modern_kinetic_gun', '{GunCurrentAmmoCount:20,GunFireMode:"SEMI",GunId:"ronmc:mk17",HasBulletInBarrel:1b}') });
    event.recipes.gtceu.assembler('ev_rifle_mk17')
        .itemInputs(
            Item.of('gtceu:tungsten_steel_plate', 2),
            Item.of('gtceu:polytetrafluoroethylene_plate', 2),
            Item.of('gtceu:tungsten_steel_gear', 1),
            'kubejs:heavy_barrel_damascus'
        )
        .itemOutputs(Item.of('tacz:modern_kinetic_gun', 1, '{GunCurrentAmmoCount:20,GunFireMode:"SEMI",GunId:"ronmc:mk17",HasBulletInBarrel:1b}'))
        .circuit(1)
        .duration(400)
        .EUt(2048);

    event.remove({ output: Item.of('tacz:modern_kinetic_gun', '{GunCurrentAmmoCount:30,GunFireMode:"SEMI",GunId:"ronmc:mk16",HasBulletInBarrel:1b}') });
    event.recipes.gtceu.assembler('ev_rifle_mk16')
        .itemInputs(
            Item.of('gtceu:tungsten_steel_plate', 2),
            Item.of('gtceu:polytetrafluoroethylene_plate', 2),
            Item.of('gtceu:tungsten_steel_gear', 1),
            'kubejs:heavy_barrel_damascus'
        )
        .itemOutputs(Item.of('tacz:modern_kinetic_gun', 1, '{GunCurrentAmmoCount:30,GunFireMode:"SEMI",GunId:"ronmc:mk16",HasBulletInBarrel:1b}'))
        .circuit(2)
        .duration(400)
        .EUt(2048);

    // =========================
    // EV - SMG
    // =========================
    event.remove({ output: Item.of('tacz:modern_kinetic_gun', '{GunCurrentAmmoCount:30,GunFireMode:"AUTO",GunId:"ronmc:ump9",HasBulletInBarrel:1b}') });
    event.recipes.gtceu.assembler('ev_smg_ump9')
        .itemInputs(
            Item.of('gtceu:tungsten_steel_plate', 1),
            Item.of('gtceu:polytetrafluoroethylene_plate', 2),
            Item.of('gtceu:tungsten_steel_gear', 1)
        )
        .itemOutputs(Item.of('tacz:modern_kinetic_gun', 1, '{GunCurrentAmmoCount:30,GunFireMode:"AUTO",GunId:"ronmc:ump9",HasBulletInBarrel:1b}'))
        .circuit(1)
        .duration(200)
        .EUt(2048);

});