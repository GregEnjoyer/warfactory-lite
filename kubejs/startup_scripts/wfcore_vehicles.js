// priority: 100
// WFCore vehicle fuel/storage overrides.
// Each vehicle is explicit — fuels are set per-entry, not via a shared helper.
//
//   WFVehicles.override(id).maxFuel(mb).fuel(fluidId, ratio).storage(size[, columns]).register()
//   WFVehicles.foliageBreaker(id)

const columnsFor = slots => Math.min(slots, 10)

const emplacement = (id, slots) => {
    WFVehicles.override(id).storage(slots, columnsFor(slots)).register()
}

// Sodayo TenEven9 pickup — 9-slot 3×3 (3 columns)
WFVehicles.override('superbwarfare:sodayo_pick_up').maxFuel(16000)
    .fuel('gtceu:diesel', 1.0).fuel('gtceu:bio_diesel', 1.0)
    .fuel('gtceu:light_fuel', 0.8).fuel('gtceu:gasoline', 1.5).fuel('gtceu:high_octane_gasoline', 2.0)
    .storage(9, 3).register()
WFVehicles.override('superbwarfare:sodayo_pick_up_hmg').maxFuel(16000)
    .fuel('gtceu:diesel', 1.0).fuel('gtceu:bio_diesel', 1.0)
    .fuel('gtceu:light_fuel', 0.8).fuel('gtceu:gasoline', 1.5).fuel('gtceu:high_octane_gasoline', 2.0)
    .storage(9, 3).register()
WFVehicles.override('superbwarfare:sodayo_pick_up_rocket').maxFuel(16000)
    .fuel('gtceu:diesel', 1.0).fuel('gtceu:bio_diesel', 1.0)
    .fuel('gtceu:light_fuel', 0.8).fuel('gtceu:gasoline', 1.5).fuel('gtceu:high_octane_gasoline', 2.0)
    .storage(9, 3).register()
WFVehicles.override('superbwarfare:sodayo_pick_up_tow').maxFuel(16000)
    .fuel('gtceu:diesel', 1.0).fuel('gtceu:bio_diesel', 1.0)
    .fuel('gtceu:light_fuel', 0.8).fuel('gtceu:gasoline', 1.5).fuel('gtceu:high_octane_gasoline', 2.0)
    .storage(9, 3).register()

// Armoured ground vehicles
WFVehicles.override('superbwarfare:lav_150').maxFuel(25000)
    .fuel('gtceu:diesel', 1.0).fuel('gtceu:bio_diesel', 1.0)
    .fuel('gtceu:light_fuel', 0.8).fuel('gtceu:gasoline', 1.5).fuel('gtceu:high_octane_gasoline', 2.0)
    .storage(9, columnsFor(9)).register()
WFVehicles.override('superbwarfare:bradley').maxFuel(25000)
    .fuel('gtceu:diesel', 1.0).fuel('gtceu:bio_diesel', 1.0)
    .fuel('gtceu:gasoline', 1.5).fuel('gtceu:high_octane_gasoline', 2.0)
    .storage(9, columnsFor(9)).register()
WFVehicles.override('superbwarfare:lav_ad').maxFuel(25000)
    .fuel('gtceu:diesel', 1.0).fuel('gtceu:bio_diesel', 1.0)
    .fuel('gtceu:gasoline', 1.5).fuel('gtceu:high_octane_gasoline', 2.0)
    .storage(9, columnsFor(9)).register()
WFVehicles.override('superbwarfare:ztz_99a').maxFuel(25000)
    .fuel('gtceu:gasoline', 1.0).fuel('gtceu:high_octane_gasoline', 2.0)
    .storage(8, columnsFor(8)).register()

