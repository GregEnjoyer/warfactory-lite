// Emplacement crafting recipes — GregTech Assembler, each gated directly on its Emplacements-tab research
// node (server_scripts/wfcore/WFResearch.js). NO blueprints: the recipe itself is the gate, and it outputs
// the deployable emplacement ITEM directly:
//   - naval cannons + CIWS -> a superbwarfare:container tagged with the entity to spawn (the pack's
//     packaged-emplacement item; same pattern as the Type-63 MLRS in guns/smg_rifles.js). Placing the
//     container deploys the emplacement; only TOW + mortar can be recovered afterwards (GT crowbar, via
//     kubejs/data/wfcore/tags/entity_types/gt_crowbar_pickup_allowed.json).
//   - TOW -> its tow_deployer item (parallel to the mortar_deployer, built ungated in guns/smg_rifles.js
//     as the intro emplacement).
// SBW's native crafting / vehicle_assembling recipes for all of these are stripped in
// cleanup/remove_crafting.js, so these gated GT routes are the ONLY way to build them. Costs: metals for
// everything, plus circuits + vehicle parts for the cannons and CIWS. The shells/rockets they fire are on
// the Ballistics tab. (Mortar chain + the Type-63 MLRS recipe live in guns/smg_rifles.js.)
ServerEvents.recipes(event => {

    // circuit numbers only need to be unique among recipes that share an input signature (Mk42 & Mle1934).

    // CIWS (MV) — radar autocannon: metal + weapons system (vehicle part) + circuits + seekers.
    event.recipes.gtceu.assembler('kubejs:emp_ciws')
        .itemInputs(
            Item.of('gtceu:double_steel_plate', 6),
            Item.of('kubejs:mv_weapons_system', 1),
            '2x #gtceu:circuits/mv',
            Item.of('superbwarfare:seeker', 2)
        )
        .itemOutputs(Item.of('superbwarfare:container', 1, '{BlockEntityTag:{EntityType:"superbwarfare:hpj_11"}}'))
        .circuit(1)
        .duration(400)
        .EUt(128)
        .addCondition(WFResearch.condition('emp_ciws'))

    // TOW (HV) — tripod ATGM launcher: metal + missile engine + seeker.
    event.recipes.gtceu.assembler('kubejs:emp_tow')
        .itemInputs(
            Item.of('gtceu:double_steel_plate', 4),
            Item.of('superbwarfare:missile_engine', 2),
            Item.of('superbwarfare:seeker', 1),
            '1x #gtceu:circuits/lv'
        )
        .itemOutputs(Item.of('superbwarfare:tow_deployer'))
        .circuit(2)
        .duration(400)
        .EUt(512)
        .addCondition(WFResearch.condition('emp_tow'))

    // BL-132 (HV) — small-calibre naval gun: metal + cannon barrel (vehicle part) + cannon core + circuits.
    event.recipes.gtceu.assembler('kubejs:emp_bl_132')
        .itemInputs(
            Item.of('gtceu:double_steel_plate', 8),
            Item.of('kubejs:hv_cannon_barrel', 1),
            Item.of('superbwarfare:cannon_core', 1),
            '2x #gtceu:circuits/lv'
        )
        .itemOutputs(Item.of('superbwarfare:container', 1, '{BlockEntityTag:{EntityType:"superbwarfare:bl_132"}}'))
        .circuit(3)
        .duration(600)
        .EUt(512)
        .addCondition(WFResearch.condition('emp_bl_132'))

    // Mk42 (EV) — 5" large-calibre naval gun: heavy on metal + EV cannon barrels + cannon cores + circuits.
    event.recipes.gtceu.assembler('kubejs:emp_mk_42')
        .itemInputs(
            Item.of('gtceu:double_steel_plate', 12),
            Item.of('kubejs:ev_cannon_barrel', 2),
            Item.of('superbwarfare:cannon_core', 2),
            '2x #gtceu:circuits/mv'
        )
        .itemOutputs(Item.of('superbwarfare:container', 1, '{BlockEntityTag:{EntityType:"superbwarfare:mk_42"}}'))
        .circuit(4)
        .duration(1200)
        .EUt(2048)
        .addCondition(WFResearch.condition('emp_mk_42'))

    // Mle1934 (EV) — 138.6mm large-calibre naval gun: same signature as Mk42, distinct circuit.
    event.recipes.gtceu.assembler('kubejs:emp_mle_1934')
        .itemInputs(
            Item.of('gtceu:double_steel_plate', 12),
            Item.of('kubejs:ev_cannon_barrel', 2),
            Item.of('superbwarfare:cannon_core', 2),
            '2x #gtceu:circuits/mv'
        )
        .itemOutputs(Item.of('superbwarfare:container', 1, '{BlockEntityTag:{EntityType:"superbwarfare:mle_1934"}}'))
        .circuit(5)
        .duration(1200)
        .EUt(2048)
        .addCondition(WFResearch.condition('emp_mle_1934'))
})
