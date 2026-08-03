ServerEvents.recipes((event) => {
  event.remove({ id: "ae2:network/crafting/molecular_assembler" });

  event.shaped("1x ae2:molecular_assembler", ["PGP", "ACF", "PGP"], {
    P: "#forge:plates/stainless_steel",
    G: "ae2:quartz_glass",
    A: "ae2:annihilation_core",
    F: "ae2:formation_core",
    C: "gtceu:hv_conveyor_module",
  });

  event.shaped("4x ae2:molecular_assembler", ["PGP", "ACF", "PGP"], {
    P: "#forge:plates/titanium",
    G: "ae2:quartz_glass",
    A: "ae2:annihilation_core",
    F: "ae2:formation_core",
    C: "gtceu:ev_conveyor_module",
  });

  event.shaped("16x ae2:molecular_assembler", ["PGP", "ACF", "PGP"], {
    P: "#forge:plates/tungsten_steel",
    G: "ae2:quartz_glass",
    A: "ae2:annihilation_core",
    F: "ae2:formation_core",
    C: "gtceu:iv_conveyor_module",
  });
});