// Aircraft — flight-time model (live wfcore-1.2.0 jar):
//   flightTicks = maxFuel * energyToFluidRatio(=10, wfcore.toml) * fuelRatio / energyCostRate
// SBW energyCostRate: ah_6=256, ju_87=192, mi_28=320, a_10a=512 FE/t
// ashvehicle: mh_60m=256, ac130u=512, c130=512, b-2=512 FE/t
// Target ~45 min (54,000 ticks) at the richest fuel (HOG / jet ratio 9.0 = 90 FE/mB). Fuel ratios were
// scaled x4.5 from the old ~10-min tuning; tank sizes (maxFuel) are UNCHANGED so the fluid poured to refuel
// stays the same — the ratio is the lever, per the "modify ratios" brief. Cheaper fuels scale down
// proportionally (diesel 4.5 ~= 22 min, light 3.6 ~= 18 min). Helicopters (ah_6/mi_28) now match the
// planes' ~44-47 min at richest fuel.
// NB: AshVehicle is NOT in the static pack mods/ — the pack's custom fork (ashvehicle-*-div.jar) is
// delivered adhoc at runtime by the Pack-Launcher/ModDirector bootstrap, so these ashvehicle:* ids ARE
// live in-game. Tuned to the same ~45 min as the SBW aircraft.
WFVehicles.override('superbwarfare:ah_6').maxFuel(150000)
    .fuel('gtceu:diesel', 4.5).fuel('gtceu:bio_diesel', 4.5)
    .fuel('gtceu:light_fuel', 3.6).fuel('gtceu:gasoline', 6.75).fuel('gtceu:high_octane_gasoline', 9.0)
    .storage(5, columnsFor(5)).register()
WFVehicles.override('superbwarfare:mi_28').maxFuel(200000)
    .fuel('gtceu:diesel', 4.5).fuel('gtceu:bio_diesel', 4.5)
    .fuel('gtceu:light_fuel', 3.6).fuel('gtceu:gasoline', 6.75).fuel('gtceu:high_octane_gasoline', 9.0)
    .storage(6, columnsFor(6)).register()
WFVehicles.override('superbwarfare:ju_87').maxFuel(120000)
    .fuel('gtceu:diesel', 4.5).fuel('gtceu:bio_diesel', 4.5)
    .fuel('gtceu:light_fuel', 3.6).fuel('gtceu:gasoline', 6.75).fuel('gtceu:high_octane_gasoline', 9.0)
    .storage(5, columnsFor(5)).register()
WFVehicles.override('superbwarfare:a_10a').maxFuel(300000)
    .fuel('gtceu:diesel', 4.5).fuel('gtceu:bio_diesel', 4.5)
    .fuel('gtceu:light_fuel', 3.6).fuel('gtceu:gasoline', 6.75).fuel('gtceu:high_octane_gasoline', 9.0)
    .storage(8, columnsFor(8)).register()
WFVehicles.override('ashvehicle:ac130u').maxFuel(300000)
    .fuel('gtceu:jet_fuel', 9.0)
    .storage(8, columnsFor(8)).register()
WFVehicles.override('ashvehicle:c130').maxFuel(300000)
    .fuel('gtceu:jet_fuel', 9.0)
    .storage(60, columnsFor(60)).register()
WFVehicles.override('ashvehicle:b-2').maxFuel(300000)
    .fuel('gtceu:jet_fuel', 9.0)
    .storage(8, columnsFor(8)).register()

// Heavy rotary (ashvehicle, adhoc fork) — cost=256, same ~45 min target
WFVehicles.override('ashvehicle:mh_60m').maxFuel(150000)
    .fuel('gtceu:diesel', 4.5).fuel('gtceu:bio_diesel', 4.5)
    .fuel('gtceu:light_fuel', 3.6).fuel('gtceu:gasoline', 6.75).fuel('gtceu:high_octane_gasoline', 9.0)
    .storage(5, columnsFor(5)).register()

