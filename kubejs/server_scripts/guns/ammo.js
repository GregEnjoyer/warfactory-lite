// ============================================================================
// ammo.js — SINGLE consolidated source for ALL ammunition & ordnance recipes.
//
// Replaces the ammo that used to be smeared across:
//   - guns_and_ammo.js  (casings, heavy/rifle/pistol/other/heavy-ordnance ammo)
//   - hfian_ammo.js     (superbwarfare small-arms, shells, grenades, mines,
//                        rockets, missiles, bombs, drones)  — file deleted
//   - smg_rifles.js     (mortar shell)                      — block removed
//   - early_guns.js     (.45-70 hand-crafting bootstrap)    — block moved here
// Those files now keep ONLY guns / gun-parts / attachments.
//
// ---------------------------------------------------------------------------
// CASING TIERS  (the whole point of the cleanup — casing must match caliber)
//   small   kubejs:bullet_casing_small   "Pistol Casings"       -> handgun / PDW / non-lethal
//   medium  kubejs:bullet_casing_medium  "Rifle Casing"         -> rifle / SMG / intermediate / shotgun
//   large   kubejs:bullet_casing_large   "Heavy Rifle Casings"  -> HMG / sniper / .50BMG / autocannon shell
//   xl      kubejs:bullet_casing_xl      "Vehicle Sized Casing" -> tank/artillery shells, 40mm, rockets
// Muzzle-loaded ordnance (mortar bombs) and multi-part ordnance (grenades,
// mines, missiles, bombs, drones) are NOT cased.
//
// MACHINE / CIRCUIT convention
//   ammo_press  -> anything pressed into a casing, plus mortar bombs
//   assembler   -> multi-component ordnance (grenades, mines, rockets, boxes...)
//   Programmed-circuit numbers are unique WITHIN a shared input signature (a
//   "batch"); they may repeat across batches because the item inputs differ.
//
// REMOVALS
//   TaCZ funnels every default ammo recipe through tacz:gun_smith_table_crafting,
//   which cleanup/remove_crafting.js already strips wholesale — so no per-caliber
//   tacz removes are needed here. Superb Warfare is messier, so its ammo/ordnance
//   outputs are removed explicitly below (belt-and-suspenders).
// ============================================================================

