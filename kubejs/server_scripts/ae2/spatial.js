ServerEvents.recipes((event) => {
  // Spatial IO captures an entire region of blocks + entities into a cell and restores it elsewhere — i.e.
  // teleporting a whole storage room, which the pack's logistics rules forbid. Crafting is disabled for the
  // port, pylon, anchor, spatial storage cells and their components so the system can't be built.
  [
    "ae2:spatial_io_port",
    "ae2:spatial_pylon",
    "ae2:spatial_anchor",
    "ae2:spatial_storage_cell_2",
    "ae2:spatial_storage_cell_16",
    "ae2:spatial_storage_cell_128",
    "ae2:spatial_cell_component_2",
    "ae2:spatial_cell_component_16",
    "ae2:spatial_cell_component_128",
  ].forEach((id) => event.remove({ output: id }));
});
