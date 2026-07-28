// ============================================================================
// gun_parts.js — gun sub-parts (grips/stocks), the RPG launcher, optics and the
// full TaCZ/ronmc/ww attachment tree.
//
// This is what used to be guns_and_ammo.js AFTER all ammunition was pulled out
// into the consolidated ammo.js. Casings, cartridges, shells, rockets, grenades,
// mines, missiles, bombs and drones ALL live in ammo.js now.
//
// Vendor crafting-table removals live in ../cleanup/remove_crafting.js.
// ============================================================================

ServerEvents.recipes(event => {

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
    event.shaped(
        Item.of("kubejs:grip_wooden"),
            ["AA ",
             "A  ",
             "   "
            ],
        {A : '#forge:plates/treated_wood' }
    );

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
    // RPG LAUNCHER (the weapon; its rockets live in ammo.js)
    // =========================
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
});
