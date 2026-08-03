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

    // =========================
    // MUZZLES - generic brakes/chokes/compensators (LV) - a short threaded
    // barrel extension plus a collar, not tied to any one gun.
    // =========================
    event.remove({ output: Item.of('tacz:attachment', 1, '{AttachmentId:"tacz:muzzle_brake_cthulhu"}') });
    event.recipes.gtceu.assembler('attachment_tier_muzzle_lv_tacz_muzzle_brake_cthulhu')
        .itemInputs([Item.of('kubejs:barrel_steel', 1), Item.of('gtceu:steel_ring', 1), Item.of('#forge:plates/polyethylene', 1)])
        .itemOutputs(Item.of('tacz:attachment', 1, '{AttachmentId:"tacz:muzzle_brake_cthulhu"}'))
        .circuit(1)
        .duration(100)
        .EUt(32);

    event.remove({ output: Item.of('tacz:attachment', 1, '{AttachmentId:"tacz:muzzle_brake_cyclone_d2"}') });
    event.recipes.gtceu.assembler('attachment_tier_muzzle_lv_tacz_muzzle_brake_cyclone_d2')
        .itemInputs([Item.of('kubejs:barrel_steel', 1), Item.of('gtceu:steel_ring', 1), Item.of('#forge:plates/polyethylene', 1)])
        .itemOutputs(Item.of('tacz:attachment', 1, '{AttachmentId:"tacz:muzzle_brake_cyclone_d2"}'))
        .circuit(2)
        .duration(100)
        .EUt(32);

    event.remove({ output: Item.of('tacz:attachment', 1, '{AttachmentId:"tacz:muzzle_brake_mastiff_sg"}') });
    event.recipes.gtceu.assembler('attachment_tier_muzzle_lv_tacz_muzzle_brake_mastiff_sg')
        .itemInputs([Item.of('kubejs:barrel_steel', 1), Item.of('gtceu:steel_ring', 1), Item.of('#forge:plates/polyethylene', 1)])
        .itemOutputs(Item.of('tacz:attachment', 1, '{AttachmentId:"tacz:muzzle_brake_mastiff_sg"}'))
        .circuit(3)
        .duration(100)
        .EUt(32);

    event.remove({ output: Item.of('tacz:attachment', 1, '{AttachmentId:"tacz:muzzle_brake_pioneer"}') });
    event.recipes.gtceu.assembler('attachment_tier_muzzle_lv_tacz_muzzle_brake_pioneer')
        .itemInputs([Item.of('kubejs:barrel_steel', 1), Item.of('gtceu:steel_ring', 1), Item.of('#forge:plates/polyethylene', 1)])
        .itemOutputs(Item.of('tacz:attachment', 1, '{AttachmentId:"tacz:muzzle_brake_pioneer"}'))
        .circuit(4)
        .duration(100)
        .EUt(32);

    event.remove({ output: Item.of('tacz:attachment', 1, '{AttachmentId:"tacz:muzzle_brake_trex"}') });
    event.recipes.gtceu.assembler('attachment_tier_muzzle_lv_tacz_muzzle_brake_trex')
        .itemInputs([Item.of('kubejs:barrel_steel', 1), Item.of('gtceu:steel_ring', 1), Item.of('#forge:plates/polyethylene', 1)])
        .itemOutputs(Item.of('tacz:attachment', 1, '{AttachmentId:"tacz:muzzle_brake_trex"}'))
        .circuit(5)
        .duration(100)
        .EUt(32);

    event.remove({ output: Item.of('tacz:attachment', 1, '{AttachmentId:"tacz:muzzle_choke_sg"}') });
    event.recipes.gtceu.assembler('attachment_tier_muzzle_lv_tacz_muzzle_choke_sg')
        .itemInputs([Item.of('kubejs:barrel_steel', 1), Item.of('gtceu:steel_ring', 1), Item.of('#forge:plates/polyethylene', 1)])
        .itemOutputs(Item.of('tacz:attachment', 1, '{AttachmentId:"tacz:muzzle_choke_sg"}'))
        .circuit(6)
        .duration(100)
        .EUt(32);

    event.remove({ output: Item.of('tacz:attachment', 1, '{AttachmentId:"tacz:muzzle_compensator_trident"}') });
    event.recipes.gtceu.assembler('attachment_tier_muzzle_lv_tacz_muzzle_compensator_trident')
        .itemInputs([Item.of('kubejs:barrel_steel', 1), Item.of('gtceu:steel_ring', 1), Item.of('#forge:plates/polyethylene', 1)])
        .itemOutputs(Item.of('tacz:attachment', 1, '{AttachmentId:"tacz:muzzle_compensator_trident"}'))
        .circuit(7)
        .duration(100)
        .EUt(32);

    event.remove({ output: Item.of('tacz:attachment', 1, '{AttachmentId:"tacz:muzzle_duckbill_sg"}') });
    event.recipes.gtceu.assembler('attachment_tier_muzzle_lv_tacz_muzzle_duckbill_sg')
        .itemInputs([Item.of('kubejs:barrel_steel', 1), Item.of('gtceu:steel_ring', 1), Item.of('#forge:plates/polyethylene', 1)])
        .itemOutputs(Item.of('tacz:attachment', 1, '{AttachmentId:"tacz:muzzle_duckbill_sg"}'))
        .circuit(8)
        .duration(100)
        .EUt(32);

    event.remove({ output: Item.of('tacz:attachment', 1, '{AttachmentId:"ronmc:12ga_brake"}') });
    event.recipes.gtceu.assembler('attachment_tier_muzzle_lv_ronmc_12ga_brake')
        .itemInputs([Item.of('kubejs:barrel_steel', 1), Item.of('gtceu:steel_ring', 1), Item.of('#forge:plates/polyethylene', 1)])
        .itemOutputs(Item.of('tacz:attachment', 1, '{AttachmentId:"ronmc:12ga_brake"}'))
        .circuit(9)
        .duration(100)
        .EUt(32);

    event.remove({ output: Item.of('tacz:attachment', 1, '{AttachmentId:"ronmc:357_snub"}') });
    event.recipes.gtceu.assembler('attachment_tier_muzzle_lv_ronmc_357_snub')
        .itemInputs([Item.of('kubejs:barrel_steel', 1), Item.of('gtceu:steel_ring', 1), Item.of('#forge:plates/polyethylene', 1)])
        .itemOutputs(Item.of('tacz:attachment', 1, '{AttachmentId:"ronmc:357_snub"}'))
        .circuit(10)
        .duration(100)
        .EUt(32);

    event.remove({ output: Item.of('tacz:attachment', 1, '{AttachmentId:"ronmc:snub"}') });
    event.recipes.gtceu.assembler('attachment_tier_muzzle_lv_ronmc_snub')
        .itemInputs([Item.of('kubejs:barrel_steel', 1), Item.of('gtceu:steel_ring', 1), Item.of('#forge:plates/polyethylene', 1)])
        .itemOutputs(Item.of('tacz:attachment', 1, '{AttachmentId:"ronmc:snub"}'))
        .circuit(11)
        .duration(100)
        .EUt(32);

    event.remove({ output: Item.of('tacz:attachment', 1, '{AttachmentId:"ronmc:spread_choke"}') });
    event.recipes.gtceu.assembler('attachment_tier_muzzle_lv_ronmc_spread_choke')
        .itemInputs([Item.of('kubejs:barrel_steel', 1), Item.of('gtceu:steel_ring', 1), Item.of('#forge:plates/polyethylene', 1)])
        .itemOutputs(Item.of('tacz:attachment', 1, '{AttachmentId:"ronmc:spread_choke"}'))
        .circuit(12)
        .duration(100)
        .EUt(32);

    // MUZZLES - precision brakes named for specific HV pistols (timeless50,
    // deagle_golden_long_barrel literally IS a long-barrel attachment) -
    // built on a proper damascus barrel blank instead of plain steel.
    event.remove({ output: Item.of('tacz:attachment', 1, '{AttachmentId:"tacz:muzzle_brake_timeless50"}') });
    event.recipes.gtceu.assembler('attachment_tier_muzzle_hv_tacz_muzzle_brake_timeless50')
        .itemInputs([Item.of('kubejs:barrel_damascus', 1), Item.of('gtceu:stainless_steel_ring', 1), Item.of('#forge:plates/polytetrafluoroethylene', 1), Item.of('gtceu:stainless_steel_gear', 1)])
        .itemOutputs(Item.of('tacz:attachment', 1, '{AttachmentId:"tacz:muzzle_brake_timeless50"}'))
        .circuit(1)
        .duration(150)
        .EUt(512);

    event.remove({ output: Item.of('tacz:attachment', 1, '{AttachmentId:"tacz:deagle_golden_long_barrel"}') });
    event.recipes.gtceu.assembler('attachment_tier_muzzle_hv_tacz_deagle_golden_long_barrel')
        .itemInputs([Item.of('kubejs:barrel_damascus', 1), Item.of('gtceu:stainless_steel_ring', 1), Item.of('#forge:plates/polytetrafluoroethylene', 1), Item.of('gtceu:stainless_steel_gear', 1)])
        .itemOutputs(Item.of('tacz:attachment', 1, '{AttachmentId:"tacz:deagle_golden_long_barrel"}'))
        .circuit(2)
        .duration(150)
        .EUt(512);

    // =========================
    // SUPPRESSORS - WW-era cans (LV) - split out from the modern suppressor
    // list below; these mount on the WW1/WW2 guns and shouldn't cost the same
    // as a modern Knight's Armament can. Baffles (screws) + a spacer rod +
    // an outer tube plate.
    // =========================
    event.remove({ output: Item.of('tacz:attachment', 1, '{AttachmentId:"ww:silence"}') });
    event.recipes.gtceu.assembler('attachment_tier_suppressor_ww_ww_silence')
        .itemInputs([Item.of('gtceu:steel_screw', 3), Item.of('gtceu:steel_rod', 1), Item.of('#forge:plates/polyethylene', 1)])
        .itemOutputs(Item.of('tacz:attachment', 1, '{AttachmentId:"ww:silence"}'))
        .circuit(1)
        .duration(100)
        .EUt(32);

    event.remove({ output: Item.of('tacz:attachment', 1, '{AttachmentId:"ww:silencep"}') });
    event.recipes.gtceu.assembler('attachment_tier_suppressor_ww_ww_silencep')
        .itemInputs([Item.of('gtceu:steel_screw', 3), Item.of('gtceu:steel_rod', 1), Item.of('#forge:plates/polyethylene', 1)])
        .itemOutputs(Item.of('tacz:attachment', 1, '{AttachmentId:"ww:silencep"}'))
        .circuit(2)
        .duration(100)
        .EUt(32);

    // SUPPRESSORS - modern brand-name cans (MV) - complex multi-baffle stack
    // with a quick-detach mount, gated same as the rest of the Cold
    // War/modern attachment line.
    event.remove({ output: Item.of('tacz:attachment', 1, '{AttachmentId:"tacz:muzzle_silencer_knight_qd"}') });
    event.recipes.gtceu.assembler('attachment_tier_suppressor_mv_tacz_muzzle_silencer_knight_qd')
        .itemInputs([Item.of('gtceu:steel_screw', 4), Item.of('gtceu:aluminium_rod', 1), Item.of('#forge:plates/polyvinyl_chloride', 1), Item.of('gtceu:small_aluminium_gear', 1)])
        .itemOutputs(Item.of('tacz:attachment', 1, '{AttachmentId:"tacz:muzzle_silencer_knight_qd"}'))
        .circuit(1)
        .duration(150)
        .EUt(128)
        .addCondition(WFResearch.condition('guns2'));

    event.remove({ output: Item.of('tacz:attachment', 1, '{AttachmentId:"tacz:muzzle_silencer_mirage"}') });
    event.recipes.gtceu.assembler('attachment_tier_suppressor_mv_tacz_muzzle_silencer_mirage')
        .itemInputs([Item.of('gtceu:steel_screw', 4), Item.of('gtceu:aluminium_rod', 1), Item.of('#forge:plates/polyvinyl_chloride', 1), Item.of('gtceu:small_aluminium_gear', 1)])
        .itemOutputs(Item.of('tacz:attachment', 1, '{AttachmentId:"tacz:muzzle_silencer_mirage"}'))
        .circuit(2)
        .duration(150)
        .EUt(128)
        .addCondition(WFResearch.condition('guns2'));

    event.remove({ output: Item.of('tacz:attachment', 1, '{AttachmentId:"tacz:muzzle_silencer_phantom_s1"}') });
    event.recipes.gtceu.assembler('attachment_tier_suppressor_mv_tacz_muzzle_silencer_phantom_s1')
        .itemInputs([Item.of('gtceu:steel_screw', 4), Item.of('gtceu:aluminium_rod', 1), Item.of('#forge:plates/polyvinyl_chloride', 1), Item.of('gtceu:small_aluminium_gear', 1)])
        .itemOutputs(Item.of('tacz:attachment', 1, '{AttachmentId:"tacz:muzzle_silencer_phantom_s1"}'))
        .circuit(3)
        .duration(150)
        .EUt(128)
        .addCondition(WFResearch.condition('guns2'));

    event.remove({ output: Item.of('tacz:attachment', 1, '{AttachmentId:"tacz:muzzle_silencer_ptilopsis"}') });
    event.recipes.gtceu.assembler('attachment_tier_suppressor_mv_tacz_muzzle_silencer_ptilopsis')
        .itemInputs([Item.of('gtceu:steel_screw', 4), Item.of('gtceu:aluminium_rod', 1), Item.of('#forge:plates/polyvinyl_chloride', 1), Item.of('gtceu:small_aluminium_gear', 1)])
        .itemOutputs(Item.of('tacz:attachment', 1, '{AttachmentId:"tacz:muzzle_silencer_ptilopsis"}'))
        .circuit(4)
        .duration(150)
        .EUt(128)
        .addCondition(WFResearch.condition('guns2'));

    event.remove({ output: Item.of('tacz:attachment', 1, '{AttachmentId:"tacz:muzzle_silencer_sg"}') });
    event.recipes.gtceu.assembler('attachment_tier_suppressor_mv_tacz_muzzle_silencer_sg')
        .itemInputs([Item.of('gtceu:steel_screw', 4), Item.of('gtceu:aluminium_rod', 1), Item.of('#forge:plates/polyvinyl_chloride', 1), Item.of('gtceu:small_aluminium_gear', 1)])
        .itemOutputs(Item.of('tacz:attachment', 1, '{AttachmentId:"tacz:muzzle_silencer_sg"}'))
        .circuit(5)
        .duration(150)
        .EUt(128)
        .addCondition(WFResearch.condition('guns2'));

    event.remove({ output: Item.of('tacz:attachment', 1, '{AttachmentId:"tacz:muzzle_silencer_ursus"}') });
    event.recipes.gtceu.assembler('attachment_tier_suppressor_mv_tacz_muzzle_silencer_ursus')
        .itemInputs([Item.of('gtceu:steel_screw', 4), Item.of('gtceu:aluminium_rod', 1), Item.of('#forge:plates/polyvinyl_chloride', 1), Item.of('gtceu:small_aluminium_gear', 1)])
        .itemOutputs(Item.of('tacz:attachment', 1, '{AttachmentId:"tacz:muzzle_silencer_ursus"}'))
        .circuit(6)
        .duration(150)
        .EUt(128)
        .addCondition(WFResearch.condition('guns2'));

    event.remove({ output: Item.of('tacz:attachment', 1, '{AttachmentId:"tacz:muzzle_silencer_vulture"}') });
    event.recipes.gtceu.assembler('attachment_tier_suppressor_mv_tacz_muzzle_silencer_vulture')
        .itemInputs([Item.of('gtceu:steel_screw', 4), Item.of('gtceu:aluminium_rod', 1), Item.of('#forge:plates/polyvinyl_chloride', 1), Item.of('gtceu:small_aluminium_gear', 1)])
        .itemOutputs(Item.of('tacz:attachment', 1, '{AttachmentId:"tacz:muzzle_silencer_vulture"}'))
        .circuit(7)
        .duration(150)
        .EUt(128)
        .addCondition(WFResearch.condition('guns2'));

    event.remove({ output: Item.of('tacz:attachment', 1, '{AttachmentId:"tacz:muzzle_silencer_wraith"}') });
    event.recipes.gtceu.assembler('attachment_tier_suppressor_mv_tacz_muzzle_silencer_wraith')
        .itemInputs([Item.of('gtceu:steel_screw', 4), Item.of('gtceu:aluminium_rod', 1), Item.of('#forge:plates/polyvinyl_chloride', 1), Item.of('gtceu:small_aluminium_gear', 1)])
        .itemOutputs(Item.of('tacz:attachment', 1, '{AttachmentId:"tacz:muzzle_silencer_wraith"}'))
        .circuit(8)
        .duration(150)
        .EUt(128)
        .addCondition(WFResearch.condition('guns2'));

    // =========================
    // BAYONETS (LV) - cheap, but an actual knife: a forged blade riveted onto
    // a real wooden grip (the pack's existing grip_wooden item), not one
    // ingredient.
    // =========================
    event.remove({ output: Item.of('tacz:attachment', 1, '{AttachmentId:"tacz:bayonet_6h3"}') });
    event.recipes.gtceu.assembler('attachment_tier_bayonet_tacz_bayonet_6h3')
        .itemInputs([Item.of('kubejs:grip_wooden', 1), Item.of('gtceu:steel_plate', 1), Item.of('gtceu:steel_rod', 1), Item.of('gtceu:steel_screw', 1)])
        .itemOutputs(Item.of('tacz:attachment', 1, '{AttachmentId:"tacz:bayonet_6h3"}'))
        .circuit(1)
        .duration(50)
        .EUt(16);

    event.remove({ output: Item.of('tacz:attachment', 1, '{AttachmentId:"tacz:bayonet_m9"}') });
    event.recipes.gtceu.assembler('attachment_tier_bayonet_tacz_bayonet_m9')
        .itemInputs([Item.of('kubejs:grip_wooden', 1), Item.of('gtceu:steel_plate', 1), Item.of('gtceu:steel_rod', 1), Item.of('gtceu:steel_screw', 1)])
        .itemOutputs(Item.of('tacz:attachment', 1, '{AttachmentId:"tacz:bayonet_m9"}'))
        .circuit(2)
        .duration(50)
        .EUt(16);

    event.remove({ output: Item.of('tacz:attachment', 1, '{AttachmentId:"ww:bayonet_m1884"}') });
    event.recipes.gtceu.assembler('attachment_tier_bayonet_ww_bayonet_m1884')
        .itemInputs([Item.of('kubejs:grip_wooden', 1), Item.of('gtceu:steel_plate', 1), Item.of('gtceu:steel_rod', 1), Item.of('gtceu:steel_screw', 1)])
        .itemOutputs(Item.of('tacz:attachment', 1, '{AttachmentId:"ww:bayonet_m1884"}'))
        .circuit(3)
        .duration(50)
        .EUt(16);

    event.remove({ output: Item.of('tacz:attachment', 1, '{AttachmentId:"ww:bayonet_m1930"}') });
    event.recipes.gtceu.assembler('attachment_tier_bayonet_ww_bayonet_m1930')
        .itemInputs([Item.of('kubejs:grip_wooden', 1), Item.of('gtceu:steel_plate', 1), Item.of('gtceu:steel_rod', 1), Item.of('gtceu:steel_screw', 1)])
        .itemOutputs(Item.of('tacz:attachment', 1, '{AttachmentId:"ww:bayonet_m1930"}'))
        .circuit(4)
        .duration(50)
        .EUt(16);

    event.remove({ output: Item.of('tacz:attachment', 1, '{AttachmentId:"ww:bayonet_no4"}') });
    event.recipes.gtceu.assembler('attachment_tier_bayonet_ww_bayonet_no4')
        .itemInputs([Item.of('kubejs:grip_wooden', 1), Item.of('gtceu:steel_plate', 1), Item.of('gtceu:steel_rod', 1), Item.of('gtceu:steel_screw', 1)])
        .itemOutputs(Item.of('tacz:attachment', 1, '{AttachmentId:"ww:bayonet_no4"}'))
        .circuit(5)
        .duration(50)
        .EUt(16);

    // =========================
    // SIGHTS - LED reflex/red-dot (MV) - battery-powered optics, so unlike
    // gun_parts.js's original recipe they now actually need a circuit.
    // =========================
    event.remove({ output: Item.of('tacz:attachment', 1, '{AttachmentId:"tacz:sight_acro_pistol"}') });
    event.recipes.gtceu.assembler('attachment_tier_sight_reflex_tacz_sight_acro_pistol')
        .itemInputs([Item.of('gtceu:glass_lens', 1), Item.of('gtceu:steel_screw', 1), Item.of('gtceu:aluminium_rod', 1), Item.of('#forge:plates/polyvinyl_chloride', 1), Item.of('#gtceu:circuits/mv', 1)])
        .itemOutputs(Item.of('tacz:attachment', 1, '{AttachmentId:"tacz:sight_acro_pistol"}'))
        .circuit(1)
        .duration(100)
        .EUt(128)
        .addCondition(WFResearch.condition('guns2'));

    event.remove({ output: Item.of('tacz:attachment', 1, '{AttachmentId:"tacz:sight_acro_rifle"}') });
    event.recipes.gtceu.assembler('attachment_tier_sight_reflex_tacz_sight_acro_rifle')
        .itemInputs([Item.of('gtceu:glass_lens', 1), Item.of('gtceu:steel_screw', 1), Item.of('gtceu:aluminium_rod', 1), Item.of('#forge:plates/polyvinyl_chloride', 1), Item.of('#gtceu:circuits/mv', 1)])
        .itemOutputs(Item.of('tacz:attachment', 1, '{AttachmentId:"tacz:sight_acro_rifle"}'))
        .circuit(2)
        .duration(100)
        .EUt(128)
        .addCondition(WFResearch.condition('guns2'));

    event.remove({ output: Item.of('tacz:attachment', 1, '{AttachmentId:"tacz:sight_coyote"}') });
    event.recipes.gtceu.assembler('attachment_tier_sight_reflex_tacz_sight_coyote')
        .itemInputs([Item.of('gtceu:glass_lens', 1), Item.of('gtceu:steel_screw', 1), Item.of('gtceu:aluminium_rod', 1), Item.of('#forge:plates/polyvinyl_chloride', 1), Item.of('#gtceu:circuits/mv', 1)])
        .itemOutputs(Item.of('tacz:attachment', 1, '{AttachmentId:"tacz:sight_coyote"}'))
        .circuit(3)
        .duration(100)
        .EUt(128)
        .addCondition(WFResearch.condition('guns2'));

    event.remove({ output: Item.of('tacz:attachment', 1, '{AttachmentId:"tacz:sight_deltapoint_pistol"}') });
    event.recipes.gtceu.assembler('attachment_tier_sight_reflex_tacz_sight_deltapoint_pistol')
        .itemInputs([Item.of('gtceu:glass_lens', 1), Item.of('gtceu:steel_screw', 1), Item.of('gtceu:aluminium_rod', 1), Item.of('#forge:plates/polyvinyl_chloride', 1), Item.of('#gtceu:circuits/mv', 1)])
        .itemOutputs(Item.of('tacz:attachment', 1, '{AttachmentId:"tacz:sight_deltapoint_pistol"}'))
        .circuit(4)
        .duration(100)
        .EUt(128)
        .addCondition(WFResearch.condition('guns2'));

    event.remove({ output: Item.of('tacz:attachment', 1, '{AttachmentId:"tacz:sight_deltapoint_rifle"}') });
    event.recipes.gtceu.assembler('attachment_tier_sight_reflex_tacz_sight_deltapoint_rifle')
        .itemInputs([Item.of('gtceu:glass_lens', 1), Item.of('gtceu:steel_screw', 1), Item.of('gtceu:aluminium_rod', 1), Item.of('#forge:plates/polyvinyl_chloride', 1), Item.of('#gtceu:circuits/mv', 1)])
        .itemOutputs(Item.of('tacz:attachment', 1, '{AttachmentId:"tacz:sight_deltapoint_rifle"}'))
        .circuit(5)
        .duration(100)
        .EUt(128)
        .addCondition(WFResearch.condition('guns2'));

    event.remove({ output: Item.of('tacz:attachment', 1, '{AttachmentId:"tacz:sight_fastfire_pistol"}') });
    event.recipes.gtceu.assembler('attachment_tier_sight_reflex_tacz_sight_fastfire_pistol')
        .itemInputs([Item.of('gtceu:glass_lens', 1), Item.of('gtceu:steel_screw', 1), Item.of('gtceu:aluminium_rod', 1), Item.of('#forge:plates/polyvinyl_chloride', 1), Item.of('#gtceu:circuits/mv', 1)])
        .itemOutputs(Item.of('tacz:attachment', 1, '{AttachmentId:"tacz:sight_fastfire_pistol"}'))
        .circuit(6)
        .duration(100)
        .EUt(128)
        .addCondition(WFResearch.condition('guns2'));

    event.remove({ output: Item.of('tacz:attachment', 1, '{AttachmentId:"tacz:sight_fastfire_rifle"}') });
    event.recipes.gtceu.assembler('attachment_tier_sight_reflex_tacz_sight_fastfire_rifle')
        .itemInputs([Item.of('gtceu:glass_lens', 1), Item.of('gtceu:steel_screw', 1), Item.of('gtceu:aluminium_rod', 1), Item.of('#forge:plates/polyvinyl_chloride', 1), Item.of('#gtceu:circuits/mv', 1)])
        .itemOutputs(Item.of('tacz:attachment', 1, '{AttachmentId:"tacz:sight_fastfire_rifle"}'))
        .circuit(7)
        .duration(100)
        .EUt(128)
        .addCondition(WFResearch.condition('guns2'));

    event.remove({ output: Item.of('tacz:attachment', 1, '{AttachmentId:"tacz:sight_okp7"}') });
    event.recipes.gtceu.assembler('attachment_tier_sight_reflex_tacz_sight_okp7')
        .itemInputs([Item.of('gtceu:glass_lens', 1), Item.of('gtceu:steel_screw', 1), Item.of('gtceu:aluminium_rod', 1), Item.of('#forge:plates/polyvinyl_chloride', 1), Item.of('#gtceu:circuits/mv', 1)])
        .itemOutputs(Item.of('tacz:attachment', 1, '{AttachmentId:"tacz:sight_okp7"}'))
        .circuit(8)
        .duration(100)
        .EUt(128)
        .addCondition(WFResearch.condition('guns2'));

    event.remove({ output: Item.of('tacz:attachment', 1, '{AttachmentId:"tacz:sight_p90"}') });
    event.recipes.gtceu.assembler('attachment_tier_sight_reflex_tacz_sight_p90')
        .itemInputs([Item.of('gtceu:glass_lens', 1), Item.of('gtceu:steel_screw', 1), Item.of('gtceu:aluminium_rod', 1), Item.of('#forge:plates/polyvinyl_chloride', 1), Item.of('#gtceu:circuits/mv', 1)])
        .itemOutputs(Item.of('tacz:attachment', 1, '{AttachmentId:"tacz:sight_p90"}'))
        .circuit(9)
        .duration(100)
        .EUt(128)
        .addCondition(WFResearch.condition('guns2'));

    event.remove({ output: Item.of('tacz:attachment', 1, '{AttachmentId:"tacz:sight_pk06_pistol"}') });
    event.recipes.gtceu.assembler('attachment_tier_sight_reflex_tacz_sight_pk06_pistol')
        .itemInputs([Item.of('gtceu:glass_lens', 1), Item.of('gtceu:steel_screw', 1), Item.of('gtceu:aluminium_rod', 1), Item.of('#forge:plates/polyvinyl_chloride', 1), Item.of('#gtceu:circuits/mv', 1)])
        .itemOutputs(Item.of('tacz:attachment', 1, '{AttachmentId:"tacz:sight_pk06_pistol"}'))
        .circuit(10)
        .duration(100)
        .EUt(128)
        .addCondition(WFResearch.condition('guns2'));

    event.remove({ output: Item.of('tacz:attachment', 1, '{AttachmentId:"tacz:sight_pk06_rifle"}') });
    event.recipes.gtceu.assembler('attachment_tier_sight_reflex_tacz_sight_pk06_rifle')
        .itemInputs([Item.of('gtceu:glass_lens', 1), Item.of('gtceu:steel_screw', 1), Item.of('gtceu:aluminium_rod', 1), Item.of('#forge:plates/polyvinyl_chloride', 1), Item.of('#gtceu:circuits/mv', 1)])
        .itemOutputs(Item.of('tacz:attachment', 1, '{AttachmentId:"tacz:sight_pk06_rifle"}'))
        .circuit(11)
        .duration(100)
        .EUt(128)
        .addCondition(WFResearch.condition('guns2'));

    event.remove({ output: Item.of('tacz:attachment', 1, '{AttachmentId:"tacz:sight_rmr_dot"}') });
    event.recipes.gtceu.assembler('attachment_tier_sight_reflex_tacz_sight_rmr_dot')
        .itemInputs([Item.of('gtceu:glass_lens', 1), Item.of('gtceu:steel_screw', 1), Item.of('gtceu:aluminium_rod', 1), Item.of('#forge:plates/polyvinyl_chloride', 1), Item.of('#gtceu:circuits/mv', 1)])
        .itemOutputs(Item.of('tacz:attachment', 1, '{AttachmentId:"tacz:sight_rmr_dot"}'))
        .circuit(12)
        .duration(100)
        .EUt(128)
        .addCondition(WFResearch.condition('guns2'));

    event.remove({ output: Item.of('tacz:attachment', 1, '{AttachmentId:"tacz:sight_sro_dot"}') });
    event.recipes.gtceu.assembler('attachment_tier_sight_reflex_tacz_sight_sro_dot')
        .itemInputs([Item.of('gtceu:glass_lens', 1), Item.of('gtceu:steel_screw', 1), Item.of('gtceu:aluminium_rod', 1), Item.of('#forge:plates/polyvinyl_chloride', 1), Item.of('#gtceu:circuits/mv', 1)])
        .itemOutputs(Item.of('tacz:attachment', 1, '{AttachmentId:"tacz:sight_sro_dot"}'))
        .circuit(13)
        .duration(100)
        .EUt(128)
        .addCondition(WFResearch.condition('guns2'));

    event.remove({ output: Item.of('tacz:attachment', 1, '{AttachmentId:"tacz:sight_srs_02"}') });
    event.recipes.gtceu.assembler('attachment_tier_sight_reflex_tacz_sight_srs_02')
        .itemInputs([Item.of('gtceu:glass_lens', 1), Item.of('gtceu:steel_screw', 1), Item.of('gtceu:aluminium_rod', 1), Item.of('#forge:plates/polyvinyl_chloride', 1), Item.of('#gtceu:circuits/mv', 1)])
        .itemOutputs(Item.of('tacz:attachment', 1, '{AttachmentId:"tacz:sight_srs_02"}'))
        .circuit(14)
        .duration(100)
        .EUt(128)
        .addCondition(WFResearch.condition('guns2'));

    event.remove({ output: Item.of('tacz:attachment', 1, '{AttachmentId:"tacz:sight_t1"}') });
    event.recipes.gtceu.assembler('attachment_tier_sight_reflex_tacz_sight_t1')
        .itemInputs([Item.of('gtceu:glass_lens', 1), Item.of('gtceu:steel_screw', 1), Item.of('gtceu:aluminium_rod', 1), Item.of('#forge:plates/polyvinyl_chloride', 1), Item.of('#gtceu:circuits/mv', 1)])
        .itemOutputs(Item.of('tacz:attachment', 1, '{AttachmentId:"tacz:sight_t1"}'))
        .circuit(15)
        .duration(100)
        .EUt(128)
        .addCondition(WFResearch.condition('guns2'));

    event.remove({ output: Item.of('tacz:attachment', 1, '{AttachmentId:"tacz:sight_t2"}') });
    event.recipes.gtceu.assembler('attachment_tier_sight_reflex_tacz_sight_t2')
        .itemInputs([Item.of('gtceu:glass_lens', 1), Item.of('gtceu:steel_screw', 1), Item.of('gtceu:aluminium_rod', 1), Item.of('#forge:plates/polyvinyl_chloride', 1), Item.of('#gtceu:circuits/mv', 1)])
        .itemOutputs(Item.of('tacz:attachment', 1, '{AttachmentId:"tacz:sight_t2"}'))
        .circuit(16)
        .duration(100)
        .EUt(128)
        .addCondition(WFResearch.condition('guns2'));

    event.remove({ output: Item.of('tacz:attachment', 1, '{AttachmentId:"tacz:sight_uh1"}') });
    event.recipes.gtceu.assembler('attachment_tier_sight_reflex_tacz_sight_uh1')
        .itemInputs([Item.of('gtceu:glass_lens', 1), Item.of('gtceu:steel_screw', 1), Item.of('gtceu:aluminium_rod', 1), Item.of('#forge:plates/polyvinyl_chloride', 1), Item.of('#gtceu:circuits/mv', 1)])
        .itemOutputs(Item.of('tacz:attachment', 1, '{AttachmentId:"tacz:sight_uh1"}'))
        .circuit(17)
        .duration(100)
        .EUt(128)
        .addCondition(WFResearch.condition('guns2'));

    event.remove({ output: Item.of('tacz:attachment', 1, '{AttachmentId:"ronmc:canted"}') });
    event.recipes.gtceu.assembler('attachment_tier_sight_reflex_ronmc_canted')
        .itemInputs([Item.of('gtceu:glass_lens', 1), Item.of('gtceu:steel_screw', 1), Item.of('gtceu:aluminium_rod', 1), Item.of('#forge:plates/polyvinyl_chloride', 1), Item.of('#gtceu:circuits/mv', 1)])
        .itemOutputs(Item.of('tacz:attachment', 1, '{AttachmentId:"ronmc:canted"}'))
        .circuit(18)
        .duration(100)
        .EUt(128)
        .addCondition(WFResearch.condition('guns2'));

    event.remove({ output: Item.of('tacz:attachment', 1, '{AttachmentId:"ronmc:rmr_dot"}') });
    event.recipes.gtceu.assembler('attachment_tier_sight_reflex_ronmc_rmr_dot')
        .itemInputs([Item.of('gtceu:glass_lens', 1), Item.of('gtceu:steel_screw', 1), Item.of('gtceu:aluminium_rod', 1), Item.of('#forge:plates/polyvinyl_chloride', 1), Item.of('#gtceu:circuits/mv', 1)])
        .itemOutputs(Item.of('tacz:attachment', 1, '{AttachmentId:"ronmc:rmr_dot"}'))
        .circuit(19)
        .duration(100)
        .EUt(128)
        .addCondition(WFResearch.condition('guns2'));

    event.remove({ output: Item.of('tacz:attachment', 1, '{AttachmentId:"ronmc:sro_dot"}') });
    event.recipes.gtceu.assembler('attachment_tier_sight_reflex_ronmc_sro_dot')
        .itemInputs([Item.of('gtceu:glass_lens', 1), Item.of('gtceu:steel_screw', 1), Item.of('gtceu:aluminium_rod', 1), Item.of('#forge:plates/polyvinyl_chloride', 1), Item.of('#gtceu:circuits/mv', 1)])
        .itemOutputs(Item.of('tacz:attachment', 1, '{AttachmentId:"ronmc:sro_dot"}'))
        .circuit(20)
        .duration(100)
        .EUt(128)
        .addCondition(WFResearch.condition('guns2'));

    // SIGHTS - true holographic (HV) - EOTech 552/EXPS3 use a laser
    // diffraction hologram, not a simple LED reticle, so they get their own
    // tier: more optics, more electronics, HV-grade housing, ungated like
    // the rest of HV.
    event.remove({ output: Item.of('tacz:attachment', 1, '{AttachmentId:"tacz:sight_552"}') });
    event.recipes.gtceu.assembler('attachment_tier_sight_holo_tacz_sight_552')
        .itemInputs([Item.of('gtceu:glass_lens', 1), Item.of('gtceu:steel_screw', 2), Item.of('gtceu:stainless_steel_rod', 1), Item.of('#forge:plates/polytetrafluoroethylene', 1), Item.of('#gtceu:circuits/hv', 1)])
        .itemOutputs(Item.of('tacz:attachment', 1, '{AttachmentId:"tacz:sight_552"}'))
        .circuit(1)
        .duration(150)
        .EUt(512);

    event.remove({ output: Item.of('tacz:attachment', 1, '{AttachmentId:"tacz:sight_exp3"}') });
    event.recipes.gtceu.assembler('attachment_tier_sight_holo_tacz_sight_exp3')
        .itemInputs([Item.of('gtceu:glass_lens', 1), Item.of('gtceu:steel_screw', 2), Item.of('gtceu:stainless_steel_rod', 1), Item.of('#forge:plates/polytetrafluoroethylene', 1), Item.of('#gtceu:circuits/hv', 1)])
        .itemOutputs(Item.of('tacz:attachment', 1, '{AttachmentId:"tacz:sight_exp3"}'))
        .circuit(2)
        .duration(150)
        .EUt(512);

    // =========================
    // SCOPES - basic magnified (MV)
    // =========================
    event.remove({ output: Item.of('tacz:attachment', 1, '{AttachmentId:"tacz:scope_1873_6x"}') });
    event.recipes.gtceu.assembler('attachment_tier_scope_basic_tacz_scope_1873_6x')
        .itemInputs([Item.of('gtceu:glass_lens', 2), Item.of('gtceu:steel_screw', 2), Item.of('gtceu:aluminium_rod', 1), Item.of('#forge:plates/polyvinyl_chloride', 1)])
        .itemOutputs(Item.of('tacz:attachment', 1, '{AttachmentId:"tacz:scope_1873_6x"}'))
        .circuit(1)
        .duration(150)
        .EUt(128)
        .addCondition(WFResearch.condition('guns2'));

    event.remove({ output: Item.of('tacz:attachment', 1, '{AttachmentId:"tacz:scope_98k"}') });
    event.recipes.gtceu.assembler('attachment_tier_scope_basic_tacz_scope_98k')
        .itemInputs([Item.of('gtceu:glass_lens', 2), Item.of('gtceu:steel_screw', 2), Item.of('gtceu:aluminium_rod', 1), Item.of('#forge:plates/polyvinyl_chloride', 1)])
        .itemOutputs(Item.of('tacz:attachment', 1, '{AttachmentId:"tacz:scope_98k"}'))
        .circuit(2)
        .duration(150)
        .EUt(128)
        .addCondition(WFResearch.condition('guns2'));

    event.remove({ output: Item.of('tacz:attachment', 1, '{AttachmentId:"tacz:scope_aug_default"}') });
    event.recipes.gtceu.assembler('attachment_tier_scope_basic_tacz_scope_aug_default')
        .itemInputs([Item.of('gtceu:glass_lens', 2), Item.of('gtceu:steel_screw', 2), Item.of('gtceu:aluminium_rod', 1), Item.of('#forge:plates/polyvinyl_chloride', 1)])
        .itemOutputs(Item.of('tacz:attachment', 1, '{AttachmentId:"tacz:scope_aug_default"}'))
        .circuit(3)
        .duration(150)
        .EUt(128)
        .addCondition(WFResearch.condition('guns2'));

    event.remove({ output: Item.of('tacz:attachment', 1, '{AttachmentId:"tacz:scope_contender"}') });
    event.recipes.gtceu.assembler('attachment_tier_scope_basic_tacz_scope_contender')
        .itemInputs([Item.of('gtceu:glass_lens', 2), Item.of('gtceu:steel_screw', 2), Item.of('gtceu:aluminium_rod', 1), Item.of('#forge:plates/polyvinyl_chloride', 1)])
        .itemOutputs(Item.of('tacz:attachment', 1, '{AttachmentId:"tacz:scope_contender"}'))
        .circuit(4)
        .duration(150)
        .EUt(128)
        .addCondition(WFResearch.condition('guns2'));

    event.remove({ output: Item.of('tacz:attachment', 1, '{AttachmentId:"tacz:scope_retro_2x"}') });
    event.recipes.gtceu.assembler('attachment_tier_scope_basic_tacz_scope_retro_2x')
        .itemInputs([Item.of('gtceu:glass_lens', 2), Item.of('gtceu:steel_screw', 2), Item.of('gtceu:aluminium_rod', 1), Item.of('#forge:plates/polyvinyl_chloride', 1)])
        .itemOutputs(Item.of('tacz:attachment', 1, '{AttachmentId:"tacz:scope_retro_2x"}'))
        .circuit(5)
        .duration(150)
        .EUt(128)
        .addCondition(WFResearch.condition('guns2'));

    event.remove({ output: Item.of('tacz:attachment', 1, '{AttachmentId:"tacz:scope_scout"}') });
    event.recipes.gtceu.assembler('attachment_tier_scope_basic_tacz_scope_scout')
        .itemInputs([Item.of('gtceu:glass_lens', 2), Item.of('gtceu:steel_screw', 2), Item.of('gtceu:aluminium_rod', 1), Item.of('#forge:plates/polyvinyl_chloride', 1)])
        .itemOutputs(Item.of('tacz:attachment', 1, '{AttachmentId:"tacz:scope_scout"}'))
        .circuit(6)
        .duration(150)
        .EUt(128)
        .addCondition(WFResearch.condition('guns2'));

    event.remove({ output: Item.of('tacz:attachment', 1, '{AttachmentId:"tacz:scope_standard_8x"}') });
    event.recipes.gtceu.assembler('attachment_tier_scope_basic_tacz_scope_standard_8x')
        .itemInputs([Item.of('gtceu:glass_lens', 2), Item.of('gtceu:steel_screw', 2), Item.of('gtceu:aluminium_rod', 1), Item.of('#forge:plates/polyvinyl_chloride', 1)])
        .itemOutputs(Item.of('tacz:attachment', 1, '{AttachmentId:"tacz:scope_standard_8x"}'))
        .circuit(7)
        .duration(150)
        .EUt(128)
        .addCondition(WFResearch.condition('guns2'));

    // SCOPES - advanced magnified (HV) - Mk5HD and Vudu included here rather
    // than a separate EV tier; there's no EV-tier gun to justify that cost.
    event.remove({ output: Item.of('tacz:attachment', 1, '{AttachmentId:"tacz:scope_acog_ta31"}') });
    event.recipes.gtceu.assembler('attachment_tier_scope_advanced_tacz_scope_acog_ta31')
        .itemInputs([Item.of('gtceu:glass_lens', 2), Item.of('gtceu:steel_screw', 2), Item.of('gtceu:stainless_steel_rod', 1), Item.of('#forge:plates/polytetrafluoroethylene', 2), Item.of('#gtceu:circuits/hv', 1)])
        .itemOutputs(Item.of('tacz:attachment', 1, '{AttachmentId:"tacz:scope_acog_ta31"}'))
        .circuit(1)
        .duration(150)
        .EUt(512);

    event.remove({ output: Item.of('tacz:attachment', 1, '{AttachmentId:"tacz:scope_elcan_4x"}') });
    event.recipes.gtceu.assembler('attachment_tier_scope_advanced_tacz_scope_elcan_4x')
        .itemInputs([Item.of('gtceu:glass_lens', 2), Item.of('gtceu:steel_screw', 2), Item.of('gtceu:stainless_steel_rod', 1), Item.of('#forge:plates/polytetrafluoroethylene', 2), Item.of('#gtceu:circuits/hv', 1)])
        .itemOutputs(Item.of('tacz:attachment', 1, '{AttachmentId:"tacz:scope_elcan_4x"}'))
        .circuit(2)
        .duration(150)
        .EUt(512);

    event.remove({ output: Item.of('tacz:attachment', 1, '{AttachmentId:"tacz:scope_hamr"}') });
    event.recipes.gtceu.assembler('attachment_tier_scope_advanced_tacz_scope_hamr')
        .itemInputs([Item.of('gtceu:glass_lens', 2), Item.of('gtceu:steel_screw', 2), Item.of('gtceu:stainless_steel_rod', 1), Item.of('#forge:plates/polytetrafluoroethylene', 2), Item.of('#gtceu:circuits/hv', 1)])
        .itemOutputs(Item.of('tacz:attachment', 1, '{AttachmentId:"tacz:scope_hamr"}'))
        .circuit(3)
        .duration(150)
        .EUt(512);

    event.remove({ output: Item.of('tacz:attachment', 1, '{AttachmentId:"tacz:scope_lpvo_1_6"}') });
    event.recipes.gtceu.assembler('attachment_tier_scope_advanced_tacz_scope_lpvo_1_6')
        .itemInputs([Item.of('gtceu:glass_lens', 2), Item.of('gtceu:steel_screw', 2), Item.of('gtceu:stainless_steel_rod', 1), Item.of('#forge:plates/polytetrafluoroethylene', 2), Item.of('#gtceu:circuits/hv', 1)])
        .itemOutputs(Item.of('tacz:attachment', 1, '{AttachmentId:"tacz:scope_lpvo_1_6"}'))
        .circuit(4)
        .duration(150)
        .EUt(512);

    event.remove({ output: Item.of('tacz:attachment', 1, '{AttachmentId:"tacz:scope_qmk152"}') });
    event.recipes.gtceu.assembler('attachment_tier_scope_advanced_tacz_scope_qmk152')
        .itemInputs([Item.of('gtceu:glass_lens', 2), Item.of('gtceu:steel_screw', 2), Item.of('gtceu:stainless_steel_rod', 1), Item.of('#forge:plates/polytetrafluoroethylene', 2), Item.of('#gtceu:circuits/hv', 1)])
        .itemOutputs(Item.of('tacz:attachment', 1, '{AttachmentId:"tacz:scope_qmk152"}'))
        .circuit(5)
        .duration(150)
        .EUt(512);

    event.remove({ output: Item.of('tacz:attachment', 1, '{AttachmentId:"tacz:scope_mk5hd"}') });
    event.recipes.gtceu.assembler('attachment_tier_scope_advanced_tacz_scope_mk5hd')
        .itemInputs([Item.of('gtceu:glass_lens', 2), Item.of('gtceu:steel_screw', 2), Item.of('gtceu:stainless_steel_rod', 1), Item.of('#forge:plates/polytetrafluoroethylene', 2), Item.of('#gtceu:circuits/hv', 1)])
        .itemOutputs(Item.of('tacz:attachment', 1, '{AttachmentId:"tacz:scope_mk5hd"}'))
        .circuit(6)
        .duration(150)
        .EUt(512);

    event.remove({ output: Item.of('tacz:attachment', 1, '{AttachmentId:"tacz:scope_vudu"}') });
    event.recipes.gtceu.assembler('attachment_tier_scope_advanced_tacz_scope_vudu')
        .itemInputs([Item.of('gtceu:glass_lens', 2), Item.of('gtceu:steel_screw', 2), Item.of('gtceu:stainless_steel_rod', 1), Item.of('#forge:plates/polytetrafluoroethylene', 2), Item.of('#gtceu:circuits/hv', 1)])
        .itemOutputs(Item.of('tacz:attachment', 1, '{AttachmentId:"tacz:scope_vudu"}'))
        .circuit(7)
        .duration(150)
        .EUt(512);

    // =========================
    // GRIPS & STOCKS (LV) - ergonomic parts only, no optics/electronics -
    // an actual wooden grip item (kubejs:grip_wooden) shaped and clamped on
    // with a rod and a screw, instead of a bare plate.
    // =========================
    event.remove({ output: Item.of('tacz:attachment', 1, '{AttachmentId:"tacz:grip_cobra"}') });
    event.recipes.gtceu.assembler('attachment_tier_grip_stock_tacz_grip_cobra')
        .itemInputs([Item.of('kubejs:grip_wooden', 1), Item.of('gtceu:steel_rod', 1), Item.of('gtceu:steel_screw', 1)])
        .itemOutputs(Item.of('tacz:attachment', 1, '{AttachmentId:"tacz:grip_cobra"}'))
        .circuit(1)
        .duration(100)
        .EUt(32);

    event.remove({ output: Item.of('tacz:attachment', 1, '{AttachmentId:"tacz:grip_cqr"}') });
    event.recipes.gtceu.assembler('attachment_tier_grip_stock_tacz_grip_cqr')
        .itemInputs([Item.of('kubejs:grip_wooden', 1), Item.of('gtceu:steel_rod', 1), Item.of('gtceu:steel_screw', 1)])
        .itemOutputs(Item.of('tacz:attachment', 1, '{AttachmentId:"tacz:grip_cqr"}'))
        .circuit(2)
        .duration(100)
        .EUt(32);

    event.remove({ output: Item.of('tacz:attachment', 1, '{AttachmentId:"tacz:grip_magpul_afg_2"}') });
    event.recipes.gtceu.assembler('attachment_tier_grip_stock_tacz_grip_magpul_afg_2')
        .itemInputs([Item.of('kubejs:grip_wooden', 1), Item.of('gtceu:steel_rod', 1), Item.of('gtceu:steel_screw', 1)])
        .itemOutputs(Item.of('tacz:attachment', 1, '{AttachmentId:"tacz:grip_magpul_afg_2"}'))
        .circuit(3)
        .duration(100)
        .EUt(32);

    event.remove({ output: Item.of('tacz:attachment', 1, '{AttachmentId:"tacz:grip_osovets_black"}') });
    event.recipes.gtceu.assembler('attachment_tier_grip_stock_tacz_grip_osovets_black')
        .itemInputs([Item.of('kubejs:grip_wooden', 1), Item.of('gtceu:steel_rod', 1), Item.of('gtceu:steel_screw', 1)])
        .itemOutputs(Item.of('tacz:attachment', 1, '{AttachmentId:"tacz:grip_osovets_black"}'))
        .circuit(4)
        .duration(100)
        .EUt(32);

    event.remove({ output: Item.of('tacz:attachment', 1, '{AttachmentId:"tacz:grip_rk0"}') });
    event.recipes.gtceu.assembler('attachment_tier_grip_stock_tacz_grip_rk0')
        .itemInputs([Item.of('kubejs:grip_wooden', 1), Item.of('gtceu:steel_rod', 1), Item.of('gtceu:steel_screw', 1)])
        .itemOutputs(Item.of('tacz:attachment', 1, '{AttachmentId:"tacz:grip_rk0"}'))
        .circuit(5)
        .duration(100)
        .EUt(32);

    event.remove({ output: Item.of('tacz:attachment', 1, '{AttachmentId:"tacz:grip_rk1_b25u"}') });
    event.recipes.gtceu.assembler('attachment_tier_grip_stock_tacz_grip_rk1_b25u')
        .itemInputs([Item.of('kubejs:grip_wooden', 1), Item.of('gtceu:steel_rod', 1), Item.of('gtceu:steel_screw', 1)])
        .itemOutputs(Item.of('tacz:attachment', 1, '{AttachmentId:"tacz:grip_rk1_b25u"}'))
        .circuit(6)
        .duration(100)
        .EUt(32);

    event.remove({ output: Item.of('tacz:attachment', 1, '{AttachmentId:"tacz:grip_rk6"}') });
    event.recipes.gtceu.assembler('attachment_tier_grip_stock_tacz_grip_rk6')
        .itemInputs([Item.of('kubejs:grip_wooden', 1), Item.of('gtceu:steel_rod', 1), Item.of('gtceu:steel_screw', 1)])
        .itemOutputs(Item.of('tacz:attachment', 1, '{AttachmentId:"tacz:grip_rk6"}'))
        .circuit(7)
        .duration(100)
        .EUt(32);

    event.remove({ output: Item.of('tacz:attachment', 1, '{AttachmentId:"tacz:grip_se_5"}') });
    event.recipes.gtceu.assembler('attachment_tier_grip_stock_tacz_grip_se_5')
        .itemInputs([Item.of('kubejs:grip_wooden', 1), Item.of('gtceu:steel_rod', 1), Item.of('gtceu:steel_screw', 1)])
        .itemOutputs(Item.of('tacz:attachment', 1, '{AttachmentId:"tacz:grip_se_5"}'))
        .circuit(8)
        .duration(100)
        .EUt(32);

    event.remove({ output: Item.of('tacz:attachment', 1, '{AttachmentId:"tacz:grip_td"}') });
    event.recipes.gtceu.assembler('attachment_tier_grip_stock_tacz_grip_td')
        .itemInputs([Item.of('kubejs:grip_wooden', 1), Item.of('gtceu:steel_rod', 1), Item.of('gtceu:steel_screw', 1)])
        .itemOutputs(Item.of('tacz:attachment', 1, '{AttachmentId:"tacz:grip_td"}'))
        .circuit(9)
        .duration(100)
        .EUt(32);

    event.remove({ output: Item.of('tacz:attachment', 1, '{AttachmentId:"tacz:grip_vertical_military"}') });
    event.recipes.gtceu.assembler('attachment_tier_grip_stock_tacz_grip_vertical_military')
        .itemInputs([Item.of('kubejs:grip_wooden', 1), Item.of('gtceu:steel_rod', 1), Item.of('gtceu:steel_screw', 1)])
        .itemOutputs(Item.of('tacz:attachment', 1, '{AttachmentId:"tacz:grip_vertical_military"}'))
        .circuit(10)
        .duration(100)
        .EUt(32);

    event.remove({ output: Item.of('tacz:attachment', 1, '{AttachmentId:"tacz:grip_vertical_ranger"}') });
    event.recipes.gtceu.assembler('attachment_tier_grip_stock_tacz_grip_vertical_ranger')
        .itemInputs([Item.of('kubejs:grip_wooden', 1), Item.of('gtceu:steel_rod', 1), Item.of('gtceu:steel_screw', 1)])
        .itemOutputs(Item.of('tacz:attachment', 1, '{AttachmentId:"tacz:grip_vertical_ranger"}'))
        .circuit(11)
        .duration(100)
        .EUt(32);

    event.remove({ output: Item.of('tacz:attachment', 1, '{AttachmentId:"tacz:grip_vertical_talon"}') });
    event.recipes.gtceu.assembler('attachment_tier_grip_stock_tacz_grip_vertical_talon')
        .itemInputs([Item.of('kubejs:grip_wooden', 1), Item.of('gtceu:steel_rod', 1), Item.of('gtceu:steel_screw', 1)])
        .itemOutputs(Item.of('tacz:attachment', 1, '{AttachmentId:"tacz:grip_vertical_talon"}'))
        .circuit(12)
        .duration(100)
        .EUt(32);

    event.remove({ output: Item.of('tacz:attachment', 1, '{AttachmentId:"tacz:oem_stock_heavy"}') });
    event.recipes.gtceu.assembler('attachment_tier_grip_stock_tacz_oem_stock_heavy')
        .itemInputs([Item.of('kubejs:grip_wooden', 1), Item.of('gtceu:steel_rod', 1), Item.of('gtceu:steel_screw', 1)])
        .itemOutputs(Item.of('tacz:attachment', 1, '{AttachmentId:"tacz:oem_stock_heavy"}'))
        .circuit(13)
        .duration(100)
        .EUt(32);

    event.remove({ output: Item.of('tacz:attachment', 1, '{AttachmentId:"tacz:oem_stock_light"}') });
    event.recipes.gtceu.assembler('attachment_tier_grip_stock_tacz_oem_stock_light')
        .itemInputs([Item.of('kubejs:grip_wooden', 1), Item.of('gtceu:steel_rod', 1), Item.of('gtceu:steel_screw', 1)])
        .itemOutputs(Item.of('tacz:attachment', 1, '{AttachmentId:"tacz:oem_stock_light"}'))
        .circuit(14)
        .duration(100)
        .EUt(32);

    event.remove({ output: Item.of('tacz:attachment', 1, '{AttachmentId:"tacz:oem_stock_tactical"}') });
    event.recipes.gtceu.assembler('attachment_tier_grip_stock_tacz_oem_stock_tactical')
        .itemInputs([Item.of('kubejs:grip_wooden', 1), Item.of('gtceu:steel_rod', 1), Item.of('gtceu:steel_screw', 1)])
        .itemOutputs(Item.of('tacz:attachment', 1, '{AttachmentId:"tacz:oem_stock_tactical"}'))
        .circuit(15)
        .duration(100)
        .EUt(32);

    event.remove({ output: Item.of('tacz:attachment', 1, '{AttachmentId:"tacz:stock_ak12"}') });
    event.recipes.gtceu.assembler('attachment_tier_grip_stock_tacz_stock_ak12')
        .itemInputs([Item.of('kubejs:grip_wooden', 1), Item.of('gtceu:steel_rod', 1), Item.of('gtceu:steel_screw', 1)])
        .itemOutputs(Item.of('tacz:attachment', 1, '{AttachmentId:"tacz:stock_ak12"}'))
        .circuit(16)
        .duration(100)
        .EUt(32);

    event.remove({ output: Item.of('tacz:attachment', 1, '{AttachmentId:"tacz:stock_carbon_bone_c5"}') });
    event.recipes.gtceu.assembler('attachment_tier_grip_stock_tacz_stock_carbon_bone_c5')
        .itemInputs([Item.of('kubejs:grip_wooden', 1), Item.of('gtceu:steel_rod', 1), Item.of('gtceu:steel_screw', 1)])
        .itemOutputs(Item.of('tacz:attachment', 1, '{AttachmentId:"tacz:stock_carbon_bone_c5"}'))
        .circuit(17)
        .duration(100)
        .EUt(32);

    event.remove({ output: Item.of('tacz:attachment', 1, '{AttachmentId:"tacz:stock_heavy_spas_12"}') });
    event.recipes.gtceu.assembler('attachment_tier_grip_stock_tacz_stock_heavy_spas_12')
        .itemInputs([Item.of('kubejs:grip_wooden', 1), Item.of('gtceu:steel_rod', 1), Item.of('gtceu:steel_screw', 1)])
        .itemOutputs(Item.of('tacz:attachment', 1, '{AttachmentId:"tacz:stock_heavy_spas_12"}'))
        .circuit(18)
        .duration(100)
        .EUt(32);

    event.remove({ output: Item.of('tacz:attachment', 1, '{AttachmentId:"tacz:stock_hk_slim_line"}') });
    event.recipes.gtceu.assembler('attachment_tier_grip_stock_tacz_stock_hk_slim_line')
        .itemInputs([Item.of('kubejs:grip_wooden', 1), Item.of('gtceu:steel_rod', 1), Item.of('gtceu:steel_screw', 1)])
        .itemOutputs(Item.of('tacz:attachment', 1, '{AttachmentId:"tacz:stock_hk_slim_line"}'))
        .circuit(19)
        .duration(100)
        .EUt(32);

    event.remove({ output: Item.of('tacz:attachment', 1, '{AttachmentId:"tacz:stock_m4ss"}') });
    event.recipes.gtceu.assembler('attachment_tier_grip_stock_tacz_stock_m4ss')
        .itemInputs([Item.of('kubejs:grip_wooden', 1), Item.of('gtceu:steel_rod', 1), Item.of('gtceu:steel_screw', 1)])
        .itemOutputs(Item.of('tacz:attachment', 1, '{AttachmentId:"tacz:stock_m4ss"}'))
        .circuit(20)
        .duration(100)
        .EUt(32);

    event.remove({ output: Item.of('tacz:attachment', 1, '{AttachmentId:"tacz:stock_militech_b5"}') });
    event.recipes.gtceu.assembler('attachment_tier_grip_stock_tacz_stock_militech_b5')
        .itemInputs([Item.of('kubejs:grip_wooden', 1), Item.of('gtceu:steel_rod', 1), Item.of('gtceu:steel_screw', 1)])
        .itemOutputs(Item.of('tacz:attachment', 1, '{AttachmentId:"tacz:stock_militech_b5"}'))
        .circuit(21)
        .duration(100)
        .EUt(32);

    event.remove({ output: Item.of('tacz:attachment', 1, '{AttachmentId:"tacz:stock_moe"}') });
    event.recipes.gtceu.assembler('attachment_tier_grip_stock_tacz_stock_moe')
        .itemInputs([Item.of('kubejs:grip_wooden', 1), Item.of('gtceu:steel_rod', 1), Item.of('gtceu:steel_screw', 1)])
        .itemOutputs(Item.of('tacz:attachment', 1, '{AttachmentId:"tacz:stock_moe"}'))
        .circuit(22)
        .duration(100)
        .EUt(32);

    event.remove({ output: Item.of('tacz:attachment', 1, '{AttachmentId:"tacz:stock_ripstock"}') });
    event.recipes.gtceu.assembler('attachment_tier_grip_stock_tacz_stock_ripstock')
        .itemInputs([Item.of('kubejs:grip_wooden', 1), Item.of('gtceu:steel_rod', 1), Item.of('gtceu:steel_screw', 1)])
        .itemOutputs(Item.of('tacz:attachment', 1, '{AttachmentId:"tacz:stock_ripstock"}'))
        .circuit(23)
        .duration(100)
        .EUt(32);

    event.remove({ output: Item.of('tacz:attachment', 1, '{AttachmentId:"tacz:stock_sba3"}') });
    event.recipes.gtceu.assembler('attachment_tier_grip_stock_tacz_stock_sba3')
        .itemInputs([Item.of('kubejs:grip_wooden', 1), Item.of('gtceu:steel_rod', 1), Item.of('gtceu:steel_screw', 1)])
        .itemOutputs(Item.of('tacz:attachment', 1, '{AttachmentId:"tacz:stock_sba3"}'))
        .circuit(24)
        .duration(100)
        .EUt(32);

    event.remove({ output: Item.of('tacz:attachment', 1, '{AttachmentId:"tacz:stock_tactical_ar"}') });
    event.recipes.gtceu.assembler('attachment_tier_grip_stock_tacz_stock_tactical_ar')
        .itemInputs([Item.of('kubejs:grip_wooden', 1), Item.of('gtceu:steel_rod', 1), Item.of('gtceu:steel_screw', 1)])
        .itemOutputs(Item.of('tacz:attachment', 1, '{AttachmentId:"tacz:stock_tactical_ar"}'))
        .circuit(25)
        .duration(100)
        .EUt(32);

    event.remove({ output: Item.of('tacz:attachment', 1, '{AttachmentId:"tacz:stock_tactical_spas_12"}') });
    event.recipes.gtceu.assembler('attachment_tier_grip_stock_tacz_stock_tactical_spas_12')
        .itemInputs([Item.of('kubejs:grip_wooden', 1), Item.of('gtceu:steel_rod', 1), Item.of('gtceu:steel_screw', 1)])
        .itemOutputs(Item.of('tacz:attachment', 1, '{AttachmentId:"tacz:stock_tactical_spas_12"}'))
        .circuit(26)
        .duration(100)
        .EUt(32);

    event.remove({ output: Item.of('tacz:attachment', 1, '{AttachmentId:"ronmc:angled_grip"}') });
    event.recipes.gtceu.assembler('attachment_tier_grip_stock_ronmc_angled_grip')
        .itemInputs([Item.of('kubejs:grip_wooden', 1), Item.of('gtceu:steel_rod', 1), Item.of('gtceu:steel_screw', 1)])
        .itemOutputs(Item.of('tacz:attachment', 1, '{AttachmentId:"ronmc:angled_grip"}'))
        .circuit(27)
        .duration(100)
        .EUt(32);

    event.remove({ output: Item.of('tacz:attachment', 1, '{AttachmentId:"ronmc:combat_grip"}') });
    event.recipes.gtceu.assembler('attachment_tier_grip_stock_ronmc_combat_grip')
        .itemInputs([Item.of('kubejs:grip_wooden', 1), Item.of('gtceu:steel_rod', 1), Item.of('gtceu:steel_screw', 1)])
        .itemOutputs(Item.of('tacz:attachment', 1, '{AttachmentId:"ronmc:combat_grip"}'))
        .circuit(28)
        .duration(100)
        .EUt(32);

    event.remove({ output: Item.of('tacz:attachment', 1, '{AttachmentId:"ronmc:mp5a2_grip"}') });
    event.recipes.gtceu.assembler('attachment_tier_grip_stock_ronmc_mp5a2_grip')
        .itemInputs([Item.of('kubejs:grip_wooden', 1), Item.of('gtceu:steel_rod', 1), Item.of('gtceu:steel_screw', 1)])
        .itemOutputs(Item.of('tacz:attachment', 1, '{AttachmentId:"ronmc:mp5a2_grip"}'))
        .circuit(29)
        .duration(100)
        .EUt(32);

    event.remove({ output: Item.of('tacz:attachment', 1, '{AttachmentId:"ronmc:side_angle_grip"}') });
    event.recipes.gtceu.assembler('attachment_tier_grip_stock_ronmc_side_angle_grip')
        .itemInputs([Item.of('kubejs:grip_wooden', 1), Item.of('gtceu:steel_rod', 1), Item.of('gtceu:steel_screw', 1)])
        .itemOutputs(Item.of('tacz:attachment', 1, '{AttachmentId:"ronmc:side_angle_grip"}'))
        .circuit(30)
        .duration(100)
        .EUt(32);

    event.remove({ output: Item.of('tacz:attachment', 1, '{AttachmentId:"ronmc:stock_tactical_tan"}') });
    event.recipes.gtceu.assembler('attachment_tier_grip_stock_ronmc_stock_tactical_tan')
        .itemInputs([Item.of('kubejs:grip_wooden', 1), Item.of('gtceu:steel_rod', 1), Item.of('gtceu:steel_screw', 1)])
        .itemOutputs(Item.of('tacz:attachment', 1, '{AttachmentId:"ronmc:stock_tactical_tan"}'))
        .circuit(31)
        .duration(100)
        .EUt(32);

    // =========================
    // MAGAZINES - extended mags (LV) - body, follower spring, baseplate.
    // =========================
    event.remove({ output: Item.of('tacz:attachment', 1, '{AttachmentId:"tacz:extended_mag_1"}') });
    event.recipes.gtceu.assembler('attachment_tier_mag_tacz_extended_mag_1')
        .itemInputs([Item.of('gtceu:steel_plate', 1), Item.of('gtceu:small_steel_spring', 1), Item.of('gtceu:steel_screw', 1)])
        .itemOutputs(Item.of('tacz:attachment', 1, '{AttachmentId:"tacz:extended_mag_1"}'))
        .circuit(1)
        .duration(100)
        .EUt(32);

    event.remove({ output: Item.of('tacz:attachment', 1, '{AttachmentId:"tacz:extended_mag_2"}') });
    event.recipes.gtceu.assembler('attachment_tier_mag_tacz_extended_mag_2')
        .itemInputs([Item.of('gtceu:steel_plate', 1), Item.of('gtceu:small_steel_spring', 1), Item.of('gtceu:steel_screw', 1)])
        .itemOutputs(Item.of('tacz:attachment', 1, '{AttachmentId:"tacz:extended_mag_2"}'))
        .circuit(2)
        .duration(100)
        .EUt(32);

    event.remove({ output: Item.of('tacz:attachment', 1, '{AttachmentId:"tacz:extended_mag_3"}') });
    event.recipes.gtceu.assembler('attachment_tier_mag_tacz_extended_mag_3')
        .itemInputs([Item.of('gtceu:steel_plate', 1), Item.of('gtceu:small_steel_spring', 1), Item.of('gtceu:steel_screw', 1)])
        .itemOutputs(Item.of('tacz:attachment', 1, '{AttachmentId:"tacz:extended_mag_3"}'))
        .circuit(3)
        .duration(100)
        .EUt(32);

    event.remove({ output: Item.of('tacz:attachment', 1, '{AttachmentId:"tacz:light_extended_mag_1"}') });
    event.recipes.gtceu.assembler('attachment_tier_mag_tacz_light_extended_mag_1')
        .itemInputs([Item.of('gtceu:steel_plate', 1), Item.of('gtceu:small_steel_spring', 1), Item.of('gtceu:steel_screw', 1)])
        .itemOutputs(Item.of('tacz:attachment', 1, '{AttachmentId:"tacz:light_extended_mag_1"}'))
        .circuit(4)
        .duration(100)
        .EUt(32);

    event.remove({ output: Item.of('tacz:attachment', 1, '{AttachmentId:"tacz:light_extended_mag_2"}') });
    event.recipes.gtceu.assembler('attachment_tier_mag_tacz_light_extended_mag_2')
        .itemInputs([Item.of('gtceu:steel_plate', 1), Item.of('gtceu:small_steel_spring', 1), Item.of('gtceu:steel_screw', 1)])
        .itemOutputs(Item.of('tacz:attachment', 1, '{AttachmentId:"tacz:light_extended_mag_2"}'))
        .circuit(5)
        .duration(100)
        .EUt(32);

    event.remove({ output: Item.of('tacz:attachment', 1, '{AttachmentId:"tacz:light_extended_mag_3"}') });
    event.recipes.gtceu.assembler('attachment_tier_mag_tacz_light_extended_mag_3')
        .itemInputs([Item.of('gtceu:steel_plate', 1), Item.of('gtceu:small_steel_spring', 1), Item.of('gtceu:steel_screw', 1)])
        .itemOutputs(Item.of('tacz:attachment', 1, '{AttachmentId:"tacz:light_extended_mag_3"}'))
        .circuit(6)
        .duration(100)
        .EUt(32);

    event.remove({ output: Item.of('tacz:attachment', 1, '{AttachmentId:"tacz:shotgun_extended_mag_1"}') });
    event.recipes.gtceu.assembler('attachment_tier_mag_tacz_shotgun_extended_mag_1')
        .itemInputs([Item.of('gtceu:steel_plate', 1), Item.of('gtceu:small_steel_spring', 1), Item.of('gtceu:steel_screw', 1)])
        .itemOutputs(Item.of('tacz:attachment', 1, '{AttachmentId:"tacz:shotgun_extended_mag_1"}'))
        .circuit(7)
        .duration(100)
        .EUt(32);

    event.remove({ output: Item.of('tacz:attachment', 1, '{AttachmentId:"tacz:shotgun_extended_mag_2"}') });
    event.recipes.gtceu.assembler('attachment_tier_mag_tacz_shotgun_extended_mag_2')
        .itemInputs([Item.of('gtceu:steel_plate', 1), Item.of('gtceu:small_steel_spring', 1), Item.of('gtceu:steel_screw', 1)])
        .itemOutputs(Item.of('tacz:attachment', 1, '{AttachmentId:"tacz:shotgun_extended_mag_2"}'))
        .circuit(8)
        .duration(100)
        .EUt(32);

    event.remove({ output: Item.of('tacz:attachment', 1, '{AttachmentId:"tacz:shotgun_extended_mag_3"}') });
    event.recipes.gtceu.assembler('attachment_tier_mag_tacz_shotgun_extended_mag_3')
        .itemInputs([Item.of('gtceu:steel_plate', 1), Item.of('gtceu:small_steel_spring', 1), Item.of('gtceu:steel_screw', 1)])
        .itemOutputs(Item.of('tacz:attachment', 1, '{AttachmentId:"tacz:shotgun_extended_mag_3"}'))
        .circuit(9)
        .duration(100)
        .EUt(32);

    event.remove({ output: Item.of('tacz:attachment', 1, '{AttachmentId:"tacz:sniper_extended_mag_1"}') });
    event.recipes.gtceu.assembler('attachment_tier_mag_tacz_sniper_extended_mag_1')
        .itemInputs([Item.of('gtceu:steel_plate', 1), Item.of('gtceu:small_steel_spring', 1), Item.of('gtceu:steel_screw', 1)])
        .itemOutputs(Item.of('tacz:attachment', 1, '{AttachmentId:"tacz:sniper_extended_mag_1"}'))
        .circuit(10)
        .duration(100)
        .EUt(32);

    event.remove({ output: Item.of('tacz:attachment', 1, '{AttachmentId:"tacz:sniper_extended_mag_2"}') });
    event.recipes.gtceu.assembler('attachment_tier_mag_tacz_sniper_extended_mag_2')
        .itemInputs([Item.of('gtceu:steel_plate', 1), Item.of('gtceu:small_steel_spring', 1), Item.of('gtceu:steel_screw', 1)])
        .itemOutputs(Item.of('tacz:attachment', 1, '{AttachmentId:"tacz:sniper_extended_mag_2"}'))
        .circuit(11)
        .duration(100)
        .EUt(32);

    event.remove({ output: Item.of('tacz:attachment', 1, '{AttachmentId:"tacz:sniper_extended_mag_3"}') });
    event.recipes.gtceu.assembler('attachment_tier_mag_tacz_sniper_extended_mag_3')
        .itemInputs([Item.of('gtceu:steel_plate', 1), Item.of('gtceu:small_steel_spring', 1), Item.of('gtceu:steel_screw', 1)])
        .itemOutputs(Item.of('tacz:attachment', 1, '{AttachmentId:"tacz:sniper_extended_mag_3"}'))
        .circuit(12)
        .duration(100)
        .EUt(32);

    // =========================
    // LASERS & LIGHTS (MV) - genuinely electronic (diode + battery + lens),
    // needs an actual circuit same as the reflex sights above.
    // =========================
    event.remove({ output: Item.of('tacz:attachment', 1, '{AttachmentId:"tacz:laser_compact"}') });
    event.recipes.gtceu.assembler('attachment_tier_laser_light_tacz_laser_compact')
        .itemInputs([Item.of('gtceu:glass_lens', 1), Item.of('gtceu:steel_screw', 1), Item.of('#forge:plates/polyvinyl_chloride', 1), Item.of('#gtceu:circuits/mv', 1)])
        .itemOutputs(Item.of('tacz:attachment', 1, '{AttachmentId:"tacz:laser_compact"}'))
        .circuit(1)
        .duration(100)
        .EUt(128)
        .addCondition(WFResearch.condition('guns2'));

    event.remove({ output: Item.of('tacz:attachment', 1, '{AttachmentId:"tacz:laser_lopro"}') });
    event.recipes.gtceu.assembler('attachment_tier_laser_light_tacz_laser_lopro')
        .itemInputs([Item.of('gtceu:glass_lens', 1), Item.of('gtceu:steel_screw', 1), Item.of('#forge:plates/polyvinyl_chloride', 1), Item.of('#gtceu:circuits/mv', 1)])
        .itemOutputs(Item.of('tacz:attachment', 1, '{AttachmentId:"tacz:laser_lopro"}'))
        .circuit(2)
        .duration(100)
        .EUt(128)
        .addCondition(WFResearch.condition('guns2'));

    event.remove({ output: Item.of('tacz:attachment', 1, '{AttachmentId:"tacz:laser_nightstick"}') });
    event.recipes.gtceu.assembler('attachment_tier_laser_light_tacz_laser_nightstick')
        .itemInputs([Item.of('gtceu:glass_lens', 1), Item.of('gtceu:steel_screw', 1), Item.of('#forge:plates/polyvinyl_chloride', 1), Item.of('#gtceu:circuits/mv', 1)])
        .itemOutputs(Item.of('tacz:attachment', 1, '{AttachmentId:"tacz:laser_nightstick"}'))
        .circuit(3)
        .duration(100)
        .EUt(128)
        .addCondition(WFResearch.condition('guns2'));

    event.remove({ output: Item.of('tacz:attachment', 1, '{AttachmentId:"tacz:laser_peq15"}') });
    event.recipes.gtceu.assembler('attachment_tier_laser_light_tacz_laser_peq15')
        .itemInputs([Item.of('gtceu:glass_lens', 1), Item.of('gtceu:steel_screw', 1), Item.of('#forge:plates/polyvinyl_chloride', 1), Item.of('#gtceu:circuits/mv', 1)])
        .itemOutputs(Item.of('tacz:attachment', 1, '{AttachmentId:"tacz:laser_peq15"}'))
        .circuit(4)
        .duration(100)
        .EUt(128)
        .addCondition(WFResearch.condition('guns2'));

    event.remove({ output: Item.of('tacz:attachment', 1, '{AttachmentId:"tacz:laser_peq6"}') });
    event.recipes.gtceu.assembler('attachment_tier_laser_light_tacz_laser_peq6')
        .itemInputs([Item.of('gtceu:glass_lens', 1), Item.of('gtceu:steel_screw', 1), Item.of('#forge:plates/polyvinyl_chloride', 1), Item.of('#gtceu:circuits/mv', 1)])
        .itemOutputs(Item.of('tacz:attachment', 1, '{AttachmentId:"tacz:laser_peq6"}'))
        .circuit(5)
        .duration(100)
        .EUt(128)
        .addCondition(WFResearch.condition('guns2'));

    event.remove({ output: Item.of('tacz:attachment', 1, '{AttachmentId:"ronmc:custom_laser"}') });
    event.recipes.gtceu.assembler('attachment_tier_laser_light_ronmc_custom_laser')
        .itemInputs([Item.of('gtceu:glass_lens', 1), Item.of('gtceu:steel_screw', 1), Item.of('#forge:plates/polyvinyl_chloride', 1), Item.of('#gtceu:circuits/mv', 1)])
        .itemOutputs(Item.of('tacz:attachment', 1, '{AttachmentId:"ronmc:custom_laser"}'))
        .circuit(6)
        .duration(100)
        .EUt(128)
        .addCondition(WFResearch.condition('guns2'));

    event.remove({ output: Item.of('tacz:attachment', 1, '{AttachmentId:"ronmc:flashlight_1"}') });
    event.recipes.gtceu.assembler('attachment_tier_laser_light_ronmc_flashlight_1')
        .itemInputs([Item.of('gtceu:glass_lens', 1), Item.of('gtceu:steel_screw', 1), Item.of('#forge:plates/polyvinyl_chloride', 1), Item.of('#gtceu:circuits/mv', 1)])
        .itemOutputs(Item.of('tacz:attachment', 1, '{AttachmentId:"ronmc:flashlight_1"}'))
        .circuit(7)
        .duration(100)
        .EUt(128)
        .addCondition(WFResearch.condition('guns2'));

    event.remove({ output: Item.of('tacz:attachment', 1, '{AttachmentId:"ronmc:flashlight_2"}') });
    event.recipes.gtceu.assembler('attachment_tier_laser_light_ronmc_flashlight_2')
        .itemInputs([Item.of('gtceu:glass_lens', 1), Item.of('gtceu:steel_screw', 1), Item.of('#forge:plates/polyvinyl_chloride', 1), Item.of('#gtceu:circuits/mv', 1)])
        .itemOutputs(Item.of('tacz:attachment', 1, '{AttachmentId:"ronmc:flashlight_2"}'))
        .circuit(8)
        .duration(100)
        .EUt(128)
        .addCondition(WFResearch.condition('guns2'));

    event.remove({ output: Item.of('tacz:attachment', 1, '{AttachmentId:"ronmc:laser_peq15"}') });
    event.recipes.gtceu.assembler('attachment_tier_laser_light_ronmc_laser_peq15')
        .itemInputs([Item.of('gtceu:glass_lens', 1), Item.of('gtceu:steel_screw', 1), Item.of('#forge:plates/polyvinyl_chloride', 1), Item.of('#gtceu:circuits/mv', 1)])
        .itemOutputs(Item.of('tacz:attachment', 1, '{AttachmentId:"ronmc:laser_peq15"}'))
        .circuit(9)
        .duration(100)
        .EUt(128)
        .addCondition(WFResearch.condition('guns2'));

    event.remove({ output: Item.of('tacz:attachment', 1, '{AttachmentId:"ronmc:laser_pointer"}') });
    event.recipes.gtceu.assembler('attachment_tier_laser_light_ronmc_laser_pointer')
        .itemInputs([Item.of('gtceu:glass_lens', 1), Item.of('gtceu:steel_screw', 1), Item.of('#forge:plates/polyvinyl_chloride', 1), Item.of('#gtceu:circuits/mv', 1)])
        .itemOutputs(Item.of('tacz:attachment', 1, '{AttachmentId:"ronmc:laser_pointer"}'))
        .circuit(10)
        .duration(100)
        .EUt(128)
        .addCondition(WFResearch.condition('guns2'));

    event.remove({ output: Item.of('tacz:attachment', 1, '{AttachmentId:"ronmc:tac_laser"}') });
    event.recipes.gtceu.assembler('attachment_tier_laser_light_ronmc_tac_laser')
        .itemInputs([Item.of('gtceu:glass_lens', 1), Item.of('gtceu:steel_screw', 1), Item.of('#forge:plates/polyvinyl_chloride', 1), Item.of('#gtceu:circuits/mv', 1)])
        .itemOutputs(Item.of('tacz:attachment', 1, '{AttachmentId:"ronmc:tac_laser"}'))
        .circuit(11)
        .duration(100)
        .EUt(128)
        .addCondition(WFResearch.condition('guns2'));

});
