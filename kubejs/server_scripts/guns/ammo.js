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
    const CASING_STEEL  = 'kubejs:steel_bullet_casing';   // Steel Bullet Casing (small vehicle shells)

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
        'he_head', 'ap_head', 'gs_head', 'cm_head', 'wp_head',
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
    // Pistol (small) + Rifle (medium) casings are gated behind the
    // "Infantry Munitions 1" ballistics research (see server_scripts/wfcore/
    // WFResearch.js). Heavy Rifle Casing gates on the MV "Infantry Munitions 3"
    // node (heavy/sniper ammo tier); the vehicle (XL) brass casing gates on the
    // MV "Large Casings" node.
    // eut tracks each casing's gating research tier: LV(32) for pistol/rifle brass,
    // MV(128) for the heavy brass, steel and vehicle (XL) casings.
    [
        { id: CASING_SMALL,  plates: 1, amount: 5, circuit: 1, eut: 32,  research: 'infantry_munitions_1' },
        { id: CASING_MEDIUM, plates: 2, amount: 5, circuit: 2, eut: 32,  research: 'infantry_munitions_1' },
        { id: CASING_LARGE,  plates: 3, amount: 5, circuit: 3, eut: 128, research: 'infantry_munitions_3' },
        { id: CASING_XL,     plates: 4, amount: 1, circuit: 4, eut: 128, research: 'large_casings' },
    ].forEach(c => {
        // NOTE: cutter supports only 1 item input, so no .circuit() here — the recipes
        // stay distinct by brass_plate count (1/2/3/4). Adding a circuit exceeded the
        // input cap and was silently dropped by GTCEu (log spam).
        const r = event.recipes.gtceu.cutter(c.id)
            .itemInputs(Item.of('gtceu:brass_plate', c.plates))
            .itemOutputs(Item.of(c.id, c.amount))
            .duration(40)
            .EUt(c.eut);
        if (c.research) r.addCondition(WFResearch.condition(c.research));
    });

    // Steel bullet casing — the dedicated case for small vehicle shells (AP/HE/
    // GS/AA below). Cut from steel plate; unlocked by the MV "Large Casings"
    // node. Circuit 5 keeps it distinct from the brass casings above.
    event.recipes.gtceu.cutter('kubejs:steel_bullet_casing')
        .itemInputs(Item.of('gtceu:steel_plate', 3))
        .itemOutputs(Item.of(CASING_STEEL, 5))
        .duration(80)
        .EUt(128)   // MV — large_casings
        .addCondition(WFResearch.condition('large_casings'));

    // =======================================================================
    // 2. AMMO COMPONENTS
    // =======================================================================
    // Solid rocket fuel — cheap assembler route (a chemical-reactor route also
    // exists in vehicles/parts.js). Consumed by the RPG/rocket rounds below.
    event.recipes.gtceu.assembler('kubejs:solid_rocket_fuel')
        .itemInputs('gtceu:sulfur_dust', 'gtceu:saltpeter_dust', 'gtceu:charcoal_dust')
        .itemOutputs('kubejs:solid_rocket_fuel')
        .circuit(1)
        .duration(400)
        .EUt(30);

    // Superb Warfare crafting components — primer, high-energy explosives, grain.
    // Their vanilla crafting recipes are stripped by cleanup/remove_crafting.js
    // (all superbwarfare crafting_shaped/shapeless), so these GT routes are the
    // only way to make them. Left UNGATED on purpose: primer + high-energy
    // explosives are the *inputs* consumed by the Large Casings / HE / AA
    // ballistics research, so they cannot sit behind that same research. (This
    // also restores grain, which the large artillery shells below require.)
    event.recipes.gtceu.assembler('kubejs:sw_primer')
        .itemInputs(Item.of('gtceu:copper_plate', 1), Item.of('gtceu:small_gunpowder_dust', 1))
        .itemOutputs(Item.of('superbwarfare:primer', 4))
        .circuit(1)
        .duration(120)
        .EUt(16);

    event.recipes.gtceu.assembler('kubejs:sw_high_energy_explosives')
        .itemInputs(Item.of('minecraft:gunpowder', 4), Item.of('minecraft:sugar', 1), '#forge:sand')
        .itemOutputs(Item.of('superbwarfare:high_energy_explosives', 4))
        .circuit(2)
        .duration(200)
        .EUt(30);

    event.recipes.gtceu.assembler('kubejs:sw_grain')
        .itemInputs(Item.of('gtceu:copper_plate', 2), Item.of('minecraft:gunpowder', 2), Item.of('superbwarfare:primer', 1))
        .itemOutputs(Item.of('superbwarfare:grain', 8))
        .circuit(3)
        .duration(200)
        .EUt(30);

    // Missile Engine — solid-propellant rocket motor (casing + propellant + nozzle). The propulsion core
    // consumed by every rocket / guided missile / drone recipe here + in missiles.js / drones.js /
    // emplacements.js. Gated on the "Missile Engines" ballistics node (WFResearch.js). Had NO craft route
    // before — SBW's vanilla recipe is stripped by cleanup/remove_crafting.js.
    event.recipes.gtceu.assembler('kubejs:sw_missile_engine')
        .itemInputs(Item.of('gtceu:steel_plate', 2), Item.of('kubejs:solid_rocket_fuel', 1), Item.of('gtceu:steel_rod', 2))
        .itemOutputs(Item.of('superbwarfare:missile_engine', 2))
        .circuit(4)
        .duration(400)
        .EUt(128)
        .addCondition(WFResearch.condition('missile_engines'));

    // Seeker — IR/radar guidance head (sensor + emitter + optics). The guidance core consumed by every guided
    // missile / SAM / smart-mine recipe. Gated on the "Guidance Seekers" ballistics node (WFResearch.js).
    event.recipes.gtceu.assembler('kubejs:sw_seeker')
        .itemInputs(Item.of('gtceu:lv_sensor', 1), Item.of('gtceu:lv_emitter', 1), Item.of('gtceu:tempered_glass', 1), Item.of('gtceu:basic_electronic_circuit', 1))
        .itemOutputs(Item.of('superbwarfare:seeker', 1))
        .circuit(5)
        .duration(400)
        .EUt(128)
        .addCondition(WFResearch.condition('seekers'));

    // ---- Warhead heads (the explosive payload core consumed by every round) ----
    // Each superbwarfare:*_head is the warhead slotted into its munition family
    // (shells / rockets / bombs / guided missiles / WP mortar). Gated on the matching
    // Ballistics warhead node so the payload tech is researched BEFORE the round.
    // SBW's own crafting recipes for the heads are stripped (removal list above);
    // these GT assembler routes are the only way to make them. Inputs are ungated
    // raws (no bootstrap loop with the warhead research itself).
    [
        { out: 'he_head', circuit: 1, research: 'he_warheads',        inputs: [Item.of('superbwarfare:high_energy_explosives', 2), Item.of('gtceu:steel_plate', 1)] },
        { out: 'ap_head', circuit: 2, research: 'ap_warheads',        inputs: [Item.of('superbwarfare:high_energy_explosives', 1), Item.of('gtceu:steel_plate', 1), Item.of('gtceu:tungsten_plate', 1)] },
        { out: 'gs_head', circuit: 3, research: 'grapeshot_warheads', inputs: [Item.of('gtceu:steel_plate', 1), Item.of('gtceu:lead_nugget', 6), Item.of('gtceu:small_gunpowder_dust', 2)] },
        { out: 'cm_head', circuit: 4, research: 'cluster_warheads',   inputs: [Item.of('gtceu:steel_plate', 1), Item.of('gtceu:dynamite', 2), Item.of('gtceu:small_gunpowder_dust', 2)] },
        { out: 'wp_head', circuit: 5, research: 'pyrotechnics',       inputs: [Item.of('gtceu:steel_plate', 1), Item.of('gtceu:small_white_phosphorus_dust', 2), Item.of('gtceu:small_gunpowder_dust', 1)] },
    ].forEach(h => {
        event.recipes.gtceu.assembler(`kubejs:sw_${h.out}`)
            .itemInputs(h.inputs)
            .itemOutputs(Item.of(`superbwarfare:${h.out}`, 1))
            .circuit(h.circuit)
            .duration(240)
            .EUt(128)
            .addCondition(WFResearch.condition(h.research));
    });

    // =======================================================================
    // 3. PRESSED CARTRIDGES  (one casing + core + propellant, on the ammo press)
    // Helper: every entry in a batch shares `inputs`, so each needs a unique
    // circuit. `count` is per-press yield for the whole batch.
    // =======================================================================
    function cartridgeBatch(prefix, inputs, count, duration, eut, entries) {
        entries.forEach(e => {
            const r = event.recipes.gtceu.ammo_press(`kubejs:${prefix}_${e.circuit}`)
                .itemInputs(inputs)
                .itemOutputs(e.nbt ? Item.of(e.out, count, e.nbt) : Item.of(e.out, count))
                .circuit(e.circuit)
                .duration(duration)
                .EUt(eut);
            if (e.research) r.addCondition(WFResearch.condition(e.research));
        });
    }

    // ---- PISTOL / handgun rounds  (small casing, lead nugget, tiny gunpowder) ----
    cartridgeBatch('ammo_pistol',
        [Item.of(CASING_SMALL, 1), 'gtceu:lead_nugget', 'gtceu:tiny_gunpowder_dust'], 6, 40, 32, [
            { out: 'tacz:ammo', nbt: tacz('tacz:762x25'),      circuit: 1 },
            { out: 'tacz:ammo', nbt: tacz('tacz:45acp'),       circuit: 2 },
            { out: 'tacz:ammo', nbt: tacz('ww:8mm'),           circuit: 3,  research: 'infantry_munitions_2' },
            { out: 'tacz:ammo', nbt: tacz('tacz:9mm'),         circuit: 4,  research: 'infantry_munitions_2' },
            { out: 'tacz:ammo', nbt: tacz('ww:765'),           circuit: 5,  research: 'infantry_munitions_2' },
            { out: 'tacz:ammo', nbt: tacz('tacz:357mag'),      circuit: 6 },
            { out: 'tacz:ammo', nbt: tacz('ronmc:10mm'),       circuit: 7 },
            { out: 'tacz:ammo', nbt: tacz('tacz:22wmr'),       circuit: 8 },  // was "vehicle" casing
            { out: 'tacz:ammo', nbt: tacz('tacz:500mag'),      circuit: 9 },  // was "vehicle" casing
            { out: 'tacz:ammo', nbt: tacz('tacz:50ae'),        circuit: 10 }, // was "vehicle" casing
            { out: 'tacz:ammo', nbt: tacz('ww:763'),           circuit: 11, research: 'infantry_munitions_2' }, // was "vehicle" casing
            { out: 'tacz:ammo', nbt: tacz('ronmc:68pepperball'), circuit: 12 }, // non-lethal, was "vehicle" casing
            { out: 'tacz:ammo', nbt: tacz('ronmc:train_9mm'),  circuit: 13 }, // was "vehicle" casing
            { out: 'superbwarfare:handgun_ammo',               circuit: 14 },
        ]);

    // ---- RIFLE / SMG / intermediate rounds  (medium casing, lead nugget, small gunpowder) ----
    cartridgeBatch('ammo_rifle',
        [Item.of(CASING_MEDIUM, 1), 'gtceu:lead_nugget', 'gtceu:small_gunpowder_dust'], 5, 40, 32, [
            { out: 'tacz:ammo', nbt: tacz('tacz:556x45'),      circuit: 1 },
            { out: 'tacz:ammo', nbt: tacz('tacz:45_70'),       circuit: 2 },
            { out: 'tacz:ammo', nbt: tacz('tacz:545x39'),      circuit: 3 },
            { out: 'tacz:ammo', nbt: tacz('tacz:30_06'),       circuit: 4 },
            { out: 'tacz:ammo', nbt: tacz('tacz:57x28'),       circuit: 5 },  // PDW
            { out: 'tacz:ammo', nbt: tacz('tacz:46x30'),       circuit: 6 },  // PDW
            { out: 'tacz:ammo', nbt: tacz('ww:77a'),           circuit: 7,  research: 'infantry_munitions_2' },
            { out: 'tacz:ammo', nbt: tacz('tacz:762x54'),      circuit: 8,  research: 'infantry_munitions_2' },
            { out: 'tacz:ammo', nbt: tacz('tacz:762x39'),      circuit: 9 },
            { out: 'tacz:ammo', nbt: tacz('tacz:58x42'),       circuit: 10 },
            { out: 'tacz:ammo', nbt: tacz('ww:303'),           circuit: 11, research: 'infantry_munitions_2' },
            { out: 'tacz:ammo', nbt: tacz('tacz:308'),         circuit: 12 },
            { out: 'tacz:ammo', nbt: tacz('tacz:68x51fury'),   circuit: 13 },
            { out: 'tacz:ammo', nbt: tacz('ww:30c'),           circuit: 14, research: 'infantry_munitions_2' },
            { out: 'tacz:ammo', nbt: tacz('ronmc:762x51'),     circuit: 15 },
            { out: 'tacz:ammo', nbt: tacz('ronmc:65x48'),      circuit: 16 },
            { out: 'tacz:ammo', nbt: tacz('ronmc:300blk'),     circuit: 17 }, // was "vehicle" casing
            { out: 'tacz:ammo', nbt: tacz('ronmc:train_556x45'), circuit: 18 }, // was "vehicle" casing
            { out: 'tacz:ammo', nbt: tacz('tacz:792x57'),      circuit: 19, research: 'infantry_munitions_2' }, // was "vehicle" casing
            { out: 'tacz:ammo', nbt: tacz('ww:65a'),           circuit: 20, research: 'infantry_munitions_2' }, // was "vehicle" casing
            { out: 'superbwarfare:rifle_ammo',                 circuit: 21, research: 'infantry_munitions_2' },
        ]);

    // ---- SHOTGUN / pellet rounds  (medium casing, 3x lead pellets, tiny gunpowder) ----
    cartridgeBatch('ammo_shotgun',
        [Item.of(CASING_MEDIUM, 1), Item.of('gtceu:lead_nugget', 3), 'gtceu:tiny_gunpowder_dust'], 5, 40, 32, [
            { out: 'tacz:ammo', nbt: tacz('tacz:12g'),         circuit: 1,  research: 'infantry_munitions_2' },  // 12ga, was "rifle" batch
            { out: 'tacz:ammo', nbt: tacz('ronmc:bean_bag'),   circuit: 2 },  // was "vehicle" casing
            { out: 'tacz:ammo', nbt: tacz('ronmc:slug'),       circuit: 3 },  // was "vehicle" casing
            { out: 'superbwarfare:shotgun_ammo',               circuit: 4 },
        ]);

    // ---- HEAVY rifle / HMG / sniper  (heavy rifle casing + steel & copper core
    // + a lot of gunpowder) ----  Uses 4 item inputs (+circuit) — fits the
    // widened ammo-press slot count (see custom_machines.js). Superb Warfare
    // heavy + sniper ammo gate on the MV "Infantry Munitions 3" node; the .338
    // sniper round rides along (it also needs the IM3-gated heavy casing).
    cartridgeBatch('ammo_heavy',
        [Item.of(CASING_LARGE, 1), Item.of('gtceu:steel_nugget', 2), Item.of('gtceu:copper_nugget', 2), Item.of('minecraft:gunpowder', 3)], 3, 40, 128, [
            { out: 'superbwarfare:heavy_ammo',                 circuit: 1, research: 'infantry_munitions_3' },
            { out: 'tacz:ammo', nbt: tacz('tacz:338'),         circuit: 2 },  // .338 sniper, was "rifle" batch
            { out: 'superbwarfare:sniper_ammo',                circuit: 3, research: 'infantry_munitions_3' },  // was "vehicle" casing
        ]);

    // ---- .50 BMG  (its own heavy load: double large casing + steel plate) ----
    event.recipes.gtceu.ammo_press('kubejs:ammo_50bmg')
        .itemInputs(Item.of(CASING_LARGE, 2), Item.of('gtceu:steel_plate', 1), Item.of('gtceu:small_gunpowder_dust', 2))
        .itemOutputs(Item.of('tacz:ammo', 2, tacz('tacz:50bmg')))   // was "vehicle" casing
        .circuit(1)
        .duration(120)
        .EUt(128);   // MV — heavy (large) casing tier

    // ---- Small vehicle shells (steel bullet casing + warhead head + propellant) ----
    // Each type is gated on its own MV ballistics node (armor_piercing_1 / high_
    // explosive_1 / grapeshot_1 / anti_air_1), which in turn requires the matching
    // warhead research. The payload is now the superbwarfare:*_head warhead
    // (unlocked by that warhead node), so warhead tech comes first. AA = HE head +
    // a magnesium proximity/tracer charge.
    [
        { out: 'superbwarfare:small_shell_ap', research: 'armor_piercing_1', head: 'ap_head', circuit: 1, extra: [] },
        { out: 'superbwarfare:small_shell_he', research: 'high_explosive_1', head: 'he_head', circuit: 2, extra: [] },
        { out: 'superbwarfare:small_shell_gs', research: 'grapeshot_1',      head: 'gs_head', circuit: 3, extra: [] },
        { out: 'superbwarfare:small_shell_aa', research: 'anti_air_1',       head: 'he_head', circuit: 4, extra: [Item.of('gtceu:magnesium_dust', 2)] },
    ].forEach(s => {
        const inputs = [Item.of(CASING_STEEL, 2), Item.of(`superbwarfare:${s.head}`, 1), Item.of('gtceu:small_gunpowder_dust', 2)];
        s.extra.forEach(e => inputs.push(e));
        event.recipes.gtceu.ammo_press(`kubejs:ammo_${s.out.split(':')[1]}`)
            .itemInputs(inputs)
            .itemOutputs(Item.of(s.out, 2))
            .circuit(s.circuit)
            .duration(120)
            .EUt(128)   // MV — small-shell nodes
            .addCondition(WFResearch.condition(s.research));
    });

    // =======================================================================
    // 4. VEHICLE / ARTILLERY ORDNANCE  (xl casing, on the ammo press)
    // Circuits are unique across this whole group so the ones with matching
    // fills (the two 40mm, the three rockets) can't collide.
    // =======================================================================

    // ---- Large tank/artillery shells (XL casing + warhead head + grain) ----
    // One EV node per shell (large_shell_he/ap/gs/cm/wp), each requiring its warhead
    // research. The head IS the payload (matches SBW's native large-shell recipe).
    [
        { out: 'superbwarfare:large_shell_ap', head: 'ap_head', circuit: 1, cas: 2, grain: 3 }, // AP: harder head, double casing
        { out: 'superbwarfare:large_shell_he', head: 'he_head', circuit: 2, cas: 1, grain: 2 }, // standard HE
        { out: 'superbwarfare:large_shell_cm', head: 'cm_head', circuit: 3, cas: 2, grain: 2 }, // cluster: double casing
        { out: 'superbwarfare:large_shell_gs', head: 'gs_head', circuit: 4, cas: 1, grain: 2 }, // grapeshot
        { out: 'superbwarfare:large_shell_wp', head: 'wp_head', circuit: 5, cas: 2, grain: 3 }, // WP: white phosphorus (Pyrotechnics)
    ].forEach(s => {
        event.recipes.gtceu.ammo_press(`kubejs:ammo_${s.out.split(':')[1]}`)
            .itemInputs(Item.of(CASING_XL, s.cas), Item.of(`superbwarfare:${s.head}`, 1), Item.of('superbwarfare:grain', s.grain))
            .itemOutputs(Item.of(s.out, 1))
            .circuit(s.circuit)
            .duration(120)
            .EUt(2048)   // EV — large-shell nodes
            .addCondition(WFResearch.condition(s.out.split(':')[1]));   // per-shell EV node (== output id)
    });

    // ---- 40mm grenade rounds (xl casing + dynamite) — MV; the SBW + MCSP HE grenades gate
    //      on the 'grenade_40mm' Ballistics node (child of he_warheads). The tacz 40mm round
    //      is left ungated (feeds tacz grenade launchers) but shares the MV voltage. ----
    event.recipes.gtceu.ammo_press('kubejs:ammo_40mm')
        .itemInputs(Item.of(CASING_XL, 1), Item.of('gtceu:dynamite', 1))
        .itemOutputs(Item.of('tacz:ammo', 2, tacz('tacz:40mm')))
        .circuit(6)
        .duration(200)
        .EUt(128);

    event.recipes.gtceu.ammo_press('kubejs:ammo_grenade_40mm')
        .itemInputs(Item.of(CASING_XL, 1), Item.of('gtceu:dynamite', 1))
        .itemOutputs(Item.of('superbwarfare:grenade_40mm', 2))
        .circuit(7)
        .duration(200)
        .EUt(128)
        .addCondition(WFResearch.condition('grenade_40mm'));

    // MCSP 40mm HE grenade (the Mk19 / grenade-launcher round from the MCSP addon).
    event.recipes.gtceu.ammo_press('kubejs:ammo_40mm_mcsp')
        .itemInputs(Item.of(CASING_XL, 1), Item.of('gtceu:dynamite', 1))
        .itemOutputs(Item.of('mcsp:40mm_explosive', 2))
        .circuit(11)
        .duration(200)
        .EUt(128)
        .addCondition(WFResearch.condition('grenade_40mm'));

    // ---- RPG / rocket rounds (xl casing + explosive + solid rocket fuel) — MV (RPG tier) ----
    event.recipes.gtceu.ammo_press('kubejs:ammo_rpg_rocket')
        .itemInputs(Item.of(CASING_XL, 2), Item.of('gtceu:dynamite', 1), 'kubejs:solid_rocket_fuel')
        .itemOutputs(Item.of('tacz:ammo', 1, tacz('tacz:rpg_rocket')))
        .circuit(8)
        .duration(400)
        .EUt(128);

    event.recipes.gtceu.ammo_press('kubejs:ammo_rpg_rocket_standard')
        .itemInputs(Item.of(CASING_XL, 2), Item.of('gtceu:dynamite', 1), 'kubejs:solid_rocket_fuel')
        .itemOutputs(Item.of('superbwarfare:rpg_rocket_standard', 1))
        .circuit(9)
        .duration(400)
        .EUt(128);

    event.recipes.gtceu.ammo_press('kubejs:ammo_rpg_rocket_tbg')
        .itemInputs(Item.of(CASING_XL, 2), Item.of('gtceu:magnesium_dust', 2), 'kubejs:solid_rocket_fuel')
        .itemOutputs(Item.of('superbwarfare:rpg_rocket_tbg', 1))
        .circuit(10)
        .duration(400)
        .EUt(128);

    // =======================================================================
    // 5. MORTAR BOMBS  (muzzle-loaded — no casing)
    // =======================================================================
    // HE mortar bomb — LV, no warhead (keeps the LV Mortar emplacement fed). Gated on the LV 'mortar_shell' node.
    event.recipes.gtceu.ammo_press('kubejs:ammo_mortar_shell')
        .itemInputs('minecraft:gunpowder', 'gtceu:steel_plate')
        .itemOutputs(Item.of('superbwarfare:mortar_shell', 4))
        .duration(80)
        .EUt(128)   // MV — mortar_shell node now gates on he_warheads
        .addCondition(WFResearch.condition('mortar_shell'));

    // WP mortar bomb — a fire round: consumes the WP head, gated on the Pyrotechnics-branch 'mortar_shell_wp' node.
    event.recipes.gtceu.ammo_press('kubejs:ammo_mortar_shell_wp')
        .itemInputs('gtceu:steel_plate', Item.of('superbwarfare:wp_head', 1), 'gtceu:small_gunpowder_dust') // mortar = lower tier -> gunpowder propellant
        .itemOutputs(Item.of('superbwarfare:mortar_shell_wp', 2))
        .circuit(1)
        .duration(120)
        .EUt(128)   // MV — pyrotechnics
        .addCondition(WFResearch.condition('mortar_shell_wp'));

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
            .duration(120)
            .EUt(16);
    });

    // =======================================================================
    // 7. THROWN / PLACED ORDNANCE  (assembler — multi-component, no casing)
    // =======================================================================

    // Hand grenade — steel body + dynamite fill + spring-loaded fuze
    event.recipes.gtceu.assembler('kubejs:sw_hand_grenade')
        .itemInputs(Item.of('gtceu:steel_plate', 2), Item.of('gtceu:dynamite', 1), Item.of('gtceu:small_steel_spring', 1))
        .itemOutputs(Item.of('superbwarfare:hand_grenade', 2))
        .circuit(1).duration(400).EUt(32);

    // RGO grenade — fragmentation body; screws = segmented outer sleeve
    event.recipes.gtceu.assembler('kubejs:sw_rgo_grenade')
        .itemInputs(Item.of('gtceu:steel_plate', 2), Item.of('gtceu:dynamite', 1), Item.of('gtceu:steel_screw', 4))
        .itemOutputs(Item.of('superbwarfare:rgo_grenade', 2))
        .circuit(2).duration(400).EUt(32);

    // M18 smoke grenade — non-lethal; dye = colored smoke agent
    event.recipes.gtceu.assembler('kubejs:sw_m18_smoke_grenade')
        .itemInputs(Item.of('gtceu:steel_plate', 1), Item.of('gtceu:small_gunpowder_dust', 1), Item.of('#forge:dyes/white', 1))
        .itemOutputs(Item.of('superbwarfare:m18_smoke_grenade', 2))
        .circuit(3).duration(400).EUt(32);

    // Claymore mine — directional; basic circuit for the fuze board
    event.recipes.gtceu.assembler('kubejs:sw_claymore_mine')
        .itemInputs(Item.of('gtceu:steel_plate', 3), Item.of('gtceu:dynamite', 2), Item.of('gtceu:basic_electronic_circuit', 1))
        .itemOutputs(Item.of('superbwarfare:claymore_mine', 1))
        .circuit(1).duration(600).EUt(32);

    // TM-62 anti-tank mine — HE fill, heavy pressure plate
    event.recipes.gtceu.assembler('kubejs:sw_tm_62')
        .itemInputs(Item.of('gtceu:double_steel_plate', 2), Item.of('gtceu:dynamite', 3), Item.of('gtceu:small_steel_spring', 1))
        .itemOutputs(Item.of('superbwarfare:tm_62', 1))
        .circuit(2).duration(600).EUt(32);

    // PTKM-1R — smart AT mine; seeker for autonomous activation
    event.recipes.gtceu.assembler('kubejs:sw_ptkm_1r')
        .itemInputs(Item.of('gtceu:stainless_steel_plate', 3), Item.of('gtceu:dynamite', 3), Item.of('superbwarfare:seeker', 1))
        .itemOutputs(Item.of('superbwarfare:ptkm_1r', 1))
        .circuit(3).duration(800).EUt(128);

    // Lunge mine — suicide contact fuze on a pole (long rod = the pole)
    event.recipes.gtceu.assembler('kubejs:sw_lunge_mine')
        .itemInputs(Item.of('gtceu:steel_plate', 2), Item.of('gtceu:dynamite', 3), Item.of('gtceu:long_steel_rod', 1))
        .itemOutputs(Item.of('superbwarfare:lunge_mine', 1))
        .circuit(4).duration(400).EUt(32);

    // =======================================================================
    // 8. ROCKETS & GUIDED MISSILES  (assembler — engine/seeker driven)
    // =======================================================================

    // Small unguided rocket — steel tube + motor + HE head. Gated on its own MV node.
    event.recipes.gtceu.assembler('kubejs:sw_small_rocket')
        .itemInputs(Item.of('gtceu:steel_plate', 2), Item.of('superbwarfare:missile_engine', 1), Item.of('superbwarfare:he_head', 1))
        .itemOutputs(Item.of('superbwarfare:small_rocket', 2))
        .circuit(1).duration(400).EUt(128)   // MV — small_rocket
        .addCondition(WFResearch.condition('small_rocket'));

    // Medium unguided rockets — same motor, warhead head varies. One MV node per type.
    [
        { out: 'superbwarfare:medium_rocket_ap', head: 'ap_head', circuit: 2 },
        { out: 'superbwarfare:medium_rocket_he', head: 'he_head', circuit: 3 },
        { out: 'superbwarfare:medium_rocket_cm', head: 'cm_head', circuit: 4 },
    ].forEach(r => {
        event.recipes.gtceu.assembler(`kubejs:${r.out.split(':')[1]}`)
            .itemInputs(Item.of('gtceu:steel_plate', 2), Item.of('superbwarfare:missile_engine', 1), Item.of(`superbwarfare:${r.head}`, 1))
            .itemOutputs(Item.of(r.out, 1))
            .circuit(r.circuit).duration(600).EUt(128)   // MV — per-rocket node
            .addCondition(WFResearch.condition(r.out.split(':')[1]));   // per-rocket MV node (== output id)
    });

    // Guided missiles (seeker + warhead head required). Anti-air = HE (frag) head; anti-ground = AP (HEAT) head.
    event.recipes.gtceu.assembler('kubejs:sw_medium_anti_air_missile')
        .itemInputs(Item.of('gtceu:stainless_steel_plate', 2), Item.of('superbwarfare:missile_engine', 1), Item.of('superbwarfare:he_head', 1), Item.of('superbwarfare:seeker', 1))
        .itemOutputs(Item.of('superbwarfare:medium_anti_air_missile', 1))
        .circuit(5).duration(800).EUt(512)   // HV — anti_air_missiles
        .addCondition(WFResearch.condition('anti_air_missiles'));   // LAV-AD air-defence gate

    event.recipes.gtceu.assembler('kubejs:sw_medium_anti_ground_missile')
        .itemInputs(Item.of('gtceu:stainless_steel_plate', 2), Item.of('superbwarfare:missile_engine', 1), Item.of('superbwarfare:ap_head', 1), Item.of('superbwarfare:seeker', 1))
        .itemOutputs(Item.of('superbwarfare:medium_anti_ground_missile', 1))
        .circuit(6).duration(800).EUt(128)   // MV — anti_ground_missiles
        .addCondition(WFResearch.condition('anti_ground_missiles'));   // TOW-class gate (armed trucks, Bradley)

    event.recipes.gtceu.assembler('kubejs:sw_large_anti_ground_missile')
        .itemInputs(Item.of('gtceu:titanium_plate', 2), Item.of('superbwarfare:large_motor', 1), Item.of('superbwarfare:ap_head', 2), Item.of('superbwarfare:seeker', 1))
        .itemOutputs(Item.of('superbwarfare:large_anti_ground_missile', 1))
        .circuit(7).duration(1200).EUt(512)   // HV — heavy_anti_ground_missiles
        .addCondition(WFResearch.condition('heavy_anti_ground_missiles'));   // Ballistics: Heavy Anti-Ground Missiles (Mi-28)

    // Javelin — infantry top-attack AT. No dedicated node, but consuming an AP head means it can't be built
    // until Armor Piercing Warheads is researched (warhead-before-missile still holds).
    event.recipes.gtceu.assembler('kubejs:sw_javelin_missile')
        .itemInputs(Item.of('gtceu:stainless_steel_plate', 2), Item.of('superbwarfare:missile_engine', 1), Item.of('superbwarfare:ap_head', 1), Item.of('superbwarfare:seeker', 1))
        .itemOutputs(Item.of('superbwarfare:javelin_missile', 1))
        .circuit(8).duration(800).EUt(512);   // HV-grade top-attack ATGM round

    // =======================================================================
    // 9. AERIAL BOMBS  (gravity-delivered; steel ring = stabiliser fin ring)
    // =======================================================================
    event.recipes.gtceu.assembler('kubejs:sw_small_aerial_bomb')
        .itemInputs(Item.of('gtceu:steel_plate', 3), Item.of('superbwarfare:he_head', 1), Item.of('gtceu:steel_ring', 1))
        .itemOutputs(Item.of('superbwarfare:small_aerial_bomb', 2))
        .circuit(1).duration(600).EUt(128)   // MV — small_aerial_bomb
        .addCondition(WFResearch.condition('small_aerial_bomb'));   // Ballistics: Small Aerial Bombs (Ju-87)

    event.recipes.gtceu.assembler('kubejs:sw_medium_aerial_bomb')
        .itemInputs(Item.of('gtceu:steel_plate', 5), Item.of('superbwarfare:he_head', 2), Item.of('gtceu:steel_ring', 1))
        .itemOutputs(Item.of('superbwarfare:medium_aerial_bomb', 1))
        .circuit(2).duration(800).EUt(128)   // MV — medium_aerial_bomb
        .addCondition(WFResearch.condition('medium_aerial_bomb'));   // Ballistics: Medium Aerial Bombs (Ju-87)

    // Nuclear Bomb (IV apex) — the B-2 Spirit's fissile gravity bomb (AshVehicle item). Implosion HE lenses
    // (he_head) around a U-235 pit + beryllium neutron reflector in a heavy HSS-S casing. Gated on the IV
    // 'nuclear_bomb' node — by far the most expensive round in the pack.
    event.remove({ output: 'ashvehicle:nuclearbombitem' });
    event.recipes.gtceu.assembler('kubejs:av_nuclear_bomb')
        .itemInputs(
            Item.of('gtceu:hsss_plate', 6),
            Item.of('gtceu:uranium_235_block', 2),
            Item.of('gtceu:double_beryllium_plate', 4),
            Item.of('superbwarfare:he_head', 4),
            Item.of('gtceu:advanced_integrated_circuit', 2))
        .itemOutputs(Item.of('ashvehicle:nuclearbombitem', 1))
        .circuit(1).duration(4800).EUt(8192)   // IV — nuclear_bomb
        .addCondition(WFResearch.condition('nuclear_bomb'));   // Ballistics: Nuclear Bomb (IV apex, B-2)

    // =======================================================================
    // 10. DRONES
    // =======================================================================
    // Base drone — 4 motors + 4 propellers + circuit + poly housing
    event.recipes.gtceu.assembler('kubejs:sw_drone')
        .itemInputs(Item.of('superbwarfare:motor', 4), Item.of('superbwarfare:propeller', 4), Item.of('gtceu:basic_electronic_circuit', 1), Item.of('gtceu:polyethylene_plate', 2))
        .itemOutputs(Item.of('superbwarfare:drone', 1))
        .circuit(1).duration(800).EUt(128)
        .addCondition(WFResearch.condition('drone_tactics'));   // Aviation: Drone Tactics (Monitor + base Drone)

    // Swarm (kamikaze) drone — base drone + seeker + dynamite warhead
    event.recipes.gtceu.assembler('kubejs:sw_swarm_drone')
        .itemInputs(Item.of('superbwarfare:drone', 1), Item.of('superbwarfare:seeker', 1), Item.of('gtceu:dynamite', 1))
        .itemOutputs(Item.of('superbwarfare:swarm_drone', 1))
        .circuit(2).duration(800).EUt(128)
        .addCondition(WFResearch.condition('drone_swarm'));   // Aviation: Swarm Drones


    event.recipes.gtceu.assembler('kubejs:mortar')
        .itemInputs(Item.of('superbwarfare:mortar_barrel', 1), Item.of('superbwarfare:mortar_base_plate', 1), Item.of('superbwarfare:mortar_bipod', 1))
        .itemOutputs(Item.of('superbwarfare:mortar_deployer', 1))
        .circuit(1).duration(800).EUt(128)
        .addCondition(WFResearch.condition('emp_mortar'));

    event.recipes.gtceu.assembler('kubejs:mortar_barrel')
        .itemInputs(Item.of('gtceu:steel_plate', 8), Item.of('gtceu:steel_ingot', 16))
        .itemOutputs(Item.of('superbwarfare:mortar_barrel', 1))
        .circuit(29).duration(400).EUt(128)

    event.recipes.gtceu.assembler('kubejs:mortar_base_plate')
        .itemInputs(Item.of('gtceu:double_steel_plate', 4), Item.of('gtceu:steel_plate', 16))
        .itemOutputs(Item.of('superbwarfare:mortar_base_plate', 1))
        .circuit(30).duration(400).EUt(128)

    event.recipes.gtceu.assembler('kubejs:mortar_bipod')
        .itemInputs(Item.of('gtceu:steel_rod', 24))
        .itemOutputs(Item.of('superbwarfare:mortar_bipod', 1))
        .circuit(30).duration(400).EUt(128)

    event.recipes.gtceu.assembler('kubejs:artillery_indicator')
        .itemInputs(Item.of('gtceu:stainless_steel_plate', 16), Item.of('gtceu:gold_single_cable', 24), Item.of('#gtceu:circuits/hv', 4))
        .itemOutputs(Item.of('superbwarfare:artillery_indicator', 1))
        .circuit(30).duration(400).EUt(128*4)

    event.recipes.gtceu.assembler('kubejs:thermal_imaging_googles')
        .itemInputs(Item.of('gtceu:nightvision_goggles', 1), Item.of('gtceu:ruby_lens', 2), Item.of('#gtceu:circuits/mv', 4))
        .itemOutputs(Item.of('superbwarfare:thermal_imaging_goggles', 1))
        .duration(800).EUt(128)

    event.recipes.gtceu.assembler('kubejs:parachute')
        .itemInputs(Item.of('minecraft:string', 16), Item.of('minecraft:leather', 8))
        .itemOutputs(Item.of('superbwarfare:parachute', 1))
        .duration(200).EUt(32)

});

