// GregTech production for the ALLOWED SecurityCraft items. All SecurityCraft recipes are
// disabled in cleanup/securitycraft.js; this re-adds ONLY the permitted subset, each built in
// the ASSEMBLER and self-contained from GT/vanilla materials (the reinforced/"hardened" blocks
// and every other SC intermediate stay uncraftable). Everything is LV-accessible except the
// codebreaker (EV). Each recipe carries a UNIQUE programmed-circuit selector (1..29) so none
// collide — in particular the five otherwise-identical keycards.
//
// Requested tweaks honoured:
//   • denylist (blacklist) module -> uses redstone, NOT an ink sac ("squid sack")
//   • keycard holder             -> leather + steel
//   • motion activated light     -> GT lv_sensor + GT lamp
//   • laser block                -> GT lv_emitter;  camera/detector/scanners -> GT lv_sensor
//   • keypad / keypad door/trap  -> a normal (stone) button
// NOT included: "key panel" (securitycraft:key_panel) has NO obtainable item form in
// SecurityCraft v1.10.2.1 — no item model, no recipe, empty loot table — so it cannot be a
// recipe output. Ask if a later SC version makes it a real item and it can be added.

const P  = 'gtceu:'
const CL = '#gtceu:circuits/lv'      // consumed LV circuit board
const CE = '#gtceu:circuits/ev'      // consumed EV circuit board (codebreaker only)
const SC = 'securitycraft:'
const LV = 32, EV = 2048             // assembler EU/t (voltage tier)

// [ outputId, circuitSelector, EUt, durationTicks, [ [count, itemId], … ] ]
const RECIPES = [
    [SC + 'alarm',                          1, LV, 200, [[4, P + 'steel_plate'], [1, 'minecraft:note_block'], [2, 'minecraft:glass'], [2, 'minecraft:redstone'], [1, CL]]],
    [SC + 'whitelist_module',               2, LV, 200, [[4, P + 'iron_plate'], [2, 'minecraft:paper'], [1, CL]]],
    [SC + 'blacklist_module',               3, LV, 200, [[4, P + 'iron_plate'], [1, 'minecraft:paper'], [2, 'minecraft:redstone'], [1, CL]]],
    [SC + 'block_change_detector',          4, LV, 200, [[4, P + 'steel_plate'], [1, 'minecraft:redstone_torch'], [1, P + 'lv_sensor'], [1, CL]]],
    [SC + 'security_camera',                5, LV, 200, [[4, P + 'iron_plate'], [2, 'minecraft:glass'], [1, 'minecraft:redstone'], [1, P + 'lv_sensor'], [1, CL]]],
    [SC + 'camera_monitor',                 6, LV, 200, [[6, P + 'iron_plate'], [1, 'minecraft:glass_pane'], [1, CL]]],
    [SC + 'codebreaker',                    7, EV, 600, [[2, 'minecraft:diamond'], [1, 'minecraft:nether_star'], [4, 'minecraft:gold_ingot'], [2, 'minecraft:redstone'], [1, CE]]],
    [SC + 'inventory_scanner',              8, LV, 300, [[6, P + 'steel_plate'], [2, 'minecraft:glass'], [1, 'minecraft:hopper'], [1, P + 'lv_sensor'], [1, CL]]],
    [SC + 'keycard_holder',                 9, LV, 200, [[4, P + 'steel_plate'], [2, 'minecraft:leather'], [1, CL]]],
    [SC + 'keycard_lock',                  10, LV, 200, [[4, P + 'steel_plate'], [2, 'minecraft:redstone'], [1, P + 'lv_sensor'], [1, CL]]],
    [SC + 'keycard_reader',                11, LV, 200, [[4, P + 'steel_plate'], [1, 'minecraft:hopper'], [2, 'minecraft:redstone'], [1, P + 'lv_sensor'], [1, CL]]],
    [SC + 'keycard_lv1',                   12, LV, 100, [[2, P + 'iron_plate'], [1, 'minecraft:redstone'], [1, CL]]],
    [SC + 'keycard_lv2',                   13, LV, 100, [[2, P + 'iron_plate'], [1, 'minecraft:redstone'], [1, CL]]],
    [SC + 'keycard_lv3',                   14, LV, 100, [[2, P + 'iron_plate'], [1, 'minecraft:redstone'], [1, CL]]],
    [SC + 'keycard_lv4',                   15, LV, 100, [[2, P + 'iron_plate'], [1, 'minecraft:redstone'], [1, CL]]],
    [SC + 'keycard_lv5',                   16, LV, 100, [[2, P + 'iron_plate'], [1, 'minecraft:redstone'], [1, CL]]],
    [SC + 'keypad',                        17, LV, 200, [[4, P + 'steel_plate'], [1, 'minecraft:stone_button'], [2, 'minecraft:redstone'], [1, CL]]],
    [SC + 'keypad_door_item',              18, LV, 300, [[6, P + 'steel_plate'], [1, 'minecraft:stone_button'], [2, 'minecraft:redstone'], [1, CL]]],
    [SC + 'keypad_trapdoor',               19, LV, 200, [[4, P + 'steel_plate'], [1, 'minecraft:stone_button'], [1, 'minecraft:redstone'], [1, CL]]],
    [SC + 'laser_block',                   20, LV, 300, [[4, P + 'steel_plate'], [4, 'minecraft:glass_pane'], [1, 'minecraft:redstone_block'], [1, P + 'lv_emitter'], [1, CL]]],
    [SC + 'motion_activated_light',        21, LV, 200, [[2, P + 'steel_plate'], [1, P + 'lv_sensor'], [1, P + 'white_lamp'], [1, CL]]],
    [SC + 'door_indestructible_iron_item', 22, LV, 300, [[6, P + 'steel_plate'], [2, 'minecraft:iron_ingot']]],
    [SC + 'reinforced_iron_trapdoor',      23, LV, 200, [[4, P + 'steel_plate'], [1, 'minecraft:iron_ingot']]],
    [SC + 'retinal_scanner',               24, LV, 300, [[4, P + 'steel_plate'], [1, 'minecraft:ender_eye'], [1, P + 'lv_sensor'], [1, CL]]],
    [SC + 'scanner_door_item',             25, LV, 300, [[6, P + 'steel_plate'], [1, 'minecraft:ender_eye'], [1, P + 'lv_sensor'], [1, CL]]],
    [SC + 'scanner_trapdoor',              26, LV, 300, [[4, P + 'steel_plate'], [1, 'minecraft:ender_eye'], [1, P + 'lv_sensor'], [1, CL]]],
    [SC + 'secure_redstone_interface',     27, LV, 300, [[4, P + 'steel_plate'], [1, 'minecraft:comparator'], [1, 'minecraft:redstone_torch'], [2, 'minecraft:redstone'], [1, CL]]],
    [SC + 'secure_trading_station',        28, LV, 300, [[4, P + 'steel_plate'], [4, 'minecraft:glass'], [1, 'minecraft:hopper'], [1, 'minecraft:emerald'], [1, CL]]],
    [SC + 'username_logger',               29, LV, 200, [[4, P + 'steel_plate'], [1, 'minecraft:paper'], [2, 'minecraft:redstone'], [1, P + 'lv_sensor'], [1, CL]]],
]

ServerEvents.recipes(event => {
    RECIPES.forEach(([out, circ, eu, dur, items]) => {
        const r = event.recipes.gtceu.assembler('wf_sc_' + out.replace(SC, ''))
            .itemOutputs(out)
            .circuit(circ)
            .EUt(eu)
            .duration(dur)
        items.forEach(([n, id]) => r.itemInputs(n + 'x ' + id))
    })
})
