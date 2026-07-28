// SKELETON — the five Chunk Reinforcers (LV -> IV). Each tier is assembled from
// the previous tier's block + that tier's casing/circuits, so they form an
// upgrade ladder. Ingredient COUNTS are placeholders — TODO tune.
ServerEvents.recipes(event => {
    const g = event.recipes.gtceu

    // [id, casing, circuit tag, prev block (null = base craft), EU/t]
    const TIERS = [
        ['wfcore:chunk_reinforcer_lv', 'gtceu:lv_machine_casing', '#gtceu:circuits/lv', null,                          32],
        ['wfcore:chunk_reinforcer_mv', 'gtceu:mv_machine_casing', '#gtceu:circuits/mv', 'wfcore:chunk_reinforcer_lv',  120],
        ['wfcore:chunk_reinforcer_hv', 'gtceu:hv_machine_casing', '#gtceu:circuits/hv', 'wfcore:chunk_reinforcer_mv',  480],
        ['wfcore:chunk_reinforcer_ev', 'gtceu:ev_machine_casing', '#gtceu:circuits/ev', 'wfcore:chunk_reinforcer_hv',  1920],
        ['wfcore:chunk_reinforcer_iv', 'gtceu:iv_machine_casing', '#gtceu:circuits/iv', 'wfcore:chunk_reinforcer_ev',  8192],
    ]

    TIERS.forEach(([id, casing, circuit, prev, eut]) => {
        const r = g.assembler(id)
            .itemInputs(casing, '2x ' + circuit, prev ? prev : '4x gtceu:steel_plate') // TODO tune / add frame
            .itemOutputs(id)
            .duration(200).EUt(eut)
    })
})
