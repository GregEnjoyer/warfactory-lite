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

ServerEvents.recipes(event => {
    // --- BULK / PRECIOUS (ported verbatim from the wfcore dev run — keep in sync with it) ---

    // titanium_deposit
    event.recipes.wfcore.drilling('wfcore:drill_titanium_deposit')
        .itemOutputs(Item.of('gtceu:raw_ilmenite', 12))
        .EUt(128)
        .duration(100)
        .addCondition(WFDeposits.condition('titanium_deposit'))
        .chancedOutput(Item.of('gtceu:raw_chromite', 6), 3000, 0)

    // tungsten_deposit
    event.recipes.wfcore.drilling('wfcore:drill_tungsten_deposit')
        .itemOutputs(Item.of('gtceu:raw_scheelite', 12))
        .EUt(128)
        .duration(100)
        .addCondition(WFDeposits.condition('tungsten_deposit'))
        .chancedOutput(Item.of('gtceu:raw_tungstate', 6), 5000, 0)
        .chancedOutput(Item.of('gtceu:raw_lithium', 4), 2000, 0)

    // platinum_deposit
    event.recipes.wfcore.drilling('wfcore:drill_platinum_deposit')
        .itemOutputs(Item.of('gtceu:raw_cooperite', 12))
        .EUt(512)
        .duration(150)
        .addCondition(WFDeposits.condition('platinum_deposit'))
        .chancedOutput(Item.of('gtceu:raw_platinum', 6), 4000, 0)
        .chancedOutput(Item.of('gtceu:raw_palladium', 4), 2500, 0)

    // uranium_deposit
    event.recipes.wfcore.drilling('wfcore:drill_uranium_deposit')
        .itemOutputs(Item.of('gtceu:raw_pitchblende', 12))
        .EUt(512)
        .duration(150)
        .addCondition(WFDeposits.condition('uranium_deposit'))
        .chancedOutput(Item.of('gtceu:raw_uraninite', 6), 4000, 0)

    // naquadah_deposit
    event.recipes.wfcore.drilling('wfcore:drill_naquadah_deposit')
        .itemOutputs(Item.of('gtceu:raw_naquadah', 12))
        .EUt(1920)
        .duration(200)
        .addCondition(WFDeposits.condition('naquadah_deposit'))

    // --- RARE VARIETY (pack-specific; pairs with the RARE_DEPOSITS table) — same primaryCount 12 => same ~20k+ ratio ---

    // copper_deposit
    event.recipes.wfcore.drilling('wfcore:drill_copper_deposit')
        .itemOutputs(Item.of('gtceu:raw_chalcopyrite', 12))
        .EUt(128)
        .duration(100)
        .addCondition(WFDeposits.condition('copper_deposit'))
        .chancedOutput(Item.of('gtceu:raw_pyrite', 4), 3500, 0)
        .chancedOutput(Item.of('gtceu:raw_cobaltite', 2), 1500, 0)

    // chromium_deposit
    event.recipes.wfcore.drilling('wfcore:drill_chromium_deposit')
        .itemOutputs(Item.of('gtceu:raw_chromite', 12))
        .EUt(128)
        .duration(100)
        .addCondition(WFDeposits.condition('chromium_deposit'))
        .chancedOutput(Item.of('gtceu:raw_magnetite', 4), 2500, 0)

    // ruby_deposit
    event.recipes.wfcore.drilling('wfcore:drill_ruby_deposit')
        .itemOutputs(Item.of('gtceu:raw_ruby', 12))
        .EUt(512)
        .duration(150)
        .addCondition(WFDeposits.condition('ruby_deposit'))
        .chancedOutput(Item.of('gtceu:raw_red_garnet', 4), 3500, 0)
        .chancedOutput(Item.of('gtceu:raw_pyrope', 2), 1500, 0)

    // sapphire_deposit
    event.recipes.wfcore.drilling('wfcore:drill_sapphire_deposit')
        .itemOutputs(Item.of('gtceu:raw_sapphire', 12))
        .EUt(512)
        .duration(150)
        .addCondition(WFDeposits.condition('sapphire_deposit'))
        .chancedOutput(Item.of('gtceu:raw_green_sapphire', 4), 3000, 0)
        .chancedOutput(Item.of('gtceu:raw_almandine', 2), 1500, 0)

    // diamond_deposit
    event.recipes.wfcore.drilling('wfcore:drill_diamond_deposit')
        .itemOutputs(Item.of('gtceu:raw_diamond', 12))
        .EUt(512)
        .duration(150)
        .addCondition(WFDeposits.condition('diamond_deposit'))
        .chancedOutput(Item.of('gtceu:raw_graphite', 4), 3000, 0)
})

// Prospector visibility is handled in Java: ProspectorOreDepositMixin reads each deposit's block entity at the
// tail of GregTech's ORE scan and labels it with the type's prospectorMaterial (set in the startup script), so
// every deposit shows on the Ore Prospector as its real ore. No forge:ores tag is needed.
