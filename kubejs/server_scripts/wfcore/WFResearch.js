import com.norwood.wfcore.integration.kubejs
// Register in ServerEvents.recipes (fires on server start AND /reload), NOT ServerEvents.loaded
// (start only) — otherwise the research tree stays blank after a /reload. Registry is keyed by id
// (put-replace), so re-running on reload just updates nodes in place.
ServerEvents.recipes(event => {

// categories (research tabs)
WFResearch.category('ballistics')
.name('Ballistics')
.icon(Item.of('superbwarfare:large_shell_he'))    // artillery shell — projectile/ballistics theme
.backgroundColor(0xFF101814)                // optional solid background (used if no texture)
.connectorColor(0xFF60C060)      // colour of the connector lines
.register()

WFResearch.category('infantry')
.name('Infantry weapons')                       // optional lang key; defaults to wfcore.research.category.logistics
.icon(Item.of('tacz:modern_kinetic_gun', '{GunCurrentAmmoCount:30,GunFireMode:"SEMI",GunId:"tacz:scar_l",HasBulletInBarrel:1b}'))           // optional tab icon
.backgroundColor(0xFF101814)                // optional solid background (used if no texture)
.connectorColor(0xFF60C060)      // colour of the connector lines
.register()

WFResearch.category('armor')
.name('Ground vehicles')                       // optional lang key; defaults to wfcore.research.category.logistics
.icon(Item.of('wfcore:packaged_vehicle', '{entity:"mcsp:humvee_sand"}'))           
.backgroundColor(0xFF101814)                // optional solid background (used if no texture)
.connectorColor(0xFF60C060)      // colour of the connector lines
.register()

WFResearch.category('air')
.name('Aviation')                       // optional lang key; defaults to wfcore.research.category.logistics
.icon(Item.of('kubejs:plane_icon'))           // optional tab icon
.backgroundColor(0xFF101814)                // optional solid background (used if no texture)
.connectorColor(0xFF60C060)      // colour of the connector lines
.register()

WFResearch.category('defense')
.name('Emplacements')                       // "Defences": crew-served / static weapons (deploy from items)
.icon(Item.of('superbwarfare:mortar_deployer'))           // optional tab icon
.backgroundColor(0xFF101814)                // optional solid background (used if no texture)
.connectorColor(0xFF60C060)      // colour of the connector lines
.register()

// Item-cost helper: a leading '#' marks a TAG (any member satisfies it, e.g. '#gtceu:circuits/lv'),
// otherwise an exact item. Uses wfcore's tag-aware itemTagPerRun binding so circuits/plates need not be a
// single hard-coded item — any tier-appropriate variant works, and the Research Unit GUI circles it.
const addCost = (b, id, count) => (typeof id === 'string' && id.charAt(0) === '#')
    ? b.itemTagPerRun(id, count)
    : b.itemPerRun(Item.of(id, count))

// =========================== BALLISTICS ============================
// First ballistics node — "Infantry Munitions 1". Unlocks the pistol
// (small) and rifle (medium) brass casing recipes; the gate is applied
// to those cutter recipes in server_scripts/guns/ammo.js via
// WFResearch.condition('infantry_munitions_1').
// 15 runs x 15s each (300t), 32 EU/t. Compute = 0 on purpose: this is an
// LV-stage node, and compute infrastructure (Mainframe/Research Unit) is an
// MV unlock, so the earliest research must run with no CWU. See "Research
// compute balance" in CLAUDE.md.
WFResearch.builder('infantry_munitions_1')
.category('ballistics').pos(0, 0)
.nodeColor(0xFF2F6BD8)
.name('Infantry Munitions 1')
.description('Standardised brass cartridge casings for pistol and rifle calibres. Unlocks all pistol and rifle casing recipes.')
.runs(15).ticksPerRun(300).eut(32).cwuPerRun(0)
.itemPerRun(Item.of('gtceu:steel_plate', 10))
.itemPerRun(Item.of('gtceu:bronze_plate', 10))
.itemPerRun(Item.of('minecraft:gunpowder', 10))
.unlocks(Item.of('kubejs:bullet_casing_small'), Item.of('kubejs:bullet_casing_medium'))
.icon(Item.of('kubejs:bullet_casing_medium'))     // Rifle Casing (texture missing for now)
.register()

// Infantry Munitions 2 — gates WW-era calibres behind a proper munitions node.
// Connected to IM1 so the player must unlock basic casing production first.
WFResearch.builder('infantry_munitions_2')
.category('ballistics').pos(0, 1)
.nodeColor(0xFF2F6BD8)
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

// Infantry Munitions 3 — first heavy small-arms tier. MV, but deliberately
// CHEAP on compute (24 CWU/t over 300t => cwuPerRun 7200) and low voltage
// (90 EU/t) so it's an early MV pickup. Unlocks the Heavy Rifle Casing plus
// Superb Warfare heavy + sniper ammunition (gated in ammo.js via
// WFResearch.condition('infantry_munitions_3')). Research consumes steel +
// copper + a lot of gunpowder.
WFResearch.builder('infantry_munitions_3')
.category('ballistics').pos(2, 1)
.nodeColor(0xFF2F6BD8)
.name('Infantry Munitions 3')
.description('Heavy rifle cartridge cases and the .50/heavy rounds they feed: Superb Warfare heavy and sniper ammunition. Unlocks Heavy Rifle Casing production.')
.requires('infantry_munitions_2')
.runs(20).ticksPerRun(300).eut(90).cwuPerRun(7200)   // 24 CWU/t = cheap MV
.itemPerRun(Item.of('gtceu:steel_plate', 8))
.itemPerRun(Item.of('gtceu:copper_plate', 6))
.itemPerRun(Item.of('minecraft:gunpowder', 16))
.unlocks(
    Item.of('superbwarfare:heavy_ammo'),
    Item.of('superbwarfare:sniper_ammo'),
    Item.of('kubejs:bullet_casing_large')
)
.icon(Item.of('superbwarfare:heavy_ammo'))
.register()

// ── MV: Large-calibre casing gate ──────────────────────────────────
// First ballistics node to require compute (Mainframe/Research Unit is an
// MV unlock). Sized to the MV midpoint: ~64 CWU/t over 360-tick runs =>
// cwuPerRun 23040 (see "Research compute balance" in CLAUDE.md). Unlocks steel
// casing production plus the vehicle (XL) brass casing line; those recipes are
// gated in server_scripts/guns/ammo.js via WFResearch.condition('large_casings').
// (Heavy Rifle Casing is unlocked at infantry_munitions_3, not here.) Consumes
// primer (craftable via the GT assembler route added in ammo.js — its vanilla
// crafting recipe is stripped).
WFResearch.builder('large_casings')
.category('ballistics').pos(0, 2)
.nodeColor(0xFF2F6BD8)
.name('Large Casings')
.description('Heavy steel cartridge cases for autocannon- and vehicle-grade ammunition. Unlocks steel casing production and the vehicle (XL) brass casing line.')
.requires('infantry_munitions_2')
.runs(25).ticksPerRun(360).eut(128).cwuPerRun(23040)   // ~64 CWU/t = MV midpoint
.itemPerRun(Item.of('gtceu:steel_plate', 10))
.itemPerRun(Item.of('superbwarfare:primer', 8))
.itemPerRun(Item.of('minecraft:gunpowder', 10))
.unlocks(
    Item.of('kubejs:steel_bullet_casing'),
    Item.of('kubejs:bullet_casing_xl')
)
.icon(Item.of('kubejs:steel_bullet_casing'))
.register()

// ── MV: four small-calibre vehicle-shell branches (AP / HE / GS / AA) ──
// All four require large_casings and fan out beneath it. Each gates its own
// superbwarfare small-shell ammo-press recipe in server_scripts/guns/ammo.js
// via WFResearch.condition('<id>'). Same MV compute budget as the gate
// (~64 CWU/t over 360t). Built from a data table since the nodes differ only
// in name/icon/cost — the fluent builders above are kept explicit for clarity.
;[
    { id: 'armor_piercing_1', x: -3, out: 'small_shell_ap', name: 'Armor Piercing Shells',
      desc: 'Hardened vanadium-steel penetrators for small-calibre vehicle cannons. Unlocks the Small Caliber AP Shell.',
      runs: 25, items: [['kubejs:steel_bullet_casing', 2], ['superbwarfare:primer', 4], ['gtceu:vanadium_steel_bolt', 16]] },
    { id: 'high_explosive_1', x: -1, out: 'small_shell_he', name: 'High Explosive Shells',
      desc: 'High-energy explosive filler for small-calibre vehicle shells. Unlocks the Small Caliber HE Shell.',
      runs: 25, items: [['gtceu:steel_plate', 10], ['superbwarfare:primer', 8], ['superbwarfare:high_energy_explosives', 2]] },
    { id: 'grapeshot_1', x: 1, out: 'small_shell_gs', name: 'Grapeshot Shells',
      desc: 'Multi-projectile canister loads that shred infantry at close range. Unlocks the Small Caliber Grapeshot Shell.',
      runs: 20, items: [['kubejs:steel_bullet_casing', 2], ['superbwarfare:primer', 4], ['gtceu:lead_plate', 8]] },
    { id: 'anti_air_1', x: 3, out: 'small_shell_aa', name: 'Anti-Air Shells',
      desc: 'Proximity-fuzed fragmentation rounds for air defence. Unlocks the Small Caliber Anti-Air Shell.',
      runs: 25, items: [['kubejs:steel_bullet_casing', 2], ['superbwarfare:primer', 6], ['superbwarfare:high_energy_explosives', 2], ['#gtceu:circuits/lv', 2]] },
].forEach(n => {
    const b = WFResearch.builder(n.id)
        .category('ballistics').pos(n.x, 3)
        .nodeColor(0xFF2F6BD8)
        .name(n.name)
        .description(n.desc)
        .requires('large_casings')
        .runs(n.runs).ticksPerRun(360).eut(128).cwuPerRun(23040)   // ~64 CWU/t = MV midpoint
        .unlocks(Item.of('superbwarfare:' + n.out))
        .icon(Item.of('superbwarfare:' + n.out))
    n.items.forEach(it => addCost(b, it[0], it[1]))
    b.register()
})

// ── EV: Large-calibre tank shells ──────────────────────────────────
// Gates the XL-casing large-shell press recipes in server_scripts/guns/ammo.js (HE/AP/GS for the
// main battle tank, plus cluster/WP). EV compute midpoint (~1024 CWU/t over 360t).
WFResearch.builder('large_caliber_shells')
.category('ballistics').pos(-2, 4)
.nodeColor(0xFF2F6BD8)
.name('Large Caliber Shells')
.description('Tank and artillery main-gun ammunition: large HE, AP and grapeshot shells (plus cluster and white phosphorus). Unlocks the large shell production line.')
.requires('large_casings')
.runs(30).ticksPerRun(360).eut(2048).cwuPerRun(368640)   // ~1024 CWU/t = EV midpoint
.itemPerRun(Item.of('gtceu:steel_plate', 12))
.itemPerRun(Item.of('superbwarfare:primer', 10))
.itemPerRun(Item.of('superbwarfare:grain', 8))
.unlocks(
    Item.of('superbwarfare:large_shell_he'),
    Item.of('superbwarfare:large_shell_ap'),
    Item.of('superbwarfare:large_shell_gs'),
    Item.of('superbwarfare:large_shell_cm'),
    Item.of('superbwarfare:large_shell_wp')
)
.icon(Item.of('superbwarfare:large_shell_he'))
.register()

// ── Guided missiles (anti-ground / anti-air) ───────────────────────
// Gate the SBW guided-missile assembler recipes in ammo.js. Anti-ground (TOW class) feeds the gun
// trucks + Bradley; anti-air feeds the LAV-AD. MV then HV compute.
WFResearch.builder('anti_ground_missiles')
.category('ballistics').pos(0, 4)
.nodeColor(0xFF2F6BD8)
.name('Anti-Ground Missiles')
.description('Wire-/laser-guided anti-tank missiles (TOW class) fired by gun trucks and IFV launchers. Unlocks the Medium Anti-Ground Missile.')
.requires('large_casings')
.runs(25).ticksPerRun(360).eut(128).cwuPerRun(23040)   // ~64 CWU/t = MV midpoint
.itemPerRun(Item.of('gtceu:stainless_steel_plate', 6))
.itemPerRun(Item.of('superbwarfare:missile_engine', 2))
.itemPerRun(Item.of('superbwarfare:seeker', 1))
.unlocks(Item.of('superbwarfare:medium_anti_ground_missile'))
.icon(Item.of('superbwarfare:medium_anti_ground_missile'))
.register()

WFResearch.builder('anti_air_missiles')
.category('ballistics').pos(2, 4)
.nodeColor(0xFF2F6BD8)
.name('Anti-Air Missiles')
.description('Radar-/IR-guided surface-to-air missiles for the LAV-AD air-defence vehicle. Unlocks the Medium Anti-Air Missile.')
.requires('anti_ground_missiles')
.runs(30).ticksPerRun(360).eut(512).cwuPerRun(92160)   // ~256 CWU/t = HV midpoint
.itemPerRun(Item.of('gtceu:stainless_steel_plate', 8))
.itemPerRun(Item.of('superbwarfare:missile_engine', 2))
.itemPerRun(Item.of('superbwarfare:seeker', 2))
.unlocks(Item.of('superbwarfare:medium_anti_air_missile'))
.icon(Item.of('superbwarfare:medium_anti_air_missile'))
.register()

// ── TRANSITIONAL SCAFFOLD (rebuild target) ─────────────────────────
// The old node tree (guns*/planes*/helo*/armor*/defenses*/turrets*) was
// PURGED — it was placeholder-grade (identical params, broken un-namespaced
// unlock icons, no tiering). Their ids are retained below as a checklist to
// rebuild toward, one properly-designed node at a time.
//
// SAFE TO PURGE: an unregistered research id fails OPEN
// (ResearchGate.isUnlocked: unknown id -> allowed), so recipes still calling
// WFResearch.condition('<id>') just run UNGATED for now — nothing bricks.
//   - `gatingRecipes` ids ARE still referenced by gun recipe scripts
//     (modern_guns/hfian_guns/gun_parts) and so are currently ungated until
//     re-homed under a new node with the same id.
//   - `orphaned` ids gate no recipe at all — free to rename/repurpose.
const LEGACY_RESEARCH_IDS = {
    gatingRecipes: ['guns1', 'guns2', 'guns2heavy', 'guns4heavy'],
    orphaned: ['guns3', 'guns4', 'guns5', 'guns6',
        'planes1', 'planes2', 'planes3', 'helo1', 'helo2',
        'armor0', 'armor1', 'armor2', 'armor3', 'armor4',
        'defenses1', 'defenses2', 'turrets1', 'turrets2', 'turrets3'],
}

// =========================== INFANTRY ============================

WFResearch.builder('infantry_combat_1')
.category('infantry').pos(0, 0)
.nodeColor(0xFF2F6BD8)
.name('Infantry Combat 1')
.description('Early bolt-action rifles and the calibres they fire. Unlocks the Kar98, Type 38, and Mosin M91.')
.runs(5).ticksPerRun(300).eut(32).cwuPerRun(0)
.unlocks(
    Item.of('tacz:modern_kinetic_gun', '{GunCurrentAmmoCount:5,GunFireMode:"SEMI",GunId:"tacz:kar98",HasBulletInBarrel:0b}'),
    Item.of('tacz:modern_kinetic_gun', '{GunCurrentAmmoCount:5,GunFireMode:"SEMI",GunId:"ww:type38",HasBulletInBarrel:1b}'),
    Item.of('tacz:modern_kinetic_gun', '{GunCurrentAmmoCount:5,GunFireMode:"SEMI",GunId:"ww:m91",HasBulletInBarrel:1b}')
)
.icon(Item.of('tacz:modern_kinetic_gun', '{GunCurrentAmmoCount:5,GunFireMode:"SEMI",GunId:"tacz:kar98",HasBulletInBarrel:0b}'))
.register()

WFResearch.builder('short_barreled_1')
.category('infantry').pos(-1, 1)
.nodeColor(0xFF2F6BD8)
.name('Short Barreled I')
.description('Compact sidearms for officers and crew: the Luger P08 and Walther P38.')
.requires('infantry_combat_1')
.runs(15).ticksPerRun(220).eut(24).cwuPerRun(0)
.itemPerRun(Item.of('gtceu:steel_plate', 2))
.itemPerRun(Item.of('tacz:ammo', '{AmmoId:"tacz:9mm"}').withCount(2))
.itemPerRun(Item.of('minecraft:gunpowder', 10))
.unlocks(
    Item.of('tacz:modern_kinetic_gun', '{GunCurrentAmmoCount:8,GunFireMode:"SEMI",GunId:"ww:p08",HasBulletInBarrel:1b}'),
    Item.of('tacz:modern_kinetic_gun', '{GunCurrentAmmoCount:8,GunFireMode:"SEMI",GunId:"ww:p38",HasBulletInBarrel:1b}')
)
.icon(Item.of('tacz:modern_kinetic_gun', '{GunCurrentAmmoCount:8,GunFireMode:"SEMI",GunId:"ww:p08",HasBulletInBarrel:1b}'))
.register()

WFResearch.builder('pump_action_1')
.category('infantry').pos(0, 1)
.nodeColor(0xFF2F6BD8)
.name('Pump Action I')
.description('Repeating shotgun designs for close-quarters combat: the Winchester M1897.')
.requires('infantry_combat_1')
.runs(10).ticksPerRun(180).eut(24).cwuPerRun(0)
.itemPerRun(Item.of('gtceu:steel_plate', 8))
.itemTagPerRun('gtceu:circuits/hv', 2)
.itemPerRun(Item.of('tacz:ammo', '{AmmoId:"tacz:12g"}').withCount(6))
.itemPerRun(Item.of('minecraft:gunpowder', 15))
.unlocks(
    Item.of('tacz:modern_kinetic_gun', '{GunCurrentAmmoCount:5,GunFireMode:"SEMI",GunId:"ww:m1897",HasBulletInBarrel:1b}')
)
.icon(Item.of('tacz:modern_kinetic_gun', '{GunCurrentAmmoCount:5,GunFireMode:"SEMI",GunId:"ww:m1897",HasBulletInBarrel:1b}'))
.register()

WFResearch.builder('automatic_weapons_1')
.category('infantry').pos(1, 1)
.nodeColor(0xFF2F6BD8)
.name('Automatic Weapons I')
.description('Select-fire and full-auto small arms from the WWI-WWII era: the M712 Schnellfeuer and Sten.')
.requires('infantry_combat_1')
.runs(30).ticksPerRun(300).eut(32).cwuPerRun(0)
.itemPerRun(Item.of('gtceu:small_steel_spring', 9))
.itemTagPerRun('gtceu:circuits/hv', 2)
.itemPerRun(Item.of('tacz:ammo', '{AmmoId:"tacz:9mm"}').withCount(2))
.itemPerRun(Item.of('minecraft:gunpowder', 15))
.unlocks(
    Item.of('tacz:modern_kinetic_gun', '{GunCurrentAmmoCount:10,GunFireMode:"SEMI",GunId:"ww:m712",HasBulletInBarrel:1b}'),
    Item.of('tacz:modern_kinetic_gun', '{GunCurrentAmmoCount:16,GunFireMode:"SEMI",GunId:"ww:sten",HasBulletInBarrel:1b}')
)
.icon(Item.of('tacz:modern_kinetic_gun', '{GunCurrentAmmoCount:10,GunFireMode:"SEMI",GunId:"ww:m712",HasBulletInBarrel:1b}'))
.register()

// Placeholder — unlocked by ANY ONE of the three branches above.
WFResearch.builder('infantry_combat_1_placeholder')
.category('infantry').pos(0, 2)
.nodeColor(0xFF2F6BD8)
.name('???')
.description('Further infantry research coming soon.')
.anyOf('short_barreled_1', 'pump_action_1', 'automatic_weapons_1')
.runs(1).ticksPerRun(1).eut(32).cwuPerRun(0)
.icon(Item.of('minecraft:nether_star'))
.register()

// =========================== GROUND VEHICLES ============================
// ONE node PER vehicle, wired into a progression GRAPH (not tier groups). The ground-vehicle
// COMPONENT tree (per-part, tiered) lives to the RIGHT of this graph (x>=2) — see
// server_scripts/vehicle_research.js. Each node unlocks + research-GATEs its own vehicle build
// (gate applied per-entity in server_scripts/vehicle_factory.js via .research('<id>')).
//
// Progression:  Sodayo -> {Truck, Sodayo HMG, Sodayo MLRS};  Truck -> Kamaz;
//   Sodayo HMG -> Humvee(MG);  Sodayo MLRS -> Humvee Mk19;
//   either Humvee -> LAV-150 -> Bradley;  Bradley -> {ZTZ-99A tank, LAV-AD}.
//
// Tier sets eut/compute/time (runs x ticksPerRun(300), 20t = 1s): LV ~10 min, MV ~13, HV ~20,
// EV ~22; compute LV 0 / MV ~64 / HV ~256 / EV ~1024 CWU/t (per CLAUDE.md).
const pv = e => Item.of('wfcore:packaged_vehicle', '{entity:"' + e + '"}')
const VT = {  // tier -> [runs, eut, cwuPerRun, [itemPerRun...]]
    lv: [40,   32,   0,      [['gtceu:steel_gearbox', 2], ['gtceu:lv_electric_motor', 3], ['superbwarfare:wheel', 4]]],
    mv: [52,   128,  19200,  [['gtceu:aluminium_plate', 6], ['gtceu:mv_electric_motor', 2], ['#gtceu:circuits/mv', 2]]],
    hv: [80,   512,  76800,  [['gtceu:stainless_steel_plate', 6], ['gtceu:hv_electric_motor', 2], ['#gtceu:circuits/hv', 2]]],
    ev: [88,   2048, 307200, [['gtceu:titanium_plate', 6], ['gtceu:ev_electric_motor', 2], ['#gtceu:circuits/ev', 2]]],
    iv: [96,   8192, 1228800, [['gtceu:tungsten_steel_plate', 6], ['gtceu:iv_electric_motor', 2], ['#gtceu:circuits/iv', 2]]],  // ~4096 CWU/t = IV midpoint
}

// Central ROOT: every ground vehicle stems from Wheel research. (The vehicle COMPONENT tree is a
// SEPARATE, independent tree to the right — see server_scripts/vehicle_research.js.)
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

// =========================== EMPLACEMENTS (Defences) ============================
// Crew-served / static weapons on the 'defense' tab. Unlike vehicles these deploy from ITEMS (SBW
// blueprints / deployers) and, once placed, CANNOT be recovered — EXCEPT the Mortar and TOW, which are
// GT-crowbar recoverable via the wfcore:gt_crowbar_pickup_allowed entity tag (see
// kubejs/data/wfcore/tags/entity_types/gt_crowbar_pickup_allowed.json). The projectiles they fire are
// researched on the BALLISTICS tab (large_caliber_shells / armor_piercing_1), never here.
//
// Tree:  Mortar -> {CIWS, MLRS};  CIWS -> {TOW, BL-132};  BL-132 -> {Mk42, Mle1934}.
//   (the anti-naval cannons go "deeper" off the CIWS line; the large-calibre naval guns are the EV tail.)
//
// tier -> [runs, eut, cwuPerRun] over ticksPerRun(300): LV 0 / MV ~64 / HV ~256 / EV ~1024 CWU/t
// (CLAUDE.md "Research compute balance"). Costs/tiers are a first pass — tune for pacing.
const ET = {
    lv: [20, 32,   0],
    mv: [30, 128,  19200],
    hv: [40, 512,  76800],
    ev: [50, 2048, 307200],
}
// The naval guns unlock from BLUEPRINT items, Mortar/TOW from DEPLOYER items; the Type-63 MLRS assembles
// straight to an entity (no item), so it shows the packaged-vehicle model via pv().
;[
    { id: 'emp_mortar',   tier: 'lv', x: 0,  y: 0, req: null,        name: 'Mortar',
      unlock: Item.of('superbwarfare:mortar_deployer'),
      desc: 'A man-portable mortar built from a barrel, bipod and base plate; lobs HE and white-phosphorus shells. Deploys from an item and is one of only two emplacements recoverable with a GT crowbar.',
      items: [['gtceu:steel_plate', 6], ['minecraft:gunpowder', 4]] },
    { id: 'emp_ciws',     tier: 'mv', x: -1, y: 1, req: 'emp_mortar', name: 'H/PJ-11 CIWS',
      unlock: pv('superbwarfare:hpj_11'),
      desc: 'A radar-directed close-in weapon system: a rotary autocannon that shreds incoming aircraft and munitions. Fires large-calibre shells (Ballistics tab).',
      items: [['gtceu:stainless_steel_plate', 6], ['#gtceu:circuits/mv', 2], ['superbwarfare:seeker', 1]] },
    { id: 'emp_mlrs',     tier: 'mv', x: 1,  y: 1, req: 'emp_mortar', name: 'Type-63 MLRS',
      unlock: pv('superbwarfare:type_63'),
      desc: 'The Type-63 107mm multiple rocket launcher: twelve tubes of area-saturation rocketry, built up from mortar barrels.',
      items: [['gtceu:stainless_steel_plate', 6], ['superbwarfare:mortar_barrel', 4], ['minecraft:gunpowder', 8]] },
    { id: 'emp_tow',      tier: 'hv', x: -2, y: 2, req: 'emp_ciws',   name: 'TOW Launcher',
      unlock: Item.of('superbwarfare:tow_deployer'),
      desc: 'A tripod-mounted wire-guided anti-tank missile launcher. Deploys from an item and is one of only two emplacements recoverable with a GT crowbar.',
      items: [['gtceu:stainless_steel_plate', 6], ['superbwarfare:missile_engine', 2], ['superbwarfare:seeker', 1]] },
    { id: 'emp_bl_132',   tier: 'hv', x: 0,  y: 2, req: 'emp_ciws',   name: '130mm/58 BL-132',
      unlock: pv('superbwarfare:bl_132'),
      desc: 'A rapid-fire naval mount firing small-calibre armour-piercing shells (Ballistics tab).',
      items: [['gtceu:stainless_steel_plate', 8], ['superbwarfare:cannon_core', 1], ['#gtceu:circuits/hv', 2]] },
    { id: 'emp_mk_42',    tier: 'ev', x: -1, y: 3, req: 'emp_bl_132', name: '5"/54 Mk42',
      unlock: pv('superbwarfare:mk_42'),
      desc: 'A 5-inch dual-purpose naval gun firing large-calibre HE / AP / cluster / white-phosphorus shells (Ballistics tab).',
      items: [['gtceu:titanium_plate', 8], ['superbwarfare:cannon_core', 2], ['#gtceu:circuits/ev', 2]] },
    { id: 'emp_mle_1934', tier: 'ev', x: 1,  y: 3, req: 'emp_bl_132', name: '138.6mm Mle1934',
      unlock: pv('superbwarfare:mle_1934'),
      desc: 'A 138.6mm heavy naval gun firing large-calibre HE / AP / cluster / white-phosphorus shells (Ballistics tab).',
      items: [['gtceu:titanium_plate', 8], ['superbwarfare:cannon_core', 2], ['#gtceu:circuits/ev', 2]] },
].forEach(n => {
    const t = ET[n.tier]
    const b = WFResearch.builder(n.id)
        .category('defense').pos(n.x, n.y)
        .nodeColor(0xFF2F6BD8)
        .name(n.name)
        .description(n.desc)
        .runs(t[0]).ticksPerRun(300).eut(t[1]).cwuPerRun(t[2])
        .icon(n.unlock)
        .unlock(n.unlock)
    n.items.forEach(it => addCost(b, it[0], it[1]))
    if (n.req) b.requires(n.req)
    b.register()
})

})
