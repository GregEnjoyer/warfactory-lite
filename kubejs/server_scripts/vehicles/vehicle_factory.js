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
        // --- Light Ground Vehicle Factory ---
        { entity: 'halovecs:m12hmg',              factory: 'light_ground_vehicle_factory', items: [['gtceu:vehicle_metal_block', 2], ['superbwarfare:wheel', 4], ['gtceu:steel_gearbox', 1], ['superbwarfare:light_armament_module', 1]], circuit: 7, eut: 16, duration: 4000 }, // puma (halo — likely removed)
        { entity: 'halovecs:m274',                factory: 'light_ground_vehicle_factory', items: [['gtceu:vehicle_metal_block', 1], ['superbwarfare:wheel', 4], ['gtceu:steel_gearbox', 1], ['superbwarfare:light_armament_module', 1]], circuit: 7, eut: 16, duration: 4000 }, // halo_truck (halo)
        { entity: 'superbwarfare:mle_1934',       factory: 'light_ground_vehicle_factory', items: [['gtceu:vehicle_metal_block', 4], ['gtceu:steel_gearbox', 1], ['kubejs:heavy_barrel_steel', 2]], circuit: 4, eut: 16, duration: 4000 }, // uglycannon
        { entity: 'superbwarfare:mk_42',          factory: 'light_ground_vehicle_factory', items: [['gtceu:vehicle_metal_block', 4], ['gtceu:steel_gearbox', 1], ['kubejs:heavy_barrel_steel', 3]], circuit: 5, eut: 16, duration: 4000 }, // 5/54
        { entity: 'superbwarfare:truck',          factory: 'light_ground_vehicle_factory', items: [['gtceu:steel_block', 1], ['superbwarfare:wheel', 4], ['gtceu:steel_gearbox', 1]], circuit: 6, eut: 16, duration: 4000 }, // truck (LV steel)
        { entity: 'superbwarfare:halovecsm12tra', factory: 'light_ground_vehicle_factory', items: [['gtceu:steel_block', 1], ['superbwarfare:wheel', 4], ['gtceu:steel_gearbox', 1]], circuit: 7, eut: 16, duration: 4000 }, // truck (halo)
        { entity: 'halovecsm12hmg',               factory: 'light_ground_vehicle_factory', items: [['gtceu:vehicle_metal_block', 2], ['superbwarfare:wheel', 4], ['gtceu:steel_gearbox', 1], ['superbwarfare:light_armament_module', 1]], circuit: 7, eut: 16, duration: 4000 }, // halo_truck (halo)
        // mv_truck — component-built truck (LV frame + engine from components.js), MV tier
        { entity: 'superbwarfare:truck',          factory: 'light_ground_vehicle_factory', items: [['kubejs:lv_vehicle_frame', 1], ['superbwarfare:wheel', 4], ['kubejs:lv_engine', 1], ['gtceu:tin_single_cable', 32]], tags: [['#gtceu:circuits/lv', 4]], eut: 70, duration: 4000 },

        // --- Tank Assembly ---
        { entity: 'ashvehicle:t_90',              factory: 'tank_assembly', items: [['gtceu:tank_grade_metal_block', 10], ['superbwarfare:track', 2], ['gtceu:steel_gearbox', 4], ['superbwarfare:light_armament_module', 1]], circuit: 8, eut: 70, duration: 4000 }, // t_90
        { entity: 'superbwarfare:bmp_2',          factory: 'tank_assembly', items: [['gtceu:tank_grade_metal_block', 6], ['superbwarfare:track', 2], ['gtceu:steel_gearbox', 2], ['superbwarfare:light_armament_module', 1]], circuit: 9, eut: 70, duration: 4000 }, // bmp_2
        { entity: 'halovecs:m12roc',              factory: 'tank_assembly', items: [['gtceu:tank_grade_metal_block', 2], ['superbwarfare:track', 2], ['gtceu:steel_gearbox', 1], ['superbwarfare:light_armament_module', 1]], circuit: 10, eut: 70, duration: 4000 }, // rocket_hug (halo)

        // --- Heavy Plane Assembler (jets) ---
        { entity: 'ashvehicle:f-4',   factory: 'heavy_plane_assembler', items: [['gtceu:aircraft_grade_metal_plate', 25], ['superbwarfare:wheel', 2], ['superbwarfare:light_armament_module', 1], ['gtceu:lv_emitter', 1]], circuit: 1, eut: 70, duration: 100 }, // F4
        { entity: 'ashvehicle:f14',   factory: 'heavy_plane_assembler', items: [['gtceu:aircraft_grade_metal_plate', 25], ['superbwarfare:wheel', 2], ['superbwarfare:light_armament_module', 1], ['gtceu:mv_emitter', 1]], circuit: 2, eut: 70, duration: 100 }, // topgun (f14)
        { entity: 'ashvehicle:f_16',  factory: 'heavy_plane_assembler', items: [['gtceu:aircraft_grade_metal_plate', 25], ['superbwarfare:wheel', 2], ['superbwarfare:light_armament_module', 1], ['gtceu:mv_emitter', 1]], circuit: 3, eut: 70, duration: 100 }, // F16
        { entity: 'ashvehicle:su-25', factory: 'heavy_plane_assembler', items: [['gtceu:aircraft_grade_metal_plate', 25], ['superbwarfare:wheel', 2], ['superbwarfare:light_armament_module', 1], ['gtceu:mv_emitter', 1]], circuit: 4, eut: 70, duration: 100 }, // su-25
        { entity: 'ashvehicle:f_15',  factory: 'heavy_plane_assembler', items: [['gtceu:aircraft_grade_metal_plate', 25], ['superbwarfare:wheel', 2], ['superbwarfare:light_armament_module', 1], ['gtceu:mv_emitter', 1]], circuit: 5, eut: 70, duration: 100 }, // F15
        { entity: 'superbwarfare:a-10a', factory: 'heavy_plane_assembler', items: [['gtceu:aircraft_grade_metal_plate', 25], ['superbwarfare:wheel', 2], ['superbwarfare:light_armament_module', 1], ['gtceu:lv_emitter', 1]], circuit: 6, eut: 70, duration: 100 }, // A10

        // --- Light Plane Assembler (helicopters) ---
        { entity: 'superbwarfare:ah_6a', factory: 'light_plane_assembler', items: [['gtceu:aircraft_grade_metal_plate', 15], ['superbwarfare:wheel', 2], ['superbwarfare:large_propeller', 1], ['superbwarfare:light_armament_module', 1], ['gtceu:lv_emitter', 1]], circuit: 7, eut: 70, duration: 100 }, // AH6
    ]
    // NOTE: TOW (superbwarfare:tow_deployer) was dropped from this list — it outputs a plain item, not a
    // packaged-vehicle entity, so it doesn't fit WFVehicles.recipe. Ask if you want raw-item-output support.

    VEHICLES.forEach((v, i) => {
        try {
            const r = WFVehicles.recipe('kubejs:veh_' + i, v.entity, v.factory);
            (v.items || []).forEach(it => r.item(it[0], it[1]));
            (v.tags || []).forEach(tg => r.tag(tg[0], tg[1]));
            (v.fluids || []).forEach(fl => r.fluid(fl[0], fl[1]));
            if (v.circuit !== undefined && v.circuit !== null) r.circuit(v.circuit);
            r.EUt(v.eut).duration(v.duration);
            event.custom(r.build());
        } catch (e) {
            console.warn('[WF] skipped vehicle recipe #' + i + ' (' + v.entity + ' @ ' + v.factory + '): ' + e);
        }
    });
});
