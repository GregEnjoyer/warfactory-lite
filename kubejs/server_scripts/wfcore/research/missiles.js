// Missile research — category('missiles') nodes.
// Runs in ServerEvents.recipes (fires on server start AND /reload).
//
// All nodes use RUNS=8 fixed; time is ticksPerRun = MIN_MINUTES * 150 ticks.
// cwuPerRun = (eut / 2) * ticksPerRun  (tier midpoint * run length).
// Material cost per node mirrors ~4x the unlocked missile's own recipe.
//
// Branches (all root off missile_systems):
//   Demolition: thermobaric -> mininuke (IV)
//   Penetrator: penetrator -> supersonic -> hypersonic (IV)
//   ICBM: (off penetrator) icbm -> heavy ICBM (IV)
//   Bunker-buster: shaped_charges -> heavy -> tunneller (IV)
//   Cluster: cluster -> frag_storm -> skyfall (IV)
//   EMP: emp -> {emp_heavy, emp_cluster, emp_lance} (EV)
//   Interceptor: interceptor_systems -> interceptor_network -> {ace, cluster} (IV)

const ORANGE = 0xFFD8562F   // Missiles tab node colour

// Tier voltages
var EU_HV = 512
var EU_EV = 2048
var EU_IV = 8192

// Item alias constants — used in every cost list
var P         = 'gtceu:'
const ENG       = 'superbwarfare:missile_engine'
const TNT       = 'gtceu:gelled_toluene'
const RDX       = 'gtceu:rdx_dust'
var POW       = 'minecraft:gunpowder'
const SRF       = 'kubejs:solid_rocket_fuel'
const MV_RAM    = 'kubejs:mv_ram'
const HV_RAM    = 'kubejs:hv_ram'
const EV_RAM    = 'kubejs:ev_ram'
const LAPO      = 'gtceu:lapotron_crystal'
const LAPO_DUST = 'gtceu:lapotron_dust'

const M = n => Item.of('wfcore:missile_' + n)

