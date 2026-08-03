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

// Aircraft
// SBW energyCostRate: ah_6=256, ju_87=192, mi_28=320, a_10a=512 FE/t
// ashvehicle: mh_60m=256, ac130u=512, c130=512, b-2=512 FE/t
// Target ~10 min (12,000 ticks) at HOG (20 FE/mB): maxFuel = 12000 * cost / 20
WFVehicles.override('superbwarfare:ah_6').maxFuel(150000)
    .fuel('gtceu:diesel', 1.0).fuel('gtceu:bio_diesel', 1.0)
    .fuel('gtceu:light_fuel', 0.8).fuel('gtceu:gasoline', 1.5).fuel('gtceu:high_octane_gasoline', 2.0)
    .storage(5, columnsFor(5)).register()
WFVehicles.override('superbwarfare:mi_28').maxFuel(200000)
    .fuel('gtceu:diesel', 1.0).fuel('gtceu:bio_diesel', 1.0)
    .fuel('gtceu:light_fuel', 0.8).fuel('gtceu:gasoline', 1.5).fuel('gtceu:high_octane_gasoline', 2.0)
    .storage(6, columnsFor(6)).register()
WFVehicles.override('superbwarfare:ju_87').maxFuel(120000)
    .fuel('gtceu:diesel', 1.0).fuel('gtceu:bio_diesel', 1.0)
    .fuel('gtceu:light_fuel', 0.8).fuel('gtceu:gasoline', 1.5).fuel('gtceu:high_octane_gasoline', 2.0)
    .storage(5, columnsFor(5)).register()
WFVehicles.override('superbwarfare:a_10a').maxFuel(300000)
    .fuel('gtceu:diesel', 1.0).fuel('gtceu:bio_diesel', 1.0)
    .fuel('gtceu:light_fuel', 0.8).fuel('gtceu:gasoline', 1.5).fuel('gtceu:high_octane_gasoline', 2.0)
    .storage(8, columnsFor(8)).register()
WFVehicles.override('ashvehicle:ac130u').maxFuel(300000)
    .fuel('gtceu:jet_fuel', 2.0)
    .storage(8, columnsFor(8)).register()
WFVehicles.override('ashvehicle:c130').maxFuel(350000)
    .fuel('gtceu:jet_fuel', 2.0)
    .storage(60, columnsFor(60)).register()
WFVehicles.override('ashvehicle:b-2').maxFuel(500000)
    .fuel('gtceu:jet_fuel', 2.0)
    .storage(8, columnsFor(8)).register()

// Heavy rotary (ashvehicle) — was toml-only, now explicit; cost=256, target 10 min
WFVehicles.override('ashvehicle:mh_60m').maxFuel(150000)
    .fuel('gtceu:diesel', 1.0).fuel('gtceu:bio_diesel', 1.0)
    .fuel('gtceu:light_fuel', 0.8).fuel('gtceu:gasoline', 1.5).fuel('gtceu:high_octane_gasoline', 2.0)
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
