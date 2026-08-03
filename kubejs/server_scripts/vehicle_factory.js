// Vehicle-factory recipes, authored through the mod's WFVehicles KubeJS binding.
//
// Each of the five vehicle-assembly multiblocks has its OWN recipe type — wfcore:light_ground_vehicle_factory,
// tank_assembly, light_plane_assembler, heavy_plane_assembler, heavy_vehicle_depot — and completes by
// outputting a wfcore:packaged_vehicle that spawns the entity. GTCEu's generic KubeJS builder can't target
// these on this pack's Rhino (ambiguous item overloads + mangled entity NBT) and would silently write to a
// dead gtceu:vehicle_factory type, so recipes are built via WFVehicles.recipe(id, entity[, factory]) and fed
// to event.custom(...). Up to 9 item inputs per recipe (a .circuit() selector uses one slot).
//
// ── Cost scaling (mild pass; mirrors the component scaling in vehicles/components.js) ──
// A vehicle's tier = the highest-tier kubejs part it consumes. Scale the *consumed*
// circuits, cable, and craft time by that tier's factor (item counts capped at a 64
// stack). Frame/engine COUNTS stay as authored — their extra cost already rides on the
// now-pricier component sub-recipes — so a vehicle's total lands at ~factor, not factor².
// Lower tiers stay relatively cheap; higher tiers grow as infrastructure demands. Keep
// TIER_COST in sync with components.js.
//   TIER_COST: lv=1.1, mv=1.25, hv=1.5, ev=1.8, iv=2.2
// EU/t derived from part tier (single source of truth): every vehicle needs an assembler ONE
// voltage tier above its parts — LV->MV, MV->HV, HV->EV, EV->IV, IV->LuV — i.e. the clean
// 450×4^(rank-1) series. This replaced the old hand-authored per-entry `eut`, which had drifted
// (five MV vehicles sat at 120 / plain MV, and the IV b-2 at 7200 / plain IV — both one tier low).
//   EUT_BY_TIER: lv=112, mv=450, hv=1800, ev=7200, iv=28800
// Cable (…_single_cable) is bulk consumed material -> scale it; the other items are
// single components whose cost rises via their sub-recipe, so keep their counts.
// Consumed circuit boards (tags) are also scaled. All scaled counts are cap64 (min 1, max 64).
//
// NOTE: TOW (superbwarfare:tow_deployer) was dropped from this list — it outputs a plain item, not a
// packaged-vehicle entity, so it doesn't fit WFVehicles.recipe. Ask if you want raw-item-output support.
//
// RESEARCH GATING: each curated ground vehicle has its OWN research node (progression GRAPH, not tier
// groups — see wfcore/WFResearch.js). One `research:` gate per entity + tier-matched parts:
//   LV: sodayo_pick_up=veh_sodayo, truck=veh_truck, ural_green=veh_ural
//   MV: sodayo_pick_up_hmg=veh_sodayo_hmg, sodayo_pick_up_rocket=veh_sodayo_mlrs,
//       humvee_sand=veh_humvee_mg, humvee_mk19=veh_humvee_mk19
//   HV: lav_150=veh_lav, bradley=veh_bradley, lav_ad=veh_lav_ad
//   EV: ztz_99a=veh_tank, plz_05=veh_plz    IV: prism_tank=veh_prism
// NOT in the progression -> commented out: ural_tricolor, sodayo_pick_up_tow.
// TODO (tier TBD — user to balance): the remaining ground vehicles are commented out (DISABLED, ungated).
//   Give each a research node + part tier later:
//     MBTs: m_1a_2, t_90a, mcsp:t80u_camo, mcsp:t80v_camo · SPAAG: ashvehicle:pa_pantsir
//     MLRS: ashvehicle:tos · IFVs/APCs: bmp_2, lav_25, mcsp:zbd04a_sand, mcsp:bmd_4, mcsp:sprut
//   (planes are aviation — handled on the future Aviation page, not here.)
ServerEvents.recipes(event => {
    // lav_150 is no longer baked into the mod (removed from addDefaultRecipes); harmless no-op safety net in
    // case an older jar that still bakes it is loaded.
    event.remove({ id: /lav_150/ })

    // --- Light Ground Vehicle Factory ---
    // mv_truck — component-built truck (LV frame + engine from components.js), MV tier
    // tier=lv, f=1.1 → cable cap64(32*1.1)=35, tag cap64(4*1.1)=4, EUt=112, duration=Math.round(200*1.1)=220
    try {
        var r = WFVehicles.recipe('kubejs:veh_0', 'superbwarfare:truck', 'light_ground_vehicle_factory');
        r.item('kubejs:lv_vehicle_frame', 1);
        r.item('superbwarfare:wheel', 4);
        r.item('kubejs:lv_engine', 1);
        r.item('gtceu:tin_single_cable', 35);
        r.tag('#gtceu:circuits/lv', 4);
        r.circuit(1);
        r.research('veh_truck');
        r.EUt(112).duration(220);
        event.custom(r.build());
    } catch (e) { console.warn('[WF] skipped vehicle recipe #0 (superbwarfare:truck @ light_ground_vehicle_factory): ' + e); }

    // tier=lv, f=1.1 → cable cap64(32*1.1)=35, tag cap64(4*1.1)=4, EUt=112, duration=220
    try {
        var r = WFVehicles.recipe('kubejs:veh_1', 'superbwarfare:sodayo_pick_up', 'light_ground_vehicle_factory');
        r.item('kubejs:lv_vehicle_frame', 1);
        r.item('superbwarfare:wheel', 4);
        r.item('kubejs:lv_engine', 1);
        r.item('gtceu:tin_single_cable', 35);
        r.tag('#gtceu:circuits/lv', 4);
        r.circuit(2);
        r.research('veh_sodayo');
        r.EUt(112).duration(220);
        event.custom(r.build());
    } catch (e) { console.warn('[WF] skipped vehicle recipe #1 (superbwarfare:sodayo_pick_up @ light_ground_vehicle_factory): ' + e); }

    // DISABLED (not in progression): { entity: 'mcsp:ural_tricolor', factory: 'light_ground_vehicle_factory', items: [['kubejs:lv_vehicle_frame', 1], ['superbwarfare:wheel', 4], ['kubejs:lv_engine', 1], ['gtceu:tin_single_cable', 32]], tags: [['#gtceu:circuits/lv', 4]], circuit: 3, eut: 70, duration: 200, research: 'veh_logistics' },

    // tier=lv, f=1.1 → cable cap64(32*1.1)=35, tag cap64(4*1.1)=4, EUt=112, duration=220
    try {
        var r = WFVehicles.recipe('kubejs:veh_2', 'mcsp:ural_green', 'light_ground_vehicle_factory');
        r.item('kubejs:lv_vehicle_frame', 1);
        r.item('superbwarfare:wheel', 4);
        r.item('kubejs:lv_engine', 1);
        r.item('gtceu:tin_single_cable', 35);
        r.tag('#gtceu:circuits/lv', 4);
        r.circuit(4);
        r.research('veh_ural');
        r.EUt(112).duration(220);
        event.custom(r.build());
    } catch (e) { console.warn('[WF] skipped vehicle recipe #2 (mcsp:ural_green @ light_ground_vehicle_factory): ' + e); }

    // tier=mv, f=1.25 → cable cap64(32*1.25)=40, tag cap64(8*1.25)=10, EUt=450, duration=Math.round(400*1.25)=500
    try {
        var r = WFVehicles.recipe('kubejs:veh_3', 'superbwarfare:sodayo_pick_up_hmg', 'light_ground_vehicle_factory');
        r.item('kubejs:mv_vehicle_frame', 1);
        r.item('superbwarfare:wheel', 4);
        r.item('kubejs:mv_engine', 1);
        r.item('gtceu:copper_single_cable', 40);
        r.item('kubejs:mv_cannon_barrel', 1);
        r.tag('#gtceu:circuits/mv', 10);
        r.circuit(5);
        r.research('veh_sodayo_hmg');
        r.EUt(450).duration(500);
        event.custom(r.build());
    } catch (e) { console.warn('[WF] skipped vehicle recipe #3 (superbwarfare:sodayo_pick_up_hmg @ light_ground_vehicle_factory): ' + e); }

    // tier=mv, f=1.25 → cable cap64(32*1.25)=40, tag cap64(8*1.25)=10, EUt=450, duration=500
    try {
        var r = WFVehicles.recipe('kubejs:veh_4', 'superbwarfare:sodayo_pick_up_rocket', 'light_ground_vehicle_factory');
        r.item('kubejs:mv_vehicle_frame', 1);
        r.item('superbwarfare:wheel', 4);
        r.item('kubejs:mv_engine', 1);
        r.item('gtceu:copper_single_cable', 40);
        r.item('kubejs:mv_weapons_system', 1);
        r.tag('#gtceu:circuits/mv', 10);
        r.circuit(9);
        r.research('veh_sodayo_mlrs');
        r.EUt(450).duration(500);
        event.custom(r.build());
    } catch (e) { console.warn('[WF] skipped vehicle recipe #4 (superbwarfare:sodayo_pick_up_rocket @ light_ground_vehicle_factory): ' + e); }

    // DISABLED (not in progression): { entity: 'superbwarfare:sodayo_pick_up_tow', factory: 'light_ground_vehicle_factory', items: [['kubejs:mv_vehicle_frame', 1], ['superbwarfare:wheel', 4], ['kubejs:mv_engine', 1], ['gtceu:copper_single_cable', 32], ['superbwarfare:tow_deployer', 1]], tags: [['#gtceu:circuits/mv', 8]], circuit: 6, eut: 120, duration: 400, research: 'veh_armed_trucks' },

    // Light Plane assembler — Ju-87 (fixed-wing) + AH-6 (rotary): the two MV entry aircraft (Aviation tab).
    // tier=lv, f=1.1 → cable cap64(32*1.1)=35, EUt=112, duration=Math.round(200*1.1)=220
    try {
        var r = WFVehicles.recipe('kubejs:veh_5', 'superbwarfare:ju_87', 'light_plane_assembler');
        r.item('kubejs:lv_air_frame', 1);
        r.item('superbwarfare:wheel', 3);
        r.item('kubejs:lv_engine', 1);
        r.item('gtceu:tin_single_cable', 35);
        r.item('kubejs:lv_cockpit', 1);
        r.item('kubejs:lv_weapons_system', 1);
        r.item('kubejs:lv_wing', 1);
        r.circuit(1);
        r.research('air_ju_87');
        r.EUt(112).duration(220);
        event.custom(r.build());
    } catch (e) { console.warn('[WF] skipped vehicle recipe #5 (superbwarfare:ju_87 @ light_plane_assembler): ' + e); }

    // AH-6 Little Bird — MV rotary entry: a rotor (not a wing) helicopter with a light weapons station.
    // tier=mv, f=1.25 → cable cap64(32*1.25)=40, EUt=450, duration=Math.round(400*1.25)=500
    try {
        var r = WFVehicles.recipe('kubejs:veh_6', 'superbwarfare:ah_6', 'helicopter_assembler');
        r.item('kubejs:mv_air_frame', 1);
        r.item('superbwarfare:wheel', 3);
        r.item('kubejs:mv_engine', 1);
        r.item('gtceu:copper_single_cable', 40);
        r.item('kubejs:mv_cockpit', 1);
        r.item('kubejs:mv_weapons_system', 1);
        r.item('kubejs:mv_rotor', 2);
        r.circuit(2);
        r.research('air_ah_6');
        r.EUt(450).duration(500);
        event.custom(r.build());
    } catch (e) { console.warn('[WF] skipped vehicle recipe #6 (superbwarfare:ah_6 @ helicopter_assembler): ' + e); }

    // MH-60M Black Hawk — HV rotary transport/gunship (ashvehicle entity).
    // tier=hv, f=1.5 → cable cap64(32*1.5)=48, EUt=1800, duration=Math.round(6000*1.5)=9000
    try {
        var r = WFVehicles.recipe('kubejs:veh_7', 'ashvehicle:mh_60m', 'helicopter_assembler');
        r.item('kubejs:hv_air_frame', 1);
        r.item('superbwarfare:wheel', 3);
        r.item('kubejs:hv_engine', 1);
        r.item('gtceu:gold_single_cable', 48);
        r.item('kubejs:hv_rotor', 2);
        r.item('kubejs:hv_weapons_system', 1);
        r.item('kubejs:hv_cockpit', 1);
        r.circuit(20);
        r.research('air_mh_60');
        r.EUt(1800).duration(9000);
        event.custom(r.build());
    } catch (e) { console.warn('[WF] skipped vehicle recipe #7 (ashvehicle:mh_60m @ helicopter_assembler): ' + e); }

    // Mi-28 Attack Helicopter — EV rotary tank-hunter: rotor + a 30mm cannon barrel + a missile weapons station.
    // tier=ev, f=1.8 → cable cap64(32*1.8)=58, EUt=7200, duration=Math.round(6000*1.8)=10800
    try {
        var r = WFVehicles.recipe('kubejs:veh_8', 'superbwarfare:mi_28', 'helicopter_assembler');
        r.item('kubejs:ev_air_frame', 1);
        r.item('superbwarfare:wheel', 3);
        r.item('kubejs:ev_engine', 1);
        r.item('gtceu:aluminium_single_cable', 58);
        r.item('kubejs:ev_rotor', 2);
        r.item('kubejs:ev_weapons_system', 1);
        r.item('kubejs:ev_cannon_barrel', 1);
        r.item('kubejs:ev_cockpit', 1);
        r.circuit(21);
        r.research('air_mi_28');
        r.EUt(7200).duration(10800);
        event.custom(r.build());
    } catch (e) { console.warn('[WF] skipped vehicle recipe #8 (superbwarfare:mi_28 @ helicopter_assembler): ' + e); }

    // DISABLED (ungated, tier TBD): { entity: 'superbwarfare:m_1a_2',          factory: 'heavy_vehicle_depot', items: [['kubejs:mv_vehicle_frame', 1], ['kubejs:mv_track', 2], ['kubejs:mv_engine', 1], ['gtceu:copper_single_cable', 32], ['kubejs:mv_cannon_barrel', 1]], tags: [['#gtceu:circuits/mv', 16]],circuit: 1, eut: 450, duration: 6000 },

    // tier=hv, f=1.5 → cable cap64(32*1.5)=48, tag cap64(16*1.5)=24, EUt=1800, duration=Math.round(6000*1.5)=9000
    try {
        var r = WFVehicles.recipe('kubejs:veh_9', 'superbwarfare:lav_150', 'heavy_vehicle_depot');
        r.item('kubejs:hv_vehicle_frame', 1);
        r.item('superbwarfare:wheel', 4);
        r.item('kubejs:hv_engine', 1);
        r.item('gtceu:gold_single_cable', 48);
        r.item('kubejs:hv_cannon_barrel', 1);
        r.tag('#gtceu:circuits/hv', 24);
        r.circuit(2);
        r.research('veh_lav');
        r.EUt(1800).duration(9000);
        event.custom(r.build());
    } catch (e) { console.warn('[WF] skipped vehicle recipe #9 (superbwarfare:lav_150 @ heavy_vehicle_depot): ' + e); }

    // tier=hv, f=1.5 → cable cap64(32*1.5)=48, tag cap64(16*1.5)=24, EUt=1800, duration=9000
    try {
        var r = WFVehicles.recipe('kubejs:veh_10', 'superbwarfare:lav_ad', 'heavy_vehicle_depot');
        r.item('kubejs:hv_vehicle_frame', 1);
        r.item('superbwarfare:wheel', 4);
        r.item('kubejs:hv_engine', 1);
        r.item('gtceu:gold_single_cable', 48);
        r.item('kubejs:hv_cannon_barrel', 1);
        r.item('kubejs:hv_weapons_system', 1);
        r.tag('#gtceu:circuits/hv', 24);
        r.circuit(3);
        r.research('veh_lav_ad');
        r.EUt(1800).duration(9000);
        event.custom(r.build());
    } catch (e) { console.warn('[WF] skipped vehicle recipe #10 (superbwarfare:lav_ad @ heavy_vehicle_depot): ' + e); }

    // DISABLED (ungated, tier TBD): { entity: 'mcsp:t80u_camo',          factory: 'heavy_vehicle_depot', items: [['kubejs:mv_vehicle_frame', 1], ['kubejs:mv_track', 2], ['kubejs:mv_engine', 1], ['gtceu:copper_single_cable', 32], ['kubejs:mv_cannon_barrel', 1]], tags: [['#gtceu:circuits/mv', 16]],circuit: 4, eut: 450, duration: 6000 },
    // DISABLED (ungated, tier TBD): { entity: 'mcsp:t80v_camo',          factory: 'heavy_vehicle_depot', items: [['kubejs:mv_vehicle_frame', 1], ['kubejs:mv_track', 2], ['kubejs:mv_engine', 1], ['gtceu:copper_single_cable', 32], ['kubejs:mv_cannon_barrel', 1]], tags: [['#gtceu:circuits/mv', 16]],circuit: 5, eut: 450, duration: 6000 },

    // tier=hv, f=1.5 → cable cap64(32*1.5)=48, tag cap64(16*1.5)=24, EUt=1800, duration=9000
    try {
        var r = WFVehicles.recipe('kubejs:veh_11', 'superbwarfare:bradley', 'heavy_vehicle_depot');
        r.item('kubejs:hv_vehicle_frame', 1);
        r.item('kubejs:hv_track', 2);
        r.item('kubejs:hv_engine', 1);
        r.item('gtceu:gold_single_cable', 48);
        r.item('kubejs:hv_cannon_barrel', 1);
        r.item('kubejs:hv_weapons_system', 2);
        r.tag('#gtceu:circuits/hv', 24);
        r.circuit(11);
        r.research('veh_bradley');
        r.EUt(1800).duration(9000);
        event.custom(r.build());
    } catch (e) { console.warn('[WF] skipped vehicle recipe #11 (superbwarfare:bradley @ heavy_vehicle_depot): ' + e); }

    // DISABLED (ungated, tier TBD): { entity: 'superbwarfare:bmp_2',          factory: 'heavy_vehicle_depot', items: [['kubejs:mv_vehicle_frame', 1], ['kubejs:mv_track', 2], ['kubejs:mv_engine', 1], ['gtceu:copper_single_cable', 32], ['kubejs:mv_cannon_barrel', 1]], tags: [['#gtceu:circuits/mv', 16]],circuit: 7, eut: 450, duration: 6000 },
    // DISABLED (ungated, tier TBD): { entity: 'superbwarfare:lav_25',          factory: 'heavy_vehicle_depot', items: [['kubejs:mv_vehicle_frame', 1], ['superbwarfare:wheel', 8], ['kubejs:mv_engine', 1], ['gtceu:copper_single_cable', 32], ['kubejs:mv_cannon_barrel', 1], ['kubejs:mv_weapons_system', 1]], tags: [['#gtceu:circuits/mv', 16]],circuit: 8, eut: 450, duration: 6000 },

    // tier=mv, f=1.25 → cable cap64(32*1.25)=40, tag cap64(8*1.25)=10, EUt=450, duration=Math.round(400*1.25)=500
    try {
        var r = WFVehicles.recipe('kubejs:veh_12', 'mcsp:humvee_mk19', 'light_ground_vehicle_factory');
        r.item('kubejs:mv_vehicle_frame', 1);
        r.item('superbwarfare:wheel', 4);
        r.item('kubejs:mv_engine', 1);
        r.item('gtceu:copper_single_cable', 40);
        r.item('kubejs:mv_cannon_barrel', 1);
        r.item('kubejs:mv_weapons_system', 1);
        r.tag('#gtceu:circuits/mv', 10);
        r.circuit(7);
        r.research('veh_humvee_mk19');
        r.EUt(450).duration(500);
        event.custom(r.build());
    } catch (e) { console.warn('[WF] skipped vehicle recipe #12 (mcsp:humvee_mk19 @ light_ground_vehicle_factory): ' + e); }

    // tier=mv, f=1.25 → cable cap64(32*1.25)=40, tag cap64(8*1.25)=10, EUt=450, duration=500
    try {
        var r = WFVehicles.recipe('kubejs:veh_13', 'mcsp:humvee_sand', 'light_ground_vehicle_factory');
        r.item('kubejs:mv_vehicle_frame', 1);
        r.item('superbwarfare:wheel', 4);
        r.item('kubejs:mv_engine', 1);
        r.item('gtceu:copper_single_cable', 40);
        r.item('kubejs:mv_cannon_barrel', 1);
        r.tag('#gtceu:circuits/mv', 10);
        r.circuit(8);
        r.research('veh_humvee_mg');
        r.EUt(450).duration(500);
        event.custom(r.build());
    } catch (e) { console.warn('[WF] skipped vehicle recipe #13 (mcsp:humvee_sand @ light_ground_vehicle_factory): ' + e); }

    // tier=mv, f=1.25 → cable cap64(32*1.25)=40, EUt=450, duration=Math.round(6000*1.25)=7500
    try {
        var r = WFVehicles.recipe('kubejs:veh_14', 'superbwarfare:a_10a', 'light_plane_assembler');
        r.item('kubejs:hv_air_frame', 1);
        r.item('superbwarfare:wheel', 3);
        r.item('kubejs:hv_engine', 1);
        r.item('gtceu:gold_single_cable', 40);
        r.item('kubejs:hv_wing', 2);
        r.item('kubejs:hv_weapons_system', 1);
        r.item('kubejs:hv_cockpit', 1);
        r.circuit(1);
        r.research('air_a_10');
        r.EUt(450).duration(7500);
        event.custom(r.build());
    } catch (e) { console.warn('[WF] skipped vehicle recipe #14 (superbwarfare:a_10a @ light_plane_assembler): ' + e); }

    // AC-130U Spooky II — EV gunship (Hercules airframe + side-firing cannons), research veh air_spooky.
    // tier=ev, f=1.8 → cable cap64(32*1.8)=58, EUt=7200, duration=Math.round(6000*1.8)=10800
    try {
        var r = WFVehicles.recipe('kubejs:veh_15', 'ashvehicle:ac130u', 'heavy_plane_assembler');
        r.item('kubejs:ev_air_frame', 2);
        r.item('superbwarfare:wheel', 5);
        r.item('kubejs:ev_engine', 1);
        r.item('gtceu:aluminium_single_cable', 58);
        r.item('kubejs:ev_wing', 2);
        r.item('kubejs:ev_cannon_barrel', 2);
        r.item('kubejs:ev_cockpit', 1);
        r.item('kubejs:ev_rotor', 4);
        r.circuit(11);
        r.research('air_spooky');
        r.EUt(7200).duration(10800);
        event.custom(r.build());
    } catch (e) { console.warn('[WF] skipped vehicle recipe #15 (ashvehicle:ac130u @ heavy_plane_assembler): ' + e); }

    // C-130 Hercules — EV heavy transport, the EV step of the fixed-wing line (research air_hercules).
    // tier=ev, f=1.8 → cable cap64(32*1.8)=58, EUt=7200, duration=10800
    try {
        var r = WFVehicles.recipe('kubejs:veh_16', 'ashvehicle:c130', 'heavy_plane_assembler');
        r.item('kubejs:ev_air_frame', 2);
        r.item('superbwarfare:wheel', 5);
        r.item('kubejs:ev_engine', 1);
        r.item('gtceu:aluminium_single_cable', 58);
        r.item('kubejs:ev_wing', 2);
        r.item('kubejs:ev_cockpit', 1);
        r.item('kubejs:ev_rotor', 4);
        r.circuit(12);
        r.research('air_hercules');
        r.EUt(7200).duration(10800);
        event.custom(r.build());
    } catch (e) { console.warn('[WF] skipped vehicle recipe #16 (ashvehicle:c130 @ heavy_plane_assembler): ' + e); }

    //hv tank
    // DISABLED (ungated, tier TBD): { entity: 'superbwarfare:t_90a',          factory: 'heavy_vehicle_depot', items: [['kubejs:hv_vehicle_frame', 1], ['kubejs:hv_track', 2], ['kubejs:hv_engine', 1], ['gtceu:gold_single_cable', 32], ['kubejs:hv_cannon_barrel', 1]], tags: [['#gtceu:circuits/hv', 16]],circuit: 1, eut: 450*4, duration: 6000 },

    // tier=ev, f=1.8 → cable cap64(32*1.8)=58, tag cap64(16*1.8)=29, EUt=7200, duration=Math.round(6000*1.8)=10800
    try {
        var r = WFVehicles.recipe('kubejs:veh_17', 'superbwarfare:ztz_99a', 'heavy_vehicle_depot');
        r.item('kubejs:ev_vehicle_frame', 1);
        r.item('kubejs:ev_track', 2);
        r.item('kubejs:ev_engine', 1);
        r.item('gtceu:aluminium_single_cable', 58);
        r.item('kubejs:ev_cannon_barrel', 1);
        r.tag('#gtceu:circuits/ev', 29);
        r.circuit(2);
        r.research('veh_tank');
        r.EUt(7200).duration(10800);
        event.custom(r.build());
    } catch (e) { console.warn('[WF] skipped vehicle recipe #17 (superbwarfare:ztz_99a @ heavy_vehicle_depot): ' + e); }

    // DISABLED (ungated, tier TBD): { entity: 'ashvehicle:tos',          factory: 'heavy_vehicle_depot', items: [['kubejs:hv_vehicle_frame', 1], ['kubejs:hv_track', 2], ['kubejs:hv_engine', 1], ['gtceu:gold_single_cable', 32], ['kubejs:hv_weapons_system', 1]], tags: [['#gtceu:circuits/hv', 16]],circuit: 3, eut: 450*4, duration: 6000 },

    // PLZ-05 SPG — EV self-propelled artillery, the third path off the Bradley (research veh_plz).
    // tier=ev, f=1.8 → cable cap64(32*1.8)=58, tag cap64(16*1.8)=29, EUt=7200, duration=10800
    try {
        var r = WFVehicles.recipe('kubejs:veh_18', 'superbwarfare:plz_05', 'heavy_vehicle_depot');
        r.item('kubejs:ev_vehicle_frame', 1);
        r.item('kubejs:ev_track', 2);
        r.item('kubejs:ev_engine', 1);
        r.item('gtceu:aluminium_single_cable', 58);
        r.item('kubejs:ev_weapons_system', 1);
        r.item('kubejs:ev_cannon_barrel', 1);
        r.tag('#gtceu:circuits/ev', 29);
        r.circuit(4);
        r.research('veh_plz');
        r.EUt(7200).duration(10800);
        event.custom(r.build());
    } catch (e) { console.warn('[WF] skipped vehicle recipe #18 (superbwarfare:plz_05 @ heavy_vehicle_depot): ' + e); }

    // Prism Tank — IV energy MBT extending the ZTZ-99A line (energy weapon => weapons_system, no cannon barrel).
    // tier=iv, f=2.2 → cable cap64(32*2.2)=64, tag cap64(16*2.2)=35, EUt=28800, duration=Math.round(6000*2.2)=13200
    try {
        var r = WFVehicles.recipe('kubejs:veh_19', 'superbwarfare:prism_tank', 'heavy_vehicle_depot');
        r.item('kubejs:iv_vehicle_frame', 1);
        r.item('kubejs:iv_track', 2);
        r.item('kubejs:iv_engine', 1);
        r.item('gtceu:platinum_single_cable', 64);
        r.item('kubejs:iv_weapons_system', 1);
        r.tag('#gtceu:circuits/iv', 35);
        r.circuit(12);
        r.research('veh_prism');
        r.EUt(28800).duration(13200);
        event.custom(r.build());
    } catch (e) { console.warn('[WF] skipped vehicle recipe #19 (superbwarfare:prism_tank @ heavy_vehicle_depot): ' + e); }

    // DISABLED (ungated, tier TBD): { entity: 'mcsp:zbd04a_sand',          factory: 'heavy_vehicle_depot', items: [['kubejs:hv_vehicle_frame', 1], ['kubejs:hv_track', 2], ['kubejs:hv_engine', 1], ['gtceu:gold_single_cable', 32], ['kubejs:hv_cannon_barrel', 1]], tags: [['#gtceu:circuits/hv', 16]],circuit: 5, eut: 450*4, duration: 6000 },
    // DISABLED (ungated, tier TBD): { entity: 'mcsp:bmd_4',          factory: 'heavy_vehicle_depot', items: [['kubejs:hv_vehicle_frame', 1], ['kubejs:hv_track', 2], ['kubejs:hv_engine', 1], ['gtceu:gold_single_cable', 32], ['kubejs:hv_cannon_barrel', 1]], tags: [['#gtceu:circuits/hv', 16]],circuit: 6, eut: 450*4, duration: 6000 },
    // DISABLED (ungated, tier TBD): { entity: 'mcsp:sprut',          factory: 'heavy_vehicle_depot', items: [['kubejs:hv_vehicle_frame', 1], ['kubejs:hv_track', 2], ['kubejs:hv_engine', 1], ['gtceu:gold_single_cable', 32], ['kubejs:hv_cannon_barrel', 1]], tags: [['#gtceu:circuits/hv', 16]],circuit: 7, eut: 450*4, duration: 6000 },
    // DISABLED (ungated, tier TBD): { entity: 'ashvehicle:pa_pantsir',          factory: 'heavy_vehicle_depot', items: [['kubejs:hv_vehicle_frame', 1], ['superbwarfare:wheel', 8], ['kubejs:hv_engine', 1], ['gtceu:gold_single_cable', 32], ['kubejs:hv_weapons_system', 1]], tags: [['#gtceu:circuits/hv', 16]],circuit: 8, eut: 450*4, duration: 6000 },
    // DISABLED (ungated, tier TBD): { entity: 'ashvehicle:pa_pantsir',          factory: 'heavy_vehicle_depot', items: [['kubejs:hv_vehicle_frame', 1], ['superbwarfare:wheel', 4], ['kubejs:hv_engine', 1], ['gtceu:gold_single_cable', 32], ['kubejs:hv_cannon_barrel', 1]], tags: [['#gtceu:circuits/hv', 16]],circuit: 9, eut: 450*4, duration: 6000 },

    // B-2 Spirit — IV flying-wing stealth bomber, the apex of the fixed-wing line (research air_b2). Uses IV
    // parts where they exist; air_frame caps at EV (there is no iv_air_frame), so it keeps ev_air_frame.
    // tier=iv (highest kubejs part = iv_engine/iv_wing/iv_weapons_system/iv_cockpit), f=2.2
    // → cable cap64(32*2.2)=64, EUt=28800, duration=Math.round(6000*2.2)=13200
    try {
        var r = WFVehicles.recipe('kubejs:veh_20', 'ashvehicle:b-2', 'heavy_plane_assembler');
        r.item('kubejs:ev_air_frame', 2);
        r.item('superbwarfare:wheel', 3);
        r.item('kubejs:iv_engine', 1);
        r.item('gtceu:platinum_single_cable', 64);
        r.item('kubejs:iv_wing', 2);
        r.item('kubejs:iv_weapons_system', 2);
        r.item('kubejs:iv_cockpit', 1);
        r.circuit(1);
        r.research('air_b2');
        r.EUt(28800).duration(13200);
        event.custom(r.build());
    } catch (e) { console.warn('[WF] skipped vehicle recipe #20 (ashvehicle:b-2 @ heavy_plane_assembler): ' + e); }
});
