ServerEvents.recipes(event => {
    event.remove({
        mod: 'gtmthings',
        output: /gtmthings:.*_wireless_.*/
    })
    event.remove({
                        mod: 'gtmthings',
                        output: /gtmthings:.*_digital_miner/
                    })

    // MineTraps: strip the Toxin item recipes (Toxin bottle + its alt recipe, and the Toxin bucket).
    // The toxic *traps* (spikes_toxic, toxic_mine, toxic_nail_trap) are left craftable.
    event.remove({ id: 'minetraps:toxin_bottle' })
    event.remove({ id: 'minetraps:toxin_bottle_alt' })
    event.remove({ id: 'minetraps:toxin_bucket' })
})