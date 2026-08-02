// Vehicle-factory recipes, authored through the mod's WFVehicles KubeJS binding.
//
// Each of the five vehicle-assembly multiblocks has its OWN recipe type — wfcore:light_ground_vehicle_factory,
// tank_assembly, light_plane_assembler, heavy_plane_assembler, heavy_vehicle_depot — and completes by
// outputting a wfcore:packaged_vehicle that spawns the entity. GTCEu's generic KubeJS builder can't target
// these on this pack's Rhino (ambiguous item overloads + mangled entity NBT) and would silently write to a
// dead gtceu:vehicle_factory type, so recipes are built via WFVehicles.recipe(id, entity[, factory]) and fed
// to event.custom(...). Up to 9 item inputs per recipe (a .circuit() selector uses one slot).
ServerEvents.recipes(event => {
    // lav_150 is no longer baked into the mod (removed from addDefaultRecipes); harmless no-op safety net in
    // case an older jar that still bakes it is loaded.
    event.remove({ id: /lav_150/ })

    // entity  = vehicle to spawn (validated by the binding; unknown/removed entities are skipped below)
    // factory = which multiblock's list: light_ground_vehicle_factory | tank_assembly | light_plane_assembler
    //           | heavy_plane_assembler | heavy_vehicle_depot
    // items/tags/fluids = inputs ([id,count] / [tag,count] / [id,mB]); circuit = optional selector; duration
    // NB: EU/t is NOT authored per entry — it is derived from the vehicle's part tier (see EUT_BY_TIER below).
    const VEHICLES = [
        // --- Light Ground Vehicle Factory --
        // mv_truck — component-built truck (LV frame + engine from components.js), MV tier
        { entity: 'superbwarfare:truck', factory: 'light_ground_vehicle_factory', items: [['kubejs:lv_vehicle_frame', 1], ['superbwarfare:wheel', 4], ['kubejs:lv_engine', 1], ['gtceu:tin_single_cable', 32]], tags: [['#gtceu:circuits/lv', 4]], circuit: 1, duration: 200, research: 'veh_truck' },
        { entity: 'superbwarfare:sodayo_pick_up', factory: 'light_ground_vehicle_factory', items: [['kubejs:lv_vehicle_frame', 1], ['superbwarfare:wheel', 4], ['kubejs:lv_engine', 1], ['gtceu:tin_single_cable', 32]], tags: [['#gtceu:circuits/lv', 4]], circuit: 2, duration: 200, research: 'veh_sodayo' },
        // DISABLED (not in progression): { entity: 'mcsp:ural_tricolor', factory: 'light_ground_vehicle_factory', items: [['kubejs:lv_vehicle_frame', 1], ['superbwarfare:wheel', 4], ['kubejs:lv_engine', 1], ['gtceu:tin_single_cable', 32]], tags: [['#gtceu:circuits/lv', 4]], circuit: 3, eut: 70, duration: 200, research: 'veh_logistics' },
        { entity: 'mcsp:ural_green', factory: 'light_ground_vehicle_factory', items: [['kubejs:lv_vehicle_frame', 1], ['superbwarfare:wheel', 4], ['kubejs:lv_engine', 1], ['gtceu:tin_single_cable', 32]], tags: [['#gtceu:circuits/lv', 4]], circuit: 4, duration: 200, research: 'veh_ural' },
        { entity: 'superbwarfare:sodayo_pick_up_hmg', factory: 'light_ground_vehicle_factory', items: [['kubejs:mv_vehicle_frame', 1], ['superbwarfare:wheel', 4], ['kubejs:mv_engine', 1], ['gtceu:copper_single_cable', 32], ['kubejs:mv_cannon_barrel', 1]], tags: [['#gtceu:circuits/mv', 8]], circuit: 5, duration: 400, research: 'veh_sodayo_hmg' },
        { entity: 'superbwarfare:sodayo_pick_up_rocket', factory: 'light_ground_vehicle_factory', items: [['kubejs:mv_vehicle_frame', 1], ['superbwarfare:wheel', 4], ['kubejs:mv_engine', 1], ['gtceu:copper_single_cable', 32], ['kubejs:mv_weapons_system', 1]], tags: [['#gtceu:circuits/mv', 8]], circuit: 9, duration: 400, research: 'veh_sodayo_mlrs' },
        // DISABLED (not in progression): { entity: 'superbwarfare:sodayo_pick_up_tow', factory: 'light_ground_vehicle_factory', items: [['kubejs:mv_vehicle_frame', 1], ['superbwarfare:wheel', 4], ['kubejs:mv_engine', 1], ['gtceu:copper_single_cable', 32], ['superbwarfare:tow_deployer', 1]], tags: [['#gtceu:circuits/mv', 8]], circuit: 6, eut: 120, duration: 400, research: 'veh_armed_trucks' },
        // Light Plane assembler — Ju-87 (fixed-wing) + AH-6 (rotary): the two MV entry aircraft (Aviation tab).
        { entity: 'superbwarfare:ju_87',          factory: 'light_plane_assembler', items: [['kubejs:lv_air_frame', 1], ['superbwarfare:wheel', 3], ['kubejs:lv_engine', 1], ['gtceu:tin_single_cable', 32], ['kubejs:lv_cockpit', 1], ['kubejs:lv_weapons_system', 1], ['kubejs:lv_wing', 1]],circuit: 1, duration: 200, research: 'air_ju_87' },
        // AH-6 Little Bird — MV rotary entry: a rotor (not a wing) helicopter with a light weapons station.
        { entity: 'superbwarfare:ah_6',           factory: 'light_plane_assembler', items: [['kubejs:mv_air_frame', 1], ['superbwarfare:wheel', 3], ['kubejs:mv_engine', 1], ['gtceu:copper_single_cable', 32], ['kubejs:mv_cockpit', 1], ['kubejs:mv_weapons_system', 1], ['kubejs:mv_rotor', 2]], circuit: 2, duration: 400, research: 'air_ah_6' },
        // MH-60M Black Hawk — HV rotary transport/gunship (ashvehicle entity).
        { entity: 'ashvehicle:mh_60m',            factory: 'heavy_plane_assembler', items: [['kubejs:hv_air_frame', 1], ['superbwarfare:wheel', 3], ['kubejs:hv_engine', 1], ['gtceu:gold_single_cable', 32], ['kubejs:hv_rotor', 2], ['kubejs:hv_weapons_system', 1], ['kubejs:hv_cockpit', 1]], circuit: 20, duration: 6000, research: 'air_mh_60' },
        // Mi-28 Attack Helicopter — EV rotary tank-hunter: rotor + a 30mm cannon barrel + a missile weapons station.
        { entity: 'superbwarfare:mi_28',          factory: 'heavy_plane_assembler', items: [['kubejs:ev_air_frame', 1], ['superbwarfare:wheel', 3], ['kubejs:ev_engine', 1], ['gtceu:aluminium_single_cable', 32], ['kubejs:ev_rotor', 2], ['kubejs:ev_weapons_system', 1], ['kubejs:ev_cannon_barrel', 1], ['kubejs:ev_cockpit', 1]], circuit: 21, duration: 6000, research: 'air_mi_28' },

        // DISABLED (ungated, tier TBD): { entity: 'superbwarfare:m_1a_2',          factory: 'heavy_vehicle_depot', items: [['kubejs:mv_vehicle_frame', 1], ['kubejs:mv_track', 2], ['kubejs:mv_engine', 1], ['gtceu:copper_single_cable', 32], ['kubejs:mv_cannon_barrel', 1]], tags: [['#gtceu:circuits/mv', 16]],circuit: 1, eut: 450, duration: 6000 },
        { entity: 'superbwarfare:lav_150', factory: 'heavy_vehicle_depot', items: [['kubejs:hv_vehicle_frame', 1], ['superbwarfare:wheel', 4], ['kubejs:hv_engine', 1], ['gtceu:gold_single_cable', 32], ['kubejs:hv_cannon_barrel', 1]], tags: [['#gtceu:circuits/hv', 16]], circuit: 2, duration: 6000, research: 'veh_lav' },
        { entity: 'superbwarfare:lav_ad', factory: 'heavy_vehicle_depot', items: [['kubejs:hv_vehicle_frame', 1], ['superbwarfare:wheel', 4], ['kubejs:hv_engine', 1], ['gtceu:gold_single_cable', 32], ['kubejs:hv_cannon_barrel', 1], ['kubejs:hv_weapons_system', 1]], tags: [['#gtceu:circuits/hv', 16]], circuit: 3, duration: 6000, research: 'veh_lav_ad' },
        // DISABLED (ungated, tier TBD): { entity: 'mcsp:t80u_camo',          factory: 'heavy_vehicle_depot', items: [['kubejs:mv_vehicle_frame', 1], ['kubejs:mv_track', 2], ['kubejs:mv_engine', 1], ['gtceu:copper_single_cable', 32], ['kubejs:mv_cannon_barrel', 1]], tags: [['#gtceu:circuits/mv', 16]],circuit: 4, eut: 450, duration: 6000 },
        // DISABLED (ungated, tier TBD): { entity: 'mcsp:t80v_camo',          factory: 'heavy_vehicle_depot', items: [['kubejs:mv_vehicle_frame', 1], ['kubejs:mv_track', 2], ['kubejs:mv_engine', 1], ['gtceu:copper_single_cable', 32], ['kubejs:mv_cannon_barrel', 1]], tags: [['#gtceu:circuits/mv', 16]],circuit: 5, eut: 450, duration: 6000 },
        { entity: 'superbwarfare:bradley', factory: 'heavy_vehicle_depot', items: [['kubejs:hv_vehicle_frame', 1], ['kubejs:hv_track', 2], ['kubejs:hv_engine', 1], ['gtceu:gold_single_cable', 32], ['kubejs:hv_cannon_barrel', 1], ['kubejs:hv_weapons_system', 2]], tags: [['#gtceu:circuits/hv', 16]], circuit: 11, duration: 6000, research: 'veh_bradley' },
        // DISABLED (ungated, tier TBD): { entity: 'superbwarfare:bmp_2',          factory: 'heavy_vehicle_depot', items: [['kubejs:mv_vehicle_frame', 1], ['kubejs:mv_track', 2], ['kubejs:mv_engine', 1], ['gtceu:copper_single_cable', 32], ['kubejs:mv_cannon_barrel', 1], ['kubejs:mv_weapons_system', 1]], tags: [['#gtceu:circuits/mv', 16]],circuit: 7, eut: 450, duration: 6000 },
        // DISABLED (ungated, tier TBD): { entity: 'superbwarfare:lav_25',          factory: 'heavy_vehicle_depot', items: [['kubejs:mv_vehicle_frame', 1], ['superbwarfare:wheel', 8], ['kubejs:mv_engine', 1], ['gtceu:copper_single_cable', 32], ['kubejs:mv_cannon_barrel', 1], ['kubejs:mv_weapons_system', 1]], tags: [['#gtceu:circuits/mv', 16]],circuit: 8, eut: 450, duration: 6000 },
        { entity: 'mcsp:humvee_mk19', factory: 'light_ground_vehicle_factory', items: [['kubejs:mv_vehicle_frame', 1], ['superbwarfare:wheel', 4], ['kubejs:mv_engine', 1], ['gtceu:copper_single_cable', 32], ['kubejs:mv_cannon_barrel', 1], ['kubejs:mv_weapons_system', 1]], tags: [['#gtceu:circuits/mv', 8]], circuit: 7, duration: 400, research: 'veh_humvee_mk19' },
        { entity: 'mcsp:humvee_sand', factory: 'light_ground_vehicle_factory', items: [['kubejs:mv_vehicle_frame', 1], ['superbwarfare:wheel', 4], ['kubejs:mv_engine', 1], ['gtceu:copper_single_cable', 32], ['kubejs:mv_cannon_barrel', 1]], tags: [['#gtceu:circuits/mv', 8]], circuit: 8, duration: 400, research: 'veh_humvee_mg' },
        { entity: 'superbwarfare:a_10a',          factory: 'heavy_plane_assembler', items: [['kubejs:mv_air_frame', 1], ['superbwarfare:wheel', 3], ['kubejs:mv_engine', 1], ['gtceu:copper_single_cable', 32], ['kubejs:mv_wing', 2], ['kubejs:mv_weapons_system', 1],['kubejs:mv_cockpit', 1]],circuit: 1, duration: 6000, research: 'air_a_10' },
        // AC-130U Spooky II — EV gunship (Hercules airframe + side-firing cannons), research veh air_spooky.
        { entity: 'ashvehicle:ac130u',          factory: 'heavy_plane_assembler', items: [['kubejs:ev_air_frame', 2], ['superbwarfare:wheel', 5], ['kubejs:ev_engine', 1], ['gtceu:aluminium_single_cable', 32], ['kubejs:ev_wing', 2], ['kubejs:ev_cannon_barrel', 2],['kubejs:ev_cockpit', 1],['kubejs:ev_rotor', 4]],circuit: 11, duration: 6000, research: 'air_spooky' },
        // C-130 Hercules — EV heavy transport, the EV step of the fixed-wing line (research air_hercules).
        { entity: 'ashvehicle:c130',          factory: 'heavy_plane_assembler', items: [['kubejs:ev_air_frame', 2], ['superbwarfare:wheel', 5], ['kubejs:ev_engine', 1], ['gtceu:aluminium_single_cable', 32], ['kubejs:ev_wing', 2],['kubejs:ev_cockpit', 1],['kubejs:ev_rotor', 4]],circuit: 12, duration: 6000, research: 'air_hercules' },
        //hv tank
        // DISABLED (ungated, tier TBD): { entity: 'superbwarfare:t_90a',          factory: 'heavy_vehicle_depot', items: [['kubejs:hv_vehicle_frame', 1], ['kubejs:hv_track', 2], ['kubejs:hv_engine', 1], ['gtceu:gold_single_cable', 32], ['kubejs:hv_cannon_barrel', 1]], tags: [['#gtceu:circuits/hv', 16]],circuit: 1, eut: 450*4, duration: 6000 },
        { entity: 'superbwarfare:ztz_99a', factory: 'heavy_vehicle_depot', items: [['kubejs:ev_vehicle_frame', 1], ['kubejs:ev_track', 2], ['kubejs:ev_engine', 1], ['gtceu:aluminium_single_cable', 32], ['kubejs:ev_cannon_barrel', 1]], tags: [['#gtceu:circuits/ev', 16]], circuit: 2, duration: 6000, research: 'veh_tank' },
        // DISABLED (ungated, tier TBD): { entity: 'ashvehicle:tos',          factory: 'heavy_vehicle_depot', items: [['kubejs:hv_vehicle_frame', 1], ['kubejs:hv_track', 2], ['kubejs:hv_engine', 1], ['gtceu:gold_single_cable', 32], ['kubejs:hv_weapons_system', 1]], tags: [['#gtceu:circuits/hv', 16]],circuit: 3, eut: 450*4, duration: 6000 },
        // PLZ-05 SPG — EV self-propelled artillery, the third path off the Bradley (research veh_plz).
        { entity: 'superbwarfare:plz_05', factory: 'heavy_vehicle_depot', items: [['kubejs:ev_vehicle_frame', 1], ['kubejs:ev_track', 2], ['kubejs:ev_engine', 1], ['gtceu:aluminium_single_cable', 32], ['kubejs:ev_weapons_system', 1], ['kubejs:ev_cannon_barrel', 1]], tags: [['#gtceu:circuits/ev', 16]], circuit: 4, duration: 6000, research: 'veh_plz' },
        // Prism Tank — IV energy MBT extending the ZTZ-99A line (energy weapon => weapons_system, no cannon barrel).
        { entity: 'superbwarfare:prism_tank', factory: 'heavy_vehicle_depot', items: [['kubejs:iv_vehicle_frame', 1], ['kubejs:iv_track', 2], ['kubejs:iv_engine', 1], ['gtceu:platinum_single_cable', 32], ['kubejs:iv_weapons_system', 1]], tags: [['#gtceu:circuits/iv', 16]], circuit: 12, duration: 6000, research: 'veh_prism' },
        // DISABLED (ungated, tier TBD): { entity: 'mcsp:zbd04a_sand',          factory: 'heavy_vehicle_depot', items: [['kubejs:hv_vehicle_frame', 1], ['kubejs:hv_track', 2], ['kubejs:hv_engine', 1], ['gtceu:gold_single_cable', 32], ['kubejs:hv_cannon_barrel', 1]], tags: [['#gtceu:circuits/hv', 16]],circuit: 5, eut: 450*4, duration: 6000 },
        // DISABLED (ungated, tier TBD): { entity: 'mcsp:bmd_4',          factory: 'heavy_vehicle_depot', items: [['kubejs:hv_vehicle_frame', 1], ['kubejs:hv_track', 2], ['kubejs:hv_engine', 1], ['gtceu:gold_single_cable', 32], ['kubejs:hv_cannon_barrel', 1]], tags: [['#gtceu:circuits/hv', 16]],circuit: 6, eut: 450*4, duration: 6000 },
        // DISABLED (ungated, tier TBD): { entity: 'mcsp:sprut',          factory: 'heavy_vehicle_depot', items: [['kubejs:hv_vehicle_frame', 1], ['kubejs:hv_track', 2], ['kubejs:hv_engine', 1], ['gtceu:gold_single_cable', 32], ['kubejs:hv_cannon_barrel', 1]], tags: [['#gtceu:circuits/hv', 16]],circuit: 7, eut: 450*4, duration: 6000 },
        // DISABLED (ungated, tier TBD): { entity: 'ashvehicle:pa_pantsir',          factory: 'heavy_vehicle_depot', items: [['kubejs:hv_vehicle_frame', 1], ['superbwarfare:wheel', 8], ['kubejs:hv_engine', 1], ['gtceu:gold_single_cable', 32], ['kubejs:hv_weapons_system', 1]], tags: [['#gtceu:circuits/hv', 16]],circuit: 8, eut: 450*4, duration: 6000 },
        // DISABLED (ungated, tier TBD): { entity: 'ashvehicle:pa_pantsir',          factory: 'heavy_vehicle_depot', items: [['kubejs:hv_vehicle_frame', 1], ['superbwarfare:wheel', 4], ['kubejs:hv_engine', 1], ['gtceu:gold_single_cable', 32], ['kubejs:hv_cannon_barrel', 1]], tags: [['#gtceu:circuits/hv', 16]],circuit: 9, eut: 450*4, duration: 6000 },
        // B-2 Spirit — IV flying-wing stealth bomber, the apex of the fixed-wing line (research air_b2). Uses IV
        // parts where they exist; air_frame caps at EV (there is no iv_air_frame), so it keeps ev_air_frame.
        { entity: 'ashvehicle:b-2',          factory: 'heavy_plane_assembler', items: [['kubejs:ev_air_frame', 2], ['superbwarfare:wheel', 3], ['kubejs:iv_engine', 1], ['gtceu:platinum_single_cable', 32], ['kubejs:iv_wing', 2], ['kubejs:iv_weapons_system', 2],['kubejs:iv_cockpit', 1]],circuit: 1, duration: 6000, research: 'air_b2' },
            ]
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

    // ── Cost scaling (mild pass; mirrors the component scaling in vehicles/components.js) ──
    // A vehicle's tier = the highest-tier kubejs part it consumes. Scale the *consumed*
    // circuits, cable, and craft time by that tier's factor (item counts capped at a 64
    // stack). Frame/engine COUNTS stay as authored — their extra cost already rides on the
    // now-pricier component sub-recipes — so a vehicle's total lands at ~factor, not factor².
    // Lower tiers stay relatively cheap; higher tiers grow as infrastructure demands. Keep
    // TIER_COST in sync with components.js.
    const TIER_RANK = { lv: 0, mv: 1, hv: 2, ev: 3, iv: 4 }
    const TIER_COST = { lv: 1.1, mv: 1.25, hv: 1.5, ev: 1.8, iv: 2.2 }
    // EU/t derived from part tier (single source of truth): every vehicle needs an assembler ONE
    // voltage tier above its parts — LV->MV, MV->HV, HV->EV, EV->IV, IV->LuV — i.e. the clean
    // 450×4^(rank-1) series. This replaced the old hand-authored per-entry `eut`, which had drifted
    // (five MV vehicles sat at 120 / plain MV, and the IV b-2 at 7200 / plain IV — both one tier low).
    const EUT_BY_TIER = { lv: 112, mv: 450, hv: 1800, ev: 7200, iv: 28800 }
    const cap64 = n => Math.min(64, Math.max(1, Math.round(n)))
    const tierOf = v => {
        var best = 'lv', rank = -1
        ;(v.items || []).forEach(it => {
            var m = /^kubejs:(lv|mv|hv|ev|iv)_/.exec(it[0])
            if (m && TIER_RANK[m[1]] > rank) { rank = TIER_RANK[m[1]]; best = m[1] }
        })
        return best
    }

    VEHICLES.forEach((v, i) => {
        try {
            // NB: var (not const/let) — Rhino throws "redeclaration of var r" on later
            // iterations once an earlier iteration's initializer throws (e.g. a removed halo
            // entity), which silently killed every recipe after the first failure.
            var t = tierOf(v);
            var f = TIER_COST[t];
            var r = WFVehicles.recipe('kubejs:veh_' + i, v.entity, v.factory);
            // Cable (…_single_cable) is bulk consumed material -> scale it; the other items are
            // single components whose cost rises via their sub-recipe, so keep their counts.
            (v.items || []).forEach(it => r.item(it[0], /_single_cable$/.test(it[0]) ? cap64(it[1] * f) : it[1]));
            (v.tags || []).forEach(tg => r.tag(tg[0], cap64(tg[1] * f)));   // consumed circuit boards
            (v.fluids || []).forEach(fl => r.fluid(fl[0], fl[1]));
            if (v.circuit !== undefined && v.circuit !== null) r.circuit(v.circuit);
            if (v.research) r.research(v.research);   // gate the build behind a research node (WFVehicleBindings)
            r.EUt(EUT_BY_TIER[t]).duration(Math.round(v.duration * f));   // eut by part tier; longer craft -> total EU scales ~f
            event.custom(r.build());
        } catch (e) {
            console.warn('[WF] skipped vehicle recipe #' + i + ' (' + v.entity + ' @ ' + v.factory + '): ' + e);
        }
    });
});

