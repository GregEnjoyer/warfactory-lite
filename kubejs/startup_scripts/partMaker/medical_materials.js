// Materials backing the Warfactory Medical processing chain.
// GTCEu auto-generates the dust item + its texture from color + iconSet,
// so no hand-drawn PNG is needed.
//
// Domain-specific by design: this cohesive chain keeps its own file. Generic
// pack materials + stock-material shape mods live in ../materials.js (the hub).
GTCEuStartupEvents.registry('gtceu:material', event => {
    // Crushed poppy — the macerated form of poppy flowers, leached for morphine.
    event.create('poppy')
        .dust()
        .color(0xB0202E).iconSet(GTMaterialIconSet.ROUGH)

    // Blood — extracted from bone meal, filled into blood bags.
    event.create('blood')
        .liquid()
        .color(0x8A0303).iconSet(GTMaterialIconSet.DULL)

    // Morphine — leached from crushed poppy with ethanol; canned into morphine syringes.
    event.create('morphine')
        .liquid()
        .color(0xC9A227).iconSet(GTMaterialIconSet.DULL)

    // Naloxone — morphine reacted with salt (parody chemistry); the opioid-reversal agent.
    event.create('naloxone')
        .liquid()
        .color(0x2E86C1).iconSet(GTMaterialIconSet.DULL)

    // ---- Analgesic / anesthetic / hemostatic / stimulant chains (all parody chemistry) ----

    // Lidocaine — aromatic-amide local anesthetic; canned into the local anesthetic injector.
    event.create('lidocaine')
        .liquid()
        .color(0xEAE6D9).iconSet(GTMaterialIconSet.DULL)

    // Coagulant — calcium-activated clotting factors precipitated from blood; dusts the hemostatic gauze.
    event.create('coagulant')
        .dust()
        .color(0xD9C27A).iconSet(GTMaterialIconSet.ROUGH)

    // Amphetamine — stimulant precursor for Combat Stimulant I.
    event.create('amphetamine')
        .liquid()
        .color(0xE8F0F5).iconSet(GTMaterialIconSet.DULL)

    // Epinephrine — adrenaline precursor for Combat Stimulant I.
    event.create('epinephrine')
        .liquid()
        .color(0xF5E8EC).iconSet(GTMaterialIconSet.DULL)

    // Combat stim serum — morphine + amphetamine + epinephrine blend; canned into the autoinjector.
    event.create('combat_stim')
        .liquid()
        .color(0xC0392B).iconSet(GTMaterialIconSet.DULL)
})
