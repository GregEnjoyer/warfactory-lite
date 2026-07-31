// priority: 100
// WFCore vehicle fuel/storage overrides — moved here from config/wfcore.toml (the old `vehicles` list) to the
// WFVehicles KubeJS API. This is a STARTUP script so SuperbOverrides is populated before any vehicle ticks.
//
//   WFVehicles.override(id)              -> a per-vehicle override builder
//     .maxFuel(mb)                       -> fuel-tank capacity (default 4000)
//     .fuel(fluidId, ratio)              -> whitelist a fuel; ratio = energy multiplier per mb (repeatable)
//     .storage(size[, columns])          -> WFCore resizable ModularUI storage (columns default 9)
//     .register()
//   WFVehicles.foliageBreaker(id)        -> vehicle ploughs through cacti/logs/leaves (was `foliageBreakers`)

// Shared fuel profile: diesel/bio_diesel baseline, light fuel weaker, gasoline / high-octane richer.
const FUELS = [
    ['gtceu:diesel', 1.0],
    ['gtceu:bio_diesel', 1.0],
    ['gtceu:light_fuel', 0.8],
    ['gtceu:gasoline', 1.5],
    ['gtceu:high_octane_gasoline', 2.0],
]

const withFuels = builder => {
    FUELS.forEach(([fluid, ratio]) => builder.fuel(fluid, ratio))
    return builder
}

// Storage layout helper: single tidy row up to 9 wide, then rows of 10 for bigger holds
// (20 -> 2x10, 40 -> 4x10, 60 -> 6x10).
const columnsFor = slots => Math.min(slots, 10)

// Register a fuelled vehicle with `slots` of WFCore storage — standard fuel whitelist + 4000mB tank.
const vehicle = (id, slots) => {
    withFuels(WFVehicles.override(id).maxFuel(4000)).storage(slots, columnsFor(slots)).register()
}

// Register an emplacement (crew-served weapon): STORAGE only, NO fuel override — emplacements aren't
// fuelled vehicles (they deploy from items). See the Emplacements research tab in wfcore/WFResearch.js.
const emplacement = (id, slots) => {
    WFVehicles.override(id).storage(slots, columnsFor(slots)).register()
}

// Sodayo TenEven9 pickup (all 4 variants): 9-slot (3x3) storage.
const SODAYO = [
    'superbwarfare:sodayo_pick_up',
    'superbwarfare:sodayo_pick_up_hmg',
    'superbwarfare:sodayo_pick_up_rocket',
    'superbwarfare:sodayo_pick_up_tow',
]
SODAYO.forEach(id => withFuels(WFVehicles.override(id).maxFuel(4000)).storage(9, 3).register())

// Per-vehicle storage overrides (id, slots). Fuel is applied to all via `vehicle(...)`.
const VEHICLES = [
    // Armoured ground vehicles (IFVs / tanks)
    ['superbwarfare:lav_150', 9],   // LAV-150 Commando
    ['superbwarfare:bradley', 9],   // M2 Bradley
    ['superbwarfare:lav_ad', 9],    // LAV-AD AAV
    ['superbwarfare:ztz_99a', 8],   // ZTZ-99A MBT
    // Aircraft
    ['superbwarfare:ah_6', 5],      // AH-6 Little Bird
    ['superbwarfare:mi_28', 6],     // Mi-28 Attack Helicopter
    ['superbwarfare:ju_87', 5],     // Ju-87 Stuka Bomber
    ['superbwarfare:a_10a', 8],     // A-10 Thunderbolt II
    ['ashvehicle:b-2', 8],          // B-2 Spirit (AshVehicle)
    // Logistics trucks
    ['superbwarfare:truck', 60],    // Truck
    ['mcsp:ural_green', 40],        // Ural-4320 Green (MCSP)
]
VEHICLES.forEach(([id, slots]) => vehicle(id, slots))

// Emplacements (id, slots) — STORAGE ONLY, no fuel (see `emplacement` above). These are the crew-served
// weapon platforms on the Emplacements research tab; their ammo storage size is set here.
const EMPLACEMENTS = [
    ['superbwarfare:hpj_11', 20],   // H/PJ-11 CIWS
    ['superbwarfare:mk_42', 3],     // 5"/54 Mk42
    ['superbwarfare:mle_1934', 4],  // 138.6mm50 Mle1934 R1938
    ['superbwarfare:bl_132', 5],    // 130mm/58 BL-132
]
EMPLACEMENTS.forEach(([id, slots]) => emplacement(id, slots))

// IFVs and tanks plough through cacti / logs / leaves as they drive.
const FOLIAGE_BREAKERS = [
    'superbwarfare:lav_150',  // LAV-150 Commando
    'superbwarfare:bradley',  // M2 Bradley
    'superbwarfare:lav_ad',   // LAV-AD AAV
    'superbwarfare:ztz_99a',  // ZTZ-99A MBT
]
FOLIAGE_BREAKERS.forEach(id => WFVehicles.foliageBreaker(id))