// Logistics trucks
WFVehicles.override('superbwarfare:truck').maxFuel(30000)
    .fuel('gtceu:diesel', 1.0).fuel('gtceu:bio_diesel', 1.0)
    .fuel('gtceu:light_fuel', 0.8).fuel('gtceu:gasoline', 1.5).fuel('gtceu:high_octane_gasoline', 2.0)
    .storage(60, columnsFor(60)).register()
WFVehicles.override('mcsp:ural_green').maxFuel(30000)
    .fuel('gtceu:diesel', 1.0).fuel('gtceu:bio_diesel', 1.0)
    .fuel('gtceu:light_fuel', 0.8).fuel('gtceu:gasoline', 1.5).fuel('gtceu:high_octane_gasoline', 2.0)
    .storage(40, columnsFor(40)).register()

// Humvees (MV) — no sbw data file; assume cost≈32 like sodayo; target ~10 min at HOG
WFVehicles.override('mcsp:humvee_sand').maxFuel(20000)
    .fuel('gtceu:diesel', 1.0).fuel('gtceu:bio_diesel', 1.0)
    .fuel('gtceu:light_fuel', 0.8).fuel('gtceu:gasoline', 1.5).fuel('gtceu:high_octane_gasoline', 2.0)
    .storage(6, columnsFor(6)).register()
WFVehicles.override('mcsp:humvee_mk19').maxFuel(20000)
    .fuel('gtceu:diesel', 1.0).fuel('gtceu:bio_diesel', 1.0)
    .fuel('gtceu:light_fuel', 0.8).fuel('gtceu:gasoline', 1.5).fuel('gtceu:high_octane_gasoline', 2.0)
    .storage(6, columnsFor(6)).register()

// EV tracked vehicles
// plz_05: cost=128 FE/t; target ~6.5 min at HOG → 40000 mB
WFVehicles.override('superbwarfare:plz_05').maxFuel(40000)
    .fuel('gtceu:diesel', 1.0).fuel('gtceu:bio_diesel', 1.0)
    .fuel('gtceu:light_fuel', 0.8).fuel('gtceu:gasoline', 1.5).fuel('gtceu:high_octane_gasoline', 2.0)
    .storage(6, columnsFor(6)).register()

// IV apex MBT — cost=96 FE/t; target ~8.7 min at HOG → 50000 mB; premium fuels only
WFVehicles.override('superbwarfare:prism_tank').maxFuel(50000)
    .fuel('gtceu:gasoline', 1.5).fuel('gtceu:high_octane_gasoline', 2.0)
    .storage(6, columnsFor(6)).register()

// ---- MCSP addon vehicles ----
// MCSP entities extend SBW's GeoVehicleEntity -> VehicleEntity, so the SuperbOverrides mixin already
// applies; these entries just give them the fluid-fuel + resizable storage the SBW vehicles have. One
// override per vehicle FAMILY — the camo/skin variants (…_sand, …_camo, …_green, …_pixel, _sep, busk_*)
// inherit MCSP's native behavior. Ground-vehicle tuning (peers of the SBW tanks/IFVs/trucks), NOT the
// 45-min aircraft scale. Humvee + Ural families are covered above.
// MBTs — premium fuels only, peers of superbwarfare:ztz_99a (maxFuel 25000, storage 8)
WFVehicles.override('mcsp:m1a2').maxFuel(25000)
    .fuel('gtceu:gasoline', 1.5).fuel('gtceu:high_octane_gasoline', 2.0)
    .storage(8, columnsFor(8)).register()
WFVehicles.override('mcsp:t80bv_green').maxFuel(25000)
    .fuel('gtceu:gasoline', 1.5).fuel('gtceu:high_octane_gasoline', 2.0)
    .storage(8, columnsFor(8)).register()
WFVehicles.override('mcsp:t80u_green').maxFuel(25000)
    .fuel('gtceu:gasoline', 1.5).fuel('gtceu:high_octane_gasoline', 2.0)
    .storage(8, columnsFor(8)).register()
