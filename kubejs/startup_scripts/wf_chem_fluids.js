// New GT fluids owned by the pack (see material.js for the white_phosphorus dust).
// GTCEu auto-names materials from the id (mustard_gas -> "Mustard Gas").
// Startup script -> needs a full restart, NOT /reload.
GTCEuStartupEvents.registry('gtceu:material', event => {

    // --- Chemical-weapon gases (both MV) — production in chemicals.js ---------
    event.create('phosgene')
        .gas()
        .color(0xC7D89B)

    event.create('mustard_gas')
        .gas()
        .color(0x8B7B3A)

    // --- Kerosene: a middle distillate (not in GTCEu); precursor to jet fuel --
    event.create('kerosene')
        .liquid()
        .color(0xB9A46B)

    // --- Napalm: thickened incendiary fuel -----------------------------------
    event.create('napalm')
        .liquid()
        .color(0xC24A2A)

    // --- Jet fuel: the aircraft fuel. Wired to the planes in config/wfcore.toml
    //     (vehicles override: fluids=gtceu:jet_fuel=<ratio>). -------------------
    event.create('jet_fuel')
        .liquid()
        .color(0xE0C15A)
})
