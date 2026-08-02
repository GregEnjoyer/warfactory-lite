// Ballistics research tab – all category('ballistics') nodes.
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
//   Munition tier – ONE ammo type per node. Every round CONSUMES its matching
//   *_head warhead (recipe in guns/ammo.js) and .requires() that warhead node
//   (rockets/missiles also require missile_engines / seekers), so the warhead is
//   always researched BEFORE the round that carries it.
//
// Mortar: the HE mortar bomb (mortar_shell) and the 40mm grenades (grenade_40mm) are both
// HE-warhead children – they .requires('he_warheads'). The WP mortar bomb (mortar_shell_wp)
// is a fire round, so it sits under Pyrotechnics.
//
// EDIT VALUES PER NODE: every node below is written out in full (no loops) so its
// runs / eut / compute / item cost can be tuned individually. Shared reference values
// live in the constants block just below.

// =========================== SHARED CONSTANTS ===========================
var BLUE = 0xFF2F6BD8
const sbw = id => Item.of('superbwarfare:' + id)

// Tier voltage (EU/t) — the machine tier a node is meant to be cleared at.
var EU_LV = 32
var EU_MV = 128
var EU_HV = 512
var EU_EV = 2048
var EU_IV = 8192

// Per-run compute (cwuPerRun) = per-tick midpoint × 360 ticks. Midpoint ≈ voltage / 2.
// Compute only exists from MV up, so every LV node uses cwuPerRun(0).
var CWU_MV = 23040     // 64 CWU/t
var CWU_HV = 92160     // 256 CWU/t
const CWU_EV = 368640    // 1024 CWU/t
const CWU_IV = 1474560   // 4096 CWU/t