WFVehicles.override('mcsp:t90a_green').maxFuel(25000)
    .fuel('gtceu:gasoline', 1.5).fuel('gtceu:high_octane_gasoline', 2.0)
    .storage(8, columnsFor(8)).register()
WFVehicles.override('mcsp:ztz99a_sand').maxFuel(25000)
    .fuel('gtceu:gasoline', 1.5).fuel('gtceu:high_octane_gasoline', 2.0)
    .storage(8, columnsFor(8)).register()
// IFVs / APCs / light armour — full diesel ladder, peers of superbwarfare:bradley (maxFuel 25000)
WFVehicles.override('mcsp:bmd_4').maxFuel(25000)
    .fuel('gtceu:diesel', 1.0).fuel('gtceu:bio_diesel', 1.0)
    .fuel('gtceu:gasoline', 1.5).fuel('gtceu:high_octane_gasoline', 2.0)
    .storage(9, columnsFor(9)).register()
WFVehicles.override('mcsp:m3a3_bradley').maxFuel(25000)
    .fuel('gtceu:diesel', 1.0).fuel('gtceu:bio_diesel', 1.0)
    .fuel('gtceu:gasoline', 1.5).fuel('gtceu:high_octane_gasoline', 2.0)
    .storage(9, columnsFor(9)).register()
WFVehicles.override('mcsp:zbd04a_green').maxFuel(25000)
    .fuel('gtceu:diesel', 1.0).fuel('gtceu:bio_diesel', 1.0)
    .fuel('gtceu:gasoline', 1.5).fuel('gtceu:high_octane_gasoline', 2.0)
    .storage(9, columnsFor(9)).register()
WFVehicles.override('mcsp:sprut').maxFuel(25000)
    .fuel('gtceu:diesel', 1.0).fuel('gtceu:bio_diesel', 1.0)
    .fuel('gtceu:gasoline', 1.5).fuel('gtceu:high_octane_gasoline', 2.0)
    .storage(8, columnsFor(8)).register()
// Wheeled MRAP truck — full ladder + cargo, peer of the logistics trucks (maxFuel 30000)
WFVehicles.override('mcsp:typhoon_30').maxFuel(30000)
    .fuel('gtceu:diesel', 1.0).fuel('gtceu:bio_diesel', 1.0)
    .fuel('gtceu:light_fuel', 0.8).fuel('gtceu:gasoline', 1.5).fuel('gtceu:high_octane_gasoline', 2.0)
    .storage(40, columnsFor(40)).register()

// Emplacements — storage only, no fuel
emplacement('superbwarfare:hpj_11',  20)
emplacement('superbwarfare:mk_42',    3)
emplacement('superbwarfare:mle_1934', 4)
emplacement('superbwarfare:bl_132',   5)

// IFVs and tanks plough through cacti / logs / leaves
WFVehicles.foliageBreaker('superbwarfare:lav_150')
WFVehicles.foliageBreaker('superbwarfare:bradley')
WFVehicles.foliageBreaker('superbwarfare:lav_ad')
WFVehicles.foliageBreaker('superbwarfare:ztz_99a')
WFVehicles.foliageBreaker('superbwarfare:plz_05')
WFVehicles.foliageBreaker('superbwarfare:prism_tank')
// MCSP tracked armour (one per family; wheeled Typhoon/Humvee left as-is like the SBW truck)
WFVehicles.foliageBreaker('mcsp:m1a2')
WFVehicles.foliageBreaker('mcsp:t80bv_green')
WFVehicles.foliageBreaker('mcsp:t80u_green')
WFVehicles.foliageBreaker('mcsp:t90a_green')
WFVehicles.foliageBreaker('mcsp:ztz99a_sand')
WFVehicles.foliageBreaker('mcsp:bmd_4')
WFVehicles.foliageBreaker('mcsp:m3a3_bradley')
WFVehicles.foliageBreaker('mcsp:zbd04a_green')
WFVehicles.foliageBreaker('mcsp:sprut')
