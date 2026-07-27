// Hide items from JEI (the pack's recipe viewer). Client-side — JEI is client-only.
//
// Hiding removes the entry from the JEI item list and recipe lookups; it does not unregister the
// item (KubeJS can't remove another mod's registered items), and any surviving way to obtain one
// still works — which is why the corresponding recipes are also stripped server-side
// (see server_scripts/cleanup/remove_crafting.js).
JEIEvents.hideItems(event => {
    // Superb Warfare potion-effect mortar shell.
    event.hide('superbwarfare:potion_mortar_shell')
    // Brewing is disabled (brew step blocked in wfcore; craft removed) — hide the now-unobtainable stand.
    event.hide('minecraft:brewing_stand')
    // Vanilla potions — unobtainable now that brewing is disabled. Hiding by item id (no NBT) matches
    // every potion-effect variant, so all of them drop out of JEI at once.
    event.hide('minecraft:potion')
    event.hide('minecraft:splash_potion')
    event.hide('minecraft:lingering_potion')

    // GTMThings wireless hatches — every tier & amperage of the energy in/out, laser source/target,
    // computation rx/tx and energy-hatch-provider blocks (~250 variants), too many to list. Their
    // recipes are already stripped in server_scripts/cleanup/mod_removals.js; this hides the blocks from
    // JEI. Non-hatch wireless gear (covers, binding tool, terminal, monitor, interface) is left visible.
    // NB: coerce id to a JS string (`'' + id`) so .startsWith/.includes exist regardless of Rhino's
    // Java/JS string handling; collect first, then hide, to avoid mutating while iterating.
    var gtmWirelessHatches = []
    event.getAllIngredients().forEach(stack => {
        var sid = '' + stack.id
        if (sid.startsWith('gtmthings:') && sid.includes('wireless') && sid.includes('hatch')) {
            gtmWirelessHatches.push(stack)
        }
    })
    gtmWirelessHatches.forEach(stack => event.hide(stack))

    // AE2 cable facades — one NBT variant per wrapped block, so JEI lists hundreds of them (pure clutter).
    // Item-id hide (no NBT) matches every facade variant at once.
    event.hide('ae2:facade')

    // Non-hazmat armor is uncraftable now (see server_scripts/cleanup/armor.js) — hide it from JEI. Matches
    // all vanilla armor pieces and the GT Nanomuscle/QuarkTech suits; hazmat (gtceu:hazmat_*) stays visible.
    var armorRe = /^(minecraft:(leather|chainmail|iron|golden|diamond|netherite|turtle)_(helmet|chestplate|leggings|boots)|gtceu:(advanced_)?(nanomuscle|quarktech)_(helmet|chestplate|leggings|boots))$/
    var disabledArmor = []
    event.getAllIngredients().forEach(stack => {
        if (armorRe.test('' + stack.id)) disabledArmor.push(stack)
    })
    disabledArmor.forEach(stack => event.hide(stack))

    // All enchanted books — one NBT variant per enchantment/level, so JEI lists hundreds. Item-id hide
    // (no NBT) removes every variant at once.
    event.hide('minecraft:enchanted_book')
})
