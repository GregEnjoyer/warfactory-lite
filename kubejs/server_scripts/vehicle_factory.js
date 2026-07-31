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
    // items/tags/fluids = inputs ([id,count] / [tag,count] / [id,mB]); circuit = optional selector; eut/duration
    const VEHICLES = [
        // --- Light Ground Vehicle Factory --
        // mv_truck — component-built truck (LV frame + engine from components.js), MV tier
        { entity: 'superbwarfare:truck', factory: 'light_ground_vehicle_factory', items: [['kubejs:lv_vehicle_frame', 1], ['superbwarfare:wheel', 4], ['kubejs:lv_engine', 1], ['gtceu:tin_single_cable', 32]], tags: [['#gtceu:circuits/lv', 4]], circuit: 1, eut: 70, duration: 200, research: 'veh_truck' },
        { entity: 'superbwarfare:sodayo_pick_up', factory: 'light_ground_vehicle_factory', items: [['kubejs:lv_vehicle_frame', 1], ['superbwarfare:wheel', 4], ['kubejs:lv_engine', 1], ['gtceu:tin_single_cable', 32]], tags: [['#gtceu:circuits/lv', 4]], circuit: 2, eut: 70, duration: 200, research: 'veh_sodayo' },
        // DISABLED (not in progression): { entity: 'mcsp:ural_tricolor', factory: 'light_ground_vehicle_factory', items: [['kubejs:lv_vehicle_frame', 1], ['superbwarfare:wheel', 4], ['kubejs:lv_engine', 1], ['gtceu:tin_single_cable', 32]], tags: [['#gtceu:circuits/lv', 4]], circuit: 3, eut: 70, duration: 200, research: 'veh_logistics' },
        { entity: 'mcsp:ural_green', factory: 'light_ground_vehicle_factory', items: [['kubejs:lv_vehicle_frame', 1], ['superbwarfare:wheel', 4], ['kubejs:lv_engine', 1], ['gtceu:tin_single_cable', 32]], tags: [['#gtceu:circuits/lv', 4]], circuit: 4, eut: 70, duration: 200, research: 'veh_ural' },
        { entity: 'superbwarfare:sodayo_pick_up_hmg', factory: 'light_ground_vehicle_factory', items: [['kubejs:mv_vehicle_frame', 1], ['superbwarfare:wheel', 4], ['kubejs:mv_engine', 1], ['gtceu:copper_single_cable', 32], ['kubejs:mv_cannon_barrel', 1]], tags: [['#gtceu:circuits/mv', 8]], circuit: 5, eut: 120, duration: 400, research: 'veh_sodayo_hmg' },
        { entity: 'superbwarfare:sodayo_pick_up_rocket', factory: 'light_ground_vehicle_factory', items: [['kubejs:mv_vehicle_frame', 1], ['superbwarfare:wheel', 4], ['kubejs:mv_engine', 1], ['gtceu:copper_single_cable', 32], ['kubejs:mv_weapons_system', 1]], tags: [['#gtceu:circuits/mv', 8]], circuit: 9, eut: 120, duration: 400, research: 'veh_sodayo_mlrs' },
        // DISABLED (not in progression): { entity: 'superbwarfare:sodayo_pick_up_tow', factory: 'light_ground_vehicle_factory', items: [['kubejs:mv_vehicle_frame', 1], ['superbwarfare:wheel', 4], ['kubejs:mv_engine', 1], ['gtceu:copper_single_cable', 32], ['superbwarfare:tow_deployer', 1]], tags: [['#gtceu:circuits/mv', 8]], circuit: 6, eut: 120, duration: 400, research: 'veh_armed_trucks' },
        // Light Plane assembler
        { entity: 'superbwarfare:ju_87',          factory: 'light_plane_assembler', items: [['kubejs:lv_air_frame', 1], ['superbwarfare:wheel', 3], ['kubejs:lv_engine', 1], ['gtceu:tin_single_cable', 32], ['kubejs:lv_cockpit', 1], ['kubejs:lv_weapons_system', 1], ['kubejs:lv_wing', 1]],circuit: 1, eut: 70, duration: 200 },

        // DISABLED (ungated, tier TBD): { entity: 'superbwarfare:m_1a_2',          factory: 'heavy_vehicle_depot', items: [['kubejs:mv_vehicle_frame', 1], ['kubejs:mv_track', 2], ['kubejs:mv_engine', 1], ['gtceu:copper_single_cable', 32], ['kubejs:mv_cannon_barrel', 1]], tags: [['#gtceu:circuits/mv', 16]],circuit: 1, eut: 450, duration: 6000 },
        { entity: 'superbwarfare:lav_150', factory: 'heavy_vehicle_depot', items: [['kubejs:hv_vehicle_frame', 1], ['superbwarfare:wheel', 4], ['kubejs:hv_engine', 1], ['gtceu:gold_single_cable', 32], ['kubejs:hv_cannon_barrel', 1]], tags: [['#gtceu:circuits/hv', 16]], circuit: 2, eut: 450*4, duration: 6000, research: 'veh_lav' },
        { entity: 'superbwarfare:lav_ad', factory: 'heavy_vehicle_depot', items: [['kubejs:hv_vehicle_frame', 1], ['superbwarfare:wheel', 4], ['kubejs:hv_engine', 1], ['gtceu:gold_single_cable', 32], ['kubejs:hv_cannon_barrel', 1], ['kubejs:hv_weapons_system', 1]], tags: [['#gtceu:circuits/hv', 16]], circuit: 3, eut: 450*4, duration: 6000, research: 'veh_lav_ad' },
        // DISABLED (ungated, tier TBD): { entity: 'mcsp:t80u_camo',          factory: 'heavy_vehicle_depot', items: [['kubejs:mv_vehicle_frame', 1], ['kubejs:mv_track', 2], ['kubejs:mv_engine', 1], ['gtceu:copper_single_cable', 32], ['kubejs:mv_cannon_barrel', 1]], tags: [['#gtceu:circuits/mv', 16]],circuit: 4, eut: 450, duration: 6000 },
        // DISABLED (ungated, tier TBD): { entity: 'mcsp:t80v_camo',          factory: 'heavy_vehicle_depot', items: [['kubejs:mv_vehicle_frame', 1], ['kubejs:mv_track', 2], ['kubejs:mv_engine', 1], ['gtceu:copper_single_cable', 32], ['kubejs:mv_cannon_barrel', 1]], tags: [['#gtceu:circuits/mv', 16]],circuit: 5, eut: 450, duration: 6000 },
        { entity: 'superbwarfare:bradley', factory: 'heavy_vehicle_depot', items: [['kubejs:hv_vehicle_frame', 1], ['kubejs:hv_track', 2], ['kubejs:hv_engine', 1], ['gtceu:gold_single_cable', 32], ['kubejs:hv_cannon_barrel', 1], ['kubejs:hv_weapons_system', 2]], tags: [['#gtceu:circuits/hv', 16]], circuit: 11, eut: 450*4, duration: 6000, research: 'veh_bradley' },
        // DISABLED (ungated, tier TBD): { entity: 'superbwarfare:bmp_2',          factory: 'heavy_vehicle_depot', items: [['kubejs:mv_vehicle_frame', 1], ['kubejs:mv_track', 2], ['kubejs:mv_engine', 1], ['gtceu:copper_single_cable', 32], ['kubejs:mv_cannon_barrel', 1], ['kubejs:mv_weapons_system', 1]], tags: [['#gtceu:circuits/mv', 16]],circuit: 7, eut: 450, duration: 6000 },
        // DISABLED (ungated, tier TBD): { entity: 'superbwarfare:lav_25',          factory: 'heavy_vehicle_depot', items: [['kubejs:mv_vehicle_frame', 1], ['superbwarfare:wheel', 8], ['kubejs:mv_engine', 1], ['gtceu:copper_single_cable', 32], ['kubejs:mv_cannon_barrel', 1], ['kubejs:mv_weapons_system', 1]], tags: [['#gtceu:circuits/mv', 16]],circuit: 8, eut: 450, duration: 6000 },
        { entity: 'mcsp:humvee_mk19', factory: 'light_ground_vehicle_factory', items: [['kubejs:mv_vehicle_frame', 1], ['superbwarfare:wheel', 4], ['kubejs:mv_engine', 1], ['gtceu:copper_single_cable', 32], ['kubejs:mv_cannon_barrel', 1], ['kubejs:mv_weapons_system', 1]], tags: [['#gtceu:circuits/mv', 8]], circuit: 7, eut: 120, duration: 400, research: 'veh_humvee_mk19' },
        { entity: 'mcsp:humvee_sand', factory: 'light_ground_vehicle_factory', items: [['kubejs:mv_vehicle_frame', 1], ['superbwarfare:wheel', 4], ['kubejs:mv_engine', 1], ['gtceu:copper_single_cable', 32], ['kubejs:mv_cannon_barrel', 1]], tags: [['#gtceu:circuits/mv', 8]], circuit: 8, eut: 120, duration: 400, research: 'veh_humvee_mg' },
        { entity: 'superbwarfare:a_10a',          factory: 'heavy_plane_assembler', items: [['kubejs:mv_air_frame', 1], ['superbwarfare:wheel', 3], ['kubejs:mv_engine', 1], ['gtceu:copper_single_cable', 32], ['kubejs:mv_wing', 2], ['kubejs:mv_weapons_system', 1],['kubejs:mv_cockpit', 1]],circuit: 1, eut: 450, duration: 6000 },
        { entity: 'ashvehicle:f-4',          factory: 'heavy_plane_assembler', items: [['kubejs:mv_air_frame', 1], ['superbwarfare:wheel', 3], ['kubejs:mv_engine', 1], ['gtceu:copper_single_cable', 32], ['kubejs:mv_wing', 2], ['kubejs:mv_weapons_system', 1],['kubejs:mv_cockpit', 1]],circuit: 2, eut: 450, duration: 6000 },
        { entity: 'ashvehicle:f14',          factory: 'heavy_plane_assembler', items: [['kubejs:mv_air_frame', 1], ['superbwarfare:wheel', 3], ['kubejs:mv_engine', 1], ['gtceu:copper_single_cable', 32], ['kubejs:mv_wing', 2], ['kubejs:mv_weapons_system', 1],['kubejs:mv_cockpit', 1]],circuit: 3, eut: 450, duration: 6000 },
        { entity: 'ashvehicle:f_15',          factory: 'heavy_plane_assembler', items: [['kubejs:mv_air_frame', 1], ['superbwarfare:wheel', 3], ['kubejs:mv_engine', 1], ['gtceu:copper_single_cable', 32], ['kubejs:mv_wing', 2], ['kubejs:mv_weapons_system', 1],['kubejs:mv_cockpit', 1]],circuit: 4, eut: 450, duration: 6000 },
        { entity: 'ashvehicle:f_16',          factory: 'heavy_plane_assembler', items: [['kubejs:mv_air_frame', 1], ['superbwarfare:wheel', 3], ['kubejs:mv_engine', 1], ['gtceu:copper_single_cable', 32], ['kubejs:mv_wing', 2], ['kubejs:mv_weapons_system', 1],['kubejs:mv_cockpit', 1]],circuit: 5, eut: 450, duration: 6000 },
        { entity: 'ashvehicle:f-18',          factory: 'heavy_plane_assembler', items: [['kubejs:mv_air_frame', 1], ['superbwarfare:wheel', 3], ['kubejs:mv_engine', 1], ['gtceu:copper_single_cable', 32], ['kubejs:mv_wing', 2], ['kubejs:mv_weapons_system', 1],['kubejs:mv_cockpit', 1]],circuit: 6, eut: 450, duration: 6000 },
        { entity: 'ashvehicle:su-25',          factory: 'heavy_plane_assembler', items: [['kubejs:mv_air_frame', 1], ['superbwarfare:wheel', 3], ['kubejs:mv_engine', 1], ['gtceu:copper_single_cable', 32], ['kubejs:mv_wing', 2], ['kubejs:mv_weapons_system', 1],['kubejs:mv_cockpit', 1]],circuit: 7, eut: 450, duration: 6000 },
        { entity: 'ashvehicle:su-27',          factory: 'heavy_plane_assembler', items: [['kubejs:mv_air_frame', 1], ['superbwarfare:wheel', 3], ['kubejs:mv_engine', 1], ['gtceu:copper_single_cable', 32], ['kubejs:mv_wing', 2], ['kubejs:mv_weapons_system', 1],['kubejs:mv_cockpit', 1]],circuit: 8, eut: 450, duration: 6000 },
        { entity: 'ashvehicle:su-33',          factory: 'heavy_plane_assembler', items: [['kubejs:mv_air_frame', 1], ['superbwarfare:wheel', 3], ['kubejs:mv_engine', 1], ['gtceu:copper_single_cable', 32], ['kubejs:mv_wing', 2], ['kubejs:mv_weapons_system', 1],['kubejs:mv_cockpit', 1]],circuit: 9, eut: 450, duration: 6000 },
        { entity: 'ashvehicle:mig_29',          factory: 'heavy_plane_assembler', items: [['kubejs:mv_air_frame', 1], ['superbwarfare:wheel', 3], ['kubejs:mv_engine', 1], ['gtceu:copper_single_cable', 32], ['kubejs:mv_wing', 2], ['kubejs:mv_weapons_system', 1],['kubejs:mv_cockpit', 1]],circuit: 10, eut: 450, duration: 6000 },
        { entity: 'ashvehicle:ac130u',          factory: 'heavy_plane_assembler', items: [['kubejs:mv_air_frame', 2], ['superbwarfare:wheel', 5], ['kubejs:mv_engine', 1], ['gtceu:copper_single_cable', 32], ['kubejs:mv_wing', 2], ['kubejs:mv_cannon_barrel', 2],['kubejs:mv_cockpit', 1],['kubejs:mv_rotor', 4]],circuit: 11, eut: 450, duration: 6000 },
        { entity: 'ashvehicle:c130',          factory: 'heavy_plane_assembler', items: [['kubejs:mv_air_frame', 2], ['superbwarfare:wheel', 5], ['kubejs:mv_engine', 1], ['gtceu:copper_single_cable', 32], ['kubejs:mv_wing', 2],['kubejs:mv_cockpit', 1],['kubejs:mv_rotor', 4]],circuit: 12, eut: 450, duration: 6000 },
        { entity: 'ashvehicle:b52',          factory: 'heavy_plane_assembler', items: [['kubejs:mv_air_frame', 3], ['superbwarfare:wheel', 6], ['kubejs:mv_engine', 1], ['gtceu:copper_single_cable', 32], ['kubejs:mv_wing', 2],['kubejs:mv_cockpit', 1],['kubejs:mv_weapons_system', 1]],circuit: 13, eut: 450, duration: 6000 },
        { entity: 'ashvehicle:f-117',          factory: 'heavy_plane_assembler', items: [['kubejs:mv_air_frame', 1], ['superbwarfare:wheel', 3], ['kubejs:mv_engine', 1], ['gtceu:copper_single_cable', 32], ['kubejs:mv_wing', 2],['kubejs:mv_cockpit', 1],['kubejs:mv_weapons_system', 1]],circuit: 13, eut: 450, duration: 6000 },
        //hv tank
        // DISABLED (ungated, tier TBD): { entity: 'superbwarfare:t_90a',          factory: 'heavy_vehicle_depot', items: [['kubejs:hv_vehicle_frame', 1], ['kubejs:hv_track', 2], ['kubejs:hv_engine', 1], ['gtceu:gold_single_cable', 32], ['kubejs:hv_cannon_barrel', 1]], tags: [['#gtceu:circuits/hv', 16]],circuit: 1, eut: 450*4, duration: 6000 },
        { entity: 'superbwarfare:ztz_99a', factory: 'heavy_vehicle_depot', items: [['kubejs:ev_vehicle_frame', 1], ['kubejs:ev_track', 2], ['kubejs:ev_engine', 1], ['gtceu:aluminium_single_cable', 32], ['kubejs:ev_cannon_barrel', 1]], tags: [['#gtceu:circuits/ev', 16]], circuit: 2, eut: 450*4*4, duration: 6000, research: 'veh_tank' },
        // DISABLED (ungated, tier TBD): { entity: 'ashvehicle:tos',          factory: 'heavy_vehicle_depot', items: [['kubejs:hv_vehicle_frame', 1], ['kubejs:hv_track', 2], ['kubejs:hv_engine', 1], ['gtceu:gold_single_cable', 32], ['kubejs:hv_weapons_system', 1]], tags: [['#gtceu:circuits/hv', 16]],circuit: 3, eut: 450*4, duration: 6000 },
        // PLZ-05 SPG — EV self-propelled artillery, the third path off the Bradley (research veh_plz).
        { entity: 'superbwarfare:plz_05', factory: 'heavy_vehicle_depot', items: [['kubejs:ev_vehicle_frame', 1], ['kubejs:ev_track', 2], ['kubejs:ev_engine', 1], ['gtceu:aluminium_single_cable', 32], ['kubejs:ev_weapons_system', 1], ['kubejs:ev_cannon_barrel', 1]], tags: [['#gtceu:circuits/ev', 16]], circuit: 4, eut: 450*4*4, duration: 6000, research: 'veh_plz' },
        // Prism Tank — IV energy MBT extending the ZTZ-99A line (energy weapon => weapons_system, no cannon barrel).
        { entity: 'superbwarfare:prism_tank', factory: 'heavy_vehicle_depot', items: [['kubejs:iv_vehicle_frame', 1], ['kubejs:iv_track', 2], ['kubejs:iv_engine', 1], ['gtceu:platinum_single_cable', 32], ['kubejs:iv_weapons_system', 1]], tags: [['#gtceu:circuits/iv', 16]], circuit: 12, eut: 450*4*4*4, duration: 6000, research: 'veh_prism' },
        // DISABLED (ungated, tier TBD): { entity: 'mcsp:zbd04a_sand',          factory: 'heavy_vehicle_depot', items: [['kubejs:hv_vehicle_frame', 1], ['kubejs:hv_track', 2], ['kubejs:hv_engine', 1], ['gtceu:gold_single_cable', 32], ['kubejs:hv_cannon_barrel', 1]], tags: [['#gtceu:circuits/hv', 16]],circuit: 5, eut: 450*4, duration: 6000 },
        // DISABLED (ungated, tier TBD): { entity: 'mcsp:bmd_4',          factory: 'heavy_vehicle_depot', items: [['kubejs:hv_vehicle_frame', 1], ['kubejs:hv_track', 2], ['kubejs:hv_engine', 1], ['gtceu:gold_single_cable', 32], ['kubejs:hv_cannon_barrel', 1]], tags: [['#gtceu:circuits/hv', 16]],circuit: 6, eut: 450*4, duration: 6000 },
        // DISABLED (ungated, tier TBD): { entity: 'mcsp:sprut',          factory: 'heavy_vehicle_depot', items: [['kubejs:hv_vehicle_frame', 1], ['kubejs:hv_track', 2], ['kubejs:hv_engine', 1], ['gtceu:gold_single_cable', 32], ['kubejs:hv_cannon_barrel', 1]], tags: [['#gtceu:circuits/hv', 16]],circuit: 7, eut: 450*4, duration: 6000 },
        // DISABLED (ungated, tier TBD): { entity: 'ashvehicle:pa_pantsir',          factory: 'heavy_vehicle_depot', items: [['kubejs:hv_vehicle_frame', 1], ['superbwarfare:wheel', 8], ['kubejs:hv_engine', 1], ['gtceu:gold_single_cable', 32], ['kubejs:hv_weapons_system', 1]], tags: [['#gtceu:circuits/hv', 16]],circuit: 8, eut: 450*4, duration: 6000 },
        // DISABLED (ungated, tier TBD): { entity: 'ashvehicle:pa_pantsir',          factory: 'heavy_vehicle_depot', items: [['kubejs:hv_vehicle_frame', 1], ['superbwarfare:wheel', 4], ['kubejs:hv_engine', 1], ['gtceu:gold_single_cable', 32], ['kubejs:hv_cannon_barrel', 1]], tags: [['#gtceu:circuits/hv', 16]],circuit: 9, eut: 450*4, duration: 6000 },
        //hv plane
        { entity: 'ashvehicle:eurofighter',          factory: 'heavy_plane_assembler', items: [['kubejs:hv_air_frame', 1], ['superbwarfare:wheel', 3], ['kubejs:hv_engine', 1], ['gtceu:gold_single_cable', 32], ['kubejs:hv_wing', 2], ['kubejs:hv_weapons_system', 1],['kubejs:hv_cockpit', 1]],circuit: 1, eut: 450*4, duration: 6000 },
        { entity: 'ashvehicle:f_2',          factory: 'heavy_plane_assembler', items: [['kubejs:hv_air_frame', 1], ['superbwarfare:wheel', 3], ['kubejs:hv_engine', 1], ['gtceu:gold_single_cable', 32], ['kubejs:hv_wing', 2], ['kubejs:hv_weapons_system', 1],['kubejs:hv_cockpit', 1]],circuit: 2, eut: 450*4, duration: 6000 },
        { entity: 'ashvehicle:f-22',          factory: 'heavy_plane_assembler', items: [['kubejs:hv_air_frame', 1], ['superbwarfare:wheel', 3], ['kubejs:hv_engine', 1], ['gtceu:gold_single_cable', 32], ['kubejs:hv_wing', 2], ['kubejs:hv_weapons_system', 1],['kubejs:hv_cockpit', 1]],circuit: 3, eut: 450*4, duration: 6000 },
        { entity: 'ashvehicle:f-22',          factory: 'heavy_plane_assembler', items: [['kubejs:hv_air_frame', 1], ['superbwarfare:wheel', 3], ['kubejs:hv_engine', 1], ['gtceu:gold_single_cable', 32], ['kubejs:hv_wing', 2], ['kubejs:hv_weapons_system', 1],['kubejs:hv_cockpit', 1]],circuit: 4, eut: 450*4, duration: 6000 },
        { entity: 'ashvehicle:f-22',          factory: 'heavy_plane_assembler', items: [['kubejs:hv_air_frame', 1], ['superbwarfare:wheel', 3], ['kubejs:hv_engine', 1], ['gtceu:gold_single_cable', 32], ['kubejs:hv_wing', 2], ['kubejs:hv_weapons_system', 1],['kubejs:hv_cockpit', 1]],circuit: 5, eut: 450*4, duration: 6000 },
        { entity: 'ashvehicle:su-34',          factory: 'heavy_plane_assembler', items: [['kubejs:hv_air_frame', 1], ['superbwarfare:wheel', 3], ['kubejs:hv_engine', 1], ['gtceu:gold_single_cable', 32], ['kubejs:hv_wing', 2], ['kubejs:hv_weapons_system', 1],['kubejs:hv_cockpit', 1]],circuit: 6, eut: 450*4, duration: 6000 },
        { entity: 'ashvehicle:f-35b',          factory: 'heavy_plane_assembler', items: [['kubejs:hv_air_frame', 1], ['superbwarfare:wheel', 3], ['kubejs:hv_engine', 1], ['gtceu:gold_single_cable', 32], ['kubejs:hv_wing', 2], ['kubejs:hv_weapons_system', 1],['kubejs:hv_cockpit', 1]],circuit: 7, eut: 450*4, duration: 6000 },
        { entity: 'ashvehicle:f-35a',          factory: 'heavy_plane_assembler', items: [['kubejs:hv_air_frame', 1], ['superbwarfare:wheel', 3], ['kubejs:hv_engine', 1], ['gtceu:gold_single_cable', 32], ['kubejs:hv_wing', 2], ['kubejs:hv_weapons_system', 1],['kubejs:hv_cockpit', 1]],circuit: 8, eut: 450*4, duration: 6000 },
        { entity: 'ashvehicle:f-39e',          factory: 'heavy_plane_assembler', items: [['kubejs:hv_air_frame', 1], ['superbwarfare:wheel', 3], ['kubejs:hv_engine', 1], ['gtceu:gold_single_cable', 32], ['kubejs:hv_wing', 2], ['kubejs:hv_weapons_system', 1],['kubejs:hv_cockpit', 1]],circuit: 9, eut: 450*4, duration: 6000 },
        { entity: 'ashvehicle:j-20',          factory: 'heavy_plane_assembler', items: [['kubejs:hv_air_frame', 1], ['superbwarfare:wheel', 3], ['kubejs:hv_engine', 1], ['gtceu:gold_single_cable', 32], ['kubejs:hv_wing', 2], ['kubejs:hv_weapons_system', 1],['kubejs:hv_cockpit', 1]],circuit: 10, eut: 450*4, duration: 6000 },
        { entity: 'ashvehicle:su-57',          factory: 'heavy_plane_assembler', items: [['kubejs:hv_air_frame', 1], ['superbwarfare:wheel', 3], ['kubejs:hv_engine', 1], ['gtceu:gold_single_cable', 32], ['kubejs:hv_wing', 2], ['kubejs:hv_weapons_system', 1],['kubejs:hv_cockpit', 1]],circuit: 11, eut: 450*4, duration: 6000 },
        //ev plane
        { entity: 'ashvehicle:b-2',          factory: 'heavy_plane_assembler', items: [['kubejs:ev_air_frame', 2], ['superbwarfare:wheel', 3], ['kubejs:ev_engine', 1], ['gtceu:aluminium_single_cable', 32], ['kubejs:ev_wing', 2], ['kubejs:ev_weapons_system', 2],['kubejs:ev_cockpit', 1]],circuit: 1, eut: 450*4*4, duration: 6000 },
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

    VEHICLES.forEach((v, i) => {
        try {
            // NB: var (not const/let) — Rhino throws "redeclaration of var r" on later
            // iterations once an earlier iteration's initializer throws (e.g. a removed halo
            // entity), which silently killed every recipe after the first failure.
            var r = WFVehicles.recipe('kubejs:veh_' + i, v.entity, v.factory);
            (v.items || []).forEach(it => r.item(it[0], it[1]));
            (v.tags || []).forEach(tg => r.tag(tg[0], tg[1]));
            (v.fluids || []).forEach(fl => r.fluid(fl[0], fl[1]));
            if (v.circuit !== undefined && v.circuit !== null) r.circuit(v.circuit);
            if (v.research) r.research(v.research);   // gate the build behind a research node (WFVehicleBindings)
            r.EUt(v.eut).duration(v.duration);
            event.custom(r.build());
        } catch (e) {
            console.warn('[WF] skipped vehicle recipe #' + i + ' (' + v.entity + ' @ ' + v.factory + '): ' + e);
        }
    });
});

