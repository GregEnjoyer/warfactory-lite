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

const HV = 512
const EV = 2048
const IV = 8192
const C_HV = '#gtceu:circuits/hv'
const C_EV = '#gtceu:circuits/ev'
const C_IV = '#gtceu:circuits/iv'
const P    = 'gtceu:'
const TNT  = 'gtceu:gelled_toluene'
const RDX  = 'gtceu:rdx_dust'          // verify: gtceu rdx material or wfcore:rdx_dust
const POW  = 'minecraft:gunpowder'
const FUSE = 'superbwarfare:fusee'
const ENG  = 'superbwarfare:missile_engine'
const CIRC = 'gtceu:advanced_integrated_circuit'
const WP        = 'gtceu:white_phosphorus_dust'
const LAPO      = 'gtceu:lapotron_crystal'
const LAPO_DUST = 'gtceu:lapotron_dust' // milled crystal — verify dust form exists in this gtceu version
const IRON_ROUND = 'gtceu:iron_round'
const LEAD_ROUND = 'gtceu:lead_round'
const SRF    = 'kubejs:solid_rocket_fuel' // solid APCP-equivalent propellant
const MV_RAM = 'kubejs:mv_ram'
const HV_RAM = 'kubejs:hv_ram'
const EV_RAM = 'kubejs:ev_ram'

