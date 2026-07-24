// priority: 100
//
// WFCore drill deposits — a testing set of grouped GregTech ore deposits + their worldgen quotas.
//
// Deposit TYPES (what a deposit is: texture / yield / cluster size / scatter weight) and REGION quotas
// (how many + where) live here in a *startup* script so worldgen sees them before any world loads. The
// matching drilling RECIPES (what each deposit drills into) live in
// server_scripts/wfcore_drill_deposits.js.
//
// Groupings mirror GregTech's in-game ore veins (see GTOres): each deposit drills a primary ore plus its
// vein-mates as chanced byproducts —
//   titanium  = Bauxite/Mineral-Sand family : Ilmenite (+ Chromite)
//   tungsten  = Scheelite vein              : Scheelite (+ Tungstate, Lithium)
//   platinum  = Sheldonite vein             : Sheldonite/Cooperite (+ Platinum, Palladium)
//   uranium   = Pitchblende vein            : Pitchblende (+ Uraninite)
//   naquadah  = Naquadah vein               : Naquadah
//
// IMPORTANT: for the deterministic test counts below to actually hold, ambient scatter is turned OFF in
// config/wfcore.toml ([deposits.worldgen] scatter = false). With scatter on, the config's 1-in-24-chunk
// random placement completely swamps these quotas (and mixes in the built-in iron/copper/gold). The
// `weight`s below only matter if you turn scatter back on.

// Half-width of the test area, in blocks, centred on the world origin (0,0). +/-40000 => "40k radius".
const R = 40000

// `prospectorMaterial` is the GregTech material the deposit shows as on the Ore Prospector (primary ore of
// the group) AND the tint of its ore overlay. Sheldonite's material is "cooperite".
//
// Each deposit renders as a BEDROCK cube with a transparent GregTech ore overlay layered on top, tinted to
// the material's colour (same look as GT ore blocks). `.overlay(...)` enables that; drop it and use
// `.texture('ns:block/foo')` instead for a plain single-texture deposit.
const OVERLAY = 'gtceu:block/material_sets/dull/ore'

// QUANTITY vs LIFESPAN — two independent knobs:
//   total primary ore  ≈ size*size * yield_per_block * outputCount   (outputCount is in the recipes script)
//   lifespan (seconds) ≈ size*size * yield_per_block * (recipeDuration / 20)
// The drill removes 1 yield from one block per cycle (outer first; block -> bedrock at 0), producing
// `outputCount` ore that cycle. So raising outputCount multiplies the ore WITHOUT lengthening the drill.
// Sized so the *smallest* roll (sizeMin², yieldMin) still clears the 20k-per-ore target:
// Titanium + tungsten are bulk industrial ores => WAY bigger patches; the precious three are small + dense.
//   titanium/tungsten sizeMin 12 (144) * yield 40 * outputCount 12 = 69120 ; avg ~117k ; ~14 h
//   platinum/uranium  sizeMin 5  (25)  * yield 70 * outputCount 12 = 21000 ; avg ~33k  ; ~6-8 h
//   naquadah          sizeMin 5  (25)  * yield 70 * outputCount 12 = 21000 ; avg ~33k  ; ~8 h
//
// [ id, langName, prospectorMaterial, weight, sizeMin, sizeMax, yieldMin, yieldMax, regionCount ]
const DEPOSITS = [
    // BULK — titanium provider (Ilmenite + Chromite): huge patches (12-16)
    ['titanium_deposit', 'Ilmenite (Titanium) Deposit', 'ilmenite', 90, 12, 16, 40, 60, 5000],
    // BULK — tungsten provider (Scheelite + Tungstate + Lithium): huge patches (12-16)
    ['tungsten_deposit', 'Scheelite (Tungsten) Deposit', 'scheelite', 80, 12, 16, 40, 60, 4500],
    // precious — platinum group (Sheldonite + Platinum + Palladium): small dense patches (5-7)
    ['platinum_deposit', 'Sheldonite (Platinum) Deposit', 'cooperite', 22, 5, 7, 70, 85, 1200],
    // precious — uranium (Pitchblende + Uraninite): small dense patches (5-7)
    ['uranium_deposit', 'Pitchblende (Uranium) Deposit', 'pitchblende', 11, 5, 7, 70, 85, 600],
    // precious/rarest — naquadah (target 150-200 across the +/-40k box)
    ['naquadah_deposit', 'Naquadah Deposit', 'naquadah', 2, 5, 7, 70, 85, 175],
]

DEPOSITS.forEach(([id, name, prospectorMaterial, weight, sizeMin, sizeMax, yMin, yMax, count]) => {
    WFDeposits.add(id)
        .name('wfcore.deposit.' + id)
        .overlay(OVERLAY)
        .prospectorMaterial(prospectorMaterial)
        .weight(weight)
        .yield(yMin, yMax)
        .dimension('minecraft:overworld')
        .register()

    // Deterministic quota: `count` clusters, one per grid cell, spread across the +/-R square (overworld),
    // each a sizeMin..sizeMax square footprint on the bedrock floor.
    WFDeposits.region(id)
        .dimension('minecraft:overworld')
        .from(-R, -R)
        .to(R, R)
        .count(count)
        .size(sizeMin, sizeMax)
        .register()
})

// --- TEST NODES: guaranteed deposits right next to spawn -----------------------------------------------
// One of each type at a fixed coordinate within ~40 blocks of (0,0). Nodes place deterministically in their
// chunk and use the type's normal yield. Sizes mirror the big/small split (bulk 14x14, precious 6x6), so
// each is a real 20k+ deposit right at spawn — no hunting. You'll watch outer blocks turn to bedrock as the
// rig drills. Remove this block for production. (With [deposits.worldgen] logPlacements = true in wfcore.toml,
// each placement also prints "[deposit] placed ..." to the log.)
// [ id, x, z, size ]
const TEST_NODES = [
    ['titanium_deposit', 36, 4, 14],
    ['tungsten_deposit', 4, 36, 14],
    ['platinum_deposit', -36, 4, 6],
    ['uranium_deposit', 4, -36, 6],
    ['naquadah_deposit', 36, 36, 6],
]
TEST_NODES.forEach(([id, x, z, size]) => {
    WFDeposits.node(id, x, z).dimension('minecraft:overworld').size(size).register()
})

console.info('[wfcore] registered ' + DEPOSITS.length + ' drill deposit types + region quotas (+/-' + R + ') + '
    + TEST_NODES.length + ' test nodes near spawn')
