// SKELETON — crafting recipes for the MV computation / power / gas multiblocks
// and their part blocks. All MV unless noted. wfcore ships these without a
// survival recipe (like the Radar in radar.js), so the pack authors them here.
// Ingredient COUNTS are placeholders — TODO tune.
ServerEvents.recipes(event => {
    const g = event.recipes.gtceu
    const MV = 120, LV = 32, HV = 480, EV = 1920, IV = 7680

    // ---- Computation Mainframe (MV) + its four internal part blocks ----------

    g.assembler('wfcore:cpu_slot')
        .itemInputs('gtceu:mv_machine_casing', '8x gtceu:gold_plate',
            '10x gtceu:polyvinyl_chloride_ingot',
            '2x wfcore:copper_network_cable') // TODO
        .itemOutputs('wfcore:cpu_slot')
        .duration(200).EUt(MV)

    g.assembler('wfcore:ram_slot')
        .itemInputs('gtceu:mv_machine_casing', '8x gtceu:gold_plate',
            '10x gtceu:polyethylene_plate') 
        .itemOutputs('wfcore:ram_slot')
        .duration(200).EUt(MV)

    g.assembler('wfcore:copper_heatsink')
        .itemInputs('gtceu:mv_machine_casing', '8x gtceu:copper_plate',
            '4x gtceu:copper_rod') // TODO
        .itemOutputs('wfcore:copper_heatsink')
        .duration(200).EUt(MV)

    g.assembler('wfcore:cooling_liquid')
        .itemInputs('gtceu:mv_machine_casing', 'gtceu:mv_electric_pump',
            '2x gtceu:steel_normal_fluid_pipe', '#gtceu:circuits/mv') // TODO
        .itemOutputs('wfcore:cooling_liquid')
        .duration(200).EUt(MV)

    // ---- RAM modules (kubejs:<tier>_ram) — the RAM sticks for the Mainframe ---
    // 4 fit in a RAM slot; each contributes its tier throughput (wfcore_compute.js),
    // so a full RAM slot caps the mainframe at the tier ceiling: MV 96 / HV 128 /
    // EV 192 / IV 512. Built from RAM chips on a poly board, tier-gated by the
    // circuit + assembler voltage; raw gtceu:ram_wafer is de-registered as RAM so
    // these are the route. Higher tiers use more chips (throughput scales with it).

    g.assembler('kubejs:mv_ram')
        .itemInputs('2x gtceu:ram_chip', '#gtceu:circuits/mv', 'gtceu:polyethylene_plate')
        .itemOutputs('kubejs:mv_ram')
        .duration(200).EUt(MV)

    g.assembler('kubejs:hv_ram')
        .itemInputs('3x gtceu:ram_chip', '#gtceu:circuits/hv', 'gtceu:polyethylene_plate')
        .itemOutputs('kubejs:hv_ram')
        .duration(200).EUt(HV)

    g.assembler('kubejs:ev_ram')
        .itemInputs('4x gtceu:ram_chip', '#gtceu:circuits/ev', '2x gtceu:polyethylene_plate')
        .itemOutputs('kubejs:ev_ram')
        .duration(200).EUt(EV)

    g.assembler('kubejs:iv_ram')
        .itemInputs('6x gtceu:ram_chip', '#gtceu:circuits/iv', '2x gtceu:polyethylene_plate')
        .itemOutputs('kubejs:iv_ram')
        .duration(200).EUt(IV)

    // ---- Research Unit (MV) --------------------------------------------------
    g.assembler('wfcore:research_unit')
        .itemInputs('gtceu:lv_machine_casing', '6x #gtceu:circuits/mv',
            'gtceu:steel_frame', '2x wfcore:copper_network_cable', '4x gtceu:lv_robot_arm')
        .itemOutputs('wfcore:research_unit')
        .duration(600).EUt(LV)

    // ---- Data Printer (MV, singleblock) -------------------------------------
    g.assembler('wfcore:printer')
        .itemInputs('gtceu:mv_machine_casing', '2x #gtceu:circuits/lv',
            'gtceu:mv_electric_piston', '4x minecraft:paper') 
        .itemOutputs('wfcore:printer')
        .duration(300).EUt(LV)

    // ---- Large Transformer (MV) + AC converter hatches ----------------------
    g.assembler('wfcore:large_transformer')
        .itemInputs('gtceu:mv_machine_casing', '4x gtceu:mv_electric_pump',
            '8x wfcore:copper_network_cable', '2x #gtceu:circuits/mv') // TODO transformer part
        .itemOutputs('wfcore:large_transformer')
        .duration(200).EUt(MV)

    // AC hatches mirror the MV computation hatches (see computation_network.js)
    g.assembler('wfcore:ac_input_hatch')
        .itemInputs('4x gtceu:aluminium_plate', 'gtceu:mv_sensor',
            '#gtceu:circuits/mv', 'gtceu:mv_transformer_4a') // TODO
        .itemOutputs('wfcore:ac_input_hatch')
        .duration(200).EUt(MV)

    g.assembler('wfcore:ac_output_hatch')
        .itemInputs('4x gtceu:aluminium_plate', 'gtceu:mv_emitter',
            '#gtceu:circuits/mv', 'gtceu:mv_transformer_4a') // TODO
        .itemOutputs('wfcore:ac_output_hatch')
        .duration(200).EUt(MV)

    // ---- Large Gas Extractor (MV) -------------------------------------------
    g.assembler('wfcore:gas_extractor')
        .itemInputs('gtceu:mv_machine_casing', '4x gtceu:mv_electric_pump',
            '4x #gtceu:circuits/mv', '4x gtceu:steel_normal_fluid_pipe') // TODO
        .itemOutputs('wfcore:gas_extractor')
        .duration(200).EUt(MV)

    // ---- Cooling Fan Covers (LV / MV / HV / EV) — motor + fan blades ---------
    // Blades are PLATES, not rotors: pure aluminium has no rotor form, and exotic
    // rotor items resolve inconsistently on hot /reload. Plates are the most
    // robustly-generated form and all four are attested in existing scripts.

    g.assembler('wfcore:cooling_fan_cover_lv')
        .itemInputs('gtceu:lv_machine_casing', 'gtceu:lv_electric_motor', '4x gtceu:steel_plate') // TODO tune
        .itemOutputs('wfcore:cooling_fan_cover_lv')
        .duration(160).EUt(LV)

    g.assembler('wfcore:cooling_fan_cover_mv')
        .itemInputs('gtceu:mv_machine_casing', 'gtceu:mv_electric_motor', '4x gtceu:aluminium_plate') // TODO tune
        .itemOutputs('wfcore:cooling_fan_cover_mv')
        .duration(160).EUt(MV)

    g.assembler('wfcore:cooling_fan_cover_hv')
        .itemInputs('gtceu:hv_machine_casing', 'gtceu:hv_electric_motor', '4x gtceu:stainless_steel_plate') // TODO tune
        .itemOutputs('wfcore:cooling_fan_cover_hv')
        .duration(160).EUt(HV)

    g.assembler('wfcore:cooling_fan_cover_ev')
        .itemInputs('gtceu:ev_machine_casing', 'gtceu:ev_electric_motor', '4x gtceu:titanium_plate') // TODO tune
        .itemOutputs('wfcore:cooling_fan_cover_ev')
        .duration(160).EUt(EV)

    g.assembler('wfcore:mv_network_switch')
        .itemInputs('gtceu:mv_machine_casing', '8x #gtceu:circuits/mv', '4x gtceu:aluminium_frame', '4x wfcore:copper_network_cable')
        .itemOutputs('wfcore:mv_network_switch')
        .duration(200).EUt(MV)

    g.assembler('wfcore:mainframe')
        .itemInputs('gtceu:mv_machine_casing', '8x #gtceu:circuits/mv', '4x gtceu:steel_frame', '4x wfcore:copper_network_cable', 'gtceu:computer_monitor_cover')
        .itemOutputs('wfcore:mainframe')
        .duration(200).EUt(MV)

    g.assembler('wfcore:radar')
        .itemInputs('gtceu:hv_machine_casing', '2x gtceu:hv_sensor', '8x kubejs:hv_ram', '4x #gtceu:circuits/ev', '4x gtceu:aluminium_frame', '8x wfcore:copper_network_cable')
        .itemOutputs('wfcore:radar')
        .duration(200).EUt(HV)
        
    
})
