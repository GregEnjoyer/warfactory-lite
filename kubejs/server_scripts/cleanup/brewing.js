// Brewing is disabled in this pack.
//
// Potion brewing in 1.20.1 is hardcoded (not a data-driven recipe), so the brew step itself is
// hard-blocked in the wfcore mod via a Forge PotionBrewEvent.Pre handler (cancels every brew).
// Here we additionally strip the brewing stand's crafting recipe so it can't be obtained in
// survival, and the stand is hidden from JEI (see client_scripts/hide_items.js).
ServerEvents.recipes(event => {
    event.remove({ output: 'minecraft:brewing_stand' })
})
