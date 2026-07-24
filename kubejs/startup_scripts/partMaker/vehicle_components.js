// Tiered vehicle-component parts: 5 GregTech tiers (LV/MV/HV/EV/IV) x 9 components.
// Item ids are `kubejs:<tier>_<part>` (e.g. kubejs:hv_engine); textures live at
// assets/kubejs/textures/item/<tier>_<part>.png. Crafted (research-gated) in
// server_scripts/vehicles/components.js and used as ingredients when building vehicles.
StartupEvents.registry('item', event => {
    const TIERS = ['lv', 'mv', 'hv', 'ev', 'iv']
    const PARTS = {
        air_frame:      'Air Frame',
        cannon_barrel:  'Cannon Barrel',
        cockpit:        'Cockpit',
        engine:         'Engine',
        rotor:          'Rotor',
        track:          'Track',
        vehicle_frame:  'Vehicle Frame',
        weapons_system: 'Weapons System',
        wing:           'Wing',
    }
    TIERS.forEach(tier => {
        Object.keys(PARTS).forEach(part => {
            const id = tier + '_' + part
            event.create(id)
                .texture('kubejs:item/' + id)
                .maxStackSize(16)
                .displayName(tier.toUpperCase() + ' ' + PARTS[part])
        })
    })
})
