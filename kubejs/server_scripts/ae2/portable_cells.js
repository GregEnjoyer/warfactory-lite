ServerEvents.recipes((event) => {
  // Portable cells (item + fluid, every tier) are self-contained pocket ME storage — a compact stash you
  // carry, i.e. a way to compress and move combat supplies past logistics. All crafting is removed; no
  // replacement recipes are added, so no portable cell is craftable.
  ["1k", "4k", "16k", "64k", "256k"].forEach((tier) => {
    event.remove({ output: `ae2:portable_item_cell_${tier}` });
    event.remove({ output: `ae2:portable_fluid_cell_${tier}` });
  });
});
