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

    const coldPattern = [
        {id: 'mm_armor:usacoldwarpattern', circuit: 1 },
        {id: 'mm_armor:sovietpattern', circuit: 2 },
        {id: 'mm_armor:frgpattern', circuit: 3 },
        {id: 'mm_armor:ddrpattern', circuit: 4 },
        {id: 'mm_armor:polishprpattern', circuit: 6 },
        {id: 'mm_armor:cssrpattern', circuit: 7 },
    ]
    coldPattern.forEach(coldPattern => {
        event.remove({ output: coldPattern.id });
        event.recipes.gtceu.assembler(coldPattern.id)
        .notConsumable('gtceu:basic_electronic_circuit')
        .itemInputs('gtceu:copper_plate')
        .itemOutputs(Item.of(coldPattern.id, 1))
        .duration(20)
        .circuit(coldPattern.circuit)
        .EUt(120);
    });

    const modernPattern = [
        {id: 'mm_armor:russianpattern', circuit: 1 },
        {id: 'mm_armor:usapattern', circuit: 2 },
        {id: 'mm_armor:ukrainianpattern', circuit: 3 },
        {id: 'mm_armor:germanpattern', circuit: 4 },
        {id: 'mm_armor:polishpattern', circuit: 6 },
        {id: 'mm_armor:czechpattern', circuit: 7 },
         {id: 'mm_armor:fsbpattern', circuit: 8 },
    ]
    modernPattern.forEach(modernPattern => {
        event.remove({ output: modernPattern.id });
        event.recipes.gtceu.assembler(modernPattern.id)
        .notConsumable('gtceu:advanced_integrated_circuit')
        .itemInputs('gtceu:stainless_steel_plate')
        .itemOutputs(Item.of(modernPattern.id, 1))
        .duration(20)
        .circuit(modernPattern.circuit)
        .EUt(480);
    });

    const MM_ARMOR_FABRICS = [
        // === USA ===
        { item: 'mm_armor:acufabric', circuit: 1, base: 'minecraft:iron_ingot' },
        { item: 'mm_armor:dcufabric', circuit: 2, base: 'minecraft:iron_ingot' },
        { item: 'mm_armor:desertcamofabric', circuit: 3, base: 'minecraft:iron_ingot' },
        { item: 'mm_armor:erdlfabric', circuit: 4, base: 'minecraft:iron_ingot' },
        { item: 'mm_armor:m_81woodlandfabric', circuit: 5, base: 'minecraft:iron_ingot' },
        { item: 'mm_armor:marpatfabric', circuit: 6, base: 'minecraft:iron_ingot' },
        { item: 'mm_armor:multicamfabric', circuit: 7, base: 'minecraft:iron_ingot' },
        { item: 'mm_armor:og_107fabric', circuit: 8, base: 'minecraft:iron_ingot' },
        { item: 'mm_armor:partizanfabric', circuit: 9, base: 'minecraft:iron_ingot' },
        { item: 'mm_armor:usa_greenfabric', circuit: 10, base: 'minecraft:iron_ingot' },
        { item: 'mm_armor:usablackfabric', circuit: 11, base: 'minecraft:iron_ingot' },
        { item: 'mm_armor:usahazmatfabric', circuit: 12, base: 'minecraft:iron_ingot' },
        { item: 'mm_armor:usapilotfabric', circuit: 13, base: 'minecraft:iron_ingot' },
        { item: 'mm_armor:usatanfabric', circuit: 14, base: 'minecraft:iron_ingot' },

        // === Russia / Soviet ===
        { item: 'mm_armor:adidasfabric', circuit: 1, base: 'minecraft:gold_ingot' },
        { item: 'mm_armor:emrfabric', circuit: 2, base: 'minecraft:gold_ingot' },
        { item: 'mm_armor:florafabric', circuit: 3, base: 'minecraft:gold_ingot' },
        { item: 'mm_armor:goldenberezkafabric', circuit: 4, base: 'minecraft:gold_ingot' },
        { item: 'mm_armor:gorkafabric', circuit: 5, base: 'minecraft:gold_ingot' },
        { item: 'mm_armor:klmkfabric', circuit: 6, base: 'minecraft:gold_ingot' },
        { item: 'mm_armor:m_69fabric', circuit: 7, base: 'minecraft:gold_ingot' },
        { item: 'mm_armor:m_88afghankafabric', circuit: 8, base: 'minecraft:gold_ingot' },
        { item: 'mm_armor:russianblackfabric', circuit: 9, base: 'minecraft:gold_ingot' },
        { item: 'mm_armor:russianpilotbluefabric', circuit: 10, base: 'minecraft:gold_ingot' },
        { item: 'mm_armor:russianpilottanfabric', circuit: 11, base: 'minecraft:gold_ingot' },
        { item: 'mm_armor:russiantanfabric', circuit: 12, base: 'minecraft:gold_ingot' },
        { item: 'mm_armor:russiantankistfabric', circuit: 13, base: 'minecraft:gold_ingot' },
        { item: 'mm_armor:sovietgreenfabric', circuit: 14, base: 'minecraft:gold_ingot' },
        { item: 'mm_armor:soviethazmatfabric', circuit: 15, base: 'minecraft:gold_ingot' },
        { item: 'mm_armor:sovietpilotfabric', circuit: 16, base: 'minecraft:gold_ingot' },
        { item: 'mm_armor:soviettanfabric', circuit: 17, base: 'minecraft:gold_ingot' },
        { item: 'mm_armor:soviettankistfabric', circuit: 18, base: 'minecraft:gold_ingot' },
        { item: 'mm_armor:ttskofabric', circuit: 19, base: 'minecraft:gold_ingot' },
        { item: 'mm_armor:vsr_93fabric', circuit: 20, base: 'minecraft:gold_ingot' },
        { item: 'mm_armor:winteremrfabric', circuit: 21, base: 'minecraft:gold_ingot' },
        { item: 'mm_armor:winterfabric', circuit: 22, base: 'minecraft:gold_ingot' },
        { item: 'mm_armor:dubokfabric', circuit: 23, base: 'minecraft:gold_ingot' },

        // === Ukraine ===
        { item: 'mm_armor:ukrainianbrownfabric', circuit: 1, base: 'minecraft:copper_ingot' },
        { item: 'mm_armor:mm_14fabric', circuit: 2, base: 'minecraft:copper_ingot' },

        // === Germany ===
        { item: 'mm_armor:flecktarnfabricrecipe', circuit: 1, base: 'minecraft:netherite_scrap' },
        { item: 'mm_armor:strichtarnfabric', circuit: 2, base: 'minecraft:netherite_scrap' },
        { item: 'mm_armor:tropentarnfabric', circuit: 3, base: 'minecraft:netherite_scrap' },
        { item: 'mm_armor:winterflecktarnfabric', circuit: 4, base: 'minecraft:netherite_scrap' },

        // === Poland / Czech ===
        { item: 'mm_armor:vz_60fabric', circuit: 1, base: 'minecraft:iron_nugget' },
        { item: 'mm_armor:vz_60mlokfabric', circuit: 2, base: 'minecraft:iron_nugget' },
        { item: 'mm_armor:vz_85fabric', circuit: 3, base: 'minecraft:iron_nugget' },
        { item: 'mm_armor:vz_95fabric', circuit: 4, base: 'minecraft:iron_nugget' },
        { item: 'mm_armor:wz_68fabric', circuit: 5, base: 'minecraft:iron_nugget' },
        { item: 'mm_armor:wz_93fabric', circuit: 6, base: 'minecraft:iron_nugget' },
        { item: 'mm_armor:desert_wz_93fabric', circuit: 7, base: 'minecraft:iron_nugget' },
        { item: 'mm_armor:desertvz_95fabric', circuit: 8, base: 'minecraft:iron_nugget' },

        // === NATO / Multi-nation ===
        { item: 'mm_armor:desertmarpatfabric', circuit: 1, base: 'minecraft:gold_nugget' },
        { item: 'mm_armor:desertemrfabric', circuit: 2, base: 'minecraft:gold_nugget' },
        { item: 'mm_armor:multitarnfabric', circuit: 3, base: 'minecraft:gold_nugget' },
        { item: 'mm_armor:wintermulticamfabric', circuit: 4, base: 'minecraft:gold_nugget' },

        // === Unknown / Special ===
        { item: 'mm_armor:bwmoleskinfabric', circuit: 1, base: 'minecraft:leather' },
        { item: 'mm_armor:civilianbluefabric', circuit: 2, base: 'minecraft:leather' },
        { item: 'mm_armor:greenfabric', circuit: 3, base: 'minecraft:leather' },
    ]


