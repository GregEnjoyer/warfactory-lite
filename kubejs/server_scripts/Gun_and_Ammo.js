ServerEvents.recipes(event => {

    // =========================
    // REMOVE NORMAL TACZ RECIPES
    // =========================
    // Every gun, ammo, and attachment recipe across all three gun packs (tacz / ww / ronmc)
    // crafts at the Gunsmith Table via this single recipe type. Strip it so the GTCEu
    // replacements below (and any other progression-gated source) are the only way in.
    event.remove({ type: "tacz:gun_smith_table_crafting" });

    // =========================
    // REMOVE NORMAL SUPERBWARFARE (+ addon) RECIPES
    // =========================
    // Unlike TaCZ, superbwarfare and its addons mostly ship recipes under SHARED vanilla
    // types (crafting_shaped/shapeless, smithing_transform, blasting, smelting), not one
    // dedicated type of their own - so a blanket type-only removal would nuke every other
    // mod's (and our own) recipes of those types too. Every removal below is scoped with
    // `mod` to the exact namespace that recipe actually shipped from, so only genuine
    // superbwarfare/addon recipes are touched. Our own kubejs recipes never use these types
    // at all (everything we add goes through gtceu:*), so none of this can catch our stuff -
    // the type-only calls further down (superbwarfare's own custom recipe types, which we
    // likewise never use) are safe for the same reason.
    const sbwNamespaces = ["superbwarfare", "sbw_advanced_ciws", "sbwdroneconfig", "ashvehicle", "mcsp"];
    const sbwSharedTypes = ["minecraft:crafting_shaped", "minecraft:crafting_shapeless"];
    sbwNamespaces.forEach(mod => {
        sbwSharedTypes.forEach(type => {
            event.remove({ mod: mod, type: type });
        });
    });
    // superbwarfare-only shared types (its addons don't use these)
    event.remove({ mod: "superbwarfare", type: "minecraft:smithing_transform" });
    event.remove({ mod: "superbwarfare", type: "minecraft:blasting" });
    event.remove({ mod: "superbwarfare", type: "minecraft:smelting" });
    event.remove({ mod: "superbwarfare", type: "forge:nbt" });
    // superbwarfare's own custom recipe types (blueprint research, vehicle reset, dyes, etc.)
    event.remove({ type: "superbwarfare:researching" });
    event.remove({ type: "superbwarfare:vehicle_assembling" }); // covers superbwarfare + all 3 addons
    event.remove({ type: "superbwarfare:vehicle_reset" });
    event.remove({ type: "superbwarfare:smoke_dye" });
    event.remove({ type: "superbwarfare:potion_mortar_shell" });
    // addon-specific custom types
    event.remove({ type: "ashvehicle:jerry_can_refill" });

    // =========================
    // CASINGS
    // =========================
    const casing = [
        { id: 'kubejs:bullet_casing_small', plates: 1, amount: 5, circuit: 1 },
        { id: 'kubejs:bullet_casing_medium', plates: 2, amount: 5, circuit: 2 },
        { id: 'kubejs:bullet_casing_large', plates: 3, amount: 5, circuit: 3 },
        { id: 'kubejs:bullet_casing_xl', plates: 4, amount: 1, circuit: 4 },
    ];

    casing.forEach(c => {
        event.recipes.gtceu.cutter(c.id)
        .itemInputs(Item.of('gtceu:brass_plate', c.plates))
        .itemOutputs(Item.of(c.id, c.amount))
        .duration(20)
        .circuit(c.circuit)
        .EUt(4);
    });

    // =========================
    // HEAVY AMMO
    // =========================
    const heavyAmmo = [
        { id: 'superbwarfare:heavy_ammo', circuit: 2, plate: 1, nugget: 1, gunpowder: 1 },
        // 'superbwarfare:small_shell' is not a real item - superbwarfare only registers typed
        // small-caliber shells (see assets/superbwarfare/lang/en_us.json), which is why this
        // recipe threw "Invalid or empty output item". Expanded to the four real variants.
        { id: 'superbwarfare:small_shell_ap', circuit: 3, plate: 1, nugget: 3, gunpowder: 3 },
        { id: 'superbwarfare:small_shell_he', circuit: 4, plate: 1, nugget: 3, gunpowder: 3 },
        { id: 'superbwarfare:small_shell_gs', circuit: 5, plate: 1, nugget: 3, gunpowder: 3 },
        { id: 'superbwarfare:small_shell_aa', circuit: 6, plate: 1, nugget: 3, gunpowder: 3 },
    ];

    heavyAmmo.forEach(h => {
        event.recipes.gtceu.ammo_press(h.id)
        .itemInputs(
            Item.of('kubejs:bullet_casing_large', h.plate),
                    Item.of('gtceu:steel_nugget', h.nugget),
                    Item.of('gtceu:small_gunpowder_dust', h.gunpowder)
        )
        .itemOutputs(Item.of(h.id))
        .circuit(h.circuit)
        .duration(20)
        .EUt(4);
    });

    // =========================
    // RIFLE AMMO
    // =========================
    const rifleAmmo = [
        { id: 'tacz:ammo', nbt: '{AmmoId:"tacz:556x45"}', circuit: 4 },
        { id: 'tacz:ammo', nbt: '{AmmoId:"tacz:45_70"}', circuit: 5 },
        { id: 'tacz:ammo', nbt: '{AmmoId:"tacz:545x39"}', circuit: 6 },
        { id: 'tacz:ammo', nbt: '{AmmoId:"tacz:30_06"}', circuit: 7 },
        { id: 'tacz:ammo', nbt: '{AmmoId:"tacz:57x28"}', circuit: 8 },
        { id: 'tacz:ammo', nbt: '{AmmoId:"tacz:46x30"}', circuit: 9 },
        { id: 'tacz:ammo', nbt: '{AmmoId:"tacz:338"}', circuit: 10 },
        { id: 'tacz:ammo', nbt: '{AmmoId:"ww:77a"}', circuit: 11 },
        { id: 'tacz:ammo', nbt: '{AmmoId:"tacz:762x54"}', circuit: 12 },
        { id: 'tacz:ammo', nbt: '{AmmoId:"tacz:762x39"}', circuit: 13 },
        { id: 'tacz:ammo', nbt: '{AmmoId:"tacz:58x42"}', circuit: 14 },
        { id: 'tacz:ammo', nbt: '{AmmoId:"ww:303"}', circuit: 15 },
        { id: 'tacz:ammo', nbt: '{AmmoId:"tacz:308"}', circuit: 16 },
        { id: 'tacz:ammo', nbt: '{AmmoId:"tacz:68x51fury"}', circuit: 17 },
        { id: 'tacz:ammo', nbt: '{AmmoId:"ww:30c"}', circuit: 18 },
        { id: 'tacz:ammo', nbt: '{AmmoId:"tacz:12g"}', circuit: 19 },
        { id: 'tacz:ammo', nbt: '{AmmoId:"ronmc:10mm"}', circuit: 20 },
        { id: 'tacz:ammo', nbt: '{AmmoId:"ronmc:762x51"}', circuit: 21 },
        { id: 'tacz:ammo', nbt: '{AmmoId:"ronmc:65x48"}', circuit: 22 },
    ];

    rifleAmmo.forEach(ammo => {
        event.remove({ output: Item.of(ammo.id, ammo.nbt) });

        event.recipes.gtceu.ammo_press(`rifle_ammo_${ammo.circuit}`)
        .itemInputs(
            Item.of('kubejs:bullet_casing_medium'),
                    'gtceu:lead_nugget',
                    'gtceu:small_gunpowder_dust'
        )
        .itemOutputs(Item.of(ammo.id, 5, ammo.nbt))
        .circuit(ammo.circuit)
        .duration(20)
        .EUt(4);
    });

    // =========================
    // PISTOL AMMO
    // =========================
    const pistolAmmo = [

 { id: 'tacz:ammo', nbt: '{AmmoId:"tacz:762x25"}', circuit: 1 },
  { id: 'tacz:ammo', nbt: '{AmmoId:"tacz:45acp"}', circuit: 2 },
   { id: 'tacz:ammo', nbt: '{AmmoId:"ww:8mm"}', circuit: 3 },
   { id: 'tacz:ammo', nbt: '{AmmoId:"tacz:9mm"}', circuit: 4 },
   { id: 'tacz:ammo', nbt: '{AmmoId:"ww:765"}', circuit: 5 },
{ id: 'tacz:ammo', nbt: '{AmmoId:"tacz:357mag"}', circuit: 6 },
{ id: 'tacz:ammo', nbt: '{AmmoId:"ronmc:10mm"}', circuit: 7 },
    ];

    pistolAmmo.forEach(ammo => {
        event.remove({ output: Item.of(ammo.id, ammo.nbt) });

        event.recipes.gtceu.ammo_press(`pistol_ammo_${ammo.circuit}`)
        .itemInputs(
            Item.of('kubejs:bullet_casing_small'),
                    'gtceu:tiny_gunpowder_dust',
                    'gtceu:lead_nugget'
        )
        .itemOutputs(Item.of(ammo.id, 7, ammo.nbt))
        .circuit(ammo.circuit)
        .duration(20)
        .EUt(4);
    });

    // =========================
    // PARTS - GRIPS
    // =========================
    const GRIPS = [
        { id: 'kubejs:grip_wooden', inputs: ['gtceu:treated_wood_rod', 'gtceu:treated_wood_plate'], circuit: 1, duration: 100, eut: 16 },
        { id: 'kubejs:grip_steel', inputs: ['gtceu:steel_plate', 'gtceu:steel_rod'], circuit: 2, duration: 200, eut: 30 },
        { id: 'kubejs:grip_plastic', inputs: ['gtceu:silicone_rubber_plate', 'gtceu:rubber_ring'], circuit: 3, duration: 200, eut: 30 },
    ];

    GRIPS.forEach(g => {
        event.recipes.gtceu.assembler(g.id)
        .itemInputs(g.inputs[0], g.inputs[1])
        .itemOutputs(Item.of(g.id))
        .circuit(g.circuit)
        .duration(g.duration)
        .EUt(g.eut);
    });

    // =========================
    // PARTS - STOCKS
    // =========================
    const STOCKS = [
        { id: 'kubejs:stock_wooden', inputs: ['gtceu:treated_wood_plate'], circuit: 1, duration: 100, eut: 16 },
        { id: 'kubejs:stock_steel', inputs: ['gtceu:steel_plate'], circuit: 2, duration: 200, eut: 30 },
        { id: 'kubejs:stock_plastic', inputs: ['gtceu:silicone_rubber_plate'], circuit: 3, duration: 200, eut: 30 },
    ];

    STOCKS.forEach(s => {
        event.recipes.gtceu.assembler(s.id)
        .itemInputs(s.inputs[0])
        .itemOutputs(Item.of(s.id))
        .circuit(s.circuit)
        .duration(s.duration)
        .EUt(s.eut)
    });

    // =========================
    // MISC
    // =========================
    event.recipes.gtceu.assembler('kubejs:solid_rocket_fuel')
    .itemInputs('gtceu:sulfur_dust', 'gtceu:saltpeter_dust', 'gtceu:charcoal_dust')
    .itemOutputs('kubejs:solid_rocket_fuel')
    .circuit(1)
    .duration(200)
    .EUt(30);

    event.recipes.gtceu.assembler('kubejs:rpg')
    .itemInputs(
        Item.of('kubejs:heavy_barrel_steel', 3),
                Item.of('gtceu:treated_wood_plate', 2),
                Item.of('gtceu:small_steel_spring')
    )
    .circuit(1)
    .itemOutputs(Item.of('superbwarfare:rpg'))
    .duration(400)
    .addCondition(WFResearch.condition('my_research'))
    .EUt(16)

    // =========================
    // ATTACHMENTS - SCOPES
    // =========================
    const scopes = [
        // ===== Red Dots / Reflex Sights =====
       // { id: 'pointblank:aimpoint',         circuit: 1,  lenses: 1, screws: 2, plates: 1 },
       // { id: 'pointblank:aimpoint_t2',      circuit: 2,  lenses: 1, screws: 2, plates: 1 },
       // { id: 'pointblank:delta',            circuit: 3,  lenses: 1, screws: 2, plates: 1 },
       // { id: 'pointblank:hi_red',           circuit: 4,  lenses: 1, screws: 2, plates: 1 },
       // { id: 'pointblank:hi_red_zoom',      circuit: 5,  lenses: 2, screws: 2, plates: 1 },
       // { id: 'pointblank:holographic',      circuit: 6,  lenses: 1, screws: 3, plates: 1 },
      //  { id: 'pointblank:holographic558',   circuit: 7,  lenses: 2, screws: 3, plates: 1 },
       // { id: 'pointblank:holographic_em',   circuit: 8,  lenses: 1, screws: 3, plates: 1 },
      //  { id: 'pointblank:operatorreflex',   circuit: 9,  lenses: 1, screws: 2, plates: 1 },
      //  // ===== Combat Optics =====
    //    { id: 'pointblank:acog',             circuit: 10, lenses: 2, screws: 4, plates: 2 },
   //     { id: 'pointblank:specter',          circuit: 11, lenses: 2, screws: 4, plates: 2 },
     //   { id: 'pointblank:ppco',             circuit: 12, lenses: 2, screws: 4, plates: 2 },
    //    { id: 'pointblank:hamr',             circuit: 13, lenses: 2, screws: 4, plates: 2 },
        // ===== Precision / Sniper Scopes =====
    //    { id: 'pointblank:drake_scope',      circuit: 14, lenses: 4, screws: 6, plates: 3 },
     //   { id: 'pointblank:eaglescope',       circuit: 15, lenses: 4, screws: 6, plates: 3 },
   //     { id: 'pointblank:hawk_scope',       circuit: 16, lenses: 4, screws: 6, plates: 3 },
      //  { id: 'pointblank:wolf_scope',       circuit: 17, lenses: 4, screws: 6, plates: 3 },
     //   { id: 'pointblank:precision_scope',  circuit: 18, lenses: 5, screws: 8, plates: 4 },
     //   { id: 'pointblank:pu_scope',         circuit: 19, lenses: 3, screws: 5, plates: 2 },
     //   { id: 'pointblank:rspec',            circuit: 20, lenses: 5, screws: 8, plates: 4 },
    ];

    scopes.forEach(s => {
        event.recipes.gtceu.assembler(`scope_${s.circuit}`)
        .itemInputs(
            Item.of('gtceu:glass_lens', s.lenses),
                    Item.of('gtceu:steel_screw', s.screws),
                    Item.of('gtceu:aluminium_plate', s.plates)
        )
        .itemOutputs(Item.of(s.id))
        .circuit(s.circuit)
        .duration(100)
        .EUt(30);
    });

    // =========================
    // GUNS - PLACEHOLDER REPLACEMENTS
    // TODO: these are stubs so every gun has a working GTCEu recipe to tune. Replace
    // itemInputs()/duration()/EUt() per entry with real balanced values. The count on
    // the placeholder input is only there to give each recipe a unique signature (GTCEu
    // circuits cap out well under 153, so quantity is the disambiguator here instead).
    // =========================
    const gunPlaceholders = [
        { id: 'tacz:aa12', qty: 1 },
        { id: 'tacz:ai_awp', qty: 2 },
        { id: 'tacz:ak47', qty: 3 },
        { id: 'tacz:aug', qty: 4 },
        { id: 'tacz:b93r', qty: 5 },
        { id: 'tacz:cz75', qty: 6 },
        { id: 'tacz:db_long', qty: 7 },
        { id: 'tacz:db_short', qty: 8 },
        { id: 'tacz:deagle', qty: 9 },
        { id: 'tacz:deagle_golden', qty: 10 },
        { id: 'tacz:fn_evolys', qty: 11 },
        { id: 'tacz:fn_fal', qty: 12 },
        { id: 'tacz:g36k', qty: 13 },
        { id: 'tacz:glock_17', qty: 14 },
        { id: 'tacz:hk416d', qty: 15 },
        { id: 'tacz:hk_g3', qty: 16 },
        { id: 'tacz:hk_mk23', qty: 17 },
        { id: 'tacz:hk_mp5a5', qty: 18 },
        { id: 'tacz:kar98', qty: 19 },
        { id: 'tacz:lonetrail', qty: 20 },
        { id: 'tacz:m1014', qty: 21 },
        { id: 'tacz:m107', qty: 22 },
        { id: 'tacz:m16a1', qty: 23 },
        { id: 'tacz:m16a4', qty: 24 },
        { id: 'tacz:m1911', qty: 25 },
        { id: 'tacz:m249', qty: 26 },
        { id: 'tacz:m320', qty: 27 },
        { id: 'tacz:m4a1', qty: 28 },
        { id: 'tacz:m700', qty: 29 },
        { id: 'tacz:m870', qty: 30 },
        { id: 'tacz:m95', qty: 31 },
        { id: 'tacz:m9a4', qty: 32 },
        { id: 'tacz:minigun', qty: 33 },
        { id: 'tacz:mk14', qty: 34 },
        { id: 'tacz:p320', qty: 35 },
        { id: 'tacz:p90', qty: 36 },
        { id: 'tacz:qbz_191', qty: 37 },
        { id: 'tacz:qbz_95', qty: 38 },
        { id: 'tacz:rhino357', qty: 39 },
        { id: 'tacz:rpg7', qty: 40 },
        { id: 'tacz:rpk', qty: 41 },
        { id: 'tacz:scar_h', qty: 42 },
        { id: 'tacz:scar_l', qty: 43 },
        { id: 'tacz:sks_tactical', qty: 44 },
        { id: 'tacz:spas_12', qty: 45 },
        { id: 'tacz:spr15hb', qty: 46 },
        { id: 'tacz:springfield1873', qty: 47 },
        { id: 'tacz:taurus500', qty: 48 },
        { id: 'tacz:taurus943', qty: 49 },
        { id: 'tacz:timeless50', qty: 50 },
        { id: 'tacz:type_81', qty: 51 },
        { id: 'tacz:ump45', qty: 52 },
        { id: 'tacz:uzi', qty: 53 },
        { id: 'tacz:vector45', qty: 54 },
        { id: 'ww:anm2', qty: 55 },
        { id: 'ww:as44', qty: 56 },
        { id: 'ww:avt_40', qty: 57 },
        { id: 'ww:c96', qty: 58 },
        { id: 'ww:cph', qty: 59 },
        { id: 'ww:dp28', qty: 60 },
        { id: 'ww:g43', qty: 61 },
        { id: 'ww:kar98k', qty: 62 },
        { id: 'ww:lee', qty: 63 },
        { id: 'ww:m1', qty: 64 },
        { id: 'ww:m1897', qty: 65 },
        { id: 'ww:m1903', qty: 66 },
        { id: 'ww:m1911a1', qty: 67 },
        { id: 'ww:m1912', qty: 68 },
        { id: 'ww:m1918', qty: 69 },
        { id: 'ww:m1918a1', qty: 70 },
        { id: 'ww:m1918a2', qty: 71 },
        { id: 'ww:m1919', qty: 72 },
        { id: 'ww:m1921', qty: 73 },
        { id: 'ww:m1928a1', qty: 74 },
        { id: 'ww:m1a1', qty: 75 },
        { id: 'ww:m1g', qty: 76 },
        { id: 'ww:m1t', qty: 77 },
        { id: 'ww:m2', qty: 78 },
        { id: 'ww:m28s', qty: 79 },
        { id: 'ww:m2s', qty: 80 },
        { id: 'ww:m50', qty: 81 },
        { id: 'ww:m712', qty: 82 },
        { id: 'ww:m91', qty: 83 },
        { id: 'ww:mg34', qty: 84 },
        { id: 'ww:mg42', qty: 85 },
        { id: 'ww:mp28', qty: 86 },
        { id: 'ww:mp34', qty: 87 },
        { id: 'ww:mp38', qty: 88 },
        { id: 'ww:mp40', qty: 89 },
        { id: 'ww:mp41', qty: 90 },
        { id: 'ww:p08', qty: 91 },
        { id: 'ww:p38', qty: 92 },
        { id: 'ww:pps', qty: 93 },
        { id: 'ww:s1100', qty: 94 },
        { id: 'ww:sten', qty: 95 },
        { id: 'ww:stg44', qty: 96 },
        { id: 'ww:svt_40', qty: 97 },
        { id: 'ww:t100', qty: 98 },
        { id: 'ww:t100l', qty: 99 },
        { id: 'ww:t14', qty: 100 },
        { id: 'ww:t20', qty: 101 },
        { id: 'ww:t96', qty: 102 },
        { id: 'ww:t99', qty: 103 },
        { id: 'ww:tbe', qty: 104 },
        { id: 'ww:type38', qty: 105 },
        { id: 'ww:type99', qty: 106 },
        { id: 'ronmc:357_magnum', qty: 107 },
        { id: 'ronmc:509', qty: 108 },
        { id: 'ronmc:57usg', qty: 109 },
        { id: 'ronmc:590m', qty: 110 },
        { id: 'ronmc:870cqb', qty: 111 },
        { id: 'ronmc:b1301', qty: 112 },
        { id: 'ronmc:b92x', qty: 113 },
        { id: 'ronmc:beanbag_shot', qty: 114 },
        { id: 'ronmc:entryman', qty: 115 },
        { id: 'ronmc:f90', qty: 116 },
        { id: 'ronmc:g36c', qty: 117 },
        { id: 'ronmc:g3a3', qty: 118 },
        { id: 'ronmc:ga416', qty: 119 },
        { id: 'ronmc:glock_18c', qty: 120 },
        { id: 'ronmc:glock_19', qty: 121 },
        { id: 'ronmc:lvar', qty: 122 },
        { id: 'ronmc:m1014', qty: 123 },
        { id: 'ronmc:m11', qty: 124 },
        { id: 'ronmc:m14', qty: 125 },
        { id: 'ronmc:m1911', qty: 126 },
        { id: 'ronmc:m32a1', qty: 127 },
        { id: 'ronmc:m45a1', qty: 128 },
        { id: 'ronmc:mcx', qty: 129 },
        { id: 'ronmc:mk16', qty: 130 },
        { id: 'ronmc:mk17', qty: 131 },
        { id: 'ronmc:mk18', qty: 132 },
        { id: 'ronmc:mkv', qty: 133 },
        { id: 'ronmc:mp5_10mm', qty: 134 },
        { id: 'ronmc:mp5a2', qty: 135 },
        { id: 'ronmc:mp5a3', qty: 136 },
        { id: 'ronmc:mp5sd6', qty: 137 },
        { id: 'ronmc:mp7', qty: 138 },
        { id: 'ronmc:mp9', qty: 139 },
        { id: 'ronmc:mpx', qty: 140 },
        { id: 'ronmc:p90', qty: 141 },
        { id: 'ronmc:p99', qty: 142 },
        { id: 'ronmc:raider', qty: 143 },
        { id: 'ronmc:rtwc', qty: 144 },
        { id: 'ronmc:shorty', qty: 145 },
        { id: 'ronmc:sti_2011', qty: 146 },
        { id: 'ronmc:supernova', qty: 147 },
        { id: 'ronmc:train_g19', qty: 148 },
        { id: 'ronmc:train_mk18', qty: 149 },
        { id: 'ronmc:trpl', qty: 150 },
        { id: 'ronmc:ump45', qty: 151 },
        { id: 'ronmc:ump9', qty: 152 },
        { id: 'ronmc:usp45', qty: 153 },
    ];

    gunPlaceholders.forEach(g => {
        event.recipes.gtceu.assembler(`gun_placeholder_${g.id.replace(':', '_')}`)
        .itemInputs(Item.of('gtceu:steel_plate', g.qty)) // TODO: placeholder input
        .itemOutputs(Item.of('tacz:modern_kinetic_gun', 1, `{GunId:"${g.id}"}`))
        .duration(200)
        .EUt(16);
    });

    // =========================
    // ATTACHMENTS - PLACEHOLDER REPLACEMENTS
    // TODO: same deal as guns above - stub recipes, tune inputs/duration/EUt per entry.
    // =========================
    const attachmentPlaceholders = [
        { id: 'tacz:ammo_mod_fmj', qty: 1 },
        { id: 'tacz:ammo_mod_he', qty: 2 },
        { id: 'tacz:ammo_mod_hp', qty: 3 },
        { id: 'tacz:ammo_mod_i', qty: 4 },
        { id: 'tacz:ammo_mod_slug', qty: 5 },
        { id: 'tacz:bayonet_6h3', qty: 6 },
        { id: 'tacz:bayonet_m9', qty: 7 },
        { id: 'tacz:deagle_golden_long_barrel', qty: 8 },
        { id: 'tacz:extended_mag_1', qty: 9 },
        { id: 'tacz:extended_mag_2', qty: 10 },
        { id: 'tacz:extended_mag_3', qty: 11 },
        { id: 'tacz:grip_cobra', qty: 12 },
        { id: 'tacz:grip_cqr', qty: 13 },
        { id: 'tacz:grip_magpul_afg_2', qty: 14 },
        { id: 'tacz:grip_osovets_black', qty: 15 },
        { id: 'tacz:grip_rk0', qty: 16 },
        { id: 'tacz:grip_rk1_b25u', qty: 17 },
        { id: 'tacz:grip_rk6', qty: 18 },
        { id: 'tacz:grip_se_5', qty: 19 },
        { id: 'tacz:grip_td', qty: 20 },
        { id: 'tacz:grip_vertical_military', qty: 21 },
        { id: 'tacz:grip_vertical_ranger', qty: 22 },
        { id: 'tacz:grip_vertical_talon', qty: 23 },
        { id: 'tacz:laser_compact', qty: 24 },
        { id: 'tacz:laser_lopro', qty: 25 },
        { id: 'tacz:laser_nightstick', qty: 26 },
        { id: 'tacz:laser_peq15', qty: 27 },
        { id: 'tacz:laser_peq6', qty: 28 },
        { id: 'tacz:light_extended_mag_1', qty: 29 },
        { id: 'tacz:light_extended_mag_2', qty: 30 },
        { id: 'tacz:light_extended_mag_3', qty: 31 },
        { id: 'tacz:muzzle_brake_cthulhu', qty: 32 },
        { id: 'tacz:muzzle_brake_cyclone_d2', qty: 33 },
        { id: 'tacz:muzzle_brake_mastiff_sg', qty: 34 },
        { id: 'tacz:muzzle_brake_pioneer', qty: 35 },
        { id: 'tacz:muzzle_brake_timeless50', qty: 36 },
        { id: 'tacz:muzzle_brake_trex', qty: 37 },
        { id: 'tacz:muzzle_choke_sg', qty: 38 },
        { id: 'tacz:muzzle_compensator_trident', qty: 39 },
        { id: 'tacz:muzzle_duckbill_sg', qty: 40 },
        { id: 'tacz:muzzle_silencer_knight_qd', qty: 41 },
        { id: 'tacz:muzzle_silencer_mirage', qty: 42 },
        { id: 'tacz:muzzle_silencer_phantom_s1', qty: 43 },
        { id: 'tacz:muzzle_silencer_ptilopsis', qty: 44 },
        { id: 'tacz:muzzle_silencer_sg', qty: 45 },
        { id: 'tacz:muzzle_silencer_ursus', qty: 46 },
        { id: 'tacz:muzzle_silencer_vulture', qty: 47 },
        { id: 'tacz:muzzle_silencer_wraith', qty: 48 },
        { id: 'tacz:oem_stock_heavy', qty: 49 },
        { id: 'tacz:oem_stock_light', qty: 50 },
        { id: 'tacz:oem_stock_tactical', qty: 51 },
        { id: 'tacz:scope_1873_6x', qty: 52 },
        { id: 'tacz:scope_98k', qty: 53 },
        { id: 'tacz:scope_acog_ta31', qty: 54 },
        { id: 'tacz:scope_aug_default', qty: 55 },
        { id: 'tacz:scope_contender', qty: 56 },
        { id: 'tacz:scope_elcan_4x', qty: 57 },
        { id: 'tacz:scope_hamr', qty: 58 },
        { id: 'tacz:scope_lpvo_1_6', qty: 59 },
        { id: 'tacz:scope_mk5hd', qty: 60 },
        { id: 'tacz:scope_qmk152', qty: 61 },
        { id: 'tacz:scope_retro_2x', qty: 62 },
        { id: 'tacz:scope_scout', qty: 63 },
        { id: 'tacz:scope_standard_8x', qty: 64 },
        { id: 'tacz:scope_vudu', qty: 65 },
        { id: 'tacz:shotgun_extended_mag_1', qty: 66 },
        { id: 'tacz:shotgun_extended_mag_2', qty: 67 },
        { id: 'tacz:shotgun_extended_mag_3', qty: 68 },
        { id: 'tacz:sight_552', qty: 69 },
        { id: 'tacz:sight_acro_pistol', qty: 70 },
        { id: 'tacz:sight_acro_rifle', qty: 71 },
        { id: 'tacz:sight_coyote', qty: 72 },
        { id: 'tacz:sight_deltapoint_pistol', qty: 73 },
        { id: 'tacz:sight_deltapoint_rifle', qty: 74 },
        { id: 'tacz:sight_exp3', qty: 75 },
        { id: 'tacz:sight_fastfire_pistol', qty: 76 },
        { id: 'tacz:sight_fastfire_rifle', qty: 77 },
        { id: 'tacz:sight_okp7', qty: 78 },
        { id: 'tacz:sight_p90', qty: 79 },
        { id: 'tacz:sight_pk06_pistol', qty: 80 },
        { id: 'tacz:sight_pk06_rifle', qty: 81 },
        { id: 'tacz:sight_rmr_dot', qty: 82 },
        { id: 'tacz:sight_sro_dot', qty: 83 },
        { id: 'tacz:sight_srs_02', qty: 84 },
        { id: 'tacz:sight_t1', qty: 85 },
        { id: 'tacz:sight_t2', qty: 86 },
        { id: 'tacz:sight_uh1', qty: 87 },
        { id: 'tacz:sniper_extended_mag_1', qty: 88 },
        { id: 'tacz:sniper_extended_mag_2', qty: 89 },
        { id: 'tacz:sniper_extended_mag_3', qty: 90 },
        { id: 'tacz:stock_ak12', qty: 91 },
        { id: 'tacz:stock_carbon_bone_c5', qty: 92 },
        { id: 'tacz:stock_heavy_spas_12', qty: 93 },
        { id: 'tacz:stock_hk_slim_line', qty: 94 },
        { id: 'tacz:stock_m4ss', qty: 95 },
        { id: 'tacz:stock_militech_b5', qty: 96 },
        { id: 'tacz:stock_moe', qty: 97 },
        { id: 'tacz:stock_ripstock', qty: 98 },
        { id: 'tacz:stock_sba3', qty: 99 },
        { id: 'tacz:stock_tactical_ar', qty: 100 },
        { id: 'tacz:stock_tactical_spas_12', qty: 101 },
        { id: 'ww:bayonet_m1884', qty: 102 },
        { id: 'ww:bayonet_m1930', qty: 103 },
        { id: 'ww:bayonet_no4', qty: 104 },
        { id: 'ww:m82', qty: 105 },
        { id: 'ww:no32', qty: 106 },
        { id: 'ww:peyu', qty: 107 },
        { id: 'ww:pyu', qty: 108 },
        { id: 'ww:silence', qty: 109 },
        { id: 'ww:silencep', qty: 110 },
        { id: 'ww:zf39', qty: 111 },
        { id: 'ww:zf4', qty: 112 },
        { id: 'ronmc:12ga_brake', qty: 113 },
        { id: 'ronmc:357_snub', qty: 114 },
        { id: 'ronmc:angled_grip', qty: 115 },
        { id: 'ronmc:canted', qty: 116 },
        { id: 'ronmc:combat_grip', qty: 117 },
        { id: 'ronmc:custom_laser', qty: 118 },
        { id: 'ronmc:flashlight_1', qty: 119 },
        { id: 'ronmc:flashlight_2', qty: 120 },
        { id: 'ronmc:laser_peq15', qty: 121 },
        { id: 'ronmc:laser_pointer', qty: 122 },
        { id: 'ronmc:m32a1_he', qty: 123 },
        { id: 'ronmc:mp5a2_grip', qty: 124 },
        { id: 'ronmc:rmr_dot', qty: 125 },
        { id: 'ronmc:side_angle_grip', qty: 126 },
        { id: 'ronmc:snub', qty: 127 },
        { id: 'ronmc:spread_choke', qty: 128 },
        { id: 'ronmc:sro_dot', qty: 129 },
        { id: 'ronmc:stock_tactical_tan', qty: 130 },
        { id: 'ronmc:tac_laser', qty: 131 },
    ];

    attachmentPlaceholders.forEach(a => {
        event.recipes.gtceu.assembler(`attachment_placeholder_${a.id.replace(':', '_')}`)
        .itemInputs(Item.of('gtceu:aluminium_plate', a.qty)) // TODO: placeholder input
        .itemOutputs(Item.of('tacz:attachment', 1, `{AttachmentId:"${a.id}"}`))
        .duration(100)
        .EUt(16);
    });

    // =========================
    // OTHER AMMO - PLACEHOLDER REPLACEMENTS (calibers not covered above)
    // TODO: placeholder inputs, tune per caliber (rpg_rocket/40mm especially should
    // NOT share the same cheap recipe as a pistol/rifle round once real-balanced).
    // No per-item event.remove() needed here - the blanket
    // `tacz:gun_smith_table_crafting` removal above already strips these too.
    // =========================
    const otherAmmo = [
        { id: 'tacz:22wmr', circuit: 1 },
        { id: 'tacz:40mm', circuit: 2 },
        { id: 'tacz:500mag', circuit: 3 },
        { id: 'tacz:50ae', circuit: 4 },
        { id: 'tacz:50bmg', circuit: 5 },
        { id: 'tacz:792x57', circuit: 6 },
        { id: 'tacz:rpg_rocket', circuit: 7 },
        { id: 'ww:65a', circuit: 8 },
        { id: 'ww:763', circuit: 9 },
        { id: 'ronmc:300blk', circuit: 10 },
        { id: 'ronmc:68pepperball', circuit: 11 },
        { id: 'ronmc:bean_bag', circuit: 12 },
        { id: 'ronmc:slug', circuit: 13 },
        { id: 'ronmc:train_556x45', circuit: 14 },
        { id: 'ronmc:train_9mm', circuit: 15 },
    ];

    otherAmmo.forEach(ammo => {
        event.recipes.gtceu.ammo_press(`other_ammo_${ammo.circuit}`)
        .itemInputs(
            Item.of('kubejs:bullet_casing_xl'),
                    'gtceu:lead_nugget',
                    'gtceu:small_gunpowder_dust'
        )
        .itemOutputs(Item.of('tacz:ammo', 5, `{AmmoId:"${ammo.id}"}`))
        .circuit(ammo.circuit)
        .duration(20)
        .EUt(4);
    });
});
