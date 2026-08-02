// SKELETON — crafting recipes for the MV computation / power / gas multiblocks
// and their part blocks. All MV unless noted. wfcore ships these without a
// survival recipe (like the Radar in radar.js), so the pack authors them here.
// Ingredient COUNTS are placeholders — TODO tune.
ServerEvents.recipes(event => {
    const g = event.recipes.gtceu
    const MV = 120, LV = 32, HV = 480, EV = 1920, IV = 7680

    // small helper: MV assembler recipe -> single output
    const mv = (out) => g.assembler(out).itemOutputs(out).duration(200).EUt(MV)

    // ---- Computation Mainframe (MV) + its four internal part blocks ----------

    mv('wfcore:cpu_slot').itemInputs('gtceu:mv_machine_casing', '2x #gtceu:circuits/mv',
        '2x wfcore:copper_network_cable') // TODO
    mv('wfcore:ram_slot').itemInputs('gtceu:mv_machine_casing', '4x gtceu:ram_chip',
        '2x wfcore:copper_network_cable') // TODO
    mv('wfcore:copper_heatsink').itemInputs('gtceu:mv_machine_casing', '8x gtceu:copper_plate',
        '4x gtceu:copper_rod') // TODO
    mv('wfcore:cooling_liquid').itemInputs('gtceu:mv_machine_casing', 'gtceu:mv_electric_pump',
        '2x gtceu:steel_normal_fluid_pipe', '#gtceu:circuits/mv') // TODO

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
    mv('wfcore:research_unit').itemInputs('gtceu:mv_machine_casing', '6x #gtceu:circuits/mv',
        'gtceu:steel_frame', '2x wfcore:copper_network_cable') // TODO

    // ---- Data Printer (MV, singleblock) -------------------------------------
    mv('wfcore:printer').itemInputs('gtceu:mv_machine_casing', '2x #gtceu:circuits/mv',
        'gtceu:mv_electric_piston', '4x minecraft:paper') // TODO

    // ---- Large Transformer (MV) + AC converter hatches ----------------------
    mv('wfcore:large_transformer').itemInputs('gtceu:mv_machine_casing', '4x gtceu:mv_electric_pump',
        '8x wfcore:copper_network_cable', '2x #gtceu:circuits/mv') // TODO transformer part
    // AC hatches mirror the MV computation hatches (see computation_network.js)
    mv('wfcore:ac_input_hatch').itemInputs('4x gtceu:aluminium_plate', 'gtceu:mv_sensor',
        '#gtceu:circuits/mv', '2x wfcore:copper_network_cable') // TODO
    mv('wfcore:ac_output_hatch').itemInputs('4x gtceu:aluminium_plate', 'gtceu:mv_emitter',
        '#gtceu:circuits/mv', '2x wfcore:copper_network_cable') // TODO

    // ---- Large Gas Extractor (MV) -------------------------------------------
    mv('wfcore:gas_extractor').itemInputs('gtceu:mv_machine_casing', '4x gtceu:mv_electric_pump',
        '4x #gtceu:circuits/mv', '4x gtceu:steel_normal_fluid_pipe') // TODO

    // ---- Cooling Fan Covers (LV / MV / HV / EV) — motor + fan blades ---------
    // Blades are PLATES, not rotors: pure aluminium has no rotor form, and exotic
    // rotor items resolve inconsistently on hot /reload. Plates are the most
    // robustly-generated form and all four are attested in existing scripts.
    const fan = (id, casing, motor, plate, eut) => g.assembler(id)
        .itemInputs(casing, motor, '4x ' + plate) // TODO tune
        .itemOutputs(id).duration(160).EUt(eut)
    fan('wfcore:cooling_fan_cover_lv', 'gtceu:lv_machine_casing', 'gtceu:lv_electric_motor', 'gtceu:steel_plate', LV)
    fan('wfcore:cooling_fan_cover_mv', 'gtceu:mv_machine_casing', 'gtceu:mv_electric_motor', 'gtceu:aluminium_plate', MV)
    fan('wfcore:cooling_fan_cover_hv', 'gtceu:hv_machine_casing', 'gtceu:hv_electric_motor', 'gtceu:stainless_steel_plate', HV)
    fan('wfcore:cooling_fan_cover_ev', 'gtceu:ev_machine_casing', 'gtceu:ev_electric_motor', 'gtceu:titanium_plate', EV)

    g.assembler('wfcore:mv_network_switch')
        .itemInputs('gtceu:mv_machine_casing', '8x #gtceu:circuits/mv','4x gtceu:aluminium_frame', '4x wfcore:copper_network_cable')
        .itemOutputs('wfcore:mv_network_switch')
        .duration(200).EUt(MV)

    g.assembler('wfcore:mainframe')
        .itemInputs('gtceu:mv_machine_casing', '8x #gtceu:circuits/mv','4x gtceu:steel_frame', '4x wfcore:copper_network_cable')
        .itemOutputs('wfcore:mainframe')
        .duration(200).EUt(MV)

    g.assembler('wfcore:radar')
        .itemInputs('gtceu:mv_machine_casing', '4x #gtceu:circuits/ev','4x gtceu:aluminium_frame', '4x wfcore:copper_network_cable')
        .itemOutputs('wfcore:radar')
        .duration(200).EUt(MV)
})
