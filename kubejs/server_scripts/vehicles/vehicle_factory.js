ServerEvents.recipes(event => {
    const VEHICLES = [

        {
            // LV light armor
            id: 'superbwarfare:container',
            name: 'commando',
            nbt: '{BlockEntityTag:{EntityType:"superbwarfare:lav_150",id:"superbwarfare:container"}}',
            inputs: [Item.of('gtceu:vehicle_metal_block', 6), Item.of('superbwarfare:track', 2), Item.of('gtceu:steel_gearbox', 4), Item.of('kubejs:heavy_barrel_steel', 3)],
            circuit: 3,
            duration: 4000,
            eut: 16
        },
        {
            id: 'superbwarfare:container',
            name: 'puma',
            nbt: '{BlockEntityTag:{EntityType:"halovecs:m12hmg",id:"superbwarfare:container"}}',
            inputs: [Item.of('gtceu:vehicle_metal_block', 2), Item.of('superbwarfare:wheel', 4), Item.of('gtceu:steel_gearbox', 1), Item.of('superbwarfare:light_armament_module')],
            circuit: 7,
            duration: 4000,
            eut: 16
        },

         {
            id: 'superbwarfare:container',
            name: 'halo_truck',
            nbt: '{BlockEntityTag:{EntityType:"halovecs:m274",id:"superbwarfare:container"}}',
            inputs: [Item.of('gtceu:vehicle_metal_block', 1), Item.of('superbwarfare:wheel', 4), Item.of('gtceu:steel_gearbox', 1), Item.of('superbwarfare:light_armament_module')],
            circuit: 7,
            duration: 4000,
            eut: 16
        },

        // LV emplacements
        {
            id: 'superbwarfare:container',
            name: 'uglycannon',
            nbt: '{BlockEntityTag:{EntityType:"superbwarfare:mle_1934",id:"superbwarfare:container"}}',
            inputs: [Item.of('gtceu:vehicle_metal_block', 4), Item.of('gtceu:steel_gearbox', 1), Item.of('kubejs:heavy_barrel_steel', 2)],
            circuit: 4,
            duration: 4000,
            eut: 16
        },
        {
            id: 'superbwarfare:container',
            name: '5/54',
            nbt: '{BlockEntityTag:{EntityType:"superbwarfare:mk_42",id:"superbwarfare:container"}}',
            inputs: [Item.of('gtceu:vehicle_metal_block', 4), Item.of('gtceu:steel_gearbox', 1), Item.of('kubejs:heavy_barrel_steel', 3)],
            circuit: 5,
            duration: 4000,
            eut: 16
        },

        // LV misc
        {
            id: 'superbwarfare:container',
            name: 'truck',
            nbt: '{BlockEntityTag:{EntityType:"superbwarfare:truck",id:"superbwarfare:container"}}',
            inputs: [Item.of('gtceu:steel_block', 1), Item.of('superbwarfare:wheel', 4), Item.of('gtceu:steel_gearbox', 1)],
            circuit: 6,
            duration: 4000,
            eut: 16
        },
        {
            id: 'superbwarfare:container',
            name: 'truck',
            nbt: '{BlockEntityTag:{EntityType:"superbwarfare:halovecsm12tra",id:"superbwarfare:container"}}',
            inputs: [Item.of('gtceu:steel_block', 1), Item.of('superbwarfare:wheel', 4), Item.of('gtceu:steel_gearbox', 1)],
                     circuit: 7,
                     duration: 4000,
                     eut: 16
        },
        {
            id: 'superbwarfare:container',
            name: 'halo_truck',
            nbt: '{BlockEntityTag:{EntityType:"halovecsm12hmg",id:"superbwarfare:container"}}',
            inputs: [Item.of('gtceu:vehicle_metal_block', 2), Item.of('superbwarfare:wheel', 4), Item.of('gtceu:steel_gearbox', 1), Item.of('superbwarfare:light_armament_module')],
            circuit: 7,
            duration: 4000,
            eut: 16
        },

        // MV Tanks
        {
            id: 'superbwarfare:container',
            name: 't_90',
            nbt: '{BlockEntityTag:{EntityType:"ashvehicle:t_90",id:"superbwarfare:container"}}',
            inputs: [Item.of('gtceu:tank_grade_metal_block', 10), Item.of('superbwarfare:track', 2), Item.of('gtceu:steel_gearbox', 4), Item.of('superbwarfare:light_armament_module')],
            circuit: 8,
            duration: 4000,
            eut: 70
        },
        {
            id: 'superbwarfare:container',
            name: 'bmp_2',
            nbt: '{BlockEntityTag:{EntityType:"superbwarfare:bmp_2",id:"superbwarfare:container"}}',
            inputs: [Item.of('gtceu:tank_grade_metal_block', 6), Item.of('superbwarfare:track', 2), Item.of('gtceu:steel_gearbox', 2), Item.of('superbwarfare:light_armament_module')],
            circuit: 9,
            duration: 4000,
            eut: 70
        },
        {
            id: 'superbwarfare:container',
            name: 'rocket_hug',
            nbt: '{BlockEntityTag:{EntityType:"halovecs:m12roc",id:"superbwarfare:container"}}',
            inputs: [Item.of('gtceu:tank_grade_metal_block', 2), Item.of('superbwarfare:track', 2), Item.of('gtceu:steel_gearbox', 1), Item.of('superbwarfare:light_armament_module')],
            circuit: 10,
            duration: 4000,
            eut: 70
        },

        //MV misc

        {
            id: 'superbwarfare:tow_deployer',
            name: 'TOW',
            nbt: '',
            inputs: [Item.of('gtceu:tank_grade_metal_plate', 3), Item.of('superbwarfare:mortar_bipod'), Item.of('minecraft:spyglass')],
            circuit: 15,
            duration: 100,
            eut: 70
        },
        //MV aircraft
         {
            id: 'superbwarfare:container',
            name: 'F4',
            nbt:'{BlockEntityTag:{EntityType:"ashvehicle:f-4",id:"superbwarfare:container"}}',
            inputs: [Item.of('gtceu:aircraft_grade_metal_plate', 25), Item.of('superbwarfare:wheel', 2), Item.of('superbwarfare:light_armament_module'), 'gtceu:lv_emitter' ],
            circuit: 1,
            duration: 100,
            eut: 70
        },

         {
            id: 'superbwarfare:container',
            name: 'topgun',
            nbt:'{BlockEntityTag:{EntityType:"ashvehicle:f14",id:"superbwarfare:container"}}',
            inputs: [Item.of('gtceu:aircraft_grade_metal_plate', 25), Item.of('superbwarfare:wheel', 2), Item.of('superbwarfare:light_armament_module'), 'gtceu:mv_emitter' ],
            circuit: 2,
            duration: 100,
            eut: 70
        },

        {
            id: 'superbwarfare:container',
            name: 'F16',
            nbt:'{BlockEntityTag:{EntityType:"ashvehicle:f_16",id:"superbwarfare:container"}}',
            inputs: [Item.of('gtceu:aircraft_grade_metal_plate', 25), Item.of('superbwarfare:wheel', 2), Item.of('superbwarfare:light_armament_module'), 'gtceu:mv_emitter'],
                     circuit: 3,
                     duration: 100,
                     eut: 70
        },

          {
            id: 'superbwarfare:container',
            name: 'su-25',
            nbt:'{BlockEntityTag:{EntityType:"ashvehicle:su-25",id:"superbwarfare:container"}}',
            inputs: [Item.of('gtceu:aircraft_grade_metal_plate', 25), Item.of('superbwarfare:wheel', 2), Item.of('superbwarfare:light_armament_module'), 'gtceu:mv_emitter' ],
            circuit: 4,
            duration: 100,
            eut: 70
        },

         {
            id: 'superbwarfare:container',
            name: 'F16',
            nbt:'{BlockEntityTag:{EntityType:"ashvehicle:f_15",id:"superbwarfare:container"}}',
            inputs: [Item.of('gtceu:aircraft_grade_metal_plate', 25), Item.of('superbwarfare:wheel', 2), Item.of('superbwarfare:light_armament_module'), 'gtceu:mv_emitter' ],
            circuit: 5,
            duration: 100,
            eut: 70
        },

        {
            id: 'superbwarfare:container',
            name: 'A10',
            nbt:'{BlockEntityTag:{EntityType:"superbwarfare:a-10a",id:"superbwarfare:container"}}',
            inputs: [Item.of('gtceu:aircraft_grade_metal_plate', 25), Item.of('superbwarfare:wheel', 2), Item.of('superbwarfare:light_armament_module'), 'gtceu:lv_emitter' ],
                     circuit: 6,
                     duration: 100,
                     eut: 70
        },
        //MV Helicoper

        {
            id: 'superbwarfare:container',
            name: 'AH6',
            nbt:'{BlockEntityTag:{EntityType:"superbwarfare:ah_6a",id:"superbwarfare:container"}}',
            inputs: [Item.of('gtceu:aircraft_grade_metal_plate', 15), Item.of('superbwarfare:wheel', 2), Item.of('superbwarfare:large_propeller'), Item.of('superbwarfare:light_armament_module'), 'gtceu:lv_emitter' ],
                     circuit: 7,
                     duration: 100,
                     eut: 70
        },

    ];

     VEHICLES.forEach((vehicle, index) => {
        event.recipes.gtceu.vehicle_factory(`vehicle_${index}`)
            .itemInputs(vehicle.inputs)
            .itemOutputs(Item.of(vehicle.id, vehicle.nbt))
            .duration(vehicle.duration)
            .circuit(vehicle.circuit)
            .EUt(vehicle.eut);
    });
});
