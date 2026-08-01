// Ballistics research tab — all category('ballistics') nodes.
// Runs in ServerEvents.recipes (fires on server start AND /reload).
//
// STRUCTURE (top -> down):
//   Casings backbone : infantry_munitions_1 -> _2 (+ _3 heavy) -> large_casings
//   Component tier (MV, under large_casings):
//       missile_engines, seekers  +  FIVE warhead heads:
//         he_warheads       -> superbwarfare:he_head  (High Explosive)
//         ap_warheads       -> superbwarfare:ap_head  (Armor Piercing)
//         grapeshot_warheads-> superbwarfare:gs_head  (Grapeshot)
//         cluster_warheads  -> superbwarfare:cm_head  (Cluster Munitions)
//         pyrotechnics      -> superbwarfare:wp_head  (White Phosphorus / fire)
//   Munition tier — ONE ammo type per node. Every round CONSUMES its matching
//   *_head warhead (recipe in guns/ammo.js) and .requires() that warhead node
//   (rockets/missiles also require missile_engines / seekers), so the warhead is
//   always researched BEFORE the round that carries it.
//
// Mortar: the HE mortar bomb (mortar_shell) is an LV node with NO warhead — it
// keeps the LV Mortar emplacement fed from the start. The WP bomb
// (mortar_shell_wp) is a fire round, so it sits under Pyrotechnics.
ServerEvents.recipes(event => {

    // Item-cost helper: a leading '#' marks a TAG, otherwise an exact item.
    const addCost = (b, id, count) => (typeof id === 'string' && id.charAt(0) === '#')
        ? b.itemTagPerRun(id, count)
        : b.itemPerRun(Item.of(id, count))

    const BLUE = 0xFF2F6BD8
    const sbw = id => Item.of('superbwarfare:' + id)

    // =========================== CASINGS BACKBONE ============================
    // First ballistics node — "Infantry Munitions 1". Unlocks the pistol (small)
    // and rifle (medium) brass casing recipes (gated in guns/ammo.js). LV: no compute.
    WFResearch.builder('infantry_munitions_1')
        .category('ballistics').pos(0, 0)
        .nodeColor(BLUE)
        .name('Infantry Munitions 1')
        .description('Standardised brass cartridge casings for pistol and rifle calibres. Unlocks all pistol and rifle casing recipes.')
        .runs(15).ticksPerRun(300).eut(32).cwuPerRun(0)
        .itemPerRun(Item.of('gtceu:steel_plate', 10))
        .itemPerRun(Item.of('gtceu:bronze_plate', 10))
        .itemPerRun(Item.of('minecraft:gunpowder', 10))
        .unlocks(Item.of('kubejs:bullet_casing_small'), Item.of('kubejs:bullet_casing_medium'))
        .icon(Item.of('kubejs:bullet_casing_medium'))
        .register()

    // Infantry Munitions 2 — WW-era calibres + Superb Warfare rifle ammunition. LV.
    WFResearch.builder('infantry_munitions_2')
        .category('ballistics').pos(0, 1)
        .nodeColor(BLUE)
        .name('Infantry Munitions 2')
        .description('WW-era rifle and pistol calibres: 8mm Mauser, 7.62x54R, 6.5mm Arisaka, 7.63mm Mauser, 7.65mm Para, .303 British, 7.7mm Arisaka, .30 Carbine, 8mm pistol. Also unlocks Superb Warfare rifle ammunition.')
        .requires('infantry_munitions_1')
        .runs(10).ticksPerRun(300).eut(32).cwuPerRun(0)
        .unlocks(
            Item.of('tacz:ammo', '{AmmoId:"tacz:792x57"}'),
            Item.of('tacz:ammo', '{AmmoId:"tacz:762x54"}'),
            Item.of('tacz:ammo', '{AmmoId:"ww:65a"}'),
            Item.of('tacz:ammo', '{AmmoId:"ww:303"}'),
            Item.of('tacz:ammo', '{AmmoId:"ww:77a"}'),
            Item.of('tacz:ammo', '{AmmoId:"ww:763"}'),
            Item.of('tacz:ammo', '{AmmoId:"ww:765"}'),
            Item.of('tacz:ammo', '{AmmoId:"ww:8mm"}'),
            Item.of('tacz:ammo', '{AmmoId:"ww:30c"}'),
            Item.of('tacz:ammo', '{AmmoId:"tacz:9mm"}'),
            Item.of('tacz:ammo', '{AmmoId:"tacz:12g"}'),
            Item.of('superbwarfare:rifle_ammo')
        )
        .icon(Item.of('tacz:ammo', '{AmmoId:"tacz:792x57"}'))
        .register()

    // Infantry Munitions 3 — heavy/sniper small-arms tier (cheap MV). Heavy Rifle Casing + SBW heavy/sniper ammo.
    WFResearch.builder('infantry_munitions_3')
        .category('ballistics').pos(2, 1)
        .nodeColor(BLUE)
        .name('Infantry Munitions 3')
        .description('Heavy rifle cartridge cases and the .50/heavy rounds they feed: Superb Warfare heavy and sniper ammunition. Unlocks Heavy Rifle Casing production.')
        .requires('infantry_munitions_2')
        .runs(20).ticksPerRun(300).eut(90).cwuPerRun(7200)   // 24 CWU/t = cheap MV
        .itemPerRun(Item.of('gtceu:steel_plate', 8))
        .itemPerRun(Item.of('gtceu:copper_plate', 6))
        .itemPerRun(Item.of('minecraft:gunpowder', 16))
        .unlocks(sbw('heavy_ammo'), sbw('sniper_ammo'), Item.of('kubejs:bullet_casing_large'))
        .icon(sbw('heavy_ammo'))
        .register()

    // MV large-calibre casing gate — first ballistics node to require compute. Steel + XL (vehicle) casings.
    WFResearch.builder('large_casings')
        .category('ballistics').pos(0, 2)
        .nodeColor(BLUE)
        .name('Large Casings')
        .description('Heavy steel cartridge cases for autocannon- and vehicle-grade ammunition. Unlocks steel casing production and the vehicle (XL) brass casing line, and opens the warhead + propulsion tier.')
        .requires('infantry_munitions_2')
        .runs(25).ticksPerRun(360).eut(128).cwuPerRun(23040)   // ~64 CWU/t = MV midpoint
        .itemPerRun(Item.of('gtceu:steel_plate', 10))
        .itemPerRun(Item.of('superbwarfare:primer', 8))
        .itemPerRun(Item.of('minecraft:gunpowder', 10))
        .unlocks(Item.of('kubejs:steel_bullet_casing'), Item.of('kubejs:bullet_casing_xl'))
        .icon(Item.of('kubejs:steel_bullet_casing'))
        .register()

    // Mortar Bombs (HE) — LV, muzzle-loaded, NO warhead. Keeps the LV Mortar emplacement fed immediately.
    WFResearch.builder('mortar_shell')
        .category('ballistics').pos(-2, 0)
        .nodeColor(BLUE)
        .name('Mortar Bombs')
        .description('Muzzle-loaded high-explosive mortar bombs for the man-portable Mortar. Unlocks HE mortar bomb production.')
        .requires('infantry_munitions_1')
        .runs(12).ticksPerRun(300).eut(32).cwuPerRun(0)
        .itemPerRun(Item.of('gtceu:steel_plate', 4))
        .itemPerRun(Item.of('minecraft:gunpowder', 8))
        .unlock(sbw('mortar_shell'))
        .icon(sbw('mortar_shell'))
        .register()

    // ===================== COMPONENT TIER (MV, y=3) =====================
    // Propulsion + guidance cores (consumed by rockets / guided missiles / drones).
    WFResearch.builder('missile_engines')
        .category('ballistics').pos(2, 3)
        .nodeColor(BLUE)
        .name('Missile Engines')
        .description('Solid-propellant rocket motors — the propulsion core of every rocket and guided missile. Unlocks Missile Engine production.')
        .requires('large_casings')
        .runs(20).ticksPerRun(360).eut(128).cwuPerRun(23040)   // ~64 CWU/t = MV midpoint
        .itemPerRun(Item.of('gtceu:steel_plate', 6))
        .itemPerRun(Item.of('kubejs:solid_rocket_fuel', 2))
        .itemPerRun(Item.of('gtceu:steel_rod', 4))
        .itemTagPerRun('gtceu:circuits/mv', 1)
        .unlock(sbw('missile_engine'))
        .icon(sbw('missile_engine'))
        .register()

    WFResearch.builder('seekers')
        .category('ballistics').pos(4, 3)
        .nodeColor(BLUE)
        .name('Guidance Seekers')
        .description('Infrared / radar seeker heads that let a missile track its target — the guidance core of every guided missile, SAM and smart mine. Unlocks Seeker production.')
        .requires('large_casings')
        .runs(22).ticksPerRun(360).eut(128).cwuPerRun(23040)   // ~64 CWU/t = MV midpoint
        .itemPerRun(Item.of('gtceu:lv_sensor', 1))
        .itemPerRun(Item.of('gtceu:lv_emitter', 1))
        .itemPerRun(Item.of('gtceu:tempered_glass', 2))
        .itemTagPerRun('gtceu:circuits/mv', 2)
        .unlock(sbw('seeker'))
        .icon(sbw('seeker'))
        .register()

    // FIVE warhead heads — the explosive payload cores. Each unlocks a superbwarfare:*_head item
    // (GT recipe in guns/ammo.js) that its munition family CONSUMES. MV midpoint compute.
    ;[
        { id: 'he_warheads', x: -8, head: 'he_head', name: 'High Explosive Warheads',
          desc: 'High-explosive filler warheads — the payload of HE shells, rockets, aerial bombs and fragmentation missiles.',
          cost: [['gtceu:steel_plate', 6], ['minecraft:gunpowder', 12], ['gtceu:sulfur_dust', 4]] },
        { id: 'ap_warheads', x: -6, head: 'ap_head', name: 'Armor Piercing Warheads',
          desc: 'Dense tungsten-cored penetrator warheads for AP shells, AP rockets and anti-tank missiles.',
          cost: [['gtceu:steel_plate', 6], ['gtceu:tungsten_plate', 2], ['minecraft:gunpowder', 8]] },
        { id: 'grapeshot_warheads', x: -4, head: 'gs_head', name: 'Grapeshot Warheads',
          desc: 'Canister warheads that burst into a cloud of shot — the payload of small- and large-calibre grapeshot shells.',
          cost: [['gtceu:steel_plate', 6], ['gtceu:lead_nugget', 12], ['minecraft:gunpowder', 8]] },
        { id: 'cluster_warheads', x: -2, head: 'cm_head', name: 'Cluster Munitions',
          desc: 'Submunition-dispensing cluster warheads for large-calibre cluster shells and cluster rockets.',
          cost: [['gtceu:steel_plate', 8], ['gtceu:dynamite', 4], ['minecraft:gunpowder', 12]] },
        { id: 'pyrotechnics', x: 0, head: 'wp_head', name: 'Pyrotechnics',
          desc: 'White-phosphorus incendiary warheads — the payload of every fire round: WP shells and WP mortar bombs.',
          cost: [['gtceu:steel_plate', 6], ['minecraft:blaze_powder', 4], ['minecraft:gunpowder', 8]] },
    ].forEach(w => {
        const b = WFResearch.builder(w.id)
            .category('ballistics').pos(w.x, 3)
            .nodeColor(BLUE)
            .name(w.name)
            .description(w.desc)
            .requires('large_casings')
            .runs(20).ticksPerRun(360).eut(128).cwuPerRun(23040)   // ~64 CWU/t = MV midpoint
            .unlock(sbw(w.head))
            .icon(sbw(w.head))
        w.cost.forEach(it => addCost(b, it[0], it[1]))
        b.register()
    })

    // ===================== MUNITION TIER (one ammo per node) =====================
    // Generic builder: id, ammo output, tree position, prereqs (array), tier, cost.
    // tier -> [runs, eut, cwuPerRun @360t]: MV ~64 / HV ~256 / EV ~1024 CWU/t.
    const MT = { mv: [128, 23040], hv: [512, 92160], ev: [2048, 368640] }
    const munition = (n) => {
        const t = MT[n.tier]
        const b = WFResearch.builder(n.id)
            .category('ballistics').pos(n.x, n.y)
            .nodeColor(BLUE)
            .name(n.name)
            .description(n.desc)
            .requires(n.req)
            .runs(n.runs).ticksPerRun(360).eut(t[0]).cwuPerRun(t[1])
            .unlock(sbw(n.out))
            .icon(sbw(n.out))
        n.cost.forEach(it => addCost(b, it[0], it[1]))
        b.register()
    }

    // --- Small vehicle shells (MV) — steel casing + head ---
    ;[
        { id: 'high_explosive_1', out: 'small_shell_he', x: -8, y: 4, req: ['he_warheads'], name: 'Small HE Shells',
          desc: 'High-explosive rounds for small-calibre vehicle cannons. Unlocks the Small Caliber HE Shell.',
          runs: 25, cost: [['gtceu:steel_plate', 8], ['superbwarfare:primer', 8]] },
        { id: 'armor_piercing_1', out: 'small_shell_ap', x: -6, y: 4, req: ['ap_warheads'], name: 'Small AP Shells',
          desc: 'Hardened penetrators for small-calibre vehicle cannons. Unlocks the Small Caliber AP Shell.',
          runs: 25, cost: [['kubejs:steel_bullet_casing', 2], ['superbwarfare:primer', 4]] },
        { id: 'grapeshot_1', out: 'small_shell_gs', x: -4, y: 4, req: ['grapeshot_warheads'], name: 'Small Grapeshot Shells',
          desc: 'Multi-projectile canister loads that shred infantry at close range. Unlocks the Small Caliber Grapeshot Shell.',
          runs: 20, cost: [['kubejs:steel_bullet_casing', 2], ['superbwarfare:primer', 4]] },
        { id: 'anti_air_1', out: 'small_shell_aa', x: -9, y: 4, req: ['he_warheads'], name: 'Small Anti-Air Shells',
          desc: 'Proximity-fuzed fragmentation rounds for air defence (H/PJ-11 CIWS, LAV-AD). Unlocks the Small Caliber Anti-Air Shell.',
          runs: 25, cost: [['kubejs:steel_bullet_casing', 2], ['#gtceu:circuits/lv', 2]] },
    ].forEach(n => { n.tier = 'mv'; munition(n) })

    // --- Large tank/artillery shells (EV) — XL casing + head + grain ---
    ;[
        { id: 'large_shell_he', out: 'large_shell_he', x: -8, y: 5, req: ['high_explosive_1'], name: 'Large HE Shells',
          desc: 'Tank and artillery main-gun high-explosive rounds. Unlocks the Large Caliber HE Shell.' },
        { id: 'large_shell_ap', out: 'large_shell_ap', x: -6, y: 5, req: ['armor_piercing_1'], name: 'Large AP Shells',
          desc: 'Tank main-gun armour-piercing rounds. Unlocks the Large Caliber AP Shell.' },
        { id: 'large_shell_gs', out: 'large_shell_gs', x: -4, y: 5, req: ['grapeshot_1'], name: 'Large Grapeshot Shells',
          desc: 'Large-calibre canister rounds for close defence. Unlocks the Large Caliber Grapeshot Shell.' },
        { id: 'large_shell_cm', out: 'large_shell_cm', x: -2, y: 4, req: ['cluster_warheads'], name: 'Large Cluster Shells',
          desc: 'Large-calibre cluster-munition rounds. Unlocks the Large Caliber Cluster Shell.' },
        { id: 'large_shell_wp', out: 'large_shell_wp', x: 0, y: 4, req: ['pyrotechnics'], name: 'Large White Phosphorus Shells',
          desc: 'Large-calibre white-phosphorus incendiary rounds. Unlocks the Large Caliber WP Shell.' },
    ].forEach(n => { n.tier = 'ev'; n.runs = 30; n.cost = [['gtceu:steel_plate', 12], ['superbwarfare:primer', 10], ['superbwarfare:grain', 8]]; munition(n) })

    // --- Unguided rockets (MV) — missile engine + head. The head item enforces the warhead research;
    //     the tree edge is the propulsion line (small_rocket -> the medium rockets) to keep the graph clean. ---
    ;[
        { id: 'small_rocket', out: 'small_rocket', x: 2, y: 4, req: ['missile_engines'], name: 'Small Rockets',
          desc: 'Folding-fin HE rockets fired by helicopters and the Sodayo MLRS. Unlocks the Small Caliber Rocket.' },
        { id: 'medium_rocket_he', out: 'medium_rocket_he', x: 1, y: 5, req: ['small_rocket'], name: 'Medium HE Rockets',
          desc: 'Medium-calibre high-explosive rockets for the Type-63 MLRS. Unlocks the Medium Caliber HE Rocket.' },
        { id: 'medium_rocket_ap', out: 'medium_rocket_ap', x: 2, y: 5, req: ['small_rocket'], name: 'Medium AP Rockets',
          desc: 'Medium-calibre armour-piercing rockets for the Type-63 MLRS. Unlocks the Medium Caliber AP Rocket.' },
        { id: 'medium_rocket_cm', out: 'medium_rocket_cm', x: 3, y: 5, req: ['small_rocket'], name: 'Medium Cluster Rockets',
          desc: 'Medium-calibre cluster-munition rockets for the Type-63 MLRS. Unlocks the Medium Caliber Cluster Rocket.' },
    ].forEach(n => { n.tier = 'mv'; n.runs = 22; n.cost = [['gtceu:steel_plate', 8], ['superbwarfare:missile_engine', 2], ['kubejs:solid_rocket_fuel', 2]]; munition(n) })

    // --- Aerial bombs (MV) — HE head + fin ring. Own column left of the HE shells; small -> medium chain. ---
    ;[
        { id: 'small_aerial_bomb', out: 'small_aerial_bomb', x: -10, y: 4, req: ['he_warheads'], name: 'Small Aerial Bombs',
          desc: 'Small gravity high-explosive bombs for the Ju-87 Stuka. Unlocks the Small Aerial Bomb.' },
        { id: 'medium_aerial_bomb', out: 'medium_aerial_bomb', x: -10, y: 5, req: ['small_aerial_bomb'], name: 'Medium Aerial Bombs',
          desc: 'Medium gravity high-explosive bombs for the Ju-87 Stuka. Unlocks the Medium Aerial Bomb.' },
    ].forEach(n => { n.tier = 'mv'; n.runs = 20; n.cost = [['gtceu:steel_plate', 10], ['gtceu:steel_ring', 2], ['minecraft:gunpowder', 8]]; munition(n) })

    // --- WP mortar bomb (Pyrotechnics, MV) — fire round. Sits beside the Large WP shell under Pyrotechnics. ---
    munition({
        id: 'mortar_shell_wp', out: 'mortar_shell_wp', x: 1, y: 4, req: ['pyrotechnics'], name: 'White Phosphorus Mortar',
        desc: 'White-phosphorus incendiary mortar bombs. Unlocks the WP Mortar Bomb.',
        tier: 'mv', runs: 15, cost: [['gtceu:steel_plate', 4], ['superbwarfare:wp_head', 2], ['minecraft:gunpowder', 6]],
    })

    // --- Guided missiles. Single spine off Seekers (warhead enforced by the consumed head item). ---
    ;[
        { id: 'anti_ground_missiles', out: 'medium_anti_ground_missile', x: 4, y: 4, req: ['seekers'],
          tier: 'mv', runs: 25, name: 'Anti-Ground Missiles',
          desc: 'Wire-/laser-guided anti-tank missiles (TOW class) fired by gun trucks, the Bradley and the TOW launcher. Unlocks the Medium Anti-Ground Missile.',
          cost: [['gtceu:stainless_steel_plate', 6], ['superbwarfare:missile_engine', 2], ['superbwarfare:seeker', 1]] },
        { id: 'heavy_anti_ground_missiles', out: 'large_anti_ground_missile', x: 4, y: 5, req: ['anti_ground_missiles'],
          tier: 'hv', runs: 28, name: 'Heavy Anti-Ground Missiles',
          desc: 'Large-diameter guided anti-tank missiles for attack helicopters: the Large Anti-Ground Missile fired from the Mi-28.',
          cost: [['gtceu:titanium_plate', 6], ['superbwarfare:large_motor', 1], ['superbwarfare:seeker', 2]] },
        { id: 'anti_air_missiles', out: 'medium_anti_air_missile', x: 5, y: 5, req: ['anti_ground_missiles'],
          tier: 'hv', runs: 30, name: 'Anti-Air Missiles',
          desc: 'Radar-/IR-guided surface-to-air missiles for the LAV-AD air-defence vehicle. Unlocks the Medium Anti-Air Missile.',
          cost: [['gtceu:stainless_steel_plate', 8], ['superbwarfare:missile_engine', 2], ['superbwarfare:seeker', 2]] },
    ].forEach(munition)

    // --- Nuclear Bomb (IV APEX) — the B-2 Spirit's strategic payload (AshVehicle: ashvehicle:nuclearbombitem).
    //     BY FAR the most expensive munition to develop: IV compute + a fissile core, capping the aerial-bomb
    //     column (small bomb -> medium bomb -> NUKE). Not routed through munition() — different namespace + IV tier. ---
    WFResearch.builder('nuclear_bomb')
        .category('ballistics').pos(-10, 6)
        .nodeColor(BLUE)
        .name('Nuclear Bomb')
        .description('The B-2 Spirit\'s strategic payload: an implosion-type fission gravity bomb. The single most expensive round in the arsenal to develop — an IV-tier fissile weapon capping the aerial-bomb line.')
        .requires('medium_aerial_bomb')
        .runs(40).ticksPerRun(360).eut(8192).cwuPerRun(1474560)   // ~4096 CWU/t = IV midpoint
        .itemPerRun(Item.of('gtceu:uranium_235_block', 1))
        .itemPerRun(Item.of('gtceu:double_beryllium_plate', 2))
        .itemPerRun(Item.of('gtceu:hsss_plate', 4))
        .itemPerRun(Item.of('superbwarfare:he_head', 2))
        .itemTagPerRun('gtceu:circuits/iv', 1)
        .unlock(Item.of('ashvehicle:nuclearbombitem'))
        .icon(Item.of('ashvehicle:nuclearbombitem'))
        .register()

})
