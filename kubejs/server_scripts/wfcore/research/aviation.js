// Aviation research — the whole "Aviation" tab (category 'air').
// Contains:
//   - Aviation vehicle GRAPH (air_propellers, air_ju_87, air_a_10, air_ah_6, air_mh_60, air_mi_28)
//   - Drone Tactics sub-tree (drone_tactics, drone_swarm, drone_lucas, drone_loitering, drone_fpv, …)
//   - Aviation component tree (air_comp_<tier>_<part>) — MV through EV only.
//     The LV tier (air_comp_lv_air_frame / _wing / _cockpit) has been REMOVED because aviation is
//     an MV-and-up branch. MV component nodes are roots (no anyOf); HV anyOf's MV, EV anyOf's HV.
//
// Runs in ServerEvents.recipes (fires on server start AND /reload).
ServerEvents.recipes(event => {

    // Item-cost helper: leading '#' => item TAG, else exact item.
    const addCost = (b, id, ct) => (typeof id === 'string' && id.charAt(0) === '#')
        ? b.itemTagPerRun(id, ct)
        : b.itemPerRun(Item.of(id, ct))
    const title = s => s.split('_').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ')
    const pv = e => Item.of('wfcore:packaged_vehicle', '{entity:"' + e + '"}')

    // ======================= AVIATION VEHICLE GRAPH =======================
    // tier -> [runs, eut, cwuPerRun(@300t), [itemPerRun...]]  (midpoints: MV ~64, HV ~256, EV ~1024 CWU/t)
    const AVT = {
        mv: [52, 128,  19200,  [['gtceu:aluminium_plate', 6],       ['superbwarfare:propeller', 4],       ['#gtceu:circuits/mv', 2]]],
        hv: [80, 512,  76800,  [['gtceu:stainless_steel_plate', 6], ['superbwarfare:large_propeller', 2], ['#gtceu:circuits/hv', 2]]],
        ev: [88, 2048, 307200, [['gtceu:titanium_plate', 6],        ['gtceu:ev_electric_motor', 2],       ['#gtceu:circuits/ev', 2]]],
        iv: [96, 8192, 1228800,[['gtceu:tungsten_steel_plate', 6],  ['superbwarfare:large_propeller', 2], ['#gtceu:circuits/iv', 2]]],  // ~4096 CWU/t = IV midpoint
    }

    // Central ROOT: every aircraft (and the drone tree) stems from Propeller research. Unlocks the small +
    // large propeller cutter/assembler recipes (vehicles/parts.js) and splits the fixed-/rotary-wing lines.
    WFResearch.builder('air_propellers')
        .category('air').pos(-3, 0)
        .nodeColor(0xFF2F6BD8)
        .name('Propellers')
        .description('Small and large aircraft propellers — the foundation every airframe is built on. Splits into the fixed-wing and rotary-wing lines.')
        .runs(40).ticksPerRun(300).eut(128).cwuPerRun(19200)
        .itemPerRun(Item.of('gtceu:aluminium_plate', 6))
        .itemPerRun(Item.of('gtceu:polytetrafluoroethylene_plate', 2))
        .itemTagPerRun('gtceu:circuits/mv', 2)
        .unlocks(Item.of('superbwarfare:propeller'), Item.of('superbwarfare:large_propeller'))
        .icon(Item.of('superbwarfare:large_propeller'))
        .register()

    ;[
        // Fixed-wing line (bombers / attack jets)
        { id: 'air_ju_87', ent: 'superbwarfare:ju_87', tier: 'mv', x: -5, y: 1, req: 'air_propellers', name: 'Ju-87 Stuka',
          desc: 'The Ju-87 "Stuka" dive bomber: 2 crew, 250 HP. Carries rifle ammunition plus small and medium aerial bombs. The MV entry of the fixed-wing line.' },
        { id: 'air_a_10',  ent: 'superbwarfare:a_10a', tier: 'hv', x: -5, y: 2, req: 'air_ju_87', name: 'A-10 Thunderbolt II',
          desc: 'The A-10 close-air-support attack jet: a heavy autocannon plus a wing of ordnance. The HV step past the Stuka.' },
        { id: 'air_hercules', ent: 'ashvehicle:c130',   tier: 'ev', x: -5, y: 3, req: 'air_a_10',    name: 'C-130 Hercules',
          desc: 'The C-130 Hercules heavy transport: a four-engine turboprop hauler and the EV step of the fixed-wing line. Upgrades into the AC-130U Spooky II gunship.' },
        { id: 'air_spooky',   ent: 'ashvehicle:ac130u', tier: 'ev', x: -6, y: 4, req: 'air_hercules', name: 'AC-130U Spooky II',
          desc: 'The AC-130U Spooky II gunship: a Hercules airframe bristling with side-firing cannons — the gunship upgrade of the C-130.' },
        { id: 'air_b2',       ent: 'ashvehicle:b-2',     tier: 'iv', x: -5, y: 4, req: 'air_hercules', name: 'B-2 Spirit',
          desc: 'The B-2 Spirit stealth bomber: a flying-wing strategic bomber and the IV-tier apex of the fixed-wing line.' },
        // Rotary-wing line (helicopters)
        { id: 'air_ah_6',  ent: 'superbwarfare:ah_6',  tier: 'mv', x: -3, y: 1, req: 'air_propellers', name: 'AH-6 Little Bird',
          desc: 'The AH-6 Little Bird light attack helicopter: 4 crew, 250 HP. Armed with a 20mm cannon (Small Caliber HE Shell) and Small Caliber Rockets. The MV entry of the rotary line.' },
        { id: 'air_mh_60', ent: 'ashvehicle:mh_60m',   tier: 'hv', x: -3, y: 2, req: 'air_ah_6', name: 'MH-60M Black Hawk',
          desc: 'The MH-60M Black Hawk transport/gunship: 7 crew, 250 HP. Door guns firing Small Caliber AP Shells plus Small Caliber Rockets.' },
        { id: 'air_mi_28', ent: 'superbwarfare:mi_28', tier: 'ev', x: -3, y: 3, req: 'air_mh_60', name: 'Mi-28 Attack Helicopter',
          desc: 'The Mi-28 dedicated tank-hunter: 2 crew, 350 HP. A 30mm cannon, rockets and up to large anti-ground / anti-air missiles — the apex of the rotary line.' },
    ].forEach(n => {
        const t = AVT[n.tier]
        const b = WFResearch.builder(n.id)
            .category('air').pos(n.x, n.y)
            .nodeColor(0xFF2F6BD8)
            .name(n.name)
            .description(n.desc)
            .runs(t[0]).ticksPerRun(300).eut(t[1]).cwuPerRun(t[2])
            .icon(pv(n.ent))
            .unlock(pv(n.ent))
            .requires(n.req)
        t[3].forEach(it => addCost(b, it[0], it[1]))
        b.register()
    })

    // ======================= DRONE TACTICS SUB-TREE =======================
    // Hub gate: needs Propellers AND at least one MV aircraft (Ju-87 OR AH-6). Unlocks the Monitor control
    // tablet + the base recon Drone (gated in guns/ammo.js). Its children unlock the swarm / LUCAS / Shahed /
    // FPV lines. All drone recipes are added in wfcore/drones.js (Monitor/LUCAS/FPV/upgrades) and ammo.js
    // (base Drone / Swarm Drone), gated on these ids.
    WFResearch.builder('drone_tactics')
        .category('air').pos(-1, 1)
        .nodeColor(0xFF2F6BD8)
        .name('Drone Tactics')
        .description('Remote-piloting doctrine: the Monitor control tablet and the base reconnaissance Drone. Opens the fixed-wing (LUCAS, Shahed) and FPV drone lines. FPV and base drones charge from GregTech batteries or the WFCore Vehicle Charger.')
        .requires('air_propellers')
        .anyOf('air_ju_87', 'air_ah_6')
        .runs(30).ticksPerRun(300).eut(128).cwuPerRun(19200)   // MV hub (~64 CWU/t)
        .itemPerRun(Item.of('gtceu:aluminium_plate', 4))
        .itemPerRun(Item.of('superbwarfare:propeller', 4))
        .itemTagPerRun('gtceu:circuits/mv', 2)
        .unlocks(Item.of('superbwarfare:monitor'), Item.of('superbwarfare:drone'))
        .icon(Item.of('superbwarfare:monitor'))
        .register()

    // Drone leaf/branch nodes.
    // Mostly HV (~256 CWU/t) — drones are an HV-grade doctrine once the Monitor exists.
    const C_MV = '#gtceu:circuits/mv', C_HV = '#gtceu:circuits/hv'
    ;[
        ['drone_swarm', -2, 2, 'drone_tactics', 512, 76800, 40, 'Swarm Drones',
            'Kamikaze quadcopters that dive onto a marked target and detonate. Built from a base Drone plus a seeker and a warhead.',
            'superbwarfare:swarm_drone', ['superbwarfare:swarm_drone'],
            [['gtceu:aluminium_plate', 4], ['superbwarfare:seeker', 1], [C_HV, 2]]],
        ['drone_lucas', 0, 3, 'drone_tactics', 512, 76800, 40, 'LUCAS Attack Drone',
            'A low-cost one-way fixed-wing attack drone. Runs on gasoline through the WFCore fuel override (drop a GT fuel cell in its bay), and shares the Monitor / fiber-optic / spotlight stack.',
            'sbwdroneconfig:lucas_drone', ['sbwdroneconfig:lucas_drone'],
            [['gtceu:aluminium_plate', 6], ['superbwarfare:large_propeller', 1], [C_HV, 2]]],
        ['drone_loitering', 0, 2, 'drone_tactics', 512, 76800, 45, 'Shahed Loitering Drones',
            'The Shahed family of cheap long-range loitering munitions: strike (HE), gas and inert loiter variants. Built at the Missile Factory; also surfaced on the Missiles tab (Missile Systems).',
            'wfcore:missile_strike_drone',
            ['wfcore:missile_strike_drone', 'wfcore:missile_gas_drone', 'wfcore:missile_loiter_drone'],
            [['gtceu:aluminium_plate', 8], ['superbwarfare:missile_engine', 2], [C_HV, 2]]],
        ['drone_fpv', -1, 3, 'drone_tactics', 512, 76800, 45, 'FPV Drones',
            'Hover-capable first-person-view scout drones with precise low-speed control. Charged by GregTech batteries or the WFCore Vehicle Charger. Splits into the FPV upgrade modules.',
            'sbwdroneconfig:cubed_fpv_drone', ['sbwdroneconfig:cubed_fpv_drone'],
            [['gtceu:aluminium_plate', 4], ['superbwarfare:motor', 4], [C_MV, 2]]],
        // FPV upgrade modules (children of drone_fpv) — the drone-inventory / countermeasure kit.
        ['drone_fpv_spotlight', -2, 4, 'drone_fpv', 512, 76800, 24, 'FPV Spotlight',
            'A spotlight module for the FPV drone inventory — lights up night search missions at the cost of extra battery drain.',
            'sbwdroneconfig:spotlight_module', ['sbwdroneconfig:spotlight_module'],
            [['gtceu:aluminium_plate', 2], ['minecraft:glowstone_dust', 4], [C_HV, 1]]],
        ['drone_fpv_fiber', -1, 4, 'drone_fpv', 512, 76800, 24, 'Fiber-Optic Link',
            'A fiber-optic spool upgrade that switches the FPV link from wireless to cable — immune to jammers, but the link drops if the cable snaps.',
            'sbwdroneconfig:fiber_optic_spool_upgrade', ['sbwdroneconfig:fiber_optic_spool_upgrade'],
            [['gtceu:polytetrafluoroethylene_plate', 2], ['gtceu:copper_single_cable', 8], [C_HV, 1]]],
        ['drone_fpv_jammer', 0, 4, 'drone_fpv', 512, 76800, 30, 'Drone Jammer',
            'A handheld drone radar / RF jammer — scan for hostile FPV, LUCAS and Superb Warfare drones, then jam their control link.',
            'sbwdroneconfig:drone_jammer', ['sbwdroneconfig:drone_jammer'],
            [['gtceu:stainless_steel_plate', 3], ['superbwarfare:seeker', 1], [C_HV, 2]]],
    ].forEach(n => {
        const [id, x, y, req, eut, cwu, runs, name, desc, icon, unlocks, cost] = n
        const b = WFResearch.builder(id)
            .category('air').pos(x, y)
            .nodeColor(0xFF2F6BD8)
            .name(name)
            .description(desc)
            .requires(req)
            .runs(runs).ticksPerRun(300).eut(eut).cwuPerRun(cwu)
            .icon(Item.of(icon))
        unlocks.forEach(u => b.unlock(Item.of(u)))
        cost.forEach(it => addCost(b, it[0], it[1]))
        b.register()
    })

    // ======================= AVIATION COMPONENT TREE =======================
    // Independent per-part tree to the RIGHT of the graph. Aviation-exclusive parts only:
    // air_frame / wing / rotor / cockpit. Engine / weapons_system / cannon_barrel are SHARED with ground
    // vehicles and stay gated on the ground veh_comp_* nodes.
    // Node id = air_comp_<tier>_<part>; gates that part's assembler recipe in vehicles/components.js.
    //
    // LV tier REMOVED — aviation is MV-and-up. MV nodes are ROOTS (no anyOf).
    // HV anyOf's MV parts; EV anyOf's HV parts — unchanged.
    // Rotor has no LV recipe (it entered at MV even before), so all four parts exist from MV up.
    const AIR_PARTS_BY_TIER = {
        mv: ['air_frame', 'wing', 'rotor', 'cockpit'],
        hv: ['air_frame', 'wing', 'rotor', 'cockpit'],
        ev: ['air_frame', 'wing', 'rotor', 'cockpit'],
    }
    const COLX = { air_frame: 2, wing: 3, rotor: 4, cockpit: 5 }
    // [ tier, y, runs, eut, cwuPerRun(@200t), prevTier, plate, circuit ]
    // MV prevTier = null -> root nodes (no anyOf). HV prevTier = 'mv', EV prevTier = 'hv'.
    const CTIERS = [
        ['mv', 1, 8,  128,  12800,  null, 'gtceu:aluminium_plate',       'gtceu:good_electronic_circuit'],
        ['hv', 2, 10, 512,  51200,  'mv', 'gtceu:stainless_steel_plate', 'gtceu:basic_integrated_circuit'],
        ['ev', 3, 12, 2048, 204800, 'hv', 'gtceu:titanium_plate',        'gtceu:good_integrated_circuit'],
    ]
    CTIERS.forEach(row => {
        const tier = row[0], y = row[1], runs = row[2], eut = row[3], cwu = row[4]
        const prev = row[5], plate = row[6], circuit = row[7]
        AIR_PARTS_BY_TIER[tier].forEach(part => {
            const item = 'kubejs:' + tier + '_' + part
            const node = WFResearch.builder('air_comp_' + tier + '_' + part)
                .category('air').pos(COLX[part], y)
                .nodeColor(0xFF2F6BD8)
                .runs(runs).ticksPerRun(200).eut(eut).cwuPerRun(cwu)
                .itemPerRun(Item.of(plate, 4))
                .itemPerRun(Item.of(circuit, 1))
                .unlock(Item.of(item))
                .icon(Item.of(item))
                .name(tier.toUpperCase() + ' ' + title(part))
                .description('Assembler blueprint for the ' + tier.toUpperCase() + '-tier ' + title(part)
                    + ' used in aircraft assembly.')
            // Any ONE aviation component of the previous tier unlocks this tier's components.
            // MV has no prev (null), so MV nodes are roots.
            if (prev) node.anyOf(AIR_PARTS_BY_TIER[prev].map(p => 'air_comp_' + prev + '_' + p))
            node.register()
        })
    })

})
