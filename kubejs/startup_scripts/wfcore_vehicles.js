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

// Sodayo TenEven9 pickup (all 4 variants): 9-slot (3x3) storage.
const SODAYO = [
    'superbwarfare:sodayo_pick_up',
    'superbwarfare:sodayo_pick_up_hmg',
    'superbwarfare:sodayo_pick_up_rocket',
    'superbwarfare:sodayo_pick_up_tow',
]
SODAYO.forEach(id => withFuels(WFVehicles.override(id).maxFuel(4000)).storage(9, 3).register())

// Truck: 50-slot (5x10) storage.
withFuels(WFVehicles.override('superbwarfare:truck').maxFuel(4000)).storage(50, 10).register()