// [ name (w/o missile_), research node, EUt, duration(ticks), [fuelId, mB],
//   [[itemId, count, nbt?], …], optional extraFluids [[fluidId, mB], …] ]
//   Each input item is [itemId, count]; append a third element — an SNBT string
//   like '{AmmoId:"tacz:50bmg"}' — to require an NBT-tagged item (strict match).
const MISSILES = [
    // ── Demolition ───────────────────────────────────────────────────────────────────────────────
    ['he',          'missile_systems',     HV, 12000, ['gtceu:diesel', 3000],       [[P+'aluminium_plate',96],[P+'blue_steel_frame',8],[C_HV,8],[ENG,4],[FUSE,1],[TNT,85]]],
    ['dummy',       'missile_systems',     HV, 10000, ['gtceu:diesel', 2000],       [[P+'aluminium_plate',96],[P+'blue_steel_frame',5],[ENG,2]]],
    ['thermobaric', 'demolition_ordnance', EV, 16000, ['gtceu:rocket_fuel', 12000], [[P+'titanium_plate',128],[P+'hssg_frame',4],[ENG,12],[FUSE,1],[C_EV,8],[RDX,64]]],
    ['mininuke',    'tactical_nuclear',    IV, 22000, ['gtceu:rocket_fuel', 20000], [[P+'hsss_plate',128],[P+'titanium_plate',8],[ENG,32],[RDX,16],[P+'double_beryllium_plate', 32],['gtceu:uranium_235_block', 8] ,[C_IV,16]]],

    // ── Penetrators (engine-heavy; light airframe; rocket → jet fuel) ────────────────────────────
    // Floor: fewer plates than demolition, compensated by engine count and explosive load.
    ['penetrator',            'penetrator_missiles',   EV, 12000, ['gtceu:rocket_fuel', 3500],  [[P+'titanium_plate',64],[P+'ultimet_frame',8],[ENG,16],[FUSE,1],[C_HV,10],[TNT,64]]],
    ['penetrator_supersonic', 'penetrator_supersonic', EV, 14000, ['gtceu:rocket_fuel', 10000], [[P+'incoloy_ma_956_plate',96],[P+'hssg_frame',8],[ENG,32],[FUSE,1],[C_EV,12],[TNT,96]]],
    ['penetrator_hypersonic', 'penetrator_hypersonic', IV, 16000, ['gtceu:jet_fuel', 10000],    [[P+'hsss_plate',96],['gtceu:incoloy_ma_956_frame',8],[ENG,64],[FUSE,1],[C_IV,16],[TNT,128]]],

    // ── ICBMs (RAM + SRF heavy; stainless_steel → ultimet) ───────────────────────────────────────
    ['long_range',  'missile_systems',     HV, 14000, ['gtceu:rocket_fuel', 6000],[[P+'double_stainless_steel_plate',48],[P+'stainless_steel_frame',12],[C_HV,10],[ENG,8],[FUSE,1],[TNT,72]]],
    ['icbm',        'icbm',       EV, 18000, ['gtceu:rocket_fuel', 10000],  [[P+'double_titanium_plate',64],[ENG,16],[SRF,24],[C_EV,10],[HV_RAM,2],[FUSE,1],[RDX,85]]],
    ['icbm_heavy',  'icbm_heavy', IV, 24000, ['gtceu:rocket_fuel', 18000],  [[P+'double_tungsten_steel_plate',64],[P+'stainless_steel_plate',32],[ENG,24],[SRF,48],[C_IV, 10], [RDX, 100],[EV_RAM,3]]],

    // ── Bunker busters (shaped charge; explosive-heavy) ──────────────────────────────────────────
    ['bunker_buster',       'shaped_charges',      HV, 12000, ['gtceu:diesel', 4000],  [[P+'stainless_steel_plate',48],[P+'blue_steel_plate', 24],[POW,48],[TNT,48],[CIRC,4],[FUSE,1]]],
    ['bunker_buster_heavy', 'bunker_buster_heavy', EV, 14000, ['gtceu:diesel', 10000], [[P+'titanium_plate',54],[P+'ultimet_plate',32],[POW,56],[RDX,32],[CIRC,6],[FUSE,1]]],
    ['bunker_tunneller',    'bunker_tunneller',    IV, 18000, ['gtceu:diesel', 14000],  [[P+'tungsten_steel_plate',64],[P+'hsss_plate',32],[POW,64],[RDX,64],[C_IV,6],[FUSE,1]]],

    // ── Cluster (frame + iron_round metal sink; lower-tier explosives) ───────────────────────────
    ['cluster',      'cluster_munitions', HV, 10000, ['gtceu:diesel', 3000],  [[P+'vanadium_steel_frame',12],[LEAD_ROUND,64],[P+'stainless_steel_plate',75],[POW,48],[TNT,32],[FUSE,1]]],
    ['cluster_fire', 'cluster_munitions', HV, 10000, ['gtceu:diesel', 3000],  [[P+'vanadium_steel_frame',12],[P+'stainless_steel_plate',75],[WP,32],[POW,48],[TNT,32],[FUSE,1]]],
    ['cluster_gas',  'cluster_munitions', HV, 10000, ['gtceu:diesel', 3000],       [[P+'vanadium_steel_frame',12],[P+'stainless_steel_plate',75],[POW,32],[TNT,32],[FUSE,1]], [['gtceu:mustard_gas', 8000]]],
    ['frag_storm',   'frag_storm',        EV, 14000, ['gtceu:rocket_fuel', 8000],  [[P+'ultimet_frame',16],[LEAD_ROUND,256],[P+'titanium_plate',64],[POW,64],[TNT,24],[FUSE,1]]],
    ['skyfall',      'skyfall',           IV, 16000, ['gtceu:rocket_fuel', 12000], [[P+'stainless_steel_frame',20],['gtceu:hsss_round',96],[P+'titanium_plate',48],[C_IV,10],[POW,64],[FUSE,1]]],

    // ── EMP (lapotron cost replaces explosive load; plates scale to floor) ───────────────────────
    ['emp',         'emp_warheads', HV, 10000, ['gtceu:diesel',      4000],  [[P+'blue_steel_plate',40],[P+'aluminium_plate',24],[LAPO_DUST,8],[C_HV,6]]],
    ['emp_heavy',   'emp_heavy',    EV, 12000, ['gtceu:rocket_fuel', 8000],  [[P+'blue_steel_plate',48],[P+'titanium_plate',32],[LAPO,2, '{"Charge":25000000L}'],[C_EV,8]]],
    ['emp_cluster', 'emp_cluster',  EV, 11000, ['gtceu:rocket_fuel', 8000],  [[P+'blue_steel_plate',64],[LEAD_ROUND,48],[LAPO,1,'{"Charge":25000000L}'],[POW,32],[C_EV,6]]],
    ['emp_lance',   'emp_lance',    EV, 14000, ['gtceu:rocket_fuel', 10000], [[P+'tungsten_plate',80],[P+'titanium_plate',24],[LAPO,2,'{"Charge":25000000L}'],[C_IV,8]]],

    // ── Interceptors (the premium class: circuit + RAM heavy; ~1.2–1.4× mainline missile cost) ────
    // The guidance package (high circuit count + RAM) is the cost driver, NOT the airframe: plates
    // stay light, fuel < 50% of floor, small TNT (proximity fuze). Target cost-loss vs the mainline
    // same-tier missile ≈ 1.2–1.4×; penetrators match interceptor price (hypersonic ≈ ace).
    // interceptor_cluster is the exception — kept cheap as the anti-swarm volume option.
    ['interceptor',         'interceptor_systems', HV,  8000, ['gtceu:rocket_fuel', 2000], [[P+'aluminium_plate',64],[P+'stainless_steel_plate',16],[C_HV,38],[MV_RAM,4],[ENG,8],[TNT,12]]],
    ['interceptor_mk2',     'interceptor_network', EV, 10000, ['gtceu:rocket_fuel', 3000], [[P+'titanium_plate',64],[P+'ultimet_plate',16],[C_EV,32],[HV_RAM,4],[ENG,16],[TNT,16]]],
    ['interceptor_ace',     'interceptor_ace',     IV, 12000, ['gtceu:rocket_fuel', 4000], [[P+'tungsten_steel_plate',64],[P+'titanium_plate',32],[C_IV,40],[HV_RAM,6],[ENG,16],[TNT,16]]],
    ['interceptor_cluster', 'interceptor_cluster', IV, 10000, ['gtceu:rocket_fuel', 3500], [[P+'titanium_plate',22],[P+'aluminium_plate',14],[C_IV,10],[HV_RAM,6],['gtceu:hsss_round',32],[TNT,12]]],

    // ── Drones (cheapest class: ~80% of HV plate floor, more engines than original) ─────────────
    ['strike_drone', 'missile_systems', HV, 6000, ['gtceu:diesel', 4000], [[P+'aluminium_plate',80],[ENG,4],[C_HV,6],[TNT,40],['gtceu:stainless_steel_rotor',2]]],
    ['gas_drone',    'missile_systems', HV, 6000, ['gtceu:diesel', 4000], [[P+'aluminium_plate',80],[ENG,4],[C_HV,6],['gtceu:stainless_steel_rotor',2]], [['gtceu:mustard_gas', 4000]]],
    ['loiter_drone', 'missile_systems', HV, 6000, ['gtceu:diesel', 4000], [[P+'aluminium_plate',80],[ENG,4],[C_HV,6],[POW,16]]],
]

ServerEvents.recipes(event => {
    MISSILES.forEach(([name, research, eu, duration, [fuelId, fuelAmount], inputs, extraFluids]) => {
        const recipe = event.recipes.wfcore.missile_factory('wfcore:missile_' + name)
            .inputFluids(Fluid.of(fuelId, fuelAmount))
            .itemOutputs(Item.of('wfcore:missile_' + name))
            .EUt(eu)
            .duration(duration)
        // Input items: [itemId, count] or [itemId, count, nbtString] for an NBT-tagged
        // input. The ternary guards the absent/empty-NBT case — passing a null NBT to
        // Item.of resolves to the (id, count, nbt) overload and NPEs on tag merge.
        inputs.forEach(([itemId, count, nbt]) =>
            recipe.itemInputs(nbt ? Item.of(itemId, count, nbt) : Item.of(itemId, count)))
        if (extraFluids) extraFluids.forEach(([fid, mb]) => recipe.inputFluids(Fluid.of(fid, mb)))
        recipe.addCondition(WFResearch.condition(research))
    })

})
