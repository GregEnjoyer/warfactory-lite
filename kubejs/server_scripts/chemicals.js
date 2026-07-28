// SKELETON — production for the pack's new materials/fluids (registered in
// startup_scripts/wf_chem_fluids.js + material.js): phosgene + mustard gas (both
// MV chem weapons), white phosphorus (centrifuged), kerosene -> jet fuel (plane
// fuel), and napalm. Parody chemistry through real GT machines on real GT
// reagents — amounts/steps are placeholders, TODO tune.
// Two-fluid syntheses use the Large Chemical Reactor (single reactor = 1 tank).
ServerEvents.recipes(event => {
    const g = event.recipes.gtceu
    const LV = 32, MV = 120

    // ---- White phosphorus: centrifuge phosphorus ----------------------------
    // 1 phosphorus dust -> guaranteed 3 small phosphorus piles + 20% chance of a
    // small white-phosphorus pile. Feeds white-phosphorus / incendiary recipes.
    g.centrifuge('kubejs:white_phosphorus')
        .itemInputs('gtceu:phosphorus_dust')
        .itemOutputs('3x gtceu:small_phosphorus_dust')                        // guaranteed
        .chancedOutput(Item.of('gtceu:small_white_phosphorus_dust'), 2000, 0) // 20% (per-10000)
        .duration(200).EUt(MV) // TODO tier

    // ---- Phosgene (MV): CO + Cl2 -> COCl2 -----------------------------------
    g.large_chemical_reactor('kubejs:make_phosgene')
        .inputFluids('gtceu:carbon_monoxide 1000', 'gtceu:chlorine 1000') // TODO ratios
        .outputFluids('gtceu:phosgene 1000')
        .duration(200).EUt(MV)

    // ---- Mustard gas (MV): ethylene + sulfur + chlorine (Levinstein parody) --
    g.large_chemical_reactor('kubejs:make_mustard_gas')
        .itemInputs('gtceu:sulfur_dust') // TODO
        .inputFluids('gtceu:ethylene 1000', 'gtceu:chlorine 1000') // TODO ratios
        .outputFluids('gtceu:mustard_gas 1000')
        .duration(240).EUt(MV)

    // ---- Napalm: thicken a fuel into an incendiary gel -----------------------
    // TODO: pick the real feedstock (kerosene/gasoline) + thickener.
    g.chemical_reactor('kubejs:make_napalm')
        .itemInputs('gtceu:rubber_dust') // rubber thickener (attested in parts.js, robust)
        .inputFluids('gtceu:kerosene 1000')   // TODO
        .outputFluids('gtceu:napalm 1000')    // TODO
        .duration(200).EUt(MV)

    // ---- Jet fuel chain: kerosene (precursor) -> jet fuel --------------------
    // Kerosene isn't a stock GT fluid, so we distill it here first.
    // TODO: pick the real feedstock (GT oil chain) + tier.
    g.distillery('kubejs:make_kerosene')
        .inputFluids('gtceu:light_fuel 1000') // TODO
        .outputFluids('gtceu:kerosene 750')   // TODO
        .circuit(1)
        .duration(200).EUt(LV)

    // Jet fuel = refined kerosene (hydrotreat / additive blend). TODO tune.
    g.distillery('kubejs:make_jet_fuel')
        .inputFluids('gtceu:kerosene 1000') // TODO
        .outputFluids('gtceu:jet_fuel 750') // TODO
        .circuit(2)
        .duration(200).EUt(MV)
})
