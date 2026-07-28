// SKELETON — the two remaining wfmedical items with no recipe yet.
// Single-step syntheses (item out directly) so they don't depend on
// intermediate fluids. Only verified GT reagents are used, so these load clean.
// Ingredient COUNTS are placeholders — TODO tune.
// (If you later want a proper intermediate "cream"/"serum" fluid + a canning
//  step like the morphine syringe in medical.js, register the fluid in
//  startup_scripts/wf_chem_fluids.js first, then split this into reactor+canner.)
ServerEvents.recipes(event => {
    const g = event.recipes.gtceu
    const MV = 120, HV = 480

    // ---- Burn Ointment (MV): silver + glycerol cream, tubed ------------------
    // 1 fluid tank -> plain chemical_reactor is fine.
    g.chemical_reactor('kubejs:burn_ointment')
        .itemInputs('gtceu:silver_dust', 'gtceu:polyethylene_tiny_fluid_pipe') // TODO tube body
        .inputFluids('gtceu:glycerol 250') // TODO
        .itemOutputs('wfmedical:burn_ointment')
        .duration(160).EUt(MV)

    // ---- Anti-Radiation Shot (HV): chelating serum in a syringe --------------
    g.chemical_reactor('kubejs:antirad_shot')
        .itemInputs('gtceu:calcium_chloride_dust', 'gtceu:polyethylene_tiny_fluid_pipe') // TODO real chelator
        .inputFluids('gtceu:distilled_water 250') // TODO
        .itemOutputs('wfmedical:antirad_shot')
        .duration(240).EUt(HV)
})
