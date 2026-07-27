GTCEuStartupEvents.registry('gtceu:material', event => {
    event.create('gun_metal')
        .ingot()
        .liquid()
        .components('1x steel', '1x carbon')
        .color(0x0F0F0F).iconSet(GTMaterialIconSet.DULL)
        .flags(GTMaterialFlags.GENERATE_PLATE, GTMaterialFlags.GENERATE_GEAR, GTMaterialFlags.GENERATE_SMALL_GEAR, GTMaterialFlags.GENERATE_ROD,  GTMaterialFlags.GENERATE_LONG_ROD, GTMaterialFlags.GENERATE_SPRING_SMALL, GTMaterialFlags.GENERATE_SPRING )
})

GTCEuStartupEvents.registry('gtceu:material', event => {
    event.create('aircraft_grade_metal')
        .ingot()
        .liquid()
        .components('1x steel', '1x aluminum')
        .blastTemp(1776, "low", GTValues.VA[GTValues.LV], 1600)
        .color(0x68DEDB).iconSet(GTMaterialIconSet.DULL)
        .flags(GTMaterialFlags.GENERATE_PLATE, GTMaterialFlags.GENERATE_GEAR, GTMaterialFlags.GENERATE_SMALL_GEAR, GTMaterialFlags.GENERATE_ROD)
})
      




GTCEuStartupEvents.registry('gtceu:material', event => {
    event.create('tank_grade_metal')
        .ingot()
        .liquid()
        .components('1x steel', '1x cobalt')
        .color(0x3F3F3F).iconSet(GTMaterialIconSet.DULL)
        .flags(GTMaterialFlags.GENERATE_PLATE, GTMaterialFlags.GENERATE_GEAR, GTMaterialFlags.GENERATE_SMALL_GEAR, GTMaterialFlags.GENERATE_ROD)
})

GTCEuStartupEvents.registry('gtceu:material', event => {
    event.create('tung_tung_tungsten')
        .ingot()
        .liquid()
        .components('3x tungsten')
        .color(0x7D683C).iconSet(GTMaterialIconSet.DULL)
        .flags(GTMaterialFlags.GENERATE_PLATE, GTMaterialFlags.GENERATE_GEAR, GTMaterialFlags.GENERATE_SMALL_GEAR, GTMaterialFlags.GENERATE_ROD)
})

GTCEuStartupEvents.registry('gtceu:material', event => {
    event.create('vehicle_metal')
        .ingot()
        .liquid()
        .components('1x steel', '1x red_alloy')
        .color(0x4d3939).iconSet(GTMaterialIconSet.DULL)
        .flags(GTMaterialFlags.GENERATE_PLATE, GTMaterialFlags.GENERATE_GEAR, GTMaterialFlags.GENERATE_SMALL_GEAR, GTMaterialFlags.GENERATE_ROD,  GTMaterialFlags.GENERATE_LONG_ROD, GTMaterialFlags.GENERATE_SPRING_SMALL, GTMaterialFlags.GENERATE_SPRING )
})

GTCEuStartupEvents.registry('gtceu:material', event => {
    event.create('advanced_aircraft_metal')
    .ingot()
    .liquid()
    .components('1x aluminium', '1x stainless_steel')
    .color(0x7ff5e9).iconSet(GTMaterialIconSet.DULL)
    .flags(GTMaterialFlags.GENERATE_PLATE, GTMaterialFlags.GENERATE_GEAR, GTMaterialFlags.GENERATE_SMALL_GEAR, GTMaterialFlags.GENERATE_ROD,  GTMaterialFlags.GENERATE_LONG_ROD, GTMaterialFlags.GENERATE_SPRING_SMALL, GTMaterialFlags.GENERATE_SPRING )
})

// Heavy Duty Fabric — a synthetic textile "woven" from polyethylene, standing in for leather.
// A polymer material so GT autogen makes the sheet (`gtceu:heavy_duty_fabric_plate`) — the polymer
// property is what qualifies a material for the plate prefix (same as stock Polyethylene, whose
// plate exists); GENERATE_PLATE is belt-and-suspenders so the sheet registers regardless. It has no
// GT recipe of its own, so it's produced explicitly in server_scripts/misc/backpacks.js.
GTCEuStartupEvents.registry('gtceu:material', event => {
    event.create('heavy_duty_fabric')
        .polymer()
        .color(0x2E2E32).iconSet(GTMaterialIconSet.DULL)
        .flags(GTMaterialFlags.GENERATE_PLATE)
})
