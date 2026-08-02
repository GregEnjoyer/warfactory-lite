// Infantry research — one node per gun, plus man-portable heavy launchers.
// Runs in ServerEvents.recipes (fires on server start AND /reload).
//
// Tier spine:  db_long (shotguns LV root) -> m1 (semi-auto rifles LV) -> ak47 (assault rifles MV) -> m1918a2 (MGs MV)
//              db_long also spawns -> mp38 (SMGs LV)
// Cost scales with hierarchy rank (hops from tier entry):
//   LV  eut=32  cwu=0   runs=4+2*rank  plate(3+rank)  spring(2+rank)  gunpowder(4)
//   MV  eut=90  cwu=4800+1200*rank  runs=8+2*rank  aluminium(5+rank)  circuits/mv(1 if rank<2 else 2)  spring(4+rank)

var BLUE  = 0xFF2F6BD8
var EU_LV = 32
var EU_MV = 128
var EU_EV = 2048

var gun = id => Item.of('tacz:modern_kinetic_gun',
    '{GunCurrentAmmoCount:2,GunId:"' + id + '",HasBulletInBarrel:1b}')

ServerEvents.recipes(event => {

    // Retire the old grouped nodes (registry persists across /reload).
    ;['shotgun1', 'rifle1', 'SMG', 'rifle2', 'heavy1'].forEach(id => WFResearch.remove(id))

    // ======================== SHOTGUNS — LV root ========================

    // db_long  rank 0  runs=4
    WFResearch.builder('inf_db_long')
        .category('infantry').pos(0, 0).nodeColor(BLUE)
        .name('Break-Action Shotgun')
        .description('A crude two-barrel break-action — the simplest way to put buckshot downrange.')
        .runs(4).ticksPerRun(300).eut(EU_LV).cwuPerRun(0)
        .itemPerRun(Item.of('gtceu:steel_plate', 3))
        .itemPerRun(Item.of('gtceu:small_steel_spring', 2))
        .itemPerRun(Item.of('minecraft:gunpowder', 4))
        .unlocks(gun('tacz:db_long')).icon(gun('tacz:db_long')).register()

    // m1897  rank 1  runs=6
    WFResearch.builder('inf_m1897')
        .category('infantry').pos(2, 0).nodeColor(BLUE)
        .name('Winchester 1897')
        .description('Browning\'s pump-action classic; a slam-fire trench broom.')
        .requires('inf_db_long')
        .runs(6).ticksPerRun(300).eut(EU_LV).cwuPerRun(0)
        .itemPerRun(Item.of('gtceu:steel_plate', 4))
        .itemPerRun(Item.of('gtceu:small_steel_spring', 3))
        .itemPerRun(Item.of('minecraft:gunpowder', 4))
        .unlocks(gun('ww:m1897')).icon(gun('ww:m1897')).register()

    // m870  rank 2  runs=8
    WFResearch.builder('inf_m870')
        .category('infantry').pos(4, 0).nodeColor(BLUE)
        .name('Remington 870')
        .description('The refined pump-action workhorse — reliable close-quarters firepower.')
        .requires('inf_m1897')
        .runs(8).ticksPerRun(300).eut(EU_LV).cwuPerRun(0)
        .itemPerRun(Item.of('gtceu:steel_plate', 5))
        .itemPerRun(Item.of('gtceu:small_steel_spring', 4))
        .itemPerRun(Item.of('minecraft:gunpowder', 4))
        .unlocks(gun('tacz:m870')).icon(gun('tacz:m870')).register()

    // ======================== SEMI-AUTO RIFLES — LV, entry off db_long ========================

    // m1  rank 0  runs=4
    WFResearch.builder('inf_m1')
        .category('infantry').pos(0, 3).nodeColor(BLUE)
        .name('M1 Carbine')
        .description('A light, fast-handling semi-auto in .30 Carbine — the tier gateway.')
        .requires('inf_db_long')
        .runs(4).ticksPerRun(300).eut(EU_LV).cwuPerRun(0)
        .itemPerRun(Item.of('gtceu:steel_plate', 3))
        .itemPerRun(Item.of('gtceu:small_steel_spring', 2))
        .itemPerRun(Item.of('minecraft:gunpowder', 4))
        .unlocks(gun('ww:m1')).icon(gun('ww:m1')).register()

    // svt_40  rank 1  runs=6
    WFResearch.builder('inf_svt_40')
        .category('infantry').pos(2, 3).nodeColor(BLUE)
        .name('SVT-40')
        .description('The Soviet self-loader in full-power 7.62x54R.')
        .requires('inf_m1')
        .runs(6).ticksPerRun(300).eut(EU_LV).cwuPerRun(0)
        .itemPerRun(Item.of('gtceu:steel_plate', 4))
        .itemPerRun(Item.of('gtceu:small_steel_spring', 3))
        .itemPerRun(Item.of('minecraft:gunpowder', 4))
        .unlocks(gun('ww:svt_40')).icon(gun('ww:svt_40')).register()

    // m1g  rank 2  runs=8
    WFResearch.builder('inf_m1g')
        .category('infantry').pos(4, 3).nodeColor(BLUE)
        .name('M1 Garand')
        .description('The premier semi-auto battle rifle of its era — an eight-round en-bloc punch.')
        .requires('inf_svt_40')
        .runs(8).ticksPerRun(300).eut(EU_LV).cwuPerRun(0)
        .itemPerRun(Item.of('gtceu:steel_plate', 5))
        .itemPerRun(Item.of('gtceu:small_steel_spring', 4))
        .itemPerRun(Item.of('minecraft:gunpowder', 4))
        .unlocks(gun('ww:m1g')).icon(gun('ww:m1g')).register()

    // g43  rank 2  runs=8  (also off svt_40)
    WFResearch.builder('inf_g43')
        .category('infantry').pos(2, 4).nodeColor(BLUE)
        .name('Gewehr 43')
        .description('Germany\'s answer to the self-loading rifle, in 7.92x57 Mauser.')
        .requires('inf_svt_40')
        .runs(8).ticksPerRun(300).eut(EU_LV).cwuPerRun(0)
        .itemPerRun(Item.of('gtceu:steel_plate', 5))
        .itemPerRun(Item.of('gtceu:small_steel_spring', 4))
        .itemPerRun(Item.of('minecraft:gunpowder', 4))
        .unlocks(gun('ww:g43')).icon(gun('ww:g43')).register()

    // ======================== SUBMACHINE GUNS — LV, branches off shotgun root ========================

    // mp38  rank 0  runs=4
    WFResearch.builder('inf_mp38')
        .category('infantry').pos(-3, 1).nodeColor(BLUE)
        .name('MP 38')
        .description('The original folding-stock submachine gun — the SMG gateway.')
        .requires('inf_db_long')
        .runs(4).ticksPerRun(300).eut(EU_LV).cwuPerRun(0)
        .itemPerRun(Item.of('gtceu:steel_plate', 3))
        .itemPerRun(Item.of('gtceu:small_steel_spring', 2))
        .itemPerRun(Item.of('minecraft:gunpowder', 4))
        .unlocks(gun('ww:mp38')).icon(gun('ww:mp38')).register()

    // sten  rank 1  runs=6
    WFResearch.builder('inf_sten')
        .category('infantry').pos(-3, 2).nodeColor(BLUE)
        .name('Sten')
        .description('Cheap, stamped, and everywhere.')
        .requires('inf_mp38')
        .runs(6).ticksPerRun(300).eut(EU_LV).cwuPerRun(0)
        .itemPerRun(Item.of('gtceu:steel_plate', 4))
        .itemPerRun(Item.of('gtceu:small_steel_spring', 3))
        .itemPerRun(Item.of('minecraft:gunpowder', 4))
        .unlocks(gun('ww:sten')).icon(gun('ww:sten')).register()

    // pps  rank 2  runs=8
    WFResearch.builder('inf_pps')
        .category('infantry').pos(-3, 3).nodeColor(BLUE)
        .name('PPS-43')
        .description('A compact, high-rate Soviet SMG.')
        .requires('inf_sten')
        .runs(8).ticksPerRun(300).eut(EU_LV).cwuPerRun(0)
        .itemPerRun(Item.of('gtceu:steel_plate', 5))
        .itemPerRun(Item.of('gtceu:small_steel_spring', 4))
        .itemPerRun(Item.of('minecraft:gunpowder', 4))
        .unlocks(gun('ww:pps')).icon(gun('ww:pps')).register()

    // m1a1  rank 3  runs=10
    WFResearch.builder('inf_m1a1')
        .category('infantry').pos(-3, 4).nodeColor(BLUE)
        .name('M1A1 Thompson')
        .description('Hard-hitting .45 ACP in a heavy, controllable package.')
        .requires('inf_pps')
        .runs(10).ticksPerRun(300).eut(EU_LV).cwuPerRun(0)
        .itemPerRun(Item.of('gtceu:steel_plate', 6))
        .itemPerRun(Item.of('gtceu:small_steel_spring', 5))
        .itemPerRun(Item.of('minecraft:gunpowder', 4))
        .unlocks(gun('ww:m1a1')).icon(gun('ww:m1a1')).register()

    // t100l  rank 4  runs=12  (SMG apex)
    WFResearch.builder('inf_t100l')
        .category('infantry').pos(-3, 5).nodeColor(BLUE)
        .name('Type 100')
        .description('The highest cyclic rate in the SMG line — the tier apex.')
        .requires('inf_m1a1')
        .runs(12).ticksPerRun(300).eut(EU_LV).cwuPerRun(0)
        .itemPerRun(Item.of('gtceu:steel_plate', 7))
        .itemPerRun(Item.of('gtceu:small_steel_spring', 6))
        .itemPerRun(Item.of('minecraft:gunpowder', 4))
        .unlocks(gun('ww:t100l')).icon(gun('ww:t100l')).register()

    // ======================== ASSAULT RIFLES — MV, entry ak47 off m1 ========================

    // ak47  rank 0  runs=8  cwu=4800
    WFResearch.builder('inf_ak47')
        .category('infantry').pos(0, 6).nodeColor(BLUE)
        .name('AK-47')
        .description('The archetypal assault rifle — rugged, reliable, and the tier gateway.')
        .requires('inf_m1')
        .runs(8).ticksPerRun(300).eut(90).cwuPerRun(4800)
        .itemPerRun(Item.of('gtceu:aluminium_plate', 5))
        .itemTagPerRun('gtceu:circuits/mv', 1)
        .itemPerRun(Item.of('gtceu:small_steel_spring', 4))
        .unlocks(gun('tacz:ak47')).icon(gun('tacz:ak47')).register()

    // type_81  rank 1  runs=10  cwu=6000
    WFResearch.builder('inf_type_81')
        .category('infantry').pos(2, 6).nodeColor(BLUE)
        .name('Type 81')
        .description('A refined Kalashnikov-pattern service rifle.')
        .requires('inf_ak47')
        .runs(10).ticksPerRun(300).eut(90).cwuPerRun(6000)
        .itemPerRun(Item.of('gtceu:aluminium_plate', 6))
        .itemTagPerRun('gtceu:circuits/mv', 1)
        .itemPerRun(Item.of('gtceu:small_steel_spring', 5))
        .unlocks(gun('tacz:type_81')).icon(gun('tacz:type_81')).register()

    // m16a1  rank 2  runs=12  cwu=7200
    WFResearch.builder('inf_m16a1')
        .category('infantry').pos(4, 6).nodeColor(BLUE)
        .name('M16A1')
        .description('Lightweight 5.56 with a flat, fast trajectory.')
        .requires('inf_type_81')
        .runs(12).ticksPerRun(300).eut(90).cwuPerRun(7200)
        .itemPerRun(Item.of('gtceu:aluminium_plate', 7))
        .itemTagPerRun('gtceu:circuits/mv', 2)
        .itemPerRun(Item.of('gtceu:small_steel_spring', 6))
        .unlocks(gun('tacz:m16a1')).icon(gun('tacz:m16a1')).register()

    // m4a1  rank 3  runs=14  cwu=8400
    WFResearch.builder('inf_m4a1')
        .category('infantry').pos(6, 6).nodeColor(BLUE)
        .name('M4A1')
        .description('The compact, modular carbine standard.')
        .requires('inf_m16a1')
        .runs(14).ticksPerRun(300).eut(90).cwuPerRun(8400)
        .itemPerRun(Item.of('gtceu:aluminium_plate', 8))
        .itemTagPerRun('gtceu:circuits/mv', 2)
        .itemPerRun(Item.of('gtceu:small_steel_spring', 7))
        .unlocks(gun('tacz:m4a1')).icon(gun('tacz:m4a1')).register()

    // g36c  rank 4  runs=16  cwu=9600
    WFResearch.builder('inf_g36c')
        .category('infantry').pos(8, 5).nodeColor(BLUE)
        .name('G36C')
        .description('A short, handy polymer carbine.')
        .requires('inf_m4a1')
        .runs(16).ticksPerRun(300).eut(90).cwuPerRun(9600)
        .itemPerRun(Item.of('gtceu:aluminium_plate', 9))
        .itemTagPerRun('gtceu:circuits/mv', 2)
        .itemPerRun(Item.of('gtceu:small_steel_spring', 8))
        .unlocks(gun('ronmc:g36c')).icon(gun('ronmc:g36c')).register()

    // aug  rank 4  runs=16  cwu=9600
    WFResearch.builder('inf_aug')
        .category('infantry').pos(8, 7).nodeColor(BLUE)
        .name('Steyr AUG')
        .description('A bullpup with an integrated optic.')
        .requires('inf_m4a1')
        .runs(16).ticksPerRun(300).eut(90).cwuPerRun(9600)
        .itemPerRun(Item.of('gtceu:aluminium_plate', 9))
        .itemTagPerRun('gtceu:circuits/mv', 2)
        .itemPerRun(Item.of('gtceu:small_steel_spring', 8))
        .unlocks(gun('tacz:aug')).icon(gun('tacz:aug')).register()

    // scar_l  rank 1  runs=10  cwu=6000  (second branch off ak47)
    WFResearch.builder('inf_scar_l')
        .category('infantry').pos(2, 7).nodeColor(BLUE)
        .name('SCAR-L')
        .description('A modern modular 5.56 rifle.')
        .requires('inf_ak47')
        .runs(10).ticksPerRun(300).eut(90).cwuPerRun(6000)
        .itemPerRun(Item.of('gtceu:aluminium_plate', 6))
        .itemTagPerRun('gtceu:circuits/mv', 1)
        .itemPerRun(Item.of('gtceu:small_steel_spring', 5))
        .unlocks(gun('tacz:scar_l')).icon(gun('tacz:scar_l')).register()

    // ga416  rank 2  runs=12  cwu=7200
    WFResearch.builder('inf_ga416')
        .category('infantry').pos(4, 7).nodeColor(BLUE)
        .name('HK416')
        .description('A piston-driven precision carbine — the modern 5.56 apex.')
        .requires('inf_scar_l')
        .runs(12).ticksPerRun(300).eut(90).cwuPerRun(7200)
        .itemPerRun(Item.of('gtceu:aluminium_plate', 7))
        .itemTagPerRun('gtceu:circuits/mv', 2)
        .itemPerRun(Item.of('gtceu:small_steel_spring', 6))
        .unlocks(gun('ronmc:ga416')).icon(gun('ronmc:ga416')).register()

    // hk_g3  rank 1  runs=10  cwu=6000  (7.62 NATO branch off ak47)
    WFResearch.builder('inf_hk_g3')
        .category('infantry').pos(2, 8).nodeColor(BLUE)
        .name('HK G3')
        .description('A hard-hitting 7.62 NATO battle rifle.')
        .requires('inf_ak47')
        .runs(10).ticksPerRun(300).eut(90).cwuPerRun(6000)
        .itemPerRun(Item.of('gtceu:aluminium_plate', 6))
        .itemTagPerRun('gtceu:circuits/mv', 1)
        .itemPerRun(Item.of('gtceu:small_steel_spring', 5))
        .unlocks(gun('tacz:hk_g3')).icon(gun('tacz:hk_g3')).register()

    // fn_fal  rank 2  runs=12  cwu=7200
    WFResearch.builder('inf_fn_fal')
        .category('infantry').pos(4, 8).nodeColor(BLUE)
        .name('FN FAL')
        .description('"The right arm of the free world" in 7.62 NATO.')
        .requires('inf_hk_g3')
        .runs(12).ticksPerRun(300).eut(90).cwuPerRun(7200)
        .itemPerRun(Item.of('gtceu:aluminium_plate', 7))
        .itemTagPerRun('gtceu:circuits/mv', 2)
        .itemPerRun(Item.of('gtceu:small_steel_spring', 6))
        .unlocks(gun('tacz:fn_fal')).icon(gun('tacz:fn_fal')).register()

    // ======================== MACHINE GUNS — MV, entry m1918a2 off ak47 ========================

    // m1918a2  rank 0  runs=8  cwu=4800
    WFResearch.builder('inf_m1918a2')
        .category('infantry').pos(0, 9).nodeColor(BLUE)
        .name('BAR M1918A2')
        .description('A walking-fire automatic rifle — the MG gateway.')
        .requires('inf_ak47')
        .runs(8).ticksPerRun(300).eut(90).cwuPerRun(4800)
        .itemPerRun(Item.of('gtceu:aluminium_plate', 5))
        .itemTagPerRun('gtceu:circuits/mv', 1)
        .itemPerRun(Item.of('gtceu:small_steel_spring', 4))
        .unlocks(gun('ww:m1918a2')).icon(gun('ww:m1918a2')).register()

    // dp28  rank 1  runs=10  cwu=6000
    WFResearch.builder('inf_dp28')
        .category('infantry').pos(2, 9).nodeColor(BLUE)
        .name('DP-28')
        .description('The pan-fed Soviet light machine gun.')
        .requires('inf_m1918a2')
        .runs(10).ticksPerRun(300).eut(90).cwuPerRun(6000)
        .itemPerRun(Item.of('gtceu:aluminium_plate', 6))
        .itemTagPerRun('gtceu:circuits/mv', 1)
        .itemPerRun(Item.of('gtceu:small_steel_spring', 5))
        .unlocks(gun('ww:dp28')).icon(gun('ww:dp28')).register()

    // mg34  rank 2  runs=12  cwu=7200
    WFResearch.builder('inf_mg34')
        .category('infantry').pos(4, 9).nodeColor(BLUE)
        .name('MG34')
        .description('The first true general-purpose machine gun.')
        .requires('inf_dp28')
        .runs(12).ticksPerRun(300).eut(90).cwuPerRun(7200)
        .itemPerRun(Item.of('gtceu:aluminium_plate', 7))
        .itemTagPerRun('gtceu:circuits/mv', 2)
        .itemPerRun(Item.of('gtceu:small_steel_spring', 6))
        .unlocks(gun('ww:mg34')).icon(gun('ww:mg34')).register()

    // mg42  rank 3  runs=14  cwu=8400  (WW2 MG apex)
    WFResearch.builder('inf_mg42')
        .category('infantry').pos(6, 9).nodeColor(BLUE)
        .name('MG42')
        .description('The 1,300-RPM buzzsaw — the WW2 machine-gun apex.')
        .requires('inf_mg34')
        .runs(14).ticksPerRun(300).eut(90).cwuPerRun(8400)
        .itemPerRun(Item.of('gtceu:aluminium_plate', 8))
        .itemTagPerRun('gtceu:circuits/mv', 2)
        .itemPerRun(Item.of('gtceu:small_steel_spring', 7))
        .unlocks(gun('ww:mg42')).icon(gun('ww:mg42')).register()

    // rpk  rank 1  runs=10  cwu=6000  (AK-pattern SAW branch off m1918a2)
    WFResearch.builder('inf_rpk')
        .category('infantry').pos(2, 10).nodeColor(BLUE)
        .name('RPK')
        .description('A magazine-fed squad automatic on the AK pattern.')
        .requires('inf_m1918a2')
        .runs(10).ticksPerRun(300).eut(90).cwuPerRun(6000)
        .itemPerRun(Item.of('gtceu:aluminium_plate', 6))
        .itemTagPerRun('gtceu:circuits/mv', 1)
        .itemPerRun(Item.of('gtceu:small_steel_spring', 5))
        .unlocks(gun('tacz:rpk')).icon(gun('tacz:rpk')).register()

    // m249  rank 2  runs=12  cwu=7200
    WFResearch.builder('inf_m249')
        .category('infantry').pos(4, 10).nodeColor(BLUE)
        .name('M249 SAW')
        .description('Belt-fed 5.56 for sustained suppressing fire.')
        .requires('inf_rpk')
        .runs(12).ticksPerRun(300).eut(90).cwuPerRun(7200)
        .itemPerRun(Item.of('gtceu:aluminium_plate', 7))
        .itemTagPerRun('gtceu:circuits/mv', 2)
        .itemPerRun(Item.of('gtceu:small_steel_spring', 6))
        .unlocks(gun('tacz:m249')).icon(gun('tacz:m249')).register()

    // ======================== HEAVY LAUNCHERS — own sub-tree ========================
    // M79 (LV) -> RPG (MV) -> {Javelin, Igla} (EV)

    WFResearch.builder('wpn_m79')
        .category('infantry').pos(11, 0)
        .nodeColor(BLUE)
        .name('M79 Grenade Launcher')
        .description('A break-action 40mm grenade launcher — the entry to the man-portable heavy-weapon line. Feeds on 40mm grenades (see Ballistics).')
        .runs(6).ticksPerRun(300).eut(EU_LV).cwuPerRun(0)
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
        .runs(12).ticksPerRun(300).eut(EU_MV).cwuPerRun(19200)   // ~64 CWU/t = MV midpoint
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
        .runs(20).ticksPerRun(300).eut(EU_EV).cwuPerRun(307200)   // ~1024 CWU/t = EV midpoint
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
        .runs(20).ticksPerRun(300).eut(EU_EV).cwuPerRun(307200)   // ~1024 CWU/t = EV midpoint
        .itemPerRun(Item.of('gtceu:titanium_plate', 8))
        .itemPerRun(Item.of('gtceu:tempered_glass', 4))
        .itemTagPerRun('gtceu:circuits/ev', 2)
        .unlocks(Item.of('superbwarfare:igla_9k38')).icon(Item.of('superbwarfare:igla_9k38')).register()

})
