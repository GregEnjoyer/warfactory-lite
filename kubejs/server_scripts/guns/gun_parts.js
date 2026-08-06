// ============================================================================
// gun_parts.js — gun sub-parts (grips/stocks), the RPG launcher, optics and the
// full TaCZ/ronmc/ww attachment tree.
//
// This is what used to be guns_and_ammo.js AFTER all ammunition was pulled out
// into the consolidated ammo.js. Casings, cartridges, shells, rockets, grenades,
// mines, missiles, bombs and drones ALL live in ammo.js now.
//
// Vendor crafting-table removals live in ../cleanup/remove_crafting.js.
// ============================================================================

ServerEvents.recipes(event => {

    // =========================
    // PARTS - GRIPS
    // =========================
    event.recipes.gtceu.assembler('kubejs:grip_wooden')
    .itemInputs('gtceu:treated_wood_rod', 'gtceu:treated_wood_plate')
    .itemOutputs(Item.of('kubejs:grip_wooden'))
    .circuit(23)
    .duration(100)
    .EUt(16);

    event.recipes.gtceu.assembler('kubejs:grip_steel')
    .itemInputs('gtceu:steel_plate', 'gtceu:steel_rod')
    .itemOutputs(Item.of('kubejs:grip_steel'))
    .circuit(19)
    .duration(200)
    .EUt(30);

    event.recipes.gtceu.assembler('kubejs:grip_plastic')
    .itemInputs('gtceu:silicone_rubber_plate', 'gtceu:rubber_ring')
    .itemOutputs(Item.of('kubejs:grip_plastic'))
    .circuit(18)
    .duration(200)
    .EUt(30);

    event.shaped(
        Item.of("kubejs:grip_wooden"),
            ["AA ",
             "A  ",
             "   "
            ],
        {A : '#forge:plates/treated_wood' }
    );

    // =========================
    // PARTS - STOCKS
    // =========================
    event.recipes.gtceu.assembler('kubejs:stock_wooden')
    .itemInputs('gtceu:treated_wood_plate')
    .itemOutputs(Item.of('kubejs:stock_wooden'))
    .circuit(1)
    .duration(100)
    .EUt(16);

    event.recipes.gtceu.assembler('kubejs:stock_steel')
    .itemInputs('gtceu:steel_plate')
    .itemOutputs(Item.of('kubejs:stock_steel'))
    .circuit(22)
    .duration(200)
    .EUt(30);

    event.recipes.gtceu.assembler('kubejs:stock_plastic')
    .itemInputs('gtceu:silicone_rubber_plate')
    .itemOutputs(Item.of('kubejs:stock_plastic'))
    .circuit(23)
    .duration(200)
    .EUt(30);

    // Early-game hand-craft for the wooden stock — mirrors the wooden grip above.
    // The Assembler recipe is fine for automation, but the very first questline gun
    // (Springfield 1873, ../guns/early_guns.js) needs this before an Assembler exists.
    event.shaped(
        Item.of("kubejs:stock_wooden"),
            ["AA ",
             "AA ",
             "  A"
            ],
        {A : '#forge:plates/treated_wood' }
    );

    // =========================
    // HEAVY LAUNCHERS (the weapons; their ammunition lives in ammo.js)
    // Research chain (wfcore/research/infantry.js): M79 (LV) -> RPG (MV) -> {Javelin, Igla} (EV).
    // Each recipe's EUt tracks its research tier; recipes gate on the matching wpn_* node.
    // =========================

    // M79 grenade launcher (LV) — break-action 40mm tube on a wooden furniture.
    event.recipes.gtceu.assembler('kubejs:m_79')
    .itemInputs(
        Item.of('kubejs:heavy_barrel_steel', 2),
                Item.of('gtceu:treated_wood_plate', 2),
                Item.of('gtceu:small_steel_spring', 1)
    )
    .circuit(1)
    .itemOutputs(Item.of('superbwarfare:m_79'))
    .duration(400)
    .addCondition(WFResearch.condition('wpn_m79'))
    .EUt(32)

    // RPG-7 (MV) — shoulder-fired rocket launcher.
    event.recipes.gtceu.assembler('kubejs:rpg')
    .itemInputs(
        Item.of('kubejs:heavy_barrel_steel', 3),
                Item.of('gtceu:treated_wood_plate', 2),
                Item.of('gtceu:small_steel_spring', 1)
    )
    .circuit(2)
    .itemOutputs(Item.of('superbwarfare:rpg'))
    .duration(400)
    .addCondition(WFResearch.condition('wpn_rpg'))
    .EUt(128)

    // FGM-148 Javelin (EV) — guided top-attack ATGM launcher. Needs a seeker + missile engine.
    event.recipes.gtceu.assembler('kubejs:javelin')
    .itemInputs(
        Item.of('gtceu:titanium_plate', 4),
                Item.of('superbwarfare:seeker', 1),
                Item.of('superbwarfare:missile_engine', 1),
                '#gtceu:circuits/ev'
    )
    .circuit(3)
    .itemOutputs(Item.of('superbwarfare:javelin'))
    .duration(600)
    .addCondition(WFResearch.condition('wpn_javelin'))
    .EUt(2048)

    // IGLA-9K38 MANPADS (EV) — IR-guided man-portable SAM launcher.
    event.recipes.gtceu.assembler('kubejs:igla_9k38')
    .itemInputs(
        Item.of('gtceu:titanium_plate', 4),
                Item.of('superbwarfare:seeker', 1),
                Item.of('superbwarfare:missile_engine', 1),
                '#gtceu:circuits/ev'
    )
    .circuit(4)
    .itemOutputs(Item.of('superbwarfare:igla_9k38'))
    .duration(600)
    .addCondition(WFResearch.condition('wpn_igla'))
    .EUt(2048)

    // =========================
    // ATTACHMENTS - SCOPES
    // =========================
    // ===== Red Dots / Reflex Sights =====
   // { id: 'pointblank:aimpoint',         circuit: 1,  lenses: 1, screws: 2, plates: 1 },
   // { id: 'pointblank:aimpoint_t2',      circuit: 2,  lenses: 1, screws: 2, plates: 1 },
   // { id: 'pointblank:delta',            circuit: 3,  lenses: 1, screws: 2, plates: 1 },
   // { id: 'pointblank:hi_red',           circuit: 4,  lenses: 1, screws: 2, plates: 1 },
   // { id: 'pointblank:hi_red_zoom',      circuit: 5,  lenses: 2, screws: 2, plates: 1 },
   // { id: 'pointblank:holographic',      circuit: 6,  lenses: 1, screws: 3, plates: 1 },
  //  { id: 'pointblank:holographic558',   circuit: 7,  lenses: 2, screws: 3, plates: 1 },
   // { id: 'pointblank:holographic_em',   circuit: 8,  lenses: 1, screws: 3, plates: 1 },
  //  { id: 'pointblank:operatorreflex',   circuit: 9,  lenses: 1, screws: 2, plates: 1 },
  //  // ===== Combat Optics =====
//    { id: 'pointblank:acog',             circuit: 10, lenses: 2, screws: 4, plates: 2 },
//     { id: 'pointblank:specter',          circuit: 11, lenses: 2, screws: 4, plates: 2 },
  //   { id: 'pointblank:ppco',             circuit: 12, lenses: 2, screws: 4, plates: 2 },
//    { id: 'pointblank:hamr',             circuit: 13, lenses: 2, screws: 4, plates: 2 },
    // ===== Precision / Sniper Scopes =====
//    { id: 'pointblank:drake_scope',      circuit: 14, lenses: 4, screws: 6, plates: 3 },
 //   { id: 'pointblank:eaglescope',       circuit: 15, lenses: 4, screws: 6, plates: 3 },
//     { id: 'pointblank:hawk_scope',       circuit: 16, lenses: 4, screws: 6, plates: 3 },
  //  { id: 'pointblank:wolf_scope',       circuit: 17, lenses: 4, screws: 6, plates: 3 },
 //   { id: 'pointblank:precision_scope',  circuit: 18, lenses: 5, screws: 8, plates: 4 },
 //   { id: 'pointblank:pu_scope',         circuit: 19, lenses: 3, screws: 5, plates: 2 },
 //   { id: 'pointblank:rspec',            circuit: 20, lenses: 5, screws: 8, plates: 4 },

    // =========================
    // ATTACHMENTS (warfactory-lite-gun-progression-notes.md §5.3)
    // Gated by attachment FUNCTION, not by which gun/mod it belongs to - a WW-era
    // bayonet and a modern one cost the same, since the design principle is "what does
    // this part do", not "what pack did it ship in". This is the least-verified part of
    // the progression brief (no prior in-pack attachment recipes existed to extend), so
    // category placement calls (particularly the WW-era optics and ronmc misc parts,
    // which don't map cleanly onto the doc's tacz-centric naming) are our own judgment.
    // =========================

    // Grips & stocks, extended magazines, muzzle devices, bayonets, sights,
    // scopes, suppressors, lasers/lights and ammo mods now all live in
    // zz_attachment_tiers.js (tiered materials + fixed the circuit-collision
    // bug this attachmentGroup helper has whenever a group has 2+ items with
    // identical inputs). Moved out of here rather than left duplicated,
    // because KubeJS's event.remove() can't remove a recipe added by another
    // KubeJS script in the same event, so keeping both copies around would
    // just mean two competing recipes for the same output.

    // Steel ring (Extruder) — GTCEu auto-generates this recipe but something removes it;
    // restore it manually. Used in barrel mounts and aerial bomb fin rings.
    event.recipes.gtceu.extruder('kubejs:gtceu_steel_ring')
    .itemInputs('gtceu:steel_ingot')
    .notConsumable('gtceu:ring_extruder_mold')
    .itemOutputs(Item.of('gtceu:steel_ring'))
    .duration(200)
    .EUt(16);

    // WW-era optics (LV, tied to the same era as the WW1/WW2 guns they mount to) -
    // simple ground-glass scopes, not the precision MV/HV tacz line below
    event.recipes.gtceu.assembler('attachment_ww_optic_ww_m82')
    .itemInputs([Item.of('gtceu:glass_lens', 1), Item.of('gtceu:treated_wood_plate', 1), Item.of('gtceu:steel_screw', 1)])
    .itemOutputs(Item.of('tacz:attachment', 1, '{AttachmentId:"ww:m82"}'))
    .duration(150)
    .EUt(32);

    event.recipes.gtceu.assembler('attachment_ww_optic_ww_no32')
    .itemInputs([Item.of('gtceu:glass_lens', 1), Item.of('gtceu:treated_wood_plate', 1), Item.of('gtceu:steel_screw', 1)])
    .itemOutputs(Item.of('tacz:attachment', 1, '{AttachmentId:"ww:no32"}'))
    .duration(150)
    .EUt(32);

    event.recipes.gtceu.assembler('attachment_ww_optic_ww_peyu')
    .itemInputs([Item.of('gtceu:glass_lens', 1), Item.of('gtceu:treated_wood_plate', 1), Item.of('gtceu:steel_screw', 1)])
    .itemOutputs(Item.of('tacz:attachment', 1, '{AttachmentId:"ww:peyu"}'))
    .duration(150)
    .EUt(32);

    event.recipes.gtceu.assembler('attachment_ww_optic_ww_pyu')
    .itemInputs([Item.of('gtceu:glass_lens', 1), Item.of('gtceu:treated_wood_plate', 1), Item.of('gtceu:steel_screw', 1)])
    .itemOutputs(Item.of('tacz:attachment', 1, '{AttachmentId:"ww:pyu"}'))
    .duration(150)
    .EUt(32);

    event.recipes.gtceu.assembler('attachment_ww_optic_ww_zf39')
    .itemInputs([Item.of('gtceu:glass_lens', 1), Item.of('gtceu:treated_wood_plate', 1), Item.of('gtceu:steel_screw', 1)])
    .itemOutputs(Item.of('tacz:attachment', 1, '{AttachmentId:"ww:zf39"}'))
    .duration(150)
    .EUt(32);

    event.recipes.gtceu.assembler('attachment_ww_optic_ww_zf4')
    .itemInputs([Item.of('gtceu:glass_lens', 1), Item.of('gtceu:treated_wood_plate', 1), Item.of('gtceu:steel_screw', 1)])
    .itemOutputs(Item.of('tacz:attachment', 1, '{AttachmentId:"ww:zf4"}'))
    .duration(150)
    .EUt(32);

    // Sights, scopes, suppressors, lasers/lights and ammo mods: see the note
    // above the attachmentGroup calls at the top of this file - all moved to
    // zz_attachment_tiers.js.
});
