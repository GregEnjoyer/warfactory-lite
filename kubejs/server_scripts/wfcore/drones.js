// Drone-warfare GT recipes — the Monitor control tablet, the SBW Drone-Warfare add-on drones (LUCAS + FPV)
// and their upgrade modules. All of these mods' vanilla crafting recipes are stripped by
// cleanup/remove_crafting.js (superbwarfare + sbwdroneconfig are in its NAMESPACES list), so these GT
// assembler routes are the only way to obtain them. Each is research-gated on an Aviation "Drone Tactics"
// node (see aviation_research.js) via WFResearch.condition('<id>').
//
// POWER / FUEL (per the WFCore vehicle infrastructure — no bespoke battery item is used):
//   * FPV drone (cubed_fpv_drone) is energy-powered: it charges from the WFCore Vehicle Charger and from any
//     Forge-energy battery slotted in its bay. GregTech batteries are admitted into the bay by the
//     data/wfcore/tags/items/drone_upgrades.json overlay (#gtceu:batteries).
//   * LUCAS (lucas_drone) is liquid-fuelled through the WFCore fuel override (registered in the mod's
//     DroneUpgradeBay) — drop a GT fuel cell (gasoline/diesel) in its bay to refuel. No jerrycan recipe needed.
//   * The base Drone + Swarm Drone recipes live in guns/ammo.js (gated on drone_tactics / drone_swarm).
ServerEvents.recipes(event => {

    const gated = (r, id) => r.addCondition(WFResearch.condition(id))

    // --- Monitor — the drone control tablet (links to a drone, opens FPV view). Gate: Drone Tactics. ---
    gated(event.recipes.gtceu.assembler('kubejs:drone_monitor')
        .itemInputs('gtceu:tempered_glass', 'gtceu:lv_sensor', 'gtceu:polyethylene_plate', '1x #gtceu:circuits/mv')
        .itemOutputs('superbwarfare:monitor')
        .circuit(1).duration(200).EUt(128), 'drone_tactics');

    // --- LUCAS attack drone — a fixed-wing gasoline airframe (fuel via the WFCore override). Gate: LUCAS. ---
    gated(event.recipes.gtceu.assembler('kubejs:drone_lucas')
        .itemInputs('8x gtceu:stainless_steel_frame', 'superbwarfare:large_propeller', '2x gtceu:hv_electric_motor',
            '64x gtceu:aluminium_plate', '4x #gtceu:circuits/hv')
        .itemOutputs('sbwdroneconfig:lucas_drone')
        .circuit(2).duration(700).EUt(480), 'drone_lucas');

    // --- Cubed FPV drone — 4 motors + 4 propellers + a camera sensor + poly housing. Gate: FPV Drones. ---
    gated(event.recipes.gtceu.assembler('kubejs:drone_fpv')
        .itemInputs('8x gtceu:mv_electric_motor', '4x superbwarfare:propeller', 'gtceu:mv_sensor',
            '6x gtceu:carbon_fiber_plate', '2x #gtceu:circuits/mv')
        .itemOutputs('sbwdroneconfig:cubed_fpv_drone')
        .circuit(3).duration(400).EUt(128), 'drone_fpv');

    // --- FPV upgrade modules (drone-inventory / countermeasure kit) -----------------------------------
    // Spotlight module — glowstone lamp behind glass. Gate: FPV Spotlight.
    gated(event.recipes.gtceu.assembler('kubejs:drone_spotlight_module')
        .itemInputs('2x gtceu:aluminium_plate', '4x minecraft:glowstone_dust', 'gtceu:tempered_glass', '1x #gtceu:circuits/hv')
        .itemOutputs('sbwdroneconfig:spotlight_module')
        .circuit(1).duration(200).EUt(128), 'drone_fpv_spotlight');

    // Fiber-optic spool upgrade — PTFE-clad optical cable. Gate: Fiber-Optic Link.
    gated(event.recipes.gtceu.assembler('kubejs:drone_fiber_optic')
        .itemInputs('8x gtceu:polytetrafluoroethylene_plate', '64x gtceu:copper_single_cable', '1x #gtceu:circuits/hv')
        .itemOutputs('sbwdroneconfig:fiber_optic_spool_upgrade')
        .circuit(2).duration(200).EUt(480), 'drone_fpv_fiber');

    // Handheld drone jammer / RF radar — emitter + seeker guidance board. Gate: Drone Jammer.
    gated(event.recipes.gtceu.assembler('kubejs:drone_jammer')
        .itemInputs('3x gtceu:stainless_steel_plate', '6x gtceu:mv_emitter', 'superbwarfare:seeker', '4x #gtceu:circuits/hv')
        .itemOutputs('sbwdroneconfig:drone_jammer')
        .circuit(3).duration(300).EUt(512), 'drone_fpv_jammer');
});
