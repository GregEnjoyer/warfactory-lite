// HV-tier modern gun progression — relocated from the old HV.js during the script reorg.
// (The advanced_aircraft_metal recipe that shared HV.js now lives in materials/alloys.js.)
ServerEvents.recipes(event => {

    // =========================
    // GUNS - progression brief implementation (warfactory-lite-gun-progression-notes.md)
    // HV = cutting-edge modern era.
    // =========================

    // taurus500 dropped from progression
    event.remove({ output: Item.of('tacz:modern_kinetic_gun', '{GunCurrentAmmoCount:5,GunFireMode:"SEMI",GunId:"tacz:taurus500",HasBulletInBarrel:1b}') });

    // Modern pistols (1990s-2020s designs)
    const modernPistols2 = [
        { nbt: '{GunCurrentAmmoCount:12,GunFireMode:"SEMI",GunId:"tacz:hk_mk23",HasBulletInBarrel:1b}', circuit: 1 },
        { nbt: '{GunCurrentAmmoCount:17,GunFireMode:"SEMI",GunId:"tacz:m9a4",HasBulletInBarrel:1b}', circuit: 2 },
        { nbt: '{GunCurrentAmmoCount:6,GunFireMode:"SEMI",GunId:"tacz:rhino357",HasBulletInBarrel:1b}', circuit: 3 },
        { nbt: '{GunCurrentAmmoCount:17,GunFireMode:"SEMI",GunId:"ronmc:509",HasBulletInBarrel:1b}', circuit: 5 },
        { nbt: '{GunCurrentAmmoCount:12,GunFireMode:"SEMI",GunId:"ronmc:p99",HasBulletInBarrel:1b}', circuit: 6 },
    ];
    modernPistols2.forEach(g => {
        event.remove({ output: Item.of('tacz:modern_kinetic_gun', g.nbt) });
        event.recipes.gtceu.assembler(`modern_pistol2_${g.circuit}`)
        .itemInputs(
            Item.of('gtceu:gun_metal_ingot', 1),
                    Item.of('gtceu:polytetrafluoroethylene_plate', 1),
                    Item.of('gtceu:stainless_steel_gear', 1)
        )
        .itemOutputs(Item.of('tacz:modern_kinetic_gun', 1, g.nbt))
        .circuit(g.circuit)
        .duration(200)
        .EUt(512);
    });

    // Modern SMGs
    const modernSmgs = [
        { nbt: '{GunCurrentAmmoCount:25,GunFireMode:"AUTO",GunId:"tacz:ump45",HasBulletInBarrel:1b}', circuit: 1 },
        { nbt: '{GunCurrentAmmoCount:20,GunFireMode:"SEMI",GunId:"tacz:vector45",HasBulletInBarrel:1b}', circuit: 2 },
        { nbt: '{GunCurrentAmmoCount:40,GunFireMode:"SEMI",GunId:"ronmc:mp7",HasBulletInBarrel:1b}', circuit: 3 },
        { nbt: '{GunCurrentAmmoCount:30,GunFireMode:"SEMI",GunId:"ronmc:mp9",HasBulletInBarrel:1b}', circuit: 4 },
        { nbt: '{GunCurrentAmmoCount:30,GunFireMode:"SEMI",GunId:"ronmc:mpx",HasBulletInBarrel:1b}', circuit: 5 },
    ];
    modernSmgs.forEach(g => {
        event.remove({ output: Item.of('tacz:modern_kinetic_gun', g.nbt) });
        event.recipes.gtceu.assembler(`modern_smg_${g.circuit}`)
        .itemInputs(
            Item.of('gtceu:gun_metal_ingot', 1),
                    Item.of('gtceu:polytetrafluoroethylene_plate', 2),
                    Item.of('gtceu:stainless_steel_gear', 1)
        )
        .itemOutputs(Item.of('tacz:modern_kinetic_gun', 1, g.nbt))
        .circuit(g.circuit)
        .duration(200)
        .EUt(512);
    });

    // Modern rifles - this is where gun_metal_ingot finally gets consumed at scale
    const modernRifles2 = [
        { nbt: '{GunCurrentAmmoCount:30,GunFireMode:"SEMI",GunId:"ronmc:g36c",HasBulletInBarrel:1b}', circuit: 1 },
        { nbt: '{GunCurrentAmmoCount:30,GunFireMode:"SEMI",GunId:"ronmc:mcx",HasBulletInBarrel:1b}', circuit: 2 },
        { nbt: '{GunCurrentAmmoCount:30,GunFireMode:"SEMI",GunId:"tacz:qbz_191",HasBulletInBarrel:1b}', circuit: 3 },
        { nbt: '{GunCurrentAmmoCount:30,GunFireMode:"SEMI",GunId:"tacz:qbz_95",HasBulletInBarrel:1b}', circuit: 4 },
        { nbt: '{GunCurrentAmmoCount:30,GunFireMode:"SEMI",GunId:"tacz:hk416d",HasBulletInBarrel:1b}', circuit: 5 },
        { nbt: '{GunCurrentAmmoCount:10,GunFireMode:"SEMI",GunId:"tacz:mk14",HasBulletInBarrel:1b}', circuit: 6 },
        { nbt: '{GunCurrentAmmoCount:20,GunFireMode:"SEMI",GunId:"tacz:scar_h",HasBulletInBarrel:1b}', circuit: 7 },
        { nbt: '{GunCurrentAmmoCount:30,GunFireMode:"SEMI",GunId:"tacz:scar_l",HasBulletInBarrel:1b}', circuit: 8 },
        { nbt: '{GunCurrentAmmoCount:15,GunFireMode:"SEMI",GunId:"tacz:spr15hb",HasBulletInBarrel:1b}', circuit: 9 },
        { nbt: '{GunCurrentAmmoCount:30,GunFireMode:"SEMI",GunId:"ronmc:lvar",HasBulletInBarrel:1b}', circuit: 10 },
        { nbt: '{GunCurrentAmmoCount:20,GunFireMode:"SEMI",GunId:"ronmc:rtwc",HasBulletInBarrel:1b}', circuit: 11 },
    ];
    modernRifles2.forEach(g => {
        event.remove({ output: Item.of('tacz:modern_kinetic_gun', g.nbt) });
        event.recipes.gtceu.assembler(`modern_rifle2_${g.circuit}`)
        .itemInputs(
            Item.of('gtceu:gun_metal_ingot', 2),
                    Item.of('gtceu:polytetrafluoroethylene_plate', 2),
                    Item.of('gtceu:stainless_steel_gear', 1),
                    'kubejs:heavy_barrel_steel'
        )
        .itemOutputs(Item.of('tacz:modern_kinetic_gun', 1, g.nbt))
        .circuit(g.circuit)
        .duration(400)
        .EUt(512);
    });

    // Modern shotguns
    const modernShotguns = [
        { nbt: '{GunCurrentAmmoCount:8,GunFireMode:"SEMI",GunId:"ronmc:b1301",HasBulletInBarrel:1b}', circuit: 1 },
        { nbt: '{GunCurrentAmmoCount:7,GunFireMode:"SEMI",GunId:"ronmc:supernova",HasBulletInBarrel:1b}', circuit: 2 },
    ];
    modernShotguns.forEach(g => {
        event.remove({ output: Item.of('tacz:modern_kinetic_gun', g.nbt) });
        event.recipes.gtceu.assembler(`modern_shotgun_${g.circuit}`)
        .itemInputs(
            Item.of('gtceu:gun_metal_ingot', 1),
                    Item.of('gtceu:polytetrafluoroethylene_plate', 2),
                    Item.of('gtceu:stainless_steel_gear', 1)
        )
        .itemOutputs(Item.of('tacz:modern_kinetic_gun', 1, g.nbt))
        .circuit(g.circuit)
        .duration(200)
        .EUt(512);
    });

    // Modern MG / launchers - fn_evolys is a true belt-fed MG (no explosive input);
    // m320/m32a1 are grenade launchers and get a dynamite input since a launcher with
    // no explosive-chain component in its recipe felt wrong.
    const modernMg = [
        { nbt: '{GunCurrentAmmoCount:75,GunFireMode:"AUTO",GunId:"tacz:fn_evolys",HasBulletInBarrel:1b}', circuit: 1 },
    ];
    modernMg.forEach(g => {
        event.remove({ output: Item.of('tacz:modern_kinetic_gun', g.nbt) });
        event.recipes.gtceu.assembler(`modern_mg_${g.circuit}`)
        .itemInputs(
            Item.of('gtceu:gun_metal_ingot', 3),
                    Item.of('gtceu:polytetrafluoroethylene_plate', 2),
                    Item.of('gtceu:stainless_steel_gear', 2),
                    'kubejs:heavy_barrel_damascus'
        )
        .itemOutputs(Item.of('tacz:modern_kinetic_gun', 1, g.nbt))
        .circuit(g.circuit)
        .duration(600)
        .EUt(512);
    });

    const modernLaunchers = [
        { nbt: '{GunCurrentAmmoCount:1,GunFireMode:"SEMI",GunId:"tacz:m320",HasBulletInBarrel:1b}', circuit: 1 },
        { nbt: '{GunCurrentAmmoCount:6,GunFireMode:"SEMI",GunId:"ronmc:m32a1",HasBulletInBarrel:1b}', circuit: 2 },
    ];
    modernLaunchers.forEach(g => {
        event.remove({ output: Item.of('tacz:modern_kinetic_gun', g.nbt) });
        event.recipes.gtceu.assembler(`modern_launcher_${g.circuit}`)
        .itemInputs(
            Item.of('gtceu:gun_metal_ingot', 2),
                    Item.of('gtceu:polytetrafluoroethylene_plate', 1),
                    Item.of('gtceu:stainless_steel_gear', 1),
                    Item.of('gtceu:dynamite', 2)
        )
        .itemOutputs(Item.of('tacz:modern_kinetic_gun', 1, g.nbt))
        .circuit(g.circuit)
        .duration(400)
        .EUt(512);
    });

})
