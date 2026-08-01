// Disable EVERY SecurityCraft recipe. The permitted subset is re-added as GregTech (LV
// assembler) recipes in server_scripts/securitycraft_recipes.js — self-contained from GT/
// vanilla materials — so the reinforced/"hardened" blocks and all intermediate SC items
// (reinforced glass/hopper/redstone, portable radar, block-pocket parts, mines, …) stay
// permanently uncraftable. `mod:` matches the recipe id namespace, so this removes only
// SecurityCraft-authored recipes and never our gtceu:/kubejs: re-adds.
ServerEvents.recipes(event => {
    event.remove({ mod: 'securitycraft' })
})
