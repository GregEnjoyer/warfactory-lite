// Ground vehicles research — category('armor') content:
//   - The per-vehicle progression GRAPH (veh_wheel, veh_sodayo … veh_prism)
//   - The ground component tree (veh_comp_<tier>_<part>)
// Runs in ServerEvents.recipes (fires on server start AND /reload).
ServerEvents.recipes(event => {

    // Item-cost helper: a leading '#' marks a TAG, otherwise an exact item.
    const addCost = (b, id, count) => (typeof id === 'string' && id.charAt(0) === '#')
        ? b.itemTagPerRun(id, count)
        : b.itemPerRun(Item.of(id, count))

    const pv = e => Item.of('wfcore:packaged_vehicle', '{entity:"' + e + '"}')

    // =========================== GROUND VEHICLE GRAPH ============================
    // ONE node PER vehicle, wired into a progression GRAPH (not tier groups). The ground-vehicle
    // COMPONENT tree (per-part, tiered) lives to the RIGHT of this graph (x>=2).
    // Each node unlocks + research-GATEs its own vehicle build
    // (gate applied per-entity in server_scripts/vehicle_factory.js via .research('<id>')).
    //
    // Progression:  Sodayo -> {Truck, Sodayo HMG, Sodayo MLRS};  Truck -> Kamaz;
    //   Sodayo HMG -> Humvee(MG);  Sodayo MLRS -> Humvee Mk19;
    //   either Humvee -> LAV-150 -> Bradley;  Bradley -> {ZTZ-99A tank, LAV-AD}.
    //
    // Tier sets eut/compute/time (runs x ticksPerRun(300), 20t = 1s): LV ~10 min, MV ~13, HV ~20,
    // EV ~22; compute LV 0 / MV ~64 / HV ~256 / EV ~1024 CWU/t (per CLAUDE.md).
    const VT = {  // tier -> [runs, eut, cwuPerRun, [itemPerRun...]]
        lv: [40,   32,   0,      [['gtceu:steel_gearbox', 2], ['gtceu:lv_electric_motor', 3], ['superbwarfare:wheel', 4]]],
        mv: [52,   128,  19200,  [['gtceu:aluminium_plate', 6], ['gtceu:mv_electric_motor', 2], ['#gtceu:circuits/mv', 2]]],
        hv: [80,   512,  76800,  [['gtceu:stainless_steel_plate', 6], ['gtceu:hv_electric_motor', 2], ['#gtceu:circuits/hv', 2]]],
        ev: [88,   2048, 307200, [['gtceu:titanium_plate', 6], ['gtceu:ev_electric_motor', 2], ['#gtceu:circuits/ev', 2]]],
        iv: [96,   8192, 1228800, [['gtceu:tungsten_steel_plate', 6], ['gtceu:iv_electric_motor', 2], ['#gtceu:circuits/iv', 2]]],  // ~4096 CWU/t = IV midpoint
    }

    // Central ROOT: every ground vehicle stems from Wheel research. (The vehicle COMPONENT tree is a
    // SEPARATE, independent tree to the right.)
    WFResearch.builder('veh_wheel')
        .category('armor').pos(-4, 0)
        .nodeColor(0xFF2F6BD8)
        .name('Wheels & Running Gear')
        .description('Pneumatic tyres and running gear, the foundation every ground vehicle is built on.')
        .runs(20).ticksPerRun(300).eut(32).cwuPerRun(0)
        .itemPerRun(Item.of('gtceu:steel_plate', 4))
        .itemPerRun(Item.of('gtceu:rubber_plate', 8))
        .unlock(Item.of('superbwarfare:wheel'))
        .icon(Item.of('superbwarfare:wheel'))
        .register()

    ;[
        { id: 'veh_sodayo',      ent: 'superbwarfare:sodayo_pick_up',        tier: 'lv', x: -4, y: 0, name: 'Sodayo Pickup',
          desc: 'The Sodayo TenEven9 civilian pickup — the root of the ground-vehicle line.', req: 'veh_wheel', any: null },
        { id: 'veh_truck',       ent: 'superbwarfare:truck',                 tier: 'lv', x: -6, y: 1, name: 'Cargo Truck',
          desc: 'A flatbed cargo truck for bulk resupply runs.', req: 'veh_sodayo', any: null },
        { id: 'veh_ural',        ent: 'mcsp:ural_green',                     tier: 'lv', x: -6, y: 2, name: 'Ural Hauler',
          desc: 'A heavy 6x6 Ural military hauler for bulk logistics.', req: 'veh_truck', any: null },
        { id: 'veh_sodayo_hmg',  ent: 'superbwarfare:sodayo_pick_up_hmg',    tier: 'mv', x: -4, y: 1, name: 'Sodayo HMG',
          desc: 'Sodayo pickup with a pintle-mounted heavy machine gun — the earliest gun truck.', req: 'veh_sodayo', any: null },
        { id: 'veh_sodayo_mlrs', ent: 'superbwarfare:sodayo_pick_up_rocket', tier: 'mv', x: -2, y: 1, name: 'Sodayo MLRS',
          desc: 'Sodayo pickup with a multiple rocket launcher firing grapeshot rockets.', req: 'veh_sodayo', any: null },
        { id: 'veh_humvee_mg',   ent: 'mcsp:humvee_sand',                    tier: 'mv', x: -4, y: 2, name: 'Humvee (MG)',
          desc: 'Armoured Humvee with a remote-weapon-station machine gun.', req: 'veh_sodayo_hmg', any: null },
        { id: 'veh_humvee_mk19', ent: 'mcsp:humvee_mk19',                    tier: 'mv', x: -2, y: 2, name: 'Humvee Mk19',
          desc: 'Armoured Humvee with a Mk19 automatic grenade launcher.', req: 'veh_sodayo_mlrs', any: null },
        { id: 'veh_lav',         ent: 'y',               tier: 'hv', x: -3, y: 3, name: 'LAV-150 Commando',
          desc: 'The first infantry fighting vehicle: a wheeled LAV-150 with a light cannon. Either Humvee leads here.', req: null, any: ['veh_humvee_mg', 'veh_humvee_mk19'] },
        { id: 'veh_bradley',     ent: 'superbwarfare:bradley',               tier: 'hv', x: -3, y: 4, name: 'M2 Bradley',
          desc: 'The M2 Bradley IFV with a TOW launcher and autocannon — the later, heavier IFV.', req: 'veh_lav', any: null },
        { id: 'veh_tank',        ent: 'superbwarfare:ztz_99a',               tier: 'ev', x: -4, y: 5, name: 'ZTZ-99A MBT',
          desc: 'The ZTZ-99A main battle tank: heavy armour and a large-caliber main gun.', req: 'veh_bradley', any: null },
        { id: 'veh_lav_ad',      ent: 'superbwarfare:lav_ad',                tier: 'hv', x: -2, y: 5, name: 'LAV-AD',
          desc: 'The LAV-AD air-defence vehicle: guided SAMs and an anti-air gun.', req: 'veh_bradley', any: null },
        { id: 'veh_plz',         ent: 'superbwarfare:plz_05',                tier: 'ev', x: 0,  y: 5, name: 'PLZ-05 SPG',
          desc: 'The PLZ-05 self-propelled howitzer: a tracked 155mm artillery piece — the third path off the Bradley.', req: 'veh_bradley', any: null },
        { id: 'veh_prism',       ent: 'superbwarfare:prism_tank',            tier: 'iv', x: -4, y: 6, name: 'Prism Tank',
          desc: 'The Prism Tank: an IV-tier energy MBT firing focused prismatic beams — the apex of the tank line, beyond the ZTZ-99A.', req: 'veh_tank', any: null },
    ].forEach(n => {
        const t = VT[n.tier]
        const b = WFResearch.builder(n.id)
            .category('armor').pos(n.x, n.y + 1)   // +1: row 0 is reserved for the veh_wheel root
            .nodeColor(0xFF2F6BD8)
            .name(n.name)
            .description(n.desc)
            .runs(t[0]).ticksPerRun(300).eut(t[1]).cwuPerRun(t[2])
            .icon(pv(n.ent))
            .unlock(pv(n.ent))
        t[3].forEach(it => addCost(b, it[0], it[1]))
        if (n.req) b.requires(n.req)
        if (n.any) b.anyOf(n.any)
        b.register()
    })

    // =========================== GROUND COMPONENT TREE ============================
    // Independent per-part tree living on the "Ground vehicles" tab (category 'armor'),
    // sitting to the RIGHT of the vehicle chain (x >= 2).
    //
    // Node id = veh_comp_<tier>_<part>; it both shows the part in the tree (.unlock) and gates that part's
    // assembler recipe (server_scripts/vehicles/components.js addCondition on the same id).

    // Ground vehicles consume exactly these five component families.
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
