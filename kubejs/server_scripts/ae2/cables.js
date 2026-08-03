ServerEvents.recipes((event) => {
  const greg = event.recipes.gtceu;

  // white / smart
  event.remove({ id: "ae2:network/cables/smart_fluix_clean" });
  event.remove({ id: "ae2:network/cables/dense_smart_fluix_clean" });
  event.remove({ id: "ae2:network/cables/dense_covered_fluix_clean" });
  event.remove({ id: "ae2:network/cables/smart_white" });
  event.remove({ id: "ae2:network/cables/dense_smart_white" });
  event.remove({ id: "ae2:network/cables/dense_covered_white" });
  greg.chemical_bath("gtceu:white_smart_cable").itemInputs("ae2:fluix_smart_cable").inputFluids("gtceu:white_dye 18").itemOutputs("ae2:white_smart_cable").duration(40).EUt(16);
  greg.chemical_bath("gtceu:un_white_smart_cable").itemInputs("ae2:white_smart_cable").inputFluids("gtceu:chlorine 10").itemOutputs("ae2:fluix_smart_cable").duration(40).EUt(16);

  // white / covered
  event.remove({ id: "ae2:network/cables/covered_fluix_clean" });
  event.remove({ id: "ae2:network/cables/dense_smart_fluix_clean" });
  event.remove({ id: "ae2:network/cables/dense_covered_fluix_clean" });
  event.remove({ id: "ae2:network/cables/covered_white" });
  event.remove({ id: "ae2:network/cables/dense_smart_white" });
  event.remove({ id: "ae2:network/cables/dense_covered_white" });
  greg.chemical_bath("gtceu:white_covered_cable").itemInputs("ae2:fluix_covered_cable").inputFluids("gtceu:white_dye 18").itemOutputs("ae2:white_covered_cable").duration(40).EUt(16);
  greg.chemical_bath("gtceu:un_white_covered_cable").itemInputs("ae2:white_covered_cable").inputFluids("gtceu:chlorine 10").itemOutputs("ae2:fluix_covered_cable").duration(40).EUt(16);

  // white / glass
  event.remove({ id: "ae2:network/cables/glass_fluix_clean" });
  event.remove({ id: "ae2:network/cables/dense_smart_fluix_clean" });
  event.remove({ id: "ae2:network/cables/dense_covered_fluix_clean" });
  event.remove({ id: "ae2:network/cables/glass_white" });
  event.remove({ id: "ae2:network/cables/dense_smart_white" });
  event.remove({ id: "ae2:network/cables/dense_covered_white" });
  greg.chemical_bath("gtceu:white_glass_cable").itemInputs("ae2:fluix_glass_cable").inputFluids("gtceu:white_dye 18").itemOutputs("ae2:white_glass_cable").duration(40).EUt(16);
  greg.chemical_bath("gtceu:un_white_glass_cable").itemInputs("ae2:white_glass_cable").inputFluids("gtceu:chlorine 10").itemOutputs("ae2:fluix_glass_cable").duration(40).EUt(16);

  // white / covered_dense
  event.remove({ id: "ae2:network/cables/covered_dense_fluix_clean" });
  event.remove({ id: "ae2:network/cables/dense_smart_fluix_clean" });
  event.remove({ id: "ae2:network/cables/dense_covered_fluix_clean" });
  event.remove({ id: "ae2:network/cables/covered_dense_white" });
  event.remove({ id: "ae2:network/cables/dense_smart_white" });
  event.remove({ id: "ae2:network/cables/dense_covered_white" });
  greg.chemical_bath("gtceu:white_covered_dense_cable").itemInputs("ae2:fluix_covered_dense_cable").inputFluids("gtceu:white_dye 18").itemOutputs("ae2:white_covered_dense_cable").duration(40).EUt(16);
  greg.chemical_bath("gtceu:un_white_covered_dense_cable").itemInputs("ae2:white_covered_dense_cable").inputFluids("gtceu:chlorine 10").itemOutputs("ae2:fluix_covered_dense_cable").duration(40).EUt(16);

  // white / smart_dense
  event.remove({ id: "ae2:network/cables/smart_dense_fluix_clean" });
  event.remove({ id: "ae2:network/cables/dense_smart_fluix_clean" });
  event.remove({ id: "ae2:network/cables/dense_covered_fluix_clean" });
  event.remove({ id: "ae2:network/cables/smart_dense_white" });
  event.remove({ id: "ae2:network/cables/dense_smart_white" });
  event.remove({ id: "ae2:network/cables/dense_covered_white" });
  greg.chemical_bath("gtceu:white_smart_dense_cable").itemInputs("ae2:fluix_smart_dense_cable").inputFluids("gtceu:white_dye 18").itemOutputs("ae2:white_smart_dense_cable").duration(40).EUt(16);
  greg.chemical_bath("gtceu:un_white_smart_dense_cable").itemInputs("ae2:white_smart_dense_cable").inputFluids("gtceu:chlorine 10").itemOutputs("ae2:fluix_smart_dense_cable").duration(40).EUt(16);

  // orange / smart
  event.remove({ id: "ae2:network/cables/smart_fluix_clean" });
  event.remove({ id: "ae2:network/cables/dense_smart_fluix_clean" });
  event.remove({ id: "ae2:network/cables/dense_covered_fluix_clean" });
  event.remove({ id: "ae2:network/cables/smart_orange" });
  event.remove({ id: "ae2:network/cables/dense_smart_orange" });
  event.remove({ id: "ae2:network/cables/dense_covered_orange" });
  greg.chemical_bath("gtceu:orange_smart_cable").itemInputs("ae2:fluix_smart_cable").inputFluids("gtceu:orange_dye 18").itemOutputs("ae2:orange_smart_cable").duration(40).EUt(16);
  greg.chemical_bath("gtceu:un_orange_smart_cable").itemInputs("ae2:orange_smart_cable").inputFluids("gtceu:chlorine 10").itemOutputs("ae2:fluix_smart_cable").duration(40).EUt(16);

  // orange / covered
  event.remove({ id: "ae2:network/cables/covered_fluix_clean" });
  event.remove({ id: "ae2:network/cables/dense_smart_fluix_clean" });
  event.remove({ id: "ae2:network/cables/dense_covered_fluix_clean" });
  event.remove({ id: "ae2:network/cables/covered_orange" });
  event.remove({ id: "ae2:network/cables/dense_smart_orange" });
  event.remove({ id: "ae2:network/cables/dense_covered_orange" });
  greg.chemical_bath("gtceu:orange_covered_cable").itemInputs("ae2:fluix_covered_cable").inputFluids("gtceu:orange_dye 18").itemOutputs("ae2:orange_covered_cable").duration(40).EUt(16);
  greg.chemical_bath("gtceu:un_orange_covered_cable").itemInputs("ae2:orange_covered_cable").inputFluids("gtceu:chlorine 10").itemOutputs("ae2:fluix_covered_cable").duration(40).EUt(16);

  // orange / glass
  event.remove({ id: "ae2:network/cables/glass_fluix_clean" });
  event.remove({ id: "ae2:network/cables/dense_smart_fluix_clean" });
  event.remove({ id: "ae2:network/cables/dense_covered_fluix_clean" });
  event.remove({ id: "ae2:network/cables/glass_orange" });
  event.remove({ id: "ae2:network/cables/dense_smart_orange" });
  event.remove({ id: "ae2:network/cables/dense_covered_orange" });
  greg.chemical_bath("gtceu:orange_glass_cable").itemInputs("ae2:fluix_glass_cable").inputFluids("gtceu:orange_dye 18").itemOutputs("ae2:orange_glass_cable").duration(40).EUt(16);
  greg.chemical_bath("gtceu:un_orange_glass_cable").itemInputs("ae2:orange_glass_cable").inputFluids("gtceu:chlorine 10").itemOutputs("ae2:fluix_glass_cable").duration(40).EUt(16);

  // orange / covered_dense
  event.remove({ id: "ae2:network/cables/covered_dense_fluix_clean" });
  event.remove({ id: "ae2:network/cables/dense_smart_fluix_clean" });
  event.remove({ id: "ae2:network/cables/dense_covered_fluix_clean" });
  event.remove({ id: "ae2:network/cables/covered_dense_orange" });
  event.remove({ id: "ae2:network/cables/dense_smart_orange" });
  event.remove({ id: "ae2:network/cables/dense_covered_orange" });
  greg.chemical_bath("gtceu:orange_covered_dense_cable").itemInputs("ae2:fluix_covered_dense_cable").inputFluids("gtceu:orange_dye 18").itemOutputs("ae2:orange_covered_dense_cable").duration(40).EUt(16);
  greg.chemical_bath("gtceu:un_orange_covered_dense_cable").itemInputs("ae2:orange_covered_dense_cable").inputFluids("gtceu:chlorine 10").itemOutputs("ae2:fluix_covered_dense_cable").duration(40).EUt(16);

  // orange / smart_dense
  event.remove({ id: "ae2:network/cables/smart_dense_fluix_clean" });
  event.remove({ id: "ae2:network/cables/dense_smart_fluix_clean" });
  event.remove({ id: "ae2:network/cables/dense_covered_fluix_clean" });
  event.remove({ id: "ae2:network/cables/smart_dense_orange" });
  event.remove({ id: "ae2:network/cables/dense_smart_orange" });
  event.remove({ id: "ae2:network/cables/dense_covered_orange" });
  greg.chemical_bath("gtceu:orange_smart_dense_cable").itemInputs("ae2:fluix_smart_dense_cable").inputFluids("gtceu:orange_dye 18").itemOutputs("ae2:orange_smart_dense_cable").duration(40).EUt(16);
  greg.chemical_bath("gtceu:un_orange_smart_dense_cable").itemInputs("ae2:orange_smart_dense_cable").inputFluids("gtceu:chlorine 10").itemOutputs("ae2:fluix_smart_dense_cable").duration(40).EUt(16);

  // magenta / smart
  event.remove({ id: "ae2:network/cables/smart_fluix_clean" });
  event.remove({ id: "ae2:network/cables/dense_smart_fluix_clean" });
  event.remove({ id: "ae2:network/cables/dense_covered_fluix_clean" });
  event.remove({ id: "ae2:network/cables/smart_magenta" });
  event.remove({ id: "ae2:network/cables/dense_smart_magenta" });
  event.remove({ id: "ae2:network/cables/dense_covered_magenta" });
  greg.chemical_bath("gtceu:magenta_smart_cable").itemInputs("ae2:fluix_smart_cable").inputFluids("gtceu:magenta_dye 18").itemOutputs("ae2:magenta_smart_cable").duration(40).EUt(16);
  greg.chemical_bath("gtceu:un_magenta_smart_cable").itemInputs("ae2:magenta_smart_cable").inputFluids("gtceu:chlorine 10").itemOutputs("ae2:fluix_smart_cable").duration(40).EUt(16);

  // magenta / covered
  event.remove({ id: "ae2:network/cables/covered_fluix_clean" });
  event.remove({ id: "ae2:network/cables/dense_smart_fluix_clean" });
  event.remove({ id: "ae2:network/cables/dense_covered_fluix_clean" });
  event.remove({ id: "ae2:network/cables/covered_magenta" });
  event.remove({ id: "ae2:network/cables/dense_smart_magenta" });
  event.remove({ id: "ae2:network/cables/dense_covered_magenta" });
  greg.chemical_bath("gtceu:magenta_covered_cable").itemInputs("ae2:fluix_covered_cable").inputFluids("gtceu:magenta_dye 18").itemOutputs("ae2:magenta_covered_cable").duration(40).EUt(16);
  greg.chemical_bath("gtceu:un_magenta_covered_cable").itemInputs("ae2:magenta_covered_cable").inputFluids("gtceu:chlorine 10").itemOutputs("ae2:fluix_covered_cable").duration(40).EUt(16);

  // magenta / glass
  event.remove({ id: "ae2:network/cables/glass_fluix_clean" });
  event.remove({ id: "ae2:network/cables/dense_smart_fluix_clean" });
  event.remove({ id: "ae2:network/cables/dense_covered_fluix_clean" });
  event.remove({ id: "ae2:network/cables/glass_magenta" });
  event.remove({ id: "ae2:network/cables/dense_smart_magenta" });
  event.remove({ id: "ae2:network/cables/dense_covered_magenta" });
  greg.chemical_bath("gtceu:magenta_glass_cable").itemInputs("ae2:fluix_glass_cable").inputFluids("gtceu:magenta_dye 18").itemOutputs("ae2:magenta_glass_cable").duration(40).EUt(16);
  greg.chemical_bath("gtceu:un_magenta_glass_cable").itemInputs("ae2:magenta_glass_cable").inputFluids("gtceu:chlorine 10").itemOutputs("ae2:fluix_glass_cable").duration(40).EUt(16);

  // magenta / covered_dense
  event.remove({ id: "ae2:network/cables/covered_dense_fluix_clean" });
  event.remove({ id: "ae2:network/cables/dense_smart_fluix_clean" });
  event.remove({ id: "ae2:network/cables/dense_covered_fluix_clean" });
  event.remove({ id: "ae2:network/cables/covered_dense_magenta" });
  event.remove({ id: "ae2:network/cables/dense_smart_magenta" });
  event.remove({ id: "ae2:network/cables/dense_covered_magenta" });
  greg.chemical_bath("gtceu:magenta_covered_dense_cable").itemInputs("ae2:fluix_covered_dense_cable").inputFluids("gtceu:magenta_dye 18").itemOutputs("ae2:magenta_covered_dense_cable").duration(40).EUt(16);
  greg.chemical_bath("gtceu:un_magenta_covered_dense_cable").itemInputs("ae2:magenta_covered_dense_cable").inputFluids("gtceu:chlorine 10").itemOutputs("ae2:fluix_covered_dense_cable").duration(40).EUt(16);

  // magenta / smart_dense
  event.remove({ id: "ae2:network/cables/smart_dense_fluix_clean" });
  event.remove({ id: "ae2:network/cables/dense_smart_fluix_clean" });
  event.remove({ id: "ae2:network/cables/dense_covered_fluix_clean" });
  event.remove({ id: "ae2:network/cables/smart_dense_magenta" });
  event.remove({ id: "ae2:network/cables/dense_smart_magenta" });
  event.remove({ id: "ae2:network/cables/dense_covered_magenta" });
  greg.chemical_bath("gtceu:magenta_smart_dense_cable").itemInputs("ae2:fluix_smart_dense_cable").inputFluids("gtceu:magenta_dye 18").itemOutputs("ae2:magenta_smart_dense_cable").duration(40).EUt(16);
  greg.chemical_bath("gtceu:un_magenta_smart_dense_cable").itemInputs("ae2:magenta_smart_dense_cable").inputFluids("gtceu:chlorine 10").itemOutputs("ae2:fluix_smart_dense_cable").duration(40).EUt(16);

  // light_blue / smart
  event.remove({ id: "ae2:network/cables/smart_fluix_clean" });
  event.remove({ id: "ae2:network/cables/dense_smart_fluix_clean" });
  event.remove({ id: "ae2:network/cables/dense_covered_fluix_clean" });
  event.remove({ id: "ae2:network/cables/smart_light_blue" });
  event.remove({ id: "ae2:network/cables/dense_smart_light_blue" });
  event.remove({ id: "ae2:network/cables/dense_covered_light_blue" });
  greg.chemical_bath("gtceu:light_blue_smart_cable").itemInputs("ae2:fluix_smart_cable").inputFluids("gtceu:light_blue_dye 18").itemOutputs("ae2:light_blue_smart_cable").duration(40).EUt(16);
  greg.chemical_bath("gtceu:un_light_blue_smart_cable").itemInputs("ae2:light_blue_smart_cable").inputFluids("gtceu:chlorine 10").itemOutputs("ae2:fluix_smart_cable").duration(40).EUt(16);

  // light_blue / covered
  event.remove({ id: "ae2:network/cables/covered_fluix_clean" });
  event.remove({ id: "ae2:network/cables/dense_smart_fluix_clean" });
  event.remove({ id: "ae2:network/cables/dense_covered_fluix_clean" });
  event.remove({ id: "ae2:network/cables/covered_light_blue" });
  event.remove({ id: "ae2:network/cables/dense_smart_light_blue" });
  event.remove({ id: "ae2:network/cables/dense_covered_light_blue" });
  greg.chemical_bath("gtceu:light_blue_covered_cable").itemInputs("ae2:fluix_covered_cable").inputFluids("gtceu:light_blue_dye 18").itemOutputs("ae2:light_blue_covered_cable").duration(40).EUt(16);
  greg.chemical_bath("gtceu:un_light_blue_covered_cable").itemInputs("ae2:light_blue_covered_cable").inputFluids("gtceu:chlorine 10").itemOutputs("ae2:fluix_covered_cable").duration(40).EUt(16);

  // light_blue / glass
  event.remove({ id: "ae2:network/cables/glass_fluix_clean" });
  event.remove({ id: "ae2:network/cables/dense_smart_fluix_clean" });
  event.remove({ id: "ae2:network/cables/dense_covered_fluix_clean" });
  event.remove({ id: "ae2:network/cables/glass_light_blue" });
  event.remove({ id: "ae2:network/cables/dense_smart_light_blue" });
  event.remove({ id: "ae2:network/cables/dense_covered_light_blue" });
  greg.chemical_bath("gtceu:light_blue_glass_cable").itemInputs("ae2:fluix_glass_cable").inputFluids("gtceu:light_blue_dye 18").itemOutputs("ae2:light_blue_glass_cable").duration(40).EUt(16);
  greg.chemical_bath("gtceu:un_light_blue_glass_cable").itemInputs("ae2:light_blue_glass_cable").inputFluids("gtceu:chlorine 10").itemOutputs("ae2:fluix_glass_cable").duration(40).EUt(16);

  // light_blue / covered_dense
  event.remove({ id: "ae2:network/cables/covered_dense_fluix_clean" });
  event.remove({ id: "ae2:network/cables/dense_smart_fluix_clean" });
  event.remove({ id: "ae2:network/cables/dense_covered_fluix_clean" });
  event.remove({ id: "ae2:network/cables/covered_dense_light_blue" });
  event.remove({ id: "ae2:network/cables/dense_smart_light_blue" });
  event.remove({ id: "ae2:network/cables/dense_covered_light_blue" });
  greg.chemical_bath("gtceu:light_blue_covered_dense_cable").itemInputs("ae2:fluix_covered_dense_cable").inputFluids("gtceu:light_blue_dye 18").itemOutputs("ae2:light_blue_covered_dense_cable").duration(40).EUt(16);
  greg.chemical_bath("gtceu:un_light_blue_covered_dense_cable").itemInputs("ae2:light_blue_covered_dense_cable").inputFluids("gtceu:chlorine 10").itemOutputs("ae2:fluix_covered_dense_cable").duration(40).EUt(16);

  // light_blue / smart_dense
  event.remove({ id: "ae2:network/cables/smart_dense_fluix_clean" });
  event.remove({ id: "ae2:network/cables/dense_smart_fluix_clean" });
  event.remove({ id: "ae2:network/cables/dense_covered_fluix_clean" });
  event.remove({ id: "ae2:network/cables/smart_dense_light_blue" });
  event.remove({ id: "ae2:network/cables/dense_smart_light_blue" });
  event.remove({ id: "ae2:network/cables/dense_covered_light_blue" });
  greg.chemical_bath("gtceu:light_blue_smart_dense_cable").itemInputs("ae2:fluix_smart_dense_cable").inputFluids("gtceu:light_blue_dye 18").itemOutputs("ae2:light_blue_smart_dense_cable").duration(40).EUt(16);
  greg.chemical_bath("gtceu:un_light_blue_smart_dense_cable").itemInputs("ae2:light_blue_smart_dense_cable").inputFluids("gtceu:chlorine 10").itemOutputs("ae2:fluix_smart_dense_cable").duration(40).EUt(16);

  // yellow / smart
  event.remove({ id: "ae2:network/cables/smart_fluix_clean" });
  event.remove({ id: "ae2:network/cables/dense_smart_fluix_clean" });
  event.remove({ id: "ae2:network/cables/dense_covered_fluix_clean" });
  event.remove({ id: "ae2:network/cables/smart_yellow" });
  event.remove({ id: "ae2:network/cables/dense_smart_yellow" });
  event.remove({ id: "ae2:network/cables/dense_covered_yellow" });
  greg.chemical_bath("gtceu:yellow_smart_cable").itemInputs("ae2:fluix_smart_cable").inputFluids("gtceu:yellow_dye 18").itemOutputs("ae2:yellow_smart_cable").duration(40).EUt(16);
  greg.chemical_bath("gtceu:un_yellow_smart_cable").itemInputs("ae2:yellow_smart_cable").inputFluids("gtceu:chlorine 10").itemOutputs("ae2:fluix_smart_cable").duration(40).EUt(16);

  // yellow / covered
  event.remove({ id: "ae2:network/cables/covered_fluix_clean" });
  event.remove({ id: "ae2:network/cables/dense_smart_fluix_clean" });
  event.remove({ id: "ae2:network/cables/dense_covered_fluix_clean" });
  event.remove({ id: "ae2:network/cables/covered_yellow" });
  event.remove({ id: "ae2:network/cables/dense_smart_yellow" });
  event.remove({ id: "ae2:network/cables/dense_covered_yellow" });
  greg.chemical_bath("gtceu:yellow_covered_cable").itemInputs("ae2:fluix_covered_cable").inputFluids("gtceu:yellow_dye 18").itemOutputs("ae2:yellow_covered_cable").duration(40).EUt(16);
  greg.chemical_bath("gtceu:un_yellow_covered_cable").itemInputs("ae2:yellow_covered_cable").inputFluids("gtceu:chlorine 10").itemOutputs("ae2:fluix_covered_cable").duration(40).EUt(16);

  // yellow / glass
  event.remove({ id: "ae2:network/cables/glass_fluix_clean" });
  event.remove({ id: "ae2:network/cables/dense_smart_fluix_clean" });
  event.remove({ id: "ae2:network/cables/dense_covered_fluix_clean" });
  event.remove({ id: "ae2:network/cables/glass_yellow" });
  event.remove({ id: "ae2:network/cables/dense_smart_yellow" });
  event.remove({ id: "ae2:network/cables/dense_covered_yellow" });
  greg.chemical_bath("gtceu:yellow_glass_cable").itemInputs("ae2:fluix_glass_cable").inputFluids("gtceu:yellow_dye 18").itemOutputs("ae2:yellow_glass_cable").duration(40).EUt(16);
  greg.chemical_bath("gtceu:un_yellow_glass_cable").itemInputs("ae2:yellow_glass_cable").inputFluids("gtceu:chlorine 10").itemOutputs("ae2:fluix_glass_cable").duration(40).EUt(16);

  // yellow / covered_dense
  event.remove({ id: "ae2:network/cables/covered_dense_fluix_clean" });
  event.remove({ id: "ae2:network/cables/dense_smart_fluix_clean" });
  event.remove({ id: "ae2:network/cables/dense_covered_fluix_clean" });
  event.remove({ id: "ae2:network/cables/covered_dense_yellow" });
  event.remove({ id: "ae2:network/cables/dense_smart_yellow" });
  event.remove({ id: "ae2:network/cables/dense_covered_yellow" });
  greg.chemical_bath("gtceu:yellow_covered_dense_cable").itemInputs("ae2:fluix_covered_dense_cable").inputFluids("gtceu:yellow_dye 18").itemOutputs("ae2:yellow_covered_dense_cable").duration(40).EUt(16);
  greg.chemical_bath("gtceu:un_yellow_covered_dense_cable").itemInputs("ae2:yellow_covered_dense_cable").inputFluids("gtceu:chlorine 10").itemOutputs("ae2:fluix_covered_dense_cable").duration(40).EUt(16);

  // yellow / smart_dense
  event.remove({ id: "ae2:network/cables/smart_dense_fluix_clean" });
  event.remove({ id: "ae2:network/cables/dense_smart_fluix_clean" });
  event.remove({ id: "ae2:network/cables/dense_covered_fluix_clean" });
  event.remove({ id: "ae2:network/cables/smart_dense_yellow" });
  event.remove({ id: "ae2:network/cables/dense_smart_yellow" });
  event.remove({ id: "ae2:network/cables/dense_covered_yellow" });
  greg.chemical_bath("gtceu:yellow_smart_dense_cable").itemInputs("ae2:fluix_smart_dense_cable").inputFluids("gtceu:yellow_dye 18").itemOutputs("ae2:yellow_smart_dense_cable").duration(40).EUt(16);
  greg.chemical_bath("gtceu:un_yellow_smart_dense_cable").itemInputs("ae2:yellow_smart_dense_cable").inputFluids("gtceu:chlorine 10").itemOutputs("ae2:fluix_smart_dense_cable").duration(40).EUt(16);

  // lime / smart
  event.remove({ id: "ae2:network/cables/smart_fluix_clean" });
  event.remove({ id: "ae2:network/cables/dense_smart_fluix_clean" });
  event.remove({ id: "ae2:network/cables/dense_covered_fluix_clean" });
  event.remove({ id: "ae2:network/cables/smart_lime" });
  event.remove({ id: "ae2:network/cables/dense_smart_lime" });
  event.remove({ id: "ae2:network/cables/dense_covered_lime" });
  greg.chemical_bath("gtceu:lime_smart_cable").itemInputs("ae2:fluix_smart_cable").inputFluids("gtceu:lime_dye 18").itemOutputs("ae2:lime_smart_cable").duration(40).EUt(16);
  greg.chemical_bath("gtceu:un_lime_smart_cable").itemInputs("ae2:lime_smart_cable").inputFluids("gtceu:chlorine 10").itemOutputs("ae2:fluix_smart_cable").duration(40).EUt(16);

  // lime / covered
  event.remove({ id: "ae2:network/cables/covered_fluix_clean" });
  event.remove({ id: "ae2:network/cables/dense_smart_fluix_clean" });
  event.remove({ id: "ae2:network/cables/dense_covered_fluix_clean" });
  event.remove({ id: "ae2:network/cables/covered_lime" });
  event.remove({ id: "ae2:network/cables/dense_smart_lime" });
  event.remove({ id: "ae2:network/cables/dense_covered_lime" });
  greg.chemical_bath("gtceu:lime_covered_cable").itemInputs("ae2:fluix_covered_cable").inputFluids("gtceu:lime_dye 18").itemOutputs("ae2:lime_covered_cable").duration(40).EUt(16);
  greg.chemical_bath("gtceu:un_lime_covered_cable").itemInputs("ae2:lime_covered_cable").inputFluids("gtceu:chlorine 10").itemOutputs("ae2:fluix_covered_cable").duration(40).EUt(16);

  // lime / glass
  event.remove({ id: "ae2:network/cables/glass_fluix_clean" });
  event.remove({ id: "ae2:network/cables/dense_smart_fluix_clean" });
  event.remove({ id: "ae2:network/cables/dense_covered_fluix_clean" });
  event.remove({ id: "ae2:network/cables/glass_lime" });
  event.remove({ id: "ae2:network/cables/dense_smart_lime" });
  event.remove({ id: "ae2:network/cables/dense_covered_lime" });
  greg.chemical_bath("gtceu:lime_glass_cable").itemInputs("ae2:fluix_glass_cable").inputFluids("gtceu:lime_dye 18").itemOutputs("ae2:lime_glass_cable").duration(40).EUt(16);
  greg.chemical_bath("gtceu:un_lime_glass_cable").itemInputs("ae2:lime_glass_cable").inputFluids("gtceu:chlorine 10").itemOutputs("ae2:fluix_glass_cable").duration(40).EUt(16);

  // lime / covered_dense
  event.remove({ id: "ae2:network/cables/covered_dense_fluix_clean" });
  event.remove({ id: "ae2:network/cables/dense_smart_fluix_clean" });
  event.remove({ id: "ae2:network/cables/dense_covered_fluix_clean" });
  event.remove({ id: "ae2:network/cables/covered_dense_lime" });
  event.remove({ id: "ae2:network/cables/dense_smart_lime" });
  event.remove({ id: "ae2:network/cables/dense_covered_lime" });
  greg.chemical_bath("gtceu:lime_covered_dense_cable").itemInputs("ae2:fluix_covered_dense_cable").inputFluids("gtceu:lime_dye 18").itemOutputs("ae2:lime_covered_dense_cable").duration(40).EUt(16);
  greg.chemical_bath("gtceu:un_lime_covered_dense_cable").itemInputs("ae2:lime_covered_dense_cable").inputFluids("gtceu:chlorine 10").itemOutputs("ae2:fluix_covered_dense_cable").duration(40).EUt(16);

  // lime / smart_dense
  event.remove({ id: "ae2:network/cables/smart_dense_fluix_clean" });
  event.remove({ id: "ae2:network/cables/dense_smart_fluix_clean" });
  event.remove({ id: "ae2:network/cables/dense_covered_fluix_clean" });
  event.remove({ id: "ae2:network/cables/smart_dense_lime" });
  event.remove({ id: "ae2:network/cables/dense_smart_lime" });
  event.remove({ id: "ae2:network/cables/dense_covered_lime" });
  greg.chemical_bath("gtceu:lime_smart_dense_cable").itemInputs("ae2:fluix_smart_dense_cable").inputFluids("gtceu:lime_dye 18").itemOutputs("ae2:lime_smart_dense_cable").duration(40).EUt(16);
  greg.chemical_bath("gtceu:un_lime_smart_dense_cable").itemInputs("ae2:lime_smart_dense_cable").inputFluids("gtceu:chlorine 10").itemOutputs("ae2:fluix_smart_dense_cable").duration(40).EUt(16);

  // pink / smart
  event.remove({ id: "ae2:network/cables/smart_fluix_clean" });
  event.remove({ id: "ae2:network/cables/dense_smart_fluix_clean" });
  event.remove({ id: "ae2:network/cables/dense_covered_fluix_clean" });
  event.remove({ id: "ae2:network/cables/smart_pink" });
  event.remove({ id: "ae2:network/cables/dense_smart_pink" });
  event.remove({ id: "ae2:network/cables/dense_covered_pink" });
  greg.chemical_bath("gtceu:pink_smart_cable").itemInputs("ae2:fluix_smart_cable").inputFluids("gtceu:pink_dye 18").itemOutputs("ae2:pink_smart_cable").duration(40).EUt(16);
  greg.chemical_bath("gtceu:un_pink_smart_cable").itemInputs("ae2:pink_smart_cable").inputFluids("gtceu:chlorine 10").itemOutputs("ae2:fluix_smart_cable").duration(40).EUt(16);

  // pink / covered
  event.remove({ id: "ae2:network/cables/covered_fluix_clean" });
  event.remove({ id: "ae2:network/cables/dense_smart_fluix_clean" });
  event.remove({ id: "ae2:network/cables/dense_covered_fluix_clean" });
  event.remove({ id: "ae2:network/cables/covered_pink" });
  event.remove({ id: "ae2:network/cables/dense_smart_pink" });
  event.remove({ id: "ae2:network/cables/dense_covered_pink" });
  greg.chemical_bath("gtceu:pink_covered_cable").itemInputs("ae2:fluix_covered_cable").inputFluids("gtceu:pink_dye 18").itemOutputs("ae2:pink_covered_cable").duration(40).EUt(16);
  greg.chemical_bath("gtceu:un_pink_covered_cable").itemInputs("ae2:pink_covered_cable").inputFluids("gtceu:chlorine 10").itemOutputs("ae2:fluix_covered_cable").duration(40).EUt(16);

  // pink / glass
  event.remove({ id: "ae2:network/cables/glass_fluix_clean" });
  event.remove({ id: "ae2:network/cables/dense_smart_fluix_clean" });
  event.remove({ id: "ae2:network/cables/dense_covered_fluix_clean" });
  event.remove({ id: "ae2:network/cables/glass_pink" });
  event.remove({ id: "ae2:network/cables/dense_smart_pink" });
  event.remove({ id: "ae2:network/cables/dense_covered_pink" });
  greg.chemical_bath("gtceu:pink_glass_cable").itemInputs("ae2:fluix_glass_cable").inputFluids("gtceu:pink_dye 18").itemOutputs("ae2:pink_glass_cable").duration(40).EUt(16);
  greg.chemical_bath("gtceu:un_pink_glass_cable").itemInputs("ae2:pink_glass_cable").inputFluids("gtceu:chlorine 10").itemOutputs("ae2:fluix_glass_cable").duration(40).EUt(16);

  // pink / covered_dense
  event.remove({ id: "ae2:network/cables/covered_dense_fluix_clean" });
  event.remove({ id: "ae2:network/cables/dense_smart_fluix_clean" });
  event.remove({ id: "ae2:network/cables/dense_covered_fluix_clean" });
  event.remove({ id: "ae2:network/cables/covered_dense_pink" });
  event.remove({ id: "ae2:network/cables/dense_smart_pink" });
  event.remove({ id: "ae2:network/cables/dense_covered_pink" });
  greg.chemical_bath("gtceu:pink_covered_dense_cable").itemInputs("ae2:fluix_covered_dense_cable").inputFluids("gtceu:pink_dye 18").itemOutputs("ae2:pink_covered_dense_cable").duration(40).EUt(16);
  greg.chemical_bath("gtceu:un_pink_covered_dense_cable").itemInputs("ae2:pink_covered_dense_cable").inputFluids("gtceu:chlorine 10").itemOutputs("ae2:fluix_covered_dense_cable").duration(40).EUt(16);

  // pink / smart_dense
  event.remove({ id: "ae2:network/cables/smart_dense_fluix_clean" });
  event.remove({ id: "ae2:network/cables/dense_smart_fluix_clean" });
  event.remove({ id: "ae2:network/cables/dense_covered_fluix_clean" });
  event.remove({ id: "ae2:network/cables/smart_dense_pink" });
  event.remove({ id: "ae2:network/cables/dense_smart_pink" });
  event.remove({ id: "ae2:network/cables/dense_covered_pink" });
  greg.chemical_bath("gtceu:pink_smart_dense_cable").itemInputs("ae2:fluix_smart_dense_cable").inputFluids("gtceu:pink_dye 18").itemOutputs("ae2:pink_smart_dense_cable").duration(40).EUt(16);
  greg.chemical_bath("gtceu:un_pink_smart_dense_cable").itemInputs("ae2:pink_smart_dense_cable").inputFluids("gtceu:chlorine 10").itemOutputs("ae2:fluix_smart_dense_cable").duration(40).EUt(16);

  // gray / smart
  event.remove({ id: "ae2:network/cables/smart_fluix_clean" });
  event.remove({ id: "ae2:network/cables/dense_smart_fluix_clean" });
  event.remove({ id: "ae2:network/cables/dense_covered_fluix_clean" });
  event.remove({ id: "ae2:network/cables/smart_gray" });
  event.remove({ id: "ae2:network/cables/dense_smart_gray" });
  event.remove({ id: "ae2:network/cables/dense_covered_gray" });
  greg.chemical_bath("gtceu:gray_smart_cable").itemInputs("ae2:fluix_smart_cable").inputFluids("gtceu:gray_dye 18").itemOutputs("ae2:gray_smart_cable").duration(40).EUt(16);
  greg.chemical_bath("gtceu:un_gray_smart_cable").itemInputs("ae2:gray_smart_cable").inputFluids("gtceu:chlorine 10").itemOutputs("ae2:fluix_smart_cable").duration(40).EUt(16);

  // gray / covered
  event.remove({ id: "ae2:network/cables/covered_fluix_clean" });
  event.remove({ id: "ae2:network/cables/dense_smart_fluix_clean" });
  event.remove({ id: "ae2:network/cables/dense_covered_fluix_clean" });
  event.remove({ id: "ae2:network/cables/covered_gray" });
  event.remove({ id: "ae2:network/cables/dense_smart_gray" });
  event.remove({ id: "ae2:network/cables/dense_covered_gray" });
  greg.chemical_bath("gtceu:gray_covered_cable").itemInputs("ae2:fluix_covered_cable").inputFluids("gtceu:gray_dye 18").itemOutputs("ae2:gray_covered_cable").duration(40).EUt(16);
  greg.chemical_bath("gtceu:un_gray_covered_cable").itemInputs("ae2:gray_covered_cable").inputFluids("gtceu:chlorine 10").itemOutputs("ae2:fluix_covered_cable").duration(40).EUt(16);

  // gray / glass
  event.remove({ id: "ae2:network/cables/glass_fluix_clean" });
  event.remove({ id: "ae2:network/cables/dense_smart_fluix_clean" });
  event.remove({ id: "ae2:network/cables/dense_covered_fluix_clean" });
  event.remove({ id: "ae2:network/cables/glass_gray" });
  event.remove({ id: "ae2:network/cables/dense_smart_gray" });
  event.remove({ id: "ae2:network/cables/dense_covered_gray" });
  greg.chemical_bath("gtceu:gray_glass_cable").itemInputs("ae2:fluix_glass_cable").inputFluids("gtceu:gray_dye 18").itemOutputs("ae2:gray_glass_cable").duration(40).EUt(16);
  greg.chemical_bath("gtceu:un_gray_glass_cable").itemInputs("ae2:gray_glass_cable").inputFluids("gtceu:chlorine 10").itemOutputs("ae2:fluix_glass_cable").duration(40).EUt(16);

  // gray / covered_dense
  event.remove({ id: "ae2:network/cables/covered_dense_fluix_clean" });
  event.remove({ id: "ae2:network/cables/dense_smart_fluix_clean" });
  event.remove({ id: "ae2:network/cables/dense_covered_fluix_clean" });
  event.remove({ id: "ae2:network/cables/covered_dense_gray" });
  event.remove({ id: "ae2:network/cables/dense_smart_gray" });
  event.remove({ id: "ae2:network/cables/dense_covered_gray" });
  greg.chemical_bath("gtceu:gray_covered_dense_cable").itemInputs("ae2:fluix_covered_dense_cable").inputFluids("gtceu:gray_dye 18").itemOutputs("ae2:gray_covered_dense_cable").duration(40).EUt(16);
  greg.chemical_bath("gtceu:un_gray_covered_dense_cable").itemInputs("ae2:gray_covered_dense_cable").inputFluids("gtceu:chlorine 10").itemOutputs("ae2:fluix_covered_dense_cable").duration(40).EUt(16);

  // gray / smart_dense
  event.remove({ id: "ae2:network/cables/smart_dense_fluix_clean" });
  event.remove({ id: "ae2:network/cables/dense_smart_fluix_clean" });
  event.remove({ id: "ae2:network/cables/dense_covered_fluix_clean" });
  event.remove({ id: "ae2:network/cables/smart_dense_gray" });
  event.remove({ id: "ae2:network/cables/dense_smart_gray" });
  event.remove({ id: "ae2:network/cables/dense_covered_gray" });
  greg.chemical_bath("gtceu:gray_smart_dense_cable").itemInputs("ae2:fluix_smart_dense_cable").inputFluids("gtceu:gray_dye 18").itemOutputs("ae2:gray_smart_dense_cable").duration(40).EUt(16);
  greg.chemical_bath("gtceu:un_gray_smart_dense_cable").itemInputs("ae2:gray_smart_dense_cable").inputFluids("gtceu:chlorine 10").itemOutputs("ae2:fluix_smart_dense_cable").duration(40).EUt(16);

  // light_gray / smart
  event.remove({ id: "ae2:network/cables/smart_fluix_clean" });
  event.remove({ id: "ae2:network/cables/dense_smart_fluix_clean" });
  event.remove({ id: "ae2:network/cables/dense_covered_fluix_clean" });
  event.remove({ id: "ae2:network/cables/smart_light_gray" });
  event.remove({ id: "ae2:network/cables/dense_smart_light_gray" });
  event.remove({ id: "ae2:network/cables/dense_covered_light_gray" });
  greg.chemical_bath("gtceu:light_gray_smart_cable").itemInputs("ae2:fluix_smart_cable").inputFluids("gtceu:light_gray_dye 18").itemOutputs("ae2:light_gray_smart_cable").duration(40).EUt(16);
  greg.chemical_bath("gtceu:un_light_gray_smart_cable").itemInputs("ae2:light_gray_smart_cable").inputFluids("gtceu:chlorine 10").itemOutputs("ae2:fluix_smart_cable").duration(40).EUt(16);

  // light_gray / covered
  event.remove({ id: "ae2:network/cables/covered_fluix_clean" });
  event.remove({ id: "ae2:network/cables/dense_smart_fluix_clean" });
  event.remove({ id: "ae2:network/cables/dense_covered_fluix_clean" });
  event.remove({ id: "ae2:network/cables/covered_light_gray" });
  event.remove({ id: "ae2:network/cables/dense_smart_light_gray" });
  event.remove({ id: "ae2:network/cables/dense_covered_light_gray" });
  greg.chemical_bath("gtceu:light_gray_covered_cable").itemInputs("ae2:fluix_covered_cable").inputFluids("gtceu:light_gray_dye 18").itemOutputs("ae2:light_gray_covered_cable").duration(40).EUt(16);
  greg.chemical_bath("gtceu:un_light_gray_covered_cable").itemInputs("ae2:light_gray_covered_cable").inputFluids("gtceu:chlorine 10").itemOutputs("ae2:fluix_covered_cable").duration(40).EUt(16);

  // light_gray / glass
  event.remove({ id: "ae2:network/cables/glass_fluix_clean" });
  event.remove({ id: "ae2:network/cables/dense_smart_fluix_clean" });
  event.remove({ id: "ae2:network/cables/dense_covered_fluix_clean" });
  event.remove({ id: "ae2:network/cables/glass_light_gray" });
  event.remove({ id: "ae2:network/cables/dense_smart_light_gray" });
  event.remove({ id: "ae2:network/cables/dense_covered_light_gray" });
  greg.chemical_bath("gtceu:light_gray_glass_cable").itemInputs("ae2:fluix_glass_cable").inputFluids("gtceu:light_gray_dye 18").itemOutputs("ae2:light_gray_glass_cable").duration(40).EUt(16);
  greg.chemical_bath("gtceu:un_light_gray_glass_cable").itemInputs("ae2:light_gray_glass_cable").inputFluids("gtceu:chlorine 10").itemOutputs("ae2:fluix_glass_cable").duration(40).EUt(16);

  // light_gray / covered_dense
  event.remove({ id: "ae2:network/cables/covered_dense_fluix_clean" });
  event.remove({ id: "ae2:network/cables/dense_smart_fluix_clean" });
  event.remove({ id: "ae2:network/cables/dense_covered_fluix_clean" });
  event.remove({ id: "ae2:network/cables/covered_dense_light_gray" });
  event.remove({ id: "ae2:network/cables/dense_smart_light_gray" });
  event.remove({ id: "ae2:network/cables/dense_covered_light_gray" });
  greg.chemical_bath("gtceu:light_gray_covered_dense_cable").itemInputs("ae2:fluix_covered_dense_cable").inputFluids("gtceu:light_gray_dye 18").itemOutputs("ae2:light_gray_covered_dense_cable").duration(40).EUt(16);
  greg.chemical_bath("gtceu:un_light_gray_covered_dense_cable").itemInputs("ae2:light_gray_covered_dense_cable").inputFluids("gtceu:chlorine 10").itemOutputs("ae2:fluix_covered_dense_cable").duration(40).EUt(16);

  // light_gray / smart_dense
  event.remove({ id: "ae2:network/cables/smart_dense_fluix_clean" });
  event.remove({ id: "ae2:network/cables/dense_smart_fluix_clean" });
  event.remove({ id: "ae2:network/cables/dense_covered_fluix_clean" });
  event.remove({ id: "ae2:network/cables/smart_dense_light_gray" });
  event.remove({ id: "ae2:network/cables/dense_smart_light_gray" });
  event.remove({ id: "ae2:network/cables/dense_covered_light_gray" });
  greg.chemical_bath("gtceu:light_gray_smart_dense_cable").itemInputs("ae2:fluix_smart_dense_cable").inputFluids("gtceu:light_gray_dye 18").itemOutputs("ae2:light_gray_smart_dense_cable").duration(40).EUt(16);
  greg.chemical_bath("gtceu:un_light_gray_smart_dense_cable").itemInputs("ae2:light_gray_smart_dense_cable").inputFluids("gtceu:chlorine 10").itemOutputs("ae2:fluix_smart_dense_cable").duration(40).EUt(16);

  // cyan / smart
  event.remove({ id: "ae2:network/cables/smart_fluix_clean" });
  event.remove({ id: "ae2:network/cables/dense_smart_fluix_clean" });
  event.remove({ id: "ae2:network/cables/dense_covered_fluix_clean" });
  event.remove({ id: "ae2:network/cables/smart_cyan" });
  event.remove({ id: "ae2:network/cables/dense_smart_cyan" });
  event.remove({ id: "ae2:network/cables/dense_covered_cyan" });
  greg.chemical_bath("gtceu:cyan_smart_cable").itemInputs("ae2:fluix_smart_cable").inputFluids("gtceu:cyan_dye 18").itemOutputs("ae2:cyan_smart_cable").duration(40).EUt(16);
  greg.chemical_bath("gtceu:un_cyan_smart_cable").itemInputs("ae2:cyan_smart_cable").inputFluids("gtceu:chlorine 10").itemOutputs("ae2:fluix_smart_cable").duration(40).EUt(16);

  // cyan / covered
  event.remove({ id: "ae2:network/cables/covered_fluix_clean" });
  event.remove({ id: "ae2:network/cables/dense_smart_fluix_clean" });
  event.remove({ id: "ae2:network/cables/dense_covered_fluix_clean" });
  event.remove({ id: "ae2:network/cables/covered_cyan" });
  event.remove({ id: "ae2:network/cables/dense_smart_cyan" });
  event.remove({ id: "ae2:network/cables/dense_covered_cyan" });
  greg.chemical_bath("gtceu:cyan_covered_cable").itemInputs("ae2:fluix_covered_cable").inputFluids("gtceu:cyan_dye 18").itemOutputs("ae2:cyan_covered_cable").duration(40).EUt(16);
  greg.chemical_bath("gtceu:un_cyan_covered_cable").itemInputs("ae2:cyan_covered_cable").inputFluids("gtceu:chlorine 10").itemOutputs("ae2:fluix_covered_cable").duration(40).EUt(16);

  // cyan / glass
  event.remove({ id: "ae2:network/cables/glass_fluix_clean" });
  event.remove({ id: "ae2:network/cables/dense_smart_fluix_clean" });
  event.remove({ id: "ae2:network/cables/dense_covered_fluix_clean" });
  event.remove({ id: "ae2:network/cables/glass_cyan" });
  event.remove({ id: "ae2:network/cables/dense_smart_cyan" });
  event.remove({ id: "ae2:network/cables/dense_covered_cyan" });
  greg.chemical_bath("gtceu:cyan_glass_cable").itemInputs("ae2:fluix_glass_cable").inputFluids("gtceu:cyan_dye 18").itemOutputs("ae2:cyan_glass_cable").duration(40).EUt(16);
  greg.chemical_bath("gtceu:un_cyan_glass_cable").itemInputs("ae2:cyan_glass_cable").inputFluids("gtceu:chlorine 10").itemOutputs("ae2:fluix_glass_cable").duration(40).EUt(16);

  // cyan / covered_dense
  event.remove({ id: "ae2:network/cables/covered_dense_fluix_clean" });
  event.remove({ id: "ae2:network/cables/dense_smart_fluix_clean" });
  event.remove({ id: "ae2:network/cables/dense_covered_fluix_clean" });
  event.remove({ id: "ae2:network/cables/covered_dense_cyan" });
  event.remove({ id: "ae2:network/cables/dense_smart_cyan" });
  event.remove({ id: "ae2:network/cables/dense_covered_cyan" });
  greg.chemical_bath("gtceu:cyan_covered_dense_cable").itemInputs("ae2:fluix_covered_dense_cable").inputFluids("gtceu:cyan_dye 18").itemOutputs("ae2:cyan_covered_dense_cable").duration(40).EUt(16);
  greg.chemical_bath("gtceu:un_cyan_covered_dense_cable").itemInputs("ae2:cyan_covered_dense_cable").inputFluids("gtceu:chlorine 10").itemOutputs("ae2:fluix_covered_dense_cable").duration(40).EUt(16);

  // cyan / smart_dense
  event.remove({ id: "ae2:network/cables/smart_dense_fluix_clean" });
  event.remove({ id: "ae2:network/cables/dense_smart_fluix_clean" });
  event.remove({ id: "ae2:network/cables/dense_covered_fluix_clean" });
  event.remove({ id: "ae2:network/cables/smart_dense_cyan" });
  event.remove({ id: "ae2:network/cables/dense_smart_cyan" });
  event.remove({ id: "ae2:network/cables/dense_covered_cyan" });
  greg.chemical_bath("gtceu:cyan_smart_dense_cable").itemInputs("ae2:fluix_smart_dense_cable").inputFluids("gtceu:cyan_dye 18").itemOutputs("ae2:cyan_smart_dense_cable").duration(40).EUt(16);
  greg.chemical_bath("gtceu:un_cyan_smart_dense_cable").itemInputs("ae2:cyan_smart_dense_cable").inputFluids("gtceu:chlorine 10").itemOutputs("ae2:fluix_smart_dense_cable").duration(40).EUt(16);

  // purple / smart
  event.remove({ id: "ae2:network/cables/smart_fluix_clean" });
  event.remove({ id: "ae2:network/cables/dense_smart_fluix_clean" });
  event.remove({ id: "ae2:network/cables/dense_covered_fluix_clean" });
  event.remove({ id: "ae2:network/cables/smart_purple" });
  event.remove({ id: "ae2:network/cables/dense_smart_purple" });
  event.remove({ id: "ae2:network/cables/dense_covered_purple" });
  greg.chemical_bath("gtceu:purple_smart_cable").itemInputs("ae2:fluix_smart_cable").inputFluids("gtceu:purple_dye 18").itemOutputs("ae2:purple_smart_cable").duration(40).EUt(16);
  greg.chemical_bath("gtceu:un_purple_smart_cable").itemInputs("ae2:purple_smart_cable").inputFluids("gtceu:chlorine 10").itemOutputs("ae2:fluix_smart_cable").duration(40).EUt(16);

  // purple / covered
  event.remove({ id: "ae2:network/cables/covered_fluix_clean" });
  event.remove({ id: "ae2:network/cables/dense_smart_fluix_clean" });
  event.remove({ id: "ae2:network/cables/dense_covered_fluix_clean" });
  event.remove({ id: "ae2:network/cables/covered_purple" });
  event.remove({ id: "ae2:network/cables/dense_smart_purple" });
  event.remove({ id: "ae2:network/cables/dense_covered_purple" });
  greg.chemical_bath("gtceu:purple_covered_cable").itemInputs("ae2:fluix_covered_cable").inputFluids("gtceu:purple_dye 18").itemOutputs("ae2:purple_covered_cable").duration(40).EUt(16);
  greg.chemical_bath("gtceu:un_purple_covered_cable").itemInputs("ae2:purple_covered_cable").inputFluids("gtceu:chlorine 10").itemOutputs("ae2:fluix_covered_cable").duration(40).EUt(16);

  // purple / glass
  event.remove({ id: "ae2:network/cables/glass_fluix_clean" });
  event.remove({ id: "ae2:network/cables/dense_smart_fluix_clean" });
  event.remove({ id: "ae2:network/cables/dense_covered_fluix_clean" });
  event.remove({ id: "ae2:network/cables/glass_purple" });
  event.remove({ id: "ae2:network/cables/dense_smart_purple" });
  event.remove({ id: "ae2:network/cables/dense_covered_purple" });
  greg.chemical_bath("gtceu:purple_glass_cable").itemInputs("ae2:fluix_glass_cable").inputFluids("gtceu:purple_dye 18").itemOutputs("ae2:purple_glass_cable").duration(40).EUt(16);
  greg.chemical_bath("gtceu:un_purple_glass_cable").itemInputs("ae2:purple_glass_cable").inputFluids("gtceu:chlorine 10").itemOutputs("ae2:fluix_glass_cable").duration(40).EUt(16);

  // purple / covered_dense
  event.remove({ id: "ae2:network/cables/covered_dense_fluix_clean" });
  event.remove({ id: "ae2:network/cables/dense_smart_fluix_clean" });
  event.remove({ id: "ae2:network/cables/dense_covered_fluix_clean" });
  event.remove({ id: "ae2:network/cables/covered_dense_purple" });
  event.remove({ id: "ae2:network/cables/dense_smart_purple" });
  event.remove({ id: "ae2:network/cables/dense_covered_purple" });
  greg.chemical_bath("gtceu:purple_covered_dense_cable").itemInputs("ae2:fluix_covered_dense_cable").inputFluids("gtceu:purple_dye 18").itemOutputs("ae2:purple_covered_dense_cable").duration(40).EUt(16);
  greg.chemical_bath("gtceu:un_purple_covered_dense_cable").itemInputs("ae2:purple_covered_dense_cable").inputFluids("gtceu:chlorine 10").itemOutputs("ae2:fluix_covered_dense_cable").duration(40).EUt(16);

  // purple / smart_dense
  event.remove({ id: "ae2:network/cables/smart_dense_fluix_clean" });
  event.remove({ id: "ae2:network/cables/dense_smart_fluix_clean" });
  event.remove({ id: "ae2:network/cables/dense_covered_fluix_clean" });
  event.remove({ id: "ae2:network/cables/smart_dense_purple" });
  event.remove({ id: "ae2:network/cables/dense_smart_purple" });
  event.remove({ id: "ae2:network/cables/dense_covered_purple" });
  greg.chemical_bath("gtceu:purple_smart_dense_cable").itemInputs("ae2:fluix_smart_dense_cable").inputFluids("gtceu:purple_dye 18").itemOutputs("ae2:purple_smart_dense_cable").duration(40).EUt(16);
  greg.chemical_bath("gtceu:un_purple_smart_dense_cable").itemInputs("ae2:purple_smart_dense_cable").inputFluids("gtceu:chlorine 10").itemOutputs("ae2:fluix_smart_dense_cable").duration(40).EUt(16);

  // blue / smart
  event.remove({ id: "ae2:network/cables/smart_fluix_clean" });
  event.remove({ id: "ae2:network/cables/dense_smart_fluix_clean" });
  event.remove({ id: "ae2:network/cables/dense_covered_fluix_clean" });
  event.remove({ id: "ae2:network/cables/smart_blue" });
  event.remove({ id: "ae2:network/cables/dense_smart_blue" });
  event.remove({ id: "ae2:network/cables/dense_covered_blue" });
  greg.chemical_bath("gtceu:blue_smart_cable").itemInputs("ae2:fluix_smart_cable").inputFluids("gtceu:blue_dye 18").itemOutputs("ae2:blue_smart_cable").duration(40).EUt(16);
  greg.chemical_bath("gtceu:un_blue_smart_cable").itemInputs("ae2:blue_smart_cable").inputFluids("gtceu:chlorine 10").itemOutputs("ae2:fluix_smart_cable").duration(40).EUt(16);

  // blue / covered
  event.remove({ id: "ae2:network/cables/covered_fluix_clean" });
  event.remove({ id: "ae2:network/cables/dense_smart_fluix_clean" });
  event.remove({ id: "ae2:network/cables/dense_covered_fluix_clean" });
  event.remove({ id: "ae2:network/cables/covered_blue" });
  event.remove({ id: "ae2:network/cables/dense_smart_blue" });
  event.remove({ id: "ae2:network/cables/dense_covered_blue" });
  greg.chemical_bath("gtceu:blue_covered_cable").itemInputs("ae2:fluix_covered_cable").inputFluids("gtceu:blue_dye 18").itemOutputs("ae2:blue_covered_cable").duration(40).EUt(16);
  greg.chemical_bath("gtceu:un_blue_covered_cable").itemInputs("ae2:blue_covered_cable").inputFluids("gtceu:chlorine 10").itemOutputs("ae2:fluix_covered_cable").duration(40).EUt(16);

  // blue / glass
  event.remove({ id: "ae2:network/cables/glass_fluix_clean" });
  event.remove({ id: "ae2:network/cables/dense_smart_fluix_clean" });
  event.remove({ id: "ae2:network/cables/dense_covered_fluix_clean" });
  event.remove({ id: "ae2:network/cables/glass_blue" });
  event.remove({ id: "ae2:network/cables/dense_smart_blue" });
  event.remove({ id: "ae2:network/cables/dense_covered_blue" });
  greg.chemical_bath("gtceu:blue_glass_cable").itemInputs("ae2:fluix_glass_cable").inputFluids("gtceu:blue_dye 18").itemOutputs("ae2:blue_glass_cable").duration(40).EUt(16);
  greg.chemical_bath("gtceu:un_blue_glass_cable").itemInputs("ae2:blue_glass_cable").inputFluids("gtceu:chlorine 10").itemOutputs("ae2:fluix_glass_cable").duration(40).EUt(16);

  // blue / covered_dense
  event.remove({ id: "ae2:network/cables/covered_dense_fluix_clean" });
  event.remove({ id: "ae2:network/cables/dense_smart_fluix_clean" });
  event.remove({ id: "ae2:network/cables/dense_covered_fluix_clean" });
  event.remove({ id: "ae2:network/cables/covered_dense_blue" });
  event.remove({ id: "ae2:network/cables/dense_smart_blue" });
  event.remove({ id: "ae2:network/cables/dense_covered_blue" });
  greg.chemical_bath("gtceu:blue_covered_dense_cable").itemInputs("ae2:fluix_covered_dense_cable").inputFluids("gtceu:blue_dye 18").itemOutputs("ae2:blue_covered_dense_cable").duration(40).EUt(16);
  greg.chemical_bath("gtceu:un_blue_covered_dense_cable").itemInputs("ae2:blue_covered_dense_cable").inputFluids("gtceu:chlorine 10").itemOutputs("ae2:fluix_covered_dense_cable").duration(40).EUt(16);

  // blue / smart_dense
  event.remove({ id: "ae2:network/cables/smart_dense_fluix_clean" });
  event.remove({ id: "ae2:network/cables/dense_smart_fluix_clean" });
  event.remove({ id: "ae2:network/cables/dense_covered_fluix_clean" });
  event.remove({ id: "ae2:network/cables/smart_dense_blue" });
  event.remove({ id: "ae2:network/cables/dense_smart_blue" });
  event.remove({ id: "ae2:network/cables/dense_covered_blue" });
  greg.chemical_bath("gtceu:blue_smart_dense_cable").itemInputs("ae2:fluix_smart_dense_cable").inputFluids("gtceu:blue_dye 18").itemOutputs("ae2:blue_smart_dense_cable").duration(40).EUt(16);
  greg.chemical_bath("gtceu:un_blue_smart_dense_cable").itemInputs("ae2:blue_smart_dense_cable").inputFluids("gtceu:chlorine 10").itemOutputs("ae2:fluix_smart_dense_cable").duration(40).EUt(16);

  // brown / smart
  event.remove({ id: "ae2:network/cables/smart_fluix_clean" });
  event.remove({ id: "ae2:network/cables/dense_smart_fluix_clean" });
  event.remove({ id: "ae2:network/cables/dense_covered_fluix_clean" });
  event.remove({ id: "ae2:network/cables/smart_brown" });
  event.remove({ id: "ae2:network/cables/dense_smart_brown" });
  event.remove({ id: "ae2:network/cables/dense_covered_brown" });
  greg.chemical_bath("gtceu:brown_smart_cable").itemInputs("ae2:fluix_smart_cable").inputFluids("gtceu:brown_dye 18").itemOutputs("ae2:brown_smart_cable").duration(40).EUt(16);
  greg.chemical_bath("gtceu:un_brown_smart_cable").itemInputs("ae2:brown_smart_cable").inputFluids("gtceu:chlorine 10").itemOutputs("ae2:fluix_smart_cable").duration(40).EUt(16);

  // brown / covered
  event.remove({ id: "ae2:network/cables/covered_fluix_clean" });
  event.remove({ id: "ae2:network/cables/dense_smart_fluix_clean" });
  event.remove({ id: "ae2:network/cables/dense_covered_fluix_clean" });
  event.remove({ id: "ae2:network/cables/covered_brown" });
  event.remove({ id: "ae2:network/cables/dense_smart_brown" });
  event.remove({ id: "ae2:network/cables/dense_covered_brown" });
  greg.chemical_bath("gtceu:brown_covered_cable").itemInputs("ae2:fluix_covered_cable").inputFluids("gtceu:brown_dye 18").itemOutputs("ae2:brown_covered_cable").duration(40).EUt(16);
  greg.chemical_bath("gtceu:un_brown_covered_cable").itemInputs("ae2:brown_covered_cable").inputFluids("gtceu:chlorine 10").itemOutputs("ae2:fluix_covered_cable").duration(40).EUt(16);

  // brown / glass
  event.remove({ id: "ae2:network/cables/glass_fluix_clean" });
  event.remove({ id: "ae2:network/cables/dense_smart_fluix_clean" });
  event.remove({ id: "ae2:network/cables/dense_covered_fluix_clean" });
  event.remove({ id: "ae2:network/cables/glass_brown" });
  event.remove({ id: "ae2:network/cables/dense_smart_brown" });
  event.remove({ id: "ae2:network/cables/dense_covered_brown" });
  greg.chemical_bath("gtceu:brown_glass_cable").itemInputs("ae2:fluix_glass_cable").inputFluids("gtceu:brown_dye 18").itemOutputs("ae2:brown_glass_cable").duration(40).EUt(16);
  greg.chemical_bath("gtceu:un_brown_glass_cable").itemInputs("ae2:brown_glass_cable").inputFluids("gtceu:chlorine 10").itemOutputs("ae2:fluix_glass_cable").duration(40).EUt(16);

  // brown / covered_dense
  event.remove({ id: "ae2:network/cables/covered_dense_fluix_clean" });
  event.remove({ id: "ae2:network/cables/dense_smart_fluix_clean" });
  event.remove({ id: "ae2:network/cables/dense_covered_fluix_clean" });
  event.remove({ id: "ae2:network/cables/covered_dense_brown" });
  event.remove({ id: "ae2:network/cables/dense_smart_brown" });
  event.remove({ id: "ae2:network/cables/dense_covered_brown" });
  greg.chemical_bath("gtceu:brown_covered_dense_cable").itemInputs("ae2:fluix_covered_dense_cable").inputFluids("gtceu:brown_dye 18").itemOutputs("ae2:brown_covered_dense_cable").duration(40).EUt(16);
  greg.chemical_bath("gtceu:un_brown_covered_dense_cable").itemInputs("ae2:brown_covered_dense_cable").inputFluids("gtceu:chlorine 10").itemOutputs("ae2:fluix_covered_dense_cable").duration(40).EUt(16);

  // brown / smart_dense
  event.remove({ id: "ae2:network/cables/smart_dense_fluix_clean" });
  event.remove({ id: "ae2:network/cables/dense_smart_fluix_clean" });
  event.remove({ id: "ae2:network/cables/dense_covered_fluix_clean" });
  event.remove({ id: "ae2:network/cables/smart_dense_brown" });
  event.remove({ id: "ae2:network/cables/dense_smart_brown" });
  event.remove({ id: "ae2:network/cables/dense_covered_brown" });
  greg.chemical_bath("gtceu:brown_smart_dense_cable").itemInputs("ae2:fluix_smart_dense_cable").inputFluids("gtceu:brown_dye 18").itemOutputs("ae2:brown_smart_dense_cable").duration(40).EUt(16);
  greg.chemical_bath("gtceu:un_brown_smart_dense_cable").itemInputs("ae2:brown_smart_dense_cable").inputFluids("gtceu:chlorine 10").itemOutputs("ae2:fluix_smart_dense_cable").duration(40).EUt(16);

  // green / smart
  event.remove({ id: "ae2:network/cables/smart_fluix_clean" });
  event.remove({ id: "ae2:network/cables/dense_smart_fluix_clean" });
  event.remove({ id: "ae2:network/cables/dense_covered_fluix_clean" });
  event.remove({ id: "ae2:network/cables/smart_green" });
  event.remove({ id: "ae2:network/cables/dense_smart_green" });
  event.remove({ id: "ae2:network/cables/dense_covered_green" });
  greg.chemical_bath("gtceu:green_smart_cable").itemInputs("ae2:fluix_smart_cable").inputFluids("gtceu:green_dye 18").itemOutputs("ae2:green_smart_cable").duration(40).EUt(16);
  greg.chemical_bath("gtceu:un_green_smart_cable").itemInputs("ae2:green_smart_cable").inputFluids("gtceu:chlorine 10").itemOutputs("ae2:fluix_smart_cable").duration(40).EUt(16);

  // green / covered
  event.remove({ id: "ae2:network/cables/covered_fluix_clean" });
  event.remove({ id: "ae2:network/cables/dense_smart_fluix_clean" });
  event.remove({ id: "ae2:network/cables/dense_covered_fluix_clean" });
  event.remove({ id: "ae2:network/cables/covered_green" });
  event.remove({ id: "ae2:network/cables/dense_smart_green" });
  event.remove({ id: "ae2:network/cables/dense_covered_green" });
  greg.chemical_bath("gtceu:green_covered_cable").itemInputs("ae2:fluix_covered_cable").inputFluids("gtceu:green_dye 18").itemOutputs("ae2:green_covered_cable").duration(40).EUt(16);
  greg.chemical_bath("gtceu:un_green_covered_cable").itemInputs("ae2:green_covered_cable").inputFluids("gtceu:chlorine 10").itemOutputs("ae2:fluix_covered_cable").duration(40).EUt(16);

  // green / glass
  event.remove({ id: "ae2:network/cables/glass_fluix_clean" });
  event.remove({ id: "ae2:network/cables/dense_smart_fluix_clean" });
  event.remove({ id: "ae2:network/cables/dense_covered_fluix_clean" });
  event.remove({ id: "ae2:network/cables/glass_green" });
  event.remove({ id: "ae2:network/cables/dense_smart_green" });
  event.remove({ id: "ae2:network/cables/dense_covered_green" });
  greg.chemical_bath("gtceu:green_glass_cable").itemInputs("ae2:fluix_glass_cable").inputFluids("gtceu:green_dye 18").itemOutputs("ae2:green_glass_cable").duration(40).EUt(16);
  greg.chemical_bath("gtceu:un_green_glass_cable").itemInputs("ae2:green_glass_cable").inputFluids("gtceu:chlorine 10").itemOutputs("ae2:fluix_glass_cable").duration(40).EUt(16);

  // green / covered_dense
  event.remove({ id: "ae2:network/cables/covered_dense_fluix_clean" });
  event.remove({ id: "ae2:network/cables/dense_smart_fluix_clean" });
  event.remove({ id: "ae2:network/cables/dense_covered_fluix_clean" });
  event.remove({ id: "ae2:network/cables/covered_dense_green" });
  event.remove({ id: "ae2:network/cables/dense_smart_green" });
  event.remove({ id: "ae2:network/cables/dense_covered_green" });
  greg.chemical_bath("gtceu:green_covered_dense_cable").itemInputs("ae2:fluix_covered_dense_cable").inputFluids("gtceu:green_dye 18").itemOutputs("ae2:green_covered_dense_cable").duration(40).EUt(16);
  greg.chemical_bath("gtceu:un_green_covered_dense_cable").itemInputs("ae2:green_covered_dense_cable").inputFluids("gtceu:chlorine 10").itemOutputs("ae2:fluix_covered_dense_cable").duration(40).EUt(16);

  // green / smart_dense
  event.remove({ id: "ae2:network/cables/smart_dense_fluix_clean" });
  event.remove({ id: "ae2:network/cables/dense_smart_fluix_clean" });
  event.remove({ id: "ae2:network/cables/dense_covered_fluix_clean" });
  event.remove({ id: "ae2:network/cables/smart_dense_green" });
  event.remove({ id: "ae2:network/cables/dense_smart_green" });
  event.remove({ id: "ae2:network/cables/dense_covered_green" });
  greg.chemical_bath("gtceu:green_smart_dense_cable").itemInputs("ae2:fluix_smart_dense_cable").inputFluids("gtceu:green_dye 18").itemOutputs("ae2:green_smart_dense_cable").duration(40).EUt(16);
  greg.chemical_bath("gtceu:un_green_smart_dense_cable").itemInputs("ae2:green_smart_dense_cable").inputFluids("gtceu:chlorine 10").itemOutputs("ae2:fluix_smart_dense_cable").duration(40).EUt(16);

  // red / smart
  event.remove({ id: "ae2:network/cables/smart_fluix_clean" });
  event.remove({ id: "ae2:network/cables/dense_smart_fluix_clean" });
  event.remove({ id: "ae2:network/cables/dense_covered_fluix_clean" });
  event.remove({ id: "ae2:network/cables/smart_red" });
  event.remove({ id: "ae2:network/cables/dense_smart_red" });
  event.remove({ id: "ae2:network/cables/dense_covered_red" });
  greg.chemical_bath("gtceu:red_smart_cable").itemInputs("ae2:fluix_smart_cable").inputFluids("gtceu:red_dye 18").itemOutputs("ae2:red_smart_cable").duration(40).EUt(16);
  greg.chemical_bath("gtceu:un_red_smart_cable").itemInputs("ae2:red_smart_cable").inputFluids("gtceu:chlorine 10").itemOutputs("ae2:fluix_smart_cable").duration(40).EUt(16);

  // red / covered
  event.remove({ id: "ae2:network/cables/covered_fluix_clean" });
  event.remove({ id: "ae2:network/cables/dense_smart_fluix_clean" });
  event.remove({ id: "ae2:network/cables/dense_covered_fluix_clean" });
  event.remove({ id: "ae2:network/cables/covered_red" });
  event.remove({ id: "ae2:network/cables/dense_smart_red" });
  event.remove({ id: "ae2:network/cables/dense_covered_red" });
  greg.chemical_bath("gtceu:red_covered_cable").itemInputs("ae2:fluix_covered_cable").inputFluids("gtceu:red_dye 18").itemOutputs("ae2:red_covered_cable").duration(40).EUt(16);
  greg.chemical_bath("gtceu:un_red_covered_cable").itemInputs("ae2:red_covered_cable").inputFluids("gtceu:chlorine 10").itemOutputs("ae2:fluix_covered_cable").duration(40).EUt(16);

  // red / glass
  event.remove({ id: "ae2:network/cables/glass_fluix_clean" });
  event.remove({ id: "ae2:network/cables/dense_smart_fluix_clean" });
  event.remove({ id: "ae2:network/cables/dense_covered_fluix_clean" });
  event.remove({ id: "ae2:network/cables/glass_red" });
  event.remove({ id: "ae2:network/cables/dense_smart_red" });
  event.remove({ id: "ae2:network/cables/dense_covered_red" });
  greg.chemical_bath("gtceu:red_glass_cable").itemInputs("ae2:fluix_glass_cable").inputFluids("gtceu:red_dye 18").itemOutputs("ae2:red_glass_cable").duration(40).EUt(16);
  greg.chemical_bath("gtceu:un_red_glass_cable").itemInputs("ae2:red_glass_cable").inputFluids("gtceu:chlorine 10").itemOutputs("ae2:fluix_glass_cable").duration(40).EUt(16);

  // red / covered_dense
  event.remove({ id: "ae2:network/cables/covered_dense_fluix_clean" });
  event.remove({ id: "ae2:network/cables/dense_smart_fluix_clean" });
  event.remove({ id: "ae2:network/cables/dense_covered_fluix_clean" });
  event.remove({ id: "ae2:network/cables/covered_dense_red" });
  event.remove({ id: "ae2:network/cables/dense_smart_red" });
  event.remove({ id: "ae2:network/cables/dense_covered_red" });
  greg.chemical_bath("gtceu:red_covered_dense_cable").itemInputs("ae2:fluix_covered_dense_cable").inputFluids("gtceu:red_dye 18").itemOutputs("ae2:red_covered_dense_cable").duration(40).EUt(16);
  greg.chemical_bath("gtceu:un_red_covered_dense_cable").itemInputs("ae2:red_covered_dense_cable").inputFluids("gtceu:chlorine 10").itemOutputs("ae2:fluix_covered_dense_cable").duration(40).EUt(16);

  // red / smart_dense
  event.remove({ id: "ae2:network/cables/smart_dense_fluix_clean" });
  event.remove({ id: "ae2:network/cables/dense_smart_fluix_clean" });
  event.remove({ id: "ae2:network/cables/dense_covered_fluix_clean" });
  event.remove({ id: "ae2:network/cables/smart_dense_red" });
  event.remove({ id: "ae2:network/cables/dense_smart_red" });
  event.remove({ id: "ae2:network/cables/dense_covered_red" });
  greg.chemical_bath("gtceu:red_smart_dense_cable").itemInputs("ae2:fluix_smart_dense_cable").inputFluids("gtceu:red_dye 18").itemOutputs("ae2:red_smart_dense_cable").duration(40).EUt(16);
  greg.chemical_bath("gtceu:un_red_smart_dense_cable").itemInputs("ae2:red_smart_dense_cable").inputFluids("gtceu:chlorine 10").itemOutputs("ae2:fluix_smart_dense_cable").duration(40).EUt(16);

  // black / smart
  event.remove({ id: "ae2:network/cables/smart_fluix_clean" });
  event.remove({ id: "ae2:network/cables/dense_smart_fluix_clean" });
  event.remove({ id: "ae2:network/cables/dense_covered_fluix_clean" });
  event.remove({ id: "ae2:network/cables/smart_black" });
  event.remove({ id: "ae2:network/cables/dense_smart_black" });
  event.remove({ id: "ae2:network/cables/dense_covered_black" });
  greg.chemical_bath("gtceu:black_smart_cable").itemInputs("ae2:fluix_smart_cable").inputFluids("gtceu:black_dye 18").itemOutputs("ae2:black_smart_cable").duration(40).EUt(16);
  greg.chemical_bath("gtceu:un_black_smart_cable").itemInputs("ae2:black_smart_cable").inputFluids("gtceu:chlorine 10").itemOutputs("ae2:fluix_smart_cable").duration(40).EUt(16);

  // black / covered
  event.remove({ id: "ae2:network/cables/covered_fluix_clean" });
  event.remove({ id: "ae2:network/cables/dense_smart_fluix_clean" });
  event.remove({ id: "ae2:network/cables/dense_covered_fluix_clean" });
  event.remove({ id: "ae2:network/cables/covered_black" });
  event.remove({ id: "ae2:network/cables/dense_smart_black" });
  event.remove({ id: "ae2:network/cables/dense_covered_black" });
  greg.chemical_bath("gtceu:black_covered_cable").itemInputs("ae2:fluix_covered_cable").inputFluids("gtceu:black_dye 18").itemOutputs("ae2:black_covered_cable").duration(40).EUt(16);
  greg.chemical_bath("gtceu:un_black_covered_cable").itemInputs("ae2:black_covered_cable").inputFluids("gtceu:chlorine 10").itemOutputs("ae2:fluix_covered_cable").duration(40).EUt(16);

  // black / glass
  event.remove({ id: "ae2:network/cables/glass_fluix_clean" });
  event.remove({ id: "ae2:network/cables/dense_smart_fluix_clean" });
  event.remove({ id: "ae2:network/cables/dense_covered_fluix_clean" });
  event.remove({ id: "ae2:network/cables/glass_black" });
  event.remove({ id: "ae2:network/cables/dense_smart_black" });
  event.remove({ id: "ae2:network/cables/dense_covered_black" });
  greg.chemical_bath("gtceu:black_glass_cable").itemInputs("ae2:fluix_glass_cable").inputFluids("gtceu:black_dye 18").itemOutputs("ae2:black_glass_cable").duration(40).EUt(16);
  greg.chemical_bath("gtceu:un_black_glass_cable").itemInputs("ae2:black_glass_cable").inputFluids("gtceu:chlorine 10").itemOutputs("ae2:fluix_glass_cable").duration(40).EUt(16);

  // black / covered_dense
  event.remove({ id: "ae2:network/cables/covered_dense_fluix_clean" });
  event.remove({ id: "ae2:network/cables/dense_smart_fluix_clean" });
  event.remove({ id: "ae2:network/cables/dense_covered_fluix_clean" });
  event.remove({ id: "ae2:network/cables/covered_dense_black" });
  event.remove({ id: "ae2:network/cables/dense_smart_black" });
  event.remove({ id: "ae2:network/cables/dense_covered_black" });
  greg.chemical_bath("gtceu:black_covered_dense_cable").itemInputs("ae2:fluix_covered_dense_cable").inputFluids("gtceu:black_dye 18").itemOutputs("ae2:black_covered_dense_cable").duration(40).EUt(16);
  greg.chemical_bath("gtceu:un_black_covered_dense_cable").itemInputs("ae2:black_covered_dense_cable").inputFluids("gtceu:chlorine 10").itemOutputs("ae2:fluix_covered_dense_cable").duration(40).EUt(16);

  // black / smart_dense
  event.remove({ id: "ae2:network/cables/smart_dense_fluix_clean" });
  event.remove({ id: "ae2:network/cables/dense_smart_fluix_clean" });
  event.remove({ id: "ae2:network/cables/dense_covered_fluix_clean" });
  event.remove({ id: "ae2:network/cables/smart_dense_black" });
  event.remove({ id: "ae2:network/cables/dense_smart_black" });
  event.remove({ id: "ae2:network/cables/dense_covered_black" });
  greg.chemical_bath("gtceu:black_smart_dense_cable").itemInputs("ae2:fluix_smart_dense_cable").inputFluids("gtceu:black_dye 18").itemOutputs("ae2:black_smart_dense_cable").duration(40).EUt(16);
  greg.chemical_bath("gtceu:un_black_smart_dense_cable").itemInputs("ae2:black_smart_dense_cable").inputFluids("gtceu:chlorine 10").itemOutputs("ae2:fluix_smart_dense_cable").duration(40).EUt(16);

  event.remove({ id: "ae2:network/cables/glass_fluix" });
  greg
    .assembler("gtceu:glass_fluix_cable")
    .itemInputs("2x ae2:quartz_fiber", "ae2:fluix_crystal")
    .itemOutputs("3x ae2:fluix_glass_cable")
    .duration(100)
    .EUt(30);

  event.remove({ id: "ae2:network/cables/covered_fluix" });
  event.recipes.gtceu
    .assembler("gtceu:covered_fluix_worst")
    .itemInputs("ae2:fluix_glass_cable")
    .inputFluids("gtceu:rubber 144")
    .itemOutputs("ae2:fluix_covered_cable")
    .duration(150)
    .EUt(8);
  event.recipes.gtceu
    .assembler("gtceu:covered_fluix_mid")
    .itemInputs("ae2:fluix_glass_cable")
    .inputFluids("gtceu:styrene_butadiene_rubber 36")
    .itemOutputs("ae2:fluix_covered_cable")
    .duration(150)
    .EUt(8);
  event.recipes.gtceu
    .assembler("gtceu:covered_fluix_best")
    .itemInputs("ae2:fluix_glass_cable")
    .inputFluids("gtceu:silicone_rubber 72")
    .itemOutputs("ae2:fluix_covered_cable")
    .duration(150)
    .EUt(8);

  event.remove({ id: "ae2:network/cables/smart_fluix" });
  event.recipes.gtceu
    .assembler("gtceu:smart_cable")
    .itemInputs("8x ae2:fluix_covered_cable", "#gtceu:circuits/lv")
    .itemOutputs("8x ae2:fluix_smart_cable")
    .duration(200)
    .EUt(8);

  event.remove({ id: "ae2:network/cables/dense_covered_fluix" });
  event.recipes.gtceu
    .compressor("gtceu:dense_cable")
    .itemInputs("4x ae2:fluix_covered_cable")
    .itemOutputs("ae2:fluix_covered_dense_cable")
    .duration(400)
    .EUt(2);

  event.remove({ id: "ae2:network/cables/dense_smart_fluix" });
  event.remove({ id: "ae2:network/cables/dense_smart_from_smart" });
  event.recipes.gtceu
    .assembler("gtceu:smart_dense")
    .itemInputs("8x ae2:fluix_covered_dense_cable", "#gtceu:circuits/mv")
    .itemOutputs("8x ae2:fluix_smart_dense_cable")
    .duration(200)
    .EUt(8);
});
