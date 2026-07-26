// WFCore MV computation/data network — recipes for the Copper Network Cable and the four MV hatches.
// These moved out of the WFCore mod's Java addon so the pack owns their balance.
//
// The Copper Network Cable shares GregTech's optical net, so it works with optical fibre and every
// computation/data machine (Mainframe, Research Unit, Data Bank). The MV hatches carry the standard
// COMPUTATION_DATA_* / OPTICAL_DATA_* part abilities, so they drop into the existing Mainframe (transmission)
// and Research Unit (reception) as a cheaper alternative to GregTech's IV optical hatches.

ServerEvents.recipes(event => {
    const greg = event.recipes.gtceu

    // --- Copper Network Cable: 9 fine copper wires sheathed in rubber (cheap optical-fibre alternative) ---
    greg.assembler('wfcore:copper_network_cable')
        .itemInputs('9x gtceu:fine_copper_wire')
        .inputFluids('gtceu:rubber 144')
        .itemOutputs('2x wfcore:copper_network_cable')
        .duration(100)
        .EUt(30) // LV

    // --- MV hatches: aluminium hull + MV part + MV circuit + copper cable ---
    // Emitter = transmitter (pushes onto the net), Sensor = receiver (reads from the net).
    // Computation and data hatches share the same emitter/sensor inputs, so a programmed circuit disambiguates
    // the assembler recipes: circuit 1 = computation hatches, circuit 2 = optical-data hatches.
    const hatch = (id, part, circuit) =>
        greg.assembler(`wfcore:${id}`)
            .itemInputs('4x gtceu:aluminium_plate', `gtceu:${part}`, '#gtceu:circuits/mv', '2x wfcore:copper_network_cable')
            .itemOutputs(`wfcore:${id}`)
            .circuit(circuit)
            .duration(200)
            .EUt(120) // MV

    hatch('mv_computation_transmission_hatch', 'mv_emitter', 1)
    hatch('mv_computation_reception_hatch', 'mv_sensor', 1)
    hatch('mv_data_transmission_hatch', 'mv_emitter', 2)
    hatch('mv_data_reception_hatch', 'mv_sensor', 2)
})
