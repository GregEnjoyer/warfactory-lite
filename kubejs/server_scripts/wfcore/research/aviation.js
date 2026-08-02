// Aviation research — the whole "Aviation" tab (category 'air').
// Runs in ServerEvents.recipes (fires on server start AND /reload).
//
// Sections:
//   - Root: air_propellers
//   - Fixed-wing line: Ju-87 -> A-10 -> Hercules -> {Spooky, B-2}
//   - Rotary-wing line: AH-6 -> MH-60 -> Mi-28
//   - Drone sub-tree: drone_tactics hub -> swarm / LUCAS / loitering / FPV (+ FPV modules)
//   - Aviation component tree: air_comp_<tier>_<part>, MV root -> HV -> EV

var BLUE  = 0xFF2F6BD8
var EU_MV = 128
var EU_HV = 512
var EU_EV = 2048
var EU_IV = 8192

// CWU per run at tier midpoint (@300t vehicle/drone nodes, @200t component nodes):
//   @300t  MV 19200  HV 76800  EV 307200  IV 1228800
//   @200t  MV 12800  HV 51200  EV 204800

var pv = e => Item.of('wfcore:packaged_vehicle', '{entity:"' + e + '"}')

ServerEvents.recipes(event => {

    // ======================= AVIATION ROOT =======================

    WFResearch.builder('air_propellers')
        .category('air').pos(-3, 0)
        .nodeColor(BLUE)
        .name('Propellers')
        .description('Small and large aircraft propellers – the foundation every airframe is built on.')
        .runs(40).ticksPerRun(300).eut(EU_MV).cwuPerRun(19200)
        .itemPerRun(Item.of('gtceu:aluminium_plate', 6))
        .itemPerRun(Item.of('gtceu:polytetrafluoroethylene_plate', 2))
        .itemTagPerRun('gtceu:circuits/mv', 2)
        .unlocks(Item.of('superbwarfare:propeller'), Item.of('superbwarfare:large_propeller'))
        .icon(Item.of('superbwarfare:large_propeller'))
        .register()

    // ======================= FIXED-WING LINE =======================

    // MV: Ju-87 Stuka
    WFResearch.builder('air_ju_87')
        .category('air').pos(-5, 1)
        .nodeColor(BLUE)
        .name('Ju-87 Stuka')
        .description('The Ju-87 "Stuka" dive bomber: 2 crew, 250 HP. Carries rifle ammunition plus small and medium aerial bombs. The MV entry of the fixed-wing line.')
        .requires('air_propellers')
        .runs(52).ticksPerRun(300).eut(EU_MV).cwuPerRun(19200)
        .itemPerRun(Item.of('gtceu:aluminium_plate', 6))
        .itemPerRun(Item.of('superbwarfare:propeller', 4))
        .itemTagPerRun('gtceu:circuits/mv', 2)
        .unlock(pv('superbwarfare:ju_87')).icon(pv('superbwarfare:ju_87'))
        .register()

    // HV: A-10 Thunderbolt II
    WFResearch.builder('air_a_10')
        .category('air').pos(-5, 2)
        .nodeColor(BLUE)
        .name('A-10 Thunderbolt II')
        .description('The A-10 close-air-support attack jet: a heavy autocannon plus a wing of ordnance.')
        .requires('air_ju_87')
        .runs(80).ticksPerRun(300).eut(EU_HV).cwuPerRun(76800)
        .itemPerRun(Item.of('gtceu:stainless_steel_plate', 6))
        .itemPerRun(Item.of('superbwarfare:large_propeller', 2))
        .itemTagPerRun('gtceu:circuits/hv', 2)
        .unlock(pv('superbwarfare:a_10a')).icon(pv('superbwarfare:a_10a'))
        .register()

    // EV: C-130 Hercules
    WFResearch.builder('air_hercules')
        .category('air').pos(-5, 3)
        .nodeColor(BLUE)
        .name('C-130 Hercules')
        .description('The C-130 Hercules heavy transport: a four-engine turboprop hauler and the EV step of the fixed-wing line.')
        .requires('air_a_10')
        .runs(88).ticksPerRun(300).eut(EU_EV).cwuPerRun(307200)
        .itemPerRun(Item.of('gtceu:titanium_plate', 6))
        .itemPerRun(Item.of('gtceu:ev_electric_motor', 2))
        .itemTagPerRun('gtceu:circuits/ev', 2)
        .unlock(pv('ashvehicle:c130')).icon(pv('ashvehicle:c130'))
        .register()

    // EV: AC-130U Spooky II (gunship upgrade, also off Hercules)
    WFResearch.builder('air_spooky')
        .category('air').pos(-6, 4)
        .nodeColor(BLUE)
        .name('AC-130U Spooky II')
        .description('The AC-130U Spooky II gunship: a Hercules airframe bristling with side-firing cannons.')
        .requires('air_hercules')
        .runs(88).ticksPerRun(300).eut(EU_EV).cwuPerRun(307200)
        .itemPerRun(Item.of('gtceu:titanium_plate', 6))
        .itemPerRun(Item.of('gtceu:ev_electric_motor', 2))
        .itemTagPerRun('gtceu:circuits/ev', 2)
        .unlock(pv('ashvehicle:ac130u')).icon(pv('ashvehicle:ac130u'))
        .register()

    // IV: B-2 Spirit (apex of fixed-wing, also off Hercules)
    WFResearch.builder('air_b2')
        .category('air').pos(-5, 4)
        .nodeColor(BLUE)
        .name('B-2 Spirit')
        .description('The B-2 Spirit stealth bomber: a flying-wing strategic bomber.')
        .requires('air_hercules')
        .runs(96).ticksPerRun(300).eut(EU_IV).cwuPerRun(1228800)
        .itemPerRun(Item.of('gtceu:tungsten_steel_plate', 6))
        .itemPerRun(Item.of('superbwarfare:large_propeller', 2))
        .itemTagPerRun('gtceu:circuits/iv', 2)
        .unlock(pv('ashvehicle:b-2')).icon(pv('ashvehicle:b-2'))
        .register()

    // ======================= ROTARY-WING LINE =======================

    // MV: AH-6 Little Bird
    WFResearch.builder('air_ah_6')
        .category('air').pos(-3, 1)
        .nodeColor(BLUE)
        .name('AH-6 Little Bird')
        .description('The AH-6 Little Bird light attack helicopter. Armed with a 20mm cannon (Small Caliber HE Shell) and Small Caliber Rockets.')
        .requires('air_propellers')
        .runs(52).ticksPerRun(300).eut(EU_MV).cwuPerRun(19200)
        .itemPerRun(Item.of('gtceu:aluminium_plate', 6))
        .itemPerRun(Item.of('superbwarfare:propeller', 4))
        .itemTagPerRun('gtceu:circuits/mv', 2)
        .unlock(pv('superbwarfare:ah_6')).icon(pv('superbwarfare:ah_6'))
        .register()

    // HV: MH-60M Black Hawk
    WFResearch.builder('air_mh_60')
        .category('air').pos(-3, 2)
        .nodeColor(BLUE)
        .name('MH-60M Black Hawk')
        .description('The MH-60M Black Hawk transport/gunship. Door guns firing Small Caliber AP Shells plus Small Caliber Rockets.')
        .requires('air_ah_6')
        .runs(80).ticksPerRun(300).eut(EU_HV).cwuPerRun(76800)
        .itemPerRun(Item.of('gtceu:stainless_steel_plate', 6))
        .itemPerRun(Item.of('superbwarfare:large_propeller', 2))
        .itemTagPerRun('gtceu:circuits/hv', 2)
        .unlock(pv('ashvehicle:mh_60m')).icon(pv('ashvehicle:mh_60m'))
        .register()

    // EV: Mi-28 Attack Helicopter (apex of rotary line)
    WFResearch.builder('air_mi_28')
        .category('air').pos(-3, 3)
        .nodeColor(BLUE)
        .name('Mi-28 Attack Helicopter')
        .description('The Mi-28 dedicated tank-hunter. A 30mm cannon, rockets and up to large anti-ground / anti-air missiles.')
        .requires('air_mh_60')
        .runs(88).ticksPerRun(300).eut(EU_EV).cwuPerRun(307200)
        .itemPerRun(Item.of('gtceu:titanium_plate', 6))
        .itemPerRun(Item.of('gtceu:ev_electric_motor', 2))
        .itemTagPerRun('gtceu:circuits/ev', 2)
        .unlock(pv('superbwarfare:mi_28')).icon(pv('superbwarfare:mi_28'))
        .register()

    // ======================= DRONE TACTICS HUB =======================
    // Requires Propellers AND at least one MV aircraft (Ju-87 OR AH-6).

    WFResearch.builder('drone_tactics')
        .category('air').pos(-1, 1)
        .nodeColor(BLUE)
        .name('Drone Tactics')
        .description('Remote-piloting doctrine: the Monitor control tablet and the base reconnaissance Drone.')
        .requires('air_propellers')
        .anyOf('air_ju_87', 'air_ah_6')
        .runs(30).ticksPerRun(300).eut(EU_MV).cwuPerRun(19200)
        .itemPerRun(Item.of('gtceu:aluminium_plate', 4))
        .itemPerRun(Item.of('superbwarfare:propeller', 4))
        .itemTagPerRun('gtceu:circuits/mv', 2)
        .unlocks(Item.of('superbwarfare:monitor'), Item.of('superbwarfare:drone'))
        .icon(Item.of('superbwarfare:monitor'))
        .register()

    // ======================= DRONE LEAVES =======================

    // Swarm Drones — HV kamikaze quadcopters
    WFResearch.builder('drone_swarm')
        .category('air').pos(-2, 2)
        .nodeColor(BLUE)
        .name('Swarm Drones')
        .description('Kamikaze quadcopters that dive onto a marked target and detonate.')
        .requires('drone_tactics')
        .runs(40).ticksPerRun(300).eut(EU_HV).cwuPerRun(76800)
        .itemPerRun(Item.of('gtceu:aluminium_plate', 4))
        .itemPerRun(Item.of('superbwarfare:seeker', 1))
        .itemTagPerRun('gtceu:circuits/hv', 2)
        .unlock(Item.of('superbwarfare:swarm_drone')).icon(Item.of('superbwarfare:swarm_drone'))
        .register()

    // LUCAS Attack Drone — HV fixed-wing, runs on gasoline
    WFResearch.builder('drone_lucas')
        .category('air').pos(0, 3)
        .nodeColor(BLUE)
        .name('LUCAS Attack Drone')
        .description('A low-cost one-way fixed-wing attack drone. Runs on gasoline. Can be upgraded')
        .requires('drone_tactics')
        .runs(40).ticksPerRun(300).eut(EU_HV).cwuPerRun(76800)
        .itemPerRun(Item.of('gtceu:aluminium_plate', 6))
        .itemPerRun(Item.of('superbwarfare:large_propeller', 1))
        .itemTagPerRun('gtceu:circuits/hv', 2)
        .unlock(Item.of('sbwdroneconfig:lucas_drone')).icon(Item.of('sbwdroneconfig:lucas_drone'))
        .register()

    // Shahed Loitering Drones — HV, strike / gas / inert variants
    WFResearch.builder('drone_loitering')
        .category('air').pos(0, 2)
        .nodeColor(BLUE)
        .name('Shahed Loitering Drones')
        .description('The Shahed family of cheap long-range loitering munitions: strike (HE), gas and inert loiter variants.')
        .requires('drone_tactics')
        .runs(45).ticksPerRun(300).eut(EU_HV).cwuPerRun(76800)
        .itemPerRun(Item.of('gtceu:aluminium_plate', 8))
        .itemPerRun(Item.of('superbwarfare:missile_engine', 2))
        .itemTagPerRun('gtceu:circuits/hv', 2)
        .unlocks(Item.of('wfcore:missile_strike_drone'), Item.of('wfcore:missile_gas_drone'), Item.of('wfcore:missile_loiter_drone'))
        .icon(Item.of('wfcore:missile_strike_drone'))
        .register()

    // FPV Drones — HV, charged by GT batteries / Vehicle Charger
    WFResearch.builder('drone_fpv')
        .category('air').pos(-1, 3)
        .nodeColor(BLUE)
        .name('FPV Drones')
        .description('Hover-capable first-person-view scout drones with precise low-speed control.')
        .requires('drone_tactics')
        .runs(45).ticksPerRun(300).eut(EU_HV).cwuPerRun(76800)
        .itemPerRun(Item.of('gtceu:aluminium_plate', 4))
        .itemPerRun(Item.of('superbwarfare:motor', 4))
        .itemTagPerRun('gtceu:circuits/mv', 2)
        .unlock(Item.of('sbwdroneconfig:cubed_fpv_drone')).icon(Item.of('sbwdroneconfig:cubed_fpv_drone'))
        .register()

    // FPV Spotlight upgrade module
    WFResearch.builder('drone_fpv_spotlight')
        .category('air').pos(-2, 4)
        .nodeColor(BLUE)
        .name('FPV Spotlight')
        .description('A spotlight module for the FPV drone inventory. Lights up night search missions at the cost of extra battery drain.')
        .requires('drone_fpv')
        .runs(24).ticksPerRun(300).eut(EU_HV).cwuPerRun(76800)
        .itemPerRun(Item.of('gtceu:aluminium_plate', 2))
        .itemPerRun(Item.of('minecraft:glowstone_dust', 4))
        .itemTagPerRun('gtceu:circuits/hv', 1)
        .unlock(Item.of('sbwdroneconfig:spotlight_module')).icon(Item.of('sbwdroneconfig:spotlight_module'))
        .register()

    // Fiber-Optic Link upgrade module
    WFResearch.builder('drone_fpv_fiber')
        .category('air').pos(-1, 4)
        .nodeColor(BLUE)
        .name('Fiber-Optic Link')
        .description('A fiber-optic spool upgrade that switches the FPV link from wireless to cable. Immune to jammers, but the link drops if the cable snaps.')
        .requires('drone_fpv')
        .runs(24).ticksPerRun(300).eut(EU_HV).cwuPerRun(76800)
        .itemPerRun(Item.of('gtceu:polytetrafluoroethylene_plate', 2))
        .itemPerRun(Item.of('gtceu:copper_single_cable', 8))
        .itemTagPerRun('gtceu:circuits/hv', 1)
        .unlock(Item.of('sbwdroneconfig:fiber_optic_spool_upgrade')).icon(Item.of('sbwdroneconfig:fiber_optic_spool_upgrade'))
        .register()

    // Drone Jammer
    WFResearch.builder('drone_fpv_jammer')
        .category('air').pos(0, 4)
        .nodeColor(BLUE)
        .name('Drone Jammer')
        .description('A handheld drone radar / RF jammer – deals with FPV and LUCAS drones.')
        .requires('drone_fpv')
        .runs(30).ticksPerRun(300).eut(EU_HV).cwuPerRun(76800)
        .itemPerRun(Item.of('gtceu:stainless_steel_plate', 3))
        .itemPerRun(Item.of('superbwarfare:seeker', 1))
        .itemTagPerRun('gtceu:circuits/hv', 2)
        .unlock(Item.of('sbwdroneconfig:drone_jammer')).icon(Item.of('sbwdroneconfig:drone_jammer'))
        .register()

    // ======================= AVIATION COMPONENT TREE =======================
    // Parts: air_frame (x=2), wing (x=3), rotor (x=4), cockpit (x=5).
    // MV = roots (no anyOf); HV anyOf's MV; EV anyOf's HV.
    // cwuPerRun @200t: MV 12800 / HV 51200 / EV 204800.

    // ---- MV tier — roots ----
    WFResearch.builder('air_comp_mv_air_frame')
        .category('air').pos(2, 1).nodeColor(BLUE)
        .name('MV Air Frame').description('Assembler blueprint for the MV-tier Air Frame used in aircraft assembly.')
        .runs(8).ticksPerRun(200).eut(EU_MV).cwuPerRun(12800)
        .itemPerRun(Item.of('gtceu:aluminium_plate', 4)).itemPerRun(Item.of('gtceu:good_electronic_circuit', 1))
        .unlock(Item.of('kubejs:mv_air_frame')).icon(Item.of('kubejs:mv_air_frame')).register()

    WFResearch.builder('air_comp_mv_wing')
        .category('air').pos(3, 1).nodeColor(BLUE)
        .name('MV Wing').description('Assembler blueprint for the MV-tier Wing used in aircraft assembly.')
        .runs(8).ticksPerRun(200).eut(EU_MV).cwuPerRun(12800)
        .itemPerRun(Item.of('gtceu:aluminium_plate', 4)).itemPerRun(Item.of('gtceu:good_electronic_circuit', 1))
        .unlock(Item.of('kubejs:mv_wing')).icon(Item.of('kubejs:mv_wing')).register()

    WFResearch.builder('air_comp_mv_rotor')
        .category('air').pos(4, 1).nodeColor(BLUE)
        .name('MV Rotor').description('Assembler blueprint for the MV-tier Rotor used in aircraft assembly.')
        .runs(8).ticksPerRun(200).eut(EU_MV).cwuPerRun(12800)
        .itemPerRun(Item.of('gtceu:aluminium_plate', 4)).itemPerRun(Item.of('gtceu:good_electronic_circuit', 1))
        .unlock(Item.of('kubejs:mv_rotor')).icon(Item.of('kubejs:mv_rotor')).register()

    WFResearch.builder('air_comp_mv_cockpit')
        .category('air').pos(5, 1).nodeColor(BLUE)
        .name('MV Cockpit').description('Assembler blueprint for the MV-tier Cockpit used in aircraft assembly.')
        .runs(8).ticksPerRun(200).eut(EU_MV).cwuPerRun(12800)
        .itemPerRun(Item.of('gtceu:aluminium_plate', 4)).itemPerRun(Item.of('gtceu:good_electronic_circuit', 1))
        .unlock(Item.of('kubejs:mv_cockpit')).icon(Item.of('kubejs:mv_cockpit')).register()

    // ---- HV tier — anyOf any MV aviation component ----
    WFResearch.builder('air_comp_hv_air_frame')
        .category('air').pos(2, 2).nodeColor(BLUE)
        .name('HV Air Frame').description('Assembler blueprint for the HV-tier Air Frame used in aircraft assembly.')
        .anyOf('air_comp_mv_air_frame', 'air_comp_mv_wing', 'air_comp_mv_rotor', 'air_comp_mv_cockpit')
        .runs(10).ticksPerRun(200).eut(EU_HV).cwuPerRun(51200)
        .itemPerRun(Item.of('gtceu:stainless_steel_plate', 4)).itemPerRun(Item.of('gtceu:basic_integrated_circuit', 1))
        .unlock(Item.of('kubejs:hv_air_frame')).icon(Item.of('kubejs:hv_air_frame')).register()

    WFResearch.builder('air_comp_hv_wing')
        .category('air').pos(3, 2).nodeColor(BLUE)
        .name('HV Wing').description('Assembler blueprint for the HV-tier Wing used in aircraft assembly.')
        .anyOf('air_comp_mv_air_frame', 'air_comp_mv_wing', 'air_comp_mv_rotor', 'air_comp_mv_cockpit')
        .runs(10).ticksPerRun(200).eut(EU_HV).cwuPerRun(51200)
        .itemPerRun(Item.of('gtceu:stainless_steel_plate', 4)).itemPerRun(Item.of('gtceu:basic_integrated_circuit', 1))
        .unlock(Item.of('kubejs:hv_wing')).icon(Item.of('kubejs:hv_wing')).register()

    WFResearch.builder('air_comp_hv_rotor')
        .category('air').pos(4, 2).nodeColor(BLUE)
        .name('HV Rotor').description('Assembler blueprint for the HV-tier Rotor used in aircraft assembly.')
        .anyOf('air_comp_mv_air_frame', 'air_comp_mv_wing', 'air_comp_mv_rotor', 'air_comp_mv_cockpit')
        .runs(10).ticksPerRun(200).eut(EU_HV).cwuPerRun(51200)
        .itemPerRun(Item.of('gtceu:stainless_steel_plate', 4)).itemPerRun(Item.of('gtceu:basic_integrated_circuit', 1))
        .unlock(Item.of('kubejs:hv_rotor')).icon(Item.of('kubejs:hv_rotor')).register()

    WFResearch.builder('air_comp_hv_cockpit')
        .category('air').pos(5, 2).nodeColor(BLUE)
        .name('HV Cockpit').description('Assembler blueprint for the HV-tier Cockpit used in aircraft assembly.')
        .anyOf('air_comp_mv_air_frame', 'air_comp_mv_wing', 'air_comp_mv_rotor', 'air_comp_mv_cockpit')
        .runs(10).ticksPerRun(200).eut(EU_HV).cwuPerRun(51200)
        .itemPerRun(Item.of('gtceu:stainless_steel_plate', 4)).itemPerRun(Item.of('gtceu:basic_integrated_circuit', 1))
        .unlock(Item.of('kubejs:hv_cockpit')).icon(Item.of('kubejs:hv_cockpit')).register()

    // ---- EV tier — anyOf any HV aviation component ----
    WFResearch.builder('air_comp_ev_air_frame')
        .category('air').pos(2, 3).nodeColor(BLUE)
        .name('EV Air Frame').description('Assembler blueprint for the EV-tier Air Frame used in aircraft assembly.')
        .anyOf('air_comp_hv_air_frame', 'air_comp_hv_wing', 'air_comp_hv_rotor', 'air_comp_hv_cockpit')
        .runs(12).ticksPerRun(200).eut(EU_EV).cwuPerRun(204800)
        .itemPerRun(Item.of('gtceu:titanium_plate', 4)).itemPerRun(Item.of('gtceu:good_integrated_circuit', 1))
        .unlock(Item.of('kubejs:ev_air_frame')).icon(Item.of('kubejs:ev_air_frame')).register()

    WFResearch.builder('air_comp_ev_wing')
        .category('air').pos(3, 3).nodeColor(BLUE)
        .name('EV Wing').description('Assembler blueprint for the EV-tier Wing used in aircraft assembly.')
        .anyOf('air_comp_hv_air_frame', 'air_comp_hv_wing', 'air_comp_hv_rotor', 'air_comp_hv_cockpit')
        .runs(12).ticksPerRun(200).eut(EU_EV).cwuPerRun(204800)
        .itemPerRun(Item.of('gtceu:titanium_plate', 4)).itemPerRun(Item.of('gtceu:good_integrated_circuit', 1))
        .unlock(Item.of('kubejs:ev_wing')).icon(Item.of('kubejs:ev_wing')).register()

    WFResearch.builder('air_comp_ev_rotor')
        .category('air').pos(4, 3).nodeColor(BLUE)
        .name('EV Rotor').description('Assembler blueprint for the EV-tier Rotor used in aircraft assembly.')
        .anyOf('air_comp_hv_air_frame', 'air_comp_hv_wing', 'air_comp_hv_rotor', 'air_comp_hv_cockpit')
        .runs(12).ticksPerRun(200).eut(EU_EV).cwuPerRun(204800)
        .itemPerRun(Item.of('gtceu:titanium_plate', 4)).itemPerRun(Item.of('gtceu:good_integrated_circuit', 1))
        .unlock(Item.of('kubejs:ev_rotor')).icon(Item.of('kubejs:ev_rotor')).register()

    WFResearch.builder('air_comp_ev_cockpit')
        .category('air').pos(5, 3).nodeColor(BLUE)
        .name('EV Cockpit').description('Assembler blueprint for the EV-tier Cockpit used in aircraft assembly.')
        .anyOf('air_comp_hv_air_frame', 'air_comp_hv_wing', 'air_comp_hv_rotor', 'air_comp_hv_cockpit')
        .runs(12).ticksPerRun(200).eut(EU_EV).cwuPerRun(204800)
        .itemPerRun(Item.of('gtceu:titanium_plate', 4)).itemPerRun(Item.of('gtceu:good_integrated_circuit', 1))
        .unlock(Item.of('kubejs:ev_cockpit')).icon(Item.of('kubejs:ev_cockpit')).register()

})
