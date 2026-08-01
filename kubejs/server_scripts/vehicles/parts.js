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
        .EUt(500)


        event.recipes.gtceu.assembler('kubejs:large_propeller')
        .itemInputs(
                Item.of('gtceu:stainless_steel_turbine_blade', 4),
                    Item.of('gtceu:aluminium_ring')
        )
        .itemOutputs(Item.of('superbwarfare:large_propeller'))
        .inputFluids(Fluid.of('gtceu:soldering_alloy',1000))
        .duration(120)
        .EUt(480)


        // =========================
        // BARRELS (FIXED cutter misuse + typo)
        // =========================

        event.remove({ output: 'kubejs:barrel_steel' })
        event.remove({ output: 'kubejs:barrel_damascus' })
        event.remove({ output: 'kubejs:heavy_barrel_steel' })
        event.remove({ output: 'kubejs:heavy_barrel_damascus' })

        // steel barrel
        event.recipes.gtceu.cutter("kubejs:barrel_1")
        .itemInputs(Item.of('gtceu:steel_plate', 3))
        .itemOutputs(Item.of('kubejs:barrel_steel', 2))
        .duration(120)
        .EUt(16)

        // damascus barrel
        event.recipes.gtceu.cutter("kubejs:barrel_2")
        .itemInputs(Item.of('gtceu:damascus_steel_plate', 3))
        .itemOutputs(Item.of('kubejs:barrel_damascus', 2))
        .duration(120)
        .EUt(16)

        // heavy steel barrel
        event.recipes.gtceu.cutter("kubejs:barrel_1_big")
        .itemInputs(Item.of('gtceu:steel_plate', 6))
        .itemOutputs(Item.of('kubejs:heavy_barrel_steel', 1))
        .duration(120)
        .EUt(16)

        // ❌ FIXED typo: barrel_2_bug → barrel_2_big
        event.recipes.gtceu.cutter("kubejs:barrel_2_big")
        .itemInputs(Item.of('gtceu:damascus_steel_plate', 6))
        .itemOutputs(Item.of('kubejs:heavy_barrel_damascus', 1))
        .duration(120)
        .EUt(16)


})






// === Processing feedstocks + light armament module (was Parts/otherParts.js) ===
 ServerEvents.recipes(event => {
 event.recipes.gtceu.chemical_reactor('kubejs:sold_rocket_fuel')
     .itemInputs(Item.of('gtceu:aluminium_dust'), Item.of('gtceu:rubber_dust'))
      .inputFluids(Fluid.of('gtceu:hydrogen_peroxide', 1000))
       .inputFluids(Fluid.of('gtceu:ethanol', 1000))
        .itemOutputs(Item.of('kubejs:solid_rocket_fuel'))
        .duration(200)
        .EUt(30)


 })   
