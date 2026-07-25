// superbwarfare_ammo.js
// Recipes for all Superb Warfare consumables not covered by guns_and_ammo.js.
// Follows the same conventions as the rest of the gun-progression scripts:
//   ammo_press  → cartridges / shells / rockets that fit through a press
//   assembler   → anything with distinct sub-components (grenades, mines, missiles, drones)
// EUt ladder:  4 (ULV, basic ammo)  |  30 (LV press)  |  32 (LV asm)  |  128 (MV asm)  |  512 (HV asm)

ServerEvents.recipes(event => {

    // =========================================================================
    // SMALL-ARMS AMMO  (superbwarfare loose rounds)
    // Mirror the tacz pistol/rifle ammo tier split: small casing = handgun,
    // medium = rifle/shotgun, xl = sniper.
    // =========================================================================

    // Handgun ammo — same tier / inputs as the tacz pistol ammo array
    event.remove({ output: 'superbwarfare:handgun_ammo' });
    event.recipes.gtceu.ammo_press('kubejs:sw_handgun_ammo')
        .itemInputs(
            Item.of('kubejs:bullet_casing_small', 1),
            'gtceu:lead_nugget',
            'gtceu:tiny_gunpowder_dust'
        )
        .itemOutputs(Item.of('superbwarfare:handgun_ammo', 4))
        .circuit(1)
        .duration(20)
        .EUt(4);

    // Rifle ammo — same tier / inputs as the tacz rifle ammo array
    event.remove({ output: 'superbwarfare:rifle_ammo' });
    event.recipes.gtceu.ammo_press('kubejs:sw_rifle_ammo')
        .itemInputs(
            Item.of('kubejs:bullet_casing_medium', 1),
            'gtceu:lead_nugget',
            'gtceu:small_gunpowder_dust'
        )
        .itemOutputs(Item.of('superbwarfare:rifle_ammo', 4))
        .circuit(2)
        .duration(20)
        .EUt(4);

    // Sniper ammo — xl casing + steel core; fewer per press run
    event.remove({ output: 'superbwarfare:sniper_ammo' });
    event.recipes.gtceu.ammo_press('kubejs:sw_sniper_ammo')
        .itemInputs(
            Item.of('kubejs:bullet_casing_xl', 1),
            'gtceu:steel_nugget',
            'gtceu:small_gunpowder_dust'
        )
        .itemOutputs(Item.of('superbwarfare:sniper_ammo', 3))
        .circuit(3)
        .duration(30)
        .EUt(4);

    // Shotgun ammo — medium casing, lead-heavy payload (3 nuggets = pellet spread)
    event.remove({ output: 'superbwarfare:shotgun_ammo' });
    event.recipes.gtceu.ammo_press('kubejs:sw_shotgun_ammo')
        .itemInputs(
            Item.of('kubejs:bullet_casing_medium', 1),
            Item.of('gtceu:lead_nugget', 3),
            'gtceu:tiny_gunpowder_dust'
        )
        .itemOutputs(Item.of('superbwarfare:shotgun_ammo', 4))
        .circuit(4)
        .duration(20)
        .EUt(4);

    // =========================================================================
    // AMMO BOXES  (bulk packaging — assembler packs loose rounds into a crate)
    // Using assembler so the box is clearly a secondary step, not a raw-press
    // shortcut, and the steel plate represents the tin/box itself.
    // =========================================================================

    event.remove({ output: 'superbwarfare:handgun_ammo_box' });
    event.recipes.gtceu.assembler('kubejs:sw_handgun_ammo_box')
        .itemInputs(
            Item.of('superbwarfare:handgun_ammo', 30),
            Item.of('gtceu:steel_plate', 1)
        )
        .itemOutputs(Item.of('superbwarfare:handgun_ammo_box', 1))
        .circuit(1)
        .duration(60)
        .EUt(16);

    event.remove({ output: 'superbwarfare:rifle_ammo_box' });
    event.recipes.gtceu.assembler('kubejs:sw_rifle_ammo_box')
        .itemInputs(
            Item.of('superbwarfare:rifle_ammo', 30),
            Item.of('gtceu:steel_plate', 1)
        )
        .itemOutputs(Item.of('superbwarfare:rifle_ammo_box', 1))
        .circuit(2)
        .duration(60)
        .EUt(16);

    event.remove({ output: 'superbwarfare:sniper_ammo_box' });
    event.recipes.gtceu.assembler('kubejs:sw_sniper_ammo_box')
        .itemInputs(
            Item.of('superbwarfare:sniper_ammo', 12),
            Item.of('gtceu:steel_plate', 1)
        )
        .itemOutputs(Item.of('superbwarfare:sniper_ammo_box', 1))
        .circuit(3)
        .duration(60)
        .EUt(16);

    event.remove({ output: 'superbwarfare:shotgun_ammo_box' });
    event.recipes.gtceu.assembler('kubejs:sw_shotgun_ammo_box')
        .itemInputs(
            Item.of('superbwarfare:shotgun_ammo', 12),
            Item.of('gtceu:steel_plate', 1)
        )
        .itemOutputs(Item.of('superbwarfare:shotgun_ammo_box', 1))
        .circuit(4)
        .duration(60)
        .EUt(16);

    // =========================================================================
    // GRENADES AND SMOKE
    // =========================================================================

    // 40mm grenade — mirrors tacz:40mm exactly (casing_xl + dynamite)
    event.remove({ output: 'superbwarfare:grenade_40mm' });
    event.recipes.gtceu.ammo_press('kubejs:sw_grenade_40mm')
        .itemInputs(
            Item.of('kubejs:bullet_casing_xl', 1),
            Item.of('gtceu:dynamite', 1)
        )
        .itemOutputs(Item.of('superbwarfare:grenade_40mm', 2))
        .circuit(2)
        .duration(100)
        .EUt(30);

    // Hand grenade — basic steel body + dynamite fill + spring-loaded fuze
    event.remove({ output: 'superbwarfare:hand_grenade' });
    event.recipes.gtceu.assembler('kubejs:sw_hand_grenade')
        .itemInputs(
            Item.of('gtceu:steel_plate', 2),
            Item.of('gtceu:dynamite', 1),
            Item.of('gtceu:small_steel_spring', 1)
        )
        .itemOutputs(Item.of('superbwarfare:hand_grenade', 2))
        .circuit(1)
        .duration(200)
        .EUt(32);

    // RGO grenade — Russian fragmentation body; screws represent the segmented outer sleeve
    event.remove({ output: 'superbwarfare:rgo_grenade' });
    event.recipes.gtceu.assembler('kubejs:sw_rgo_grenade')
        .itemInputs(
            Item.of('gtceu:steel_plate', 2),
            Item.of('gtceu:dynamite', 1),
            Item.of('gtceu:steel_screw', 4)
        )
        .itemOutputs(Item.of('superbwarfare:rgo_grenade', 2))
        .circuit(2)
        .duration(200)
        .EUt(32);

    // M18 smoke grenade — non-lethal; dye provides the colored smoke agent
    event.remove({ output: 'superbwarfare:m18_smoke_grenade' });
    event.recipes.gtceu.assembler('kubejs:sw_m18_smoke_grenade')
        .itemInputs(
            Item.of('gtceu:steel_plate', 1),
            Item.of('gtceu:small_gunpowder_dust', 1),
            Item.of('#forge:dyes/white', 1)
        )
        .itemOutputs(Item.of('superbwarfare:m18_smoke_grenade', 2))
        .circuit(3)
        .duration(200)
        .EUt(32);

    // =========================================================================
    // MINES
    // =========================================================================

    // Claymore mine — directional, contact-triggered; basic circuit for the fuze board
    event.remove({ output: 'superbwarfare:claymore_mine' });
    event.recipes.gtceu.assembler('kubejs:sw_claymore_mine')
        .itemInputs(
            Item.of('gtceu:steel_plate', 3),
            Item.of('gtceu:dynamite', 2),
            Item.of('gtceu:basic_electronic_circuit', 1)
        )
        .itemOutputs(Item.of('superbwarfare:claymore_mine', 1))
        .circuit(1)
        .duration(300)
        .EUt(32);

    // TM-62 anti-tank mine — high explosive fill, heavy pressure plate (double plate)
    event.remove({ output: 'superbwarfare:tm_62' });
    event.recipes.gtceu.assembler('kubejs:sw_tm_62')
        .itemInputs(
            Item.of('gtceu:double_steel_plate', 2),
            Item.of('gtceu:dynamite', 3),
            Item.of('gtceu:small_steel_spring', 1)
        )
        .itemOutputs(Item.of('superbwarfare:tm_62', 1))
        .circuit(2)
        .duration(300)
        .EUt(32);

    // PTKM-1R — smart acoustic/seismic AT mine; needs a seeker for autonomous activation
    event.remove({ output: 'superbwarfare:ptkm_1r' });
    event.recipes.gtceu.assembler('kubejs:sw_ptkm_1r')
        .itemInputs(
            Item.of('gtceu:stainless_steel_plate', 3),
            Item.of('gtceu:dynamite', 3),
            Item.of('superbwarfare:seeker', 1)
        )
        .itemOutputs(Item.of('superbwarfare:ptkm_1r', 1))
        .circuit(3)
        .duration(400)
        .EUt(128);

    // Lunge mine — suicide contact fuze on a pole; the long rod IS the lunge pole
    event.remove({ output: 'superbwarfare:lunge_mine' });
    event.recipes.gtceu.assembler('kubejs:sw_lunge_mine')
        .itemInputs(
            Item.of('gtceu:steel_plate', 2),
            Item.of('gtceu:dynamite', 3),
            Item.of('gtceu:long_steel_rod', 1)
        )
        .itemOutputs(Item.of('superbwarfare:lunge_mine', 1))
        .circuit(4)
        .duration(200)
        .EUt(32);

    // =========================================================================
    // WHITE PHOSPHORUS ORDNANCE
    // Phosphorus + sulfur is a GTCEu-native incendiary combo.
    // =========================================================================

    // Mortar shell WP — parallels the plain mortar_shell but swaps the steel/gunpowder
    // fill for a WP payload (phosphorus + sulfur ignition compound)
    event.remove({ output: 'superbwarfare:mortar_shell_wp' });
    event.recipes.gtceu.ammo_press('kubejs:sw_mortar_shell_wp')
        .itemInputs(
            Item.of('gtceu:steel_plate', 1),
            Item.of('gtceu:phosphorus_dust', 1),
            Item.of('gtceu:sulfur_dust', 1)
        )
        .itemOutputs(Item.of('superbwarfare:mortar_shell_wp', 2))
        .circuit(5)
        .duration(60)
        .EUt(30);

    // Large shell WP — same WP payload scaled up to the large shell form factor
    // (see large_shell array below for AP/HE/CM/GS counterparts)

    // =========================================================================
    // LARGE SHELLS  (spec requires kubejs:bullet_casing_large)
    // Circuits are local to this array and do not conflict with the small_shell
    // circuits in guns_and_ammo.js because this is a separate recipe group.
    // =========================================================================

    const largeShells = [
        {
            id: 'superbwarfare:large_shell_ap', circuit: 1,
            // AP = steel penetrator core, moderate propellant
            inputs: [
                Item.of('kubejs:bullet_casing_large', 1),
                Item.of('gtceu:steel_nugget', 3),
                Item.of('gtceu:small_gunpowder_dust', 2)
            ]
        },
        {
            id: 'superbwarfare:large_shell_he', circuit: 2,
            // HE = dynamite bursting charge + propellant
            inputs: [
                Item.of('kubejs:bullet_casing_large', 1),
                Item.of('gtceu:dynamite', 1),
                Item.of('gtceu:small_gunpowder_dust', 1)
            ]
        },
        {
            id: 'superbwarfare:large_shell_cm', circuit: 3,
            // Cluster munitions = two sub-munition charges packed into a double casing
            inputs: [
                Item.of('kubejs:bullet_casing_large', 2),
                Item.of('gtceu:dynamite', 2)
            ]
        },
        {
            id: 'superbwarfare:large_shell_gs', circuit: 4,
            // Grapeshot = dense lead pellet fill, minimal propellant
            inputs: [
                Item.of('kubejs:bullet_casing_large', 1),
                Item.of('gtceu:lead_nugget', 6),
                Item.of('gtceu:small_gunpowder_dust', 1)
            ]
        },
        {
            id: 'superbwarfare:large_shell_wp', circuit: 5,
            // White phosphorus — same WP compound as mortar_shell_wp
            inputs: [
                Item.of('kubejs:bullet_casing_large', 1),
                Item.of('gtceu:phosphorus_dust', 1),
                Item.of('gtceu:sulfur_dust', 1)
            ]
        },
    ];

    largeShells.forEach(s => {
        event.remove({ output: s.id });
        event.recipes.gtceu.ammo_press(`sw_large_shell_${s.circuit}`)
            .itemInputs(s.inputs)
            .itemOutputs(Item.of(s.id, 1))
            .circuit(s.circuit)
            .duration(60)
            .EUt(30);
    });

    // =========================================================================
    // RPG ROCKETS
    // Both mirror the tacz:rpg_rocket template (casing_xl + explosive + solid fuel).
    // TBG (thermobaric) swaps the plain dynamite for a hotter magnesium-dust charge.
    // =========================================================================

    event.remove({ output: 'superbwarfare:rpg_rocket_standard' });
    event.recipes.gtceu.ammo_press('kubejs:sw_rpg_rocket_standard')
        .itemInputs(
            Item.of('kubejs:bullet_casing_xl', 2),
            Item.of('gtceu:dynamite', 1),
            'kubejs:solid_rocket_fuel'
        )
        .itemOutputs(Item.of('superbwarfare:rpg_rocket_standard', 1))
        .circuit(7)
        .duration(200)
        .EUt(30);

    event.remove({ output: 'superbwarfare:rpg_rocket_tbg' });
    event.recipes.gtceu.ammo_press('kubejs:sw_rpg_rocket_tbg')
        .itemInputs(
            Item.of('kubejs:bullet_casing_xl', 2),
            Item.of('gtceu:magnesium_dust', 2),   // thermobaric / incendiary fill
            'kubejs:solid_rocket_fuel'
        )
        .itemOutputs(Item.of('superbwarfare:rpg_rocket_tbg', 1))
        .circuit(8)
        .duration(200)
        .EUt(30);

    // =========================================================================
    // UNGUIDED ROCKETS  (no seeker — point and shoot)
    // =========================================================================

    // Small rocket — steel tube + motor + dynamite warhead
    event.remove({ output: 'superbwarfare:small_rocket' });
    event.recipes.gtceu.assembler('kubejs:sw_small_rocket')
        .itemInputs(
            Item.of('gtceu:steel_plate', 2),
            Item.of('superbwarfare:missile_engine', 1),
            Item.of('gtceu:dynamite', 1)
        )
        .itemOutputs(Item.of('superbwarfare:small_rocket', 2))
        .circuit(1)
        .duration(200)
        .EUt(32);

    // Medium rockets — same motor, different warhead fill
    const mediumRockets = [
        {
            id: 'superbwarfare:medium_rocket_ap', circuit: 2,
            // AP warhead: steel penetrator core fills the nose
            inputs: [
                Item.of('gtceu:steel_plate', 2),
                Item.of('superbwarfare:missile_engine', 1),
                Item.of('gtceu:steel_nugget', 4),
                Item.of('gtceu:small_gunpowder_dust', 1)
            ]
        },
        {
            id: 'superbwarfare:medium_rocket_he', circuit: 3,
            // HE warhead: single dynamite charge
            inputs: [
                Item.of('gtceu:steel_plate', 2),
                Item.of('superbwarfare:missile_engine', 1),
                Item.of('gtceu:dynamite', 1)
            ]
        },
        {
            id: 'superbwarfare:medium_rocket_cm', circuit: 4,
            // Cluster: two sub-charges for area coverage
            inputs: [
                Item.of('gtceu:steel_plate', 2),
                Item.of('superbwarfare:missile_engine', 1),
                Item.of('gtceu:dynamite', 2)
            ]
        },
    ];

    mediumRockets.forEach(r => {
        event.remove({ output: r.id });
        event.recipes.gtceu.assembler(`sw_medium_rocket_${r.circuit}`)
            .itemInputs(r.inputs)
            .itemOutputs(Item.of(r.id, 1))
            .circuit(r.circuit)
            .duration(300)
            .EUt(128);
    });

    // =========================================================================
    // GUIDED MISSILES  (seeker required — MV+)
    // =========================================================================

    // Medium anti-air missile — fast, light warhead, seeker tracks aircraft
    event.remove({ output: 'superbwarfare:medium_anti_air_missile' });
    event.recipes.gtceu.assembler('kubejs:sw_medium_anti_air_missile')
        .itemInputs(
            Item.of('gtceu:stainless_steel_plate', 2),
            Item.of('superbwarfare:missile_engine', 1),
            Item.of('gtceu:dynamite', 1),
            Item.of('superbwarfare:seeker', 1)
        )
        .itemOutputs(Item.of('superbwarfare:medium_anti_air_missile', 1))
        .circuit(5)
        .duration(400)
        .EUt(128);

    // Medium anti-ground missile — heavier warhead than the AA variant
    event.remove({ output: 'superbwarfare:medium_anti_ground_missile' });
    event.recipes.gtceu.assembler('kubejs:sw_medium_anti_ground_missile')
        .itemInputs(
            Item.of('gtceu:stainless_steel_plate', 2),
            Item.of('superbwarfare:missile_engine', 1),
            Item.of('gtceu:dynamite', 2),
            Item.of('superbwarfare:seeker', 1)
        )
        .itemOutputs(Item.of('superbwarfare:medium_anti_ground_missile', 1))
        .circuit(6)
        .duration(400)
        .EUt(128);

    // Large anti-ground missile — HV; titanium airframe + large motor + quad warhead
    event.remove({ output: 'superbwarfare:large_anti_ground_missile' });
    event.recipes.gtceu.assembler('kubejs:sw_large_anti_ground_missile')
        .itemInputs(
            Item.of('gtceu:titanium_plate', 2),
            Item.of('superbwarfare:large_motor', 1),
            Item.of('gtceu:dynamite', 4),
            Item.of('superbwarfare:seeker', 1)
        )
        .itemOutputs(Item.of('superbwarfare:large_anti_ground_missile', 1))
        .circuit(7)
        .duration(600)
        .EUt(512);

    // Javelin — man-portable fire-and-forget AT; stainless frame, missile engine, seeker, heavy warhead
    event.remove({ output: 'superbwarfare:javelin_missile' });
    event.recipes.gtceu.assembler('kubejs:sw_javelin_missile')
        .itemInputs(
            Item.of('gtceu:stainless_steel_plate', 2),
            Item.of('superbwarfare:missile_engine', 1),
            Item.of('gtceu:dynamite', 2),
            Item.of('superbwarfare:seeker', 1)
        )
        .itemOutputs(Item.of('superbwarfare:javelin_missile', 1))
        .circuit(8)
        .duration(400)
        .EUt(128);

    // =========================================================================
    // AERIAL BOMBS  (no engine — gravity-delivered; ring = stabiliser fin ring)
    // =========================================================================

    event.remove({ output: 'superbwarfare:small_aerial_bomb' });
    event.recipes.gtceu.assembler('kubejs:sw_small_aerial_bomb')
        .itemInputs(
            Item.of('gtceu:steel_plate', 3),
            Item.of('gtceu:dynamite', 2),
            Item.of('gtceu:steel_ring', 1)
        )
        .itemOutputs(Item.of('superbwarfare:small_aerial_bomb', 2))
        .circuit(1)
        .duration(300)
        .EUt(32);

    event.remove({ output: 'superbwarfare:medium_aerial_bomb' });
    event.recipes.gtceu.assembler('kubejs:sw_medium_aerial_bomb')
        .itemInputs(
            Item.of('gtceu:steel_plate', 5),
            Item.of('gtceu:dynamite', 4),
            Item.of('gtceu:steel_ring', 1)
        )
        .itemOutputs(Item.of('superbwarfare:medium_aerial_bomb', 1))
        .circuit(2)
        .duration(400)
        .EUt(32);

    // =========================================================================
    // DRONES
    // =========================================================================

    // Base drone — four motors + four propellers + basic circuit + lightweight poly housing
    event.remove({ output: 'superbwarfare:drone' });
    event.recipes.gtceu.assembler('kubejs:sw_drone')
        .itemInputs(
            Item.of('superbwarfare:motor', 4),
            Item.of('superbwarfare:propeller', 4),
            Item.of('gtceu:basic_electronic_circuit', 1),
            Item.of('gtceu:polyethylene_plate', 2)
        )
        .itemOutputs(Item.of('superbwarfare:drone', 1))
        .circuit(1)
        .duration(400)
        .EUt(128);

    // Swarm (kamikaze) drone — base drone + seeker for terminal guidance + dynamite warhead
    event.remove({ output: 'superbwarfare:swarm_drone' });
    event.recipes.gtceu.assembler('kubejs:sw_swarm_drone')
        .itemInputs(
            Item.of('superbwarfare:drone', 1),
            Item.of('superbwarfare:seeker', 1),
            Item.of('gtceu:dynamite', 1)
        )
        .itemOutputs(Item.of('superbwarfare:swarm_drone', 1))
        .circuit(2)
        .duration(400)
        .EUt(128);

})