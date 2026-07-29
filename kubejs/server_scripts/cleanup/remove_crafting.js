// Strip all crafting-table recipes from TaCZ + Superb Warfare (and its addons) so the
// GregTech progression is the only way to obtain their items.
//
// This centralizes what used to live at the top of Gun_and_Ammo.js and additionally
// removes TaCZ's vanilla crafting-table recipes. Our own recipes are all `gtceu:*` types,
// which none of the `mod`/`type` filters below can match, so nothing we add is affected.
ServerEvents.recipes(event => {

    // Every vanilla crafting-table recipe shipped by these namespaces.
    const NAMESPACES = ['tacz', 'superbwarfare', 'sbw_advanced_ciws', 'sbwdroneconfig', 'ashvehicle', 'mcsp']
    const CRAFT_TYPES = ['minecraft:crafting_shaped', 'minecraft:crafting_shapeless']
    NAMESPACES.forEach(mod => CRAFT_TYPES.forEach(type => event.remove({ mod: mod, type: type })))

    // TaCZ funnels every gun/ammo/attachment through its own gunsmith-table type.
    event.remove({ type: 'tacz:gun_smith_table_crafting' })

    // Superb Warfare's other shared vanilla types (scoped to its namespace so we don't nuke
    // other mods' recipes of the same types).
    event.remove({ mod: 'superbwarfare', type: 'minecraft:smithing_transform' })
    event.remove({ mod: 'superbwarfare', type: 'minecraft:blasting' })
    event.remove({ mod: 'superbwarfare', type: 'minecraft:smelting' })
    event.remove({ mod: 'superbwarfare', type: 'forge:nbt' })

    // Superb Warfare's / addon custom recipe types (blueprint research, vehicle assembling, etc.).
    const CUSTOM_TYPES = [
        'superbwarfare:researching',
        'superbwarfare:vehicle_assembling', // covers superbwarfare + all 3 addons
        'superbwarfare:vehicle_reset',
        'superbwarfare:smoke_dye',
        'superbwarfare:potion_mortar_shell',
        'ashvehicle:jerry_can_refill',
    ]
    CUSTOM_TYPES.forEach(type => event.remove({ type: type }))

    // Potion-effect mortar: belt-and-suspenders removal of ANY recipe that outputs the potion mortar
    // shell (the `superbwarfare:potion_mortar_shell` type above already covers its dedicated recipe;
    // this also catches any crafting/other recipe from any source). The item itself is hidden from
    // JEI in client_scripts/hide_items.js.
    event.remove({ output: 'superbwarfare:potion_mortar_shell' })

    // GTCEu jetpacks — removed from progression; all recipe types (crafting + assembler).
    ;['gtceu:liquid_fuel_jetpack', 'gtceu:electric_jetpack', 'gtceu:advanced_electric_jetpack']
        .forEach(id => event.remove({ output: id }))
})
