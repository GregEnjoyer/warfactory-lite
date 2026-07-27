// Hazmat is the only craftable armor in this pack — it's the gas/hazard protection (see wfcore's
// WFBallisticsGasMaskMixin, which makes a full PPE/hazmat set immune to wfballistics gas). Strip crafting
// for every other armor: all vanilla armor pieces and the GregTech Nanomuscle/QuarkTech suits. The
// GregTech Hazmat pieces (gtceu:hazmat_*) are intentionally NOT listed, so they stay craftable.
ServerEvents.recipes(event => {
    // All vanilla armor (leather/chainmail/iron/gold/diamond/netherite/turtle) — trimmable_armor is a
    // vanilla-only item tag covering exactly the vanilla armor pieces (no mod contributes to it).
    event.remove({ output: '#minecraft:trimmable_armor' })

    // GregTech armor suits: Nanomuscle + QuarkTech (incl. the advanced chestplates). Hazmat is omitted.
    const GT_ARMOR = [
        'gtceu:nanomuscle_helmet', 'gtceu:nanomuscle_chestplate', 'gtceu:nanomuscle_leggings', 'gtceu:nanomuscle_boots',
        'gtceu:quarktech_helmet', 'gtceu:quarktech_chestplate', 'gtceu:quarktech_leggings', 'gtceu:quarktech_boots',
        'gtceu:advanced_nanomuscle_chestplate', 'gtceu:advanced_quarktech_chestplate'
    ]
    GT_ARMOR.forEach(id => event.remove({ output: id }))
})
