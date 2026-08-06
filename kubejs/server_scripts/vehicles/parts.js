ServerEvents.recipes(event => {

     
        // =========================
        // WHEEL
        // =========================
        event.remove({ output: 'superbwarfare:wheel' })

        event.recipes.gtceu.assembler("kubejs:wheel")
        .itemInputs(Item.of('gtceu:steel_plate', 8))
        .inputFluids(Fluid.of('gtceu:rubber', 1000))
        .itemOutputs(Item.of('superbwarfare:wheel', 2))
        .duration(200)
        .EUt(32)

        // =========================
        // PROPELLERS
        // =========================

        event.remove({ output: 'superbwarfare:propeller' })

        event.recipes.gtceu.assembler("kubejs:small_propeller")
        .itemInputs(Item.of('gtceu:polytetrafluoroethylene_plate',4))
        .itemInputs(Item.of('gtceu:carbon_fiber_plate',8))
        .inputFluids(Fluid.of('gtceu:glue',500))
        .itemOutputs(Item.of('superbwarfare:propeller', 1))
        .duration(120)
        .EUt(120)


        event.recipes.gtceu.assembler('kubejs:large_propeller')
        .itemInputs(
                Item.of('gtceu:stainless_steel_turbine_blade', 4),
                    Item.of('gtceu:aluminium_ring')
        )
        .itemOutputs(Item.of('superbwarfare:large_propeller'))
        .inputFluids(Fluid.of('gtceu:soldering_alloy',1000))
        .duration(1200)
        .EUt(480)


        // =========================
        // BARRELS (FIXED cutter misuse + typo)
        // =========================

        // steel barrel
        event.recipes.gtceu.cutter("kubejs:barrel_1")
        .itemInputs(Item.of('gtceu:steel_plate', 3))
        .itemOutputs(Item.of('kubejs:double_barrel_steel', 2))
        .duration(120)
        .EUt(16)

        // damascus barrel
        event.recipes.gtceu.cutter("kubejs:barrel_2")
        .itemInputs(Item.of('gtceu:damascus_steel_plate', 3))
        .itemOutputs(Item.of('kubejs:barrel_damascus', 2))
        .duration(120)
        .EUt(16)

        // heavy steel barrel
        event.recipes.gtceu.cutter("kubejs:big")
        .itemInputs(Item.of('gtceu:double_steel_plate', 3))
        .itemOutputs(Item.of('kubejs:heavy_barrel_steel', 1))
        .duration(120)
        .EUt(16)

        // ❌ FIXED typo: barrel_2_bug → barrel_2_big
        event.recipes.gtceu.cutter("kubejs:barrel_2_big")
        .itemInputs(Item.of('gtceu:double_damascus_steel_plate', 3))
        .itemOutputs(Item.of('kubejs:heavy_barrel_damascus', 1))
        .duration(120)
        .EUt(16)


})






// === Processing feedstocks + light armament module (was Parts/otherParts.js) ===
 ServerEvents.recipes(event => {
    // ── Solid Rocket Propellant — Ammonium Perchlorate Composite Propellant (APCP) ──
    // A simplified MV chemical chain; this is now the ONLY route (the old assembler
    // black-powder recipe in guns/ammo.js was removed). EUt(96) forces an MV machine.
    //
    // Step 1 — synthesise the oxidizer. Saltpeter nitrate + hydrogen-peroxide oxidiser
    // → ammonium perchlorate dust (material in startup_scripts/materials.js).
    event.recipes.gtceu.chemical_reactor('kubejs:ammonium_perchlorate')
        .itemInputs(Item.of('gtceu:saltpeter_dust', 2))
        .inputFluids(Fluid.of('gtceu:hydrogen_peroxide', 2000))
        .itemOutputs(Item.of('gtceu:ammonium_perchlorate_dust', 2))
        .circuit(1)
        .duration(200)
        .EUt(96)

    // Step 2 — cast the composite. Oxidizer + aluminium fuel, bound in molten rubber
    // (HTPB stand-in), mixed into the finished propellant grain.
    event.recipes.gtceu.mixer('kubejs:solid_rocket_propellant')
        .itemInputs(Item.of('gtceu:ammonium_perchlorate_dust', 3), Item.of('gtceu:aluminium_dust', 1))
        .inputFluids(Fluid.of('gtceu:rubber', 144))
        .itemOutputs(Item.of('kubejs:solid_rocket_fuel', 2))
        .circuit(1)
        .duration(200)
        .EUt(96)
 })
