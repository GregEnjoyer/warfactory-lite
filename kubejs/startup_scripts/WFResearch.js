import com.norwood.wfcore.integration.kubejs
StartupEvents.postInit(event => {

// categories (research tabs)
WFResearch.category('ballistics')
.name('Ballistics')
.icon(Item.of('superbwarfare:large_shell_he'))    // artillery shell — projectile/ballistics theme
.backgroundColor(0xFF101814)                // optional solid background (used if no texture)
.connectorColor(0xFF60C060)      // colour of the connector lines
.register()

WFResearch.category('infantry')
.name('Infantry weapons')                       // optional lang key; defaults to wfcore.research.category.logistics
.icon(Item.of('kubejs:infantry_icon'))           // optional tab icon
// optional tiled background texture
.backgroundColor(0xFF101814)                // optional solid background (used if no texture)
.connectorColor(0xFF60C060)      // colour of the connector lines
.register()

WFResearch.category('armor')
.name('Ground vehicles')                       // optional lang key; defaults to wfcore.research.category.logistics
.icon(Item.of('kubejs:tank_icon'))           // optional tab icon
// optional tiled background texture
.backgroundColor(0xFF101814)                // optional solid background (used if no texture)
.connectorColor(0xFF60C060)      // colour of the connector lines
.register()

WFResearch.category('air')
.name('Aviation')                       // optional lang key; defaults to wfcore.research.category.logistics
.icon(Item.of('kubejs:plane_icon'))           // optional tab icon
// optional tiled background texture
.backgroundColor(0xFF101814)                // optional solid background (used if no texture)
.connectorColor(0xFF60C060)      // colour of the connector lines
.register()

WFResearch.category('defense')
.name('Base Defenses')                       // optional lang key; defaults to wfcore.research.category.logistics
.icon(Item.of('superbwarfare:barbed_wire'))           // optional tab icon
// optional tiled background texture
.backgroundColor(0xFF101814)                // optional solid background (used if no texture)
.connectorColor(0xFF60C060)      // colour of the connector lines

.register()

//research guns
WFResearch.builder('guns1')
.category('infantry').pos(0, 0)
.nodeColor(0xFF2F6BD8)                       // optional tile tint when the node is available
.runs(4).cwuPerRun(64).itemPerRun(Item.of('gtceu:basic_electronic_circuit'))
.unlocks(Item.of('kubejs:infantry_icon_1'))
.icon('kubejs:infantry_icon_1')

.register()
//ww2 guns
WFResearch.builder('guns2')
.category('infantry').pos(1, 0)
.nodeColor(0xFF2F6BD8)                       // optional tile tint when the node is available
.runs(8).cwuPerRun(64).itemPerRun(Item.of('gtceu:basic_electronic_circuit'))
.unlocks(Item.of('kubejs:infantry_icon_2'))
.icon('kubejs:infantry_icon_2')
.requires('guns1')
.register()
//ww2 heavy guns
WFResearch.builder('guns2heavy')
.category('infantry').pos(2, 0)
.nodeColor(0xFF2F6BD8)                // optional tile tint when the node is available
.runs(8).cwuPerRun(64).itemPerRun(Item.of('gtceu:basic_electronic_circuit'))
.unlocks(Item.of('infantry_ico_4'))
.icon('kubejs:infantry_icon_4')
.requires('guns2')
.register()
//ww2 advanced guns
WFResearch.builder('guns3')
.category('infantry').pos(3, 0)
.nodeColor(0xFF2F6BD8)                       // optional tile tint when the node is available
.runs(8).cwuPerRun(64).itemPerRun(Item.of('gtceu:basic_electronic_circuit'))
.unlocks(Item.of('infantry_icon_3'))
.icon('kubejs:infantry_icon_3')
.requires('guns2heavy')
.register()
//Early Modern advanced
WFResearch.builder('guns4')
.category('infantry').pos(4, 0)
.nodeColor(0xFF2F6BD8)                       // optional tile tint when the node is available
.runs(16).cwuPerRun(64).itemPerRun(Item.of('gtceu:basic_electronic_circuit'))
.unlocks(Item.of('infantry_icon_1'))
.icon('kubejs:infantry_icon_1')
.requires('guns3')
.register()

WFResearch.builder('guns4heavy')
.category('infantry').pos(5, 0)
.nodeColor(0xFF2F6BD8)                       // optional tile tint when the node is available
.runs(16).cwuPerRun(64).itemPerRun(Item.of('gtceu:basic_electronic_circuit'))
.unlocks(Item.of('infantry_icon_5'))
.icon('kubejs:infantry_icon_5')
.requires('guns4')
.register()

WFResearch.builder('guns5')
.category('infantry').pos(6, 0)
.nodeColor(0xFF2F6BD8)                       // optional tile tint when the node is available
.runs(16).cwuPerRun(64).itemPerRun(Item.of('gtceu:basic_electronic_circuit'))
.unlocks(Item.of('infantry_icon_1'))
.icon('kubejs:infantry_icon_1')
.requires('guns4heavy')
.register()

WFResearch.builder('guns6')
.category('infantry').pos(7, 0)
.nodeColor(0xFF2F6BD8)                       // optional tile tint when the node is available
.runs(16).cwuPerRun(64).itemPerRun(Item.of('gtceu:basic_electronic_circuit'))
.unlocks(Item.of('infantry_icon_1'))
.icon('kubejs:infantry_icon_1')
.requires('guns5')
.register()


WFResearch.builder('planes1')
.category('air').pos(0, 0)
.nodeColor(0xFF2F6BD8)                       // optional tile tint when the node is available
.runs(16).cwuPerRun(64).itemPerRun(Item.of('gtceu:basic_electronic_circuit'))
.unlocks(Item.of('infantry_icon_1'))
.icon('kubejs:plane_icon')
.register()

WFResearch.builder('planes2')
.category('air').pos(1, 0)
.nodeColor(0xFF2F6BD8)                       // optional tile tint when the node is available
.runs(16).cwuPerRun(64).itemPerRun(Item.of('gtceu:basic_electronic_circuit'))
.unlocks(Item.of('infantry_icon_1'))
.icon('kubejs:plane_icon')
.requires('planes1')
.register()


WFResearch.builder('planes3')
.category('air').pos(2, 0)
.nodeColor(0xFF2F6BD8)                       // optional tile tint when the node is available
.runs(16).cwuPerRun(64).itemPerRun(Item.of('gtceu:basic_electronic_circuit'))
.unlocks(Item.of('infantry_icon_1'))
.icon('kubejs:plane_icon')
.requires('planes2')
.register()


WFResearch.builder('helo1')
.category('air').pos(1, 1)
.nodeColor(0xFF2F6BD8)                       // optional tile tint when the node is available
.runs(16).cwuPerRun(64).itemPerRun(Item.of('gtceu:basic_electronic_circuit'))
.unlocks(Item.of('infantry_icon_1'))
.icon('kubejs:plane_icon')
.requires('planes 2')
.register()


WFResearch.builder('helo2')
.category('air').pos(2, 1)
.nodeColor(0xFF2F6BD8)                       // optional tile tint when the node is available
.runs(16).cwuPerRun(64).itemPerRun(Item.of('gtceu:basic_electronic_circuit'))
.unlocks(Item.of('infantry_icon_1'))
.icon('kubejs:plane_icon')
.requires('helo1')
.register()

WFResearch.builder('armor0')
.category('armor').pos(0, 0)
.nodeColor(0xFF2F6BD8)                       // optional tile tint when the node is available
.runs(16).cwuPerRun(64).itemPerRun(Item.of('wfcore:light_ground_vehicle_factory'))
.unlocks(Item.of('wfcore:light_ground_vehicle_factory'))
.icon('wfcore:light_ground_vehicle_factory')
.register()

WFResearch.builder('armor1')
.category('armor').pos(1, 0)
.nodeColor(0xFF2F6BD8)                       // optional tile tint when the node is available
.runs(16).cwuPerRun(64).itemPerRun(Item.of('gtceu:basic_electronic_circuit'))
.unlocks(Item.of('infantry_icon_1'))
.icon('kubejs:tank_icon')
.requires('armor0')
.register()


WFResearch.builder('armor2')
.category('armor').pos(2, 0)
.nodeColor(0xFF2F6BD8)                       // optional tile tint when the node is available
.runs(16).cwuPerRun(64).itemPerRun(Item.of('gtceu:basic_electronic_circuit'))
.unlocks(Item.of('infantry_icon_1'))
.icon('kubejs:tank_icon')
.requires('armor1')

.register()

WFResearch.builder('armor3')
.category('armor').pos(3, 0)
.nodeColor(0xFF2F6BD8)                       // optional tile tint when the node is available
.runs(16).cwuPerRun(64).itemPerRun(Item.of('gtceu:basic_electronic_circuit'))
.unlocks(Item.of('infantry_icon_1'))
.icon('kubejs:tank_icon')
.requires('armor2')
.register()


WFResearch.builder('armor4')
.category('armor').pos(4, 0)
.nodeColor(0xFF2F6BD8)                       // optional tile tint when the node is available
.runs(16).cwuPerRun(64).itemPerRun(Item.of('gtceu:basic_electronic_circuit'))
.unlocks(Item.of('infantry_icon_1'))
.icon('kubejs:tank_icon')
.requires('armor3')
.register()


WFResearch.builder('defenses1')
.category('defense').pos(0, 0)
.nodeColor(0xFF2F6BD8)                       // optional tile tint when the node is available
.runs(16).cwuPerRun(64).itemPerRun(Item.of('gtceu:basic_electronic_circuit'))
.unlocks(Item.of('infantry_icon_1'))
.icon('superbwarfare:sandbag')
.register()

WFResearch.builder('defenses2')
.category('defense').pos(4, 0)
.nodeColor(0xFF2F6BD8)                       // optional tile tint when the node is available
.runs(16).cwuPerRun(64).itemPerRun(Item.of('gtceu:basic_electronic_circuit'))
.unlocks(Item.of('infantry_icon_1'))
.icon('superbwarfare:sandbag')
.requires('defenses1')
.register()

WFResearch.builder('turrets1')
.category('defense').pos(4, 2)
.nodeColor(0xFF2F6BD8)                       // optional tile tint when the node is available
.runs(16).cwuPerRun(64).itemPerRun(Item.of('gtceu:basic_electronic_circuit'))
.unlocks(Item.of('infantry_icon_1'))
.icon('superbwarfare:sandbag')
.requires('defenses1')
.register()


WFResearch.builder('turrets2')
.category('defense').pos(5, 3)
.nodeColor(0xFF2F6BD8)                       // optional tile tint when the node is available
.runs(16).cwuPerRun(64).itemPerRun(Item.of('gtceu:basic_electronic_circuit'))
.unlocks(Item.of('infantry_icon_1'))
.icon('superbwarfare:sandbag')
.requires('turrets1')
.register()

WFResearch.builder('turrets3')
.category('defense').pos(6, 4)
.nodeColor(0xFF2F6BD8)                       // optional tile tint when the node is available
.runs(16).cwuPerRun(64).itemPerRun(Item.of('gtceu:basic_electronic_circuit'))
.unlocks(Item.of('infantry_icon_1'))
.icon('superbwarfare:sandbag')
.requires('turrets2')
.register()
})
