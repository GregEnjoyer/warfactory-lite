// Missile research — category('missiles') nodes.
// The category definition itself lives in categories.js.
// Every high-end (EV/IV) missile gets its OWN research node; only the HV entry tiers group.
// Compute is sized to each tier's midpoint: HV ~256 CWU/t, EV ~1024, IV ~4096.
// Registered in ServerEvents.recipes so it rebuilds on /reload.
//
// Two balance knobs per node (the MIN map + each node's per-run cost list; RUNS is fixed at 8):
//   TIME     — completion = RUNS(8) x ticksPerRun at nominal (midpoint) compute. The clock lives in
//              ticksPerRun (= MIN[id] x 150), so runs x tpr = ~15-45 min (HV 15 / EV 30 / IV 45);
//              interceptors run shorter (10/20/30/27). cwuPerRun = tier-midpoint x ticksPerRun, so per-tick
//              compute demand stays at the midpoint. FEW, LONG runs (not many short) so each run can consume
//              a large fraction of the missile recipe — see MATERIAL.
//   MATERIAL — each node MIRRORS its unlocked missile's full crafting recipe: every substantive component
//              (plates, frames, engines, RAM, circuits, explosives, rounds, exotics) at ~4x a build — a
//              one-time "~4 missiles of parts" gate (starter + interceptors 3.5x, the IV apex nodes 5x).
//              Each run draws ~half the recipe over the 8 runs. Circuits are drawn as the node's
//              circuit-voltage TAG (gtceu:circuits/<tier>, via itemTagPerRun), so any tier-appropriate circuit
//              works instead of one hardcoded item. NBT is the one thing the machine can't match, so charged
//              lapotron is forced to a plain crystal (LAPO). The fluid fuel and the lone fusee are dropped.
ServerEvents.recipes(event => {

    // Per-tier EU/t; the tier midpoint (used to size cwuPerRun) is eut/2 (HV 256, EV 1024, IV 4096).
    const TIER = { HV: { eut: 512 }, EV: { eut: 2048 }, IV: { eut: 8192 } }
    const RUNS = 8                             // fixed run count; time is carried by ticksPerRun (see header)
    // Per-node completion time in minutes -> ticksPerRun = MIN x 150 (so RUNS x tpr = MIN x 1200 ticks).
    const MIN = {
        missile_systems: 15, demolition_ordnance: 15, penetrator_missiles: 15, shaped_charges: 15,
        cluster_munitions: 15, emp_warheads: 15,                                    // HV standard
        penetrator_supersonic: 30, icbm: 30, bunker_buster_heavy: 30, frag_storm: 30,
        emp_heavy: 30, emp_cluster: 30, emp_lance: 30,                              // EV standard
        tactical_nuclear: 45, penetrator_hypersonic: 45, icbm_heavy: 45, bunker_tunneller: 45, skyfall: 45,
        interceptor_systems: 10, interceptor_network: 20,                          // IV standard / interceptors
        interceptor_ace: 30, interceptor_cluster: 27,
    }

    const M = n => Item.of('wfcore:missile_' + n)
    // Item aliases. CIRC is a SENTINEL: the cost loop resolves it to the node's circuit-voltage TAG
    // (gtceu:circuits/<tier>) via itemTagPerRun, so each node draws a tier-appropriate circuit instead of one
    // hardcoded item. LAPO is the uncharged crystal (missiles use a charged one; the machine can't match NBT).
    const P    = 'gtceu:'
    const CIRC = '$CIRCUIT$'
    const CIRC_TAG = { HV: 'gtceu:circuits/hv', EV: 'gtceu:circuits/ev', IV: 'gtceu:circuits/iv' }
    const ENG  = 'superbwarfare:missile_engine'
    const TNT  = 'gtceu:gelled_toluene'
    const RDX  = 'gtceu:rdx_dust'
    const POW  = 'minecraft:gunpowder'
    const SRF  = 'kubejs:solid_rocket_fuel'
    const MV_RAM = 'kubejs:mv_ram'
    const HV_RAM = 'kubejs:hv_ram'
    const EV_RAM = 'kubejs:ev_ram'
    const LAPO      = 'gtceu:lapotron_crystal'
    const LAPO_DUST = 'gtceu:lapotron_dust'

    // [ id, tier, x, y, requires|null, name, desc, iconMissile, researchCostItems[[id,ct]], unlocks[missileNames] ]
    // researchCostItems are consumed PER RUN; total = list x RUNS(8) ~= 4x the unlocked missile's own recipe.
    const NODES = [
        ['missile_systems', 'HV', 0, 0, null, 'Missile Systems',
            'Unlocks the core missile line: the High-Explosive, Long-Range and (inert) Dummy missiles. The cheap Shahed loitering drones (strike/gas/loiter) are shown here too, but are RESEARCHED on the Aviation tab (Drone Tactics -> Shahed Loitering Drones); they still build at the Missile Factory.',
            'he', [[P+'aluminium_plate',42],[P+'blue_steel_frame',4],[CIRC,4],[ENG,2],[TNT,37]],
            ['he','dummy','long_range','strike_drone','gas_drone','loiter_drone']],

        // ── Demolition branch ──
        ['demolition_ordnance', 'HV', -4, 1, 'missile_systems', 'Demolition Ordnance',
            'Fuel-air thermobaric warheads: a modest crater but an enormous, hard-hitting overpressure blast.',
            'thermobaric', [[P+'titanium_plate',64],[P+'hssg_frame',2],[ENG,6],[CIRC,4],[RDX,32]], ['thermobaric']],
        ['tactical_nuclear', 'IV', -4, 2, 'demolition_ordnance', 'Tactical Nuclear',
            'A compact nuclear earth-penetrator: a ~50-block devastation plus a deep shaped jet that drives through fortification.',
            'mininuke', [[P+'hsss_plate',80],[P+'titanium_plate',5],[ENG,20],[RDX,10],[P+'double_beryllium_plate',20],[P+'uranium_235_block',5],[CIRC,10]], ['mininuke']],

        // ── Penetrator branch (one node per tier) ──
        ['penetrator_missiles', 'HV', -2, 1, 'missile_systems', 'Penetrator Missiles',
            'Fast, evasive HE rounds that shrug off lower-tier interceptors by out-running them.',
            'penetrator', [[P+'titanium_plate',32],[P+'ultimet_frame',4],[ENG,8],[CIRC,5],[TNT,32]], ['penetrator']],
        ['penetrator_supersonic', 'EV', -3, 2, 'penetrator_missiles', 'Supersonic Penetrator',
            'A supersonic penetrator: fast enough that only a good interceptor catches it.',
            'penetrator_supersonic', [[P+'incoloy_ma_956_plate',48],[P+'hssg_frame',4],[ENG,16],[CIRC,6],[TNT,48]], ['penetrator_supersonic']],
        ['penetrator_hypersonic', 'IV', -3, 3, 'penetrator_supersonic', 'Hypersonic Penetrator',
            'The hypersonic penetrator: a near-sure hit against anything but a top-tier interceptor.',
            'penetrator_hypersonic', [[P+'hsss_plate',60],[P+'incoloy_ma_956_frame',5],[ENG,40],[CIRC,10],[TNT,80]], ['penetrator_hypersonic']],

        // ── ICBM branch ──
        ['icbm', 'EV', -1, 2, 'penetrator_missiles', 'ICBM',
            'Extreme-range, high-altitude ICBM with a fast 90-degree descent that throws off lower-tier interceptors. Low blast radius, strong punch, very tanky.',
            'icbm', [[P+'double_titanium_plate',32],[ENG,8],[SRF,12],[CIRC,5],[HV_RAM,1],[RDX,42]], ['icbm']],
        ['icbm_heavy', 'IV', -1, 3, 'icbm', 'Heavy ICBM',
            'The heavy ICBM: longer reach, a stronger warhead and the toughest airframe in the suite.',
            'icbm_heavy', [[P+'double_tungsten_steel_plate',40],[P+'stainless_steel_plate',20],[ENG,15],[SRF,30],[CIRC,6],[RDX,62],[EV_RAM,2]], ['icbm_heavy']],

        // ── Bunker-buster branch ──
        ['shaped_charges', 'HV', 2, 1, 'missile_systems', 'Shaped Charges',
            'A narrow shaped-charge jet that cracks all defences to gravel — but needs a follow-up round to finish hardened armour.',
            'bunker_buster', [[P+'stainless_steel_plate',24],[P+'blue_steel_plate',12],[POW,24],[TNT,24],[CIRC,2]], ['bunker_buster']],
        ['bunker_buster_heavy', 'EV', 2, 2, 'shaped_charges', 'Heavy Bunker Buster',
            'A heavier, more accurate shaped charge that cracks even tungsten-class plating.',
            'bunker_buster_heavy', [[P+'titanium_plate',27],[P+'ultimet_plate',16],[POW,28],[RDX,16],[CIRC,3]], ['bunker_buster_heavy']],
        ['bunker_tunneller', 'IV', 2, 3, 'bunker_buster_heavy', 'Tunneller',
            'The Tunneller bores in up to 15 blocks (stopped early by tungsten-class shielding) and detonates inside.',
            'bunker_tunneller', [[P+'tungsten_steel_plate',32],[P+'hsss_plate',16],[POW,32],[RDX,32],[CIRC,3]], ['bunker_tunneller']],

        // ── Cluster branch (HV entry warheads grouped; high-end split out) ──
        ['cluster_munitions', 'HV', 4, 1, 'missile_systems', 'Cluster Munitions',
            'Anti-personnel cluster missiles: fragmentation, incendiary (white phosphorus) and chemical (mustard gas) variants.',
            'cluster', [[P+'vanadium_steel_frame',6],[P+'lead_round',32],[P+'stainless_steel_plate',38],[POW,24],[TNT,16]],
            ['cluster','cluster_fire','cluster_gas']],
        ['frag_storm', 'EV', 4, 2, 'cluster_munitions', 'Fragmentation Storm',
            'A two-stage saturation cascade: 9 submissiles, each throwing 4 low-yield bomblets over a wide footprint.',
            'frag_storm', [[P+'ultimet_frame',8],[P+'lead_round',128],[P+'titanium_plate',32],[POW,32],[TNT,12]], ['frag_storm']],
        ['skyfall', 'IV', 4, 3, 'frag_storm', 'Skyfall',
            'Bursts high and rains 9 entity-seeking submunitions that track their targets, then time out.',
            'skyfall', [[P+'stainless_steel_frame',10],[P+'hsss_round',48],[P+'titanium_plate',24],[CIRC,5],[POW,32]], ['skyfall']],

        // ── EMP branch (each advanced EMP its own node; circuits via tier voltage tag, lapotron uncharged) ──
        ['emp_warheads', 'HV', 6, 1, 'missile_systems', 'EMP Warheads',
            'Stealth terrain-hugging EMP missiles that disable machinery. Takes lapotron crystals.',
            'emp', [[P+'blue_steel_plate',20],[P+'aluminium_plate',12],[LAPO_DUST,4],[CIRC,3]], ['emp']],
        ['emp_heavy', 'EV', 5, 2, 'emp_warheads', 'Heavy EMP',
            'A larger-radius stealth EMP for blanketing a whole base in a disable.',
            'emp_heavy', [[P+'blue_steel_plate',24],[P+'titanium_plate',16],[LAPO,1],[CIRC,4]], ['emp_heavy']],
        ['emp_cluster', 'EV', 7, 2, 'emp_warheads', 'EMP Cluster',
            'A non-stealth cluster that rains EMP bomblets over a wide area.',
            'emp_cluster', [[P+'blue_steel_plate',32],[P+'lead_round',24],[POW,16],[CIRC,3]], ['emp_cluster']],
        ['emp_lance', 'EV', 6, 3, 'emp_warheads', 'EMP Lance',
            'A fast, evasive penetrator that fires a pinpoint 2x2 EMP beam — no terrain damage.',
            'emp_lance', [[P+'tungsten_plate',40],[P+'titanium_plate',12],[LAPO,1],[CIRC,4]], ['emp_lance']],

        // ── Interceptor branch ──
        ['interceptor_systems', 'HV', -6, 1, 'missile_systems', 'Interceptor Systems',
            'Point-defence interceptors for the Interceptor Battery: fast, guidance-heavy, cheap on propellant.',
            'interceptor', [[P+'aluminium_plate',28],[P+'stainless_steel_plate',7],[CIRC,17],[MV_RAM,2],[ENG,4],[TNT,5]], ['interceptor']],
        ['interceptor_network', 'EV', -6, 2, 'interceptor_systems', 'Interceptor Network',
            'Faster interceptors that can run down supersonic threats before they cross clear.',
            'interceptor_mk2', [[P+'titanium_plate',28],[P+'ultimet_plate',7],[CIRC,14],[HV_RAM,2],[ENG,7],[TNT,7]], ['interceptor_mk2']],
        ['interceptor_ace', 'IV', -7, 3, 'interceptor_network', 'Ace Interceptor',
            'Competitive with all but the top evasive round — the premier point-defence round.',
            'interceptor_ace', [[P+'tungsten_steel_plate',28],[P+'titanium_plate',14],[CIRC,18],[HV_RAM,3],[ENG,7],[TNT,7]], ['interceptor_ace']],
        ['interceptor_cluster', 'IV', -5, 3, 'interceptor_network', 'Cluster Interceptor',
            'Airbursts into several small interceptors on engaging, to blunt a whole barrage in one shot.',
            'interceptor_cluster', [[P+'titanium_plate',10],[P+'aluminium_plate',6],[CIRC,4],[HV_RAM,3],[P+'hsss_round',14],[TNT,5]], ['interceptor_cluster']],
    ]

    NODES.forEach(([id, tier, x, y, requires, name, desc, icon, cost, unlocks]) => {
        const tpr = MIN[id] * 150              // ticksPerRun; RUNS x tpr = MIN[id] x 1200 ticks (= MIN minutes)
        const b = WFResearch.builder(id)
            .category('missiles').pos(x, y)
            .nodeColor(0xFFD8562F)
            .name(name)
            .description(desc)
            .runs(RUNS).ticksPerRun(tpr).eut(TIER[tier].eut).cwuPerRun((TIER[tier].eut / 2) * tpr)
            .icon(M(icon))
        if (requires) b.requires(requires)
        cost.forEach(([itemId, ct]) => {
            if (itemId === CIRC) b.itemTagPerRun(CIRC_TAG[tier], ct)   // circuit -> tier voltage tag
            else b.itemPerRun(Item.of(itemId, ct))
        })
        unlocks.forEach(n => b.unlock(M(n)))
        b.register()
    })

})
