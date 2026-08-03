ServerEvents.recipes(event => {

    // Lock each gun's crafting recipe behind its own research node
    // (wfcore/research/infantry.js). Node id = 'inf_' + the GunId short name.

    // LVSHOTGUN

    event.remove({ output: Item.of('tacz:modern_kinetic_gun', '{GunCurrentAmmoCount:2,GunId:"tacz:db_long",HasBulletInBarrel:1b}') });
    event.recipes.gtceu.assembler('ecwrifles_lvshotgun_0')
        .itemInputs([Item.of('gtceu:treated_wood_plate', 2), Item.of('kubejs:barrel_steel', 2)])
        .itemOutputs(Item.of('tacz:modern_kinetic_gun', '{GunCurrentAmmoCount:2,GunId:"tacz:db_long",HasBulletInBarrel:1b}'))
        .circuit(1)
        .duration(20)
        .EUt(32)
        .addCondition(WFResearch.condition('inf_db_long'));

    event.remove({ output: Item.of('tacz:modern_kinetic_gun', '{GunCurrentAmmoCount:2,GunId:"ww:m1897",HasBulletInBarrel:1b}') });
    event.recipes.gtceu.assembler('ecwrifles_lvshotgun_1')
        .itemInputs([Item.of('gtceu:treated_wood_plate', 2), Item.of('kubejs:barrel_steel', 2), 'gtceu:small_steel_gear'])
        .itemOutputs(Item.of('tacz:modern_kinetic_gun', '{GunCurrentAmmoCount:2,GunId:"ww:m1897",HasBulletInBarrel:1b}'))
        .circuit(2)
        .duration(20)
        .EUt(32)
        .addCondition(WFResearch.condition('inf_m1897'));

    event.remove({ output: Item.of('tacz:modern_kinetic_gun', '{GunCurrentAmmoCount:2,GunId:"tacz:m870",HasBulletInBarrel:1b}') });
    event.recipes.gtceu.assembler('ecwrifles_lvshotgun_2')
        .itemInputs([Item.of('gtceu:treated_wood_plate', 2), Item.of('kubejs:barrel_steel', 2), 'gtceu:small_steel_gear'])
        .itemOutputs(Item.of('tacz:modern_kinetic_gun', '{GunCurrentAmmoCount:2,GunId:"tacz:m870",HasBulletInBarrel:1b}'))
        .circuit(3)
        .duration(20)
        .EUt(32)
        .addCondition(WFResearch.condition('inf_m870'));

    // LVRIFLE

    event.remove({ output: Item.of('tacz:modern_kinetic_gun', '{GunCurrentAmmoCount:2,GunId:"ww:m1g",HasBulletInBarrel:1b}') });
    event.recipes.gtceu.assembler('ecwrifles_lvrifle_0')
        .itemInputs([Item.of('gtceu:treated_wood_plate', 2), Item.of('kubejs:barrel_steel', 1), 'gtceu:small_steel_gear'])
        .itemOutputs(Item.of('tacz:modern_kinetic_gun', '{GunCurrentAmmoCount:2,GunId:"ww:m1g",HasBulletInBarrel:1b}'))
        .circuit(4)
        .duration(20)
        .EUt(32)
        .addCondition(WFResearch.condition('inf_m1g'));

    event.remove({ output: Item.of('tacz:modern_kinetic_gun', '{GunCurrentAmmoCount:2,GunId:"ww:g43",HasBulletInBarrel:1b}') });
    event.recipes.gtceu.assembler('ecwrifles_lvrifle_1')
        .itemInputs([Item.of('gtceu:treated_wood_plate', 2), Item.of('kubejs:barrel_steel', 1), 'gtceu:small_steel_gear'])
        .itemOutputs(Item.of('tacz:modern_kinetic_gun', '{GunCurrentAmmoCount:2,GunId:"ww:g43",HasBulletInBarrel:1b}'))
        .circuit(7)
        .duration(20)
        .EUt(32)
        .addCondition(WFResearch.condition('inf_g43'));

    event.remove({ output: Item.of('tacz:modern_kinetic_gun', '{GunCurrentAmmoCount:2,GunId:"ww:svt_40",HasBulletInBarrel:1b}') });
    event.recipes.gtceu.assembler('ecwrifles_lvrifle_2')
        .itemInputs([Item.of('gtceu:treated_wood_plate', 2), Item.of('kubejs:barrel_steel', 1), 'gtceu:small_steel_gear'])
        .itemOutputs(Item.of('tacz:modern_kinetic_gun', '{GunCurrentAmmoCount:2,GunId:"ww:svt_40",HasBulletInBarrel:1b}'))
        .circuit(5)
        .duration(20)
        .EUt(32)
        .addCondition(WFResearch.condition('inf_svt_40'));

    event.remove({ output: Item.of('tacz:modern_kinetic_gun', '{GunCurrentAmmoCount:2,GunId:"ww:m1",HasBulletInBarrel:1b}') });
    event.recipes.gtceu.assembler('ecwrifles_lvrifle_3')
        .itemInputs([Item.of('gtceu:treated_wood_plate', 2), Item.of('kubejs:barrel_steel', 1), 'gtceu:small_steel_gear'])
        .itemOutputs(Item.of('tacz:modern_kinetic_gun', '{GunCurrentAmmoCount:2,GunId:"ww:m1",HasBulletInBarrel:1b}'))
        .circuit(6)
        .duration(20)
        .EUt(32)
        .addCondition(WFResearch.condition('inf_m1'));

    // LVSMG

    event.remove({ output: Item.of('tacz:modern_kinetic_gun', '{GunCurrentAmmoCount:2,GunId:"ww:pps",HasBulletInBarrel:1b}') });
    event.recipes.gtceu.assembler('ecwsmglvsmg_0')
        .itemInputs([Item.of('gtceu:steel_plate', 2), Item.of('kubejs:barrel_steel', 1), 'gtceu:small_steel_gear'])
        .itemOutputs(Item.of('tacz:modern_kinetic_gun', '{GunCurrentAmmoCount:2,GunId:"ww:pps",HasBulletInBarrel:1b}'))
        .circuit(20)
        .duration(20)
        .EUt(32)
        .addCondition(WFResearch.condition('inf_pps'));

    event.remove({ output: Item.of('tacz:modern_kinetic_gun', '{GunCurrentAmmoCount:2,GunId:"ww:m1a1",HasBulletInBarrel:1b}') });
    event.recipes.gtceu.assembler('ecwsmglvsmg_1')
        .itemInputs([Item.of('gtceu:steel_plate', 2), Item.of('kubejs:barrel_steel', 1), 'gtceu:small_steel_gear'])
        .itemOutputs(Item.of('tacz:modern_kinetic_gun', '{GunCurrentAmmoCount:2,GunId:"ww:m1a1",HasBulletInBarrel:1b}'))
        .circuit(21)
        .duration(20)
        .EUt(32)
        .addCondition(WFResearch.condition('inf_m1a1'));

    event.remove({ output: Item.of('tacz:modern_kinetic_gun', '{GunCurrentAmmoCount:2,GunId:"ww:mp38",HasBulletInBarrel:1b}') });
    event.recipes.gtceu.assembler('ecwsmglvsmg_2')
        .itemInputs([Item.of('gtceu:steel_plate', 2), Item.of('kubejs:barrel_steel', 1), 'gtceu:small_steel_gear'])
        .itemOutputs(Item.of('tacz:modern_kinetic_gun', '{GunCurrentAmmoCount:2,GunId:"ww:mp38",HasBulletInBarrel:1b}'))
        .circuit(22)
        .duration(20)
        .EUt(32)
        .addCondition(WFResearch.condition('inf_mp38'));

    event.remove({ output: Item.of('tacz:modern_kinetic_gun', '{GunCurrentAmmoCount:2,GunId:"ww:t100l",HasBulletInBarrel:1b}') });
    event.recipes.gtceu.assembler('ecwsmglvsmg_3')
        .itemInputs([Item.of('gtceu:steel_plate', 2), Item.of('gtceu:treated_wood_plate', 2), Item.of('kubejs:barrel_steel', 1), 'gtceu:small_steel_gear'])
        .itemOutputs(Item.of('tacz:modern_kinetic_gun', '{GunCurrentAmmoCount:2,GunId:"ww:t100l",HasBulletInBarrel:1b}'))
        .circuit(23)
        .duration(20)
        .EUt(32)
        .addCondition(WFResearch.condition('inf_t100l'));

    event.remove({ output: Item.of('tacz:modern_kinetic_gun', '{GunCurrentAmmoCount:2,GunId:"ww:sten",HasBulletInBarrel:1b}') });
    event.recipes.gtceu.assembler('ecwsmglvsmg_4')
        .itemInputs([Item.of('gtceu:steel_plate', 2), Item.of('kubejs:barrel_steel', 1), 'gtceu:small_steel_gear'])
        .itemOutputs(Item.of('tacz:modern_kinetic_gun', '{GunCurrentAmmoCount:2,GunId:"ww:sten",HasBulletInBarrel:1b}'))
        .circuit(24)
        .duration(20)
        .EUt(32)
        .addCondition(WFResearch.condition('inf_sten'));

    // MVRIFLEWOOD

    event.remove({ output: Item.of('tacz:modern_kinetic_gun', '{GunCurrentAmmoCount:2,GunId:"tacz:fn_fal",HasBulletInBarrel:1b}') });
    event.recipes.gtceu.assembler('ecwrifles_mvriflewood_0')
        .itemInputs([Item.of('gtceu:aluminium_plate', 2), Item.of('gtceu:treated_wood_plate', 2), Item.of('kubejs:barrel_steel', 1), Item.of('gtceu:small_aluminium_gear', 4)])
        .itemOutputs(Item.of('tacz:modern_kinetic_gun', '{GunCurrentAmmoCount:2,GunId:"tacz:fn_fal",HasBulletInBarrel:1b}'))
        .circuit(11)
        .duration(20)
        .EUt(128)
        .addCondition(WFResearch.condition('inf_fn_fal'));

    event.remove({ output: Item.of('tacz:modern_kinetic_gun', '{GunCurrentAmmoCount:2,GunId:"tacz:type_81",HasBulletInBarrel:1b}') });
    event.recipes.gtceu.assembler('ecwrifles_mvriflewood_1')
        .itemInputs([Item.of('gtceu:aluminium_plate', 2), Item.of('gtceu:treated_wood_plate', 2), Item.of('kubejs:barrel_steel', 1), Item.of('gtceu:small_aluminium_gear', 4)])
        .itemOutputs(Item.of('tacz:modern_kinetic_gun', '{GunCurrentAmmoCount:2,GunId:"tacz:type_81",HasBulletInBarrel:1b}'))
        .circuit(12)
        .duration(20)
        .EUt(128)
        .addCondition(WFResearch.condition('inf_type_81'));

    event.remove({ output: Item.of('tacz:modern_kinetic_gun', '{GunCurrentAmmoCount:2,GunId:"tacz:ak47",HasBulletInBarrel:1b}') });
    event.recipes.gtceu.assembler('ecwrifles_mvriflewood_2')
        .itemInputs([Item.of('gtceu:aluminium_plate', 2), Item.of('gtceu:treated_wood_plate', 2), Item.of('kubejs:barrel_steel', 1), Item.of('gtceu:small_aluminium_gear', 4)])
        .itemOutputs(Item.of('tacz:modern_kinetic_gun', '{GunCurrentAmmoCount:2,GunId:"tacz:ak47",HasBulletInBarrel:1b}'))
        .circuit(13)
        .duration(20)
        .EUt(128)
        .addCondition(WFResearch.condition('inf_ak47'));

    // MVRIFLE

    event.remove({ output: Item.of('tacz:modern_kinetic_gun', '{GunCurrentAmmoCount:2,GunId:"tacz:m4a1",HasBulletInBarrel:1b}') });
    event.recipes.gtceu.assembler('ecwrifles_mvrifle_0')
        .itemInputs([Item.of('gtceu:aluminium_plate', 2), Item.of('gtceu:polyethylene_plate', 2), Item.of('kubejs:barrel_steel', 1), Item.of('gtceu:small_aluminium_gear', 4)])
        .itemOutputs(Item.of('tacz:modern_kinetic_gun', '{GunCurrentAmmoCount:2,GunId:"tacz:m4a1",HasBulletInBarrel:1b}'))
        .circuit(1)
        .duration(20)
        .EUt(128)
        .addCondition(WFResearch.condition('inf_m4a1'));

    event.remove({ output: Item.of('tacz:modern_kinetic_gun', '{GunCurrentAmmoCount:2,GunId:"ronmc:ga416",HasBulletInBarrel:1b}') });
    event.recipes.gtceu.assembler('ecwrifles_mvrifle_1')
        .itemInputs([Item.of('gtceu:aluminium_plate', 2), Item.of('gtceu:polyethylene_plate', 2), Item.of('kubejs:barrel_steel', 1), Item.of('gtceu:small_aluminium_gear', 4)])
        .itemOutputs(Item.of('tacz:modern_kinetic_gun', '{GunCurrentAmmoCount:2,GunId:"ronmc:ga416",HasBulletInBarrel:1b}'))
        .circuit(2)
        .duration(20)
        .EUt(128)
        .addCondition(WFResearch.condition('inf_ga416'));

    event.remove({ output: Item.of('tacz:modern_kinetic_gun', '{GunCurrentAmmoCount:2,GunId:"tacz:scar_l",HasBulletInBarrel:1b}') });
    event.recipes.gtceu.assembler('ecwrifles_mvrifle_2')
        .itemInputs([Item.of('gtceu:aluminium_plate', 2), Item.of('gtceu:polyethylene_plate', 2), Item.of('kubejs:barrel_steel', 1), Item.of('gtceu:small_aluminium_gear', 4)])
        .itemOutputs(Item.of('tacz:modern_kinetic_gun', '{GunCurrentAmmoCount:2,GunId:"tacz:scar_l",HasBulletInBarrel:1b}'))
        .circuit(3)
        .duration(20)
        .EUt(128)
        .addCondition(WFResearch.condition('inf_scar_l'));

    event.remove({ output: Item.of('tacz:modern_kinetic_gun', '{GunCurrentAmmoCount:2,GunId:"tacz:hk_g3",HasBulletInBarrel:1b}') });
    event.recipes.gtceu.assembler('ecwrifles_mvrifle_3')
        .itemInputs([Item.of('gtceu:aluminium_plate', 2), Item.of('gtceu:polyethylene_plate', 2), Item.of('kubejs:barrel_steel', 1), Item.of('gtceu:small_aluminium_gear', 4)])
        .itemOutputs(Item.of('tacz:modern_kinetic_gun', '{GunCurrentAmmoCount:2,GunId:"tacz:hk_g3",HasBulletInBarrel:1b}'))
        .circuit(4)
        .duration(20)
        .EUt(128)
        .addCondition(WFResearch.condition('inf_hk_g3'));

    event.remove({ output: Item.of('tacz:modern_kinetic_gun', '{GunCurrentAmmoCount:2,GunId:"ronmc:g36c",HasBulletInBarrel:1b}') });
    event.recipes.gtceu.assembler('ecwrifles_mvrifle_4')
        .itemInputs([Item.of('gtceu:aluminium_plate', 2), Item.of('gtceu:polyethylene_plate', 2), Item.of('kubejs:barrel_steel', 1), Item.of('gtceu:small_aluminium_gear', 4)])
        .itemOutputs(Item.of('tacz:modern_kinetic_gun', '{GunCurrentAmmoCount:2,GunId:"ronmc:g36c",HasBulletInBarrel:1b}'))
        .circuit(5)
        .duration(20)
        .EUt(128)
        .addCondition(WFResearch.condition('inf_g36c'));

    event.remove({ output: Item.of('tacz:modern_kinetic_gun', '{GunCurrentAmmoCount:2,GunId:"tacz:aug",HasBulletInBarrel:1b}') });
    event.recipes.gtceu.assembler('ecwrifles_mvrifle_5')
        .itemInputs([Item.of('gtceu:aluminium_plate', 2), Item.of('gtceu:polyethylene_plate', 2), Item.of('kubejs:barrel_steel', 1), Item.of('gtceu:small_aluminium_gear', 4)])
        .itemOutputs(Item.of('tacz:modern_kinetic_gun', '{GunCurrentAmmoCount:2,GunId:"tacz:aug",HasBulletInBarrel:1b}'))
        .circuit(6)
        .duration(20)
        .EUt(128)
        .addCondition(WFResearch.condition('inf_aug'));

    event.remove({ output: Item.of('tacz:modern_kinetic_gun', '{GunCurrentAmmoCount:2,GunId:"tacz:m16a1",HasBulletInBarrel:1b}') });
    event.recipes.gtceu.assembler('ecwrifles_mvrifle_6')
        .itemInputs([Item.of('gtceu:aluminium_plate', 2), Item.of('gtceu:polyethylene_plate', 2), Item.of('kubejs:barrel_steel', 1), Item.of('gtceu:small_aluminium_gear', 4)])
        .itemOutputs(Item.of('tacz:modern_kinetic_gun', '{GunCurrentAmmoCount:2,GunId:"tacz:m16a1",HasBulletInBarrel:1b}'))
        .circuit(7)
        .duration(20)
        .EUt(128)
        .addCondition(WFResearch.condition('inf_m16a1'));

    // MVMG

    event.remove({ output: Item.of('tacz:modern_kinetic_gun', '{GunCurrentAmmoCount:2,GunId:"tacz:m249",HasBulletInBarrel:1b}') });
    event.recipes.gtceu.assembler('ecwrifles_mvmg_0')
        .itemInputs([Item.of('gtceu:aluminium_plate', 4), Item.of('gtceu:polyethylene_plate', 12), Item.of('kubejs:barrel_steel', 1), Item.of('gtceu:small_aluminium_gear', 6)])
        .itemOutputs(Item.of('tacz:modern_kinetic_gun', '{GunCurrentAmmoCount:2,GunId:"tacz:m249",HasBulletInBarrel:1b}'))
        .circuit(1)
        .duration(20)
        .EUt(128)
        .addCondition(WFResearch.condition('inf_m249'));

    event.remove({ output: Item.of('tacz:modern_kinetic_gun', '{GunCurrentAmmoCount:2,GunId:"ww:mg42",HasBulletInBarrel:1b}') });
    event.recipes.gtceu.assembler('ecwrifles_mvmg_1')
        .itemInputs([Item.of('gtceu:aluminium_plate', 4), Item.of('gtceu:treated_wood_plate', 12), Item.of('kubejs:barrel_steel', 1), Item.of('gtceu:small_aluminium_gear', 6)])
        .itemOutputs(Item.of('tacz:modern_kinetic_gun', '{GunCurrentAmmoCount:2,GunId:"ww:mg42",HasBulletInBarrel:1b}'))
        .circuit(2)
        .duration(20)
        .EUt(128)
        .addCondition(WFResearch.condition('inf_mg42'));

    event.remove({ output: Item.of('tacz:modern_kinetic_gun', '{GunCurrentAmmoCount:2,GunId:"ww:mg34",HasBulletInBarrel:1b}') });
    event.recipes.gtceu.assembler('ecwrifles_mvmg_2')
        .itemInputs([Item.of('gtceu:aluminium_plate', 4), Item.of('gtceu:treated_wood_plate', 12), Item.of('kubejs:barrel_steel', 1), Item.of('gtceu:small_aluminium_gear', 6)])
        .itemOutputs(Item.of('tacz:modern_kinetic_gun', '{GunCurrentAmmoCount:2,GunId:"ww:mg34",HasBulletInBarrel:1b}'))
        .circuit(3)
        .duration(20)
        .EUt(128)
        .addCondition(WFResearch.condition('inf_mg34'));

    event.remove({ output: Item.of('tacz:modern_kinetic_gun', '{GunCurrentAmmoCount:2,GunId:"ww:m1918a2",HasBulletInBarrel:1b}') });
    event.recipes.gtceu.assembler('ecwrifles_mvmg_3')
        .itemInputs([Item.of('gtceu:aluminium_plate', 2), Item.of('gtceu:treated_wood_plate', 8), Item.of('kubejs:barrel_steel', 1), Item.of('gtceu:small_aluminium_gear', 4)])
        .itemOutputs(Item.of('tacz:modern_kinetic_gun', '{GunCurrentAmmoCount:2,GunId:"ww:m1918a2",HasBulletInBarrel:1b}'))
        .circuit(4)
        .duration(20)
        .EUt(128)
        .addCondition(WFResearch.condition('inf_m1918a2'));

    event.remove({ output: Item.of('tacz:modern_kinetic_gun', '{GunCurrentAmmoCount:2,GunId:"ww:dp28",HasBulletInBarrel:1b}') });
    event.recipes.gtceu.assembler('ecwrifles_mvmg_4')
        .itemInputs([Item.of('gtceu:aluminium_plate', 4), Item.of('gtceu:treated_wood_plate', 12), Item.of('kubejs:barrel_steel', 1), Item.of('gtceu:small_aluminium_gear', 6)])
        .itemOutputs(Item.of('tacz:modern_kinetic_gun', '{GunCurrentAmmoCount:2,GunId:"ww:dp28",HasBulletInBarrel:1b}'))
        .circuit(5)
        .duration(20)
        .EUt(128)
        .addCondition(WFResearch.condition('inf_dp28'));

    event.remove({ output: Item.of('tacz:modern_kinetic_gun', '{GunCurrentAmmoCount:2,GunId:"tacz:rpk",HasBulletInBarrel:1b}') });
    event.recipes.gtceu.assembler('ecwrifles_mvmg_5')
        .itemInputs([Item.of('gtceu:aluminium_plate', 4), Item.of('gtceu:treated_wood_plate', 12), Item.of('kubejs:barrel_steel', 1), Item.of('gtceu:small_aluminium_gear', 6)])
        .itemOutputs(Item.of('tacz:modern_kinetic_gun', '{GunCurrentAmmoCount:2,GunId:"tacz:rpk",HasBulletInBarrel:1b}'))
        .circuit(6)
        .duration(20)
        .EUt(128)
        .addCondition(WFResearch.condition('inf_rpk'));

});
