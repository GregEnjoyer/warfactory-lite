// Crafting-table recipes for the ULV multiblock I/O parts.
//
// GTCEu 7.5.3 registers these ULV parts as items but generates NO recipe for any of them
// (its bus/hatch/energy-hatch recipe generation only starts at LV), so they are otherwise
// creative-only. These shaped recipes make them buildable at a vanilla crafting table,
// centred on the ULV machine hull (which GTCEu does make craftable at ULV).
//
// Scheme — keeps import vs export and the three part families unambiguous, so all 6 recipes
// have distinct ingredients:
//   direction -> minecraft:hopper = IMPORT/input,  minecraft:dropper = EXPORT/output
//   family    -> chest = item bus,  glass = fluid hatch,  ULV voltage coil = energy hatch
//
// Shared frame per recipe: ULV machine hull (centre), 4 wrought-iron plates (corners), an ULV
// circuit and a red-alloy cable. Layout:
//   P D P     P = gtceu:wrought_iron_plate   D = direction (hopper / dropper)
//   C K F     C = #gtceu:circuits/ulv        K = gtceu:ulv_machine_hull   F = family part
//   P W P     W = gtceu:red_alloy_single_cable
ServerEvents.recipes(event => {
    event.shaped('gtceu:ulv_input_bus', [
        'PDP',
        'CKF',
        'PWP'
    ], {
        P: 'gtceu:wrought_iron_plate',
        D: 'minecraft:hopper',
        C: '#gtceu:circuits/ulv',
        K: 'gtceu:ulv_machine_hull',
        F: '#forge:chests/wooden',
        W: 'gtceu:red_alloy_single_cable',
    })

    event.shaped('gtceu:ulv_output_bus', [
        'PDP',
        'CKF',
        'PWP'
    ], {
        P: 'gtceu:wrought_iron_plate',
        D: 'minecraft:dropper',
        C: '#gtceu:circuits/ulv',
        K: 'gtceu:ulv_machine_hull',
        F: '#forge:chests/wooden',
        W: 'gtceu:red_alloy_single_cable',
    })

    event.shaped('gtceu:ulv_input_hatch', [
        'PDP',
        'CKF',
        'PWP'
    ], {
        P: 'gtceu:wrought_iron_plate',
        D: 'minecraft:hopper',
        C: '#gtceu:circuits/ulv',
        K: 'gtceu:ulv_machine_hull',
        F: '#forge:glass',
        W: 'gtceu:red_alloy_single_cable',
    })

    event.shaped('gtceu:ulv_output_hatch', [
        'PDP',
        'CKF',
        'PWP'
    ], {
        P: 'gtceu:wrought_iron_plate',
        D: 'minecraft:dropper',
        C: '#gtceu:circuits/ulv',
        K: 'gtceu:ulv_machine_hull',
        F: '#forge:glass',
        W: 'gtceu:red_alloy_single_cable',
    })

    event.shaped('gtceu:ulv_energy_input_hatch', [
        'PDP',
        'CKF',
        'PWP'
    ], {
        P: 'gtceu:wrought_iron_plate',
        D: 'minecraft:hopper',
        C: '#gtceu:circuits/ulv',
        K: 'gtceu:ulv_machine_hull',
        F: 'gtceu:ulv_voltage_coil',
        W: 'gtceu:red_alloy_single_cable',
    })

    event.shaped('gtceu:ulv_energy_output_hatch', [
        'PDP',
        'CKF',
        'PWP'
    ], {
        P: 'gtceu:wrought_iron_plate',
        D: 'minecraft:dropper',
        C: '#gtceu:circuits/ulv',
        K: 'gtceu:ulv_machine_hull',
        F: 'gtceu:ulv_voltage_coil',
        W: 'gtceu:red_alloy_single_cable',
    })
})
