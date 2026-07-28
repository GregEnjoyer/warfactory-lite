// priority: 0
//
// WFCore radar target whitelist — startup script (dev runtime copy of tools/radar/kubejs/wfcore_radar.js).
//
// GOAL: the radar should light up on every base built around HV-tier tech and above.
//
// HOW IT WORKS
//   whitelistMachinesAtLeast('hv') whitelists every GregTech machine whose *controller carries a voltage
//   tier* >= HV. That already covers ~710 blocks: all HV+ single machines AND every tier-stamped multiblock
//   (fluid drilling rigs, large miners, fusion reactors, the tiered chemical/alloy reactors, ...).
//
//   What it CANNOT see are multiblock controllers that leave their tier at 0 (the classic "EBF-style"
//   multiblocks: vacuum freezer, distillation tower, GCyM larges, ...). Those are radar-invisible unless
//   named explicitly. Everything below is that missing set, restricted to HV-and-above and tiered by the
//   quest book chapter each one is unlocked in.
//
//   Richness ladder (higher == rarer/more advanced == a base ranks up harder):
//     HV = 10   EV = 15   IV = 20   LuV = 30   ZPM = 40   UV/mega = 50
//
//   NOTE: gtceu:electric_blast_furnace (10) and gtceu:large_chemical_reactor (25) are already set in
//   config/wfcore-radar.toml, so they are intentionally NOT repeated here (config keeps its own tuning).
WFRadar
    // Base rule: every tier-stamped GregTech machine of HV or above (richness 1).
    .whitelistMachinesAtLeast('hv')
    // minecraft:furnace comes in from the config whitelist as noise — drop it.
    .removeFromWhitelist('minecraft:furnace')

    // ---- HV tier-0 multiblocks -------------------------------------------------
    .whitelist('gtceu:vacuum_freezer', 10)
    .whitelist('gtceu:implosion_compressor', 10)
    .whitelist('gtceu:cleanroom', 10)
    .whitelist('gtceu:steel_large_boiler', 10)
    .whitelist('gtceu:central_monitor', 10)

    // ---- EV tier-0 multiblocks -------------------------------------------------
    .whitelist('gtceu:distillation_tower', 15)
    .whitelist('gtceu:cracker', 15)
    .whitelist('gtceu:gas_large_turbine', 15)
    .whitelist('gtceu:steam_large_turbine', 15)
    .whitelist('gtceu:large_combustion_engine', 15)
    .whitelist('gtceu:titanium_large_boiler', 15)
    .whitelist('gtceu:alloy_blast_smelter', 15)
    .whitelist('gtceu:power_substation', 15)

    // Gregicality Multiblocks (GCyM) — the whole EV-gated "large_*" processing family.
    .whitelist('gtceu:large_arc_smelter', 15)
    .whitelist('gtceu:large_assembler', 15)
    .whitelist('gtceu:large_autoclave', 15)
    .whitelist('gtceu:large_brewer', 15)
    .whitelist('gtceu:large_centrifuge', 15)
    .whitelist('gtceu:large_chemical_bath', 15)
    .whitelist('gtceu:large_circuit_assembler', 15)
    .whitelist('gtceu:large_cutter', 15)
    .whitelist('gtceu:large_distillery', 15)
    .whitelist('gtceu:large_electrolyzer', 15)
    .whitelist('gtceu:large_electromagnet', 15)
    .whitelist('gtceu:large_engraving_laser', 15)
    .whitelist('gtceu:large_extractor', 15)
    .whitelist('gtceu:large_extruder', 15)
    .whitelist('gtceu:large_maceration_tower', 15)
    .whitelist('gtceu:large_material_press', 15)
    .whitelist('gtceu:large_mixer', 15)
    .whitelist('gtceu:large_packer', 15)
    .whitelist('gtceu:large_sifting_funnel', 15)
    .whitelist('gtceu:large_solidifier', 15)
    .whitelist('gtceu:large_wiremill', 15)

    // ---- IV tier-0 multiblocks -------------------------------------------------
    .whitelist('gtceu:assembly_line', 20)
    .whitelist('gtceu:extreme_combustion_engine', 20)
    .whitelist('gtceu:tungstensteel_large_boiler', 20)

    // ---- LuV tier-0 multiblocks ------------------------------------------------
    .whitelist('gtceu:plasma_large_turbine', 30)
    .whitelist('gtceu:data_bank', 30)
    .whitelist('gtceu:active_transformer', 30)

    // ---- ZPM tier-0 multiblocks ------------------------------------------------
    .whitelist('gtceu:research_station', 40)
    .whitelist('gtceu:high_performance_computation_array', 40)
    .whitelist('gtceu:network_switch', 40)

    // ---- UV / mega endgame multiblocks -----------------------------------------
    .whitelist('gtceu:mega_blast_furnace', 50)
    .whitelist('gtceu:mega_vacuum_freezer', 50)

    // ---- WFCore custom warfare / industry multiblocks (tier per quest book) ----
    // HV chapter:
    .whitelist('wfcore:drill_rig', 10)
    .whitelist('wfcore:missile_factory', 10)
    .whitelist('wfcore:missile_launcher', 10)
    .whitelist('wfcore:tank_assembly', 10)
    // EV chapter:
    .whitelist('wfcore:heavy_plane_assembler', 15)


// --- optional extras -------------------------------------------------------
// Retune the default DBSCAN clustering (still overridable per scan with /wfcore_radar scan <eps> <minPts>):
// WFRadar.eps(160).minPts(12)
