// Ground-vehicle COMPONENT research — an independent per-part tree living on the "Ground vehicles"
// tab (category 'armor'), sitting to the RIGHT of the vehicle chain (see wfcore/WFResearch.js).
//
// The old standalone "Vehicle Components" tab (category 'vehicles', 5 tier-bundle nodes veh_lv..veh_iv)
// is REMOVED. Layout now mirrors the infantry-weapons tree: each ground component is its own node, tiers
// stack vertically, and reaching the next voltage tier only needs ONE component from the current tier
// (via .anyOf on the previous tier's five nodes).
//
// Node id = veh_comp_<tier>_<part>; it both shows the part in the tree (.unlock) and gates that part's
// assembler recipe (server_scripts/vehicles/components.js addCondition on the same id).
//
// Runs in ServerEvents.recipes (fires on server start AND /reload). The research registry is put-replace by
// id and is no longer wiped by wfcore, so we explicitly drop the old tab/nodes here for /reload correctness.
ServerEvents.recipes(event => {

    // --- Remove the retired "Vehicle Components" tab + its bundled tier nodes ---
    WFResearch.removeCategory('vehicles')
    ;['veh_lv', 'veh_mv', 'veh_hv', 'veh_ev', 'veh_iv'].forEach(id => WFResearch.remove(id))

    // --- Remove the older 4-node grouped vehicle tree (superseded by the per-vehicle graph in
    //     wfcore/WFResearch.js). These ids are no longer registered, but the research registry is
    //     put-replace (never wiped on /reload), so they linger until explicitly removed. veh_tank is
    //     REUSED by the new graph, so it must NOT be removed here. ---
    ;['veh_logistics', 'veh_armed_trucks', 'veh_humvees', 'veh_ifvs'].forEach(id => WFResearch.remove(id))

    // Ground vehicles consume exactly these five component families (air_frame/wing/rotor/cockpit are
    // aviation-only and stay off this tree — their recipes fail open until the Aviation page is built).
    const PARTS = ['vehicle_frame', 'engine', 'track', 'cannon_barrel', 'weapons_system']

    const title = s => s.split('_').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ')

    // [ tier, y, runs, eut, cwuPerRun, prevTier, plate, circuit ]
    // cwuPerRun / ticksPerRun(200) = per-tick compute: MV ~64, HV ~256, EV ~1024 (CLAUDE.md midpoints).
    const TIERS = [
        ['lv', 0, 5,  32,   0,      null, 'gtceu:steel_plate',           'gtceu:basic_electronic_circuit'],
        ['mv', 1, 8,  128,  12800,  'lv', 'gtceu:aluminium_plate',       'gtceu:good_electronic_circuit'],
        ['hv', 2, 10, 512,  51200,  'mv', 'gtceu:stainless_steel_plate', 'gtceu:basic_integrated_circuit'],
        ['ev', 3, 12, 2048, 204800, 'hv', 'gtceu:titanium_plate',        'gtceu:good_integrated_circuit'],
    ]

    TIERS.forEach(row => {
        const tier = row[0], y = row[1], runs = row[2], eut = row[3], cwu = row[4]
        const prev = row[5], plate = row[6], circuit = row[7]

        PARTS.forEach((part, pi) => {
            const item = 'kubejs:' + tier + '_' + part
            const node = WFResearch.builder('veh_comp_' + tier + '_' + part)
                .category('armor').pos(2 + pi, y)
                .nodeColor(0xFF2F6BD8)
                .runs(runs).ticksPerRun(200).eut(eut).cwuPerRun(cwu)
                .itemPerRun(Item.of(plate, 4))
                .itemPerRun(Item.of(circuit, 1))
                .unlock(Item.of(item))
                .icon(Item.of(item))
                .name(tier.toUpperCase() + ' ' + title(part))
                .description('Assembler blueprint for the ' + tier.toUpperCase() + '-tier ' + title(part)
                    + ' used in ground-vehicle assembly.')

            // Progression: any ONE component of the previous tier unlocks this tier's components.
            if (prev) node.anyOf(PARTS.map(p => 'veh_comp_' + prev + '_' + p))
            node.register()
        })
    })
})
