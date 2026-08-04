// SKELETON — WarForge faction blocks. Tiers set by the user:
//   Citadel = STEAM, Basic Claim = STEAM, Reinforced Claim = EV, FOB = MV.
//   (Siege Camp = LV, Faction Yield Storage = MV — not quest-gated, tune freely.)
// Ingredient COUNTS are placeholders — TODO tune.
ServerEvents.recipes(event => {
    const g = event.recipes.gtceu

    // ---- STEAM: hand recipes, no electric machine ---------------------------
    // Citadel Block — the faction centerpiece.
    event.shaped('warforge:citadelblock', [
        'SBS',
        'BFB', // TODO
        'SBS',
    ], { S: 'gtceu:steel_plate', B: 'gtceu:bronze_plate', F: 'gtceu:steel_frame' })

    // Basic Claim Block — a cheap staked flag.
    event.shaped('warforge:basicclaimblock', [
        ' W ',
        ' P ', // TODO
        'SPS',
    ], { W: '#minecraft:wool', P: 'minecraft:stick', S: 'gtceu:steel_plate' })

    // ---- Siege Camp Block (LV) ----------------------------------------------
    g.assembler('warforge:siegecampblock')
        .itemInputs('4x gtceu:steel_plate', '2x #minecraft:wool', '#gtceu:circuits/lv') // TODO
        .itemOutputs('warforge:siegecampblock').duration(200).EUt(32)

    // ---- Forward Operating Base (MV) ----------------------------------------
    g.assembler('warforge:fobblock')
        .itemInputs('warforge:siegecampblock', '4x gtceu:steel_plate', '#gtceu:circuits/mv') // TODO
        .itemOutputs('warforge:fobblock').duration(200).EUt(120)

    // ---- Faction Yield Storage (MV) -----------------------------------------
    g.assembler('warforge:islandcollector')
        .itemInputs('4x gtceu:steel_plate', 'gtceu:bronze_drum', '2x #gtceu:circuits/lv') // TODO
        .itemOutputs('warforge:islandcollector').duration(200).EUt(30)

    // ---- Reinforced Claim Block (EV) ----------------------------------------
    g.assembler('warforge:reinforcedclaimblock')
        .itemInputs('warforge:basicclaimblock', '4x gtceu:titanium_plate', '#gtceu:circuits/ev') // TODO
        .itemOutputs('warforge:reinforcedclaimblock').duration(300).EUt(1920)

})
