// Dedicated crafting for the tiered vehicle ENGINES (kubejs:lv_engine .. kubejs:iv_engine), replacing the
// generic placeholder recipe in components.js (which now skips 'engine'). Same GregTech assembler + per-tier
// "veh_<tier>" research gate as the other vehicle components, but a proper (deliberately expensive) engine:
//   - electric pistons: 6 for LV/MV/HV, 8 for EV/IV   <- the tier-defining, expensive part
//   - 8 double plates (casing), 8 rubber rings (seals) and 6 gears (gearing)
//   - EV and above additionally require LUBRICANT (a fluid input)
//   - build time is >= 60 s (1200 ticks), scaling up with tier
//
// All item ids are confirmed present in this pack's GTCEu. The supporting mats stay steel/rubber across every
// tier (double_steel_plate, steel_gear, rubber_ring) so the recipes are guaranteed to resolve; the tier
// identity is carried by the electric-piston tier, the assembler voltage, and (EV+) the lubricant.
ServerEvents.recipes(event => {
    // tier -> piston count, assembler EU/t, build time (ticks; >=1200 = 60 s), lubricant mB (0 = none; EV+ only)
    const ENGINE = {
        lv: { pistons: 6, eut: 30,   duration: 1200, lube: 0 },
        mv: { pistons: 6, eut: 120,  duration: 1300, lube: 0 },
        hv: { pistons: 6, eut: 480,  duration: 1400, lube: 0 },
        ev: { pistons: 8, eut: 1920, duration: 1600, lube: 500 },
        iv: { pistons: 8, eut: 7680, duration: 1800, lube: 1000 },
    }

    Object.keys(ENGINE).forEach(tier => {
        const e = ENGINE[tier]
        const recipe = event.recipes.gtceu.assembler('veh_' + tier + '_engine')
            .itemInputs(
                Item.of('gtceu:' + tier + '_electric_piston', e.pistons),
                Item.of('gtceu:double_steel_plate', 8),
                Item.of('gtceu:rubber_ring', 8),
                Item.of('gtceu:steel_gear', 6)
            )
            .itemOutputs(Item.of('kubejs:' + tier + '_engine'))
            .circuit(4)
            .duration(e.duration)
            .EUt(e.eut)
            .addCondition(WFResearch.condition('veh_' + tier))
        // EV and above require lubricant.
        if (e.lube > 0) recipe.inputFluids('gtceu:lubricant ' + e.lube)
    })
})
