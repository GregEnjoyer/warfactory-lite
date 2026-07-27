// Warfactory Medical — crafting + processing recipes.
// wfmedical (0.3.1) ships NO recipes of its own, so every medical item is
// creative-only out of the box. Everything here is purely additive.
ServerEvents.recipes(event => {

    // ---- Raw cloth materials ----

    // 3 grass -> 3 string (a cheap early thread source).
    event.shapeless(Item.of('minecraft:string', 3), [
        'minecraft:grass', 'minecraft:grass', 'minecraft:grass'
    ])

    // Fabric — woven from string; base cloth for bandages and tourniquets. Hand + assembler.
    event.shapeless(Item.of('kubejs:fabric', 1), [
        'minecraft:string', 'minecraft:string', 'minecraft:string', 'minecraft:string'
    ])
    event.recipes.gtceu.assembler('kubejs:fabric')
        .itemInputs('4x minecraft:string')
        .itemOutputs(Item.of('kubejs:fabric'))
        .duration(100).EUt(16)

    // ---- Field dressings: craftable BOTH by hand and by machine (assembler) ----

    // Bandage — cloth strips bound with thread. Any wool works.
    event.shapeless(Item.of('wfmedical:bandage', 2), ['#minecraft:wool', 'minecraft:string'])
    event.recipes.gtceu.assembler('kubejs:bandage')
        .itemInputs('#minecraft:wool', 'minecraft:string')
        .itemOutputs(Item.of('wfmedical:bandage', 2))
        .duration(100).EUt(16)

    // Splint — two sticks lashed together with thread.
    event.shapeless('wfmedical:splint', ['minecraft:stick', 'minecraft:stick', 'minecraft:string'])
    event.recipes.gtceu.assembler('kubejs:splint')
        .itemInputs('2x minecraft:stick', 'minecraft:string')
        .itemOutputs(Item.of('wfmedical:splint'))
        .duration(100).EUt(16)

    // Suture kit — an iron needle and thread in a paper wrap.
    event.shapeless('wfmedical:suture_kit', [
        'minecraft:paper', 'minecraft:iron_nugget', 'minecraft:string', 'minecraft:string'
    ])
    event.recipes.gtceu.assembler('kubejs:suture_kit')
        .itemInputs('minecraft:paper', 'minecraft:iron_nugget', '2x minecraft:string')
        .itemOutputs(Item.of('wfmedical:suture_kit'))
        .duration(100).EUt(16)

    // Tourniquet — a fabric strap tightened with a stick windlass.
    event.shapeless('wfmedical:tourniquet', ['kubejs:fabric', 'kubejs:fabric', 'minecraft:stick'])
    event.recipes.gtceu.assembler('kubejs:tourniquet')
        .itemInputs('2x kubejs:fabric', 'minecraft:stick')
        .itemOutputs(Item.of('wfmedical:tourniquet'))
        .duration(100).EUt(16)

    // Medkit — a field kit packing the basic dressings onto a wooden board.
    // Hand recipe hammers it together (mallet takes durability, isn't consumed);
    // the LV assembler builds the same kit without the mallet.
    event.shapeless('wfmedical:medkit', [
        'wfmedical:suture_kit', 'wfmedical:suture_kit',
        'wfmedical:bandage', 'wfmedical:bandage',
        'wfmedical:splint',
        '#minecraft:planks',
        '#forge:tools/mallets'
    ])
    event.recipes.gtceu.assembler('kubejs:medkit')
        .itemInputs('2x wfmedical:suture_kit', '2x wfmedical:bandage', 'wfmedical:splint', '#minecraft:planks')
        .itemOutputs(Item.of('wfmedical:medkit'))
        .duration(200).EUt(30)

    // ---- Morphine & naloxone: crush poppies, leach with ethanol, then can into syringes ----
    // (Vanilla has no "poppy seed" item, so the poppy flower is the source.)
    // The entire opioid chain runs at MV (120 EU/t).
    const MV = 120

    // 1) Macerate poppy flowers into crushed poppy (gtceu:poppy_dust).
    event.recipes.gtceu.macerator('kubejs:crush_poppy')
        .itemInputs(Item.of('minecraft:poppy', 3))
        .itemOutputs(Item.of('gtceu:poppy_dust'))
        .duration(120)
        .EUt(MV)

    // 2) Leach the crushed poppy with ethanol to extract liquid morphine (chemical bath).
    event.recipes.gtceu.chemical_bath('kubejs:leach_morphine')
        .itemInputs(Item.of('gtceu:poppy_dust', 2))
        .inputFluids(Fluid.of('gtceu:ethanol', 500))
        .outputFluids(Fluid.of('gtceu:morphine', 100))
        .duration(300)
        .EUt(MV)

    // 3) Naloxone — react morphine with salt in a chemical reactor (parody chemistry).
    event.recipes.gtceu.chemical_reactor('kubejs:make_naloxone')
        .itemInputs(Item.of('gtceu:salt_dust', 1))
        .inputFluids(Fluid.of('gtceu:morphine', 100))
        .outputFluids(Fluid.of('gtceu:naloxone', 100))
        .duration(200)
        .EUt(MV)

    // 4) Can morphine into a syringe — one tiny polyethylene pipe forms the syringe body.
    event.recipes.gtceu.canner('kubejs:morphine_syringe')
        .itemInputs(Item.of('gtceu:polyethylene_tiny_fluid_pipe', 1))
        .inputFluids(Fluid.of('gtceu:morphine', 100))
        .itemOutputs(Item.of('wfmedical:morphine_syringe'))
        .duration(100)
        .EUt(MV)

    // 5) Can naloxone into a syringe the same way.
    event.recipes.gtceu.canner('kubejs:naloxone_syringe')
        .itemInputs(Item.of('gtceu:polyethylene_tiny_fluid_pipe', 1))
        .inputFluids(Fluid.of('gtceu:naloxone', 100))
        .itemOutputs(Item.of('wfmedical:naloxone_syringe'))
        .duration(100)
        .EUt(MV)

    // ---- Blood bags: extract blood from bone meal, then bag it in polyethylene ----

    // Repurpose bone meal: the vanilla (and any GTCEu) bone meal -> white dye
    // recipe is removed so bone meal instead feeds the blood extractor.
    // (White dye is still craftable from lily of the valley.)
    event.remove({ output: 'minecraft:white_dye', input: 'minecraft:bone_meal' })

    // Extract blood from bone meal — 1 bone meal = 250 mB blood.
    event.recipes.gtceu.extractor('kubejs:blood_from_bone_meal')
        .itemInputs(Item.of('minecraft:bone_meal'))
        .outputFluids(Fluid.of('gtceu:blood', 250))
        .duration(80)
        .EUt(16)

    // Blood bag — 1000 mB blood packaged in 2 polyethylene sheets (assembler).
    // Machine-only by design: the blood must come from the extractor, so there is no hand recipe.
    event.recipes.gtceu.assembler('kubejs:blood_bag')
        .itemInputs(Item.of('gtceu:polyethylene_plate', 2))
        .inputFluids(Fluid.of('gtceu:blood', 1000))
        .itemOutputs(Item.of('wfmedical:blood_bag'))
        .duration(200)
        .EUt(30)

    // ==== Chemical medicine chains ====
    // Parody chemistry: everything routes through real GT chemical machines on real GT reagents,
    // but the synthesis steps are intentionally NOT accurate recipes. Multi-fluid syntheses use the
    // Large Chemical Reactor (the single Chemical Reactor has only one fluid-input tank).
    const HV = 480, EV = 2048

    // ---- Painkillers (MV): blister-pack GTCEu's own paracetamol ----
    // GTCEu already synthesizes gtceu:paracetamol_dust (phenol -> aminophenol -> paracetamol), so we
    // only package the finished dust rather than duplicate that chemistry.
    event.recipes.gtceu.assembler('kubejs:painkillers')
        .itemInputs('2x gtceu:paracetamol_dust', 'minecraft:paper')
        .itemOutputs(Item.of('wfmedical:painkillers'))
        .duration(120)
        .EUt(MV)

    // ---- Local anesthetic (HV): synth lidocaine, then can into a syringe (like the morphine syringe) ----
    event.recipes.gtceu.large_chemical_reactor('kubejs:make_lidocaine')
        .inputFluids(Fluid.of('gtceu:toluene', 500), Fluid.of('gtceu:ammonia', 250), Fluid.of('gtceu:acetic_acid', 250))
        .outputFluids(Fluid.of('gtceu:lidocaine', 200))
        .duration(240)
        .EUt(HV)
    event.recipes.gtceu.canner('kubejs:local_anesthetic')
        .itemInputs(Item.of('gtceu:polyethylene_tiny_fluid_pipe', 1))
        .inputFluids(Fluid.of('gtceu:lidocaine', 100))
        .itemOutputs(Item.of('wfmedical:local_anesthetic'))
        .duration(100)
        .EUt(HV)

    // ---- Hemostatic (MV): calcium-activate blood into a coagulant powder, impregnate a gauze ----
    // Ties into the existing blood chain (bone meal -> blood). One fluid in/out, so single reactor is fine.
    event.recipes.gtceu.chemical_reactor('kubejs:make_coagulant')
        .itemInputs(Item.of('gtceu:calcium_chloride_dust', 1))
        .inputFluids(Fluid.of('gtceu:blood', 1000))
        .itemOutputs(Item.of('gtceu:coagulant_dust', 2))
        .outputFluids(Fluid.of('gtceu:distilled_water', 750))
        .duration(160)
        .EUt(MV)
    event.recipes.gtceu.assembler('kubejs:hemostatic')
        .itemInputs('2x gtceu:coagulant_dust', 'kubejs:fabric')
        .itemOutputs(Item.of('wfmedical:hemostatic'))
        .duration(160)
        .EUt(MV)

    // ---- Combat Stimulant I (EV): morphine + amphetamine + epinephrine autoinjector ----
    // Precursors synth at HV; the final blend + can run at EV. "morphine" reuses the opioid chain above.
    event.recipes.gtceu.large_chemical_reactor('kubejs:make_amphetamine')
        .inputFluids(Fluid.of('gtceu:benzene', 500), Fluid.of('gtceu:acetone', 250), Fluid.of('gtceu:ammonia', 250))
        .outputFluids(Fluid.of('gtceu:amphetamine', 300))
        .duration(300)
        .EUt(HV)
    event.recipes.gtceu.large_chemical_reactor('kubejs:make_epinephrine')
        .inputFluids(Fluid.of('gtceu:phenol', 300), Fluid.of('gtceu:ammonia', 200), Fluid.of('gtceu:methanol', 200))
        .outputFluids(Fluid.of('gtceu:epinephrine', 200))
        .duration(300)
        .EUt(HV)
    event.recipes.gtceu.large_chemical_reactor('kubejs:combat_stim_serum')
        .inputFluids(
            Fluid.of('gtceu:morphine', 200),
            Fluid.of('gtceu:amphetamine', 200),
            Fluid.of('gtceu:epinephrine', 100),
            Fluid.of('gtceu:distilled_water', 500))
        .outputFluids(Fluid.of('gtceu:combat_stim', 500))
        .duration(400)
        .EUt(EV)
    event.recipes.gtceu.canner('kubejs:combat_stimulant_i')
        .itemInputs(Item.of('gtceu:polyethylene_tiny_fluid_pipe', 1))
        .inputFluids(Fluid.of('gtceu:combat_stim', 250))
        .itemOutputs(Item.of('wfmedical:combat_stimulant_i'))
        .duration(120)
        .EUt(EV)
})
