ServerEvents.recipes(event => {
        const smgs = [
                { id: 'kubejs:ww_m50',   gear: 1, woodPlate: 2, steelPlate: 5, circuit: 1, duration: 400, eut: 32, nbt: '{GunCurrentAmmoCount:20,GunFireMode:"SEMI",GunId:"ww:m50",HasBulletInBarrel:1b}'   },
                { id: 'kubejs:ww_tbe',   gear: 1, woodPlate: 2, steelPlate: 5, circuit: 2, duration: 400, eut: 32, nbt: '{GunCurrentAmmoCount:50,GunFireMode:"AUTO",GunId:"ww:tbe",HasBulletInBarrel:1b}'   },
                { id: 'kubejs:ww_mp41',  gear: 1, woodPlate: 2, steelPlate: 5, circuit: 3, duration: 400, eut: 32, nbt: '{GunCurrentAmmoCount:32,GunFireMode:"AUTO",GunId:"ww:mp41",HasBulletInBarrel:1b}'  },
                { id: 'kubejs:ww_m28s',  gear: 1, woodPlate: 2, steelPlate: 5, circuit: 4, duration: 400, eut: 32, nbt: '{GunCurrentAmmoCount:20,GunFireMode:"AUTO",GunId:"ww:m28s",HasBulletInBarrel:1b}'  },
                { id: 'kubejs:ww_pps',   gear: 1, woodPlate: 2, steelPlate: 5, circuit: 5, duration: 400, eut: 32, nbt: '{GunCurrentAmmoCount:0,GunFireMode:"AUTO",GunId:"ww:pps",HasBulletInBarrel:1b}'    },
                { id: 'kubejs:ww_mp28',  gear: 1, woodPlate: 2, steelPlate: 5, circuit: 6, duration: 400, eut: 32, nbt: '{GunCurrentAmmoCount:30,GunFireMode:"AUTO",GunId:"ww:mp28",HasBulletInBarrel:1b}'  },
                { id: 'kubejs:ww_m1921', gear: 1, woodPlate: 2, steelPlate: 5, circuit: 7, duration: 400, eut: 32, nbt: '{GunCurrentAmmoCount:0,GunFireMode:"AUTO",GunId:"ww:m1921",HasBulletInBarrel:1b}'  },
                { id: 'kubejs:ww_m1a1',  gear: 1, woodPlate: 2, steelPlate: 5, circuit: 8, duration: 400, eut: 32, nbt: '{GunCurrentAmmoCount:20,GunFireMode:"AUTO",GunId:"ww:m1a1",HasBulletInBarrel:1b}'  },
                { id: 'kubejs:ww_t100',  gear: 1, woodPlate: 2, steelPlate: 5, circuit: 9, duration: 400, eut: 32, nbt: '{GunCurrentAmmoCount:30,GunFireMode:"AUTO",GunId:"ww:t100",HasBulletInBarrel:1b}'  },
        ];

        smgs.forEach(g => {
                event.recipes.gtceu.assembler(g.id)
                .itemInputs(
                        Item.of('gtceu:small_steel_gear', g.gear),
                            Item.of('gtceu:treated_wood_plate', g.woodPlate),
                            Item.of('gtceu:steel_plate', g.steelPlate)
                )
                .itemOutputs(Item.of('tacz:modern_kinetic_gun', 1, g.nbt))
                .circuit(g.circuit)
                .duration(g.duration)
                .EUt(g.eut);
        });


        const rifles = [
                { id: 'kubejs:ww_m1g',   gear: 1, woodPlate: 2, steelPlate: 5, circuit: 1, duration: 400, eut: 32, nbt: '{GunCurrentAmmoCount:8,GunFireMode:"SEMI",GunId:"ww:m1g",HasBulletInBarrel:1b}'    },
                { id: 'kubejs:ww_m1',    gear: 1, woodPlate: 2, steelPlate: 5, circuit: 2, duration: 400, eut: 32, nbt: '{GunCurrentAmmoCount:15,GunFireMode:"SEMI",GunId:"ww:m1",HasBulletInBarrel:1b}'    },
                { id: 'kubejs:ww_m2',    gear: 1, woodPlate: 2, steelPlate: 5, circuit: 3, duration: 400, eut: 32, nbt: '{GunCurrentAmmoCount:15,GunFireMode:"SEMI",GunId:"ww:m2",HasBulletInBarrel:1b}'    },
                { id: 'kubejs:ww_svt40', gear: 1, woodPlate: 2, steelPlate: 5, circuit: 4, duration: 400, eut: 32, nbt: '{GunCurrentAmmoCount:10,GunFireMode:"SEMI",GunId:"ww:svt_40",HasBulletInBarrel:1b}' },
                { id: 'kubejs:ww_t20',   gear: 1, woodPlate: 2, steelPlate: 5, circuit: 5, duration: 400, eut: 32, nbt: '{GunCurrentAmmoCount:20,GunFireMode:"SEMI",GunId:"ww:t20",HasBulletInBarrel:1b}'   },
                { id: 'kubejs:ww_stg44', gear: 1, woodPlate: 2, steelPlate: 5, circuit: 6, duration: 400, eut: 32, nbt: '{GunCurrentAmmoCount:30,GunFireMode:"AUTO",GunId:"ww:stg44",HasBulletInBarrel:1b}' },
                { id: 'kubejs:ww_avt40', gear: 1, woodPlate: 2, steelPlate: 5, circuit: 7, duration: 400, eut: 32, nbt: '{GunCurrentAmmoCount:10,GunFireMode:"SEMI",GunId:"ww:avt_40",HasBulletInBarrel:1b}' },
                { id: 'kubejs:ww_g43',   gear: 1, woodPlate: 2, steelPlate: 5, circuit: 8, duration: 400, eut: 32, nbt: '{GunCurrentAmmoCount:10,GunFireMode:"SEMI",GunId:"ww:g43",HasBulletInBarrel:1b}'   },
                { id: 'kubejs:tacz_m870', gear: 1, woodPlate: 2, steelPlate: 5, circuit: 9,  duration: 400, eut: 32, nbt: '{GunCurrentAmmoCount:5,GunFireMode:"SEMI",GunId:"tacz:m870",HasBulletInBarrel:1b}' },
    { id: 'kubejs:ww_m1897', gear: 1, woodPlate: 2, steelPlate: 5, circuit: 10, duration: 400, eut: 32, nbt: '{GunCurrentAmmoCount:5,GunFireMode:"SEMI",GunId:"ww:m1897",HasBulletInBarrel:1b}'  },
    { id: 'kubejs:ww_m1912', gear: 1, woodPlate: 2, steelPlate: 5, circuit: 11, duration: 400, eut: 32, nbt: '{GunCurrentAmmoCount:5,GunFireMode:"SEMI",GunId:"ww:m1912",HasBulletInBarrel:1b}'  },
        { id: 'kubejs:ww_m1918a2', gear: 2, woodPlate: 2, steelPlate: 7, circuit: 12, duration: 400, eut: 32, nbt: '{GunCurrentAmmoCount:5,GunFireMode:"SEMI",GunId:"ww:_m1918a2",HasBulletInBarrel:1b}'  },
        ];

        rifles.forEach(g => {
                event.recipes.gtceu.assembler(g.id)
                .itemInputs(
                        Item.of('gtceu:small_steel_gear', g.gear),
                            Item.of('gtceu:treated_wood_plate', g.woodPlate),
                            Item.of('gtceu:steel_plate', g.steelPlate)
                )
                .itemOutputs(Item.of('tacz:modern_kinetic_gun', 1, g.nbt))
                .circuit(g.circuit)
                .duration(g.duration)
                .EUt(g.eut);
        });

        //LMG


        // MLRS
        event.recipes.gtceu.assembler('kubejs:mlrs')
        .itemInputs(
                Item.of('kubejs:heavy_barrel_steel', 3),
                    Item.of('gtceu:treated_wood_plate', 2),
                    Item.of('gtceu:small_steel_spring')
        )
        .circuit(2)
        .itemOutputs(Item.of('superbwarfare:container', 1, '{BlockEntityTag:{EntityType:"superbwarfare:type_63"}}'))
        .duration(400)
        .EUt(16);

        // Mortar removals
        event.remove({ output: 'superbwarfare:mortar_deployer' })
        event.remove({ output: 'superbwarfare:mortar_barrel' })
        event.remove({ output: 'superbwarfare:mortar_base_plate' })
        event.remove({ output: 'superbwarfare:mortar_bipod' })

        // Mortar deployer
        event.recipes.gtceu.assembler('kubejs:mortard')
        .itemInputs(
                Item.of('superbwarfare:mortar_bipod'),
                    Item.of('superbwarfare:mortar_base_plate'),
                    Item.of('superbwarfare:mortar_barrel')
        )
        .itemOutputs(Item.of('superbwarfare:mortar_deployer'))
        .duration(400)
        .EUt(16);

        // Mortar barrel
        event.recipes.gtceu.arc_furnace('kubejs:mortar_barrel')
        .itemInputs(
                Item.of('kubejs:barrel_steel', 2),
                    Item.of('#forge:dyes/green')
        )
        .itemOutputs(Item.of('superbwarfare:mortar_barrel'))
        .inputFluids('gtceu:oxygen 250')
        .duration(400)
        .EUt(30);

        // Mortar base plate
        event.recipes.gtceu.arc_furnace('kubejs:mortar_base')
        .itemInputs(
                Item.of('gtceu:double_steel_plate'),
                    Item.of('#forge:dyes/green')
        )
        .itemOutputs(Item.of('superbwarfare:mortar_base_plate'))
        .inputFluids('gtceu:oxygen 250')
        .duration(400)
        .EUt(30);

        // Mortar bipod
        event.recipes.gtceu.arc_furnace('kubejs:mortar_bipod')
        .itemInputs(
                Item.of('gtceu:steel_rod', 2),
                    Item.of('gtceu:small_steel_gear'),
                    Item.of('#forge:dyes/green')
        )
        .itemOutputs(Item.of('superbwarfare:mortar_bipod'))
        .inputFluids('gtceu:oxygen 250')
        .duration(400)
        .EUt(30);

        // Mortar shells now live in ../guns/ammo.js (all ammo is consolidated there).

        // =========================
        // GUNS - progression brief implementation (warfactory-lite-gun-progression-notes.md)
        // LV = WW1/WW2 era. Circuits are per-array, not global.
        // =========================

    // WW-era pistols (Type 14 Nambu, S1100)
    const wwPistols = [
        { nbt: '{GunCurrentAmmoCount:16,GunFireMode:"SEMI",GunId:"ww:s1100",HasBulletInBarrel:1b}', circuit: 1 },
        { nbt: '{GunCurrentAmmoCount:4,GunFireMode:"SEMI",GunId:"ww:t14",HasBulletInBarrel:1b}', circuit: 2 },
    ];
    wwPistols.forEach(g => {
        event.remove({ output: Item.of('tacz:modern_kinetic_gun', g.nbt) });
        event.recipes.gtceu.assembler(`ww_pistol_${g.circuit}`)
        .itemInputs(
            Item.of('gtceu:steel_plate', 2),
                    Item.of('gtceu:small_steel_gear', 1),
                    Item.of('gtceu:steel_screw', 1)
        )
        .itemOutputs(Item.of('tacz:modern_kinetic_gun', 1, g.nbt))
        .circuit(g.circuit)
        .duration(200)
        .EUt(32);
    });

    // WW-era SMGs (stamped steel + wood)
    const wwSmgs2 = [
        { nbt: '{GunCurrentAmmoCount:10,GunFireMode:"SEMI",GunId:"ww:m1928a1",HasBulletInBarrel:1b}', circuit: 1 },
        { nbt: '{GunCurrentAmmoCount:16,GunFireMode:"SEMI",GunId:"ww:mp34",HasBulletInBarrel:1b}', circuit: 2 },
        { nbt: '{GunCurrentAmmoCount:16,GunFireMode:"SEMI",GunId:"ww:mp40",HasBulletInBarrel:1b}', circuit: 3 },
        { nbt: '{GunCurrentAmmoCount:16,GunFireMode:"SEMI",GunId:"ww:sten",HasBulletInBarrel:1b}', circuit: 4 },
    ];
    wwSmgs2.forEach(g => {
        event.remove({ output: Item.of('tacz:modern_kinetic_gun', g.nbt) });
        event.recipes.gtceu.assembler(`ww_smg2_${g.circuit}`)
        .itemInputs(
            Item.of('gtceu:steel_plate', 5),
                    Item.of('gtceu:small_steel_gear', 1),
                    Item.of('gtceu:treated_wood_plate', 2)
        )
        .itemOutputs(Item.of('tacz:modern_kinetic_gun', 1, g.nbt))
        .circuit(g.circuit)
        .duration(400)
        .EUt(32);
    });

    // WW-era rifles
    const wwRifles2 = [
        { nbt: '{GunCurrentAmmoCount:15,GunFireMode:"SEMI",GunId:"ww:as44",HasBulletInBarrel:1b}', circuit: 1 },
    ];
    wwRifles2.forEach(g => {
        event.remove({ output: Item.of('tacz:modern_kinetic_gun', g.nbt) });
        event.recipes.gtceu.assembler(`ww_rifle2_${g.circuit}`)
        .itemInputs(
            Item.of('gtceu:steel_plate', 5),
                    Item.of('gtceu:small_steel_gear', 1),
                    Item.of('gtceu:treated_wood_plate', 2)
        )
        .itemOutputs(Item.of('tacz:modern_kinetic_gun', 1, g.nbt))
        .circuit(g.circuit)
        .duration(400)
        .EUt(32);
    });

    // WW-era machine guns - contemporary with the rest of LV, not modern belt-feds. Costs more than a rifle, same tier.
    const wwMachineGuns = [
        { nbt: '{GunCurrentAmmoCount:23,GunFireMode:"AUTO",GunId:"ww:dp28",HasBulletInBarrel:1b}', circuit: 1 },
        { nbt: '{GunCurrentAmmoCount:125,GunFireMode:"AUTO",GunId:"ww:m1919",HasBulletInBarrel:1b}', circuit: 2 },
        { nbt: '{GunCurrentAmmoCount:25,GunFireMode:"SEMI",GunId:"ww:mg42",HasBulletInBarrel:1b}', circuit: 3 },
        { nbt: '{GunCurrentAmmoCount:15,GunFireMode:"SEMI",GunId:"ww:t99",HasBulletInBarrel:1b}', circuit: 4 },
    ];
    wwMachineGuns.forEach(g => {
        event.remove({ output: Item.of('tacz:modern_kinetic_gun', g.nbt) });
        event.recipes.gtceu.assembler(`ww_mg_${g.circuit}`)
        .itemInputs(
            Item.of('gtceu:steel_plate', 8),
                    Item.of('gtceu:small_steel_gear', 2),
                    Item.of('gtceu:treated_wood_plate', 2)
        )
        .itemOutputs(Item.of('tacz:modern_kinetic_gun', 1, g.nbt))
        .circuit(g.circuit)
        .duration(600)
        .EUt(32);
    });

    // Classic break-action double-barrel shotguns - just-past-musket-era design
    const classicShotguns = [
        { nbt: '{GunCurrentAmmoCount:1,GunFireMode:"SEMI",GunId:"tacz:db_long",HasBulletInBarrel:1b}', circuit: 1 },
        { nbt: '{GunCurrentAmmoCount:1,GunFireMode:"SEMI",GunId:"tacz:db_short",HasBulletInBarrel:1b}', circuit: 2 },
    ];
    classicShotguns.forEach(g => {
        event.remove({ output: Item.of('tacz:modern_kinetic_gun', g.nbt) });
        event.recipes.gtceu.assembler(`classic_shotgun_${g.circuit}`)
        .itemInputs(
            Item.of('gtceu:steel_plate', 3),
                    Item.of('gtceu:treated_wood_plate', 3),
                    Item.of('gtceu:small_steel_gear', 1)
        )
        .itemOutputs(Item.of('tacz:modern_kinetic_gun', 1, g.nbt))
        .circuit(g.circuit)
        .duration(300)
        .EUt(32);
    });
})
