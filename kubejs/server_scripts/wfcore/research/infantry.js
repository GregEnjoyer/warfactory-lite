// Infantry research tab — ONE research node PER GUN.
// Runs in ServerEvents.recipes (fires on server start AND /reload).
//
// DESIGN (per user):
//   * Each gun is its own node (node id = 'inf_' + the GunId short name).
//   * TIERS are chained through their ENTRY gun only — the next tier's entry
//     .requires() the previous tier's entry gun, so ONE gun bridges each tier.
//     Everything else in a tier is OPTIONAL depth you can pursue for better guns.
//   * WITHIN a tier the guns form a HYBRID TREE ordered weakest -> strongest
//     (chained where linear, branched where a real sub-family exists — e.g. the
//     assault tier splits into intermediate / modern / 7.62-NATO battle rifles).
//   * COST SCALES with hierarchy depth (`rank` = hops from the tier entry):
//     more runs / items, and on MV tiers more compute, the deeper you go.
//
// Tier entries & spine:  db_long (shotguns, LV, root)
//                          -> m1  (semi-auto rifles, LV)
//                               -> ak47 (assault rifles, MV)
//                                    -> m1918a2 (machine guns, MV)
//                          -> mp38 (SMGs, LV)   [branches off the shotgun root]
//
// COHERENCE: each gun's crafting recipe (guns/LV-MV-guns.js) is gated on its
// matching 'inf_<gun>' node, and every gun fires a caliber guns/ammo.js can make
// (see that file's audit note) — so "researchable" == "buildable + feedable".
ServerEvents.recipes(event => {

    const BLUE = 0xFF2F6BD8
    const gun = id => Item.of('tacz:modern_kinetic_gun',
        `{GunCurrentAmmoCount:2,GunId:"${id}",HasBulletInBarrel:1b}`)
    const nid = g => 'inf_' + g.split(':')[1]

    // Retire the old grouped nodes (the wfcore research registry persists across
    // /reload, so a node stops existing only if explicitly removed).
    ;['shotgun1', 'rifle1', 'SMG', 'rifle2', 'heavy1'].forEach(id => WFResearch.remove(id))

    // gun, name, description, requires(parent node id | null), x, y, tier, rank
    const NODES = [
        // ---- Shotguns (LV) — root tier -------------------------------------
        ['tacz:db_long', 'Break-Action Shotgun', 'A crude two-barrel break-action — the simplest way to put buckshot downrange.', null, 0, 0, 'lv', 0],
        ['ww:m1897',     'Winchester 1897',      'Browning\'s pump-action classic; a slam-fire trench broom.',                       nid('tacz:db_long'), 2, 0, 'lv', 1],
        ['tacz:m870',    'Remington 870',        'The refined pump-action workhorse — reliable close-quarters firepower.',           nid('ww:m1897'),      4, 0, 'lv', 2],

        // ---- Semi-automatic rifles (LV) — entry m1 bridges off db_long -----
        ['ww:m1',      'M1 Carbine', 'A light, fast-handling semi-auto in .30 Carbine — the tier gateway.',            nid('tacz:db_long'), 0, 3, 'lv', 0],
        ['ww:svt_40',  'SVT-40',     'The Soviet self-loader in full-power 7.62x54R.',                                 nid('ww:m1'),        2, 3, 'lv', 1],
        ['ww:m1g',     'M1 Garand',  'The premier semi-auto battle rifle of its era — an eight-round en-bloc punch.',  nid('ww:svt_40'),    4, 3, 'lv', 2],
        ['ww:g43',     'Gewehr 43',  'Germany\'s answer to the self-loading rifle, in 7.92x57 Mauser.',                nid('ww:svt_40'),    2, 4, 'lv', 2],

        // ---- Submachine guns (LV) — entry mp38 branches off the shotgun root
        ['ww:mp38',   'MP 38',         'The original folding-stock submachine gun — the SMG gateway.',       nid('tacz:db_long'), -3, 1, 'lv', 0],
        ['ww:sten',   'Sten',          'Cheap, stamped, and everywhere.',                                    nid('ww:mp38'),      -3, 2, 'lv', 1],
        ['ww:pps',    'PPS-43',        'A compact, high-rate Soviet SMG.',                                   nid('ww:sten'),      -3, 3, 'lv', 2],
        ['ww:m1a1',   'M1A1 Thompson', 'Hard-hitting .45 ACP in a heavy, controllable package.',            nid('ww:pps'),       -3, 4, 'lv', 3],
        ['ww:t100l',  'Type 100',      'The highest cyclic rate in the SMG line — the tier apex.',           nid('ww:m1a1'),      -3, 5, 'lv', 4],

        // ---- Assault rifles (MV) — entry ak47 bridges off m1 ---------------
        ['tacz:ak47',     'AK-47',      'The archetypal assault rifle — rugged, reliable, and the tier gateway.', nid('ww:m1'),        0, 6, 'mv', 0],
        ['tacz:type_81',  'Type 81',    'A refined Kalashnikov-pattern service rifle.',                          nid('tacz:ak47'),    2, 6, 'mv', 1],
        ['tacz:m16a1',    'M16A1',      'Lightweight 5.56 with a flat, fast trajectory.',                        nid('tacz:type_81'), 4, 6, 'mv', 2],
        ['tacz:m4a1',     'M4A1',       'The compact, modular carbine standard.',                                nid('tacz:m16a1'),   6, 6, 'mv', 3],
        ['ronmc:g36c',    'G36C',       'A short, handy polymer carbine.',                                       nid('tacz:m4a1'),    8, 5, 'mv', 4],
        ['tacz:aug',      'Steyr AUG',  'A bullpup with an integrated optic.',                                   nid('tacz:m4a1'),    8, 7, 'mv', 4],
        ['tacz:scar_l',   'SCAR-L',     'A modern modular 5.56 rifle.',                                          nid('tacz:ak47'),    2, 7, 'mv', 1],
        ['ronmc:ga416',   'HK416',      'A piston-driven precision carbine — the modern 5.56 apex.',             nid('tacz:scar_l'),  4, 7, 'mv', 2],
        ['tacz:hk_g3',    'HK G3',      'A hard-hitting 7.62 NATO battle rifle.',                                nid('tacz:ak47'),    2, 8, 'mv', 1],
        ['tacz:fn_fal',   'FN FAL',     '"The right arm of the free world" in 7.62 NATO.',                       nid('tacz:hk_g3'),   4, 8, 'mv', 2],

        // ---- Machine guns (MV) — entry m1918a2 bridges off ak47 -----------
        ['ww:m1918a2', 'BAR M1918A2', 'A walking-fire automatic rifle — the MG gateway.',           nid('tacz:ak47'),     0, 9,  'mv', 0],
        ['ww:dp28',    'DP-28',       'The pan-fed Soviet light machine gun.',                       nid('ww:m1918a2'),    2, 9,  'mv', 1],
        ['ww:mg34',    'MG34',        'The first true general-purpose machine gun.',                 nid('ww:dp28'),       4, 9,  'mv', 2],
        ['ww:mg42',    'MG42',        'The 1,300-RPM buzzsaw — the WW2 machine-gun apex.',           nid('ww:mg34'),       6, 9,  'mv', 3],
        ['tacz:rpk',   'RPK',         'A magazine-fed squad automatic on the AK pattern.',           nid('ww:m1918a2'),    2, 10, 'mv', 1],
        ['tacz:m249',  'M249 SAW',    'Belt-fed 5.56 for sustained suppressing fire.',               nid('tacz:rpk'),      4, 10, 'mv', 2],
    ]

    NODES.forEach(([g, name, desc, req, x, y, tier, rank]) => {
        const lv = tier === 'lv'
        const b = WFResearch.builder(nid(g))
            .category('infantry').pos(x, y)
            .nodeColor(BLUE)
            .name(name)
            .description(desc)
        if (req) b.requires(req)
        // cost scales with hierarchy depth (rank); MV tiers add compute.
        b.runs(lv ? 4 + 2 * rank : 8 + 2 * rank)
            .ticksPerRun(300)
            .eut(lv ? 32 : 90)
            .cwuPerRun(lv ? 0 : 4800 + 1200 * rank)   // MV: 16 CWU/t (entry) -> 32 CWU/t (apex)
        if (lv) {
            b.itemPerRun(Item.of('gtceu:steel_plate', 3 + rank))
            b.itemPerRun(Item.of('gtceu:small_steel_spring', 2 + rank))
            b.itemPerRun(Item.of('minecraft:gunpowder', 4))
        } else {
            b.itemPerRun(Item.of('gtceu:aluminium_plate', 5 + rank))
            b.itemTagPerRun('gtceu:circuits/mv', rank >= 2 ? 2 : 1)
            b.itemPerRun(Item.of('gtceu:small_steel_spring', 4 + rank))
        }
        b.unlocks(gun(g)).icon(gun(g)).register()
    })

    // ---- Heavy launchers — own sub-tree: M79 (LV) -> RPG (MV) -> {Javelin, Igla} (EV) ----
    // Man-portable heavy weapons. Crafting recipes gate on these nodes (guns/gun_parts.js);
    // their ammunition lives in guns/ammo.js (40mm grenades, RPG rockets, Javelin missile).
    WFResearch.builder('wpn_m79')
        .category('infantry').pos(11, 0)
        .nodeColor(BLUE)
        .name('M79 Grenade Launcher')
        .description('A break-action 40mm grenade launcher — the entry to the man-portable heavy-weapon line. Feeds on 40mm grenades (see Ballistics).')
        .runs(6).ticksPerRun(300).eut(32).cwuPerRun(0)
        .itemPerRun(Item.of('kubejs:heavy_barrel_steel', 2))
        .itemPerRun(Item.of('gtceu:treated_wood_plate', 3))
        .itemPerRun(Item.of('gtceu:small_steel_spring', 3))
        .unlocks(Item.of('superbwarfare:m_79')).icon(Item.of('superbwarfare:m_79')).register()

    WFResearch.builder('wpn_rpg')
        .category('infantry').pos(11, 2)
        .nodeColor(BLUE)
        .name('RPG-7')
        .description('The ubiquitous shoulder-fired rocket-propelled grenade launcher. Fires RPG rockets (see Ballistics).')
        .requires('wpn_m79')
        .runs(12).ticksPerRun(300).eut(128).cwuPerRun(19200)   // ~64 CWU/t = MV midpoint
        .itemPerRun(Item.of('gtceu:aluminium_plate', 6))
        .itemPerRun(Item.of('gtceu:small_steel_spring', 4))
        .itemTagPerRun('gtceu:circuits/mv', 1)
        .unlocks(Item.of('superbwarfare:rpg')).icon(Item.of('superbwarfare:rpg')).register()

    WFResearch.builder('wpn_javelin')
        .category('infantry').pos(10, 4)
        .nodeColor(BLUE)
        .name('FGM-148 Javelin')
        .description('A fire-and-forget top-attack anti-tank missile system. Fires the Javelin missile (see Ballistics).')
        .requires('wpn_rpg')
        .runs(20).ticksPerRun(300).eut(2048).cwuPerRun(307200)   // ~1024 CWU/t = EV midpoint
        .itemPerRun(Item.of('gtceu:titanium_plate', 8))
        .itemPerRun(Item.of('gtceu:tempered_glass', 4))
        .itemTagPerRun('gtceu:circuits/ev', 2)
        .unlocks(Item.of('superbwarfare:javelin')).icon(Item.of('superbwarfare:javelin')).register()

    WFResearch.builder('wpn_igla')
        .category('infantry').pos(12, 4)
        .nodeColor(BLUE)
        .name('IGLA-9K38 MANPADS')
        .description('A man-portable infrared-guided surface-to-air missile system for downing aircraft and drones.')
        .requires('wpn_rpg')
        .runs(20).ticksPerRun(300).eut(2048).cwuPerRun(307200)   // ~1024 CWU/t = EV midpoint
        .itemPerRun(Item.of('gtceu:titanium_plate', 8))
        .itemPerRun(Item.of('gtceu:tempered_glass', 4))
        .itemTagPerRun('gtceu:circuits/ev', 2)
        .unlocks(Item.of('superbwarfare:igla_9k38')).icon(Item.of('superbwarfare:igla_9k38')).register()

})
