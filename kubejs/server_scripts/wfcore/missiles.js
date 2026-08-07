// WFCore Missile Factory recipes — authoritative, research-gated production for the wfcore missile suite.
// missile_factory: HV–IV (6 item slots, 2 fluid slots, 1 output). /reload applies.
//
// Family cost design:
//   Demolition  — aluminium/frame + engines + gelled toluene; diesel or rocket fuel.
//   Penetrators — engine-heavy; light airframe (titanium → inconel_625 → HSS-S);
//                 rocket fuel → jet fuel; engine count compensates for fewer plates.
//   ICBMs       — solid propellant (kubejs:solid_rocket_fuel) + engines + heavy metals
//                 (stainless_steel → ultimet); RAM-heavy; demolition-scale plate+fuel cost.
//   Bunker busters — shaped-charge; explosive-heavy (TNT basic → RDX heavy/tunneller).
//   Cluster     — frame + iron_round metal sink; lower-tier explosives; gas uses mustard_gas 2nd slot.
//   EMP         — lapotron cost replaces explosive load; plates scale to demolition floor.
//   Interceptors — deliberately the EXPENSIVE class: ~1.2–1.4× the mainline same-tier missile,
//                 driven primarily by a heavy guidance circuit + RAM load (not the airframe).
//                 Exception: penetrators match interceptor price (hypersonic ≈ interceptor_ace).
//                 Cheap spam (drones, budget EMP) is intentionally cost-inefficient to swat —
//                 that is interceptor_cluster's job, kept cheap as the anti-swarm volume option.
//   Drones      — cheapest class (~80% of HV floor): aluminium + modest engines + fuel.
//
//   RDX synthesis (large_chemical_reactor): see bottom of file.
//   Gas payloads (cluster_gas, gas_drone) use gtceu:mustard_gas in the 2nd fluid slot.

import com.norwood.wfcore.integration.kubejs

