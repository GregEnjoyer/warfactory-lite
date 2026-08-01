// Research-gated crafting for the tiered vehicle components (see
// startup_scripts/partMaker/vehicle_components.js for the items).
//
// GATING: the five GROUND-vehicle parts (vehicle_frame, engine, track, cannon_barrel,
// weapons_system) at LV/MV/HV/EV are each gated on their own node in the independent
// component tree — WFResearch.condition('veh_comp_<tier>_<part>'), defined in
// startup_scripts/vehicle_research.js on the "Ground vehicles" tab.
// The AVIATION parts (air_frame, wing, rotor, cockpit) gate on 'air_comp_<tier>_<part>'.
// EVERY IV recipe gates on the retired-but-present 'veh_iv' node -> those FAIL OPEN
// (ungated). Intentional: they'll be re-homed under a future Aviation-page component tree;
// no ground vehicle needs the ungated ones.
//
// Each part is assembled from its tier's plate + a component-flavour ingredient. Only pure
// gtceu:/minecraft:/wfcore: ids are used so these resolve in any instance. The per-part
// circuit number keeps each of a tier's recipes uniquely selectable in the assembler.
//
// ── COST SCALING (mild pass — everything pricier, steeper the higher the tier) ───────────
// Vehicles were made more expensive; lower tiers stay relatively cheap while higher tiers
// grow disproportionately (infrastructure demand). Component *material* is scaled here by a
// per-tier factor; the per-vehicle *assembly* cost (circuits/cable/time) is scaled in
// server_scripts/vehicle_factory.js by the SAME factor. Item counts scale capped at a 64
// stack; fluids scale uncapped. Retune by editing TIER_COST alone.
const TIER_COST = { lv: 1.1, mv: 1.25, hv: 1.5, ev: 1.8, iv: 2.2 }
const EUT       = { lv: 32,  mv: 128,  hv: 512, ev: 2048, iv: 8192 } // tier voltage (NOT scaled)
const sc  = (tier, n) => Math.min(64, Math.round(n * TIER_COST[tier])) // item count, 64-stack cap
const scF = (tier, n) => Math.round(n * TIER_COST[tier])               // fluid mB, uncapped

// Ground parts gate on veh_comp_<tier>_<part>; aviation parts on air_comp_<tier>_<part>;
// EVERY iv recipe gates on veh_iv (see header). Per-part circuit selector is tier-constant.
const GROUND = ['vehicle_frame', 'engine', 'track', 'cannon_barrel', 'weapons_system']
const CIRC   = { vehicle_frame: 23, air_frame: 23, engine: 23, wing: 31, rotor: 23, cockpit: 31, track: 29, cannon_barrel: 25, weapons_system: 30 }
const condOf = (tier, part) => tier === 'iv' ? 'veh_iv'
    : (GROUND.indexOf(part) >= 0 ? 'veh_comp_' : 'air_comp_') + tier + '_' + part

