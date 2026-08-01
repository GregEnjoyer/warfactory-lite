// Emplacements research — all category('defense') nodes (emp_*).
// Crew-served / static weapons on the 'defense' tab. Unlike vehicles these deploy from ITEMS (SBW
// blueprints / deployers) and, once placed, CANNOT be recovered — EXCEPT the Mortar and TOW, which are
// GT-crowbar recoverable via the wfcore:gt_crowbar_pickup_allowed entity tag.
// The projectiles they fire are researched on the BALLISTICS tab, never here.
//
// Tree:  Mortar -> {CIWS, MLRS};  CIWS -> {TOW, BL-132};  BL-132 -> {Mk42, Mle1934}.
//
// Runs in ServerEvents.recipes (fires on server start AND /reload).
ServerEvents.recipes(event => {

    // Item-cost helper: a leading '#' marks a TAG, otherwise an exact item.
    const addCost = (b, id, count) => (typeof id === 'string' && id.charAt(0) === '#')
        ? b.itemTagPerRun(id, count)
        : b.itemPerRun(Item.of(id, count))

    const pv = e => Item.of('wfcore:packaged_vehicle', '{entity:"' + e + '"}')

    // tier -> [runs, eut, cwuPerRun] over ticksPerRun(300): LV 0 / MV ~64 / HV ~256 / EV ~1024 CWU/t
    const ET = {
        lv: [20, 32,   0],
        mv: [30, 128,  19200],
        hv: [40, 512,  76800],
        ev: [50, 2048, 307200],
    }

    // The naval guns unlock from BLUEPRINT items, Mortar/TOW from DEPLOYER items; the Type-63 MLRS assembles
    // straight to an entity (no item), so it shows the packaged-vehicle model via pv().
    ;[
        { id: 'emp_mortar',   tier: 'lv', x: 0,  y: 0, req: null,        name: 'Mortar',
          unlock: Item.of('superbwarfare:mortar_deployer'),
          desc: 'A man-portable mortar built from a barrel, bipod and base plate; lobs HE and white-phosphorus shells. Deploys from an item and is one of only two emplacements recoverable with a GT crowbar.',
          items: [['gtceu:steel_plate', 6], ['minecraft:gunpowder', 4]] },
        { id: 'emp_ciws',     tier: 'mv', x: -1, y: 1, req: 'emp_mortar', name: 'H/PJ-11 CIWS',
          unlock: pv('superbwarfare:hpj_11'),
          desc: 'A radar-directed close-in weapon system: a rotary autocannon that shreds incoming aircraft and munitions. Fires small-calibre anti-air shells (Ballistics tab).',
          items: [['gtceu:stainless_steel_plate', 6], ['#gtceu:circuits/mv', 2], ['superbwarfare:seeker', 1]] },
        { id: 'emp_mlrs',     tier: 'mv', x: 1,  y: 1, req: 'emp_mortar', name: 'Type-63 MLRS',
          unlock: pv('superbwarfare:type_63'),
          desc: 'The Type-63 107mm multiple rocket launcher: twelve tubes of area-saturation rocketry, built up from mortar barrels.',
          items: [['gtceu:stainless_steel_plate', 6], ['superbwarfare:mortar_barrel', 4], ['minecraft:gunpowder', 8]] },
        { id: 'emp_tow',      tier: 'hv', x: -2, y: 2, req: 'emp_ciws',   name: 'TOW Launcher',
          unlock: Item.of('superbwarfare:tow_deployer'),
          desc: 'A tripod-mounted wire-guided anti-tank missile launcher. Deploys from an item and is one of only two emplacements recoverable with a GT crowbar.',
          items: [['gtceu:stainless_steel_plate', 6], ['superbwarfare:missile_engine', 2], ['superbwarfare:seeker', 1]] },
        { id: 'emp_bl_132',   tier: 'hv', x: 0,  y: 2, req: 'emp_ciws',   name: '130mm/58 BL-132',
          unlock: pv('superbwarfare:bl_132'),
          desc: 'A rapid-fire naval mount firing small-calibre armour-piercing shells (Ballistics tab).',
          items: [['gtceu:stainless_steel_plate', 8], ['superbwarfare:cannon_core', 1], ['#gtceu:circuits/hv', 2]] },
        { id: 'emp_mk_42',    tier: 'ev', x: -1, y: 3, req: 'emp_bl_132', name: '5"/54 Mk42',
          unlock: pv('superbwarfare:mk_42'),
          desc: 'A 5-inch dual-purpose naval gun firing large-calibre HE / AP / cluster / white-phosphorus shells (Ballistics tab).',
          items: [['gtceu:titanium_plate', 8], ['superbwarfare:cannon_core', 2], ['#gtceu:circuits/ev', 2]] },
        { id: 'emp_mle_1934', tier: 'ev', x: 1,  y: 3, req: 'emp_bl_132', name: '138.6mm Mle1934',
          unlock: pv('superbwarfare:mle_1934'),
          desc: 'A 138.6mm heavy naval gun firing large-calibre HE / AP / cluster / white-phosphorus shells (Ballistics tab).',
          items: [['gtceu:titanium_plate', 8], ['superbwarfare:cannon_core', 2], ['#gtceu:circuits/ev', 2]] },
    ].forEach(n => {
        const t = ET[n.tier]
        const b = WFResearch.builder(n.id)
            .category('defense').pos(n.x, n.y)
            .nodeColor(0xFF2F6BD8)
            .name(n.name)
            .description(n.desc)
            .runs(t[0]).ticksPerRun(300).eut(t[1]).cwuPerRun(t[2])
            .icon(n.unlock)
            .unlock(n.unlock)
        n.items.forEach(it => addCost(b, it[0], it[1]))
        if (n.req) b.requires(n.req)
        b.register()
    })

})
