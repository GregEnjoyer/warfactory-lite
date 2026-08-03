// SKELETON — the five Chunk Reinforcers (LV -> IV). Each tier is assembled from
// the previous tier's block + that tier's casing/circuits, so they form an
// upgrade ladder. Ingredient COUNTS are placeholders — TODO tune.
ServerEvents.recipes(event => {
    const g = event.recipes.gtceu

    // [id, casing, circuit tag, prev block (null = base craft), EU/t]
    g.assembler('wfcore:chunk_reinforcer_lv')
        .itemInputs('gtceu:lv_machine_casing', '2x #gtceu:circuits/lv', '4x gtceu:steel_plate', 'gtceu:lv_field_generator') // TODO tune
        .itemOutputs('wfcore:chunk_reinforcer_lv')
        .duration(200).EUt(32)

    g.assembler('wfcore:chunk_reinforcer_mv')
        .itemInputs('gtceu:mv_machine_casing', '2x #gtceu:circuits/mv', 'wfcore:chunk_reinforcer_lv', 'gtceu:mv_field_generator') // TODO tune
        .itemOutputs('wfcore:chunk_reinforcer_mv')
        .duration(200).EUt(120)

    g.assembler('wfcore:chunk_reinforcer_hv')
        .itemInputs('gtceu:hv_machine_casing', '2x #gtceu:circuits/hv', 'wfcore:chunk_reinforcer_mv', 'gtceu:hv_field_generator') // TODO tune
        .itemOutputs('wfcore:chunk_reinforcer_hv')
        .duration(200).EUt(480)

    g.assembler('wfcore:chunk_reinforcer_ev')
        .itemInputs('gtceu:ev_machine_casing', '2x #gtceu:circuits/ev', 'wfcore:chunk_reinforcer_hv', 'gtceu:ev_field_generator') // TODO tune
        .itemOutputs('wfcore:chunk_reinforcer_ev')
        .duration(200).EUt(1920)

    g.assembler('wfcore:chunk_reinforcer_iv')
        .itemInputs('gtceu:iv_machine_casing', '2x #gtceu:circuits/iv', 'wfcore:chunk_reinforcer_ev', 'gtceu:iv_field_generator') // TODO tune
        .itemOutputs('wfcore:chunk_reinforcer_iv')
        .duration(200).EUt(8192)
})
