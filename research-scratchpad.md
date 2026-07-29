
  ---
  # ══ CATEGORIES ══════════════════════════════════════════════════════
  # ballistics  — icon: superbwarfare:large_shell_he
  # infantry    — icon: gun tacz:scar_l
  # armor       — icon: mcsp:t90a_tricolor_spawn_item        (display name: "Ground Vehicles")
  # air         — icon: kubejs:plane_icon       (display name: "Aviation")
  # defense     — icon: superbwarfare:barbed_wire
  # vehicles    — icon: kubejs:hv_vehicle_frame (display name: "Vehicle Components")

  # ══ BALLISTICS ═══════════════════════════════════════════════════════
  # IMPLEMENTED in server_scripts/wfcore/WFResearch.js (nodes) +
  # server_scripts/guns/ammo.js (recipes + gating). This section is now the
  # as-built spec, not a wishlist.
  #
  # Tree layout (y grows downward):
  #        infantry_munitions_1 (0,0)  LV
  #        infantry_munitions_2 (0,1)  LV ──── infantry_munitions_3 (2,1)  MV (cheap compute)
  #        large_casings        (0,2)  MV  <- first full-compute node
  #     ┌──────────┬───────────┼───────────┬──────────┐
  #  armor_pierc  high_expl   (gate)    grapeshot   anti_air
  #   (-3,3)       (-1,3)                 (1,3)       (3,3)
  #
  # COMPUTE: MV midpoint = 64 CWU/t. The four shell branches + large_casings run
  #   360t/run => cwuPerRun 64*360 = 23040, eut 128. infantry_munitions_3 is a
  #   deliberately CHEAP MV node: 24 CWU/t over 300t => cwuPerRun 7200, eut 90.
  #   (LV nodes stay cwuPerRun 0.)
  #
  # NOTE: ammo_press item-input slots widened 4 -> 6 (custom_machines.js) so the
  #   heavy/sniper ammo recipe (casing + steel + copper + gunpowder + circuit)
  #   fits. Startup change -> needs a full restart, not just /reload.
  #   ALL cased shells (small_shell_* and large_shell_*) were made more expensive.

  ## Node: infantry_munitions_1
  category: ballistics
  pos: 0, 0
  name: Infantry Munitions 1
  tier: LV
  runs: 15 x 300t   (eut 32, cwuPerRun 0)
  items:
    gtceu:steel_plate x10
    gtceu:bronze_plate x10
    minecraft:gunpowder x10
  unlocks:
    kubejs:bullet_casing_small
    kubejs:bullet_casing_medium
  icon: kubejs:bullet_casing_medium
  gates (ammo.js): bullet_casing_small, bullet_casing_medium (cutter)

  ---

  ## Node: infantry_munitions_2
  category: ballistics
  pos: 0, 1
  tier: LV
  runs: 10 x 300t   (eut 32, cwuPerRun 0)
  requires: infantry_munitions_1
  name: Infantry Munitions 2
  unlocks:
    ammo tacz:792x57
    ammo tacz:762x54
    ammo ww:65a
    ammo ww:303
    ammo ww:77a
    ammo ww:763
    ammo ww:765
    ammo ww:8mm
    ammo ww:30c
    ammo tacz:9mm
    ammo tacz:12g
    superbwarfare:rifle_ammo        <- added
  icon: ammo tacz:792x57
  gates (ammo.js): superbwarfare:rifle_ammo (ammo_rifle batch, circuit 21)

  ---

  ## Node: infantry_munitions_3   (NEW — heavy small-arms, cheap MV)
  category: ballistics
  pos: 2, 1
  tier: MV (cheap compute)
  runs: 20 x 300t   (eut 90, cwuPerRun 7200 = 24 CWU/t)
  requires: infantry_munitions_2
  name: Infantry Munitions 3
  items:                              # "steel + copper + a lot of gunpowder"
    gtceu:steel_plate x8
    gtceu:copper_plate x6
    minecraft:gunpowder x16
  unlocks:
    superbwarfare:heavy_ammo
    superbwarfare:sniper_ammo
    kubejs:bullet_casing_large        # Heavy Rifle Casing (moved here from large_casings)
  icon: superbwarfare:heavy_ammo
  gates (ammo.js): bullet_casing_large (cutter), heavy_ammo + sniper_ammo (ammo_heavy
                   batch). Heavy/sniper ammo recipe = heavy casing + steel_nugget x2
                   + copper_nugget x2 + gunpowder x3 (4 inputs -> needs widened press).
                   .338 sniper rides along (also needs the IM3-gated casing).

  ---

  ## Node: large_casings   (MV gate)
  category: ballistics
  pos: 0, 2
  tier: MV
  runs: 25 x 360t   (eut 128, cwuPerRun 23040 = 64 CWU/t)
  requires: infantry_munitions_2
  name: Large Casings
  items:
    gtceu:steel_plate x10
    superbwarfare:primer x8
    minecraft:gunpowder x10
  unlocks:
    kubejs:steel_bullet_casing
    kubejs:bullet_casing_xl
  icon: kubejs:steel_bullet_casing
  gates (ammo.js): steel_bullet_casing (cutter, steel_plate x3 -> x5),
                   bullet_casing_xl (cutter). (Heavy Rifle Casing moved to IM3.)

  ---

  ## Node: armor_piercing_1
  category: ballistics
  pos: -3, 3
  tier: MV
  runs: 25 x 360t   (eut 128, cwuPerRun 23040)
  requires: large_casings
  name: Armor Piercing Shells
  items:
    kubejs:steel_bullet_casing x2
    superbwarfare:primer x4
    gtceu:vanadium_steel_bolt x16
  unlocks: superbwarfare:small_shell_ap
  icon: superbwarfare:small_shell_ap
  gates (ammo.js): small_shell_ap (ammo_press: steel_casing x2 + vanadium_steel_bolt x2 + small_gunpowder_dust x4)

  ---

  ## Node: high_explosive_1
  category: ballistics
  pos: -1, 3
  tier: MV
  runs: 25 x 360t   (eut 128, cwuPerRun 23040)
  requires: large_casings
  name: High Explosive Shells
  items:
    gtceu:steel_plate x10
    superbwarfare:primer x8
    superbwarfare:high_energy_explosives x2
  unlocks: superbwarfare:small_shell_he
  icon: superbwarfare:small_shell_he
  gates (ammo.js): small_shell_he (ammo_press: steel_casing x2 + high_energy_explosives x2 + small_gunpowder_dust x4)

  ---

  ## Node: grapeshot_1   (NEW — anti-infantry canister)
  category: ballistics
  pos: 1, 3
  tier: MV
  runs: 20 x 360t   (eut 128, cwuPerRun 23040)
  requires: large_casings
  name: Grapeshot Shells
  items:
    kubejs:steel_bullet_casing x2
    superbwarfare:primer x4
    gtceu:lead_plate x8
  unlocks: superbwarfare:small_shell_gs
  icon: superbwarfare:small_shell_gs
  gates (ammo.js): small_shell_gs (ammo_press: steel_casing x2 + lead_nugget x12 + small_gunpowder_dust x4)

  ---

  ## Node: anti_air_1   (NEW — proximity-fuzed frag)
  category: ballistics
  pos: 3, 3
  tier: MV
  runs: 25 x 360t   (eut 128, cwuPerRun 23040)
  requires: large_casings
  name: Anti-Air Shells
  items:
    kubejs:steel_bullet_casing x2
    superbwarfare:primer x6
    superbwarfare:high_energy_explosives x2
    gtceu:basic_electronic_circuit x2
  unlocks: superbwarfare:small_shell_aa
  icon: superbwarfare:small_shell_aa
  gates (ammo.js): small_shell_aa (ammo_press: steel_casing x2 + high_energy_explosives x2 + magnesium_dust x2)

  # ── SUPPORTING COMPONENT RECIPES (ammo.js, UNGATED) ──────────────────
  # SBW's vanilla crafting recipes are stripped by cleanup/remove_crafting.js,
  # so these are the only source. Left ungated because they are the *inputs*
  # to the research above (can't gate an input behind its own research):
  #   superbwarfare:primer                 <- assembler: copper_plate + small_gunpowder_dust  -> x4
  #   superbwarfare:high_energy_explosives <- assembler: gunpowder x4 + sugar + #forge:sand   -> x4
  #   superbwarfare:grain                  <- assembler: copper_plate x2 + gunpowder x2 + primer -> x8
  #     (grain was previously uncraftable -> large artillery shells now obtainable again)

  # ══ INFANTRY ═════════════════════════════════════════════════════════

  ## Node: infantry_combat_1
  category: infantry
  pos: 0, 0
  tier: LV
  runs: 5 x 300t
  name: Infantry Combat 1
  unlocks:
    gun tacz:kar98
    gun ww:type38
    gun ww:m91
  icon: gun tacz:kar98

  ---

  ## Node: short_barreled_1
  category: infantry
  pos: -1, 1
  tier: LV               # eut=24 (non-standard, below LV 32)
  runs: 15 x 220t
  requires: infantry_combat_1
  name: Short Barreled I
  items:
    gtceu:steel_plate x2
    ammo tacz:9mm x2
    minecraft:gunpowder x10
  unlocks:
    gun ww:p08
    gun ww:p38
  icon: gun ww:p08

  ---

  ## Node: pump_action_1
  category: infantry
  pos: 0, 1
  tier: LV               # eut=24
  runs: 10 x 180t
  requires: infantry_combat_1
  name: Pump Action I
  items:
    gtceu:steel_plate x8
    gtceu:basic_integrated_circuit x2
    ammo tacz:12g x6
    minecraft:gunpowder x15
  unlocks:
    gun ww:m1897
  icon: gun ww:m1897

  ---

  ## Node: automatic_weapons_1
  category: infantry
  pos: 1, 1
  tier: LV
  runs: 30 x 300t
  requires: infantry_combat_1
  name: Automatic Weapons I
  items:
    gtceu:small_steel_spring x9
    gtceu:basic_integrated_circuit x2
    ammo tacz:9mm x2
    minecraft:gunpowder x15
  unlocks:
    gun ww:m712
    gun ww:sten
  icon: gun ww:m712

  ---

  ## Node: infantry_combat_1_placeholder
  category: infantry
  pos: 0, 2
  tier: LV
  runs: 1 x 1t
  anyOf: short_barreled_1, pump_action_1, automatic_weapons_1   # unlocked when ANY ONE parent done
  name: ???
  icon: minecraft:nether_star

  # ══ GROUND VEHICLES (armor) ══════════════════════════════════════════

  ## Node: mobile_transport
  category: armor
  pos: 0, 0
  tier: LV
  runs: 5 x 300t
  name: Mobile Combustion and Transport
  items:
    gtceu:steel_gearbox x2
    gtceu:steel_minecart_wheels x6
    gtceu:lv_electric_piston x3
  unlocks:
    kubejs:lv_engine
    superbwarfare:wheel
  icon: kubejs:lv_engine

  ---

  ## Node: ground_logistics
  category: armor
  pos: 0, 1
  tier: LV
  runs: 8 x 300t
  requires: mobile_combustion     # BUG: parent id is mobile_transport, not mobile_combustion → link is broken
  name: Ground Logistics
  unlocks:
    vehicle superbwarfare:truck
    vehicle superbwarfare:sodayo_pick_up
  icon: superbwarfare:wheel

  # ══ VEHICLE COMPONENTS (vehicles) ════════════════════════════════════
  # Generated loop — 5 nodes in a horizontal chain

  ## Node: veh_lv
  category: vehicles
  pos: 0, 0
  tier: LV               # eut not set (default); cwuPerRun(64) — NOTE: LV stage, but compute set. Possible intent to make this
  an MV+ gate?
  runs: 8 x ?t           # ticksPerRun not set → framework default
  items:
    gtceu:basic_electronic_circuit x1
  name: LV Vehicle Components
  unlocks: kubejs:lv_{air_frame,cannon_barrel,cockpit,engine,rotor,track,vehicle_frame,weapons_system,wing}
  gates: veh_lv

  ---

  ## Node: veh_mv
  category: vehicles
  pos: 1, 0
  tier: MV               # implied by NODES list
  runs: 12 x ?t
  requires: veh_lv
  items:
    gtceu:basic_electronic_circuit x1
  name: MV Vehicle Components
  unlocks: kubejs:mv_{…same 9 parts…}
  gates: veh_mv

  ---

  ## Node: veh_hv  (runs: 16 x ?t, requires: veh_mv)
  ## Node: veh_ev  (runs: 24 x ?t, requires: veh_hv)
  ## Node: veh_iv  (runs: 32 x ?t, requires: veh_ev)
  # … same structure, eut/cwu not set in source

  # ══ LEGACY IDs (ungated, registered nowhere) ═════════════════════════
  # gatingRecipes (still referenced by gun recipe scripts → currently open):
  #   guns1, guns2, guns2heavy, guns4heavy
  # orphaned (nothing references them):
  #   guns3-6, planes1-3, helo1-2, armor0-4, defenses1-2, turrets1-3

  # ══ CATEGORIES WITH NO NODES YET ═════════════════════════════════════
  # air     — empty
  # defense — empty 