ServerEvents.recipes(event => {

    const CASING_SMALL  = 'kubejs:bullet_casing_small';   // Pistol Casings
    const CASING_MEDIUM = 'kubejs:bullet_casing_medium';  // Rifle Casing
    const CASING_LARGE  = 'kubejs:bullet_casing_large';   // Heavy Rifle Casings
    const CASING_XL     = 'kubejs:bullet_casing_xl';      // Vehicle Sized Casing

    // tacz ammo is one item (tacz:ammo) discriminated by an AmmoId NBT tag.
    const tacz = id => `{AmmoId:"${id}"}`;

    // -----------------------------------------------------------------------
    // Strip Superb Warfare's default (crafting/smithing) recipes for every
    // ammo & ordnance output we re-issue below.
    // -----------------------------------------------------------------------
    [
        'handgun_ammo', 'rifle_ammo', 'sniper_ammo', 'shotgun_ammo',
        'handgun_ammo_box', 'rifle_ammo_box', 'sniper_ammo_box', 'shotgun_ammo_box',
        'heavy_ammo', 'small_shell_ap', 'small_shell_he', 'small_shell_gs', 'small_shell_aa',
        'large_shell_ap', 'large_shell_he', 'large_shell_cm', 'large_shell_gs', 'large_shell_wp',
        'grenade_40mm', 'hand_grenade', 'rgo_grenade', 'm18_smoke_grenade',
        'claymore_mine', 'tm_62', 'ptkm_1r', 'lunge_mine',
        'mortar_shell', 'mortar_shell_wp',
        'rpg_rocket_standard', 'rpg_rocket_tbg',
        'small_rocket', 'medium_rocket_ap', 'medium_rocket_he', 'medium_rocket_cm',
        'medium_anti_air_missile', 'medium_anti_ground_missile', 'large_anti_ground_missile', 'javelin_missile',
        'small_aerial_bomb', 'medium_aerial_bomb',
        'drone', 'swarm_drone',
    ].forEach(id => event.remove({ output: `superbwarfare:${id}` }));

    // =======================================================================
    // 1. CASING PRODUCTION  (brass plate -> empty casings, on the cutter)
    // =======================================================================
    [
        { id: CASING_SMALL,  plates: 1, amount: 5, circuit: 1 },
        { id: CASING_MEDIUM, plates: 2, amount: 5, circuit: 2 },
        { id: CASING_LARGE,  plates: 3, amount: 5, circuit: 3 },
        { id: CASING_XL,     plates: 4, amount: 1, circuit: 4 },
    ].forEach(c => {
        event.recipes.gtceu.cutter(c.id)
            .itemInputs(Item.of('gtceu:brass_plate', c.plates))
            .itemOutputs(Item.of(c.id, c.amount))
            .circuit(c.circuit)
            .duration(20)
            .EUt(4);
    });

    // =======================================================================
    // 2. AMMO COMPONENTS
    // =======================================================================
    // Solid rocket fuel — cheap assembler route (a chemical-reactor route also
    // exists in vehicles/parts.js). Consumed by the RPG/rocket rounds below.
    event.recipes.gtceu.assembler('kubejs:solid_rocket_fuel')
        .itemInputs('gtceu:sulfur_dust', 'gtceu:saltpeter_dust', 'gtceu:charcoal_dust')
        .itemOutputs('kubejs:solid_rocket_fuel')
        .circuit(1)
        .duration(200)
        .EUt(30);

    // =======================================================================
    // 3. PRESSED CARTRIDGES  (one casing + core + propellant, on the ammo press)
    // Helper: every entry in a batch shares `inputs`, so each needs a unique
    // circuit. `count` is per-press yield for the whole batch.
    // =======================================================================
    function cartridgeBatch(prefix, inputs, count, duration, eut, entries) {
        entries.forEach(e => {
            event.recipes.gtceu.ammo_press(`kubejs:${prefix}_${e.circuit}`)
                .itemInputs(inputs)
                .itemOutputs(e.nbt ? Item.of(e.out, count, e.nbt) : Item.of(e.out, count))
                .circuit(e.circuit)
                .duration(duration)
                .EUt(eut);
        });
    }

    // ---- PISTOL / handgun rounds  (small casing, lead nugget, tiny gunpowder) ----
    cartridgeBatch('ammo_pistol',
        [Item.of(CASING_SMALL, 1), 'gtceu:lead_nugget', 'gtceu:tiny_gunpowder_dust'], 6, 20, 4, [
            { out: 'tacz:ammo', nbt: tacz('tacz:762x25'),      circuit: 1 },
            { out: 'tacz:ammo', nbt: tacz('tacz:45acp'),       circuit: 2 },
            { out: 'tacz:ammo', nbt: tacz('ww:8mm'),           circuit: 3 },
            { out: 'tacz:ammo', nbt: tacz('tacz:9mm'),         circuit: 4 },
            { out: 'tacz:ammo', nbt: tacz('ww:765'),           circuit: 5 },
            { out: 'tacz:ammo', nbt: tacz('tacz:357mag'),      circuit: 6 },
            { out: 'tacz:ammo', nbt: tacz('ronmc:10mm'),       circuit: 7 },
            { out: 'tacz:ammo', nbt: tacz('tacz:22wmr'),       circuit: 8 },  // was "vehicle" casing
            { out: 'tacz:ammo', nbt: tacz('tacz:500mag'),      circuit: 9 },  // was "vehicle" casing
            { out: 'tacz:ammo', nbt: tacz('tacz:50ae'),        circuit: 10 }, // was "vehicle" casing
            { out: 'tacz:ammo', nbt: tacz('ww:763'),           circuit: 11 }, // was "vehicle" casing
            { out: 'tacz:ammo', nbt: tacz('ronmc:68pepperball'), circuit: 12 }, // non-lethal, was "vehicle" casing
            { out: 'tacz:ammo', nbt: tacz('ronmc:train_9mm'),  circuit: 13 }, // was "vehicle" casing
            { out: 'superbwarfare:handgun_ammo',               circuit: 14 },
        ]);

    // ---- RIFLE / SMG / intermediate rounds  (medium casing, lead nugget, small gunpowder) ----
    cartridgeBatch('ammo_rifle',
        [Item.of(CASING_MEDIUM, 1), 'gtceu:lead_nugget', 'gtceu:small_gunpowder_dust'], 5, 20, 4, [
            { out: 'tacz:ammo', nbt: tacz('tacz:556x45'),      circuit: 1 },
            { out: 'tacz:ammo', nbt: tacz('tacz:45_70'),       circuit: 2 },
            { out: 'tacz:ammo', nbt: tacz('tacz:545x39'),      circuit: 3 },
            { out: 'tacz:ammo', nbt: tacz('tacz:30_06'),       circuit: 4 },
            { out: 'tacz:ammo', nbt: tacz('tacz:57x28'),       circuit: 5 },  // PDW
            { out: 'tacz:ammo', nbt: tacz('tacz:46x30'),       circuit: 6 },  // PDW
            { out: 'tacz:ammo', nbt: tacz('ww:77a'),           circuit: 7 },
            { out: 'tacz:ammo', nbt: tacz('tacz:762x54'),      circuit: 8 },
            { out: 'tacz:ammo', nbt: tacz('tacz:762x39'),      circuit: 9 },
            { out: 'tacz:ammo', nbt: tacz('tacz:58x42'),       circuit: 10 },
            { out: 'tacz:ammo', nbt: tacz('ww:303'),           circuit: 11 },
            { out: 'tacz:ammo', nbt: tacz('tacz:308'),         circuit: 12 },
            { out: 'tacz:ammo', nbt: tacz('tacz:68x51fury'),   circuit: 13 },
            { out: 'tacz:ammo', nbt: tacz('ww:30c'),           circuit: 14 },
            { out: 'tacz:ammo', nbt: tacz('ronmc:762x51'),     circuit: 15 },
            { out: 'tacz:ammo', nbt: tacz('ronmc:65x48'),      circuit: 16 },
            { out: 'tacz:ammo', nbt: tacz('ronmc:300blk'),     circuit: 17 }, // was "vehicle" casing
            { out: 'tacz:ammo', nbt: tacz('ronmc:train_556x45'), circuit: 18 }, // was "vehicle" casing
            { out: 'tacz:ammo', nbt: tacz('tacz:792x57'),      circuit: 19 }, // was "vehicle" casing
            { out: 'tacz:ammo', nbt: tacz('ww:65a'),           circuit: 20 }, // was "vehicle" casing
            { out: 'superbwarfare:rifle_ammo',                 circuit: 21 },
        ]);

    // ---- SHOTGUN / pellet rounds  (medium casing, 3x lead pellets, tiny gunpowder) ----
    cartridgeBatch('ammo_shotgun',
        [Item.of(CASING_MEDIUM, 1), Item.of('gtceu:lead_nugget', 3), 'gtceu:tiny_gunpowder_dust'], 5, 20, 4, [
            { out: 'tacz:ammo', nbt: tacz('tacz:12g'),         circuit: 1 },  // 12ga, was "rifle" batch
            { out: 'tacz:ammo', nbt: tacz('ronmc:bean_bag'),   circuit: 2 },  // was "vehicle" casing
            { out: 'tacz:ammo', nbt: tacz('ronmc:slug'),       circuit: 3 },  // was "vehicle" casing
            { out: 'superbwarfare:shotgun_ammo',               circuit: 4 },
        ]);

    // ---- HEAVY rifle / HMG / sniper  (large casing, steel core, small gunpowder) ----
    cartridgeBatch('ammo_heavy',
        [Item.of(CASING_LARGE, 1), 'gtceu:steel_nugget', 'gtceu:small_gunpowder_dust'], 3, 20, 4, [
            { out: 'superbwarfare:heavy_ammo',                 circuit: 1 },
            { out: 'tacz:ammo', nbt: tacz('tacz:338'),         circuit: 2 },  // .338 sniper, was "rifle" batch
            { out: 'superbwarfare:sniper_ammo',                circuit: 3 },  // was "vehicle" casing
        ]);

    // ---- .50 BMG  (its own heavy load: double large casing + steel plate) ----
    event.recipes.gtceu.ammo_press('kubejs:ammo_50bmg')
        .itemInputs(Item.of(CASING_LARGE, 2), Item.of('gtceu:steel_plate', 1), Item.of('gtceu:small_gunpowder_dust', 2))
        .itemOutputs(Item.of('tacz:ammo', 2, tacz('tacz:50bmg')))   // was "vehicle" casing
        .circuit(1)
        .duration(60)
        .EUt(30);

    // ---- Small vehicle shells  (large casing, heavy steel + propellant load) ----
    cartridgeBatch('ammo_small_shell',
        [Item.of(CASING_LARGE, 1), Item.of('gtceu:steel_nugget', 3), Item.of('gtceu:small_gunpowder_dust', 3)], 1, 20, 4, [
            { out: 'superbwarfare:small_shell_ap', circuit: 1 },
            { out: 'superbwarfare:small_shell_he', circuit: 2 },
            { out: 'superbwarfare:small_shell_gs', circuit: 3 },
            { out: 'superbwarfare:small_shell_aa', circuit: 4 },
        ]);

    // =======================================================================
    // 4. VEHICLE / ARTILLERY ORDNANCE  (xl casing, on the ammo press)
    // Circuits are unique across this whole group so the ones with matching
    // fills (the two 40mm, the three rockets) can't collide.
    // =======================================================================

    // ---- Large tank/artillery shells (fill varies per type) ----
    [
        { out: 'superbwarfare:large_shell_ap', circuit: 1, inputs: [Item.of(CASING_XL, 1), Item.of('gtceu:steel_nugget', 3), Item.of('gtceu:small_gunpowder_dust', 2)] },
        { out: 'superbwarfare:large_shell_he', circuit: 2, inputs: [Item.of(CASING_XL, 1), Item.of('gtceu:dynamite', 1), Item.of('gtceu:small_gunpowder_dust', 1)] },
        { out: 'superbwarfare:large_shell_cm', circuit: 3, inputs: [Item.of(CASING_XL, 2), Item.of('gtceu:dynamite', 2)] },
        { out: 'superbwarfare:large_shell_gs', circuit: 4, inputs: [Item.of(CASING_XL, 1), Item.of('gtceu:lead_nugget', 6), Item.of('gtceu:small_gunpowder_dust', 1)] },
        { out: 'superbwarfare:large_shell_wp', circuit: 5, inputs: [Item.of(CASING_XL, 1), Item.of('gtceu:phosphorus_dust', 1), Item.of('gtceu:sulfur_dust', 1)] },
    ].forEach(s => {
        event.recipes.gtceu.ammo_press(`kubejs:ammo_${s.out.split(':')[1]}`)
            .itemInputs(s.inputs)
            .itemOutputs(Item.of(s.out, 1))
            .circuit(s.circuit)
            .duration(60)
            .EUt(30);
    });

    // ---- 40mm grenade rounds (xl casing + dynamite) ----
    event.recipes.gtceu.ammo_press('kubejs:ammo_40mm')
        .itemInputs(Item.of(CASING_XL, 1), Item.of('gtceu:dynamite', 1))
        .itemOutputs(Item.of('tacz:ammo', 2, tacz('tacz:40mm')))
        .circuit(6)
        .duration(100)
        .EUt(30);

    event.recipes.gtceu.ammo_press('kubejs:ammo_grenade_40mm')
        .itemInputs(Item.of(CASING_XL, 1), Item.of('gtceu:dynamite', 1))
        .itemOutputs(Item.of('superbwarfare:grenade_40mm', 2))
        .circuit(7)
        .duration(100)
        .EUt(30);

    // ---- RPG / rocket rounds (xl casing + explosive + solid rocket fuel) ----
    event.recipes.gtceu.ammo_press('kubejs:ammo_rpg_rocket')
        .itemInputs(Item.of(CASING_XL, 2), Item.of('gtceu:dynamite', 1), 'kubejs:solid_rocket_fuel')
        .itemOutputs(Item.of('tacz:ammo', 1, tacz('tacz:rpg_rocket')))
        .circuit(8)
        .duration(200)
        .EUt(30);

    event.recipes.gtceu.ammo_press('kubejs:ammo_rpg_rocket_standard')
        .itemInputs(Item.of(CASING_XL, 2), Item.of('gtceu:dynamite', 1), 'kubejs:solid_rocket_fuel')
        .itemOutputs(Item.of('superbwarfare:rpg_rocket_standard', 1))
        .circuit(9)
        .duration(200)
        .EUt(30);

    event.recipes.gtceu.ammo_press('kubejs:ammo_rpg_rocket_tbg')
        .itemInputs(Item.of(CASING_XL, 2), Item.of('gtceu:magnesium_dust', 2), 'kubejs:solid_rocket_fuel')
        .itemOutputs(Item.of('superbwarfare:rpg_rocket_tbg', 1))
        .circuit(10)
        .duration(200)
        .EUt(30);

    // =======================================================================
    // 5. MORTAR BOMBS  (muzzle-loaded — no casing)
    // =======================================================================
    event.recipes.gtceu.ammo_press('kubejs:ammo_mortar_shell')
        .itemInputs('minecraft:gunpowder', 'gtceu:steel_plate')
        .itemOutputs(Item.of('superbwarfare:mortar_shell', 4))
        .duration(40)
        .EUt(30);

    event.recipes.gtceu.ammo_press('kubejs:ammo_mortar_shell_wp')
        .itemInputs('gtceu:steel_plate', 'gtceu:phosphorus_dust', 'gtceu:sulfur_dust')
        .itemOutputs(Item.of('superbwarfare:mortar_shell_wp', 2))
        .circuit(1)
        .duration(60)
        .EUt(30);

    // =======================================================================
    // 6. AMMO BOXES  (assembler packs loose rounds into a crate; steel = the tin)
    // =======================================================================
    [
        { out: 'superbwarfare:handgun_ammo_box', in: 'superbwarfare:handgun_ammo', qty: 30, circuit: 1 },
        { out: 'superbwarfare:rifle_ammo_box',   in: 'superbwarfare:rifle_ammo',   qty: 30, circuit: 2 },
        { out: 'superbwarfare:sniper_ammo_box',  in: 'superbwarfare:sniper_ammo',  qty: 12, circuit: 3 },
        { out: 'superbwarfare:shotgun_ammo_box', in: 'superbwarfare:shotgun_ammo', qty: 12, circuit: 4 },
    ].forEach(b => {
        event.recipes.gtceu.assembler(`kubejs:${b.out.split(':')[1]}`)
            .itemInputs(Item.of(b.in, b.qty), Item.of('gtceu:steel_plate', 1))
            .itemOutputs(Item.of(b.out, 1))
            .circuit(b.circuit)
            .duration(60)
            .EUt(16);
    });

    // =======================================================================
    // 7. THROWN / PLACED ORDNANCE  (assembler — multi-component, no casing)
    // =======================================================================

    // Hand grenade — steel body + dynamite fill + spring-loaded fuze
    event.recipes.gtceu.assembler('kubejs:sw_hand_grenade')
        .itemInputs(Item.of('gtceu:steel_plate', 2), Item.of('gtceu:dynamite', 1), Item.of('gtceu:small_steel_spring', 1))
        .itemOutputs(Item.of('superbwarfare:hand_grenade', 2))
        .circuit(1).duration(200).EUt(32);

    // RGO grenade — fragmentation body; screws = segmented outer sleeve
    event.recipes.gtceu.assembler('kubejs:sw_rgo_grenade')
        .itemInputs(Item.of('gtceu:steel_plate', 2), Item.of('gtceu:dynamite', 1), Item.of('gtceu:steel_screw', 4))
        .itemOutputs(Item.of('superbwarfare:rgo_grenade', 2))
        .circuit(2).duration(200).EUt(32);

    // M18 smoke grenade — non-lethal; dye = colored smoke agent
    event.recipes.gtceu.assembler('kubejs:sw_m18_smoke_grenade')
        .itemInputs(Item.of('gtceu:steel_plate', 1), Item.of('gtceu:small_gunpowder_dust', 1), Item.of('#forge:dyes/white', 1))
        .itemOutputs(Item.of('superbwarfare:m18_smoke_grenade', 2))
        .circuit(3).duration(200).EUt(32);

    // Claymore mine — directional; basic circuit for the fuze board
    event.recipes.gtceu.assembler('kubejs:sw_claymore_mine')
        .itemInputs(Item.of('gtceu:steel_plate', 3), Item.of('gtceu:dynamite', 2), Item.of('gtceu:basic_electronic_circuit', 1))
        .itemOutputs(Item.of('superbwarfare:claymore_mine', 1))
        .circuit(1).duration(300).EUt(32);

    // TM-62 anti-tank mine — HE fill, heavy pressure plate
    event.recipes.gtceu.assembler('kubejs:sw_tm_62')
        .itemInputs(Item.of('gtceu:double_steel_plate', 2), Item.of('gtceu:dynamite', 3), Item.of('gtceu:small_steel_spring', 1))
        .itemOutputs(Item.of('superbwarfare:tm_62', 1))
        .circuit(2).duration(300).EUt(32);

    // PTKM-1R — smart AT mine; seeker for autonomous activation
    event.recipes.gtceu.assembler('kubejs:sw_ptkm_1r')
        .itemInputs(Item.of('gtceu:stainless_steel_plate', 3), Item.of('gtceu:dynamite', 3), Item.of('superbwarfare:seeker', 1))
        .itemOutputs(Item.of('superbwarfare:ptkm_1r', 1))
        .circuit(3).duration(400).EUt(128);

    // Lunge mine — suicide contact fuze on a pole (long rod = the pole)
    event.recipes.gtceu.assembler('kubejs:sw_lunge_mine')
        .itemInputs(Item.of('gtceu:steel_plate', 2), Item.of('gtceu:dynamite', 3), Item.of('gtceu:long_steel_rod', 1))
        .itemOutputs(Item.of('superbwarfare:lunge_mine', 1))
        .circuit(4).duration(200).EUt(32);

    // =======================================================================
    // 8. ROCKETS & GUIDED MISSILES  (assembler — engine/seeker driven)
    // =======================================================================

    // Small unguided rocket — steel tube + motor + dynamite warhead
    event.recipes.gtceu.assembler('kubejs:sw_small_rocket')
        .itemInputs(Item.of('gtceu:steel_plate', 2), Item.of('superbwarfare:missile_engine', 1), Item.of('gtceu:dynamite', 1))
        .itemOutputs(Item.of('superbwarfare:small_rocket', 2))
        .circuit(1).duration(200).EUt(32);

    // Medium unguided rockets — same motor, warhead fill varies
    [
        { out: 'superbwarfare:medium_rocket_ap', circuit: 2, inputs: [Item.of('gtceu:steel_plate', 2), Item.of('superbwarfare:missile_engine', 1), Item.of('gtceu:steel_nugget', 4), Item.of('gtceu:small_gunpowder_dust', 1)] },
        { out: 'superbwarfare:medium_rocket_he', circuit: 3, inputs: [Item.of('gtceu:steel_plate', 2), Item.of('superbwarfare:missile_engine', 1), Item.of('gtceu:dynamite', 1)] },
        { out: 'superbwarfare:medium_rocket_cm', circuit: 4, inputs: [Item.of('gtceu:steel_plate', 2), Item.of('superbwarfare:missile_engine', 1), Item.of('gtceu:dynamite', 2)] },
    ].forEach(r => {
        event.recipes.gtceu.assembler(`kubejs:${r.out.split(':')[1]}`)
            .itemInputs(r.inputs)
            .itemOutputs(Item.of(r.out, 1))
            .circuit(r.circuit).duration(300).EUt(128);
    });

    // Guided missiles (seeker required)
    event.recipes.gtceu.assembler('kubejs:sw_medium_anti_air_missile')
        .itemInputs(Item.of('gtceu:stainless_steel_plate', 2), Item.of('superbwarfare:missile_engine', 1), Item.of('gtceu:dynamite', 1), Item.of('superbwarfare:seeker', 1))
        .itemOutputs(Item.of('superbwarfare:medium_anti_air_missile', 1))
        .circuit(5).duration(400).EUt(128);

    event.recipes.gtceu.assembler('kubejs:sw_medium_anti_ground_missile')
        .itemInputs(Item.of('gtceu:stainless_steel_plate', 2), Item.of('superbwarfare:missile_engine', 1), Item.of('gtceu:dynamite', 2), Item.of('superbwarfare:seeker', 1))
        .itemOutputs(Item.of('superbwarfare:medium_anti_ground_missile', 1))
        .circuit(6).duration(400).EUt(128);

    event.recipes.gtceu.assembler('kubejs:sw_large_anti_ground_missile')
        .itemInputs(Item.of('gtceu:titanium_plate', 2), Item.of('superbwarfare:large_motor', 1), Item.of('gtceu:dynamite', 4), Item.of('superbwarfare:seeker', 1))
        .itemOutputs(Item.of('superbwarfare:large_anti_ground_missile', 1))
        .circuit(7).duration(600).EUt(512);

    event.recipes.gtceu.assembler('kubejs:sw_javelin_missile')
        .itemInputs(Item.of('gtceu:stainless_steel_plate', 2), Item.of('superbwarfare:missile_engine', 1), Item.of('gtceu:dynamite', 2), Item.of('superbwarfare:seeker', 1))
        .itemOutputs(Item.of('superbwarfare:javelin_missile', 1))
        .circuit(8).duration(400).EUt(128);

    // =======================================================================
    // 9. AERIAL BOMBS  (gravity-delivered; steel ring = stabiliser fin ring)
    // =======================================================================
    event.recipes.gtceu.assembler('kubejs:sw_small_aerial_bomb')
        .itemInputs(Item.of('gtceu:steel_plate', 3), Item.of('gtceu:dynamite', 2), Item.of('gtceu:steel_ring', 1))
        .itemOutputs(Item.of('superbwarfare:small_aerial_bomb', 2))
        .circuit(1).duration(300).EUt(32);

    event.recipes.gtceu.assembler('kubejs:sw_medium_aerial_bomb')
        .itemInputs(Item.of('gtceu:steel_plate', 5), Item.of('gtceu:dynamite', 4), Item.of('gtceu:steel_ring', 1))
        .itemOutputs(Item.of('superbwarfare:medium_aerial_bomb', 1))
        .circuit(2).duration(400).EUt(32);

    // =======================================================================
    // 10. DRONES
    // =======================================================================
    // Base drone — 4 motors + 4 propellers + circuit + poly housing
    event.recipes.gtceu.assembler('kubejs:sw_drone')
        .itemInputs(Item.of('superbwarfare:motor', 4), Item.of('superbwarfare:propeller', 4), Item.of('gtceu:basic_electronic_circuit', 1), Item.of('gtceu:polyethylene_plate', 2))
        .itemOutputs(Item.of('superbwarfare:drone', 1))
        .circuit(1).duration(400).EUt(128);

    // Swarm (kamikaze) drone — base drone + seeker + dynamite warhead
    event.recipes.gtceu.assembler('kubejs:sw_swarm_drone')
        .itemInputs(Item.of('superbwarfare:drone', 1), Item.of('superbwarfare:seeker', 1), Item.of('gtceu:dynamite', 1))
        .itemOutputs(Item.of('superbwarfare:swarm_drone', 1))
        .circuit(2).duration(400).EUt(128);
});

// ============================================================================
// PRIMITIVE BOOTSTRAP — hand-crafted .45-70 (moved from early_guns.js)
// The only bench-craftable ammo: a starter round for the Springfield 1873 so
// you can fire it before you have an ammo press. Once the press line is up, the
// ammo_pistol/rifle batches above are how ammo is actually mass-produced.
// ============================================================================
ServerEvents.recipes(event => {
    event.shaped(
        Item.of('tacz:ammo', 12, '{AmmoId:"tacz:45_70"}'),
        [' I ', ' G ', ' P '],
        { I: 'gtceu:lead_nugget', G: 'gtceu:tiny_gunpowder_dust', P: 'gtceu:brass_plate' }
    );
});