MM_ARMOR_FABRICS.forEach(fabric => {
    event.remove({ output: fabric.item })
    event.recipes.gtceu.assembler(fabric.item)
    .itemInputs(Item.of('minecraft:string', 8))
    .notConsumable(fabric.base)
    .itemOutputs(Item.of(fabric.item, 1))
    .duration(200)
    .circuit(fabric.circuit)
    .EUt(30)
})
/* DISABLED (WIP): the mm_armor helmetbaselv and vestplatelv items are not registered,
   so these assembler outputs resolved to empty and threw "Invalid or empty output item",
   which aborted the rest of Armor.js. Re-enable this block once those items exist.
//helmet
event.recipes.gtceu.assembler('helmetbaselv_1')
.itemInputs(Item.of('gtceu:steel_plate', 5))
.itemOutputs(Item.of('mm_armor:helmetbaselv_1'))
.duration(20)
.circuit(1)
.EUt(16);

event.recipes.gtceu.assembler('helmetbaselv_2')
.itemInputs(Item.of('gtceu:titanium_plate', 5), 'mm_armor:helmetbaselv_1')
.itemOutputs(Item.of('mm_armor:helmetbaselv_2'))
.duration(20)
.circuit(1)
.EUt(480);

event.recipes.gtceu.assembler('helmetbaselv_3')
.itemInputs(Item.of('gtceu:stainless_steel_plate', 5), 'mm_armor:helmetbaselv_2')
.itemOutputs(Item.of('mm_armor:helmetbaselv_3'))
.duration(300)
.circuit(1)
.EUt(200);

// armor parts
// LV1 - Vest Plate - MV tier
event.recipes.gtceu.assembler('vestplatelv_1')
.itemInputs(Item.of('gtceu:steel_plate', 6))
.itemOutputs(Item.of('mm_armor:vestplatelv_1'))
.duration(200)
.circuit(1)
.EUt(120); // MV

// LV2 - Vest Plate - HV tier
event.recipes.gtceu.assembler('vestplatelv_2')
.itemInputs(Item.of('gtceu:titanium_plate', 6))
.itemOutputs(Item.of('mm_armor:vestplatelv_2'))
.duration(300)
.circuit(1)
.EUt(480); // HV

// LV3 - Vest Plate - EV tier
event.recipes.gtceu.assembler('vestplatelv_3')
.itemInputs(Item.of('gtceu:stainless_steel_plate', 6))
.itemOutputs(Item.of('mm_armor:vestplatelv_3'))
.duration(400)
.circuit(1)
.EUt(1920); // EV

// LV4 - Vest Plate - IV tier
event.recipes.gtceu.assembler('vestplatelv_4')
.itemInputs(Item.of('gtceu:tungsten_steel_plate', 6))
.itemOutputs(Item.of('mm_armor:vestplatelv_4'))
.duration(500)
.circuit(1)
.EUt(7680); // IV

// LV5 - Vest Plate - LuV tier
event.recipes.gtceu.assembler('vestplatelv_5')
.itemInputs(Item.of('gtceu:hsse_plate', 6))
.itemOutputs(Item.of('mm_armor:vestplatelv_5'))
.duration(600)
.circuit(1)
.EUt(30000); // LuV

// LV6 - Vest Plate - ZPM tier
event.recipes.gtceu.assembler('vestplatelv_6')
.itemInputs(Item.of('gtceu:naquadah_plate', 6))
.itemOutputs(Item.of('mm_armor:vestplatelv_6'))
.duration(700)
.circuit(1)
.EUt(120000); // ZPM
*/

     });
