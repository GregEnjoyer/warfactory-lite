ServerEvents.recipes((event) => {
  event.shaped("1x ae2:interface", ["PGP", "ACF", "PGP"], {
    P: "#forge:plates/steel",
    G: "#forge:glass",
    A: "ae2:annihilation_core",
    F: "ae2:formation_core",
    C: "gtceu:lv_conveyor_module",
  });
  event.shaped("1x ae2:pattern_provider", ["PGP", "ACF", "PGP"], {
    P: "#forge:plates/steel",
    G: "minecraft:crafting_table",
    A: "ae2:annihilation_core",
    F: "ae2:formation_core",
    C: "gtceu:lv_conveyor_module",
  });
  event.shaped("2x ae2:interface", ["PGP", "ACF", "PGP"], {
    P: "#forge:plates/aluminium",
    G: "#forge:glass",
    A: "ae2:annihilation_core",
    F: "ae2:formation_core",
    C: "gtceu:mv_conveyor_module",
  });
  event.shaped("2x ae2:pattern_provider", ["PGP", "ACF", "PGP"], {
    P: "#forge:plates/aluminium",
    G: "minecraft:crafting_table",
    A: "ae2:annihilation_core",
    F: "ae2:formation_core",
    C: "gtceu:mv_conveyor_module",
  });
  event.shaped("3x ae2:interface", ["PGP", "ACF", "PGP"], {
    P: "#forge:plates/stainless_steel",
    G: "#forge:glass",
    A: "ae2:annihilation_core",
    F: "ae2:formation_core",
    C: "gtceu:hv_conveyor_module",
  });
  event.shaped("3x ae2:pattern_provider", ["PGP", "ACF", "PGP"], {
    P: "#forge:plates/stainless_steel",
    G: "minecraft:crafting_table",
    A: "ae2:annihilation_core",
    F: "ae2:formation_core",
    C: "gtceu:hv_conveyor_module",
  });
  event.shaped("4x ae2:interface", ["PGP", "ACF", "PGP"], {
    P: "#forge:plates/titanium",
    G: "#forge:glass",
    A: "ae2:annihilation_core",
    F: "ae2:formation_core",
    C: "gtceu:ev_conveyor_module",
  });
  event.shaped("4x ae2:pattern_provider", ["PGP", "ACF", "PGP"], {
    P: "#forge:plates/titanium",
    G: "minecraft:crafting_table",
    A: "ae2:annihilation_core",
    F: "ae2:formation_core",
    C: "gtceu:ev_conveyor_module",
  });
});
