ServerEvents.recipes(event => {

    // =========================
    // CASINGS
    // =========================
    const casing = [
        { id: 'kubejs:bullet_casing_small', plates: 1, amount: 5, circuit: 1 },
        { id: 'kubejs:bullet_casing_medium', plates: 2, amount: 5, circuit: 2 },
        { id: 'kubejs:bullet_casing_large', plates: 3, amount: 5, circuit: 3 },
        { id: 'kubejs:bullet_casing_xl', plates: 4, amount: 1, circuit: 4 },
    ];

    casing.forEach(c => {
        event.recipes.gtceu.cutter(c.id)
        .itemInputs(Item.of('gtceu:brass_plate', c.plates))
        .itemOutputs(Item.of(c.id, c.amount))
        .duration(20)
        .circuit(c.circuit)
        .EUt(4);
    });

    // =========================
    // HEAVY AMMO
    // =========================
    const heavyAmmo = [
        { id: 'superbwarfare:heavy_ammo', circuit: 2, plate: 1, nugget: 1, gunpowder: 1 },
        { id: 'superbwarfare:small_shell', circuit: 3, plate: 1, nugget: 3, gunpowder: 3 },
    ];

    heavyAmmo.forEach(h => {
        event.recipes.gtceu.ammo_press(h.id)
        .itemInputs(
            Item.of('kubejs:bullet_casing_large', h.plate),
                    Item.of('gtceu:steel_nugget', h.nugget),
                    Item.of('gtceu:small_gunpowder_dust', h.gunpowder)
        )
        .itemOutputs(Item.of(h.id))
        .circuit(h.circuit)
        .duration(20)
        .EUt(4);
    });

    // =========================
    // RIFLE AMMO
    // =========================
    const rifleAmmo = [
        { id: 'tacz:ammo', nbt: '{AmmoId:"tacz:556x45"}', circuit: 4 },
        { id: 'tacz:ammo', nbt: '{AmmoId:"tacz:45_70"}', circuit: 5 },
        { id: 'tacz:ammo', nbt: '{AmmoId:"tacz:545x39"}', circuit: 6 },
        { id: 'tacz:ammo', nbt: '{AmmoId:"tacz:30_06"}', circuit: 7 },
        { id: 'tacz:ammo', nbt: '{AmmoId:"tacz:57x28"}', circuit: 8 },
        { id: 'tacz:ammo', nbt: '{AmmoId:"tacz:46x30"}', circuit: 9 },
        { id: 'tacz:ammo', nbt: '{AmmoId:"tacz:338"}', circuit: 10 },
        { id: 'tacz:ammo', nbt: '{AmmoId:"ww:77a"}', circuit: 11 },
        { id: 'tacz:ammo', nbt: '{AmmoId:"tacz:762x54"}', circuit: 12 },
        { id: 'tacz:ammo', nbt: '{AmmoId:"tacz:762x39"}', circuit: 13 },
        { id: 'tacz:ammo', nbt: '{AmmoId:"tacz:58x42"}', circuit: 14 },
        { id: 'tacz:ammo', nbt: '{AmmoId:"ww:303"}', circuit: 15 },
        { id: 'tacz:ammo', nbt: '{AmmoId:"tacz:308"}', circuit: 16 },
        { id: 'tacz:ammo', nbt: '{AmmoId:"tacz:68x51fury"}', circuit: 17 },
        { id: 'tacz:ammo', nbt: '{AmmoId:"ww:30c"}', circuit: 18 },
        { id: 'tacz:ammo', nbt: '{AmmoId:"tacz:12g"}', circuit: 19 },
        { id: 'tacz:ammo', nbt: '{AmmoId:"ronmc:10mm"}', circuit: 20 },
        { id: 'tacz:ammo', nbt: '{AmmoId:"ronmc:762x51"}', circuit: 21 },
        { id: 'tacz:ammo', nbt: '{AmmoId:"ronmc:65x48"}', circuit: 22 },
    ];

    rifleAmmo.forEach(ammo => {
        event.remove({ output: Item.of(ammo.id, ammo.nbt) });

        event.recipes.gtceu.ammo_press(`rifle_ammo_${ammo.circuit}`)
        .itemInputs(
            Item.of('kubejs:bullet_casing_medium'),
                    'gtceu:lead_nugget',
                    'gtceu:small_gunpowder_dust'
        )
        .itemOutputs(Item.of(ammo.id, 5, ammo.nbt))
        .circuit(ammo.circuit)
        .duration(20)
        .EUt(4);
    });

    // =========================
    // PISTOL AMMO
    // =========================
    const pistolAmmo = [

 { id: 'tacz:ammo', nbt: '{AmmoId:"tacz:762x25"}', circuit: 1 },
  { id: 'tacz:ammo', nbt: '{AmmoId:"tacz:45acp"}', circuit: 2 },
   { id: 'tacz:ammo', nbt: '{AmmoId:"ww8mm:8mm"}', circuit: 3 },
   { id: 'tacz:ammo', nbt: '{AmmoId:"tacz:9mm"}', circuit: 4 },
   { id: 'tacz:ammo', nbt: '{AmmoId:"ww:765"}', circuit: 5 },
{ id: 'tacz:ammo', nbt: '{AmmoId:"tacz:357mag"}', circuit: 6 },
{ id: 'tacz:ammo', nbt: '{AmmoId:"ronmc:10mm"}', circuit: 7 },
    ];

    pistolAmmo.forEach(ammo => {
        event.remove({ output: Item.of(ammo.id, ammo.nbt) });

        event.recipes.gtceu.ammo_press(`pistol_ammo_${ammo.circuit}`)
        .itemInputs(
            Item.of('kubejs:bullet_casing_small'),
                    'gtceu:tiny_gunpowder_dust',
                    'gtceu:lead_nugget'
        )
        .itemOutputs(Item.of(ammo.id, 7, ammo.nbt))
        .circuit(ammo.circuit)
        .duration(20)
        .EUt(4);
    });

    // =========================
    // PARTS - GRIPS
    // =========================
    const GRIPS = [
        { id: 'kubejs:grip_wooden', inputs: ['gtceu:treated_wood_rod', 'gtceu:treated_wood_plate'], circuit: 1, duration: 100, eut: 16 },
        { id: 'kubejs:grip_steel', inputs: ['gtceu:steel_plate', 'gtceu:steel_rod'], circuit: 2, duration: 200, eut: 30 },
        { id: 'kubejs:grip_plastic', inputs: ['gtceu:silicone_rubber_plate', 'gtceu:rubber_ring'], circuit: 3, duration: 200, eut: 30 },
    ];

    GRIPS.forEach(g => {
        event.recipes.gtceu.assembler(g.id)
        .itemInputs(g.inputs[0], g.inputs[1])
        .itemOutputs(Item.of(g.id))
        .circuit(g.circuit)
        .duration(g.duration)
        .EUt(g.eut);
    });

    // =========================
    // PARTS - STOCKS
    // =========================
    const STOCKS = [
        { id: 'kubejs:stock_wooden', inputs: ['gtceu:treated_wood_plate'], circuit: 1, duration: 100, eut: 16 },
        { id: 'kubejs:stock_steel', inputs: ['gtceu:steel_plate'], circuit: 2, duration: 200, eut: 30 },
        { id: 'kubejs:stock_plastic', inputs: ['gtceu:silicone_rubber_plate'], circuit: 3, duration: 200, eut: 30 },
    ];

    STOCKS.forEach(s => {
        event.recipes.gtceu.assembler(s.id)
        .itemInputs(s.inputs[0])
        .itemOutputs(Item.of(s.id))
        .circuit(s.circuit)
        .duration(s.duration)
        .EUt(s.eut)
    });

    // =========================
    // MISC
    // =========================
    event.recipes.gtceu.assembler('kubejs:solid_rocket_fuel')
    .itemInputs('gtceu:sulfur_dust', 'gtceu:saltpeter_dust', 'gtceu:charcoal_dust')
    .itemOutputs('kubejs:solid_rocket_fuel')
    .circuit(1)
    .duration(200)
    .EUt(30);

    event.recipes.gtceu.assembler('kubejs:rpg')
    .itemInputs(
        Item.of('kubejs:heavy_barrel_steel', 3),
                Item.of('gtceu:treated_wood_plate', 2),
                Item.of('gtceu:small_steel_spring')
    )
    .circuit(1)
    .itemOutputs(Item.of('superbwarfare:rpg'))
    .duration(400)
    .addCondition(WFResearch.condition('my_research'))
    .EUt(16)

    // =========================
    // ATTACHMENTS - SCOPES
    // =========================
    const scopes = [
        // ===== Red Dots / Reflex Sights =====
       // { id: 'pointblank:aimpoint',         circuit: 1,  lenses: 1, screws: 2, plates: 1 },
       // { id: 'pointblank:aimpoint_t2',      circuit: 2,  lenses: 1, screws: 2, plates: 1 },
       // { id: 'pointblank:delta',            circuit: 3,  lenses: 1, screws: 2, plates: 1 },
       // { id: 'pointblank:hi_red',           circuit: 4,  lenses: 1, screws: 2, plates: 1 },
       // { id: 'pointblank:hi_red_zoom',      circuit: 5,  lenses: 2, screws: 2, plates: 1 },
       // { id: 'pointblank:holographic',      circuit: 6,  lenses: 1, screws: 3, plates: 1 },
      //  { id: 'pointblank:holographic558',   circuit: 7,  lenses: 2, screws: 3, plates: 1 },
       // { id: 'pointblank:holographic_em',   circuit: 8,  lenses: 1, screws: 3, plates: 1 },
      //  { id: 'pointblank:operatorreflex',   circuit: 9,  lenses: 1, screws: 2, plates: 1 },
      //  // ===== Combat Optics =====
    //    { id: 'pointblank:acog',             circuit: 10, lenses: 2, screws: 4, plates: 2 },
   //     { id: 'pointblank:specter',          circuit: 11, lenses: 2, screws: 4, plates: 2 },
     //   { id: 'pointblank:ppco',             circuit: 12, lenses: 2, screws: 4, plates: 2 },
    //    { id: 'pointblank:hamr',             circuit: 13, lenses: 2, screws: 4, plates: 2 },
        // ===== Precision / Sniper Scopes =====
    //    { id: 'pointblank:drake_scope',      circuit: 14, lenses: 4, screws: 6, plates: 3 },
     //   { id: 'pointblank:eaglescope',       circuit: 15, lenses: 4, screws: 6, plates: 3 },
   //     { id: 'pointblank:hawk_scope',       circuit: 16, lenses: 4, screws: 6, plates: 3 },
      //  { id: 'pointblank:wolf_scope',       circuit: 17, lenses: 4, screws: 6, plates: 3 },
     //   { id: 'pointblank:precision_scope',  circuit: 18, lenses: 5, screws: 8, plates: 4 },
     //   { id: 'pointblank:pu_scope',         circuit: 19, lenses: 3, screws: 5, plates: 2 },
     //   { id: 'pointblank:rspec',            circuit: 20, lenses: 5, screws: 8, plates: 4 },
    ];

    scopes.forEach(s => {
        event.recipes.gtceu.assembler(`scope_${s.circuit}`)
        .itemInputs(
            Item.of('gtceu:glass_lens', s.lenses),
                    Item.of('gtceu:steel_screw', s.screws),
                    Item.of('gtceu:aluminium_plate', s.plates)
        )
        .itemOutputs(Item.of(s.id))
        .circuit(s.circuit)
        .duration(100)
        .EUt(30);
    });
});
