// SKELETON — WarForge/wfcore defensive blocks (a graded chain, ranked by the
// blocks' in-code blast resistance). One assembler recipe each; tiers are fixed,
// ingredient COUNTS are placeholders — TODO tune.
//
//   hesco 17 -> std-concrete 22 -> ballistic-glass (soft) -> reinf-concrete 46
//   -> hardened-steel 75 -> tungsten-plating 130
ServerEvents.recipes(event => {
    const g = event.recipes.gtceu

    // --- HESCO Bastion (LV) — wire-mesh gabion filled with gravel -------------
    // Hand recipe too, like sandbags.js.
    event.shapeless('wfcore:hesco_bastion', ['4x minecraft:iron_bars', 'minecraft:gravel']) // TODO
    g.assembler('wfcore:hesco_bastion')
        .itemInputs('4x minecraft:iron_bars', 'minecraft:gravel') // TODO
        .itemOutputs('wfcore:hesco_bastion')
        .duration(100).EUt(32)

    // --- Standard Concrete (LV) — poured concrete + steel rebar ---------------
    g.assembler('wfcore:standard_concrete')
        .itemInputs('4x minecraft:light_gray_concrete', '4x gtceu:steel_rod') // TODO
        .itemOutputs('wfcore:standard_concrete')
        .duration(120).EUt(32)

    // --- Ballistic Glass (LV) — laminated glass + polymer interlayer ----------
    g.assembler('wfcore:ballistic_glass')
        .itemInputs('2x gtceu:laminated_glass', 'gtceu:polyethylene_plate') // TODO
        .itemOutputs('wfcore:ballistic_glass')
        .duration(120).EUt(32)

    // --- Reinforced Concrete (MV) — survives a portable charge ----------------
    g.assembler('wfcore:reinforced_concrete')
        .itemInputs('4x wfcore:standard_concrete', '4x gtceu:steel_plate', '2x gtceu:steel_frame') // TODO
        .itemOutputs('wfcore:reinforced_concrete')
        .duration(200).EUt(120)

    // --- Hardened Steel block (HV) -------------------------------------------
    g.assembler('wfcore:hardened_steel')
        .itemInputs('8x gtceu:steel_plate', 'gtceu:steel_block') // TODO
        .inputFluids('gtceu:soldering_alloy 288') // TODO
        .itemOutputs('wfcore:hardened_steel')
        .duration(300).EUt(480)

    // --- Tungsten Plating block (EV) -----------------------------------------
    g.assembler('wfcore:tungsten_plating')
        .itemInputs('6x gtceu:tungsten_steel_plate', '3x gtceu:tungsten_carbide_plate') // attested ids (pure gtceu:tungsten_plate not confirmed)
        .inputFluids('gtceu:soldering_alloy 576') // TODO
        .itemOutputs('wfcore:tungsten_plating')
        .duration(400).EUt(1920)

    g.assembler('gtceu:reinforced_stone')
        .itemInputs('1x minecraft:stone', '4x gtceu:iron_rod', '2x gtceu:iron_plate')
        .itemOutputs('gtceu:reinforced_stone')
        .duration(100).EUt(32)
})
