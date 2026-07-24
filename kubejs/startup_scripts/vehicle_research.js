// "Vehicle Components" research tab: 5 tier nodes (LV -> MV -> HV -> EV -> IV) in a chain.
// Each node unlocks (shows in the tree) and gates (via WFResearch.condition('veh_<tier>'),
// see server_scripts/vehicles/components.js) that whole tier's 9 vehicle-component parts.
StartupEvents.postInit(event => {

    WFResearch.category('vehicles')
        .name('Vehicle Components')
        .icon(Item.of('kubejs:hv_vehicle_frame'))
        .backgroundColor(0xFF101814)
        .connectorColor(0xFF60C060)
        .register()

    const PARTS = ['air_frame', 'cannon_barrel', 'cockpit', 'engine', 'rotor',
        'track', 'vehicle_frame', 'weapons_system', 'wing']

    // [ tier, gridX, runs, prerequisite node ]
    const NODES = [
        ['lv', 0, 8,  null],
        ['mv', 1, 12, 'veh_lv'],
        ['hv', 2, 16, 'veh_mv'],
        ['ev', 3, 24, 'veh_hv'],
        ['iv', 4, 32, 'veh_ev'],
    ]

    NODES.forEach(row => {
        const tier = row[0], gridX = row[1], runs = row[2], req = row[3]
        const node = WFResearch.builder('veh_' + tier)
            .category('vehicles').pos(gridX, 0)
            .nodeColor(0xFF2F6BD8)
            .runs(runs).cwuPerRun(64).itemPerRun(Item.of('gtceu:basic_electronic_circuit'))
            .icon(Item.of('kubejs:' + tier + '_vehicle_frame'))
            .name(tier.toUpperCase() + ' Vehicle Components')
            .description('Unlocks the ' + tier.toUpperCase() + '-tier vehicle components (frames, engines, tracks, wings, rotors and armament).')

        PARTS.forEach(part => node.unlock(Item.of('kubejs:' + tier + '_' + part)))
        if (req) node.requires(req)
        node.register()
    })
})
