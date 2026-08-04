ServerEvents.recipes(event => {
const shitItems = [
        { id: 'superbwarfare:tungsten_ingot'},
        { id: 'superbwarfare:copper_plate'},
        { id: 'superbwarfare:tungsten_rod'},
        { id: 'superbwarfare:steel_ingot'},
        { id: 'superbwarfare:lead_ingot'},
        { id: 'superbwarfare:silver_ingot'},
        { id: 'superbwarfare:galena'},
        { id: 'superbwarfare:deepslate_galena_ore'},
        { id: 'superbwarfare:galena_ore'},
        { id: 'superbwarfare:deepslate_scheelite_ore'},
        { id: 'superbwarfare:scheelite_ore'},
        { id: 'superbwarfare:deepslate_silver_ore'},
        { id: 'superbwarfare:silver_ore'},
    ];

    shitItems.forEach(item => {
        // Remove only the recipes that PRODUCE these superbwarfare items, so GregTech stays the
        // canonical source.
        //
        // Do NOT also remove by { input: item.id }. Superb Warfare unifies these items into the
        // shared forge material tags (superbwarfare:copper_plate is in #forge:plates/copper;
        // steel/lead/silver/tungsten ingots are in #forge:ingots/*). KubeJS's `input` filter matches
        // any recipe whose ingredient *accepts* the item — including via that tag — so removing by
        // input also deletes every GregTech recipe that consumes a copper plate / steel / lead /
        // silver / tungsten through the forge tag (e.g. the copper-foil forge-hammer recipe). That
        // wiped a large swath of default GT recipes. SBW's own recipes that consume these items are
        // already stripped in cleanup/remove_crafting.js (whole-namespace crafting/smelting removal).
        event.remove({ output: item.id })
})
})