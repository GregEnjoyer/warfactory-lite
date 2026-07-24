ServerEvents.recipes(event => {

event.shaped(
  Item.of('wfcore:large_blast_furnace', 1), // arg 1: output
  [
    'ABC',
    'DEB', // arg 2: the shape (array of strings)
    'FBC'
  ],
  {
    A: '#forge:tools/hammers',
    B: 'gtceu:steel_rod',  //arg 3: the mapping object
    C: 'gtceu:steel_screw',
    D: 'gtceu:steel_plate',
    E: 'gtceu:firebricks',
    F: '#gtceu:tools/crafting_screwdrivers'
  }
)
event.shaped(
  Item.of('wfcore:primitive_alloyer', 1), // arg 1: output
  [
    'ECE',
    'ABF', // arg 2: the shape (array of strings)
    'ECE'
  ],
  {
    A: '#forge:tools/hammers',
    B: 'gtceu:hp_steam_alloy_smelter',  //arg 3: the mapping object
    C: 'gtceu:steel_large_fluid_pipe',
    E: 'gtceu:firebricks',
    F: '#gtceu:tools/crafting_screwdrivers'
  }
)


event.shaped(
  Item.of('wfcore:strandcaster', 1), // arg 1: output
  [
    'ECE',
    'ABF', // arg 2: the shape (array of strings)
    'EGE'
  ],
  {
    A: '#forge:tools/hammers',
    B: 'gtceu:firebricks',  //arg 3: the mapping object
    C: 'gtceu:wood_crate',
    E: 'gtceu:steel_normal_fluid_pipe',
    F: '#gtceu:tools/crafting_wrenches',
    G: 'gtceu:bronze_drum'
  }
)
event.recipes.gtceu.fluid_solidifier("kubejs:galvanized_steel")
.inputFluids('gtceu:zinc 3000')
.itemInputs('gtceu:steel_ingot')
.itemOutputs('wfcore:galvanized_steel_ingot')
.duration(200)
.EUt(32)
})