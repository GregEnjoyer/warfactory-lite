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

    // A superbwarfare:container item that deploys `entity` when placed.
    const container = entity => Item.of('superbwarfare:container', 1, '{BlockEntityTag:{EntityType:"' + entity + '"}}')

    // circuit numbers only need to be unique among recipes that share an input signature (Mk42 & Mle1934).
    const EMPLACEMENTS = [
        // CIWS (MV) — radar autocannon: metal + weapons system (vehicle part) + circuits + seekers.
        { rid: 'kubejs:emp_ciws', research: 'emp_ciws', out: container('superbwarfare:hpj_11'),
          circuit: 1, duration: 400, eut: 128,
          inputs: [['gtceu:double_steel_plate', 6], ['kubejs:mv_weapons_system', 1], ['#gtceu:circuits/mv', 2], ['superbwarfare:seeker', 2]] },
        // TOW (HV) — tripod ATGM launcher: metal + missile engine + seeker.
        { rid: 'kubejs:emp_tow', research: 'emp_tow', out: Item.of('superbwarfare:tow_deployer'),
          circuit: 2, duration: 400, eut: 512,
          inputs: [['gtceu:double_steel_plate', 4], ['superbwarfare:missile_engine', 2], ['superbwarfare:seeker', 1], ['#gtceu:circuits/lv', 1]] },
        // BL-132 (HV) — small-calibre naval gun: metal + cannon barrel (vehicle part) + cannon core + circuits.
        { rid: 'kubejs:emp_bl_132', research: 'emp_bl_132', out: container('superbwarfare:bl_132'),
          circuit: 3, duration: 600, eut: 512,
          inputs: [['gtceu:double_steel_plate', 8], ['kubejs:hv_cannon_barrel', 1], ['superbwarfare:cannon_core', 1], ['#gtceu:circuits/lv', 2]] },
        // Mk42 (EV) — 5" large-calibre naval gun: heavy on metal + EV cannon barrels + cannon cores + circuits.
        { rid: 'kubejs:emp_mk_42', research: 'emp_mk_42', out: container('superbwarfare:mk_42'),
          circuit: 4, duration: 1200, eut: 2048,
          inputs: [['gtceu:double_steel_plate', 12], ['kubejs:ev_cannon_barrel', 2], ['superbwarfare:cannon_core', 2], ['#gtceu:circuits/mv', 2]] },
        // Mle1934 (EV) — 138.6mm large-calibre naval gun: same signature as Mk42, distinct circuit.
        { rid: 'kubejs:emp_mle_1934', research: 'emp_mle_1934', out: container('superbwarfare:mle_1934'),
          circuit: 5, duration: 1200, eut: 2048,
          inputs: [['gtceu:double_steel_plate', 12], ['kubejs:ev_cannon_barrel', 2], ['superbwarfare:cannon_core', 2], ['#gtceu:circuits/mv', 2]] },
    ]

    EMPLACEMENTS.forEach(e => {
        event.recipes.gtceu.assembler(e.rid)
            .itemInputs(e.inputs.map(it => it[0].startsWith('#') ? (it[1] + 'x ' + it[0]) : Item.of(it[0], it[1])))
            .itemOutputs(e.out)
            .circuit(e.circuit)
            .duration(e.duration)
            .EUt(e.eut)
            .addCondition(WFResearch.condition(e.research))
    })
})
