import com.norwood.wfcore.integration.kubejs;
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

        // Mortar shell
        event.recipes.gtceu.ammo_press('kubejs:mortar')
        .itemInputs(
                Item.of('minecraft:gunpowder'),
                    Item.of('gtceu:steel_plate')
        )
        .itemOutputs(Item.of('superbwarfare:mortar_shell', 4))
        .duration(40)
        .EUt(30);
})