ServerEvents.recipes(event => {

    // ======================== ROOT — missile_systems (HV) ========================
    // tpr = 15 * 150 = 2250   cwu = (512/2) * 2250 = 576000
    WFResearch.builder('missile_systems')
        .category('missiles').pos(0, 0)
        .nodeColor(ORANGE)
        .requires('missile_engines')
        .name('Missile Systems')
        .description('Unlocks the core missile line: the High-Explosive, Long-Range and (inert) Dummy missiles. The cheap Shahed loitering drones (strike/gas/loiter) are shown here too, but are RESEARCHED on the Aviation tab (Drone Tactics -> Shahed Loitering Drones); they still build at the Missile Factory.')
        .runs(8).ticksPerRun(2250).eut(EU_HV).cwuPerRun(576000)
        .itemPerRun(Item.of(P+'aluminium_plate', 42))
        .itemPerRun(Item.of(P+'blue_steel_frame', 4))
        .itemTagPerRun('gtceu:circuits/hv', 4)
        .itemPerRun(Item.of(ENG, 2))
        .itemPerRun(Item.of(TNT, 37))
        .unlocks(M('he'), M('dummy'), M('long_range'), M('strike_drone'), M('gas_drone'), M('loiter_drone'))
        .icon(M('he'))
        .register()

    // ======================== DEMOLITION BRANCH ========================

    // demolition_ordnance (HV) — tpr=2250  cwu=576000
    WFResearch.builder('demolition_ordnance')
        .category('missiles').pos(-4, 1)
        .nodeColor(ORANGE)
        .name('Demolition Ordnance')
        .description('Fuel-air thermobaric warheads: a modest crater but an enormous, hard-hitting overpressure blast.')
        .requires('missile_systems')
        .runs(8).ticksPerRun(2250).eut(EU_HV).cwuPerRun(576000)
        .itemPerRun(Item.of(P+'titanium_plate', 64))
        .itemPerRun(Item.of(P+'hssg_frame', 2))
        .itemPerRun(Item.of(ENG, 6))
        .itemTagPerRun('gtceu:circuits/hv', 4)
        .itemPerRun(Item.of(RDX, 32))
        .unlock(M('thermobaric')).icon(M('thermobaric'))
        .register()

    // tactical_nuclear (IV) — tpr=6750  cwu=27648000
    WFResearch.builder('tactical_nuclear')
        .category('missiles').pos(-4, 2)
        .nodeColor(ORANGE)
        .name('Tactical Nuclear')
        .description('A compact nuclear earth-penetrator: a ~50-block devastation plus a deep shaped jet that drives through fortification.')
        .requires('demolition_ordnance')
        .runs(8).ticksPerRun(6750).eut(EU_IV).cwuPerRun(27648000)
        .itemPerRun(Item.of(P+'hsss_plate', 80))
        .itemPerRun(Item.of(P+'titanium_plate', 5))
        .itemPerRun(Item.of(ENG, 20))
        .itemPerRun(Item.of(RDX, 10))
        .itemPerRun(Item.of(P+'double_beryllium_plate', 20))
        .itemPerRun(Item.of(P+'uranium_235_block', 5))
        .itemTagPerRun('gtceu:circuits/iv', 10)
        .unlock(M('mininuke')).icon(M('mininuke'))
        .register()

    // ======================== PENETRATOR BRANCH ========================

    // penetrator_missiles (HV) — tpr=2250  cwu=576000
    WFResearch.builder('penetrator_missiles')
        .category('missiles').pos(-2, 1)
        .nodeColor(ORANGE)
        .name('Penetrator Missiles')
        .description('Fast, evasive HE rounds that shrug off lower-tier interceptors by out-running them.')
        .requires('missile_systems')
        .runs(8).ticksPerRun(2250).eut(EU_HV).cwuPerRun(576000)
        .itemPerRun(Item.of(P+'titanium_plate', 32))
        .itemPerRun(Item.of(P+'ultimet_frame', 4))
        .itemPerRun(Item.of(ENG, 8))
        .itemTagPerRun('gtceu:circuits/hv', 5)
        .itemPerRun(Item.of(TNT, 32))
        .unlock(M('penetrator')).icon(M('penetrator'))
        .register()

    // penetrator_supersonic (EV) — tpr=4500  cwu=4608000
    WFResearch.builder('penetrator_supersonic')
        .category('missiles').pos(-3, 2)
        .nodeColor(ORANGE)
        .name('Supersonic Penetrator')
        .description('A supersonic penetrator: fast enough that only a good interceptor catches it.')
        .requires('penetrator_missiles')
        .runs(8).ticksPerRun(4500).eut(EU_EV).cwuPerRun(4608000)
        .itemPerRun(Item.of(P+'incoloy_ma_956_plate', 48))
        .itemPerRun(Item.of(P+'hssg_frame', 4))
        .itemPerRun(Item.of(ENG, 16))
        .itemTagPerRun('gtceu:circuits/ev', 6)
        .itemPerRun(Item.of(TNT, 48))
        .unlock(M('penetrator_supersonic')).icon(M('penetrator_supersonic'))
        .register()

    // penetrator_hypersonic (IV) — tpr=6750  cwu=27648000
    WFResearch.builder('penetrator_hypersonic')
        .category('missiles').pos(-3, 3)
        .nodeColor(ORANGE)
        .name('Hypersonic Penetrator')
        .description('The hypersonic penetrator: a near-sure hit against anything but a top-tier interceptor.')
        .requires('penetrator_supersonic')
        .runs(8).ticksPerRun(6750).eut(EU_IV).cwuPerRun(27648000)
        .itemPerRun(Item.of(P+'hsss_plate', 60))
        .itemPerRun(Item.of(P+'incoloy_ma_956_frame', 5))
        .itemPerRun(Item.of(ENG, 40))
        .itemTagPerRun('gtceu:circuits/iv', 10)
        .itemPerRun(Item.of(TNT, 80))
        .unlock(M('penetrator_hypersonic')).icon(M('penetrator_hypersonic'))
        .register()

    // ======================== ICBM BRANCH (off penetrator_missiles) ========================

    // icbm (EV) — tpr=4500  cwu=4608000
    WFResearch.builder('icbm')
        .category('missiles').pos(-1, 2)
        .nodeColor(ORANGE)
        .name('ICBM')
        .description('Extreme-range, high-altitude ICBM with a fast 90-degree descent that throws off lower-tier interceptors. Low blast radius, strong punch, very tanky.')
        .requires('penetrator_missiles')
        .runs(8).ticksPerRun(4500).eut(EU_EV).cwuPerRun(4608000)
        .itemPerRun(Item.of(P+'double_titanium_plate', 32))
        .itemPerRun(Item.of(ENG, 8))
        .itemPerRun(Item.of(SRF, 12))
        .itemTagPerRun('gtceu:circuits/ev', 5)
        .itemPerRun(Item.of(HV_RAM, 1))
        .itemPerRun(Item.of(RDX, 42))
        .unlock(M('icbm')).icon(M('icbm'))
        .register()

    // icbm_heavy (IV) — tpr=6750  cwu=27648000
    WFResearch.builder('icbm_heavy')
        .category('missiles').pos(-1, 3)
        .nodeColor(ORANGE)
        .name('Heavy ICBM')
        .description('The heavy ICBM: longer reach, a stronger warhead and the toughest airframe in the suite.')
        .requires('icbm')
        .runs(8).ticksPerRun(6750).eut(EU_IV).cwuPerRun(27648000)
        .itemPerRun(Item.of(P+'double_tungsten_steel_plate', 40))
        .itemPerRun(Item.of(P+'stainless_steel_plate', 20))
        .itemPerRun(Item.of(ENG, 15))
        .itemPerRun(Item.of(SRF, 30))
        .itemTagPerRun('gtceu:circuits/iv', 6)
        .itemPerRun(Item.of(RDX, 62))
        .itemPerRun(Item.of(EV_RAM, 2))
        .unlock(M('icbm_heavy')).icon(M('icbm_heavy'))
        .register()

    // ======================== BUNKER-BUSTER BRANCH ========================

    // shaped_charges (HV) — tpr=2250  cwu=576000
    WFResearch.builder('shaped_charges')
        .category('missiles').pos(2, 1)
        .nodeColor(ORANGE)
        .name('Shaped Charges')
        .description('A narrow shaped-charge jet that cracks all defences to gravel — but needs a follow-up round to finish hardened armour.')
        .requires('missile_systems')
        .runs(8).ticksPerRun(2250).eut(EU_HV).cwuPerRun(576000)
        .itemPerRun(Item.of(P+'stainless_steel_plate', 24))
        .itemPerRun(Item.of(P+'blue_steel_plate', 12))
        .itemPerRun(Item.of(POW, 24))
        .itemPerRun(Item.of(TNT, 24))
        .itemTagPerRun('gtceu:circuits/hv', 2)
        .unlock(M('bunker_buster')).unlock(M('shitbox_buster')).icon(M('bunker_buster'))
        .register()

    // bunker_buster_heavy (EV) — tpr=4500  cwu=4608000
    WFResearch.builder('bunker_buster_heavy')
        .category('missiles').pos(2, 2)
        .nodeColor(ORANGE)
        .name('Heavy Bunker Buster')
        .description('A heavier, more accurate shaped charge that cracks even tungsten-class plating.')
        .requires('shaped_charges')
        .runs(8).ticksPerRun(4500).eut(EU_EV).cwuPerRun(4608000)
        .itemPerRun(Item.of(P+'titanium_plate', 27))
        .itemPerRun(Item.of(P+'ultimet_plate', 16))
        .itemPerRun(Item.of(POW, 28))
        .itemPerRun(Item.of(RDX, 16))
        .itemTagPerRun('gtceu:circuits/ev', 3)
        .unlock(M('bunker_buster_heavy')).icon(M('bunker_buster_heavy'))
        .register()

    // bunker_tunneller (IV) — tpr=6750  cwu=27648000
    WFResearch.builder('bunker_tunneller')
        .category('missiles').pos(2, 3)
        .nodeColor(ORANGE)
        .name('Tunneller')
        .description('The Tunneller bores in up to 15 blocks (stopped early by tungsten-class shielding) and detonates inside.')
        .requires('bunker_buster_heavy')
        .runs(8).ticksPerRun(6750).eut(EU_IV).cwuPerRun(27648000)
        .itemPerRun(Item.of(P+'tungsten_steel_plate', 32))
        .itemPerRun(Item.of(P+'hsss_plate', 16))
        .itemPerRun(Item.of(POW, 32))
        .itemPerRun(Item.of(RDX, 32))
        .itemTagPerRun('gtceu:circuits/iv', 3)
        .unlock(M('bunker_tunneller')).icon(M('bunker_tunneller'))
        .register()

    // ======================== CLUSTER BRANCH ========================

    // cluster_munitions (HV) — tpr=2250  cwu=576000
    WFResearch.builder('cluster_munitions')
        .category('missiles').pos(4, 1)
        .nodeColor(ORANGE)
        .name('Cluster Munitions')
        .description('Anti-personnel cluster missiles: fragmentation, incendiary (white phosphorus) and chemical (mustard gas) variants.')
        .requires('missile_systems')
        .runs(8).ticksPerRun(2250).eut(EU_HV).cwuPerRun(576000)
        .itemPerRun(Item.of(P+'vanadium_steel_frame', 6))
        .itemPerRun(Item.of(P+'lead_round', 32))
        .itemPerRun(Item.of(P+'stainless_steel_plate', 38))
        .itemPerRun(Item.of(POW, 24))
        .itemPerRun(Item.of(TNT, 16))
        .unlocks(M('cluster'), M('cluster_fire'), M('cluster_gas'))
        .icon(M('cluster'))
        .register()

    // frag_storm (EV) — tpr=4500  cwu=4608000
    WFResearch.builder('frag_storm')
        .category('missiles').pos(4, 2)
        .nodeColor(ORANGE)
        .name('Fragmentation Storm')
        .description('A two-stage saturation cascade: 9 submissiles, each throwing 4 low-yield bomblets over a wide footprint.')
        .requires('cluster_munitions')
        .runs(8).ticksPerRun(4500).eut(EU_EV).cwuPerRun(4608000)
        .itemPerRun(Item.of(P+'ultimet_frame', 8))
        .itemPerRun(Item.of(P+'lead_round', 128))
        .itemPerRun(Item.of(P+'titanium_plate', 32))
        .itemPerRun(Item.of(POW, 32))
        .itemPerRun(Item.of(TNT, 12))
        .unlock(M('frag_storm')).icon(M('frag_storm'))
        .register()

    // skyfall (IV) — tpr=6750  cwu=27648000
    WFResearch.builder('skyfall')
        .category('missiles').pos(4, 3)
        .nodeColor(ORANGE)
        .name('Skyfall')
        .description('Bursts high and rains 9 entity-seeking submunitions that track their targets, then time out.')
        .requires('frag_storm')
        .runs(8).ticksPerRun(6750).eut(EU_IV).cwuPerRun(27648000)
        .itemPerRun(Item.of(P+'stainless_steel_frame', 10))
        .itemPerRun(Item.of(P+'hsss_round', 48))
        .itemPerRun(Item.of(P+'titanium_plate', 24))
        .itemTagPerRun('gtceu:circuits/iv', 5)
        .itemPerRun(Item.of(POW, 32))
        .unlock(M('skyfall')).icon(M('skyfall'))
        .register()

    // ======================== EMP BRANCH ========================

    // emp_warheads (HV) — tpr=2250  cwu=576000
    WFResearch.builder('emp_warheads')
        .category('missiles').pos(6, 1)
        .nodeColor(ORANGE)
        .name('EMP Warheads')
        .description('Stealth terrain-hugging EMP missiles that disable machinery. Takes lapotron crystals.')
        .requires('missile_systems')
        .runs(8).ticksPerRun(2250).eut(EU_HV).cwuPerRun(576000)
        .itemPerRun(Item.of(P+'blue_steel_plate', 20))
        .itemPerRun(Item.of(P+'aluminium_plate', 12))
        .itemPerRun(Item.of(LAPO_DUST, 4))
        .itemTagPerRun('gtceu:circuits/hv', 3)
        .unlock(M('emp')).icon(M('emp'))
        .register()

    // emp_heavy (EV) — tpr=4500  cwu=4608000
    WFResearch.builder('emp_heavy')
        .category('missiles').pos(5, 2)
        .nodeColor(ORANGE)
        .name('Heavy EMP')
        .description('A larger-radius stealth EMP for blanketing a whole base in a disable.')
        .requires('emp_warheads')
        .runs(8).ticksPerRun(4500).eut(EU_EV).cwuPerRun(4608000)
        .itemPerRun(Item.of(P+'blue_steel_plate', 24))
        .itemPerRun(Item.of(P+'titanium_plate', 16))
        .itemPerRun(Item.of(LAPO, 1))
        .itemTagPerRun('gtceu:circuits/ev', 4)
        .unlock(M('emp_heavy')).icon(M('emp_heavy'))
        .register()

    // emp_cluster (EV) — tpr=4500  cwu=4608000
    WFResearch.builder('emp_cluster')
        .category('missiles').pos(7, 2)
        .nodeColor(ORANGE)
        .name('EMP Cluster')
        .description('A non-stealth cluster that rains EMP bomblets over a wide area.')
        .requires('emp_warheads')
        .runs(8).ticksPerRun(4500).eut(EU_EV).cwuPerRun(4608000)
        .itemPerRun(Item.of(P+'blue_steel_plate', 32))
        .itemPerRun(Item.of(P+'lead_round', 24))
        .itemPerRun(Item.of(POW, 16))
        .itemTagPerRun('gtceu:circuits/ev', 3)
        .unlock(M('emp_cluster')).icon(M('emp_cluster'))
        .register()

    // emp_lance (EV) — tpr=4500  cwu=4608000
    WFResearch.builder('emp_lance')
        .category('missiles').pos(6, 3)
        .nodeColor(ORANGE)
        .name('EMP Lance')
        .description('A fast, evasive penetrator that fires a pinpoint 2x2 EMP beam — no terrain damage.')
        .requires('emp_warheads')
        .runs(8).ticksPerRun(4500).eut(EU_EV).cwuPerRun(4608000)
        .itemPerRun(Item.of(P+'tungsten_plate', 40))
        .itemPerRun(Item.of(P+'titanium_plate', 12))
        .itemPerRun(Item.of(LAPO, 1))
        .itemTagPerRun('gtceu:circuits/ev', 4)
        .unlock(M('emp_lance')).icon(M('emp_lance'))
        .register()

    // ======================== INTERCEPTOR BRANCH ========================

    // interceptor_systems (HV) — tpr=1500  cwu=384000
    WFResearch.builder('interceptor_systems')
        .category('missiles').pos(-6, 1)
        .nodeColor(ORANGE)
        .name('Interceptor Systems')
        .description('Point-defence interceptors for the Interceptor Battery: fast, guidance-heavy, cheap on propellant.')
        .requires('missile_systems')
        .runs(8).ticksPerRun(1500).eut(EU_HV).cwuPerRun(384000)
        .itemPerRun(Item.of(P+'aluminium_plate', 28))
        .itemPerRun(Item.of(P+'stainless_steel_plate', 7))
        .itemTagPerRun('gtceu:circuits/hv', 17)
        .itemPerRun(Item.of(MV_RAM, 2))
        .itemPerRun(Item.of(ENG, 4))
        .itemPerRun(Item.of(TNT, 5))
        .unlock(M('interceptor')).icon(M('interceptor'))
        .register()

    // interceptor_network (EV) — tpr=3000  cwu=3072000
    WFResearch.builder('interceptor_network')
        .category('missiles').pos(-6, 2)
        .nodeColor(ORANGE)
        .name('Interceptor Network')
        .description('Faster interceptors that can run down supersonic threats before they cross clear.')
        .requires('interceptor_systems')
        .runs(8).ticksPerRun(3000).eut(EU_EV).cwuPerRun(3072000)
        .itemPerRun(Item.of(P+'titanium_plate', 28))
        .itemPerRun(Item.of(P+'ultimet_plate', 7))
        .itemTagPerRun('gtceu:circuits/ev', 14)
        .itemPerRun(Item.of(HV_RAM, 2))
        .itemPerRun(Item.of(ENG, 7))
        .itemPerRun(Item.of(TNT, 7))
        .unlock(M('interceptor_mk2')).icon(M('interceptor_mk2'))
        .register()

    // interceptor_ace (IV) — tpr=4500  cwu=18432000
    WFResearch.builder('interceptor_ace')
        .category('missiles').pos(-7, 3)
        .nodeColor(ORANGE)
        .name('Ace Interceptor')
        .description('Competitive with all but the top evasive round — the premier point-defence round.')
        .requires('interceptor_network')
        .runs(8).ticksPerRun(4500).eut(EU_IV).cwuPerRun(18432000)
        .itemPerRun(Item.of(P+'tungsten_steel_plate', 28))
        .itemPerRun(Item.of(P+'titanium_plate', 14))
        .itemTagPerRun('gtceu:circuits/iv', 18)
        .itemPerRun(Item.of(HV_RAM, 3))
        .itemPerRun(Item.of(ENG, 7))
        .itemPerRun(Item.of(TNT, 7))
        .unlock(M('interceptor_ace')).icon(M('interceptor_ace'))
        .register()

    // interceptor_cluster (IV) — tpr=4050  cwu=16588800
    WFResearch.builder('interceptor_cluster')
        .category('missiles').pos(-5, 3)
        .nodeColor(ORANGE)
        .name('Cluster Interceptor')
        .description('Airbursts into several small interceptors on engaging, to blunt a whole barrage in one shot.')
        .requires('interceptor_network')
        .runs(8).ticksPerRun(4050).eut(EU_IV).cwuPerRun(16588800)
        .itemPerRun(Item.of(P+'titanium_plate', 10))
        .itemPerRun(Item.of(P+'aluminium_plate', 6))
        .itemTagPerRun('gtceu:circuits/iv', 4)
        .itemPerRun(Item.of(HV_RAM, 3))
        .itemPerRun(Item.of(P+'hsss_round', 14))
        .itemPerRun(Item.of(TNT, 5))
        .unlock(M('interceptor_cluster')).icon(M('interceptor_cluster'))
        .register()

})
