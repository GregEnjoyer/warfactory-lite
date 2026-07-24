// WFCore computation-mainframe configuration reference.
// Exposed as the `WFCompute` binding in STARTUP scripts. Everything below is applied AFTER WFCore's
// built-in defaults, so you can add, override or remove any built-in reliably.
//
// Default built-ins (for reference):
//   CPU  gtceu:good_integrated_circuit  -> efficiency 0.5, ~1920 EU/t max, ~24 EU/t idle
//   RAM  gtceu:ram_wafer                -> 256 CWU/t throughput
//   Coolant: water(1), oxygen(3), helium(6), nitrogen(10)

// priority: 0

// ---- CPUs: efficiency 0..1 (lower = hotter), maxPower EU/t at full load, minPower idle EU/t ----
WFCompute
    .cpu('gtceu:good_integrated_circuit').efficiency(0.6).maxPower(1920).minPower(32).register()   // override default
    .cpu('gtceu:basic_integrated_circuit').efficiency(0.75).maxPower(120).minPower(8).register()    // cheap LV CPU
    .cpu('gtceu:advanced_integrated_circuit').efficiency(0.5).maxPower(7680).minPower(128).register() // hot HV CPU

// ---- RAM: CWU/t throughput cap the module contributes ----
WFCompute
    .ram('gtceu:ram_wafer', 256)                              // shorthand
    .ram('gtceu:advanced_integrated_circuit').throughput(64).register() // (example of the fluent form)

// ---- Coolant fluids: heat capacity (EU per mB), optional hot output variant ----
WFCompute
    .coolant('minecraft:water').heatCapacity(1.0).register()
    .coolant('gtceu:nitrogen').heatCapacity(10.0).register()

// ---- Remove a built-in (uncomment to disable the default MV CPU) ----
// WFCompute.removeCpu('gtceu:good_integrated_circuit')

// ---- Global simulation tunables (all chainable) ----
WFCompute.config()
    .maxTemperature(105)        // °C explode threshold
    .baseFrameMass(500)         // frame thermal inertia
    .hatchThermalMass(50)       // per-hatch inertia
    .sagStartTemp(90)           // throttling begins here
    .passiveCoolingBase(0.05)   // per-tier passive cooling
    .activeCoolingScale(0.1)    // liquid-cooler strength
    .liquidCoolantPerTick(100)  // mB/tick a liquid cooler drains
    .heatRatio(0.04)            // waste-EU -> heat
    .ambientNether(70)
