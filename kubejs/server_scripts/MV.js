ServerEvents.recipes(event => {
    const ECWRIFLES = [
        {
            id: 'tacz:modern_kinetic_gun',
            nbt: '{GunCurrentAmmoCount:0,GunFireMode:"AUTO",GunId:"tacz:fn_fal",HasBulletInBarrel:0b}',
            circuit: 1,
            ingredients: [
                Item.of('gtceu:treated_wood_plate', 4), 'kubejs:barrel_steel', 'gtceu:steel_gear']
        },
        {
            id: 'tacz:modern_kinetic_gun',
            nbt: '{GunCurrentAmmoCount:0,GunFireMode:"SEMI",GunId:"tacz:m700",HasBulletInBarrel:0b}',
            circuit: 2,
            ingredients: [
                Item.of('gtceu:polyethylene_plate', 6), 'kubejs:barrel_steel', 'gtceu:steel_gear']
        },
        {
            id: 'tacz:modern_kinetic_gun',
            nbt: '{GunCurrentAmmoCount:0,GunFireMode:"AUTO",GunId:"tacz:m16a1",HasBulletInBarrel:0b}',
            circuit: 3,
            ingredients: [
                Item.of('gtceu:polyethylene_plate', 4), 'kubejs:barrel_steel', 'gtceu:steel_gear']
        },
        {
            id: 'tacz:modern_kinetic_gun',
            nbt: '{GunCurrentAmmoCount:0,GunFireMode:"BURST",GunId:"tacz:m16a4",HasBulletInBarrel:0b}',
            circuit: 4,
            ingredients: [
                Item.of('gtceu:polyethylene_plate', 4), 'kubejs:barrel_steel', 'gtceu:steel_gear']
        },
        {
            id: 'tacz:modern_kinetic_gun',
            nbt: '{GunCurrentAmmoCount:0,GunFireMode:"AUTO",GunId:"tacz:type_81",HasBulletInBarrel:0b}',
            circuit: 5,
            ingredients: [
                Item.of('gtceu:treated_wood_plate', 4), 'kubejs:barrel_steel', 'gtceu:steel_gear']
        },
        {
            id: 'tacz:modern_kinetic_gun',
            nbt: '{GunCurrentAmmoCount:0,GunFireMode:"SEMI",GunId:"tacz:sks_tactical",HasBulletInBarrel:0b}',
            circuit: 6,
            ingredients: [
                Item.of('gtceu:polyethylene_plate', 4), 'kubejs:barrel_steel', 'gtceu:steel_gear']
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
                Item.of('gtceu:polyethylene_plate', 2), 'kubejs:barrel_steel', 'gtceu:small_steel_gear']
        },
        {
            id: 'tacz:modern_kinetic_gun',
            nbt: '{GunCurrentAmmoCount:16,GunFireMode:"AUTO",GunId:"tacz:cz75",HasBulletInBarrel:1b}',
            circuit: 8,
            ingredients: [
                Item.of('gtceu:polyethylene_plate', 2), 'kubejs:barrel_steel', 'gtceu:small_steel_gear']
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
    const ECWSHOTGUNS = [
        {
            id: 'tacz:modern_kinetic_gun',
            nbt: '{GunCurrentAmmoCount:7,GunFireMode:"SEMI",GunId:"ronmc:m1014",HasBulletInBarrel:1b}',
            circuit: 10,
            ingredients: [
                Item.of('gtceu:treated_wood_plate', 2), 'kubejs:barrel_steel', 'gtceu:small_steel_gear']
        },
        {
            id: 'tacz:modern_kinetic_gun',
            nbt: '{GunCurrentAmmoCount:4,GunFireMode:"SEMI",GunId:"tacz:m1014",HasBulletInBarrel:1b}',
            circuit: 12,
            ingredients: [
                Item.of('gtceu:polyethylene_plate', 2), 'kubejs:barrel_steel', 'gtceu:small_steel_gear']
        },

        {
            id: 'tacz:modern_kinetic_gun',
            nbt: '{GunCurrentAmmoCount:4,GunFireMode:"SEMI",GunId:"ronmc:entryman",HasBulletInBarrel:1b}',
            circuit: 13,
            ingredients: [
                Item.of('gtceu:polyethylene_plate', 2), 'kubejs:barrel_steel', 'gtceu:small_steel_gear']
        },

        {
            id: 'tacz:modern_kinetic_gun',
            nbt: '{GunCurrentAmmoCount:4,GunFireMode:"SEMI",GunId:"ronmc:590m",HasBulletInBarrel:1b}',
            circuit: 14,
            ingredients: [
                Item.of('gtceu:polyethylene_plate', 2), 'kubejs:barrel_steel', 'gtceu:small_steel_gear']
        },

        {
            id: 'tacz:modern_kinetic_gun',
            nbt: '{GunCurrentAmmoCount:4,GunFireMode:"SEMI",GunId:"ronmc:870cq",HasBulletInBarrel:1b}',
            circuit: 15,
            ingredients: [
                Item.of('gtceu:polyethylene_plate', 2), 'kubejs:barrel_steel', 'gtceu:small_steel_gear']
        },

        {
            id: 'tacz:modern_kinetic_gun',
            nbt: '{GunCurrentAmmoCount:4,GunFireMode:"SEMI",GunId:"ronmc:870cq",HasBulletInBarrel:1b}',
            circuit: 16,
            ingredients: [
                Item.of('gtceu:polyethylene_plate', 2), 'kubejs:barrel_steel', 'gtceu:small_steel_gear']
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
                Item.of('gtceu:polytetrafluoroethylene_plate', 2), 'kubejs:barrel_steel', 'gtceu:stainless_steel_gear']
        },
        {
            id: 'tacz:modern_kinetic_gun',
            nbt: '{GunCurrentAmmoCount:4,GunFireMode:"SEMI",GunId:"tacz:g36k",HasBulletInBarrel:1b}',
            circuit: 5,
            ingredients: [
                Item.of('gtceu:polyethylene_plate', 2), 'kubejs:barrel_steel', 'gtceu:small_steel_gear']
        },
        {
            id: 'tacz:modern_kinetic_gun',
            nbt: '{GunCurrentAmmoCount:4,GunFireMode:"SEMI",GunId:"tacz:m4a1",HasBulletInBarrel:1b}',
            circuit: 7,
            ingredients: [
                Item.of('gtceu:polyethylene_plate', 2), 'kubejs:barrel_steel', 'gtceu:small_steel_gear']
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
                Item.of('gtceu:polytetrafluoroethylene_plate', 2), 'kubejs:barrel_steel', 'gtceu:stainless_steel_gear']
        },
        {
            id: 'tacz:modern_kinetic_gun',
            nbt: '{GunCurrentAmmoCount:12,GunFireMode:"SEMI",GunId:"tacz:p320",HasBulletInBarrel:1b}',
            circuit: 3,
            ingredients: [
                Item.of('gtceu:polytetrafluoroethylene_plate', 2), 'kubejs:barrel_steel', 'gtceu:stainless_steel_gear']
        },
        {
            id: 'tacz:modern_kinetic_gun',
            nbt: '{GunCurrentAmmoCount:9,GunFireMode:"SEMI",GunId:"tacz:deagle_golden",HasBulletInBarrel:1b}',
            circuit: 4,
            ingredients: [
                Item.of('gtceu:polytetrafluoroethylene_plate', 2), 'kubejs:barrel_steel', 'gtceu:stainless_steel_gear']
        },
        {
            id: 'tacz:modern_kinetic_gun',
            nbt: '{GunCurrentAmmoCount:7,GunFireMode:"SEMI",GunId:"tacz:deagle",HasBulletInBarrel:1b}',
            circuit: 5,
            ingredients: [
                Item.of('gtceu:polytetrafluoroethylene_plate', 2), 'kubejs:barrel_steel', 'gtceu:stainless_steel_gear']
        },
        {
            id: 'tacz:modern_kinetic_gun',
            nbt: '{GunCurrentAmmoCount:8,GunFireMode:"SEMI",GunId:"ronmc:m45a1",HasBulletInBarrel:1b}',
            circuit: 6,
            ingredients: [
                Item.of('gtceu:polytetrafluoroethylene_plate', 2), 'kubejs:barrel_steel', 'gtceu:stainless_steel_gear']
        },
        {
            id: 'tacz:modern_kinetic_gun',
            nbt: '{GunCurrentAmmoCount:17,GunFireMode:"SEMI",GunId:"tacz:glock_17",HasBulletInBarrel:1b}',
            circuit: 7,
            ingredients: [
                Item.of('gtceu:polytetrafluoroethylene_plate', 2), 'kubejs:barrel_steel', 'gtceu:stainless_steel_gear']
        },
        {
            id: 'tacz:modern_kinetic_gun',
            nbt: '{GunCurrentAmmoCount:15,GunFireMode:"SEMI",GunId:"ronmc:m11",HasBulletInBarrel:1b}',
            circuit: 8,
            ingredients: [
                Item.of('gtceu:polytetrafluoroethylene_plate', 2), 'kubejs:barrel_steel', 'gtceu:stainless_steel_gear']
        },
        {
            id: 'tacz:modern_kinetic_gun',
            nbt: '{GunCurrentAmmoCount:20,GunFireMode:"SEMI",GunId:"ronmc:57usg",HasBulletInBarrel:1b}',
            circuit: 9,
            ingredients: [
                Item.of('gtceu:polytetrafluoroethylene_plate', 2), 'kubejs:barrel_steel', 'gtceu:stainless_steel_gear']
        },
        {
            id: 'tacz:modern_kinetic_gun',
            nbt: '{GunCurrentAmmoCount:21,GunFireMode:"SEMI",GunId:"ronmc:sti_2011",HasBulletInBarrel:1b}',
            circuit: 10,
            ingredients: [
                Item.of('gtceu:polytetrafluoroethylene_plate', 2), 'kubejs:barrel_steel', 'gtceu:stainless_steel_gear']
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

    // =========================
    // GUNS - progression brief implementation (warfactory-lite-gun-progression-notes.md)
    // MV = Cold War era.
    // =========================

    // Cold War pistols
    const coldWarPistols = [
        { nbt: '{GunCurrentAmmoCount:0,GunFireMode:"SEMI",GunId:"tacz:b93r",HasBulletInBarrel:0b}', circuit: 1 },
        { nbt: '{GunCurrentAmmoCount:0,GunFireMode:"SEMI",GunId:"tacz:lonetrail",HasBulletInBarrel:0b}', circuit: 2 },
        { nbt: '{GunCurrentAmmoCount:0,GunFireMode:"SEMI",GunId:"tacz:taurus943",HasBulletInBarrel:0b}', circuit: 3 },
        { nbt: '{GunCurrentAmmoCount:0,GunFireMode:"SEMI",GunId:"ronmc:357_magnum",HasBulletInBarrel:0b}', circuit: 4 },
        { nbt: '{GunCurrentAmmoCount:0,GunFireMode:"SEMI",GunId:"ronmc:glock_18c",HasBulletInBarrel:0b}', circuit: 5 },
        { nbt: '{GunCurrentAmmoCount:0,GunFireMode:"SEMI",GunId:"ronmc:glock_19",HasBulletInBarrel:0b}', circuit: 6 },
        { nbt: '{GunCurrentAmmoCount:0,GunFireMode:"SEMI",GunId:"ronmc:mkv",HasBulletInBarrel:0b}', circuit: 7 },
        { nbt: '{GunCurrentAmmoCount:0,GunFireMode:"SEMI",GunId:"ronmc:raider",HasBulletInBarrel:0b}', circuit: 8 },
        { nbt: '{GunCurrentAmmoCount:0,GunFireMode:"SEMI",GunId:"ronmc:trpl",HasBulletInBarrel:0b}', circuit: 9 },
    ];
    coldWarPistols.forEach(g => {
        event.remove({ output: Item.of('tacz:modern_kinetic_gun', g.nbt) });
        event.recipes.gtceu.assembler(`cw_pistol_${g.circuit}`)
            .itemInputs(
                Item.of('gtceu:polyethylene_plate', 2),
                Item.of('gtceu:small_steel_gear', 1),
                'kubejs:barrel_steel'
            )
            .itemOutputs(Item.of('tacz:modern_kinetic_gun', 1, g.nbt))
            .circuit(g.circuit)
            .duration(20)
            .EUt(4)
            .addCondition(WFResearch.condition('guns2'));
    });

    // Cold War SMGs
    const coldWarSmgs = [
        { nbt: '{GunCurrentAmmoCount:0,GunFireMode:"SEMI",GunId:"tacz:hk_mp5a5",HasBulletInBarrel:0b}', circuit: 1 },
        { nbt: '{GunCurrentAmmoCount:0,GunFireMode:"AUTO",GunId:"tacz:uzi",HasBulletInBarrel:0b}', circuit: 2 },
        { nbt: '{GunCurrentAmmoCount:0,GunFireMode:"AUTO",GunId:"tacz:p90",HasBulletInBarrel:0b}', circuit: 3 },
    ];
    coldWarSmgs.forEach(g => {
        event.remove({ output: Item.of('tacz:modern_kinetic_gun', g.nbt) });
        event.recipes.gtceu.assembler(`cw_smg_${g.circuit}`)
            .itemInputs(
                Item.of('gtceu:polyethylene_plate', 2),
                Item.of('gtceu:small_steel_gear', 1),
                'kubejs:barrel_steel'
            )
            .itemOutputs(Item.of('tacz:modern_kinetic_gun', 1, g.nbt))
            .circuit(g.circuit)
            .duration(20)
            .EUt(4)
            .addCondition(WFResearch.condition('guns2'));
    });

    // Cold War rifles
    const coldWarRifles = [
        { nbt: '{GunCurrentAmmoCount:0,GunFireMode:"SEMI",GunId:"tacz:ak47",HasBulletInBarrel:0b}', circuit: 1 },
        { nbt: '{GunCurrentAmmoCount:0,GunFireMode:"SEMI",GunId:"tacz:aug",HasBulletInBarrel:0b}', circuit: 2 },
        { nbt: '{GunCurrentAmmoCount:0,GunFireMode:"SEMI",GunId:"tacz:hk_g3",HasBulletInBarrel:0b}', circuit: 3 },
        { nbt: '{GunCurrentAmmoCount:0,GunFireMode:"SEMI",GunId:"ronmc:m14",HasBulletInBarrel:0b}', circuit: 4 },
    ];
    coldWarRifles.forEach(g => {
        event.remove({ output: Item.of('tacz:modern_kinetic_gun', g.nbt) });
        event.recipes.gtceu.assembler(`cw_rifle_${g.circuit}`)
            .itemInputs(
                Item.of('gtceu:polyethylene_plate', 3),
                Item.of('gtceu:small_steel_gear', 1),
                'kubejs:barrel_steel'
            )
            .itemOutputs(Item.of('tacz:modern_kinetic_gun', 1, g.nbt))
            .circuit(g.circuit)
            .duration(20)
            .EUt(4)
            .addCondition(WFResearch.condition('guns1'));
    });

    // Cold War shotguns
    const coldWarShotguns = [
        { nbt: '{GunCurrentAmmoCount:0,GunFireMode:"SEMI",GunId:"ronmc:870cqb",HasBulletInBarrel:0b}', circuit: 1 },
        { nbt: '{GunCurrentAmmoCount:0,GunFireMode:"SEMI",GunId:"tacz:aa12",HasBulletInBarrel:0b}', circuit: 2 },
        { nbt: '{GunCurrentAmmoCount:0,GunFireMode:"SEMI",GunId:"tacz:spas_12",HasBulletInBarrel:0b}', circuit: 3 },
    ];
    coldWarShotguns.forEach(g => {
        event.remove({ output: Item.of('tacz:modern_kinetic_gun', g.nbt) });
        event.recipes.gtceu.assembler(`cw_shotgun_${g.circuit}`)
            .itemInputs(
                Item.of('gtceu:polyethylene_plate', 2),
                Item.of('gtceu:treated_wood_plate', 1),
                Item.of('gtceu:small_steel_gear', 1),
                'kubejs:barrel_steel'
            )
            .itemOutputs(Item.of('tacz:modern_kinetic_gun', 1, g.nbt))
            .circuit(g.circuit)
            .duration(20)
            .EUt(4)
            .addCondition(WFResearch.condition('guns2heavy'));
    });

    // Cold War machine guns / launchers
    const coldWarMgLaunchers = [
        { nbt: '{GunCurrentAmmoCount:0,GunFireMode:"AUTO",GunId:"tacz:m249",HasBulletInBarrel:0b}', circuit: 1 },
        { nbt: '{GunCurrentAmmoCount:0,GunFireMode:"SEMI",GunId:"tacz:rpk",HasBulletInBarrel:0b}', circuit: 2 },
        { nbt: '{GunCurrentAmmoCount:0,GunFireMode:"SEMI",GunId:"tacz:rpg7",HasBulletInBarrel:0b}', circuit: 3 },
    ];
    coldWarMgLaunchers.forEach(g => {
        event.remove({ output: Item.of('tacz:modern_kinetic_gun', g.nbt) });
        event.recipes.gtceu.assembler(`cw_mg_${g.circuit}`)
            .itemInputs(
                Item.of('gtceu:polyethylene_plate', 2),
                Item.of('gtceu:steel_gear', 2),
                'kubejs:barrel_steel', 'kubejs:barrel_steel'
            )
            .itemOutputs(Item.of('tacz:modern_kinetic_gun', 1, g.nbt))
            .circuit(g.circuit)
            .duration(40)
            .EUt(4)
            .addCondition(WFResearch.condition('guns4heavy'));
    });
})

ServerEvents.recipes(event => {
    // Casings
    const id = name => `wfcore:${name}`;

    const casingRecipes = (item, mod, output, count, fluid, eutick, circuit) => {
        count = count || 1;
        fluid = fluid || null;

        let recipe = event.recipes.gtceu.assembler(id(`${output}`))
            .itemInputs(item)
            .itemOutputs(`${count}x ${mod}:${output}`)
            .duration(20)
            .EUt(eutick);

        if (circuit) {
            recipe.circuit(circuit);
        }

        if (fluid) {
            recipe.inputFluids(`${fluid}`);
        }
    };

    casingRecipes(['6x wfcore:galvanized_steel_plate', '1x wfcore:galvanized_steel_frame'], 'wfcore', 'galvanized_steel_casing', 1, null, 30, 6);
    casingRecipes(['6x gtceu:aluminium_plate', '1x wfcore:galvanized_steel_frame'], 'wfcore', 'aluminium_sheet_casing', 1, null, 30, 6);
    casingRecipes(['4x gtceu:red_alloy_quadruple_cable', '1x gtceu:black_steel_frame'], 'wfcore', 'condensed_cables', 1, null, 120, 6);
    casingRecipes(['6x gtceu:beryllium_plate', '1x gtceu:aluminium_frame'], 'wfcore', 'boltable_casing', 1, null, 120, 6);
    casingRecipes(['1x wfcore:galvanized_steel_frame'], 'wfcore', 'concrete_base', 1, 'gtceu:concrete 576', 120, 6);
    casingRecipes(['6x gtceu:beryllium_plate', '1x gtceu:stainless_steel_frame'], 'wfcore', 'machine_casing_turbine_titanium', 1, null, 512);
    casingRecipes(['2x gtceu:magnesium_diboride_single_wire'], 'wfcore', 'single_ac_pipe', 32, 'gtceu:polyvinyl_chloride 288', 120);
    casingRecipes(['2x gtceu:magnesium_diboride_double_wire'], 'wfcore', 'double_ac_pipe', 32, 'gtceu:polyvinyl_chloride 576', 120);
    casingRecipes(['2x gtceu:magnesium_diboride_quadruple_wire'], 'wfcore', 'quadruple_ac_pipe', 32, 'gtceu:polyvinyl_chloride 1152', 120);
    casingRecipes(['2x gtceu:magnesium_diboride_octal_wire'], 'wfcore', 'octal_ac_pipe', 32, 'gtceu:polyvinyl_chloride 2304', 120);
    casingRecipes(['2x gtceu:magnesium_diboride_hex_wire'], 'wfcore', 'hex_ac_pipe', 32, 'gtceu:polyvinyl_chloride 4608', 120);
});