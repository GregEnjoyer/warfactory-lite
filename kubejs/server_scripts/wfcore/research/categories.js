// All research category (tab) definitions, plus retired-tab/node cleanup.
// Runs in ServerEvents.recipes (fires on server start AND /reload) so the
// registry stays correct after a /reload.
ServerEvents.recipes(event => {

    WFResearch.category('ballistics')
        .name('Ballistics')
        .icon(Item.of('superbwarfare:large_shell_he'))
        .backgroundColor(0xFF101814)
        .connectorColor(0xFF60C060)
        .register()

    WFResearch.category('infantry')
        .name('Infantry weapons')
        .icon(Item.of('tacz:modern_kinetic_gun', '{GunCurrentAmmoCount:30,GunFireMode:"SEMI",GunId:"tacz:scar_l",HasBulletInBarrel:1b}'))
        .backgroundColor(0xFF101814)
        .connectorColor(0xFF60C060)
        .register()

    WFResearch.category('armor')
        .name('Ground vehicles')
        .icon(Item.of('wfcore:packaged_vehicle', '{entity:"mcsp:humvee_sand"}'))
        .backgroundColor(0xFF101814)
        .connectorColor(0xFF60C060)
        .register()

    WFResearch.category('air')
        .name('Aviation')
        .icon(Item.of('wfcore:missile_strike_drone'))
        .backgroundColor(0xFF101814)
        .connectorColor(0xFF60C060)
        .register()

    WFResearch.category('defense')
        .name('Emplacements')
        .icon(Item.of('superbwarfare:mortar_deployer'))
        .backgroundColor(0xFF101814)
        .connectorColor(0xFF60C060)
        .register()

    WFResearch.category('missiles')
        .name('Missiles')
        .icon(Item.of('wfcore:missile_he'))
        .backgroundColor(0xFF101814)
        .connectorColor(0xFF60C060)
        .register()

    // --- Remove the retired "Vehicle Components" tab + its bundled tier nodes ---
    WFResearch.removeCategory('vehicles')
    ;['veh_lv', 'veh_mv', 'veh_hv', 'veh_ev', 'veh_iv'].forEach(id => WFResearch.remove(id))

    // --- Remove the older 4-node grouped vehicle tree (superseded by the per-vehicle graph).
    //     veh_tank is REUSED by the new graph, so it must NOT be removed here. ---
    ;['veh_logistics', 'veh_armed_trucks', 'veh_humvees', 'veh_ifvs'].forEach(id => WFResearch.remove(id))

    // --- Remove the retired GROUPED ballistics nodes, now split one-ammo-per-node
    //     (large_caliber_shells -> large_shell_*; air_rockets -> small_rocket + medium_rocket_*;
    //      aerial_bombs -> small/medium_aerial_bomb). See wfcore/research/ballistics.js. ---
    ;['large_caliber_shells', 'air_rockets', 'aerial_bombs'].forEach(id => WFResearch.remove(id))

})
