
ServerEvents.recipes(event => {
    // Casings
    event.recipes.gtceu.assembler('wfcore:galvanized_steel_casing')
        .itemInputs(['6x wfcore:galvanized_steel_plate', '1x wfcore:galvanized_steel_frame'])
        .itemOutputs('1x wfcore:galvanized_steel_casing')
        .duration(20)
        .EUt(30)
        .circuit(6);

    event.recipes.gtceu.assembler('wfcore:aluminium_sheet_casing')
        .itemInputs(['6x gtceu:aluminium_plate', '1x wfcore:galvanized_steel_frame'])
        .itemOutputs('1x wfcore:aluminium_sheet_casing')
        .duration(20)
        .EUt(30)
        .circuit(6);

    event.recipes.gtceu.assembler('wfcore:condensed_cables')
        .itemInputs(['4x gtceu:red_alloy_quadruple_cable', '1x gtceu:black_steel_frame'])
        .itemOutputs('1x wfcore:condensed_cables')
        .duration(20)
        .EUt(120)
        .circuit(6);

    event.recipes.gtceu.assembler('wfcore:boltable_casing')
        .itemInputs(['6x gtceu:beryllium_plate', '1x gtceu:aluminium_frame'])
        .itemOutputs('1x wfcore:boltable_casing')
        .duration(20)
        .EUt(120)
        .circuit(6);

    event.recipes.gtceu.assembler('wfcore:concrete_base')
        .itemInputs(['1x wfcore:galvanized_steel_frame'])
        .itemOutputs('1x wfcore:concrete_base')
        .duration(20)
        .EUt(120)
        .circuit(6)
        .inputFluids('gtceu:concrete 576');

    event.recipes.gtceu.assembler('wfcore:machine_casing_turbine_titanium')
        .itemInputs(['1x gtceu:aluminium_frame', '6x gtceu:blue_steel_plate', '8x gtceu:steel_bolt'])
        .itemOutputs('1x wfcore:machine_casing_turbine_titanium')
        .duration(200)
        .EUt(128);

    event.recipes.gtceu.assembler('wfcore:reinforced_stainless_casing')
        .itemInputs(['1x gtceu:clean_machine_casing', '6x gtceu:stainless_steel_plate', '1x wfcore:galvanized_steel_frame'])
        .itemOutputs('1x wfcore:reinforced_stainless_casing')
        .duration(20)
        .EUt(30)
        .circuit(6);

    event.recipes.gtceu.assembler('wfcore:single_ac_pipe')
        .itemInputs(['2x gtceu:magnesium_diboride_single_wire'])
        .itemOutputs('32x wfcore:single_ac_pipe')
        .duration(20)
        .EUt(120)
        .inputFluids('gtceu:polyvinyl_chloride 288');

    event.recipes.gtceu.assembler('wfcore:double_ac_pipe')
        .itemInputs(['2x gtceu:magnesium_diboride_double_wire'])
        .itemOutputs('32x wfcore:double_ac_pipe')
        .duration(20)
        .EUt(120)
        .inputFluids('gtceu:polyvinyl_chloride 576');

    event.recipes.gtceu.assembler('wfcore:quadruple_ac_pipe')
        .itemInputs(['2x gtceu:magnesium_diboride_quadruple_wire'])
        .itemOutputs('32x wfcore:quadruple_ac_pipe')
        .duration(20)
        .EUt(120)
        .inputFluids('gtceu:polyvinyl_chloride 1152');

    event.recipes.gtceu.assembler('wfcore:octal_ac_pipe')
        .itemInputs(['2x gtceu:magnesium_diboride_octal_wire'])
        .itemOutputs('32x wfcore:octal_ac_pipe')
        .duration(20)
        .EUt(120)
        .inputFluids('gtceu:polyvinyl_chloride 2304');

    event.recipes.gtceu.assembler('wfcore:hex_ac_pipe')
        .itemInputs(['2x gtceu:magnesium_diboride_hex_wire'])
        .itemOutputs('32x wfcore:hex_ac_pipe')
        .duration(20)
        .EUt(120)
        .inputFluids('gtceu:polyvinyl_chloride 4608');
});