ServerEvents.recipes(event => {

    // =========================== CASINGS BACKBONE ============================
    // First ballistics node – "Infantry Munitions 1". Unlocks the pistol (small)
    // and rifle (medium) brass casing recipes (gated in guns/ammo.js). LV: no compute.
    WFResearch.builder('infantry_munitions_1')
        .category('ballistics').pos(0, 0)
        .nodeColor(BLUE)
        .name('Infantry Munitions 1')
        .description('Standardised brass cartridge casings for pistol and rifle calibres.')
        .runs(15).ticksPerRun(300).eut(EU_LV).cwuPerRun(0)
        .itemPerRun(Item.of('gtceu:steel_plate', 10))
        .itemPerRun(Item.of('gtceu:bronze_plate', 10))
        .itemPerRun(Item.of('minecraft:gunpowder', 10))
        .unlocks(Item.of('kubejs:bullet_casing_small'), Item.of('kubejs:bullet_casing_medium'))
        .icon(Item.of('kubejs:bullet_casing_medium'))
        .register()

    // Infantry Munitions 2 – WW-era calibres + Superb Warfare rifle ammunition. LV.
    WFResearch.builder('infantry_munitions_2')
        .category('ballistics').pos(0, 1)
        .nodeColor(BLUE)
        .name('Infantry Munitions 2')
        .description('WW-era rifle and pistol calibres.')
        .requires('infantry_munitions_1')
    .itemPerRun(Item.of('gtceu:steel_plate', 10))
    .itemPerRun(Item.of('kubejs:bullet_casing_large', 10))
        .runs(10).ticksPerRun(300).eut(EU_LV).cwuPerRun(0)
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

    // Infantry Munitions 3 – heavy/sniper small-arms tier (cheap MV). Heavy Rifle Casing + SBW heavy/sniper ammo.
    // Deviates from MV midpoint on purpose: eut 90 and 24 CWU/t (7200 @300t) keep it cheap.
    WFResearch.builder('infantry_munitions_3')
        .category('ballistics').pos(2, 1)
        .nodeColor(BLUE)
        .name('Infantry Munitions 3')
        .description('Heavy rifle cartridge cases and the .50/heavy rounds they feed.')
        .requires('infantry_munitions_2')
        .runs(20).ticksPerRun(300).eut(90).cwuPerRun(7200)   // 24 CWU/t = cheap MV
        .itemPerRun(Item.of('gtceu:steel_plate', 8))
        .itemPerRun(Item.of('gtceu:copper_plate', 6))
        .itemPerRun(Item.of('minecraft:gunpowder', 16))
        .unlocks(sbw('heavy_ammo'), sbw('sniper_ammo'), Item.of('kubejs:bullet_casing_large'))
        .icon(sbw('heavy_ammo'))
        .register()

    // MV large-calibre casing gate – first ballistics node to require compute. Steel + XL (vehicle) casings.
    WFResearch.builder('large_casings')
        .category('ballistics').pos(0, 2)
        .nodeColor(BLUE)
        .name('Large Casings')
        .description('Heavy steel cartridge cases for autocannon- and vehicle-grade ammunition.')
        .requires('infantry_munitions_2')
        .runs(25).ticksPerRun(360).eut(EU_MV).cwuPerRun(CWU_MV)   // ~64 CWU/t = MV midpoint
        .itemPerRun(Item.of('gtceu:steel_plate', 10))
        .itemPerRun(Item.of('superbwarfare:primer', 8))
        .itemPerRun(Item.of('minecraft:gunpowder', 10))
        .unlocks(Item.of('kubejs:steel_bullet_casing'), Item.of('kubejs:bullet_casing_xl'))
        .icon(Item.of('kubejs:steel_bullet_casing'))
        .register()

    // ===================== COMPONENT TIER (MV, y=3) =====================
    // Propulsion + guidance cores (consumed by rockets / guided missiles / drones).
    WFResearch.builder('missile_engines')
        .category('ballistics').pos(2, 3)
        .nodeColor(BLUE)
        .name('Missile Engines')
        .description('Solid-propellant rocket motors – the propulsion core of every rocket and guided missile.')
        .requires('large_casings')
        .runs(20).ticksPerRun(360).eut(EU_MV).cwuPerRun(CWU_MV)   // ~64 CWU/t = MV midpoint
        // MV-tier material demand: aluminium/magnalium structure + a pair of MV circuits.
        .itemPerRun(Item.of('gtceu:aluminium_plate', 6))
        .itemPerRun(Item.of('kubejs:solid_rocket_fuel', 2))
        .itemPerRun(Item.of('gtceu:magnalium_rod', 4))
        .itemTagPerRun('gtceu:circuits/mv', 2)
        .unlock(sbw('missile_engine'))
        .icon(sbw('missile_engine'))
        .register()

    WFResearch.builder('seekers')
        .category('ballistics').pos(4, 3)
        .nodeColor(BLUE)
        .name('Guidance Seekers')
        .description('Infrared / radar seeker heads that let a missile track its target – the guidance core of every guided missile, SAM and smart mine.')
        .requires('large_casings')
        .runs(22).ticksPerRun(360).eut(EU_MV).cwuPerRun(CWU_MV)   // ~64 CWU/t = MV midpoint
        .itemPerRun(Item.of('gtceu:lv_sensor', 1))
        .itemPerRun(Item.of('gtceu:lv_emitter', 1))
        .itemPerRun(Item.of('gtceu:tempered_glass', 2))
        .itemTagPerRun('gtceu:circuits/mv', 2)
        .unlock(sbw('seeker'))
        .icon(sbw('seeker'))
        .register()

    // ===================== WARHEAD HEADS (MV, y=3) =====================
    // The explosive payload cores. Each unlocks a superbwarfare:*_head item (GT recipe in
    // guns/ammo.js) that its munition family CONSUMES. MV midpoint compute.

    // High Explosive – payload of HE shells, rockets, aerial bombs and fragmentation missiles.
    WFResearch.builder('he_warheads')
        .category('ballistics').pos(-8, 3)
        .nodeColor(BLUE)
        .name('High Explosive Warheads')
        .description('High-explosive filler warheads – the payload of HE shells, rockets, aerial bombs and fragmentation missiles.')
        .requires('large_casings')
        .runs(20).ticksPerRun(360).eut(EU_MV).cwuPerRun(CWU_MV)   // ~64 CWU/t = MV midpoint
        .itemPerRun(Item.of('gtceu:steel_plate', 6))
        .itemPerRun(Item.of('minecraft:gunpowder', 12))
        .itemPerRun(Item.of('gtceu:sulfur_dust', 4))
        .unlock(sbw('he_head'))
        .icon(sbw('he_head'))
        .register()

    // Armor Piercing – dense tungsten-cored penetrator warheads.
    WFResearch.builder('ap_warheads')
        .category('ballistics').pos(-6, 3)
        .nodeColor(BLUE)
        .name('Armor Piercing Warheads')
        .description('Dense tungsten-cored penetrator warheads for AP shells, AP rockets and anti-tank missiles.')
        .requires('large_casings')
        .runs(20).ticksPerRun(360).eut(EU_MV).cwuPerRun(CWU_MV)   // ~64 CWU/t = MV midpoint
        .itemPerRun(Item.of('gtceu:steel_plate', 6))
        .itemPerRun(Item.of('gtceu:tungsten_plate', 2))
        .itemPerRun(Item.of('minecraft:gunpowder', 8))
        .unlock(sbw('ap_head'))
        .icon(sbw('ap_head'))
        .register()

    // Grapeshot – canister warheads that burst into a cloud of shot.
    WFResearch.builder('grapeshot_warheads')
        .category('ballistics').pos(-4, 3)
        .nodeColor(BLUE)
        .name('Grapeshot Warheads')
        .description('Canister warheads that burst into a cloud of shot – the payload of small- and large-calibre grapeshot shells.')
        .requires('large_casings')
        .runs(20).ticksPerRun(360).eut(EU_MV).cwuPerRun(CWU_MV)   // ~64 CWU/t = MV midpoint
        .itemPerRun(Item.of('gtceu:steel_plate', 6))
        .itemPerRun(Item.of('gtceu:lead_nugget', 12))
        .itemPerRun(Item.of('minecraft:gunpowder', 8))
        .unlock(sbw('gs_head'))
        .icon(sbw('gs_head'))
        .register()

    // Cluster Munitions – submunition-dispensing cluster warheads.
    WFResearch.builder('cluster_warheads')
        .category('ballistics').pos(-2, 3)
        .nodeColor(BLUE)
        .name('Cluster Munitions')
        .description('Submunition-dispensing cluster warheads for large-calibre cluster shells and cluster rockets.')
        .requires('large_casings')
        .runs(20).ticksPerRun(360).eut(EU_MV).cwuPerRun(CWU_MV)   // ~64 CWU/t = MV midpoint
        .itemPerRun(Item.of('gtceu:steel_plate', 8))
        .itemPerRun(Item.of('gtceu:dynamite', 4))
        .itemPerRun(Item.of('minecraft:gunpowder', 12))
        .unlock(sbw('cm_head'))
        .icon(sbw('cm_head'))
        .register()

    // Pyrotechnics – white-phosphorus incendiary warheads (every fire round).
    WFResearch.builder('pyrotechnics')
        .category('ballistics').pos(0, 3)
        .nodeColor(BLUE)
        .name('Pyrotechnics')
        .description('White-phosphorus incendiary warheads – the payload of every fire round: WP shells and WP mortar bombs.')
        .requires('large_casings')
        .runs(20).ticksPerRun(360).eut(EU_MV).cwuPerRun(CWU_MV)   // ~64 CWU/t = MV midpoint
        .itemPerRun(Item.of('gtceu:steel_plate', 6))
        .itemPerRun(Item.of('gtceu:white_phosphorus_dust', 2))
        .itemPerRun(Item.of('minecraft:gunpowder', 8))
        .unlock(sbw('wp_head'))
        .icon(sbw('wp_head'))
        .register()

    // ---- HE-warhead children (must be registered AFTER he_warheads above) ----

    // Mortar Bombs (HE) – muzzle-loaded HE bombs for the man-portable Mortar. HE-warhead tech,
    // so it gates on he_warheads (MV). Cheap MV filler (~50 CWU/t, 15000 @300t).
    WFResearch.builder('mortar_shell')
        .category('ballistics').pos(-8, 2)
        .nodeColor(BLUE)
        .name('Mortar Bombs')
        .description('Muzzle-loaded high-explosive mortar bombs for the man-portable Mortar.')
        .requires('he_warheads')
        .runs(12).ticksPerRun(300).eut(EU_MV).cwuPerRun(15000)   // ~50 CWU/t – cheap MV filler
        .itemPerRun(Item.of('gtceu:steel_plate', 4))
        .itemPerRun(Item.of('minecraft:gunpowder', 8))
        .unlock(sbw('mortar_shell'))
        .icon(sbw('mortar_shell'))
        .register()

    // 40mm Grenades – low-velocity HE grenades for the M79 launcher and the Mk19 auto-GL
    // (Humvee). Gated on High Explosive Warheads. Unlocks BOTH the Superb Warfare 40mm grenade
    // and the MCSP 40mm HE round (recipes in guns/ammo.js).
    WFResearch.builder('grenade_40mm')
        .category('ballistics').pos(-9, 3)
        .nodeColor(BLUE)
        .name('40mm Grenades')
        .description('Low-velocity 40mm high-explosive grenades for grenade launchers (M79, Mk19).')
        .requires('he_warheads')
        .runs(15).ticksPerRun(300).eut(EU_MV).cwuPerRun(19200)   // ~64 CWU/t = MV midpoint (@300t)
        .itemPerRun(Item.of('gtceu:steel_plate', 6))
        .itemPerRun(Item.of('gtceu:dynamite', 4))
        .itemPerRun(Item.of('minecraft:gunpowder', 8))
        .unlocks(sbw('grenade_40mm'), Item.of('mcsp:40mm_explosive'))
        .icon(sbw('grenade_40mm'))
        .register()

    // ===================== MUNITION TIER (one ammo per node) =====================
    // Each node unlocks ONE superbwarfare:* round and .requires() the warhead node whose
    // *_head item that round consumes. Reference compute per tier @360t: MV CWU_MV / HV CWU_HV
    // / EV CWU_EV.

    // --- Small vehicle shells (MV) – steel casing + head ---
    WFResearch.builder('high_explosive_1')
        .category('ballistics').pos(-8, 4)
        .nodeColor(BLUE)
        .name('Small HE Shells')
        .description('High-explosive rounds for small-calibre vehicle cannons.')
        .requires('he_warheads')
        .runs(25).ticksPerRun(360).eut(EU_MV).cwuPerRun(CWU_MV)   // ~64 CWU/t = MV midpoint
        .itemPerRun(Item.of('gtceu:steel_plate', 8))
        .itemPerRun(Item.of('superbwarfare:primer', 8))
        .unlock(sbw('small_shell_he'))
        .icon(sbw('small_shell_he'))
        .register()

    WFResearch.builder('armor_piercing_1')
        .category('ballistics').pos(-6, 4)
        .nodeColor(BLUE)
        .name('Small AP Shells')
        .description('Hardened penetrators for small-calibre vehicle cannons.')
        .requires('ap_warheads')
        .runs(25).ticksPerRun(360).eut(EU_MV).cwuPerRun(CWU_MV)   // ~64 CWU/t = MV midpoint
        .itemPerRun(Item.of('kubejs:steel_bullet_casing', 2))
        .itemPerRun(Item.of('superbwarfare:primer', 4))
        .unlock(sbw('small_shell_ap'))
        .icon(sbw('small_shell_ap'))
        .register()

    WFResearch.builder('grapeshot_1')
        .category('ballistics').pos(-4, 4)
        .nodeColor(BLUE)
        .name('Small Grapeshot Shells')
        .description('Multi-projectile canister loads that shred infantry at close range.')
        .requires('grapeshot_warheads')
        .runs(20).ticksPerRun(360).eut(EU_MV).cwuPerRun(CWU_MV)   // ~64 CWU/t = MV midpoint
        .itemPerRun(Item.of('kubejs:steel_bullet_casing', 2))
        .itemPerRun(Item.of('superbwarfare:primer', 4))
        .unlock(sbw('small_shell_gs'))
        .icon(sbw('small_shell_gs'))
        .register()

    WFResearch.builder('anti_air_1')
        .category('ballistics').pos(-9, 4)
        .nodeColor(BLUE)
        .name('Small Anti-Air Shells')
        .description('Proximity-fuzed fragmentation rounds for air defence (H/PJ-11 CIWS, LAV-AD).')
        .requires('he_warheads')
        .runs(25).ticksPerRun(360).eut(EU_MV).cwuPerRun(CWU_MV)   // ~64 CWU/t = MV midpoint
        .itemPerRun(Item.of('kubejs:steel_bullet_casing', 2))
        .itemTagPerRun('gtceu:circuits/lv', 2)
        .unlock(sbw('small_shell_aa'))
        .icon(sbw('small_shell_aa'))
        .register()

    // --- Large tank/artillery shells (EV) – XL casing + head + grain ---
    // EV tier: the deeper large-shell nodes use vanadium steel plate (HV alloy) instead of plain steel.
    WFResearch.builder('large_shell_he')
        .category('ballistics').pos(-8, 5)
        .nodeColor(BLUE)
        .name('Large HE Shells')
        .description('Tank and artillery main-gun high-explosive rounds.')
        .requires('high_explosive_1')
        .runs(30).ticksPerRun(360).eut(EU_EV).cwuPerRun(CWU_EV)   // ~1024 CWU/t = EV midpoint
        .itemPerRun(Item.of('gtceu:vanadium_steel_plate', 12))
        .itemPerRun(Item.of('superbwarfare:primer', 10))
        .itemPerRun(Item.of('superbwarfare:grain', 8))
        .unlock(sbw('large_shell_he'))
        .icon(sbw('large_shell_he'))
        .register()

    WFResearch.builder('large_shell_ap')
        .category('ballistics').pos(-6, 5)
        .nodeColor(BLUE)
        .name('Large AP Shells')
        .description('Tank main-gun armour-piercing rounds.')
        .requires('armor_piercing_1')
        .runs(30).ticksPerRun(360).eut(EU_EV).cwuPerRun(CWU_EV)   // ~1024 CWU/t = EV midpoint
        .itemPerRun(Item.of('gtceu:vanadium_steel_plate', 12))
        .itemPerRun(Item.of('superbwarfare:primer', 10))
        .itemPerRun(Item.of('superbwarfare:grain', 8))
        .unlock(sbw('large_shell_ap'))
        .icon(sbw('large_shell_ap'))
        .register()

    WFResearch.builder('large_shell_gs')
        .category('ballistics').pos(-4, 5)
        .nodeColor(BLUE)
        .name('Large Grapeshot Shells')
        .description('Large-calibre canister rounds for close defence.')
        .requires('grapeshot_1')
        .runs(30).ticksPerRun(360).eut(EU_EV).cwuPerRun(CWU_EV)   // ~1024 CWU/t = EV midpoint
        .itemPerRun(Item.of('gtceu:titanium_plate', 12))
        .itemPerRun(Item.of('gtceu:ultimet_round', 48))
        .itemPerRun(Item.of('superbwarfare:grain', 8))
        .unlock(sbw('large_shell_gs'))
        .icon(sbw('large_shell_gs'))
        .register()

    WFResearch.builder('large_shell_cm')
        .category('ballistics').pos(-2, 4)
        .nodeColor(BLUE)
        .name('Large Cluster Shells')
        .description('Large-calibre cluster-munition rounds.')
        .requires('cluster_warheads')
        .runs(30).ticksPerRun(360).eut(EU_EV).cwuPerRun(CWU_EV)   // ~1024 CWU/t = EV midpoint
        .itemPerRun(Item.of('gtceu:vanadium_steel_plate', 12))
        .itemPerRun(Item.of('superbwarfare:primer', 10))
        .itemPerRun(Item.of('superbwarfare:grain', 8))
        .unlock(sbw('large_shell_cm'))
        .icon(sbw('large_shell_cm'))
        .register()

    WFResearch.builder('large_shell_wp')
        .category('ballistics').pos(0, 4)
        .nodeColor(BLUE)
        .name('Large White Phosphorus Shells')
        .description('Large-calibre white-phosphorus incendiary rounds.')
        .requires('pyrotechnics')
        .runs(30).ticksPerRun(360).eut(EU_EV).cwuPerRun(CWU_EV)   // ~1024 CWU/t = EV midpoint
        .itemPerRun(Item.of('gtceu:vanadium_steel_plate', 12))
        .itemPerRun(Item.of('superbwarfare:primer', 10))
        .itemPerRun(Item.of('superbwarfare:grain', 8))
        .unlock(sbw('large_shell_wp'))
        .icon(sbw('large_shell_wp'))
        .register()

    // --- Unguided rockets (MV) – missile engine + head. The head item enforces the warhead research;
    //     the tree edge is the propulsion line (small_rocket -> the medium rockets) to keep the graph clean. ---
    WFResearch.builder('small_rocket')
        .category('ballistics').pos(2, 4)
        .nodeColor(BLUE)
        .name('Small Rockets')
        .description('Folding-fin HE rockets fired by helicopters and the Sodayo MLRS.')
        .requires('missile_engines')
        .runs(22).ticksPerRun(360).eut(EU_MV).cwuPerRun(CWU_MV)   // ~64 CWU/t = MV midpoint
        .itemPerRun(Item.of('gtceu:steel_plate', 8))
        .itemPerRun(Item.of('superbwarfare:missile_engine', 2))
        .itemPerRun(Item.of('kubejs:solid_rocket_fuel', 2))
        .unlock(sbw('small_rocket'))
        .icon(sbw('small_rocket'))
        .register()

    WFResearch.builder('medium_rocket_he')
        .category('ballistics').pos(1, 5)
        .nodeColor(BLUE)
        .name('Medium HE Rockets')
        .description('Medium-calibre high-explosive rockets for the Type-63 MLRS.')
        .requires('small_rocket')
        .runs(22).ticksPerRun(360).eut(EU_MV).cwuPerRun(CWU_MV)   // ~64 CWU/t = MV midpoint
        .itemPerRun(Item.of('gtceu:steel_plate', 8))
        .itemPerRun(Item.of('superbwarfare:missile_engine', 2))
        .itemPerRun(Item.of('kubejs:solid_rocket_fuel', 2))
        .unlock(sbw('medium_rocket_he'))
        .icon(sbw('medium_rocket_he'))
        .register()

    WFResearch.builder('medium_rocket_ap')
        .category('ballistics').pos(2, 5)
        .nodeColor(BLUE)
        .name('Medium AP Rockets')
        .description('Medium-calibre armour-piercing rockets for the Type-63 MLRS.')
        .requires('small_rocket')
        .runs(22).ticksPerRun(360).eut(EU_MV).cwuPerRun(CWU_MV)   // ~64 CWU/t = MV midpoint
        .itemPerRun(Item.of('gtceu:steel_plate', 8))
        .itemPerRun(Item.of('superbwarfare:missile_engine', 2))
        .itemPerRun(Item.of('kubejs:solid_rocket_fuel', 2))
        .unlock(sbw('medium_rocket_ap'))
        .icon(sbw('medium_rocket_ap'))
        .register()

    WFResearch.builder('medium_rocket_cm')
        .category('ballistics').pos(3, 5)
        .nodeColor(BLUE)
        .name('Medium Cluster Rockets')
        .description('Medium-calibre cluster-munition rockets for the Type-63 MLRS.')
        .requires('small_rocket')
        .runs(22).ticksPerRun(360).eut(EU_MV).cwuPerRun(CWU_MV)   // ~64 CWU/t = MV midpoint
        .itemPerRun(Item.of('gtceu:steel_plate', 8))
        .itemPerRun(Item.of('superbwarfare:missile_engine', 2))
        .itemPerRun(Item.of('kubejs:solid_rocket_fuel', 2))
        .unlock(sbw('medium_rocket_cm'))
        .icon(sbw('medium_rocket_cm'))
        .register()

    // --- Aerial bombs (MV) – HE head + fin ring. Own column left of the HE shells; small -> medium chain. ---
    WFResearch.builder('small_aerial_bomb')
        .category('ballistics').pos(-10, 4)
        .nodeColor(BLUE)
        .name('Small Aerial Bombs')
        .description('Small gravity high-explosive bombs for the Ju-87 Stuka.')
        .requires('he_warheads')
        .runs(20).ticksPerRun(360).eut(EU_MV).cwuPerRun(CWU_MV)   // ~64 CWU/t = MV midpoint
        .itemPerRun(Item.of('gtceu:steel_plate', 10))
        .itemPerRun(Item.of('gtceu:steel_ring', 2))
        .itemPerRun(Item.of('minecraft:gunpowder', 8))
        .unlock(sbw('small_aerial_bomb'))
        .icon(sbw('small_aerial_bomb'))
        .register()

    WFResearch.builder('medium_aerial_bomb')
        .category('ballistics').pos(-10, 5)
        .nodeColor(BLUE)
        .name('Medium Aerial Bombs')
        .description('Medium gravity high-explosive bombs for the Ju-87 Stuka.')
        .requires('small_aerial_bomb')
        .runs(20).ticksPerRun(360).eut(EU_MV).cwuPerRun(CWU_MV)   // ~64 CWU/t = MV midpoint
        .itemPerRun(Item.of('gtceu:steel_plate', 10))
        .itemPerRun(Item.of('gtceu:steel_ring', 2))
        .itemPerRun(Item.of('minecraft:gunpowder', 8))
        .unlock(sbw('medium_aerial_bomb'))
        .icon(sbw('medium_aerial_bomb'))
        .register()

    // --- WP mortar bomb (Pyrotechnics, MV) – fire round. Sits beside the Large WP shell under Pyrotechnics. ---
    WFResearch.builder('mortar_shell_wp')
        .category('ballistics').pos(1, 4)
        .nodeColor(BLUE)
        .name('White Phosphorus Mortar')
        .description('White-phosphorus incendiary mortar bombs.')
        .requires('pyrotechnics')
        .runs(15).ticksPerRun(360).eut(EU_MV).cwuPerRun(CWU_MV)   // ~64 CWU/t = MV midpoint
        .itemPerRun(Item.of('gtceu:steel_plate', 4))
        .itemPerRun(Item.of('superbwarfare:wp_head', 2))
        .itemPerRun(Item.of('minecraft:gunpowder', 6))
        .unlock(sbw('mortar_shell_wp'))
        .icon(sbw('mortar_shell_wp'))
        .register()

    // --- Guided missiles. Single spine off Seekers (warhead enforced by the consumed head item). ---
    WFResearch.builder('anti_ground_missiles')
        .category('ballistics').pos(4, 4)
        .nodeColor(BLUE)
        .name('Anti-Ground Missiles')
        .description('Wire-/laser-guided anti-tank missiles (TOW class) fired by gun trucks, the Bradley and the TOW launcher.')
        .requires('seekers')
        .runs(25).ticksPerRun(360).eut(EU_MV).cwuPerRun(CWU_MV)   // ~64 CWU/t = MV midpoint
        .itemPerRun(Item.of('gtceu:stainless_steel_plate', 6))
        .itemPerRun(Item.of('superbwarfare:missile_engine', 2))
        .itemPerRun(Item.of('superbwarfare:seeker', 1))
        .unlock(sbw('medium_anti_ground_missile'))
        .icon(sbw('medium_anti_ground_missile'))
        .register()

    WFResearch.builder('heavy_anti_ground_missiles')
        .category('ballistics').pos(4, 5)
        .nodeColor(BLUE)
        .name('Heavy Anti-Ground Missiles')
        .description('Large-diameter guided anti-tank missiles for attack helicopters: the Large Anti-Ground Missile fired from the Mi-28.')
        .requires('anti_ground_missiles')
        .runs(28).ticksPerRun(360).eut(EU_HV).cwuPerRun(CWU_HV)   // ~256 CWU/t = HV midpoint
        .itemPerRun(Item.of('gtceu:titanium_plate', 6))
        .itemPerRun(Item.of('superbwarfare:large_motor', 1))
        .itemPerRun(Item.of('superbwarfare:seeker', 2))
        .unlock(sbw('large_anti_ground_missile'))
        .icon(sbw('large_anti_ground_missile'))
        .register()

    WFResearch.builder('anti_air_missiles')
        .category('ballistics').pos(5, 5)
        .nodeColor(BLUE)
        .name('Anti-Air Missiles')
        .description('Radar-/IR-guided surface-to-air missiles for the LAV-AD air-defence vehicle.')
        .requires('anti_ground_missiles')
        .runs(30).ticksPerRun(360).eut(EU_HV).cwuPerRun(CWU_HV)   // ~256 CWU/t = HV midpoint
        .itemPerRun(Item.of('gtceu:stainless_steel_plate', 8))
        .itemPerRun(Item.of('superbwarfare:missile_engine', 2))
        .itemPerRun(Item.of('superbwarfare:seeker', 2))
        .unlock(sbw('medium_anti_air_missile'))
        .icon(sbw('medium_anti_air_missile'))
        .register()

    // --- Nuclear Bomb (IV APEX) – the B-2 Spirit's strategic payload (AshVehicle: ashvehicle:nuclearbombitem).
    //     BY FAR the most expensive munition to develop: IV compute + a fissile core, capping the aerial-bomb
    //     column (small bomb -> medium bomb -> NUKE). Different namespace + IV tier. ---
    WFResearch.builder('nuclear_bomb')
        .category('ballistics').pos(-10, 6)
        .nodeColor(BLUE)
        .name('Nuclear Bomb')
        .description('The B-2 Spirit\'s strategic payload: an implosion-type fission gravity bomb.')
        .requires('medium_aerial_bomb')
        .runs(40).ticksPerRun(360).eut(EU_IV).cwuPerRun(CWU_IV)   // ~4096 CWU/t = IV midpoint
        .itemPerRun(Item.of('gtceu:uranium_235_block', 1))
        .itemPerRun(Item.of('gtceu:double_beryllium_plate', 2))
        .itemPerRun(Item.of('gtceu:hsss_plate', 4))
        .itemPerRun(Item.of('superbwarfare:he_head', 2))
        .itemTagPerRun('gtceu:circuits/iv', 1)
        .unlock(Item.of('ashvehicle:nuclearbombitem'))
        .icon(Item.of('ashvehicle:nuclearbombitem'))
        .register()

})
