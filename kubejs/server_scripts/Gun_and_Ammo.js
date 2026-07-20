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
    // GUNS - PLACEHOLDER REPLACEMENTS (REMOVED)
    // Real, era-appropriate recipes now live in LV.js/MV.js/HV.js/Primitive.js per
    // warfactory-lite-gun-progression-notes.md. Guns not covered there are intentionally
    // excluded from progression (see doc §3.3) and get no recipe at all.
    // =========================

    // =========================
    // ATTACHMENTS (warfactory-lite-gun-progression-notes.md §5.3)
    // Gated by attachment FUNCTION, not by which gun/mod it belongs to - a WW-era
    // bayonet and a modern one cost the same, since the design principle is "what does
    // this part do", not "what pack did it ship in". This is the least-verified part of
    // the progression brief (no prior in-pack attachment recipes existed to extend), so
    // category placement calls (particularly the WW-era optics and ronmc misc parts,
    // which don't map cleanly onto the doc's tacz-centric naming) are our own judgment.
    // =========================

    function attachmentGroup(prefix, ids, inputs, duration, eut, condition) {
        ids.forEach(id => {
            let recipe = event.recipes.gtceu.assembler(`attachment_${prefix}_${id.replace(':', '_')}`)
            .itemInputs(inputs)
            .itemOutputs(Item.of('tacz:attachment', 1, `{AttachmentId:"${id}"}`))
            .duration(duration)
            .EUt(eut);
            if (condition) recipe.addCondition(WFResearch.condition(condition));
        });
    }

    // Grips & stocks (LV) - basic ergonomic parts, no electronics or optics involved
    attachmentGroup('grip_stock', [
        'tacz:grip_cobra', 'tacz:grip_cqr', 'tacz:grip_magpul_afg_2', 'tacz:grip_osovets_black',
        'tacz:grip_rk0', 'tacz:grip_rk1_b25u', 'tacz:grip_rk6', 'tacz:grip_se_5', 'tacz:grip_td',
        'tacz:grip_vertical_military', 'tacz:grip_vertical_ranger', 'tacz:grip_vertical_talon',
        'tacz:oem_stock_heavy', 'tacz:oem_stock_light', 'tacz:oem_stock_tactical',
        'tacz:stock_ak12', 'tacz:stock_carbon_bone_c5', 'tacz:stock_heavy_spas_12',
        'tacz:stock_hk_slim_line', 'tacz:stock_m4ss', 'tacz:stock_militech_b5', 'tacz:stock_moe',
        'tacz:stock_ripstock', 'tacz:stock_sba3', 'tacz:stock_tactical_ar', 'tacz:stock_tactical_spas_12',
        'ronmc:angled_grip', 'ronmc:combat_grip', 'ronmc:mp5a2_grip', 'ronmc:side_angle_grip',
        'ronmc:stock_tactical_tan',
    ], [Item.of('gtceu:treated_wood_plate', 1), Item.of('gtceu:small_steel_gear', 1)], 100, 32, null);

    // Extended magazines (LV) - just more sheet steel and a stronger spring
    attachmentGroup('mag', [
        'tacz:extended_mag_1', 'tacz:extended_mag_2', 'tacz:extended_mag_3',
        'tacz:light_extended_mag_1', 'tacz:light_extended_mag_2', 'tacz:light_extended_mag_3',
        'tacz:shotgun_extended_mag_1', 'tacz:shotgun_extended_mag_2', 'tacz:shotgun_extended_mag_3',
        'tacz:sniper_extended_mag_1', 'tacz:sniper_extended_mag_2', 'tacz:sniper_extended_mag_3',
    ], [Item.of('gtceu:steel_plate', 1), Item.of('gtceu:small_steel_spring', 1)], 100, 32, null);

    // Muzzle devices - brakes/chokes/compensators (LV) - simple machined steel, no optics/explosives
    attachmentGroup('muzzle', [
        'tacz:muzzle_brake_cthulhu', 'tacz:muzzle_brake_cyclone_d2', 'tacz:muzzle_brake_mastiff_sg',
        'tacz:muzzle_brake_pioneer', 'tacz:muzzle_brake_timeless50', 'tacz:muzzle_brake_trex',
        'tacz:muzzle_choke_sg', 'tacz:muzzle_compensator_trident', 'tacz:muzzle_duckbill_sg',
        'tacz:deagle_golden_long_barrel',
        'ronmc:12ga_brake', 'ronmc:357_snub', 'ronmc:snub', 'ronmc:spread_choke',
    ], [Item.of('gtceu:steel_plate', 1)], 100, 32, null);

    // Bayonets (LV) - just a fitted steel blade
    attachmentGroup('bayonet', [
        'tacz:bayonet_6h3', 'tacz:bayonet_m9',
        'ww:bayonet_m1884', 'ww:bayonet_m1930', 'ww:bayonet_no4',
    ], [Item.of('gtceu:steel_plate', 2)], 100, 32, null);

    // WW-era optics (LV, tied to the same era as the WW1/WW2 guns they mount to) -
    // simple ground-glass scopes, not the precision MV/HV tacz line below
    attachmentGroup('ww_optic', [
        'ww:m82', 'ww:no32', 'ww:peyu', 'ww:pyu', 'ww:zf39', 'ww:zf4',
    ], [Item.of('gtceu:glass_lens', 1), Item.of('gtceu:treated_wood_plate', 1), Item.of('gtceu:steel_screw', 1)], 150, 32, null);

    // Iron/red-dot sights (MV) - needs a proper glass lens, gated behind guns2 like the
    // rest of the Cold War pistol/SMG line these mostly mount to
    attachmentGroup('sight', [
        'tacz:sight_552', 'tacz:sight_acro_pistol', 'tacz:sight_acro_rifle', 'tacz:sight_coyote',
        'tacz:sight_deltapoint_pistol', 'tacz:sight_deltapoint_rifle', 'tacz:sight_exp3',
        'tacz:sight_fastfire_pistol', 'tacz:sight_fastfire_rifle', 'tacz:sight_okp7', 'tacz:sight_p90',
        'tacz:sight_pk06_pistol', 'tacz:sight_pk06_rifle', 'tacz:sight_rmr_dot', 'tacz:sight_sro_dot',
        'tacz:sight_srs_02', 'tacz:sight_t1', 'tacz:sight_t2', 'tacz:sight_uh1',
        'ronmc:canted', 'ronmc:rmr_dot', 'ronmc:sro_dot',
    ], [Item.of('gtceu:steel_plate', 1), Item.of('gtceu:glass_lens', 1)], 100, 4, 'guns2');

    // Magnified scopes, basic tier (MV) - same materials the pre-existing `scopes` array
    // above already uses, so this one has a loose in-pack precedent
    attachmentGroup('scope_basic', [
        'tacz:scope_1873_6x', 'tacz:scope_98k', 'tacz:scope_aug_default', 'tacz:scope_contender',
        'tacz:scope_retro_2x', 'tacz:scope_scout', 'tacz:scope_standard_8x',
    ], [Item.of('gtceu:glass_lens', 2), Item.of('gtceu:steel_screw', 2), Item.of('gtceu:aluminium_plate', 1)], 150, 4, 'guns2');

    // Magnified scopes, advanced tier (HV) - same formula, doubled optics for the
    // higher-end glass, ungated to match how HV.js's own gun recipes are ungated
    attachmentGroup('scope_advanced', [
        'tacz:scope_acog_ta31', 'tacz:scope_elcan_4x', 'tacz:scope_hamr', 'tacz:scope_lpvo_1_6',
        'tacz:scope_mk5hd', 'tacz:scope_qmk152', 'tacz:scope_vudu',
    ], [Item.of('gtceu:glass_lens', 2), Item.of('gtceu:steel_screw', 2), Item.of('gtceu:aluminium_plate', 2)], 150, 512, null);

    // Suppressors (MV) - needs precision-machined parts, gated same as MV pistols/SMGs
    attachmentGroup('suppressor', [
        'tacz:muzzle_silencer_knight_qd', 'tacz:muzzle_silencer_mirage', 'tacz:muzzle_silencer_phantom_s1',
        'tacz:muzzle_silencer_ptilopsis', 'tacz:muzzle_silencer_sg', 'tacz:muzzle_silencer_ursus',
        'tacz:muzzle_silencer_vulture', 'tacz:muzzle_silencer_wraith',
        'ww:silence', 'ww:silencep',
    ], [Item.of('gtceu:steel_plate', 1), Item.of('gtceu:steel_screw', 2)], 150, 4, 'guns2');

    // Lasers & lights (MV) - needs an actual electronic circuit, so it can't be earlier than MV
    attachmentGroup('laser_light', [
        'tacz:laser_compact', 'tacz:laser_lopro', 'tacz:laser_nightstick', 'tacz:laser_peq15', 'tacz:laser_peq6',
        'ronmc:custom_laser', 'ronmc:flashlight_1', 'ronmc:flashlight_2', 'ronmc:laser_peq15',
        'ronmc:laser_pointer', 'ronmc:tac_laser',
    ], [Item.of('gtceu:polyethylene_plate', 1), Item.of('gtceu:basic_electronic_circuit', 1)], 150, 4, 'guns2');

    // Standard ammo mods - FMJ/HP/AP/slug (MV) - just a different bullet material, same
    // tier as the rest of Cold War ammo
    attachmentGroup('ammo_mod', [
        'tacz:ammo_mod_fmj', 'tacz:ammo_mod_hp', 'tacz:ammo_mod_i', 'tacz:ammo_mod_slug',
    ], [Item.of('gtceu:lead_nugget', 2), Item.of('gtceu:steel_nugget', 1)], 100, 4, 'guns2');

    // Explosive ammo mods - HE (HV) - needs an actual explosive-chain input, like the
    // grenade launchers in HV.js
    attachmentGroup('ammo_mod_explosive', [
        'tacz:ammo_mod_he', 'ronmc:m32a1_he',
    ], [Item.of('gtceu:dynamite', 1), Item.of('gtceu:steel_nugget', 1)], 150, 512, null);

    // =========================
    // OTHER AMMO - PLACEHOLDER REPLACEMENTS (calibers not covered above)
    // TODO: placeholder inputs, tune per caliber (rpg_rocket/40mm especially should
    // NOT share the same cheap recipe as a pistol/rifle round once real-balanced).
    // No per-item event.remove() needed here - the blanket
    // `tacz:gun_smith_table_crafting` removal above already strips these too.
    // =========================
    const otherAmmo = [
        { id: 'tacz:22wmr', circuit: 1 },
        { id: 'tacz:500mag', circuit: 3 },
        { id: 'tacz:50ae', circuit: 4 },
        { id: 'tacz:792x57', circuit: 6 },
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

    // Heavy ordnance calibers - genuinely different from a standard round, not just a
    // relabeled pistol/rifle recipe. 50bmg gets a thicker casing and more propellant;
    // 40mm and rpg_rocket are explosive-payload/rocket rounds and pull from the same
    // explosive-chain / rocket-fuel items the launcher guns and MISC section already use.
    const heavyOrdnanceAmmo = [
        {
            id: 'tacz:50bmg', circuit: 5, qty: 2, duration: 60, eut: 30,
            inputs: [Item.of('kubejs:bullet_casing_xl', 2), Item.of('gtceu:steel_plate', 1), Item.of('gtceu:small_gunpowder_dust', 2)],
        },
        {
            id: 'tacz:40mm', circuit: 2, qty: 2, duration: 100, eut: 30,
            inputs: [Item.of('kubejs:bullet_casing_xl', 1), Item.of('gtceu:dynamite', 1)],
        },
        {
            id: 'tacz:rpg_rocket', circuit: 7, qty: 1, duration: 200, eut: 30,
            inputs: [Item.of('kubejs:bullet_casing_xl', 2), Item.of('gtceu:dynamite', 1), 'kubejs:solid_rocket_fuel'],
        },
    ];

    heavyOrdnanceAmmo.forEach(ammo => {
        event.recipes.gtceu.ammo_press(`heavy_ordnance_ammo_${ammo.circuit}`)
        .itemInputs(ammo.inputs)
        .itemOutputs(Item.of('tacz:ammo', ammo.qty, `{AmmoId:"${ammo.id}"}`))
        .circuit(ammo.circuit)
        .duration(ammo.duration)
        .EUt(ammo.eut);
    });
});
