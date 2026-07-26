// WFCore drill deposits — drilling recipes + GregTech Ore Prospector visibility.
//
// Pairs with startup_scripts/wfcore_drill_deposits.js (which defines the deposit types + region quotas).
//
// Each deposit drills a primary raw ore (always) plus its GregTech vein-mates as chanced byproducts,
// mirroring the in-game veins. The DepositRecipeCondition (WFDeposits.condition) keys each recipe to the
// deposit type beneath the rig's drill head; DrillingCustomRecipeLogic picks the matching input-less recipe.
//
// No drilling-fluid–boosted variants: the drill has no item/circuit input, so every boosted recipe shares
// the same single "drilling_fluid" input and GregTech's input-indexed lookup can hold only one recipe per
// input signature — the rest are dropped ("failed to add ... into lookup DB"). Boosting is therefore only
// viable for a single deposit type pack-wide, so it is omitted here.
//
// GregTech raw-ore item ids are gtceu:raw_<material>; Sheldonite's material is "cooperite". Recipe builder
// note: this pack's Rhino trips over the inputItems/outputItems overloads, so we use itemOutputs + Item.of(...)
// (proven to disambiguate) — same as the sibling GT scripts.
//
// `primaryCount` is the raw ore produced PER cycle. Total primary ore over a deposit's life is
// blocks * yield_per_block * primaryCount (see startup script), so this is the GT-scale quantity knob and it
// does NOT affect how long the deposit lasts. primaryCount 12 is what makes even the smallest deposit clear
// ~20k (precious sizeMin 5² * yield 70 * 12 = 21000); keep it 12 across the board to hold that ratio.
// Byproducts keep a per-cycle chance but also carry a count, so they add up as a real (secondary) bonus.

// [ depositId, EUt, duration, primaryRaw, primaryCount, [ [byproductRaw, chance/10000, count], ... ] ]
const DRILL = [
    // --- BULK / PRECIOUS (ported verbatim from the wfcore dev run — keep in sync with it) ---
    ['titanium_deposit', 128, 100, 'gtceu:raw_ilmenite', 12, [['gtceu:raw_chromite', 3000, 6]]],
    ['tungsten_deposit', 128, 100, 'gtceu:raw_scheelite', 12, [['gtceu:raw_tungstate', 5000, 6], ['gtceu:raw_lithium', 2000, 4]]],
    ['platinum_deposit', 512, 150, 'gtceu:raw_cooperite', 12, [['gtceu:raw_platinum', 4000, 6], ['gtceu:raw_palladium', 2500, 4]]],
    ['uranium_deposit', 512, 150, 'gtceu:raw_pitchblende', 12, [['gtceu:raw_uraninite', 4000, 6]]],
    ['naquadah_deposit', 1920, 200, 'gtceu:raw_naquadah', 12, []],

    // --- RARE VARIETY (pack-specific; pairs with the RARE_DEPOSITS table) — same primaryCount 12 => same ~20k+ ratio ---
    ['copper_deposit', 128, 100, 'gtceu:raw_chalcopyrite', 12, [['gtceu:raw_pyrite', 3500, 4], ['gtceu:raw_cobaltite', 1500, 2]]],
    ['chromium_deposit', 128, 100, 'gtceu:raw_chromite', 12, [['gtceu:raw_magnetite', 2500, 4]]],
    ['ruby_deposit', 512, 150, 'gtceu:raw_ruby', 12, [['gtceu:raw_red_garnet', 3500, 4], ['gtceu:raw_pyrope', 1500, 2]]],
    ['sapphire_deposit', 512, 150, 'gtceu:raw_sapphire', 12, [['gtceu:raw_green_sapphire', 3000, 4], ['gtceu:raw_almandine', 1500, 2]]],
    ['diamond_deposit', 512, 150, 'gtceu:raw_diamond', 12, [['gtceu:raw_graphite', 3000, 4]]],
]

ServerEvents.recipes(event => {
    DRILL.forEach(([deposit, eut, dur, primary, primaryCount, byproducts]) => {
        const recipe = event.recipes.wfcore.drilling('wfcore:drill_' + deposit)
            .itemOutputs(Item.of(primary, primaryCount))
            .EUt(eut)
            .duration(dur)
            .addCondition(WFDeposits.condition(deposit))
        byproducts.forEach(([item, chance, count]) => recipe.chancedOutput(Item.of(item, count), chance, 0))
    })
})

// Prospector visibility is handled in Java: ProspectorOreDepositMixin reads each deposit's block entity at the
// tail of GregTech's ORE scan and labels it with the type's prospectorMaterial (set in the startup script), so
// every deposit shows on the Ore Prospector as its real ore. No forge:ores tag is needed.
