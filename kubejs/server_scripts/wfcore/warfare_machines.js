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

    const asm = (out, casing, eut, dur) => g.assembler(out)
        .itemInputs(casing).itemOutputs(out).duration(dur || 300).EUt(eut)

    // ---- Drilling (HV) ------------------------------------------------------
    // Drill Head: the consumable bit placed under the rig.
    g.assembler('wfcore:drill_head')
        .itemInputs('4x gtceu:tungsten_carbide_plate', 'gtceu:steel_frame', '#gtceu:circuits/hv') // TODO
        .itemOutputs('wfcore:drill_head').duration(300).EUt(HV)
    asm('wfcore:drill_rig', 'gtceu:hv_machine_casing', HV)
        .itemInputs('4x gtceu:hv_electric_motor', '4x gtceu:steel_gearbox', '4x #gtceu:circuits/hv') // TODO

    // ---- Missiles infrastructure (HV) ---------------------------------------
    asm('wfcore:missile_factory', 'gtceu:hv_machine_casing', HV)
        .itemInputs('6x #gtceu:circuits/hv', 'gtceu:steel_frame', 'gtceu:steel_gearbox') // TODO
    asm('wfcore:missile_launcher', 'gtceu:hv_machine_casing', HV)
        .itemInputs('8x #gtceu:circuits/hv', '4x gtceu:hv_emitter', 'gtceu:steel_frame') // TODO
    // Interceptor Battery — crafted at LV, only functional once you reach HV+.
    asm('wfcore:interceptor', 'gtceu:lv_machine_casing', LV)
        .itemInputs('4x #gtceu:circuits/lv', '2x gtceu:lv_sensor', '4x gtceu:steel_plate') // TODO

    // ---- Vehicle factories --------------------------------------------------
    asm('wfcore:light_ground_vehicle_factory', 'gtceu:lv_machine_casing', LV)
        .itemInputs('4x gtceu:steel_gearbox', '4x #gtceu:circuits/lv', '8x gtceu:steel_plate') // TODO
    asm('wfcore:light_plane_assembler', 'gtceu:lv_machine_casing', LV)
        .itemInputs('4x gtceu:steel_gearbox', '4x #gtceu:circuits/lv', '8x gtceu:aluminium_plate') // TODO
    asm('wfcore:heavy_vehicle_depot', 'gtceu:mv_machine_casing', MV)
        .itemInputs('6x gtceu:steel_gearbox', '6x #gtceu:circuits/mv', '8x gtceu:aluminium_plate') // TODO
    asm('wfcore:tank_assembly', 'gtceu:hv_machine_casing', HV)
        .itemInputs('8x gtceu:steel_gearbox', '6x #gtceu:circuits/hv', '8x gtceu:stainless_steel_plate') // TODO
    asm('wfcore:helicopter_assembler', 'gtceu:mv_machine_casing', MV)
        .itemInputs('8x gtceu:steel_gearbox', '6x #gtceu:circuits/mv', '8x gtceu:magnalium_plate') // TODO
    asm('wfcore:heavy_plane_assembler', 'gtceu:ev_machine_casing', EV)
        .itemInputs('8x #gtceu:circuits/ev', '8x gtceu:hssg_plate', 'gtceu:ev_emitter') // TODO
})
