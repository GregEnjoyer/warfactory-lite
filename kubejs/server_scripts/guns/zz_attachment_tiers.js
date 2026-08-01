// ============================================================================
// zz_attachment_tiers.js — material-tier rework for TACZ scopes/sights,
// muzzle devices, suppressors and bayonets, kept OUT of gun_parts.js on
// purpose: this only removes+replaces the specific attachment IDs listed
// below, so anything upstream adds later to gun_parts.js's own attachment
// groups is left alone and just falls back to whatever gun_parts.js gives it.
//
// Filename is prefixed zz_ so it loads after every other file in this folder
// (KubeJS runs server_scripts alphabetically) - the event.remove() calls
// below need gun_parts.js's recipes to already exist to find and replace them.
//
// No new custom items here - every ingredient is either a stock GTCEu part
// (plate/rod/ring/gear/screw/lens/circuit) or one of the pack's EXISTING
// kubejs barrel/grip items (kubejs:barrel_steel, kubejs:barrel_damascus,
// kubejs:grip_wooden), used where they're a thematic fit: a bayonet gets an
// actual grip item for its handle, a long-barrel muzzle gets an actual
// barrel item for its extension.
//
// Material tier rule (per attachment, matched to the gun tier it's designed
// for - see gun_parts.js's own LV/MV/HV era comments for the gun progression
// this mirrors):
//   LV -> polyethylene      MV -> polyvinyl_chloride
//   HV -> polytetrafluoroethylene
// (EV -> polybenzimidazole is the next step up if it's ever needed, but
// nothing here goes past HV - there's no EV-tier gun yet to justify it, so
// even the premium scopes like Mk5HD/Vudu are HV.)
// Structural hardware (rods/rings/gears) escalates the same way the vehicle
// components in vehicles/components.js do: steel(LV) -> aluminium(MV) ->
// stainless_steel(HV). Circuits use the #gtceu:circuits/<tier> tag, same
// convention as components.js's cockpit/weapons_system parts, instead of a
// flat circuit item.
// ============================================================================