// IIFE-wrapped: KubeJS server scripts share one global scope, so this file's short consts
// (P, HV, EV, TNT, CIRC…) would collide with other files' top-level consts (redeclaration
// errors). Wrapping the body keeps them file-local. Keep the import above at top level.
;(function () {
const HV = 512
const EV = 2048
const IV = 8192
const C_HV = '#gtceu:circuits/hv'
const C_EV = '#gtceu:circuits/ev'
const C_IV = '#gtceu:circuits/iv'
var P    = 'gtceu:'
const TNT  = 'gtceu:gelled_toluene'
const RDX  = 'gtceu:rdx_dust'          // verify: gtceu rdx material or wfcore:rdx_dust
var POW  = 'minecraft:gunpowder'
const FUSE = 'superbwarfare:fusee'
const ENG  = 'superbwarfare:missile_engine'
const WP        = 'gtceu:white_phosphorus_dust'
const LAPO      = 'gtceu:lapotron_crystal'
const LAPO_DUST = 'gtceu:lapotron_dust' // milled crystal — verify dust form exists in this gtceu version
const IRON_ROUND = 'gtceu:iron_round'
const LEAD_ROUND = 'gtceu:lead_round'
const SRF    = 'kubejs:solid_rocket_fuel' // solid APCP-equivalent propellant
const MV_RAM = 'kubejs:mv_ram'
const HV_RAM = 'kubejs:hv_ram'
const EV_RAM = 'kubejs:ev_ram'

ServerEvents.recipes(event => {

    // ── Demolition ───────────────────────────────────────────────────────────────────────────────
    // missile_he
    event.recipes.wfcore.missile_factory('wfcore:missile_he')
        .inputFluids(Fluid.of('gtceu:diesel', 3000))
        .itemOutputs(Item.of('wfcore:missile_he'))
        .EUt(HV)
        .duration(12000)
        .itemInputs(Item.of(P+'aluminium_plate', 96))
        .itemInputs(Item.of(P+'blue_steel_frame', 8))
        .itemInputs(8 + 'x ' + C_HV)
        .itemInputs(Item.of(ENG, 4))
        .itemInputs(Item.of(FUSE, 1))
        .itemInputs(Item.of(TNT, 85))
        .addCondition(WFResearch.condition('missile_systems'))

    // missile_dummy
    event.recipes.wfcore.missile_factory('wfcore:missile_dummy')
        .inputFluids(Fluid.of('gtceu:diesel', 2000))
        .itemOutputs(Item.of('wfcore:missile_dummy'))
        .EUt(HV)
        .duration(10000)
        .itemInputs(Item.of(P+'aluminium_plate', 96))
        .itemInputs(Item.of(P+'blue_steel_frame', 5))
        .itemInputs(Item.of(ENG, 2))
        .addCondition(WFResearch.condition('missile_systems'))

    // missile_thermobaric
    event.recipes.wfcore.missile_factory('wfcore:missile_thermobaric')
        .inputFluids(Fluid.of('gtceu:rocket_fuel', 12000))
        .itemOutputs(Item.of('wfcore:missile_thermobaric'))
        .EUt(EV)
        .duration(14000)
        .itemInputs(Item.of(P+'titanium_plate', 96))
        .itemInputs(Item.of(P+'hssg_frame', 4))
        .itemInputs(Item.of(ENG, 12))
        .itemInputs(Item.of(FUSE, 1))
        .itemInputs(8 + 'x ' + C_EV)
        .itemInputs(Item.of(RDX, 48))
        .addCondition(WFResearch.condition('demolition_ordnance'))

    // missile_mininuke
    event.recipes.wfcore.missile_factory('wfcore:missile_mininuke')
        .inputFluids(Fluid.of('gtceu:rocket_fuel', 20000))
        .itemOutputs(Item.of('wfcore:missile_mininuke'))
        .EUt(IV)
        .duration(22000)
        .itemInputs(Item.of(P+'hsss_plate', 128))
        .itemInputs(Item.of(P+'titanium_plate', 8))
        .itemInputs(Item.of(ENG, 32))
        .itemInputs(Item.of(RDX, 16))
        .itemInputs(Item.of(P+'double_beryllium_plate', 32))
        .itemInputs(Item.of('gtceu:uranium_235_block', 8))
        .itemInputs(16 + 'x ' + C_IV)
        .addCondition(WFResearch.condition('tactical_nuclear'))

    // ── Penetrators (engine-heavy; light airframe; rocket → jet fuel) ────────────────────────────
    // Floor: fewer plates than demolition, compensated by engine count and explosive load.

    // missile_penetrator
    event.recipes.wfcore.missile_factory('wfcore:missile_penetrator')
        .inputFluids(Fluid.of('gtceu:rocket_fuel', 3500))
        .itemOutputs(Item.of('wfcore:missile_penetrator'))
        .EUt(EV)
        .duration(12000)
        .itemInputs(Item.of(P+'titanium_plate', 64))
        .itemInputs(Item.of(P+'ultimet_frame', 8))
        .itemInputs(Item.of(ENG, 16))
        .itemInputs(Item.of(FUSE, 1))
        .itemInputs(10 + 'x ' + C_HV)
        .itemInputs(Item.of(TNT, 64))
        .addCondition(WFResearch.condition('penetrator_missiles'))

    // missile_penetrator_supersonic
    event.recipes.wfcore.missile_factory('wfcore:missile_penetrator_supersonic')
        .inputFluids(Fluid.of('gtceu:rocket_fuel', 10000))
        .itemOutputs(Item.of('wfcore:missile_penetrator_supersonic'))
        .EUt(EV)
        .duration(14000)
        .itemInputs(Item.of(P+'incoloy_ma_956_plate', 96))
        .itemInputs(Item.of(P+'hssg_frame', 8))
        .itemInputs(Item.of(ENG, 32))
        .itemInputs(Item.of(FUSE, 1))
        .itemInputs(12 + 'x ' + C_EV)
        .itemInputs(Item.of(TNT, 96))
        .addCondition(WFResearch.condition('penetrator_supersonic'))

    // missile_penetrator_hypersonic
    event.recipes.wfcore.missile_factory('wfcore:missile_penetrator_hypersonic')
        .inputFluids(Fluid.of('gtceu:jet_fuel', 12000))
        .itemOutputs(Item.of('wfcore:missile_penetrator_hypersonic'))
        .EUt(IV)
        .duration(22000)
        .itemInputs(Item.of(P+'hsss_plate', 128))
        .itemInputs(Item.of('gtceu:incoloy_ma_956_frame', 8))
        .itemInputs(Item.of(ENG, 80))
        .itemInputs(Item.of(FUSE, 1))
        .itemInputs(28 + 'x ' + C_IV)
        .itemInputs(Item.of(TNT, 128))
        .addCondition(WFResearch.condition('penetrator_hypersonic'))

    // ── ICBMs (RAM + SRF heavy; stainless_steel → ultimet) ───────────────────────────────────────

    // missile_long_range
    event.recipes.wfcore.missile_factory('wfcore:missile_long_range')
        .inputFluids(Fluid.of('gtceu:rocket_fuel', 6000))
        .itemOutputs(Item.of('wfcore:missile_long_range'))
        .EUt(HV)
        .duration(14000)
        .itemInputs(Item.of(P+'double_stainless_steel_plate', 48))
        .itemInputs(Item.of(P+'stainless_steel_frame', 12))
        .itemInputs(10 + 'x ' + C_HV)
        .itemInputs(Item.of(ENG, 8))
        .itemInputs(Item.of(FUSE, 1))
        .itemInputs(Item.of(TNT, 72))
        .addCondition(WFResearch.condition('missile_systems'))

    // missile_icbm
    event.recipes.wfcore.missile_factory('wfcore:missile_icbm')
        .inputFluids(Fluid.of('gtceu:rocket_fuel', 10000))
        .itemOutputs(Item.of('wfcore:missile_icbm'))
        .EUt(EV)
        .duration(16000)
        .itemInputs(Item.of(P+'double_titanium_plate', 48))
        .itemInputs(Item.of(ENG, 16))
        .itemInputs(Item.of(SRF, 24))
        .itemInputs(10 + 'x ' + C_EV)
        .itemInputs(Item.of(HV_RAM, 2))
        .itemInputs(Item.of(FUSE, 1))
        .itemInputs(Item.of(RDX, 64))
        .addCondition(WFResearch.condition('icbm'))

    // missile_icbm_heavy
    event.recipes.wfcore.missile_factory('wfcore:missile_icbm_heavy')
        .inputFluids(Fluid.of('gtceu:rocket_fuel', 18000))
        .itemOutputs(Item.of('wfcore:missile_icbm_heavy'))
        .EUt(IV)
        .duration(24000)
        .itemInputs(Item.of(P+'double_tungsten_steel_plate', 64))
        .itemInputs(Item.of(P+'stainless_steel_plate', 32))
        .itemInputs(Item.of(ENG, 24))
        .itemInputs(Item.of(SRF, 48))
        .itemInputs(10 + 'x ' + C_IV)
        .itemInputs(Item.of(RDX, 100))
        .itemInputs(Item.of(EV_RAM, 3))
        .addCondition(WFResearch.condition('icbm_heavy'))

    // ── Bunker busters (shaped charge; explosive-heavy) ──────────────────────────────────────────
    event.recipes.wfcore.missile_factory('wfcore:missile_shitbox_buster')
        .inputFluids(Fluid.of('gtceu:diesel', 6000))
        .itemOutputs(Item.of('wfcore:missile_shitbox_buster'))
        .EUt(HV)
        .duration(12000)
        .itemInputs(Item.of(P+'stainless_steel_plate', 42))
        .itemInputs(Item.of(P+'blue_steel_plate', 20))
        .itemInputs(Item.of(POW, 42))
        .itemInputs(Item.of('wfcore:deep_mining_charge', 48))
        .itemInputs(6 + 'x ' + C_HV)
        .itemInputs(Item.of(FUSE, 1))
        .addCondition(WFResearch.condition('shaped_charges'))

    // missile_bunker_buster
    event.recipes.wfcore.missile_factory('wfcore:missile_bunker_buster')
        .inputFluids(Fluid.of('gtceu:diesel', 4000))
        .itemOutputs(Item.of('wfcore:missile_bunker_buster'))
        .EUt(HV)
        .duration(12000)
        .itemInputs(Item.of(P+'stainless_steel_plate', 48))
        .itemInputs(Item.of(P+'blue_steel_plate', 24))
        .itemInputs(Item.of(POW, 48))
        .itemInputs(Item.of(TNT, 48))
        .itemInputs(4 + 'x ' + C_HV)
        .itemInputs(Item.of(FUSE, 1))
        .addCondition(WFResearch.condition('shaped_charges'))

    // missile_bunker_buster_heavy
    event.recipes.wfcore.missile_factory('wfcore:missile_bunker_buster_heavy')
        .inputFluids(Fluid.of('gtceu:diesel', 10000))
        .itemOutputs(Item.of('wfcore:missile_bunker_buster_heavy'))
        .EUt(EV)
        .duration(14000)
        .itemInputs(Item.of(P+'titanium_plate', 54))
        .itemInputs(Item.of(P+'ultimet_plate', 32))
        .itemInputs(Item.of(POW, 56))
        .itemInputs(Item.of(RDX, 32))
        .itemInputs(6 + 'x ' + C_HV)
        .itemInputs(Item.of(FUSE, 1))
        .addCondition(WFResearch.condition('bunker_buster_heavy'))

    // missile_bunker_tunneller
    event.recipes.wfcore.missile_factory('wfcore:missile_bunker_tunneller')
        .inputFluids(Fluid.of('gtceu:diesel', 14000))
        .itemOutputs(Item.of('wfcore:missile_bunker_tunneller'))
        .EUt(IV)
        .duration(18000)
        .itemInputs(Item.of(P+'tungsten_steel_plate', 64))
        .itemInputs(Item.of(P+'hsss_plate', 32))
        .itemInputs(Item.of(POW, 64))
        .itemInputs(Item.of(RDX, 64))
        .itemInputs(6 + 'x ' + C_IV)
        .itemInputs(Item.of(FUSE, 1))
        .addCondition(WFResearch.condition('bunker_tunneller'))

    // ── Cluster (frame + iron_round metal sink; lower-tier explosives) ───────────────────────────

    // missile_cluster
    event.recipes.wfcore.missile_factory('wfcore:missile_cluster')
        .inputFluids(Fluid.of('gtceu:diesel', 3000))
        .itemOutputs(Item.of('wfcore:missile_cluster'))
        .EUt(HV)
        .duration(10000)
        .itemInputs(Item.of(P+'vanadium_steel_frame', 12))
        .itemInputs(Item.of(LEAD_ROUND, 64))
        .itemInputs(Item.of(P+'stainless_steel_plate', 75))
        .itemInputs(Item.of(POW, 48))
        .itemInputs(Item.of(TNT, 32))
        .itemInputs(Item.of(FUSE, 1))
        .addCondition(WFResearch.condition('cluster_munitions'))

    // missile_cluster_fire
    event.recipes.wfcore.missile_factory('wfcore:missile_cluster_fire')
        .inputFluids(Fluid.of('gtceu:diesel', 3000))
        .itemOutputs(Item.of('wfcore:missile_cluster_fire'))
        .EUt(HV)
        .duration(10000)
        .itemInputs(Item.of(P+'vanadium_steel_frame', 12))
        .itemInputs(Item.of(P+'stainless_steel_plate', 75))
        .itemInputs(Item.of(WP, 32))
        .itemInputs(Item.of(POW, 48))
        .itemInputs(Item.of(TNT, 32))
        .itemInputs(Item.of(FUSE, 1))
        .addCondition(WFResearch.condition('cluster_munitions'))

    // missile_cluster_gas
    event.recipes.wfcore.missile_factory('wfcore:missile_cluster_gas')
        .inputFluids(Fluid.of('gtceu:diesel', 3000))
        .inputFluids(Fluid.of('gtceu:mustard_gas', 8000))
        .itemOutputs(Item.of('wfcore:missile_cluster_gas'))
        .EUt(HV)
        .duration(10000)
        .itemInputs(Item.of(P+'vanadium_steel_frame', 12))
        .itemInputs(Item.of(P+'stainless_steel_plate', 75))
        .itemInputs(Item.of(POW, 32))
        .itemInputs(Item.of(TNT, 32))
        .itemInputs(Item.of(FUSE, 1))
        .addCondition(WFResearch.condition('cluster_munitions'))

    // missile_frag_storm
    event.recipes.wfcore.missile_factory('wfcore:missile_frag_storm')
        .inputFluids(Fluid.of('gtceu:rocket_fuel', 8000))
        .itemOutputs(Item.of('wfcore:missile_frag_storm'))
        .EUt(EV)
        .duration(14000)
        .itemInputs(Item.of(P+'ultimet_frame', 16))
        .itemInputs(Item.of(LEAD_ROUND, 256))
        .itemInputs(Item.of(P+'titanium_plate', 64))
        .itemInputs(Item.of(POW, 64))
        .itemInputs(Item.of(TNT, 24))
        .itemInputs(Item.of(FUSE, 1))
        .addCondition(WFResearch.condition('frag_storm'))

    // missile_skyfall
    event.recipes.wfcore.missile_factory('wfcore:missile_skyfall')
        .inputFluids(Fluid.of('gtceu:rocket_fuel', 12000))
        .itemOutputs(Item.of('wfcore:missile_skyfall'))
        .EUt(IV)
        .duration(16000)
        .itemInputs(Item.of(P+'stainless_steel_frame', 20))
        .itemInputs(Item.of('gtceu:hsss_round', 96))
        .itemInputs(Item.of(P+'titanium_plate', 48))
        .itemInputs(10 + 'x ' + C_IV)
        .itemInputs(Item.of(POW, 64))
        .itemInputs(Item.of(FUSE, 1))
        .addCondition(WFResearch.condition('skyfall'))

    // ── EMP (lapotron cost replaces explosive load; plates scale to floor) ───────────────────────

    // missile_emp
    event.recipes.wfcore.missile_factory('wfcore:missile_emp')
        .inputFluids(Fluid.of('gtceu:diesel', 4000))
        .itemOutputs(Item.of('wfcore:missile_emp'))
        .EUt(HV)
        .duration(10000)
        .itemInputs(Item.of(P+'blue_steel_plate', 40))
        .itemInputs(Item.of(P+'aluminium_plate', 24))
        .itemInputs(Item.of(LAPO_DUST, 8))
        .itemInputs(6 + 'x ' + C_HV)
        .addCondition(WFResearch.condition('emp_warheads'))

    // missile_emp_heavy
    event.recipes.wfcore.missile_factory('wfcore:missile_emp_heavy')
        .inputFluids(Fluid.of('gtceu:rocket_fuel', 8000))
        .itemOutputs(Item.of('wfcore:missile_emp_heavy'))
        .EUt(EV)
        .duration(9000)
        .itemInputs(Item.of(P+'blue_steel_plate', 48))
        .itemInputs(Item.of(P+'titanium_plate', 32))
        .itemInputs(Item.of(LAPO, 2, '{"Charge":25000000L}'))
        .itemInputs(8 + 'x ' + C_EV)
        .addCondition(WFResearch.condition('emp_heavy'))

    // missile_emp_cluster
    event.recipes.wfcore.missile_factory('wfcore:missile_emp_cluster')
        .inputFluids(Fluid.of('gtceu:rocket_fuel', 8000))
        .itemOutputs(Item.of('wfcore:missile_emp_cluster'))
        .EUt(EV)
        .duration(9000)
        .itemInputs(Item.of(P+'blue_steel_plate', 64))
        .itemInputs(Item.of(LEAD_ROUND, 48))
        .itemInputs(Item.of(LAPO, 1, '{"Charge":25000000L}'))
        .itemInputs(Item.of(POW, 32))
        .itemInputs(6 + 'x ' + C_EV)
        .addCondition(WFResearch.condition('emp_cluster'))

    // missile_emp_lance
    event.recipes.wfcore.missile_factory('wfcore:missile_emp_lance')
        .inputFluids(Fluid.of('gtceu:rocket_fuel', 10000))
        .itemOutputs(Item.of('wfcore:missile_emp_lance'))
        .EUt(EV)
        .duration(11000)
        .itemInputs(Item.of(P+'tungsten_plate', 80))
        .itemInputs(Item.of(P+'titanium_plate', 24))
        .itemInputs(Item.of(LAPO, 2, '{"Charge":25000000L}'))
        .itemInputs(8 + 'x ' + C_IV)
        .addCondition(WFResearch.condition('emp_lance'))

    // ── Interceptors (the premium class: circuit + RAM heavy; ~1.2–1.4× mainline missile cost) ────
    // The guidance package (high circuit count + RAM) is the cost driver, NOT the airframe: plates
    // stay light, fuel < 50% of floor, small TNT (proximity fuze). Target cost-loss vs the mainline
    // same-tier missile ≈ 1.2–1.4×; penetrators match interceptor price (hypersonic ≈ ace).
    // interceptor_cluster is the exception — kept cheap as the anti-swarm volume option.

    // missile_interceptor
    event.recipes.wfcore.missile_factory('wfcore:missile_interceptor')
        .inputFluids(Fluid.of('gtceu:rocket_fuel', 2000))
        .itemOutputs(Item.of('wfcore:missile_interceptor'))
        .EUt(HV)
        .duration(8000)
        .itemInputs(Item.of(P+'aluminium_plate', 64))
        .itemInputs(Item.of(P+'stainless_steel_plate', 16))
        .itemInputs(38 + 'x ' + C_HV)
        .itemInputs(Item.of(MV_RAM, 4))
        .itemInputs(Item.of(ENG, 8))
        .itemInputs(Item.of(TNT, 12))
        .addCondition(WFResearch.condition('interceptor_systems'))

    // missile_interceptor_mk2
    event.recipes.wfcore.missile_factory('wfcore:missile_interceptor_mk2')
        .inputFluids(Fluid.of('gtceu:rocket_fuel', 3000))
        .itemOutputs(Item.of('wfcore:missile_interceptor_mk2'))
        .EUt(EV)
        .duration(10000)
        .itemInputs(Item.of(P+'titanium_plate', 64))
        .itemInputs(Item.of(P+'ultimet_plate', 16))
        .itemInputs(32 + 'x ' + C_EV)
        .itemInputs(Item.of(HV_RAM, 4))
        .itemInputs(Item.of(ENG, 16))
        .itemInputs(Item.of(TNT, 16))
        .addCondition(WFResearch.condition('interceptor_network'))

    // missile_interceptor_ace
    event.recipes.wfcore.missile_factory('wfcore:missile_interceptor_ace')
        .inputFluids(Fluid.of('gtceu:rocket_fuel', 4000))
        .itemOutputs(Item.of('wfcore:missile_interceptor_ace'))
        .EUt(IV)
        .duration(12000)
        .itemInputs(Item.of(P+'tungsten_steel_plate', 64))
        .itemInputs(Item.of(P+'titanium_plate', 32))
        .itemInputs(40 + 'x ' + C_IV)
        .itemInputs(Item.of(HV_RAM, 6))
        .itemInputs(Item.of(ENG, 16))
        .itemInputs(Item.of(TNT, 16))
        .addCondition(WFResearch.condition('interceptor_ace'))

    // missile_interceptor_cluster
    event.recipes.wfcore.missile_factory('wfcore:missile_interceptor_cluster')
        .inputFluids(Fluid.of('gtceu:rocket_fuel', 3500))
        .itemOutputs(Item.of('wfcore:missile_interceptor_cluster'))
        .EUt(IV)
        .duration(10000)
        .itemInputs(Item.of(P+'titanium_plate', 22))
        .itemInputs(Item.of(P+'aluminium_plate', 14))
        .itemInputs(10 + 'x ' + C_IV)
        .itemInputs(Item.of(HV_RAM, 6))
        .itemInputs(Item.of('gtceu:hsss_round', 32))
        .itemInputs(Item.of(TNT, 12))
        .addCondition(WFResearch.condition('interceptor_cluster'))

    // ── Drones (cheapest class: ~80% of HV plate floor, more engines than original) ─────────────

    // missile_strike_drone
    event.recipes.wfcore.missile_factory('wfcore:missile_strike_drone')
        .inputFluids(Fluid.of('gtceu:diesel', 4000))
        .itemOutputs(Item.of('wfcore:missile_strike_drone'))
        .EUt(HV)
        .duration(6000)
        .itemInputs(Item.of(P+'aluminium_plate', 80))
        .itemInputs(Item.of(ENG, 4))
        .itemInputs(6 + 'x ' + C_HV)
        .itemInputs(Item.of(TNT, 40))
        .itemInputs(Item.of('gtceu:stainless_steel_rotor', 2))
        .addCondition(WFResearch.condition('drone_loitering'))

    // missile_gas_drone
    event.recipes.wfcore.missile_factory('wfcore:missile_gas_drone')
        .inputFluids(Fluid.of('gtceu:diesel', 4000))
        .inputFluids(Fluid.of('gtceu:mustard_gas', 4000))
        .itemOutputs(Item.of('wfcore:missile_gas_drone'))
        .EUt(HV)
        .duration(6000)
        .itemInputs(Item.of(P+'aluminium_plate', 80))
        .itemInputs(Item.of(ENG, 4))
        .itemInputs(6 + 'x ' + C_HV)
        .itemInputs(Item.of('gtceu:stainless_steel_rotor', 2))
        .addCondition(WFResearch.condition('drone_loitering'))

    // missile_loiter_drone
    event.recipes.wfcore.missile_factory('wfcore:missile_loiter_drone')
        .inputFluids(Fluid.of('gtceu:diesel', 4000))
        .itemOutputs(Item.of('wfcore:missile_loiter_drone'))
        .EUt(HV)
        .duration(6000)
        .itemInputs(Item.of(P+'aluminium_plate', 80))
        .itemInputs(Item.of(ENG, 4))
        .itemInputs(6 + 'x ' + C_HV)
        .itemInputs(Item.of(POW, 16))
        .addCondition(WFResearch.condition('drone_loitering'))

})
})();
