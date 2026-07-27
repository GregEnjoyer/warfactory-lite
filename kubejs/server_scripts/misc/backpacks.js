// Sophisticated Backpacks: gate the whole system behind GregTech.
//
// Strip EVERY recipe the mod ships (plain backpack, the copper/iron/gold/diamond/netherite tier
// "backpack_upgrade" crafts, the upgrade_base, every upgrade item, and backpack dyeing) so none of
// it is table-craftable, then re-add ONLY the plain unupgraded backpack as an LV assembler recipe.
// The now-unobtainable tier backpacks and upgrades are hidden from JEI in
// client_scripts/hide_items.js.
ServerEvents.recipes(event => {

    // Every recipe in the mod's namespace: basic_backpack, backpack_upgrade (tier packs),
    // upgrade_base, all *_upgrade crafts, and backpack_dye. One namespace clears the lot.
    event.remove({ mod: 'sophisticatedbackpacks' })

    // Heavy Duty Fabric (the leather substitute) is woven from polyethylene. The requested
    // "fine polyethylene wire" doesn't exist in GTCEu — polyethylene is a polymer with no wire form —
    // so we use its foil, the closest thin drawn form. Assembled at LV into the fabric sheet
    // (gtceu:heavy_duty_fabric_plate); the material itself is registered in
    // startup_scripts/partMaker/New_materials.js.
    event.recipes.gtceu.assembler('heavy_duty_fabric')
        .itemInputs(Item.of('gtceu:polyethylene_foil', 4))
        .itemOutputs(Item.of('gtceu:heavy_duty_fabric_plate'))
        .duration(120)
        .EUt(32)

    // Re-add only the plain backpack, now assembled at LV (EU/t 32). Same chest + string as the vanilla
    // recipe, but the leather is replaced with heavy duty fabric, so it slots into the GregTech
    // progression instead of the crafting table.
    event.recipes.gtceu.assembler('lv_backpack')
        .itemInputs(
            Item.of('minecraft:chest'),
            Item.of('gtceu:heavy_duty_fabric_plate', 3),
            Item.of('minecraft:string', 4)
        )
        .itemOutputs(Item.of('sophisticatedbackpacks:backpack'))
        .duration(200)
        .EUt(32)
})
