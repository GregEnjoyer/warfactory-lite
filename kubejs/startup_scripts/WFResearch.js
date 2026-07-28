import com.norwood.wfcore.integration.kubejs
StartupEvents.postInit(event => {

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
.icon(Item.of('kubejs:tank_icon'))           // optional tab icon
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
.name('Base Defenses')                       // optional lang key; defaults to wfcore.research.category.logistics
.icon(Item.of('superbwarfare:barbed_wire'))           // optional tab icon
.backgroundColor(0xFF101814)                // optional solid background (used if no texture)
.connectorColor(0xFF60C060)      // colour of the connector lines
.register()

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
.description('WW-era rifle and pistol calibres: 8mm Mauser, 7.62x54R, 6.5mm Arisaka, 7.63mm Mauser, 7.65mm Para, .303 British, 7.7mm Arisaka, .30 Carbine, 8mm pistol.')
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
    Item.of('tacz:ammo', '{AmmoId:"tacz:12g"}')
)
.icon(Item.of('tacz:ammo', '{AmmoId:"tacz:792x57"}'))
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
.itemPerRun(Item.of('gtceu:basic_integrated_circuit', 2))
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
.itemPerRun(Item.of('gtceu:basic_integrated_circuit', 2))
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

// "Mobile Combustion" — root node for the ground-vehicle tree.  Unlocks the
// LV engine component; gated at LV (32 EU/t) with no compute requirement since
// the Research Unit is an MV unlock.  Item costs are placeholders.
WFResearch.builder('mobile_transport')
.category('armor').pos(0, 0)
.nodeColor(0xFF2F6BD8)
.name('Mobile Combustion and Transport')
.description('Internal combustion fundamentals for wheeled vehicles. Unlocks the LV engine component used in all early ground-vehicle assembly.')
.runs(5).ticksPerRun(300).eut(32).cwuPerRun(0)
.itemPerRun(Item.of('gtceu:steel_gearbox', 2))      // placeholder
.itemPerRun(Item.of('gtceu:steel_minecart_wheels', 6))      // placeholder
.itemPerRun(Item.of('gtceu:lv_electric_piston', 3))      // placeholder
.unlocks(Item.of('kubejs:lv_engine'))
.unlocks(Item.of('superbwarfare:wheel'))
.icon(Item.of('kubejs:lv_engine'))
.register()

// "Ground Logistics" — civilian transport vehicles.  Unlocks the Truck and
// Sodayo TenEven9 unarmed pickup.  Wheel used as display item; actual output
// is a wfcore:packaged_vehicle entity spawn.  Costs are placeholders.
WFResearch.builder('ground_logistics')
.category('armor').pos(0, 1)
.nodeColor(0xFF2F6BD8)
.name('Ground Logistics')
.description('Civilian wheeled transport: the Truck and Sodayo TenEven9 unarmed pickup. Essential for base resupply runs.')
.requires('mobile_combustion')
.runs(8).ticksPerRun(300).eut(32).cwuPerRun(0)
.unlocks(
      Item.of('wfcore:packaged_vehicle', '{entity:"superbwarfare:truck"}'),
      Item.of('wfcore:packaged_vehicle', '{entity:"superbwarfare:sodayo_pick_up"}')
      )
.icon(Item.of('superbwarfare:wheel'))
.register()

})
