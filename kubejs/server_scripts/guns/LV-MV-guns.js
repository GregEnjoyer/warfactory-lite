ServerEvents.recipes(event => {

    // Lock each gun's crafting recipe behind its own research node
    // (wfcore/research/infantry.js). Node id = 'inf_' + the GunId short name.
    const gateGun = (recipe, nbt) => {
        const m = /GunId:"[^:"]+:([^"]+)"/.exec(nbt);
        if (m) recipe.addCondition(WFResearch.condition('inf_' + m[1]));
        return recipe;
    };

    const LVSHOTGUN = [
        {
            id: 'tacz:modern_kinetic_gun',
            nbt: '{GunCurrentAmmoCount:2,GunId:"tacz:db_long",HasBulletInBarrel:1b}',
            circuit: 1,
            ingredients: [
                Item.of('gtceu:treated_wood_plate', 2), Item.of('kubejs:barrel_steel', 2) ]
        },
        {
            id: 'tacz:modern_kinetic_gun',
            nbt: '{GunCurrentAmmoCount:2,GunId:"ww:m1897",HasBulletInBarrel:1b}',
            circuit: 2,
            ingredients: [
                Item.of('gtceu:treated_wood_plate', 2), Item.of('kubejs:barrel_steel', 2), 'gtceu:small_steel_gear' ]
        },
        {
            id: 'tacz:modern_kinetic_gun',
            nbt: '{GunCurrentAmmoCount:2,GunId:"tacz:m870",HasBulletInBarrel:1b}',
            circuit: 3,
            ingredients: [
                Item.of('gtceu:treated_wood_plate', 2), Item.of('kubejs:barrel_steel', 2), 'gtceu:small_steel_gear' ]
        },
    ];

    LVSHOTGUN.forEach((gun, i) => {
        event.remove({ output: Item.of(gun.id, gun.nbt) });
        gateGun(event.recipes.gtceu.assembler(`ecwrifles_lvshotgun_${i}`)
        .itemInputs(gun.ingredients)
        .itemOutputs(Item.of(gun.id, gun.nbt))
        .circuit(gun.circuit)
        .duration(20)
        .EUt(32), gun.nbt);
    });

    const LVRIFLE = [
        {
            id: 'tacz:modern_kinetic_gun',
            nbt: '{GunCurrentAmmoCount:2,GunId:"ww:m1g",HasBulletInBarrel:1b}',
            circuit: 4,
            ingredients: [
                Item.of('gtceu:treated_wood_plate', 2), Item.of('kubejs:barrel_steel', 1), 'gtceu:small_steel_gear']
        },
        {
            id: 'tacz:modern_kinetic_gun',
            nbt: '{GunCurrentAmmoCount:2,GunId:"ww:g43",HasBulletInBarrel:1b}',
            circuit: 7,
            ingredients: [
                Item.of('gtceu:treated_wood_plate', 2), Item.of('kubejs:barrel_steel', 1), 'gtceu:small_steel_gear']
        },
        {
            id: 'tacz:modern_kinetic_gun',
            nbt: '{GunCurrentAmmoCount:2,GunId:"ww:svt_40",HasBulletInBarrel:1b}',
            circuit: 5,
            ingredients: [
                Item.of('gtceu:treated_wood_plate', 2), Item.of('kubejs:barrel_steel', 1), 'gtceu:small_steel_gear']
        },
        {
            id: 'tacz:modern_kinetic_gun',
            nbt: '{GunCurrentAmmoCount:2,GunId:"ww:m1",HasBulletInBarrel:1b}',
            circuit: 6,
            ingredients: [
                Item.of('gtceu:treated_wood_plate', 2), Item.of('kubejs:barrel_steel', 1), 'gtceu:small_steel_gear']
        },
    ];

    LVRIFLE.forEach((gun, i) => {
        event.remove({ output: Item.of(gun.id, gun.nbt) });
        gateGun(event.recipes.gtceu.assembler(`ecwrifles_lvrifle_${i}`)
        .itemInputs(gun.ingredients)
        .itemOutputs(Item.of(gun.id, gun.nbt))
        .circuit(gun.circuit)
        .duration(20)
        .EUt(32), gun.nbt);
    });

    const LVSMG = [
        {
            id: 'tacz:modern_kinetic_gun',
            nbt: '{GunCurrentAmmoCount:2,GunId:"ww:pps",HasBulletInBarrel:1b}',
            circuit: 20,
            ingredients: [
                Item.of('gtceu:steel_plate', 2), Item.of('kubejs:barrel_steel', 1), 'gtceu:small_steel_gear']
        },
        {
            id: 'tacz:modern_kinetic_gun',
            nbt: '{GunCurrentAmmoCount:2,GunId:"ww:m1a1",HasBulletInBarrel:1b}',
            circuit: 21,
            ingredients: [
                Item.of('gtceu:steel_plate', 2), Item.of('kubejs:barrel_steel', 1), 'gtceu:small_steel_gear']
        },
        {
            id: 'tacz:modern_kinetic_gun',
            nbt: '{GunCurrentAmmoCount:2,GunId:"ww:mp38",HasBulletInBarrel:1b}',
            circuit: 22,
            ingredients: [
                Item.of('gtceu:steel_plate', 2), Item.of('kubejs:barrel_steel', 1), 'gtceu:small_steel_gear']
        },
        {
            id: 'tacz:modern_kinetic_gun',
            nbt: '{GunCurrentAmmoCount:2,GunId:"ww:t100l",HasBulletInBarrel:1b}',
            circuit: 23,
            ingredients: [
                Item.of('gtceu:steel_plate', 2), Item.of('gtceu:treated_wood_plate', 2), Item.of('kubejs:barrel_steel',1),'gtceu:small_steel_gear']
        },
        {
            id: 'tacz:modern_kinetic_gun',
            nbt: '{GunCurrentAmmoCount:2,GunId:"ww:sten",HasBulletInBarrel:1b}',
            circuit: 24,
            ingredients: [
                Item.of('gtceu:steel_plate', 2), Item.of('kubejs:barrel_steel', 1), 'gtceu:small_steel_gear']
        },
    ];

    LVSMG.forEach((gun, i) => {
        event.remove({ output: Item.of(gun.id, gun.nbt) });
        gateGun(event.recipes.gtceu.assembler(`ecwsmglvsmg_${i}`)
        .itemInputs(gun.ingredients)
        .itemOutputs(Item.of(gun.id, gun.nbt))
        .circuit(gun.circuit)
        .duration(20)
        .EUt(32), gun.nbt);
    });

    const MVRIFLEWOOD = [
        {
            id: 'tacz:modern_kinetic_gun',
            nbt: '{GunCurrentAmmoCount:2,GunId:"tacz:fn_fal",HasBulletInBarrel:1b}',
            circuit: 11,
            ingredients: [
                Item.of('gtceu:aluminium_plate', 2), Item.of('gtceu:treated_wood_plate', 2), Item.of('kubejs:barrel_steel', 1), Item.of('gtceu:small_aluminium_gear', 4)]
        },
        {
            id: 'tacz:modern_kinetic_gun',
            nbt: '{GunCurrentAmmoCount:2,GunId:"tacz:type_81",HasBulletInBarrel:1b}',
            circuit: 12,
            ingredients: [
                Item.of('gtceu:aluminium_plate', 2), Item.of('gtceu:treated_wood_plate', 2), Item.of('kubejs:barrel_steel', 1), Item.of('gtceu:small_aluminium_gear', 4)]
        },
        {
            id: 'tacz:modern_kinetic_gun',
            nbt: '{GunCurrentAmmoCount:2,GunId:"tacz:ak47",HasBulletInBarrel:1b}',
            circuit: 13,
            ingredients: [
                Item.of('gtceu:aluminium_plate', 2), Item.of('gtceu:treated_wood_plate', 2), Item.of('kubejs:barrel_steel', 1), Item.of('gtceu:small_aluminium_gear', 4)]
        },
    ];

    MVRIFLEWOOD.forEach((gun, i) => {
        event.remove({ output: Item.of(gun.id, gun.nbt) });
        gateGun(event.recipes.gtceu.assembler(`ecwrifles_mvriflewood_${i}`)
        .itemInputs(gun.ingredients)
        .itemOutputs(Item.of(gun.id, gun.nbt))
        .circuit(gun.circuit)
        .duration(20)
        .EUt(128), gun.nbt);
    });

    const MVRIFLE = [
        {
            id: 'tacz:modern_kinetic_gun',
            nbt: '{GunCurrentAmmoCount:2,GunId:"tacz:m4a1",HasBulletInBarrel:1b}',
            circuit: 1,
            ingredients: [
                Item.of('gtceu:aluminium_plate', 2), Item.of('gtceu:polyethylene_plate', 2), Item.of('kubejs:barrel_steel', 1), Item.of('gtceu:small_aluminium_gear', 4)]
        },
        {
            id: 'tacz:modern_kinetic_gun',
            nbt: '{GunCurrentAmmoCount:2,GunId:"ronmc:ga416",HasBulletInBarrel:1b}',
            circuit: 2,
            ingredients: [
                Item.of('gtceu:aluminium_plate', 2), Item.of('gtceu:polyethylene_plate', 2), Item.of('kubejs:barrel_steel', 1), Item.of('gtceu:small_aluminium_gear', 4)]
        },
        {
            id: 'tacz:modern_kinetic_gun',
            nbt: '{GunCurrentAmmoCount:2,GunId:"tacz:scar_l",HasBulletInBarrel:1b}',
            circuit: 3,
            ingredients: [
                Item.of('gtceu:aluminium_plate', 2), Item.of('gtceu:polyethylene_plate', 2), Item.of('kubejs:barrel_steel', 1), Item.of('gtceu:small_aluminium_gear', 4)]
        },
        {
            id: 'tacz:modern_kinetic_gun',
            nbt: '{GunCurrentAmmoCount:2,GunId:"tacz:hk_g3",HasBulletInBarrel:1b}',
            circuit: 4,
            ingredients: [
                Item.of('gtceu:aluminium_plate', 2), Item.of('gtceu:polyethylene_plate', 2), Item.of('kubejs:barrel_steel', 1), Item.of('gtceu:small_aluminium_gear', 4)]
        },
        {
            id: 'tacz:modern_kinetic_gun',
            nbt: '{GunCurrentAmmoCount:2,GunId:"ronmc:g36c",HasBulletInBarrel:1b}',
            circuit: 5,
            ingredients: [
                Item.of('gtceu:aluminium_plate', 2), Item.of('gtceu:polyethylene_plate', 2), Item.of('kubejs:barrel_steel', 1), Item.of('gtceu:small_aluminium_gear', 4)]
        },
        {
            id: 'tacz:modern_kinetic_gun',
            nbt: '{GunCurrentAmmoCount:2,GunId:"tacz:aug",HasBulletInBarrel:1b}',
            circuit: 6,
            ingredients: [
                Item.of('gtceu:aluminium_plate', 2), Item.of('gtceu:polyethylene_plate', 2), Item.of('kubejs:barrel_steel', 1), Item.of('gtceu:small_aluminium_gear', 4)]
        },
        {
            id: 'tacz:modern_kinetic_gun',
            nbt: '{GunCurrentAmmoCount:2,GunId:"tacz:m16a1",HasBulletInBarrel:1b}',
            circuit: 7,
            ingredients: [
                Item.of('gtceu:aluminium_plate', 2), Item.of('gtceu:polyethylene_plate', 2), Item.of('kubejs:barrel_steel', 1), Item.of('gtceu:small_aluminium_gear', 4)]
        },
    ];

    MVRIFLE.forEach((gun, i) => {
        event.remove({ output: Item.of(gun.id, gun.nbt) });
        gateGun(event.recipes.gtceu.assembler(`ecwrifles_mvrifle_${i}`)
        .itemInputs(gun.ingredients)
        .itemOutputs(Item.of(gun.id, gun.nbt))
        .circuit(gun.circuit)
        .duration(20)
        .EUt(128), gun.nbt);
    });

    const MVMG = [
        {
            id: 'tacz:modern_kinetic_gun',
            nbt: '{GunCurrentAmmoCount:2,GunId:"tacz:m249",HasBulletInBarrel:1b}',
            circuit: 1,
            ingredients: [
                Item.of('gtceu:aluminium_plate', 4), Item.of('gtceu:polyethylene_plate', 12), Item.of('kubejs:barrel_steel', 1), Item.of('gtceu:small_aluminium_gear', 6)]
        },
        {
            id: 'tacz:modern_kinetic_gun',
            nbt: '{GunCurrentAmmoCount:2,GunId:"ww:mg42",HasBulletInBarrel:1b}',
            circuit: 2,
            ingredients: [
                Item.of('gtceu:aluminium_plate', 4), Item.of('gtceu:treated_wood_plate', 12), Item.of('kubejs:barrel_steel', 1), Item.of('gtceu:small_aluminium_gear', 6)]
        },
        {
            id: 'tacz:modern_kinetic_gun',
            nbt: '{GunCurrentAmmoCount:2,GunId:"ww:mg34",HasBulletInBarrel:1b}',
            circuit: 3,
            ingredients: [
                Item.of('gtceu:aluminium_plate', 4), Item.of('gtceu:treated_wood_plate', 12), Item.of('kubejs:barrel_steel', 1), Item.of('gtceu:small_aluminium_gear', 6)]
        },
        {
            id: 'tacz:modern_kinetic_gun',
            nbt: '{GunCurrentAmmoCount:2,GunId:"ww:m1918a2",HasBulletInBarrel:1b}',
            circuit: 4,
            ingredients: [
                Item.of('gtceu:aluminium_plate', 2), Item.of('gtceu:treated_wood_plate', 8), Item.of('kubejs:barrel_steel', 1), Item.of('gtceu:small_aluminium_gear', 4)]
        },
        {
            id: 'tacz:modern_kinetic_gun',
            nbt: '{GunCurrentAmmoCount:2,GunId:"ww:dp28",HasBulletInBarrel:1b}',
            circuit: 5,
            ingredients: [
                Item.of('gtceu:aluminium_plate', 4), Item.of('gtceu:treated_wood_plate', 12), Item.of('kubejs:barrel_steel', 1), Item.of('gtceu:small_aluminium_gear', 6)]
        },
        {
            id: 'tacz:modern_kinetic_gun',
            nbt: '{GunCurrentAmmoCount:2,GunId:"tacz:rpk",HasBulletInBarrel:1b}',
            circuit: 6,
            ingredients: [
                Item.of('gtceu:aluminium_plate', 4), Item.of('gtceu:treated_wood_plate', 12), Item.of('kubejs:barrel_steel', 1), Item.of('gtceu:small_aluminium_gear', 6)]
        },
    ];

    MVMG.forEach((gun, i) => {
        event.remove({ output: Item.of(gun.id, gun.nbt) });
        gateGun(event.recipes.gtceu.assembler(`ecwrifles_mvmg_${i}`)
        .itemInputs(gun.ingredients)
        .itemOutputs(Item.of(gun.id, gun.nbt))
        .circuit(gun.circuit)
        .duration(20)
        .EUt(128), gun.nbt);
    });

});
