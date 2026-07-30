// WFCore missile research tree — a dedicated "Missiles" tab (research category) gating the missile factory
// recipes in missiles.js. The whole suite is HV-and-up (the Missile Factory unlocks at HV), so tiers here are
// HV -> EV -> IV. Every high-end (EV/IV) missile gets its OWN research node; only the HV entry tiers group
// (the starter basics, and the three entry cluster warheads). Compute is sized to each tier's midpoint
// (CLAUDE.md "Research compute balance"): HV ~256 CWU/t, EV ~1024, IV ~4096, over 360-tick runs. Runs in
// wfcore:research_unit. Registered in ServerEvents.recipes so it rebuilds on /reload.

import com.norwood.wfcore.integration.kubejs
// ServerEvents.recipes (not .loaded) so the tree rebuilds on /reload — see WFResearch.js note.
ServerEvents.recipes(event => {

    WFResearch.category('missiles')
        .name('Missiles')
        .icon(Item.of('wfcore:missile_he'))
        .backgroundColor(0xFF101814)
        .connectorColor(0xFF60C060)
        .register()

    // Per-tier EU/t + compute budget (cwuPerRun = midpoint CWU/t x 360-tick run).
    const TIER = {
        HV: { eut: 512,  cwu: 92160 },   // ~256 CWU/t
        EV: { eut: 2048, cwu: 368640 },  // ~1024 CWU/t
        IV: { eut: 8192, cwu: 1474560 }, // ~4096 CWU/t
    }
    const M = n => Item.of('wfcore:missile_' + n)
    const CIRC = 'gtceu:advanced_integrated_circuit'

    // [ id, tier, x, y, requires|null, name, desc, iconMissile, researchCostItems[[id,ct]], unlocks[missileNames] ]
    const NODES = [
        ['missile_systems', 'HV', 0, 0, null, 'Missile Systems',
            'Unlocks the core missile line: the High-Explosive, Long-Range and (inert) Dummy missiles, plus the cheap Shahed drones — the strike, gas and inert long-range loitering variants.',
            'he', [['gtceu:steel_plate',16],['gtceu:aluminium_plate',8],[CIRC,4]],
            ['he','dummy','long_range','strike_drone','gas_drone','loiter_drone']],

        // ── Demolition branch ──
        ['demolition_ordnance', 'HV', -4, 1, 'missile_systems', 'Demolition Ordnance',
            'Fuel-air thermobaric warheads: a modest crater but an enormous, hard-hitting overpressure blast.',
            'thermobaric', [['gtceu:steel_plate',12],['minecraft:tnt',8],[CIRC,2]], ['thermobaric']],
        ['tactical_nuclear', 'IV', -4, 2, 'demolition_ordnance', 'Tactical Nuclear',
            'A compact nuclear earth-penetrator: a ~50-block devastation plus a deep shaped jet that drives through fortification.',
            'mininuke', [['gtceu:tungsten_steel_plate',8],['minecraft:tnt',16],[CIRC,8]], ['mininuke']],

        // ── Penetrator branch (one node per tier) ──
        ['penetrator_missiles', 'HV', -2, 1, 'missile_systems', 'Penetrator Missiles',
            'Fast, evasive HE rounds that shrug off lower-tier interceptors by out-running them.',
            'penetrator', [['gtceu:titanium_plate',8],[CIRC,4],['minecraft:tnt',4]], ['penetrator']],
        ['penetrator_supersonic', 'EV', -3, 2, 'penetrator_missiles', 'Supersonic Penetrator',
            'A supersonic penetrator: fast enough that only a good interceptor catches it.',
            'penetrator_supersonic', [['gtceu:titanium_plate',10],[CIRC,6]], ['penetrator_supersonic']],
        ['penetrator_hypersonic', 'IV', -3, 3, 'penetrator_supersonic', 'Hypersonic Penetrator',
            'The hypersonic penetrator: a near-sure hit against anything but a top-tier interceptor.',
            'penetrator_hypersonic', [['gtceu:tungsten_steel_plate',8],[CIRC,8]], ['penetrator_hypersonic']],

        // ── ICBM branch ──
        ['icbm', 'EV', -1, 2, 'penetrator_missiles', 'ICBM',
            'Extreme-range, high-altitude ICBM with a fast 90-degree descent that throws off lower-tier interceptors. Low blast radius, strong punch, very tanky.',
            'icbm', [['gtceu:steel_plate',16],['gtceu:titanium_plate',8],[CIRC,6]], ['icbm']],
        ['icbm_heavy', 'IV', -1, 3, 'icbm', 'Heavy ICBM',
            'The heavy ICBM: longer reach, a stronger warhead and the toughest airframe in the suite.',
            'icbm_heavy', [['gtceu:tungsten_steel_plate',10],['gtceu:titanium_plate',10],[CIRC,8]], ['icbm_heavy']],

        // ── Bunker-buster branch ──
        ['shaped_charges', 'HV', 2, 1, 'missile_systems', 'Shaped Charges',
            'A narrow shaped-charge jet that cracks all defences to gravel — but needs a follow-up round to finish hardened armour.',
            'bunker_buster', [['gtceu:steel_plate',16],['minecraft:tnt',6],['gtceu:titanium_plate',4]], ['bunker_buster']],
        ['bunker_buster_heavy', 'EV', 2, 2, 'shaped_charges', 'Heavy Bunker Buster',
            'A heavier, more accurate shaped charge that cracks even tungsten-class plating.',
            'bunker_buster_heavy', [['gtceu:tungsten_steel_plate',10],['minecraft:tnt',8]], ['bunker_buster_heavy']],
        ['bunker_tunneller', 'IV', 2, 3, 'bunker_buster_heavy', 'Tunneller',
            'The Tunneller bores in up to 15 blocks (stopped early by tungsten-class shielding) and detonates inside.',
            'bunker_tunneller', [['gtceu:tungsten_steel_plate',12],['minecraft:tnt',8],[CIRC,3]], ['bunker_tunneller']],

        // ── Cluster branch (HV entry warheads grouped; high-end split out) ──
        ['cluster_munitions', 'HV', 4, 1, 'missile_systems', 'Cluster Munitions',
            'Anti-personnel cluster missiles: fragmentation, incendiary (white phosphorus) and chemical (mustard gas) variants.',
            'cluster', [['gtceu:steel_plate',10],['gtceu:iron_round',32],['minecraft:tnt',6]],
            ['cluster','cluster_fire','cluster_gas']],
        ['frag_storm', 'EV', 4, 2, 'cluster_munitions', 'Fragmentation Storm',
            'A two-stage saturation cascade: 9 submissiles, each throwing 4 low-yield bomblets over a wide footprint.',
            'frag_storm', [['gtceu:steel_plate',12],['gtceu:iron_round',48],[CIRC,2]], ['frag_storm']],
        ['skyfall', 'IV', 4, 3, 'frag_storm', 'Skyfall',
            'Bursts high and rains 9 entity-seeking submunitions that track their targets, then time out.',
            'skyfall', [['gtceu:steel_plate',12],['gtceu:iron_round',32],[CIRC,4]], ['skyfall']],

        // ── EMP branch (each advanced EMP its own node) ──
        ['emp_warheads', 'HV', 6, 1, 'missile_systems', 'EMP Warheads',
            'Stealth terrain-hugging EMP missiles that disable machinery. Takes lapotron crystals.',
            'emp', [['gtceu:steel_plate',10],['gtceu:lapotron_crystal',1],[CIRC,4]], ['emp']],
        ['emp_heavy', 'EV', 5, 2, 'emp_warheads', 'Heavy EMP',
            'A larger-radius stealth EMP for blanketing a whole base in a disable.',
            'emp_heavy', [['gtceu:titanium_plate',6],['gtceu:lapotron_crystal',2],[CIRC,4]], ['emp_heavy']],
        ['emp_cluster', 'EV', 7, 2, 'emp_warheads', 'EMP Cluster',
            'A non-stealth cluster that rains EMP bomblets over a wide area.',
            'emp_cluster', [['gtceu:steel_plate',10],['gtceu:lapotron_crystal',2],[CIRC,3]], ['emp_cluster']],
        ['emp_lance', 'EV', 6, 3, 'emp_warheads', 'EMP Lance',
            'A fast, evasive penetrator that fires a pinpoint 2x2 EMP beam — no terrain damage.',
            'emp_lance', [['gtceu:titanium_plate',10],['gtceu:lapotron_crystal',3],[CIRC,4]], ['emp_lance']],

        // ── Interceptor branch ──
        ['interceptor_systems', 'HV', -6, 1, 'missile_systems', 'Interceptor Systems',
            'Point-defence interceptors for the Interceptor Battery: fast, guidance-heavy, cheap on propellant.',
            'interceptor', [['gtceu:aluminium_plate',8],[CIRC,6]], ['interceptor']],
        ['interceptor_network', 'EV', -6, 2, 'interceptor_systems', 'Interceptor Network',
            'Faster interceptors that can run down supersonic threats before they cross clear.',
            'interceptor_mk2', [['gtceu:titanium_plate',8],[CIRC,8]], ['interceptor_mk2']],
        ['interceptor_ace', 'IV', -7, 3, 'interceptor_network', 'Ace Interceptor',
            'Competitive with all but the top evasive round — the premier point-defence round.',
            'interceptor_ace', [['gtceu:tungsten_steel_plate',6],[CIRC,12]], ['interceptor_ace']],
        ['interceptor_cluster', 'IV', -5, 3, 'interceptor_network', 'Cluster Interceptor',
            'Airbursts into several small interceptors on engaging, to blunt a whole barrage in one shot.',
            'interceptor_cluster', [['gtceu:titanium_plate',8],[CIRC,10]], ['interceptor_cluster']],
    ]

    NODES.forEach(([id, tier, x, y, requires, name, desc, icon, cost, unlocks]) => {
        const b = WFResearch.builder(id)
            .category('missiles').pos(x, y)
            .nodeColor(0xFFD8562F)
            .name(name)
            .description(desc)
            .runs(20).ticksPerRun(360).eut(TIER[tier].eut).cwuPerRun(TIER[tier].cwu)
            .icon(M(icon))
        if (requires) b.requires(requires)
        cost.forEach(([itemId, ct]) => b.itemPerRun(Item.of(itemId, ct)))
        unlocks.forEach(n => b.unlock(M(n)))
        b.register()
    })
})