// PARTS[part][tier] = { items: [[count, id], …], fluid: [id, mB] | null }
const PARTS = {
    vehicle_frame: {
        lv: { items: [[8, 'gtceu:steel_block'], [32, 'wfcore:double_galvanized_steel_plate'], [32, 'gtceu:black_steel_frame'], [32, 'gtceu:wrought_iron_plate'], [64, 'gtceu:tin_bolt']], fluid: ['gtceu:tin', 32 * 144] },
        mv: { items: [[8, 'gtceu:aluminium_block'], [32, 'gtceu:double_cobalt_brass_plate'], [32, 'gtceu:aluminium_frame'], [32, 'gtceu:magnalium_plate'], [64, 'gtceu:bronze_bolt']], fluid: ['gtceu:tin', 32 * 144] },
        hv: { items: [[8, 'gtceu:stainless_steel_block'], [32, 'gtceu:double_blue_steel_plate'], [32, 'gtceu:ultimet_frame'], [32, 'gtceu:black_bronze_plate'], [64, 'gtceu:steel_bolt']], fluid: ['gtceu:soldering_alloy', 32 * 144] },
        ev: { items: [[8, 'gtceu:titanium_block'], [32, 'gtceu:double_hastelloy_c_276_plate'], [32, 'gtceu:hastelloy_x_frame'], [32, 'gtceu:hssg_plate'], [64, 'gtceu:stainless_steel_bolt']], fluid: ['gtceu:soldering_alloy', 32 * 144] },
        iv: { items: [[16, 'gtceu:tungsten_steel_plate'], [32, 'gtceu:double_tungsten_steel_plate'], [32, 'gtceu:hsse_rod']], fluid: ['gtceu:soldering_alloy', 32 * 144] },
    },
    air_frame: {
        lv: { items: [[8, 'minecraft:iron_block'], [16, 'gtceu:double_steel_plate'], [32, 'gtceu:black_steel_frame'], [32, 'gtceu:invar_frame']], fluid: ['gtceu:tin', 32 * 144] },
        mv: { items: [[8, 'gtceu:cobalt_brass_block'], [16, 'gtceu:double_aluminium_plate'], [32, 'gtceu:aluminium_frame'], [32, 'gtceu:magnalium_plate']], fluid: ['gtceu:tin', 32 * 144] },
        hv: { items: [[8, 'gtceu:blue_steel_block'], [16, 'gtceu:double_stainless_steel_plate'], [32, 'gtceu:ultimet_frame'], [32, 'gtceu:black_bronze_plate']], fluid: ['gtceu:soldering_alloy', 64 * 144] },
        ev: { items: [[8, 'gtceu:stellite_100_block'], [16, 'gtceu:double_titanium_plate'], [32, 'gtceu:hastelloy_x_frame'], [32, 'gtceu:hssg_plate']], fluid: ['gtceu:soldering_alloy', 64 * 144] },
    },
    engine: {
        lv: { items: [[16, 'gtceu:black_steel_gear'], [32, 'gtceu:small_steel_gear'], [32, 'gtceu:lv_electric_motor'], [16, 'gtceu:lv_electric_piston'], [24, 'wfcore:galvanized_steel_rod']], fluid: ['gtceu:lubricant', 8000] },
        mv: { items: [[16, 'gtceu:cobalt_brass_gear'], [32, 'gtceu:small_aluminium_gear'], [32, 'gtceu:mv_electric_motor'], [16, 'gtceu:mv_electric_piston'], [24, 'gtceu:magnalium_rod']], fluid: ['gtceu:lubricant', 8000] },
        hv: { items: [[16, 'gtceu:black_bronze_gear'], [32, 'gtceu:small_stainless_steel_gear'], [32, 'gtceu:hv_electric_motor'], [16, 'gtceu:hv_electric_piston'], [24, 'gtceu:ultimet_rod']], fluid: ['gtceu:lubricant', 8000] },
        ev: { items: [[16, 'gtceu:hssg_gear'], [32, 'gtceu:small_titanium_gear'], [32, 'gtceu:ev_electric_motor'], [16, 'gtceu:ev_electric_piston'], [24, 'gtceu:hastelloy_x_rod']], fluid: ['gtceu:lubricant', 8000] },
        iv: { items: [[16, 'gtceu:hsse_gear'], [32, 'gtceu:small_tungsten_steel_gear'], [32, 'gtceu:iv_electric_motor'], [16, 'gtceu:iv_electric_piston'], [24, 'gtceu:hsse_rod']], fluid: ['gtceu:lubricant', 8000] },
    },
    wing: {
        lv: { items: [[16, 'gtceu:double_black_steel_plate'], [16, 'wfcore:galvanized_steel_plate']], fluid: ['gtceu:tin', 16 * 144] },
        mv: { items: [[16, 'gtceu:double_aluminium_plate'], [16, 'gtceu:magnalium_plate']], fluid: ['gtceu:tin', 16 * 144] },
        hv: { items: [[16, 'gtceu:double_stainless_steel_plate'], [16, 'gtceu:ultimet_plate']], fluid: ['gtceu:tin', 32 * 144] },
        ev: { items: [[16, 'gtceu:double_titanium_plate'], [16, 'gtceu:hssg_plate']], fluid: ['gtceu:tin', 64 * 144] },
        iv: { items: [[16, 'gtceu:double_tungsten_steel_plate'], [16, 'gtceu:hsss_plate']], fluid: ['gtceu:tin', 64 * 144] },
    },
    rotor: {
        mv: { items: [[24, 'gtceu:cobalt_brass_turbine_blade']], fluid: null },
        hv: { items: [[24, 'gtceu:black_bronze_turbine_blade']], fluid: null },
        ev: { items: [[24, 'gtceu:hssg_turbine_blade']], fluid: null },
    },
    cockpit: {
        lv: { items: [[64, 'gtceu:tempered_glass'], [16, '#gtceu:circuits/lv'], [32, 'gtceu:rubber_plate'], [16, 'minecraft:leather']], fluid: null },
        mv: { items: [[64, 'gtceu:cleanroom_glass'], [16, '#gtceu:circuits/mv'], [32, 'gtceu:polyethylene_plate']], fluid: null },
        hv: { items: [[64, 'gtceu:laminated_glass'], [16, '#gtceu:circuits/hv'], [32, 'gtceu:polytetrafluoroethylene_plate']], fluid: null },
        ev: { items: [[64, 'gtceu:laminated_glass'], [16, '#gtceu:circuits/ev'], [64, 'gtceu:polytetrafluoroethylene_plate']], fluid: null },
        iv: { items: [[64, 'gtceu:laminated_glass'], [16, '#gtceu:circuits/iv'], [64, 'gtceu:polytetrafluoroethylene_plate']], fluid: null },
    },
    track: {
        lv: { items: [[64, 'gtceu:rubber_plate'], [32, 'gtceu:small_steel_gear'], [32, 'gtceu:invar_rod'], [48, 'gtceu:wrought_iron_ring'], [32, 'gtceu:black_steel_plate']], fluid: null },
        mv: { items: [[64, 'gtceu:silicone_rubber_plate'], [32, 'gtceu:small_aluminium_gear'], [32, 'gtceu:magnalium_rod'], [48, 'gtceu:rose_gold_ring'], [32, 'gtceu:cobalt_brass_plate']], fluid: null },
        hv: { items: [[64, 'gtceu:silicone_rubber_plate'], [32, 'gtceu:small_stainless_steel_gear'], [32, 'gtceu:ultimet_rod'], [48, 'gtceu:stainless_steel_ring'], [32, 'gtceu:black_bronze_plate']], fluid: null },
        ev: { items: [[64, 'gtceu:styrene_butadiene_rubber_plate'], [32, 'gtceu:small_titanium_gear'], [32, 'gtceu:hastelloy_x_rod'], [48, 'gtceu:titanium_ring'], [32, 'gtceu:hssg_plate']], fluid: null },
        iv: { items: [[64, 'gtceu:styrene_butadiene_rubber_plate'], [32, 'gtceu:small_tungsten_steel_gear'], [32, 'gtceu:hsse_rod'], [32, 'gtceu:tungsten_steel_plate']], fluid: null },
    },
    cannon_barrel: {
        lv: { items: [[16, 'gtceu:steel_block']], fluid: ['gtceu:tin_alloy', 8 * 144] },
        mv: { items: [[16, 'gtceu:aluminium_block']], fluid: ['gtceu:tin_alloy', 8 * 144] },
        hv: { items: [[16, 'gtceu:stainless_steel_block']], fluid: ['gtceu:tin_alloy', 8 * 144] },
        ev: { items: [[16, 'gtceu:titanium_block']], fluid: ['gtceu:tin_alloy', 16 * 144] },
    },
    weapons_system: {
        lv: { items: [[32, 'gtceu:steel_plate'], [16, '#gtceu:circuits/lv'], [32, 'wfcore:galvanized_steel_rod'], [16, 'gtceu:steel_spring'], [32, 'gtceu:red_alloy_single_cable']], fluid: null },
        mv: { items: [[32, 'gtceu:aluminium_plate'], [16, '#gtceu:circuits/mv'], [32, 'gtceu:magnalium_rod'], [16, 'gtceu:aluminium_spring'], [32, 'gtceu:annealed_copper_single_cable']], fluid: null },
        hv: { items: [[32, 'gtceu:stainless_steel_plate'], [16, '#gtceu:circuits/hv'], [32, 'gtceu:ultimet_rod'], [16, 'gtceu:aluminium_spring'], [32, 'gtceu:electrum_single_cable']], fluid: null },
        ev: { items: [[32, 'gtceu:titanium_plate'], [16, '#gtceu:circuits/ev'], [32, 'gtceu:hastelloy_x_rod'], [16, 'gtceu:hssg_spring'], [32, 'gtceu:black_steel_single_cable']], fluid: null },
        iv: { items: [[32, 'gtceu:tungsten_steel_plate'], [16, '#gtceu:circuits/iv'], [32, 'gtceu:hsse_rod'], [16, 'gtceu:tungsten_spring'], [32, 'gtceu:platinum_single_cable']], fluid: null },
    },
}

ServerEvents.recipes(event => {
    Object.keys(PARTS).forEach(part => {
        const tiers = PARTS[part]
        Object.keys(tiers).forEach(tier => {
            const spec = tiers[tier]
            const r = event.recipes.gtceu.assembler('veh_' + tier + '_' + part)
            spec.items.forEach(([n, id]) => r.itemInputs(sc(tier, n) + 'x ' + id))
            if (spec.fluid) r.inputFluids(Fluid.of(spec.fluid[0], scF(tier, spec.fluid[1])))
            r.itemOutputs('kubejs:' + tier + '_' + part)
                .circuit(CIRC[part])
                .duration(200)
                .EUt(EUT[tier])
                .addCondition(WFResearch.condition(condOf(tier, part)))
        })
    })
})
