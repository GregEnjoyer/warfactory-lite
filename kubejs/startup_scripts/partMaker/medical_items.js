// Plain (non-GregTech) items backing the medical crafting chains.
StartupEvents.registry('item', event => {
    // Fabric — cloth woven from string; the base material for bandages and tourniquets.
    // Reuses the vanilla wool texture (like solid_rocket_fuel reuses stock_plastic) so no PNG is needed.
    event.create('fabric')
        .texture('minecraft:block/white_wool')
        .maxStackSize(64)
        .displayName('Fabric')
})
