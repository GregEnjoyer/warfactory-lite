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
//
// NOTE: the raw-METAL base counts below (blocks/plates/frames/rods/rings/bolts/gears/springs/
// turbine blades) were cut ~25% in a metal-cost-reduction pass. Non-metal inputs (circuits,
// electric motors/pistons, glass, rubber, leather, cables) and fluids were left untouched —
// the reduction targets the ingot value of a part, not its electronics/assembly.
//
// All item counts and fluid amounts below are pre-scaled (sc/scF already applied).
// Ground parts gate on veh_comp_<tier>_<part>; aviation parts on air_comp_<tier>_<part>;
// EVERY iv recipe gates on veh_iv (see header). Per-part circuit selector is tier-constant.

const EUT = { lv: 32, mv: 128, hv: 512, ev: 2048, iv: 8192 } // tier voltage (NOT scaled)

ServerEvents.recipes(event => {

    // ── vehicle_frame ─────────────────────────────────────────────────────────────────────
    // TIER_COST lv=1.1: sc(6)=7, sc(24)=26, sc(48)=53; scF(32*144)=5069
    event.recipes.gtceu.assembler('veh_lv_vehicle_frame')
        .itemInputs('7x gtceu:steel_block')
        .itemInputs('26x wfcore:double_galvanized_steel_plate')
        .itemInputs('26x gtceu:black_steel_frame')
        .itemInputs('26x gtceu:wrought_iron_plate')
        .itemInputs('53x gtceu:tin_bolt')
        .inputFluids(Fluid.of('gtceu:tin', 5069))
        .itemOutputs('kubejs:lv_vehicle_frame')
        .circuit(23)
        .duration(200)
        .EUt(32)
        .addCondition(WFResearch.condition('veh_comp_lv_vehicle_frame'))

    // TIER_COST mv=1.25: sc(6)=8, sc(24)=30, sc(48)=60; scF(32*144)=5760
    event.recipes.gtceu.assembler('veh_mv_vehicle_frame')
        .itemInputs('8x gtceu:aluminium_block')
        .itemInputs('30x gtceu:double_cobalt_brass_plate')
        .itemInputs('30x gtceu:aluminium_frame')
        .itemInputs('30x gtceu:magnalium_plate')
        .itemInputs('60x gtceu:bronze_bolt')
        .inputFluids(Fluid.of('gtceu:tin', 5760))
        .itemOutputs('kubejs:mv_vehicle_frame')
        .circuit(23)
        .duration(200)
        .EUt(128)
        .addCondition(WFResearch.condition('veh_comp_mv_vehicle_frame'))

    // TIER_COST hv=1.5: sc(6)=9, sc(24)=36, sc(48)→min(64,72)=64; scF(32*144)=6912
    event.recipes.gtceu.assembler('veh_hv_vehicle_frame')
        .itemInputs('9x gtceu:stainless_steel_block')
        .itemInputs('36x gtceu:double_blue_steel_plate')
        .itemInputs('36x gtceu:ultimet_frame')
        .itemInputs('36x gtceu:black_bronze_plate')
        .itemInputs('64x gtceu:steel_bolt')
        .inputFluids(Fluid.of('gtceu:soldering_alloy', 6912))
        .itemOutputs('kubejs:hv_vehicle_frame')
        .circuit(23)
        .duration(200)
        .EUt(512)
        .addCondition(WFResearch.condition('veh_comp_hv_vehicle_frame'))

    // TIER_COST ev=1.8: sc(6)=11, sc(24)=43, sc(48)→min(64,86)=64; scF(32*144)=8294
    event.recipes.gtceu.assembler('veh_ev_vehicle_frame')
        .itemInputs('11x gtceu:titanium_block')
        .itemInputs('43x gtceu:double_hastelloy_c_276_plate')
        .itemInputs('43x gtceu:hastelloy_x_frame')
        .itemInputs('43x gtceu:hssg_plate')
        .itemInputs('64x gtceu:stainless_steel_bolt')
        .inputFluids(Fluid.of('gtceu:soldering_alloy', 8294))
        .itemOutputs('kubejs:ev_vehicle_frame')
        .circuit(23)
        .duration(200)
        .EUt(2048)
        .addCondition(WFResearch.condition('veh_comp_ev_vehicle_frame'))

    // TIER_COST iv=2.2: sc(12)=26, sc(24)=53; scF(32*144)=10138; gates on veh_iv (FAIL OPEN)
    event.recipes.gtceu.assembler('veh_iv_vehicle_frame')
        .itemInputs('26x gtceu:tungsten_steel_plate')
        .itemInputs('53x gtceu:double_tungsten_steel_plate')
        .itemInputs('53x gtceu:hsse_rod')
        .inputFluids(Fluid.of('gtceu:soldering_alloy', 10138))
        .itemOutputs('kubejs:iv_vehicle_frame')
        .circuit(23)
        .duration(200)
        .EUt(8192)
        .addCondition(WFResearch.condition('veh_iv'))

    // ── air_frame ─────────────────────────────────────────────────────────────────────────
    // TIER_COST lv=1.1: sc(6)=7, sc(12)=13, sc(24)=26; scF(32*144)=5069
    event.recipes.gtceu.assembler('veh_lv_air_frame')
        .itemInputs('7x minecraft:iron_block')
        .itemInputs('13x gtceu:double_steel_plate')
        .itemInputs('26x gtceu:black_steel_frame')
        .itemInputs('26x gtceu:invar_frame')
        .inputFluids(Fluid.of('gtceu:tin', 5069))
        .itemOutputs('kubejs:lv_air_frame')
        .circuit(23)
        .duration(200)
        .EUt(32)
        .addCondition(WFResearch.condition('air_comp_lv_air_frame'))

    // TIER_COST mv=1.25: sc(6)=8, sc(12)=15, sc(24)=30; scF(32*144)=5760
    event.recipes.gtceu.assembler('veh_mv_air_frame')
        .itemInputs('8x gtceu:cobalt_brass_block')
        .itemInputs('15x gtceu:double_aluminium_plate')
        .itemInputs('30x gtceu:aluminium_frame')
        .itemInputs('30x gtceu:magnalium_plate')
        .inputFluids(Fluid.of('gtceu:tin', 5760))
        .itemOutputs('kubejs:mv_air_frame')
        .circuit(23)
        .duration(200)
        .EUt(128)
        .addCondition(WFResearch.condition('air_comp_mv_air_frame'))

    // TIER_COST hv=1.5: sc(6)=9, sc(12)=18, sc(24)=36; scF(64*144)=13824
    event.recipes.gtceu.assembler('veh_hv_air_frame')
        .itemInputs('9x gtceu:blue_steel_block')
        .itemInputs('18x gtceu:double_stainless_steel_plate')
        .itemInputs('36x gtceu:ultimet_frame')
        .itemInputs('36x gtceu:black_bronze_plate')
        .inputFluids(Fluid.of('gtceu:soldering_alloy', 13824))
        .itemOutputs('kubejs:hv_air_frame')
        .circuit(23)
        .duration(200)
        .EUt(512)
        .addCondition(WFResearch.condition('air_comp_hv_air_frame'))

    // TIER_COST ev=1.8: sc(6)=11, sc(12)=22, sc(24)=43; scF(64*144)=16589
    event.recipes.gtceu.assembler('veh_ev_air_frame')
        .itemInputs('11x gtceu:stellite_100_block')
        .itemInputs('22x gtceu:double_titanium_plate')
        .itemInputs('43x gtceu:hastelloy_x_frame')
        .itemInputs('43x gtceu:hssg_plate')
        .inputFluids(Fluid.of('gtceu:soldering_alloy', 16589))
        .itemOutputs('kubejs:ev_air_frame')
        .circuit(23)
        .duration(200)
        .EUt(2048)
        .addCondition(WFResearch.condition('air_comp_ev_air_frame'))

    // ── engine ────────────────────────────────────────────────────────────────────────────
    // TIER_COST lv=1.1: sc(12)=13, sc(24)=26, sc(32)=35, sc(16)=18, sc(18)=20; scF(8000)=8800
    event.recipes.gtceu.assembler('veh_lv_engine')
        .itemInputs('13x gtceu:black_steel_gear')
        .itemInputs('26x gtceu:small_steel_gear')
        .itemInputs('35x gtceu:lv_electric_motor')
        .itemInputs('18x gtceu:lv_electric_piston')
        .itemInputs('20x wfcore:galvanized_steel_rod')
        .inputFluids(Fluid.of('gtceu:lubricant', 8800))
        .itemOutputs('kubejs:lv_engine')
        .circuit(23)
        .duration(200)
        .EUt(32)
        .addCondition(WFResearch.condition('veh_comp_lv_engine'))

    // TIER_COST mv=1.25: sc(12)=15, sc(24)=30, sc(32)=40, sc(16)=20, sc(18)=23; scF(8000)=10000
    event.recipes.gtceu.assembler('veh_mv_engine')
        .itemInputs('15x gtceu:cobalt_brass_gear')
        .itemInputs('30x gtceu:small_aluminium_gear')
        .itemInputs('40x gtceu:mv_electric_motor')
        .itemInputs('20x gtceu:mv_electric_piston')
        .itemInputs('23x gtceu:magnalium_rod')
        .inputFluids(Fluid.of('gtceu:lubricant', 10000))
        .itemOutputs('kubejs:mv_engine')
        .circuit(23)
        .duration(200)
        .EUt(128)
        .addCondition(WFResearch.condition('veh_comp_mv_engine'))

    // TIER_COST hv=1.5: sc(12)=18, sc(24)=36, sc(32)=48, sc(16)=24, sc(18)=27; scF(8000)=12000
    event.recipes.gtceu.assembler('veh_hv_engine')
        .itemInputs('18x gtceu:black_bronze_gear')
        .itemInputs('36x gtceu:small_stainless_steel_gear')
        .itemInputs('48x gtceu:hv_electric_motor')
        .itemInputs('24x gtceu:hv_electric_piston')
        .itemInputs('27x gtceu:ultimet_rod')
        .inputFluids(Fluid.of('gtceu:lubricant', 12000))
        .itemOutputs('kubejs:hv_engine')
        .circuit(23)
        .duration(200)
        .EUt(512)
        .addCondition(WFResearch.condition('veh_comp_hv_engine'))

    // TIER_COST ev=1.8: sc(12)=22, sc(24)=43, sc(32)=58, sc(16)=29, sc(18)=32; scF(8000)=14400
    event.recipes.gtceu.assembler('veh_ev_engine')
        .itemInputs('22x gtceu:hssg_gear')
        .itemInputs('43x gtceu:small_titanium_gear')
        .itemInputs('58x gtceu:ev_electric_motor')
        .itemInputs('29x gtceu:ev_electric_piston')
        .itemInputs('32x gtceu:hastelloy_x_rod')
        .inputFluids(Fluid.of('gtceu:lubricant', 14400))
        .itemOutputs('kubejs:ev_engine')
        .circuit(23)
        .duration(200)
        .EUt(2048)
        .addCondition(WFResearch.condition('veh_comp_ev_engine'))

    // TIER_COST iv=2.2: sc(12)=26, sc(24)=53, sc(32)→min(64,70)=64, sc(16)=35, sc(18)=40; scF(8000)=17600; gates on veh_iv (FAIL OPEN)
    event.recipes.gtceu.assembler('veh_iv_engine')
        .itemInputs('26x gtceu:hsse_gear')
        .itemInputs('53x gtceu:small_tungsten_steel_gear')
        .itemInputs('64x gtceu:iv_electric_motor')
        .itemInputs('35x gtceu:iv_electric_piston')
        .itemInputs('40x gtceu:hsse_rod')
        .inputFluids(Fluid.of('gtceu:lubricant', 17600))
        .itemOutputs('kubejs:iv_engine')
        .circuit(23)
        .duration(200)
        .EUt(8192)
        .addCondition(WFResearch.condition('veh_iv'))

    // ── wing ──────────────────────────────────────────────────────────────────────────────
    // TIER_COST lv=1.1: sc(12)=13; scF(16*144)=2534
    event.recipes.gtceu.assembler('veh_lv_wing')
        .itemInputs('13x gtceu:double_black_steel_plate')
        .itemInputs('13x wfcore:galvanized_steel_plate')
        .inputFluids(Fluid.of('gtceu:tin', 2534))
        .itemOutputs('kubejs:lv_wing')
        .circuit(31)
        .duration(200)
        .EUt(32)
        .addCondition(WFResearch.condition('air_comp_lv_wing'))

    // TIER_COST mv=1.25: sc(12)=15; scF(16*144)=2880
    event.recipes.gtceu.assembler('veh_mv_wing')
        .itemInputs('15x gtceu:double_aluminium_plate')
        .itemInputs('15x gtceu:magnalium_plate')
        .inputFluids(Fluid.of('gtceu:tin', 2880))
        .itemOutputs('kubejs:mv_wing')
        .circuit(31)
        .duration(200)
        .EUt(128)
        .addCondition(WFResearch.condition('air_comp_mv_wing'))

    // TIER_COST hv=1.5: sc(12)=18; scF(32*144)=6912
    event.recipes.gtceu.assembler('veh_hv_wing')
        .itemInputs('18x gtceu:double_stainless_steel_plate')
        .itemInputs('18x gtceu:ultimet_plate')
        .inputFluids(Fluid.of('gtceu:tin', 6912))
        .itemOutputs('kubejs:hv_wing')
        .circuit(31)
        .duration(200)
        .EUt(512)
        .addCondition(WFResearch.condition('air_comp_hv_wing'))

    // TIER_COST ev=1.8: sc(12)=22; scF(64*144)=16589
    event.recipes.gtceu.assembler('veh_ev_wing')
        .itemInputs('22x gtceu:double_titanium_plate')
        .itemInputs('22x gtceu:hssg_plate')
        .inputFluids(Fluid.of('gtceu:tin', 16589))
        .itemOutputs('kubejs:ev_wing')
        .circuit(31)
        .duration(200)
        .EUt(2048)
        .addCondition(WFResearch.condition('air_comp_ev_wing'))

    // TIER_COST iv=2.2: sc(12)=26; scF(64*144)=20275; gates on veh_iv (FAIL OPEN)
    event.recipes.gtceu.assembler('veh_iv_wing')
        .itemInputs('26x gtceu:double_tungsten_steel_plate')
        .itemInputs('26x gtceu:hsss_plate')
        .inputFluids(Fluid.of('gtceu:tin', 20275))
        .itemOutputs('kubejs:iv_wing')
        .circuit(31)
        .duration(200)
        .EUt(8192)
        .addCondition(WFResearch.condition('veh_iv'))

    // ── rotor ─────────────────────────────────────────────────────────────────────────────
    // TIER_COST mv=1.25: sc(18)=23; no fluid
    event.recipes.gtceu.assembler('veh_mv_rotor')
        .itemInputs('23x gtceu:cobalt_brass_turbine_blade')
        .itemOutputs('kubejs:mv_rotor')
        .circuit(23)
        .duration(200)
        .EUt(128)
        .addCondition(WFResearch.condition('air_comp_mv_rotor'))

    // TIER_COST hv=1.5: sc(18)=27; no fluid
    event.recipes.gtceu.assembler('veh_hv_rotor')
        .itemInputs('27x gtceu:black_bronze_turbine_blade')
        .itemOutputs('kubejs:hv_rotor')
        .circuit(23)
        .duration(200)
        .EUt(512)
        .addCondition(WFResearch.condition('air_comp_hv_rotor'))

    // TIER_COST ev=1.8: sc(18)=32; no fluid
    event.recipes.gtceu.assembler('veh_ev_rotor')
        .itemInputs('32x gtceu:hssg_turbine_blade')
        .itemOutputs('kubejs:ev_rotor')
        .circuit(23)
        .duration(200)
        .EUt(2048)
        .addCondition(WFResearch.condition('air_comp_ev_rotor'))

    // ── cockpit ───────────────────────────────────────────────────────────────────────────
    // TIER_COST lv=1.1: sc(64)=64, sc(16)=18, sc(32)=35; no fluid
    event.recipes.gtceu.assembler('veh_lv_cockpit')
        .itemInputs('64x gtceu:tempered_glass')
        .itemInputs('18x #gtceu:circuits/lv')
        .itemInputs('35x gtceu:rubber_plate')
        .itemInputs('18x minecraft:leather')
        .itemOutputs('kubejs:lv_cockpit')
        .circuit(31)
        .duration(200)
        .EUt(32)
        .addCondition(WFResearch.condition('air_comp_lv_cockpit'))

    // TIER_COST mv=1.25: sc(64)=64, sc(16)=20, sc(32)=40; no fluid
    event.recipes.gtceu.assembler('veh_mv_cockpit')
        .itemInputs('64x gtceu:cleanroom_glass')
        .itemInputs('20x #gtceu:circuits/mv')
        .itemInputs('40x gtceu:polyethylene_plate')
        .itemOutputs('kubejs:mv_cockpit')
        .circuit(31)
        .duration(200)
        .EUt(128)
        .addCondition(WFResearch.condition('air_comp_mv_cockpit'))

    // TIER_COST hv=1.5: sc(64)=64, sc(16)=24, sc(32)=48; no fluid
    event.recipes.gtceu.assembler('veh_hv_cockpit')
        .itemInputs('64x gtceu:laminated_glass')
        .itemInputs('24x #gtceu:circuits/hv')
        .itemInputs('48x gtceu:polytetrafluoroethylene_plate')
        .itemOutputs('kubejs:hv_cockpit')
        .circuit(31)
        .duration(200)
        .EUt(512)
        .addCondition(WFResearch.condition('air_comp_hv_cockpit'))

    // TIER_COST ev=1.8: sc(64)=64, sc(16)=29, sc(64)=64; no fluid
    event.recipes.gtceu.assembler('veh_ev_cockpit')
        .itemInputs('64x gtceu:laminated_glass')
        .itemInputs('29x #gtceu:circuits/ev')
        .itemInputs('64x gtceu:polytetrafluoroethylene_plate')
        .itemOutputs('kubejs:ev_cockpit')
        .circuit(31)
        .duration(200)
        .EUt(2048)
        .addCondition(WFResearch.condition('air_comp_ev_cockpit'))

    // TIER_COST iv=2.2: sc(64)=64, sc(16)=35, sc(64)=64; no fluid; gates on veh_iv (FAIL OPEN)
    event.recipes.gtceu.assembler('veh_iv_cockpit')
        .itemInputs('64x gtceu:laminated_glass')
        .itemInputs('35x #gtceu:circuits/iv')
        .itemInputs('64x gtceu:polytetrafluoroethylene_plate')
        .itemOutputs('kubejs:iv_cockpit')
        .circuit(31)
        .duration(200)
        .EUt(8192)
        .addCondition(WFResearch.condition('veh_iv'))

    // ── track ─────────────────────────────────────────────────────────────────────────────
    // TIER_COST lv=1.1: sc(64)=64, sc(24)=26, sc(36)=40; no fluid
    event.recipes.gtceu.assembler('veh_lv_track')
        .itemInputs('64x gtceu:rubber_plate')
        .itemInputs('26x gtceu:small_steel_gear')
        .itemInputs('26x gtceu:invar_rod')
        .itemInputs('40x gtceu:wrought_iron_ring')
        .itemInputs('26x gtceu:black_steel_plate')
        .itemOutputs('kubejs:lv_track')
        .circuit(29)
        .duration(200)
        .EUt(32)
        .addCondition(WFResearch.condition('veh_comp_lv_track'))

    // TIER_COST mv=1.25: sc(64)=64, sc(24)=30, sc(36)=45; no fluid
    event.recipes.gtceu.assembler('veh_mv_track')
        .itemInputs('64x gtceu:silicone_rubber_plate')
        .itemInputs('30x gtceu:small_aluminium_gear')
        .itemInputs('30x gtceu:magnalium_rod')
        .itemInputs('45x gtceu:rose_gold_ring')
        .itemInputs('30x gtceu:cobalt_brass_plate')
        .itemOutputs('kubejs:mv_track')
        .circuit(29)
        .duration(200)
        .EUt(128)
        .addCondition(WFResearch.condition('veh_comp_mv_track'))

    // TIER_COST hv=1.5: sc(64)=64, sc(24)=36, sc(36)=54; no fluid
    event.recipes.gtceu.assembler('veh_hv_track')
        .itemInputs('64x gtceu:silicone_rubber_plate')
        .itemInputs('36x gtceu:small_stainless_steel_gear')
        .itemInputs('36x gtceu:ultimet_rod')
        .itemInputs('54x gtceu:stainless_steel_ring')
        .itemInputs('36x gtceu:black_bronze_plate')
        .itemOutputs('kubejs:hv_track')
        .circuit(29)
        .duration(200)
        .EUt(512)
        .addCondition(WFResearch.condition('veh_comp_hv_track'))

    // TIER_COST ev=1.8: sc(64)=64, sc(24)=43, sc(36)→min(64,65)=64; no fluid
    event.recipes.gtceu.assembler('veh_ev_track')
        .itemInputs('64x gtceu:styrene_butadiene_rubber_plate')
        .itemInputs('43x gtceu:small_titanium_gear')
        .itemInputs('43x gtceu:hastelloy_x_rod')
        .itemInputs('64x gtceu:titanium_ring')
        .itemInputs('43x gtceu:hssg_plate')
        .itemOutputs('kubejs:ev_track')
        .circuit(29)
        .duration(200)
        .EUt(2048)
        .addCondition(WFResearch.condition('veh_comp_ev_track'))

    // TIER_COST iv=2.2: sc(64)=64, sc(24)=53; no fluid; gates on veh_iv (FAIL OPEN)
    event.recipes.gtceu.assembler('veh_iv_track')
        .itemInputs('64x gtceu:styrene_butadiene_rubber_plate')
        .itemInputs('53x gtceu:small_tungsten_steel_gear')
        .itemInputs('53x gtceu:hsse_rod')
        .itemInputs('53x gtceu:tungsten_steel_plate')
        .itemOutputs('kubejs:iv_track')
        .circuit(29)
        .duration(200)
        .EUt(8192)
        .addCondition(WFResearch.condition('veh_iv'))

    // ── cannon_barrel ─────────────────────────────────────────────────────────────────────
    // TIER_COST lv=1.1: sc(12)=13; scF(8*144)=1267
    event.recipes.gtceu.assembler('veh_lv_cannon_barrel')
        .itemInputs('13x gtceu:steel_block')
        .inputFluids(Fluid.of('gtceu:tin_alloy', 1267))
        .itemOutputs('kubejs:lv_cannon_barrel')
        .circuit(25)
        .duration(200)
        .EUt(32)
        .addCondition(WFResearch.condition('veh_comp_lv_cannon_barrel'))

    // TIER_COST mv=1.25: sc(12)=15; scF(8*144)=1440
    event.recipes.gtceu.assembler('veh_mv_cannon_barrel')
        .itemInputs('15x gtceu:aluminium_block')
        .inputFluids(Fluid.of('gtceu:tin_alloy', 1440))
        .itemOutputs('kubejs:mv_cannon_barrel')
        .circuit(25)
        .duration(200)
        .EUt(128)
        .addCondition(WFResearch.condition('veh_comp_mv_cannon_barrel'))

    // TIER_COST hv=1.5: sc(12)=18; scF(8*144)=1728
    event.recipes.gtceu.assembler('veh_hv_cannon_barrel')
        .itemInputs('18x gtceu:stainless_steel_block')
        .inputFluids(Fluid.of('gtceu:tin_alloy', 1728))
        .itemOutputs('kubejs:hv_cannon_barrel')
        .circuit(25)
        .duration(200)
        .EUt(512)
        .addCondition(WFResearch.condition('veh_comp_hv_cannon_barrel'))

    // TIER_COST ev=1.8: sc(12)=22; scF(16*144)=4147
    event.recipes.gtceu.assembler('veh_ev_cannon_barrel')
        .itemInputs('22x gtceu:titanium_block')
        .inputFluids(Fluid.of('gtceu:tin_alloy', 4147))
        .itemOutputs('kubejs:ev_cannon_barrel')
        .circuit(25)
        .duration(200)
        .EUt(2048)
        .addCondition(WFResearch.condition('veh_comp_ev_cannon_barrel'))

    // ── weapons_system ────────────────────────────────────────────────────────────────────
    // TIER_COST lv=1.1: sc(24)=26, sc(16)=18, sc(12)=13, sc(32)=35; no fluid
    event.recipes.gtceu.assembler('veh_lv_weapons_system')
        .itemInputs('26x gtceu:steel_plate')
        .itemInputs('18x #gtceu:circuits/lv')
        .itemInputs('26x wfcore:galvanized_steel_rod')
        .itemInputs('13x gtceu:steel_spring')
        .itemInputs('35x gtceu:red_alloy_single_cable')
        .itemOutputs('kubejs:lv_weapons_system')
        .circuit(30)
        .duration(200)
        .EUt(32)
        .addCondition(WFResearch.condition('veh_comp_lv_weapons_system'))

    // TIER_COST mv=1.25: sc(24)=30, sc(16)=20, sc(12)=15, sc(32)=40; no fluid
    event.recipes.gtceu.assembler('veh_mv_weapons_system')
        .itemInputs('30x gtceu:aluminium_plate')
        .itemInputs('20x #gtceu:circuits/mv')
        .itemInputs('30x gtceu:magnalium_rod')
        .itemInputs('15x gtceu:aluminium_spring')
        .itemInputs('40x gtceu:annealed_copper_single_cable')
        .itemOutputs('kubejs:mv_weapons_system')
        .circuit(30)
        .duration(200)
        .EUt(128)
        .addCondition(WFResearch.condition('veh_comp_mv_weapons_system'))

    // TIER_COST hv=1.5: sc(24)=36, sc(16)=24, sc(12)=18, sc(32)=48; no fluid
    event.recipes.gtceu.assembler('veh_hv_weapons_system')
        .itemInputs('36x gtceu:stainless_steel_plate')
        .itemInputs('24x #gtceu:circuits/hv')
        .itemInputs('36x gtceu:ultimet_rod')
        .itemInputs('18x gtceu:aluminium_spring')
        .itemInputs('48x gtceu:electrum_single_cable')
        .itemOutputs('kubejs:hv_weapons_system')
        .circuit(30)
        .duration(200)
        .EUt(512)
        .addCondition(WFResearch.condition('veh_comp_hv_weapons_system'))

    // TIER_COST ev=1.8: sc(24)=43, sc(16)=29, sc(12)=22, sc(32)=58; no fluid
    event.recipes.gtceu.assembler('veh_ev_weapons_system')
        .itemInputs('43x gtceu:titanium_plate')
        .itemInputs('29x #gtceu:circuits/ev')
        .itemInputs('43x gtceu:hastelloy_x_rod')
        .itemInputs('22x gtceu:hssg_spring')
        .itemInputs('58x gtceu:black_steel_single_cable')
        .itemOutputs('kubejs:ev_weapons_system')
        .circuit(30)
        .duration(200)
        .EUt(2048)
        .addCondition(WFResearch.condition('veh_comp_ev_weapons_system'))

    // TIER_COST iv=2.2: sc(24)=53, sc(16)=35, sc(12)=26, sc(32)→min(64,70)=64; no fluid; gates on veh_iv (FAIL OPEN)
    event.recipes.gtceu.assembler('veh_iv_weapons_system')
        .itemInputs('53x gtceu:tungsten_steel_plate')
        .itemInputs('35x #gtceu:circuits/iv')
        .itemInputs('53x gtceu:hsse_rod')
        .itemInputs('26x gtceu:tungsten_spring')
        .itemInputs('64x gtceu:platinum_single_cable')
        .itemOutputs('kubejs:iv_weapons_system')
        .circuit(30)
        .duration(200)
        .EUt(8192)
        .addCondition(WFResearch.condition('veh_iv'))

})
