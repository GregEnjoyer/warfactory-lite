ServerEvents.recipes(event => {

    event.remove({output: 'superbwarfare:armor_plate'})

    event.recipes.gtceu.forge_hammer('superbwarfarearmorplate')
    .itemInputs(Item.of('gtceu:steel_plate', 2), 'minecraft:brick_slab')
    .itemOutputs(Item.of('superbwarfare:armor_plate', 4))
    .duration(200)
    .EUt(6)

    const armor = [
        { id: 'wwii_uniforms_mod:dutch_armor_pack',             circuit: 1 },
        { id: 'wwii_uniforms_mod:belgian_armor_pack',             circuit: 2 },
        { id: 'wwii_uniforms_mod:german_armor_pack',             circuit: 3 },
        { id: 'wwii_uniforms_mod:italian_armor_pack',    circuit: 4 },
        { id: 'wwii_uniforms_mod:chinese_armor_pack',   circuit: 5 },
        { id: 'wwii_uniforms_mod:finnish_armor_pack',          circuit: 6 },
        { id: 'wwii_uniforms_mod:finnish_snow_armor_pack',          circuit: 7 },
        { id: 'wwii_uniforms_mod:russian_forest_armor_pack',             circuit: 8 },
        { id: 'wwii_uniforms_mod:russian_snow_armor_pack',  circuit: 9 },
        { id: 'wwii_uniforms_mod:hungarian_armor_pack',             circuit: 11 },
        { id: 'wwii_uniforms_mod:yugoslavian_armor_pack',             circuit: 12 },
        { id: 'wwii_uniforms_mod:japanese_armor_pack',             circuit: 13 },
          { id: 'wwii_uniforms_mod:french_armor_pack',             circuit: 14 },
           { id: 'wwii_uniforms_mod:polish_armor_pack',             circuit: 15 }
    ];

    armor.forEach(armor => {
        // Remove existing recipes
        event.remove({ output: armor.id });

        // Add the armor recipes
        event.recipes.gtceu.assembler(armor.id)
        .itemInputs(Item.of('minecraft:white_wool', 5), '#forge:dyes', 'superbwarfare:armor_plate')
        .itemOutputs(Item.of(armor.id, 1))
        .duration(20)
        .circuit(armor.circuit)
        .EUt(16);
    });

     });
