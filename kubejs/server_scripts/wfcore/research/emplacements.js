// Emplacements research — all category('defense') nodes (emp_*).
// Runs in ServerEvents.recipes (fires on server start AND /reload).
//
// Tree:  Mortar -> {CIWS, MLRS};  CIWS -> {TOW, BL-132};  BL-132 -> {Mk42, Mle1934}.

var BLUE  = 0xFF2F6BD8
var EU_LV = 32
var EU_MV = 128
var EU_HV = 512
var EU_EV = 2048

var emp_model = e => Item.of('wfcore:packaged_vehicle', '{entity:"' + e + '"}')

ServerEvents.recipes(event => {

    // ---- Mortar — LV root, crowbar-recoverable ----
    WFResearch.builder('emp_mortar')
        .category('defense').pos(0, 0)
        .nodeColor(BLUE)
        .name('Mortar')
        .description('A man-portable mortar built from a barrel, bipod and base plate; lobs HE and white-phosphorus shells. Deploys from an item and is one of only two emplacements recoverable with a GT crowbar.')
        .runs(20).ticksPerRun(300).eut(EU_LV).cwuPerRun(0)
        .itemPerRun(Item.of('gtceu:steel_plate', 6))
        .itemPerRun(Item.of('minecraft:gunpowder', 4))
        .unlock(Item.of('superbwarfare:mortar_deployer'))
        .icon(Item.of('superbwarfare:mortar_deployer'))
        .register()

    // ---- H/PJ-11 CIWS — MV, off Mortar ----
    WFResearch.builder('emp_ciws')
        .category('defense').pos(-1, 1)
        .nodeColor(BLUE)
        .name('H/PJ-11 CIWS')
        .description('A radar-directed close-in weapon system: a rotary autocannon that shreds incoming aircraft and munitions. Fires small-calibre anti-air shells (Ballistics tab).')
        .requires('emp_mortar')
        .runs(30).ticksPerRun(300).eut(EU_MV).cwuPerRun(19200)
        .itemPerRun(Item.of('gtceu:stainless_steel_plate', 6))
        .itemTagPerRun('gtceu:circuits/mv', 2)
        .itemPerRun(Item.of('superbwarfare:seeker', 1))
        .unlock(emp_model('superbwarfare:hpj_11'))
        .icon(emp_model('superbwarfare:hpj_11'))
        .register()

    // ---- Type-63 MLRS — MV, off Mortar ----
    WFResearch.builder('emp_mlrs')
        .category('defense').pos(1, 1)
        .nodeColor(BLUE)
        .name('Type-63 MLRS')
        .description('The Type-63 107mm multiple rocket launcher: twelve tubes of area-saturation rocketry, built up from mortar barrels.')
        .requires('emp_mortar')
        .runs(30).ticksPerRun(300).eut(EU_MV).cwuPerRun(19200)
        .itemPerRun(Item.of('gtceu:stainless_steel_plate', 6))
        .itemPerRun(Item.of('superbwarfare:mortar_barrel', 4))
        .itemPerRun(Item.of('minecraft:gunpowder', 8))
        .unlock(emp_model('superbwarfare:type_63'))
        .icon(emp_model('superbwarfare:type_63'))
        .register()

    // ---- TOW Launcher — HV, off CIWS, crowbar-recoverable ----
    WFResearch.builder('emp_tow')
        .category('defense').pos(-2, 2)
        .nodeColor(BLUE)
        .name('TOW Launcher')
        .description('A tripod-mounted wire-guided anti-tank missile launcher. Deploys from an item and is one of only two emplacements recoverable with a GT crowbar.')
        .requires('emp_ciws')
        .runs(40).ticksPerRun(300).eut(EU_HV).cwuPerRun(76800)
        .itemPerRun(Item.of('gtceu:stainless_steel_plate', 6))
        .itemPerRun(Item.of('superbwarfare:missile_engine', 2))
        .itemPerRun(Item.of('superbwarfare:seeker', 1))
        .unlock(Item.of('superbwarfare:tow_deployer'))
        .icon(Item.of('superbwarfare:tow_deployer'))
        .register()

    // ---- 130mm/58 BL-132 — HV naval mount, off CIWS ----
    WFResearch.builder('emp_bl_132')
        .category('defense').pos(0, 2)
        .nodeColor(BLUE)
        .name('130mm/58 BL-132')
        .description('A rapid-fire naval mount firing small-calibre armour-piercing shells (Ballistics tab).')
        .requires('emp_ciws')
        .runs(40).ticksPerRun(300).eut(EU_HV).cwuPerRun(76800)
        .itemPerRun(Item.of('gtceu:stainless_steel_plate', 8))
        .itemPerRun(Item.of('superbwarfare:cannon_core', 1))
        .itemTagPerRun('gtceu:circuits/hv', 2)
        .unlock(emp_model('superbwarfare:bl_132'))
        .icon(emp_model('superbwarfare:bl_132'))
        .register()

    // ---- 5"/54 Mk42 — EV naval gun, off BL-132 ----
    WFResearch.builder('emp_mk_42')
        .category('defense').pos(-1, 3)
        .nodeColor(BLUE)
        .name('5"/54 Mk42')
        .description('A 5-inch dual-purpose naval gun firing large-calibre HE / AP / cluster / white-phosphorus shells (Ballistics tab).')
        .requires('emp_bl_132')
        .runs(50).ticksPerRun(300).eut(EU_EV).cwuPerRun(307200)
        .itemPerRun(Item.of('gtceu:titanium_plate', 8))
        .itemPerRun(Item.of('superbwarfare:cannon_core', 2))
        .itemTagPerRun('gtceu:circuits/ev', 2)
        .unlock(emp_model('superbwarfare:mk_42'))
        .icon(emp_model('superbwarfare:mk_42'))
        .register()

    // ---- 138.6mm Mle1934 — EV heavy naval gun, off BL-132 ----
    WFResearch.builder('emp_mle_1934')
        .category('defense').pos(1, 3)
        .nodeColor(BLUE)
        .name('138.6mm Mle1934')
        .description('A 138.6mm heavy naval gun firing large-calibre HE / AP / cluster / white-phosphorus shells (Ballistics tab).')
        .requires('emp_bl_132')
        .runs(50).ticksPerRun(300).eut(EU_EV).cwuPerRun(307200)
        .itemPerRun(Item.of('gtceu:titanium_plate', 8))
        .itemPerRun(Item.of('superbwarfare:cannon_core', 2))
        .itemTagPerRun('gtceu:circuits/ev', 2)
        .unlock(emp_model('superbwarfare:mle_1934'))
        .icon(emp_model('superbwarfare:mle_1934'))
        .register()

})
