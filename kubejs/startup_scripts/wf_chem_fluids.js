// SKELETON — new GT fluids owned by the pack. Follow-up: pick real colors, add
// .components(...) for JEI chem tooltips, and (jet_fuel) wire it into the plane
// fuel system. GTCEu auto-names materials from the id (mustard_gas -> "Mustard Gas").
// Startup script -> needs a full restart, NOT /reload.
GTCEuStartupEvents.registry('gtceu:material', event => {

    // --- Chemical-weapon gases (both MV per design) ---------------------------
    // .gas() gives a gaseous fluid form: gtceu:phosgene / gtceu:mustard_gas.
    event.create('phosgene')
        .gas()
        .color(0xC7D89B) // TODO pick final color
    // TODO .components('1x carbon', '1x oxygen', '2x chlorine')  // verify names

    event.create('mustard_gas')
        .gas()
        .color(0x8B7B3A) // TODO pick final color
    // TODO .components(...)  // (ClC2H4)2S — parody, verify

    // --- Kerosene: NOT in GTCEu (verified — the only kerosene was the dropped
    //     wfballistics test fluid), so the pack owns it. It's the precursor to
    //     jet fuel (see server_scripts/chemicals.js).
    event.create('kerosene')
        .liquid()
        .color(0xB9A46B) // TODO pick final color

    // --- Napalm: thickened incendiary fuel ------------------------------------
    event.create('napalm')
        .liquid()
        .color(0xC24A2A) // TODO pick final color

    // --- Jet fuel: the plane-only fuel (replaces the test kerosene) -----------
    // TODO: after registering, wire this into the plane fuel config
    //       (see config/wfcore.toml vehicle fuel overrides) so planes burn it.
    event.create('jet_fuel')
        .liquid()
        .color(0xE0C15A) // TODO pick final color
    // TODO: optionally register it as a GTCEu combustion/turbine fuel too.
})
