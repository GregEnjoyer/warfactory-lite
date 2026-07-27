// Tiered ballistic-panel intermediates for the Brimm armor GT crafting chains.
// Bending Machine shapes GT metal plates into a curved panel "core"; the Assembler then
// combines panels + soft-armor polymers into the finished brimm:* armor piece.
// See server_scripts/brimm/armor_tiers.js for the recipes and config/brimm/overrides/*.xml
// for the rescaled LV->EV stat tiers.
StartupEvents.registry('item', event => {
    event.create('ballistic_panel_lv').texture('kubejs:item/ballistic_panel_lv').maxStackSize(64).displayName('Hardened Steel Ballistic Panel')
    event.create('ballistic_panel_mv').texture('kubejs:item/ballistic_panel_mv').maxStackSize(64).displayName('Aramid-Aluminium Ballistic Panel')
    event.create('ballistic_panel_hv').texture('kubejs:item/ballistic_panel_hv').maxStackSize(64).displayName('Titanium Composite Ballistic Panel')
    event.create('ballistic_panel_ev').texture('kubejs:item/ballistic_panel_ev').maxStackSize(64).displayName('Carbon-Tungsten Ballistic Panel')
})
