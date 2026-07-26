// Bolt gun conversion map: which block it works on, what it consumes, and what it produces.
// (Formerly hardcoded in WFCore; now data-driven via the WFBoltGun binding.)
//
// The radar dish requires the BOLTED casing variant, so the player builds it with the unbolted casing
// and bolts each one with the bolt gun. Breaking a bolted casing refunds the bolts spent here.
WFBoltGun
    .conversion('wfcore:boltable_casing')
        .result('wfcore:boltable_casing_bolted')
        .cost('gtceu:stainless_steel_bolt', 8)
        .register()
