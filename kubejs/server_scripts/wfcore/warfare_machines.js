// SKELETON — crafting recipes for the drilling / missile / vehicle-factory
// multiblock controllers. Tiers come from the quest book:
//   Light Ground Vehicle Factory = LV (uses MV power to RUN; MV in its name is
//     an outdated classification), Light Plane Assembler = LV, Interceptor = LV,
//   Heavy Vehicle Depot = MV, Drill Rig / Missile Factory / Missile Silo /
//     Tank Assembly = HV, Heavy Plane Assembler = EV.
// Ingredient COUNTS are placeholders — TODO tune.
ServerEvents.recipes(event => {
    const g = event.recipes.gtceu
    const LV = 32, MV = 120, HV = 480, EV = 1920

    // ---- Drilling (HV) ------------------------------------------------------
    // Drill Head: the consumable bit placed under the rig.
    g.assembler('wfcore:drill_head')
        .itemInputs('4x gtceu:tungsten_carbide_plate', 'gtceu:steel_frame', '#gtceu:circuits/hv') // TODO
        .itemOutputs('wfcore:drill_head').duration(300).EUt(HV)
    g.assembler('wfcore:drill_rig')
        .itemInputs('gtceu:hv_machine_casing', '4x gtceu:hv_electric_motor', '4x gtceu:steel_gearbox', '4x #gtceu:circuits/hv') // TODO
        .itemOutputs('wfcore:drill_rig').duration(300).EUt(HV)

    // ---- Missiles infrastructure (HV) ---------------------------------------
    g.assembler('wfcore:missile_factory')
        .itemInputs('gtceu:hv_machine_casing', '6x #gtceu:circuits/hv', 'gtceu:steel_frame', 'gtceu:steel_gearbox') // TODO
        .itemOutputs('wfcore:missile_factory').duration(300).EUt(HV)
    g.assembler('wfcore:missile_launcher')
        .itemInputs('gtceu:hv_machine_casing', '8x #gtceu:circuits/hv', '4x gtceu:hv_emitter', 'gtceu:steel_frame') // TODO
        .itemOutputs('wfcore:missile_launcher').duration(300).EUt(HV)
    // Interceptor Battery — crafted at LV, only functional once you reach HV+.
    g.assembler('wfcore:interceptor')
        .itemInputs('gtceu:lv_machine_casing', '4x #gtceu:circuits/lv', '2x gtceu:lv_sensor', '4x gtceu:steel_plate') // TODO
        .itemOutputs('wfcore:interceptor').duration(300).EUt(LV)

    // ---- Vehicle factories --------------------------------------------------
    g.assembler('wfcore:light_ground_vehicle_factory')
        .itemInputs('gtceu:lv_machine_casing', '4x gtceu:steel_gearbox', '4x #gtceu:circuits/lv', '8x gtceu:steel_plate') // TODO
        .itemOutputs('wfcore:light_ground_vehicle_factory').duration(300).EUt(LV)
    g.assembler('wfcore:light_plane_assembler')
        .itemInputs('gtceu:lv_machine_casing', '4x gtceu:steel_gearbox', '4x #gtceu:circuits/lv', '8x gtceu:aluminium_plate') // TODO
        .itemOutputs('wfcore:light_plane_assembler').duration(300).EUt(LV)
    g.assembler('wfcore:heavy_vehicle_depot')
        .itemInputs('gtceu:mv_machine_casing', '6x gtceu:steel_gearbox', '6x #gtceu:circuits/mv', '8x gtceu:aluminium_plate') // TODO
        .itemOutputs('wfcore:heavy_vehicle_depot').duration(300).EUt(MV)
    g.assembler('wfcore:tank_assembly')
        .itemInputs('gtceu:hv_machine_casing', '8x gtceu:steel_gearbox', '6x #gtceu:circuits/hv', '8x gtceu:stainless_steel_plate') // TODO
        .itemOutputs('wfcore:tank_assembly').duration(300).EUt(HV)
    g.assembler('wfcore:helicopter_assembler')
        .itemInputs('gtceu:mv_machine_casing', '8x gtceu:steel_gearbox', '6x #gtceu:circuits/mv', '8x gtceu:magnalium_plate') // TODO
        .itemOutputs('wfcore:helicopter_assembler').duration(300).EUt(MV)
    g.assembler('wfcore:heavy_plane_assembler')
        .itemInputs('gtceu:ev_machine_casing', '8x #gtceu:circuits/ev', '8x gtceu:hssg_plate', 'gtceu:ev_emitter') // TODO
        .itemOutputs('wfcore:heavy_plane_assembler').duration(300).EUt(EV)
})
