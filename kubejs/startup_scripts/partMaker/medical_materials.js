// Materials backing the Warfactory Medical processing chain.
// GTCEu auto-generates the dust item + its texture from color + iconSet,
// so no hand-drawn PNG is needed.
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
})
