ServerEvents.recipes(event => {

        // =========================
        // TRACK
        // =========================
        event.remove({ output: 'superbwarfare:track' })

        event.recipes.gtceu.assembler("kubejs:track")
        .itemInputs(
                Item.of('gtceu:steel_plate', 4),
                    Item.of('gtceu:steel_rod', 8)
        )
        .inputFluids(Fluid.of('gtceu:rubber', 3000))
        .itemOutputs(Item.of('superbwarfare:track', 2))
        .duration(200)
        .EUt(32)


        // =========================
        // WHEEL
        // =========================
        event.remove({ output: 'superbwarfare:wheel' })

        event.recipes.gtceu.assembler("kubejs:wheel")
        .itemInputs(Item.of('gtceu:steel_plate', 2))
        .inputFluids(Fluid.of('gtceu:rubber', 1000))
        .itemOutputs(Item.of('superbwarfare:wheel', 2))
        .duration(200)
        .EUt(32)


        // =========================
        // MOTOR
        // =========================
        event.remove({ output: 'superbwarfare:motor' })

        event.recipes.gtceu.assembler("kubejs:motor")
        .itemInputs(
                Item.of('gtceu:mv_electric_motor'),
                    Item.of('gtceu:magnetic_steel_rod', 4),
                    Item.of('gtceu:annealed_copper_octal_wire', 4)
        )
        .itemOutputs(Item.of('superbwarfare:motor'))
        .duration(200)
        .EUt(128)


        // =========================
        // BIG MOTOR
        // =========================
        event.remove({ output: 'superbwarfare:large_motor' })

        event.recipes.gtceu.assembler("kubejs:big_motor")
        .itemInputs(
                Item.of('gtceu:hv_electric_motor'),
                    Item.of('gtceu:long_stainless_steel_rod', 4),
                    Item.of('gtceu:kanthal_double_wire', 4)
        )
        .itemOutputs(Item.of('superbwarfare:large_motor'))
        .duration(200)
        .EUt(512)


        // =========================
        // PROPELLERS
        // =========================

        // ❌ FIX: cutter must be 1 input ONLY
        event.remove({ output: 'superbwarfare:propeller' })

        event.recipes.gtceu.cutter("kubejs:small_propeller")
        .itemInputs(Item.of('gtceu:polytetrafluoroethylene_plate'))
        .itemOutputs(Item.of('superbwarfare:propeller', 2))
        .duration(120)
        .EUt(500)


        event.recipes.gtceu.assembler('kubejs:large_propeller')
        .itemInputs(
                Item.of('gtceu:aluminium_turbine_blade', 4),
                    Item.of('gtceu:aluminium_ring')
        )
        .itemOutputs(Item.of('superbwarfare:large_propeller'))
        .duration(120)
        .EUt(120)


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
        .circuit(1)
        .EUt(16)

        // damascus barrel
        event.recipes.gtceu.cutter("kubejs:barrel_2")
        .itemInputs(Item.of('gtceu:damascus_steel_plate', 3))
        .itemOutputs(Item.of('kubejs:barrel_damascus', 2))
        .duration(120)
        .circuit(2)
        .EUt(16)

        // heavy steel barrel
        event.recipes.gtceu.cutter("kubejs:barrel_1_big")
        .itemInputs(Item.of('gtceu:steel_plate', 6))
        .itemOutputs(Item.of('kubejs:heavy_barrel_steel', 1))
        .duration(120)
        .circuit(2)
        .EUt(16)

        // ❌ FIXED typo: barrel_2_bug → barrel_2_big
        event.recipes.gtceu.cutter("kubejs:barrel_2_big")
        .itemInputs(Item.of('gtceu:damascus_steel_plate', 6))
        .itemOutputs(Item.of('kubejs:heavy_barrel_damascus', 1))
        .duration(120)
        .circuit(1)
        .EUt(16)


        // =========================
        // VEHICLE ALLOYS
        // =========================

        event.recipes.gtceu.alloy_smelter('kubejs:tank_alloy')
        .itemInputs(
                Item.of('gtceu:steel_ingot'),
                    Item.of('gtceu:cobalt_ingot')
        )
        .itemOutputs(Item.of('gtceu:tank_grade_metal_ingot', 2))
        .duration(200)
        .EUt(100)


        event.recipes.gtceu.chemical_reactor('kubejs:plane_alloy')
        .itemInputs(
                Item.of('gtceu:steel_dust'),
                    Item.of('gtceu:aluminium_dust')
        )
        .itemOutputs(Item.of('gtceu:aircraft_grade_metal_dust'))
        .duration(200)
        .EUt(100)


        event.recipes.gtceu.chemical_reactor('kubejs:plane_alloy_cool')
        .itemInputs(Item.of('gtceu:hot_aircraft_grade_metal_ingot'))
        .inputFluids(Fluid.of('minecraft:water', 1000))
        .itemOutputs(Item.of('gtceu:aircraft_grade_metal_ingot'))
        .duration(200)
        .EUt(100)

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


        // peroxide avalible in LV
        event.remove({ output: Fluid.of('gtceu:hydrogen_peroxide')})

event.recipes.gtceu.chemical_reactor('kubejs:lv_peroxide')
      .inputFluids(Fluid.of('gtceu:hydrogen', 1000))
      .inputFluids(Fluid.of('gtceu:oxygen', 1000))
        .outputFluids(Fluid.of('gtceu:hydrogen_peroxide', 2000))
        .duration(200)
        .EUt(30)

        //Ethanol avalible in LV

event.remove({ id: 'kubejs:lv_ethanol' })

        event.recipes.gtceu.distillery('kubejs:lv_ethanol')
      .inputFluids(Fluid.of('gtceu:biomass', 1000))
        .outputFluids(Fluid.of('gtceu:ethanol', 100))
        .itemOutputs(Item.of('gtceu:wood_dust', 4))
        .circuit(2)
        .duration(600)
        .EUt(30)

        //light module but FUN

        event.remove({ output: 'superbwarfare:raw_cemented_carbide_powder'})

         event.recipes.gtceu.assembler('kubejs:light_module') 
         .itemInputs(Item.of('kubejs:heavy_barrel_damascus', 5), Item.of('gtceu:small_tank_grade_metal_gear', 2), Item.of('gtceu:basic_electronic_circuit'))
        .itemOutputs(Item.of('superbwarfare:light_armament_module'))
        .duration(600)
        .EUt(100)
 })   