// ============================================================================
// PRIMITIVE BOOTSTRAP — hand-crafted ammo for steamage weapons
// Bench-craftable starter rounds for the Springfield 1873 (.45-70) and
// Taurus 943 (.22wmr). The soft mallet seats the bullet; GTCEu returns it
// damaged but unconsumed. Mallet position distinguishes the two calibers.
// Once the ammo press is running, the cartridgeBatch routes above take over.
// ============================================================================
ServerEvents.recipes(event => {

    // Helper: builds a 1:1 shapeless conversion recipe for every ordered pair
    // in a list. Each entry can be either:
    //   - a plain string item id, e.g. 'mcsp:25mm_ap'
    //   - an object with an id, an optional nbt string, and a unique `key`
    //     used to build a safe recipe id, e.g.
    //     { id: 'tacz:ammo', nbt: '{AmmoId:"tacz:40mm"}', key: 'tacz_ammo_40mm' }
    function addInterconversions(list, groupName) {
        const entries = list.map(e => {
            if (typeof e === 'string') {
                return { id: e, nbt: null, key: e.replace(/[:.]/g, '_') };
            }
            return { id: e.id, nbt: e.nbt || null, key: e.key || e.id.replace(/[:.]/g, '_') };
        });

        const makeItem = e => e.nbt ? Item.of(e.id, e.nbt) : Item.of(e.id);

        entries.forEach(input => {
            entries.forEach(output => {
                if (input.key === output.key) return;

                event.shapeless(
                    makeItem(output),
                                [makeItem(input)]
                ).id(`kubejs:${groupName}_convert_${input.key}_to_${output.key}`);
            });
        });
    }

    addInterconversions([
        'superbwarfare:small_shell_ap',
        'mcsp:25mm_ap',
        'mcsp:30mm_ap',
    ], 'ap_shell');

    addInterconversions([
        'superbwarfare:grenade_40mm',
        'ashvehicle:40mmitem',
        { id: 'tacz:ammo', nbt: '{AmmoId:"tacz:40mm"}', key: 'tacz_ammo_40mm' },
        'mcsp:40mm_explosive',
    ], '40mm_shell');

    addInterconversions([
        'ashvehicle:aim9item',
        'ashvehicle:aim120item',
        'ashvehicle:aim54item',
        'ashvehicle:r60item',
        'ashvehicle:agm114item',
        'ashvehicle:agm158item',
    ], 'missile');

});
