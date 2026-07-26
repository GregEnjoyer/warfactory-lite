// Research-gated crafting for the tiered vehicle components (see
// startup_scripts/partMaker/vehicle_components.js for the items and
// startup_scripts/vehicle_research.js for the "Vehicle Components" research tree).
//
// Each part is assembled from its tier's plate + a component-flavour ingredient, gated behind
// the tier's research node. Inputs/duration/EUt are simple tunable placeholders — only pure
// gtceu:/minecraft: ids are used so these resolve in any instance. The per-part circuit number
// keeps each of a tier's 9 recipes uniquely selectable in the assembler.
ServerEvents.recipes(event => {
    // tier -> main plate + assembler voltage (kept under each tier's EU/t cap)
    const TIER = {
        lv: { plate: 'gtceu:steel_plate',           eut: 30 },
        mv: { plate: 'gtceu:aluminium_plate',       eut: 120 },
        hv: { plate: 'gtceu:stainless_steel_plate', eut: 480 },
        ev: { plate: 'gtceu:titanium_plate',        eut: 1920 },
        iv: { plate: 'gtceu:tungsten_steel_plate',  eut: 7680 },
    }
    // component -> flavour ingredient
    const PART = {
        air_frame:      'gtceu:aluminium_plate',
        cannon_barrel:  'gtceu:steel_rod',
        cockpit:        'minecraft:glass',
        engine:         'gtceu:steel_gearbox',
        rotor:          'gtceu:steel_rod',
        track:          'gtceu:steel_rod',
        vehicle_frame:  'gtceu:steel_frame',
        weapons_system: 'gtceu:small_steel_gear',
        wing:           'gtceu:aluminium_plate',
    }
    const PARTS = Object.keys(PART)

    Object.keys(TIER).forEach(tier => {
        const t = TIER[tier]
        PARTS.forEach((part, i) => {
            // Engines have a dedicated bill of materials (pistons/double plates/rings/gears) in engines.js.
            // Skip them here — but leave 'engine' in the PART map above so the other parts keep their circuit
            // numbers (i is unchanged by this early return).
            if (part === 'engine') return
            event.recipes.gtceu.assembler('veh_' + tier + '_' + part)
                .itemInputs(Item.of(t.plate, 4), Item.of(PART[part]))
                .itemOutputs(Item.of('kubejs:' + tier + '_' + part))
                .circuit(i + 1)
                .duration(200)
                .EUt(t.eut)
                .addCondition(WFResearch.condition('veh_' + tier))
        })
    })
})
