// priority: 0
// Vehicle fuel tooltips — show fuel-tank capacity + each accepted fuel's energy ratio on both item forms
// of a WFCore-overridden vehicle:
//   • wfcore:packaged_vehicle   (vehicle-factory output; entity id at NBT  tag.entity)
//   • superbwarfare:container   (crowbar pick-up item;    entity id at NBT  tag.BlockEntityTag.EntityType)
//
// SOURCE OF TRUTH / "sync": the SAME fuel/storage overrides registered by the KubeJS *startup* script
// (startup_scripts/wfcore_vehicles.js -> WFVehicles.override(id).maxFuel(mb).fuel(fluidId, ratio)) live in
// SuperbOverrides.overrideDataMap. KubeJS startup scripts run on the CLIENT as well as the server, so that
// map is already populated client-side — the startup script *is* the client sync; no server->client packet
// is needed. This client script just reads that map to build the tooltip.
//
// The "ratio" is the per-fuel energy multiplier (x1.0 = baseline; higher = the tank lasts longer). Actual
// FE/mB is anchored per-vehicle to its native energy budget (see SuperbWarfareInvMixin), so we show the
// relative multiplier, which is the lever the overrides actually set.

const $SuperbOverrides = Java.loadClass('com.norwood.wfcore.SuperbOverrides')
const $Screen = Java.loadClass('net.minecraft.client.gui.screens.Screen')

// "gtceu:high_octane_gasoline" -> "High Octane Gasoline"
const prettyFluid = fluidId => {
    let path = fluidId.indexOf(':') >= 0 ? fluidId.substring(fluidId.indexOf(':') + 1) : fluidId
    return path.split('_').map(w => (w.length ? w.charAt(0).toUpperCase() + w.substring(1) : w)).join(' ')
}

// 16000 -> "16,000"
const withCommas = n => String(n).replace(/\B(?=(\d{3})+(?!\d))/g, ',')

// Float noise: 0.8f widened to double is 0.800000011920929 — round to 2dp, keep >=1 decimal. 1 -> "1.0".
const prettyRatio = r => {
    let n = Math.round(Number(r) * 100) / 100
    return (n % 1 === 0) ? n.toFixed(1) : String(n)
}

const packagedEntity = item => {
    let nbt = item.getTag()
    if (nbt && nbt.contains('entity')) return nbt.getString('entity')
    return null
}

const containerEntity = item => {
    let nbt = item.getTag()
    if (nbt && nbt.contains('BlockEntityTag')) {
        let bet = nbt.getCompound('BlockEntityTag')
        if (bet.contains('EntityType')) return bet.getString('EntityType')
    }
    return null
}

// Append the fuel-capacity + accepted-fuels lines for the vehicle entity id (or nothing if it has no override).
const appendFuelTooltip = (entityId, text) => {
    if (!entityId) return
    let override = $SuperbOverrides.getOverride(entityId)
    if (!override || !override.hasFuelOverride()) return

    text.add(Text.aqua('Fuel tank: ' + withCommas(override.maxFuel()) + ' mB'))

    if (!$Screen.hasShiftDown()) {
        text.add(Text.darkGray('Hold ').append(Text.gray('Shift')).append(Text.darkGray(' for accepted fuels')))
        return
    }

    // Map.copyOf (in OverrideData) has no defined iteration order, so collect + sort by ratio (cheapest first).
    let entries = []
    let it = override.fluidConsumptionMap().entrySet().iterator()
    while (it.hasNext()) {
        let e = it.next()
        entries.push([e.getKey().toString(), e.getValue().floatValue()])
    }
    entries.sort((a, b) => (a[1] - b[1]) || (a[0] < b[0] ? -1 : a[0] > b[0] ? 1 : 0))

    text.add(Text.gray('Accepted fuels ').append(Text.darkGray('(x = energy per mB)')))
    entries.forEach(en => {
        text.add(Text.of('  ')
            .append(Text.white(prettyFluid(en[0])))
            .append(Text.darkGray(' x'))
            .append(Text.gold(prettyRatio(en[1]))))
    })
}

ItemEvents.tooltip(event => {
    event.addAdvanced('wfcore:packaged_vehicle', (item, advanced, text) => appendFuelTooltip(packagedEntity(item), text))
    event.addAdvanced('superbwarfare:container', (item, advanced, text) => appendFuelTooltip(containerEntity(item), text))
})