ServerEvents.recipes(event => {

    // GTCEu's assembler indexes recipes by their input signature: every item
    // in a group below shares the exact same ingredients, so without a
    // distinct circuit number per item GTCEu can only keep ONE of them and
    // silently drops the rest ("failed to add recipe from staging into
    // lookup DB"). Each item gets its own circuit slot (1, 2, 3, ...) purely
    // to disambiguate, the same way every actual gun recipe in this pack
    // already picks a variant via circuit number.
    function replaceAttachments(prefix, ids, inputs, duration, eut, condition) {
        ids.forEach((id, i) => {
            const output = Item.of('tacz:attachment', 1, `{AttachmentId:"${id}"}`);
            event.remove({ output: output });
            let recipe = event.recipes.gtceu.assembler(`attachment_tier_${prefix}_${id.replace(':', '_')}`)
                .itemInputs(inputs)
                .itemOutputs(output)
                .circuit(i + 1)
                .duration(duration)
                .EUt(eut);
            if (condition) recipe.addCondition(WFResearch.condition(condition));
        });
    }

    // =========================
    // MUZZLES - generic brakes/chokes/compensators (LV) - a short threaded
    // barrel extension plus a collar, not tied to any one gun.
    // =========================
    replaceAttachments('muzzle_lv', [
        'tacz:muzzle_brake_cthulhu', 'tacz:muzzle_brake_cyclone_d2', 'tacz:muzzle_brake_mastiff_sg',
        'tacz:muzzle_brake_pioneer', 'tacz:muzzle_brake_trex', 'tacz:muzzle_choke_sg',
        'tacz:muzzle_compensator_trident', 'tacz:muzzle_duckbill_sg',
        'ronmc:12ga_brake', 'ronmc:357_snub', 'ronmc:snub', 'ronmc:spread_choke',
    ], [Item.of('kubejs:barrel_steel', 1), Item.of('gtceu:steel_ring', 1), Item.of('#forge:plates/polyethylene', 1)], 100, 32, null);

    // MUZZLES - precision brakes named for specific HV pistols (timeless50,
    // deagle_golden_long_barrel literally IS a long-barrel attachment) -
    // built on a proper damascus barrel blank instead of plain steel.
    replaceAttachments('muzzle_hv', [
        'tacz:muzzle_brake_timeless50', 'tacz:deagle_golden_long_barrel',
    ], [Item.of('kubejs:barrel_damascus', 1), Item.of('gtceu:stainless_steel_ring', 1), Item.of('#forge:plates/polytetrafluoroethylene', 1), Item.of('gtceu:stainless_steel_gear', 1)], 150, 512, null);

    // =========================
    // SUPPRESSORS - WW-era cans (LV) - split out from the modern suppressor
    // list below; these mount on the WW1/WW2 guns and shouldn't cost the same
    // as a modern Knight's Armament can. Baffles (screws) + a spacer rod +
    // an outer tube plate.
    // =========================
    replaceAttachments('suppressor_ww', [
        'ww:silence', 'ww:silencep',
    ], [Item.of('gtceu:steel_screw', 3), Item.of('gtceu:steel_rod', 1), Item.of('#forge:plates/polyethylene', 1)], 100, 32, null);

    // SUPPRESSORS - modern brand-name cans (MV) - complex multi-baffle stack
    // with a quick-detach mount, gated same as the rest of the Cold
    // War/modern attachment line.
    replaceAttachments('suppressor_mv', [
        'tacz:muzzle_silencer_knight_qd', 'tacz:muzzle_silencer_mirage', 'tacz:muzzle_silencer_phantom_s1',
        'tacz:muzzle_silencer_ptilopsis', 'tacz:muzzle_silencer_sg', 'tacz:muzzle_silencer_ursus',
        'tacz:muzzle_silencer_vulture', 'tacz:muzzle_silencer_wraith',
    ], [Item.of('gtceu:steel_screw', 4), Item.of('gtceu:aluminium_rod', 1), Item.of('#forge:plates/polyvinyl_chloride', 1), Item.of('gtceu:small_aluminium_gear', 1)], 150, 128, 'guns2');

    // =========================
    // BAYONETS (LV) - cheap, but an actual knife: a forged blade riveted onto
    // a real wooden grip (the pack's existing grip_wooden item), not one
    // ingredient.
    // =========================
    replaceAttachments('bayonet', [
        'tacz:bayonet_6h3', 'tacz:bayonet_m9',
        'ww:bayonet_m1884', 'ww:bayonet_m1930', 'ww:bayonet_no4',
    ], [Item.of('kubejs:grip_wooden', 1), Item.of('gtceu:steel_plate', 1), Item.of('gtceu:steel_rod', 1), Item.of('gtceu:steel_screw', 1)], 50, 16, null);

    // =========================
    // SIGHTS - LED reflex/red-dot (MV) - battery-powered optics, so unlike
    // gun_parts.js's original recipe they now actually need a circuit.
    // =========================
    replaceAttachments('sight_reflex', [
        'tacz:sight_acro_pistol', 'tacz:sight_acro_rifle', 'tacz:sight_coyote',
        'tacz:sight_deltapoint_pistol', 'tacz:sight_deltapoint_rifle', 'tacz:sight_fastfire_pistol',
        'tacz:sight_fastfire_rifle', 'tacz:sight_okp7', 'tacz:sight_p90', 'tacz:sight_pk06_pistol',
        'tacz:sight_pk06_rifle', 'tacz:sight_rmr_dot', 'tacz:sight_sro_dot', 'tacz:sight_srs_02',
        'tacz:sight_t1', 'tacz:sight_t2', 'tacz:sight_uh1',
        'ronmc:canted', 'ronmc:rmr_dot', 'ronmc:sro_dot',
    ], [Item.of('gtceu:glass_lens', 1), Item.of('gtceu:steel_screw', 1), Item.of('gtceu:aluminium_rod', 1), Item.of('#forge:plates/polyvinyl_chloride', 1), Item.of('#gtceu:circuits/mv', 1)], 100, 128, 'guns2');

    // SIGHTS - true holographic (HV) - EOTech 552/EXPS3 use a laser
    // diffraction hologram, not a simple LED reticle, so they get their own
    // tier: more optics, more electronics, HV-grade housing, ungated like
    // the rest of HV.
    replaceAttachments('sight_holo', [
        'tacz:sight_552', 'tacz:sight_exp3',
    ], [Item.of('gtceu:glass_lens', 1), Item.of('gtceu:steel_screw', 2), Item.of('gtceu:stainless_steel_rod', 1), Item.of('#forge:plates/polytetrafluoroethylene', 1), Item.of('#gtceu:circuits/hv', 1)], 150, 512, null);

    // =========================
    // SCOPES - basic magnified (MV)
    // =========================
    replaceAttachments('scope_basic', [
        'tacz:scope_1873_6x', 'tacz:scope_98k', 'tacz:scope_aug_default', 'tacz:scope_contender',
        'tacz:scope_retro_2x', 'tacz:scope_scout', 'tacz:scope_standard_8x',
    ], [Item.of('gtceu:glass_lens', 2), Item.of('gtceu:steel_screw', 2), Item.of('gtceu:aluminium_rod', 1), Item.of('#forge:plates/polyvinyl_chloride', 1)], 150, 128, 'guns2');

    // SCOPES - advanced magnified (HV) - Mk5HD and Vudu included here rather
    // than a separate EV tier; there's no EV-tier gun to justify that cost.
    replaceAttachments('scope_advanced', [
        'tacz:scope_acog_ta31', 'tacz:scope_elcan_4x', 'tacz:scope_hamr', 'tacz:scope_lpvo_1_6',
        'tacz:scope_qmk152', 'tacz:scope_mk5hd', 'tacz:scope_vudu',
    ], [Item.of('gtceu:glass_lens', 2), Item.of('gtceu:steel_screw', 2), Item.of('gtceu:stainless_steel_rod', 1), Item.of('#forge:plates/polytetrafluoroethylene', 2), Item.of('#gtceu:circuits/hv', 1)], 150, 512, null);

    // =========================
    // GRIPS & STOCKS (LV) - ergonomic parts only, no optics/electronics -
    // an actual wooden grip item (kubejs:grip_wooden) shaped and clamped on
    // with a rod and a screw, instead of a bare plate.
    // =========================
    replaceAttachments('grip_stock', [
        'tacz:grip_cobra', 'tacz:grip_cqr', 'tacz:grip_magpul_afg_2', 'tacz:grip_osovets_black',
        'tacz:grip_rk0', 'tacz:grip_rk1_b25u', 'tacz:grip_rk6', 'tacz:grip_se_5', 'tacz:grip_td',
        'tacz:grip_vertical_military', 'tacz:grip_vertical_ranger', 'tacz:grip_vertical_talon',
        'tacz:oem_stock_heavy', 'tacz:oem_stock_light', 'tacz:oem_stock_tactical',
        'tacz:stock_ak12', 'tacz:stock_carbon_bone_c5', 'tacz:stock_heavy_spas_12',
        'tacz:stock_hk_slim_line', 'tacz:stock_m4ss', 'tacz:stock_militech_b5', 'tacz:stock_moe',
        'tacz:stock_ripstock', 'tacz:stock_sba3', 'tacz:stock_tactical_ar', 'tacz:stock_tactical_spas_12',
        'ronmc:angled_grip', 'ronmc:combat_grip', 'ronmc:mp5a2_grip', 'ronmc:side_angle_grip',
        'ronmc:stock_tactical_tan',
    ], [Item.of('kubejs:grip_wooden', 1), Item.of('gtceu:steel_rod', 1), Item.of('gtceu:steel_screw', 1)], 100, 32, null);

    // =========================
    // MAGAZINES - extended mags (LV) - body, follower spring, baseplate.
    // =========================
    replaceAttachments('mag', [
        'tacz:extended_mag_1', 'tacz:extended_mag_2', 'tacz:extended_mag_3',
        'tacz:light_extended_mag_1', 'tacz:light_extended_mag_2', 'tacz:light_extended_mag_3',
        'tacz:shotgun_extended_mag_1', 'tacz:shotgun_extended_mag_2', 'tacz:shotgun_extended_mag_3',
        'tacz:sniper_extended_mag_1', 'tacz:sniper_extended_mag_2', 'tacz:sniper_extended_mag_3',
    ], [Item.of('gtceu:steel_plate', 1), Item.of('gtceu:small_steel_spring', 1), Item.of('gtceu:steel_screw', 1)], 100, 32, null);

    // =========================
    // LASERS & LIGHTS (MV) - genuinely electronic (diode + battery + lens),
    // needs an actual circuit same as the reflex sights above.
    // =========================
    replaceAttachments('laser_light', [
        'tacz:laser_compact', 'tacz:laser_lopro', 'tacz:laser_nightstick', 'tacz:laser_peq15', 'tacz:laser_peq6',
        'ronmc:custom_laser', 'ronmc:flashlight_1', 'ronmc:flashlight_2', 'ronmc:laser_peq15',
        'ronmc:laser_pointer', 'ronmc:tac_laser',
    ], [Item.of('gtceu:glass_lens', 1), Item.of('gtceu:steel_screw', 1), Item.of('#forge:plates/polyvinyl_chloride', 1), Item.of('#gtceu:circuits/mv', 1)], 100, 128, 'guns2');

});
