// WFCore computation-mainframe configuration reference.
// Exposed as the `WFCompute` binding in STARTUP scripts. Everything below is applied AFTER WFCore's
// built-in defaults, so you can add, override or remove any built-in reliably.
//
// Default built-ins (for reference):
//   CPU  gtceu:good_integrated_circuit  -> efficiency 0.5, ~1920 EU/t max, ~24 EU/t idle
//   RAM  gtceu:ram_wafer                -> 256 CWU/t throughput
//   Coolant: water(1), oxygen(3), helium(6), nitrogen(10)

// priority: 0

// ══ COMPUTE BALANCE — MV / HV / EV / IV ═════════════════════════════════════
// Design target (CLAUDE.md "Research compute balance" + how many mainframes a
// player is meant to OWN at each stage). Player compute ACCESS ≈ ½ tier voltage;
// a player reaches it by building N separate mainframe multiblocks. So the
// "comfortable" CWU one well-built mainframe provides ≈ (tier budget ÷ N):
//
//   Tier  budget(=½V)  mainframes  comfortable/frame  RAM ceiling(full slot)
//   MV      64          1–2          ~64               96
//   HV      256         3–5          ~64               128
//   EV      1024        8            ~128              192
//   IV      4096        12           ~341              512
//
// Pushing ONE mainframe past its RAM-slot ceiling is deliberately inefficient:
// it needs a 2nd RAM slot + more CPUs + more cooling (EU + heat + part-slots),
// which is the tax that nudges players toward "build another mainframe" (or move
// up a tier) instead of megasizing one. Each tier has a STANDARD CPU (efficient,
// cool, the intended pick) and a LESS-EFFICIENT CPU (more output but lower
// efficiency → hotter, more EU/CWU) so nobody's locked to one chip; and every
// lower-tier CPU stays registered, so old hardware keeps working (just weaker).
//
// How the sim converts hardware -> CWU (MainframeMachine / CPURegistry / CoolingPartMachine):
//   CWU/CPU   = maxPower × (efficiency − efficiencyDropoff·load²)   (load 1 at full)
//             = maxPower × (efficiency − 0.2)  at full power
//   EU/CPU    = maxPower at full load; idle draw = minPower
//   heat/CPU  = (maxPower − CWU) × heatRatio(0.04)          → cooling demand (int-truncated per CPU)
//   provided  = min( ΣCWU × (1 − sag) , Σ RAM throughput )  ← RAM throughput is the per-frame ceiling
//   sag       = 0 below 90 °C, ramps to −50% by 100 °C, total loss by ~104 °C
//   passive   = passiveCoolingBase(0.05)·(fanTier+1)·(T−ambient)/mass
//               (fan cover LV..EV = tier 1..4 → cools 2..5× a bare hatch)
//   liquid    = coolant mB/t · heatCapacity · activeCoolingScale(0.1) / mass  (FLAT, temp-independent; nitrogen
//               ×10 heatCap → 100/t per cooler. Through EV, heat is a soft nudge (passive suffices); at IV the
//               CPUs run hot enough that a Liquid Cooler is effectively REQUIRED, not optional.)
//   equilibrium ΔT above ambient ≈ (Σ heat) / (Σ passiveCoeff)   [thermalMass cancels]
//
// Reference "comfortable" build per tier (1 RAM slot + a couple covered coolers):
//   MV  4× Good IC      → 76 CWU (RAM-cap 96), ~256 EU/t, cool          → provides a 64-CWU node flat out
//   HV  2× Nanoprocessor→ 66 CWU (RAM-cap 128), ~192 EU/t, cool         → 4× = 132 (capped 128) is the ceiling
//   EV  2× Quantum Proc → 128 CWU (RAM-cap 192), ~320 EU/t, warm        → 3× = 192 hits the ceiling (passive OK)
//   IV  3× Crystal Proc → 336 CWU (RAM-cap 512), ~3072 EU/t, heat ~108  → +1 Liquid Cooler (nitrogen) holds it
//                                                                          near ambient; passive-only would need ~7 fans

// ---- CPUs: efficiency 0..1 (lower = hotter, more EU/CWU), maxPower EU/t full, minPower idle EU/t ----
// MV ──────────────────────────────────────────────────────────────────────────
WFCompute
    .cpu('gtceu:basic_integrated_circuit').efficiency(0.65).maxPower(24).minPower(4).register()     // MV entry     ~10 CWU @ 24 EU/t  (cool, cheap)
    .cpu('gtceu:good_integrated_circuit').efficiency(0.5).maxPower(64).minPower(12).register()      // MV standard  ~19 CWU @ 64 EU/t  (runs warm)

// HV ──────────────────────────────────────────────────────────────────────────
WFCompute
    .cpu('gtceu:nano_processor').efficiency(0.55).maxPower(96).minPower(16).register()              // HV standard  ~33 CWU @ 96 EU/t  (cool, efficient)
    .cpu('gtceu:advanced_integrated_circuit').efficiency(0.45).maxPower(160).minPower(24).register() // HV brute     ~40 CWU @ 160 EU/t (hot, less efficient)

// EV ──────────────────────────────────────────────────────────────────────────
WFCompute
    .cpu('gtceu:quantum_processor').efficiency(0.6).maxPower(160).minPower(24).register()           // EV standard  ~64 CWU @ 160 EU/t (efficient)
    .cpu('gtceu:nano_processor_assembly').efficiency(0.5).maxPower(220).minPower(32).register()     // EV brute     ~66 CWU @ 220 EU/t (hotter, less efficient)

// IV ── runs HOT on purpose: passive heatsinks alone are impractical here, a Liquid Cooler is the intended fix.
//       Low efficiency + high maxPower means a comfortable frame packs several thirsty CPUs → big heat demand.
//       A 3× Crystal frame demands ~108 heat: holding it <90 °C passively needs ~7 EV-fan heatsinks (most of the
//       frame), whereas ONE Liquid Cooler on cold coolant (nitrogen removes 100/t, flat) holds it near ambient.
WFCompute
    .cpu('gtceu:crystal_processor').efficiency(0.31).maxPower(1024).minPower(128).register()          // IV standard  ~112 CWU @ 1024 EU/t, heat 36/CPU (needs liquid)
    .cpu('gtceu:quantum_processor_assembly').efficiency(0.29).maxPower(1280).minPower(160).register() // IV brute     ~115 CWU @ 1280 EU/t, heat 46/CPU (needs liquid)

// ---- RAM: CWU/t throughput cap a stick contributes (4 per RAM slot). A full slot = the tier ceiling. ----
WFCompute
    .ram('kubejs:mv_ram', 24)                 // MV: full slot 4×24 = 96
    .ram('kubejs:hv_ram', 32)                 // HV: full slot 4×32 = 128
    .ram('kubejs:ev_ram', 48)                 // EV: full slot 4×48 = 192
    .ram('kubejs:iv_ram', 128)                // IV: full slot 4×128 = 512
    .removeRam('gtceu:ram_wafer')             // drop the 256-throughput built-in (raw wafers no longer slot as RAM)

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
