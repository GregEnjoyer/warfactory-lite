// War chemicals + fuels. Produces the pack's new materials/fluids registered in
// startup_scripts/wf_chem_fluids.js (phosgene, mustard_gas, kerosene, napalm,
// jet_fuel) and startup_scripts/materials.js (white_phosphorus). Parody chemistry through real GT
// machines on real GT reagents. Two-fluid syntheses use the Large Chemical
// Reactor (a single Chemical Reactor has only one fluid-input tank).
ServerEvents.recipes(event => {
    const g = event.recipes.gtceu
    const LV = 32, MV = 120

    // ---- White phosphorus: centrifuge phosphorus ----------------------------
    // 1 phosphorus dust -> 3 small phosphorus piles + 20% chance of a small
    // white-phosphorus pile. Feeds the white-phosphorus shells (guns/ammo.js).
    g.centrifuge('kubejs:white_phosphorus')
        .itemInputs('gtceu:phosphorus_dust')
        .itemOutputs('3x gtceu:small_phosphorus_dust')
        .chancedOutput(Item.of('gtceu:small_white_phosphorus_dust'), 2000, 0) // 20% (per-10000)
        .duration(200).EUt(MV)

    // ---- Phosgene (MV): CO + Cl2 -> COCl2 -----------------------------------
    g.large_chemical_reactor('kubejs:make_phosgene')
        .inputFluids('gtceu:carbon_monoxide 1000', 'gtceu:chlorine 1000')
        .outputFluids('gtceu:phosgene 1000')
        .duration(200).EUt(MV)

    // ---- Mustard gas (MV): ethylene + sulfur + chlorine (Levinstein parody) --
    g.large_chemical_reactor('kubejs:make_mustard_gas')
        .itemInputs('gtceu:sulfur_dust')
        .inputFluids('gtceu:ethylene 1000', 'gtceu:chlorine 1000')
        .outputFluids('gtceu:mustard_gas 1000')
        .duration(240).EUt(MV)

    // ---- Napalm (MV): thicken kerosene into an incendiary gel with rubber ----
    g.chemical_reactor('kubejs:make_napalm')
        .itemInputs('gtceu:rubber_dust')
        .inputFluids('gtceu:kerosene 1000')
        .outputFluids('gtceu:napalm 1000')
        .duration(200).EUt(MV)

    // ---- Jet fuel chain: distill kerosene from light fuel, then refine it ----
    // Kerosene is a middle distillate of GT's light fuel; jet fuel is refined kerosene.
    g.distillery('kubejs:make_kerosene')
        .inputFluids('gtceu:light_fuel 1000')
        .outputFluids('gtceu:kerosene 800')
        .circuit(1)
        .duration(200).EUt(LV)

    g.distillery('kubejs:make_jet_fuel')
        .inputFluids('gtceu:kerosene 1000')
        .outputFluids('gtceu:jet_fuel 800')
        .circuit(2)
        .duration(200).EUt(MV)

    // ---- RDX (EV): nitrate gelled toluene with mixed acid → cyclonite dust + spent acid ----------
    // 2 gelled_toluene + 2000 nitric_acid + 1000 sulfuric_acid → 4 RDX + 1000 diluted_sulfuric_acid
    // Two fluid inputs require the Large Chemical Reactor.
    g.large_chemical_reactor('wfcore:rdx_nitration')
        .itemInputs('2x gtceu:gelled_toluene')
        .inputFluids('gtceu:nitric_acid 2000', 'gtceu:sulfuric_acid 1000')
        .itemOutputs('4x gtceu:rdx_dust')
        .outputFluids('gtceu:diluted_sulfuric_acid 1000')
        .duration(400).EUt(2048)

    event.shapeless(
  Item.of('minecraft:gunpowder', 4),
  [
    '3x gtceu:coal_dust',
    '2x gtceu:saltpeter_dust',
    'gtceu:sulfur_dust'
],

)
    event.shapeless(
  Item.of('minecraft:gunpowder', 4),
  [
    '3x gtceu:charcoal_dust',
    '2x gtceu:saltpeter_dust',
    'gtceu:sulfur_dust'
],

)
    event.shapeless(
  Item.of('minecraft:gunpowder', 4),
  [
    '3x gtceu:carbon_dust',
    '2x gtceu:saltpeter_dust',
    'gtceu:sulfur_dust'
],

)
})
