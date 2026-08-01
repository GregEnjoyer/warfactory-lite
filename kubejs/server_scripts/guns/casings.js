
ServerEvents.recipes(event => {
    // Casings
    const id = name => `wfcore:${name}`;

    const casingRecipes = (item, mod, output, count, fluid, eutick, circuit) => {
        count = count || 1;
        fluid = fluid || null;

        let recipe = event.recipes.gtceu.assembler(id(`${output}`))
            .itemInputs(item)
            .itemOutputs(`${count}x ${mod}:${output}`)
            .duration(20)
            .EUt(eutick);

        if (circuit) {
            recipe.circuit(circuit);
        }

        if (fluid) {
            recipe.inputFluids(`${fluid}`);
        }
    };

    casingRecipes(['6x wfcore:galvanized_steel_plate', '1x wfcore:galvanized_steel_frame'], 'wfcore', 'galvanized_steel_casing', 1, null, 30, 6);
    casingRecipes(['6x gtceu:aluminium_plate', '1x wfcore:galvanized_steel_frame'], 'wfcore', 'aluminium_sheet_casing', 1, null, 30, 6);
    casingRecipes(['4x gtceu:red_alloy_quadruple_cable', '1x gtceu:black_steel_frame'], 'wfcore', 'condensed_cables', 1, null, 120, 6);
    casingRecipes(['6x gtceu:beryllium_plate', '1x gtceu:aluminium_frame'], 'wfcore', 'boltable_casing', 1, null, 120, 6);
    casingRecipes(['1x wfcore:galvanized_steel_frame'], 'wfcore', 'concrete_base', 1, 'gtceu:concrete 576', 120, 6);
    casingRecipes(['6x gtceu:beryllium_plate', '1x gtceu:stainless_steel_frame'], 'wfcore', 'machine_casing_turbine_titanium', 1, null, 512);
    casingRecipes(['1x gtceu:clean_machine_casing', '6x gtceu:stainless_steel_plate', '1x wfcore:galvanized_steel_frame'], 'wfcore', 'reinforced_stainless_casing', 1, null, 30, 6);
    casingRecipes(['2x gtceu:magnesium_diboride_single_wire'], 'wfcore', 'single_ac_pipe', 32, 'gtceu:polyvinyl_chloride 288', 120);
    casingRecipes(['2x gtceu:magnesium_diboride_double_wire'], 'wfcore', 'double_ac_pipe', 32, 'gtceu:polyvinyl_chloride 576', 120);
    casingRecipes(['2x gtceu:magnesium_diboride_quadruple_wire'], 'wfcore', 'quadruple_ac_pipe', 32, 'gtceu:polyvinyl_chloride 1152', 120);
    casingRecipes(['2x gtceu:magnesium_diboride_octal_wire'], 'wfcore', 'octal_ac_pipe', 32, 'gtceu:polyvinyl_chloride 2304', 120);
    casingRecipes(['2x gtceu:magnesium_diboride_hex_wire'], 'wfcore', 'hex_ac_pipe', 32, 'gtceu:polyvinyl_chloride 4608', 120);
});
