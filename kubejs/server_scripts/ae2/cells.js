ServerEvents.recipes((event) => {
  const greg = event.recipes.gtceu;

  event.remove({ output: "ae2:item_storage_cell_1k" });
  greg
    .canner("gtceu:1k_storage_cell")
    .itemInputs(
      "ae2:item_cell_housing",
      "ae2:cell_component_1k"
    )
    .itemOutputs("ae2:item_storage_cell_1k")
    .duration(100)
    .EUt(1);
  event.remove({ output: "ae2:fluid_storage_cell_1k" });
  greg
    .canner("gtceu:1k_fluid_storage_cell")
    .itemInputs(
      "ae2:fluid_cell_housing",
      "ae2:cell_component_1k"
    )
    .itemOutputs("ae2:fluid_storage_cell_1k")
    .duration(100)
    .EUt(1);

  event.remove({ output: "ae2:item_storage_cell_4k" });
  greg
    .canner("gtceu:4k_storage_cell")
    .itemInputs(
      "ae2:item_cell_housing",
      "ae2:cell_component_4k"
    )
    .itemOutputs("ae2:item_storage_cell_4k")
    .duration(100)
    .EUt(4);
  event.remove({ output: "ae2:fluid_storage_cell_4k" });
  greg
    .canner("gtceu:4k_fluid_storage_cell")
    .itemInputs(
      "ae2:fluid_cell_housing",
      "ae2:cell_component_4k"
    )
    .itemOutputs("ae2:fluid_storage_cell_4k")
    .duration(100)
    .EUt(4);

  event.remove({ output: "ae2:item_storage_cell_16k" });
  greg
    .canner("gtceu:16k_storage_cell")
    .itemInputs(
      "ae2:item_cell_housing",
      "ae2:cell_component_16k"
    )
    .itemOutputs("ae2:item_storage_cell_16k")
    .duration(100)
    .EUt(16);
  event.remove({ output: "ae2:fluid_storage_cell_16k" });
  greg
    .canner("gtceu:16k_fluid_storage_cell")
    .itemInputs(
      "ae2:fluid_cell_housing",
      "ae2:cell_component_16k"
    )
    .itemOutputs("ae2:fluid_storage_cell_16k")
    .duration(100)
    .EUt(16);

  event.remove({ output: "ae2:item_storage_cell_64k" });
  greg
    .canner("gtceu:64k_storage_cell")
    .itemInputs(
      "ae2:item_cell_housing",
      "ae2:cell_component_64k"
    )
    .itemOutputs("ae2:item_storage_cell_64k")
    .duration(100)
    .EUt(64);
  event.remove({ output: "ae2:fluid_storage_cell_64k" });
  greg
    .canner("gtceu:64k_fluid_storage_cell")
    .itemInputs(
      "ae2:fluid_cell_housing",
      "ae2:cell_component_64k"
    )
    .itemOutputs("ae2:fluid_storage_cell_64k")
    .duration(100)
    .EUt(64);

  event.remove({ output: "ae2:item_storage_cell_256k" });
  greg
    .canner("gtceu:256k_storage_cell")
    .itemInputs(
      "ae2:item_cell_housing",
      "ae2:cell_component_256k"
    )
    .itemOutputs("ae2:item_storage_cell_256k")
    .duration(100)
    .EUt(256);
  event.remove({ output: "ae2:fluid_storage_cell_256k" });
  greg
    .canner("gtceu:256k_fluid_storage_cell")
    .itemInputs(
      "ae2:fluid_cell_housing",
      "ae2:cell_component_256k"
    )
    .itemOutputs("ae2:fluid_storage_cell_256k")
    .duration(100)
    .EUt(256);

  // View Cell
  event.remove({ output: "ae2:view_cell" });
  greg
    .canner("gtceu:view_cell")
    .itemInputs("ae2:item_cell_housing", "gtceu:certus_quartz_gem")
    .itemOutputs("ae2:view_cell")
    .duration(100)
    .EUt(4);

  //ME Storage Housing
  event.remove({ output: "ae2:item_cell_housing" });
  event.shaped("ae2:item_cell_housing", ["GPG", "WCW", "PPP"], {
    G: "ae2:quartz_glass",
    P: "#forge:plates/steel",
    W: "#forge:fine_wires/red_alloy",
    C: "#gtceu:circuits/lv",
  });

  //Fluid Storage Housing
  event.remove({ output: "ae2:fluid_cell_housing" });
  event.shaped("2x ae2:fluid_cell_housing", ["GPG", "WCW", "PPP"], {
    G: "ae2:quartz_glass",
    P: "#forge:plates/ruby",
    W: "gtceu:simple_soc",
    C: "#gtceu:circuits/ev",
  });
});
