ServerEvents.recipes(event => {
    event.remove({
        mod: 'gtmthings',
        output: /gtmthings:.*_wireless_.*/
    })
    event.remove({
                        mod: 'gtmthings',
                        output: /gtmthings:.*_digital_miner/
                    })

})