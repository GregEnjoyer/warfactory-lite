 ServerEvents.recipes(event => {
    const ECWRIFLES = [
        {
            id: 'tacz:modern_kinetic_gun',
            nbt: '{GunCurrentAmmoCount:0,GunFireMode:"AUTO",GunId:"tacz:fn_fal",HasBulletInBarrel:0b}',
            circuit: 1,
            ingredients: [
                Item.of('gtceu:treated_wood_plate', 4),'kubejs:barrel_steel', 'gtceu:steel_gear' ]
        },
        {
            id: 'tacz:modern_kinetic_gun',
            nbt: '{GunCurrentAmmoCount:0,GunFireMode:"SEMI",GunId:"tacz:m700",HasBulletInBarrel:0b}',
            circuit: 2,
            ingredients: [
                Item.of('gtceu:polyethylene_plate', 6),'kubejs:barrel_steel', 'gtceu:steel_gear' ]
        },
        {
            id: 'tacz:modern_kinetic_gun',
            nbt: '{GunCurrentAmmoCount:0,GunFireMode:"AUTO",GunId:"tacz:m16a1",HasBulletInBarrel:0b}',
            circuit: 3,
            ingredients: [
                Item.of('gtceu:polyethylene_plate', 4),'kubejs:barrel_steel', 'gtceu:steel_gear']
        },
        {
            id: 'tacz:modern_kinetic_gun',
            nbt: '{GunCurrentAmmoCount:0,GunFireMode:"BURST",GunId:"tacz:m16a4",HasBulletInBarrel:0b}',
            circuit: 4,
            ingredients: [
                Item.of('gtceu:polyethylene_plate', 4),'kubejs:barrel_steel', 'gtceu:steel_gear' ]
        },
        {
            id: 'tacz:modern_kinetic_gun',
            nbt: '{GunCurrentAmmoCount:0,GunFireMode:"AUTO",GunId:"tacz:type_81",HasBulletInBarrel:0b}',
            circuit: 5,
            ingredients: [
                Item.of('gtceu:treated_wood_plate', 4),'kubejs:barrel_steel', 'gtceu:steel_gear' ]
        },
        {
            id: 'tacz:modern_kinetic_gun',
            nbt: '{GunCurrentAmmoCount:0,GunFireMode:"SEMI",GunId:"tacz:sks_tactical",HasBulletInBarrel:0b}',
            circuit: 6,
            ingredients: [
                Item.of('gtceu:polyethylene_plate', 4),'kubejs:barrel_steel', 'gtceu:steel_gear' ]
        },
    ];

    ECWRIFLES.forEach(gun => {
        event.remove({ output: Item.of(gun.id, gun.nbt) });
        event.recipes.gtceu.assembler(`ECWRIFLES_${gun.circuit}`)
        .itemInputs(gun.ingredients)
        .itemOutputs(Item.of(gun.id, gun.nbt))
        .circuit(gun.circuit)
        .duration(20)
        .addCondition(WFResearch.condition('guns1'))
        .EUt(4);
    });

    const ECWPISTOLS = [
        {
            id: 'tacz:modern_kinetic_gun',
            nbt: '{GunCurrentAmmoCount:15,GunFireMode:"SEMI",GunId:"ronmc:b92x",HasBulletInBarrel:1b}',
            circuit: 7,
            ingredients: [
                Item.of('gtceu:polyethylene_plate', 2),'kubejs:barrel_steel', 'gtceu:small_steel_gear' ]
        },
        {
            id: 'tacz:modern_kinetic_gun',
            nbt: '{GunCurrentAmmoCount:16,GunFireMode:"AUTO",GunId:"tacz:cz75",HasBulletInBarrel:1b}',
            circuit: 8,
            ingredients: [
                Item.of('gtceu:polyethylene_plate', 2),'kubejs:barrel_steel', 'gtceu:small_steel_gear' ]
        },


    ];

    ECWPISTOLS.forEach(gun => {
        event.remove({ output: Item.of(gun.id, gun.nbt) });
        event.recipes.gtceu.assembler(`ECWPISTOLS_${gun.circuit}`)
        .itemInputs(gun.ingredients)
        .itemOutputs(Item.of(gun.id, gun.nbt))
        .circuit(gun.circuit)
        .duration(20)
        .addCondition(WFResearch.condition('guns2'))
        .EUt(4);
    });
    const ECWSHOTGUNS  = [
        {
            id: 'tacz:modern_kinetic_gun',
            nbt: '{GunCurrentAmmoCount:7,GunFireMode:"SEMI",GunId:"ronmc:m1014",HasBulletInBarrel:1b}',
            circuit: 10,
            ingredients: [
                Item.of('gtceu:treated_wood_plate', 2),'kubejs:barrel_steel', 'gtceu:small_steel_gear' ]
        },
        {
            id: 'tacz:modern_kinetic_gun',
            nbt: '{GunCurrentAmmoCount:16,GunFireMode:"AUTO",GunId:"tacz:spas_1",HasBulletInBarrel:1b}',
            circuit: 11,
            ingredients: [
                Item.of('gtceu:polyethylene_plate', 2),'kubejs:barrel_steel', 'gtceu:small_steel_gear' ]
        },

        {
            id: 'tacz:modern_kinetic_gun',
            nbt: '{GunCurrentAmmoCount:4,GunFireMode:"SEMI",GunId:"tacz:m1014",HasBulletInBarrel:1b}',
            circuit: 12,
            ingredients: [
                Item.of('gtceu:polyethylene_plate', 2),'kubejs:barrel_steel', 'gtceu:small_steel_gear' ]
        },

        {
            id: 'tacz:modern_kinetic_gun',
            nbt: '{GunCurrentAmmoCount:4,GunFireMode:"SEMI",GunId:"ronmc:entryman",HasBulletInBarrel:1b}',
            circuit: 13,
            ingredients: [
                Item.of('gtceu:polyethylene_plate', 2),'kubejs:barrel_steel', 'gtceu:small_steel_gear' ]
        },

        {
            id: 'tacz:modern_kinetic_gun',
            nbt: '{GunCurrentAmmoCount:4,GunFireMode:"SEMI",GunId:"ronmc:590m",HasBulletInBarrel:1b}',
            circuit: 14,
            ingredients: [
                Item.of('gtceu:polyethylene_plate', 2),'kubejs:barrel_steel', 'gtceu:small_steel_gear' ]
        },

        {
            id: 'tacz:modern_kinetic_gun',
            nbt: '{GunCurrentAmmoCount:4,GunFireMode:"SEMI",GunId:"ronmc:870cq",HasBulletInBarrel:1b}',
            circuit: 15,
            ingredients: [
                Item.of('gtceu:polyethylene_plate', 2),'kubejs:barrel_steel', 'gtceu:small_steel_gear' ]
        },

        {
            id: 'tacz:modern_kinetic_gun',
            nbt: '{GunCurrentAmmoCount:4,GunFireMode:"SEMI",GunId:"ronmc:870cq",HasBulletInBarrel:1b}',
            circuit: 16,
            ingredients: [
                Item.of('gtceu:polyethylene_plate', 2),'kubejs:barrel_steel', 'gtceu:small_steel_gear' ]
        },

    ];

    ECWSHOTGUNS.forEach(gun => {
        event.remove({ output: Item.of(gun.id, gun.nbt) });
        event.recipes.gtceu.assembler(`ECWSHOTGUNS_${gun.circuit}`)
        .itemInputs(gun.ingredients)
        .itemOutputs(Item.of(gun.id, gun.nbt))
        .circuit(gun.circuit)
        .duration(20)
        .addCondition(WFResearch.condition('guns2heavy'))
        .EUt(4);
    });

    const MODERNRIFLES = [
        {
            id: 'tacz:modern_kinetic_gun',
            nbt: '{GunCurrentAmmoCount:30,GunFireMode:"AUTO",GunId:"ronmc:mk18",HasBulletInBarrel:1b}',
            circuit: 1,
            ingredients: [
                Item.of('gtceu:polytetrafluoroethylene_plate', 2),'kubejs:barrel_steel', 'gtceu:stainless_steel_gear' ]
        },
        {
            id: 'tacz:modern_kinetic_gun',
            nbt: '{GunCurrentAmmoCount:16,GunFireMode:"AUTO",GunId:"tacz:scarh",HasBulletInBarrel:1b}',
            circuit: 2,
            ingredients: [
                Item.of('gtceu:polyethylene_plate', 2),'kubejs:barrel_steel', 'gtceu:small_steel_gear' ]
        },

        {
            id: 'tacz:modern_kinetic_gun',
            nbt: '{GunCurrentAmmoCount:4,GunFireMode:"SEMI",GunId:"tacz:scarl",HasBulletInBarrel:1b}',
            circuit: 21,
            ingredients: [
                Item.of('gtceu:polyethylene_plate', 2),'kubejs:barrel_steel', 'gtceu:small_steel_gear' ]
        },
        {
            id: 'tacz:modern_kinetic_gun',
            nbt: '{GunCurrentAmmoCount:4,GunFireMode:"SEMI",GunId:"tacz:hk416",HasBulletInBarrel:1b}',
            circuit: 3,
            ingredients: [
                Item.of('gtceu:polyethylene_plate', 2),'kubejs:barrel_steel', 'gtceu:small_steel_gear' ]
        },
        {
            id: 'tacz:modern_kinetic_gun',
            nbt: '{GunCurrentAmmoCount:4,GunFireMode:"SEMI",GunId:"tacz:qbz_9",HasBulletInBarrel:1b}',
            circuit: 4,
            ingredients: [
                Item.of('gtceu:polyethylene_plate', 2),'kubejs:barrel_steel', 'gtceu:small_steel_gear' ]
        },
        {
            id: 'tacz:modern_kinetic_gun',
            nbt: '{GunCurrentAmmoCount:4,GunFireMode:"SEMI",GunId:"tacz:g36k",HasBulletInBarrel:1b}',
            circuit: 5,
            ingredients: [
                Item.of('gtceu:polyethylene_plate', 2),'kubejs:barrel_steel', 'gtceu:small_steel_gear' ]
        },
        {
            id: 'tacz:modern_kinetic_gun',
            nbt: '{GunCurrentAmmoCount:4,GunFireMode:"SEMI",GunId:"tacz:qbz_1",HasBulletInBarrel:1b}',
            circuit: 6,
            ingredients: [
                Item.of('gtceu:polyethylene_plate', 2),'kubejs:barrel_steel', 'gtceu:small_steel_gear' ]
        },
        {
            id: 'tacz:modern_kinetic_gun',
            nbt: '{GunCurrentAmmoCount:4,GunFireMode:"SEMI",GunId:"tacz:m4a1",HasBulletInBarrel:1b}',
            circuit: 7,
            ingredients: [
                Item.of('gtceu:polyethylene_plate', 2),'kubejs:barrel_steel', 'gtceu:small_steel_gear' ]
        },
        {
            id: 'tacz:modern_kinetic_gun',
            nbt: '{GunCurrentAmmoCount:4,GunFireMode:"SEMI",GunId:"romc:lvar",HasBulletInBarrel:1b}',
            circuit: 8,
            ingredients: [
                Item.of('gtceu:polyethylene_plate', 2),'kubejs:barrel_steel', 'gtceu:small_steel_gear' ]
        },
        {
            id: 'tacz:modern_kinetic_gun',
            nbt: '{GunCurrentAmmoCount:4,GunFireMode:"SEMI",GunId:"romc:g3a3",HasBulletInBarrel:1b}',
            circuit: 9,
            ingredients: [
                Item.of('gtceu:polyethylene_plate', 2),'kubejs:barrel_steel', 'gtceu:small_steel_gear' ]
        },
        {
            id: 'tacz:modern_kinetic_gun',
            nbt: '{GunCurrentAmmoCount:4,GunFireMode:"SEMI",GunId:"romc:rtwc",HasBulletInBarrel:1b}',
            circuit: 10,
            ingredients: [
                Item.of('gtceu:polyethylene_plate', 2),'kubejs:barrel_steel', 'gtceu:small_steel_gear' ]
        },
        {
            id: 'tacz:modern_kinetic_gun',
            nbt: '{GunCurrentAmmoCount:4,GunFireMode:"SEMI",GunId:"romc:m14",HasBulletInBarrel:1b}',
            circuit: 11,
            ingredients: [
                Item.of('gtceu:polyethylene_plate', 2),'kubejs:barrel_steel', 'gtceu:small_steel_gear' ]
        },
        {
            id: 'tacz:modern_kinetic_gun',
            nbt: '{GunCurrentAmmoCount:4,GunFireMode:"SEMI",GunId:"romc:mk18",HasBulletInBarrel:1b}',
            circuit: 12,
            ingredients: [
                Item.of('gtceu:polyethylene_plate', 2),'kubejs:barrel_steel', 'gtceu:small_steel_gear' ]
        },
        {
            id: 'tacz:modern_kinetic_gun',
            nbt: '{GunCurrentAmmoCount:4,GunFireMode:"SEMI",GunId:"romc:mk17",HasBulletInBarrel:1b}',
            circuit: 13,
            ingredients: [
                Item.of('gtceu:polyethylene_plate', 2),'kubejs:barrel_steel', 'gtceu:small_steel_gear' ]
        },
        {
            id: 'tacz:modern_kinetic_gun',
            nbt: '{GunCurrentAmmoCount:4,GunFireMode:"SEMI",GunId:"romc:mk16",HasBulletInBarrel:1b}',
            circuit: 14,
            ingredients: [
                Item.of('gtceu:polyethylene_plate', 2),'kubejs:barrel_steel', 'gtceu:small_steel_gear' ]
        },
        {
            id: 'tacz:modern_kinetic_gun',
            nbt: '{GunCurrentAmmoCount:4,GunFireMode:"SEMI",GunId:"romc:scarl",HasBulletInBarrel:1b}',
            circuit: 16,
            ingredients: [
                Item.of('gtceu:polyethylene_plate', 2),'kubejs:barrel_steel', 'gtceu:small_steel_gear' ]
        },
        {
            id: 'tacz:modern_kinetic_gun',
            nbt: '{GunCurrentAmmoCount:4,GunFireMode:"SEMI",GunId:"tacz:scarl",HasBulletInBarrel:1b}',
            circuit: 17,
            ingredients: [
                Item.of('gtceu:polyethylene_plate', 2),'kubejs:barrel_steel', 'gtceu:small_steel_gear' ]
        },
        {
            id: 'tacz:modern_kinetic_gun',
            nbt: '{GunCurrentAmmoCount:4,GunFireMode:"SEMI",GunId:"tacz:scarl",HasBulletInBarrel:1b}',
            circuit: 18,
            ingredients: [
                Item.of('gtceu:polyethylene_plate', 2),'kubejs:barrel_steel', 'gtceu:small_steel_gear' ]
        },
        {
            id: 'tacz:modern_kinetic_gun',
            nbt: '{GunCurrentAmmoCount:4,GunFireMode:"SEMI",GunId:"tacz:scarl",HasBulletInBarrel:1b}',
            circuit: 19,
            ingredients: [
                Item.of('gtceu:polyethylene_plate', 2),'kubejs:barrel_steel', 'gtceu:small_steel_gear' ]
        },
        {
            id: 'tacz:modern_kinetic_gun',
            nbt: '{GunCurrentAmmoCount:4,GunFireMode:"SEMI",GunId:"tacz:scarl",HasBulletInBarrel:1b}',
            circuit: 20,
            ingredients: [
                Item.of('gtceu:polyethylene_plate', 2),'kubejs:barrel_steel', 'gtceu:small_steel_gear' ]
        },
    ];

    MODERNRIFLES.forEach(gun => {
        event.remove({ output: Item.of(gun.id, gun.nbt) });
        event.recipes.gtceu.assembler(`MODERNRIFLES_${gun.circuit}`)
        .itemInputs(gun.ingredients)
        .itemOutputs(Item.of(gun.id, gun.nbt))
        .circuit(gun.circuit)
        .duration(20)
        .addCondition(WFResearch.condition('guns2'))
        .EUt(4);
    });

    const MODERNPISTOLS = [
        {
            id: 'tacz:modern_kinetic_gun',
            nbt: '{GunCurrentAmmoCount:8,GunFireMode:"SEMI",GunId:"tacz:timeless50",HasBulletInBarrel:1b}',
            circuit: 1,
            ingredients: [
                Item.of('gtceu:polytetrafluoroethylene_plate', 2),'kubejs:barrel_steel', 'gtceu:stainless_steel_gear' ]
        },
        {
            id: 'tacz:modern_kinetic_gun',
            nbt: '{GunCurrentAmmoCount:16,GunFireMode:"AUTO",GunId:"tacz:scarh",HasBulletInBarrel:1b}',
            circuit: 2,
            ingredients: [
                Item.of('gtceu:polytetrafluoroethylene_plate', 2),'kubejs:barrel_steel', 'gtceu:stainless_steel_gear' ]
        },
        {
            id: 'tacz:modern_kinetic_gun',
            nbt: '{GunCurrentAmmoCount:12,GunFireMode:"SEMI",GunId:"tacz:p320",HasBulletInBarrel:1b}',
            circuit: 3,
            ingredients: [
                Item.of('gtceu:polytetrafluoroethylene_plate', 2),'kubejs:barrel_steel', 'gtceu:stainless_steel_gear' ]
        },
        {
            id: 'tacz:modern_kinetic_gun',
            nbt: '{GunCurrentAmmoCount:9,GunFireMode:"SEMI",GunId:"tacz:deagle_golden",HasBulletInBarrel:1b}',
            circuit: 4,
            ingredients: [
                Item.of('gtceu:polytetrafluoroethylene_plate', 2),'kubejs:barrel_steel', 'gtceu:stainless_steel_gear' ]
        },
        {
            id: 'tacz:modern_kinetic_gun',
            nbt: '{GunCurrentAmmoCount:7,GunFireMode:"SEMI",GunId:"tacz:deagle",HasBulletInBarrel:1b}',
            circuit: 5,
            ingredients: [
                Item.of('gtceu:polytetrafluoroethylene_plate', 2),'kubejs:barrel_steel', 'gtceu:stainless_steel_gear' ]
        },
        {
            id: 'tacz:modern_kinetic_gun',
            nbt: '{GunCurrentAmmoCount:8,GunFireMode:"SEMI",GunId:"ronmc:m45a1",HasBulletInBarrel:1b}',
            circuit: 6,
            ingredients: [
                Item.of('gtceu:polytetrafluoroethylene_plate', 2),'kubejs:barrel_steel', 'gtceu:stainless_steel_gear' ]
        },
        {
            id: 'tacz:modern_kinetic_gun',
            nbt: '{GunCurrentAmmoCount:17,GunFireMode:"SEMI",GunId:"tacz:glock_17",HasBulletInBarrel:1b}',
            circuit: 7,
            ingredients: [
                Item.of('gtceu:polytetrafluoroethylene_plate', 2),'kubejs:barrel_steel', 'gtceu:stainless_steel_gear' ]
        },
        {
            id: 'tacz:modern_kinetic_gun',
            nbt: '{GunCurrentAmmoCount:15,GunFireMode:"SEMI",GunId:"ronmc:m11",HasBulletInBarrel:1b}',
            circuit: 8,
            ingredients: [
                Item.of('gtceu:polytetrafluoroethylene_plate', 2),'kubejs:barrel_steel', 'gtceu:stainless_steel_gear' ]
        },
        {
            id: 'tacz:modern_kinetic_gun',
            nbt: '{GunCurrentAmmoCount:20,GunFireMode:"SEMI",GunId:"ronmc:57usg",HasBulletInBarrel:1b}',
            circuit: 9,
            ingredients: [
                Item.of('gtceu:polytetrafluoroethylene_plate', 2),'kubejs:barrel_steel', 'gtceu:stainless_steel_gear' ]
        },
        {
            id: 'tacz:modern_kinetic_gun',
            nbt: '{GunCurrentAmmoCount:21,GunFireMode:"SEMI",GunId:"ronmc:sti_2011",HasBulletInBarrel:1b}',
            circuit: 10,
            ingredients: [
                Item.of('gtceu:polytetrafluoroethylene_plate', 2),'kubejs:barrel_steel', 'gtceu:stainless_steel_gear' ]
        },
        {
            id: 'tacz:modern_kinetic_gun',
            nbt: '{GunCurrentAmmoCount:8,GunFireMode:"SEMI",GunId:"ronmc:m45a1",HasBulletInBarrel:1b}',
            circuit: 11,
            ingredients: [
                Item.of('gtceu:polytetrafluoroethylene_plate', 2),'kubejs:barrel_steel', 'gtceu:stainless_steel_gear' ]
        },

    ];

    MODERNPISTOLS.forEach(gun => {
        event.remove({ output: Item.of(gun.id, gun.nbt) });
        event.recipes.gtceu.assembler(`MODERNPISTOLS_${gun.circuit}`)
        .itemInputs(gun.ingredients)
        .itemOutputs(Item.of(gun.id, gun.nbt))
        .circuit(gun.circuit)
        .duration(20)
        .addCondition(WFResearch.condition('guns4heavy'))
        .EUt(4);
    });
})
