# Chained CI: WF-suite mods → modpack rebuild

The WF-suite mods are sourced from GitHub, so a modpack rebuild should follow
whenever one of them publishes a new build. The pipeline is:

```
 mod repo build workflow ──▶ publishes GitHub release ──▶ release:published event
        │                                                        │
        │                                        notify-modpack.yml (each mod repo)
        │                                                        │
        │                                     POST /repos/.../warfactory-lite/dispatches
        │                                          (event_type: wf-mod-updated)
        ▼                                                        ▼
   (rolling `latest`/`snapshots`)                    warfactory-lite/rebuild.yml
                                                     • pakku update <WF mods>
                                                     • re-pin wfweight asset
                                                     • pakku export
                                                     • commit refreshed lock
                                                     • publish `pack-latest` release
```

## Repos & workflows

| Repo | Workflow | Role |
|------|----------|------|
| `warfactory-lite` | `.github/workflows/rebuild.yml` | **Receiver.** Refreshes GitHub mods, re-exports, commits lock, publishes `pack-latest`. |
| `Warfctory-Modern-Core` (wfcore) | `gradle.yml` (existing) + `notify-modpack.yml` | Builds rolling `latest`; notifies modpack. |
| `MCglTF` | `snapshots.yml` (**new**) + `notify-modpack.yml` | Builds rolling `snapshots`; notifies modpack. |
| `Ultimate-Weight` (wfweight) | `snapshots.yml` (existing) + `notify-modpack.yml` | Builds rolling `snapshots`; notifies modpack. |
| `WarForge-Remaintained` | `snapshots.yml` (**new**, builds `port/1.20.1`; dispatch folded in) | Builds rolling `snapshots` from the 1.20.1 branch and dispatches the rebuild itself. |
| `SimpleBedrockModel` | `snapshots.yml` (**new**, builds `1.20.1-fp`; dispatch folded in) + existing publish workflows | Builds rolling `snapshots` from the 1.20.1 branch and dispatches the rebuild itself. |

`notify-modpack.yml` is identical across the mod repos and triggers on
`release: [published]`, so it fires regardless of which build workflow created
the release (including the rolling `latest`/`snapshots` tags, which are
delete-then-recreate and thus re-publish each build).

**Exception — `WarForge-Remaintained` and `SimpleBedrockModel`:** their 1.20.1
work lives on non-default branches (`port/1.20.1` and `1.20.1-fp`). A
`release: [published]` workflow only runs from the default branch, so these two
have no `notify-modpack.yml`; instead their `snapshots.yml` (which runs on the
1.20.1 branch) POSTs the `wf-mod-updated` dispatch itself as its final step. Any
repo whose active branch isn't the default branch should use this folded-dispatch
pattern.

## Required secrets

**Each WF-suite mod repo** needs:
- `MODPACK_DISPATCH_TOKEN` — a Personal Access Token allowed to POST repository
  dispatches to `warfactory-lite`. Recommended: a *fine-grained* PAT scoped to
  `Warfactory-Official/warfactory-lite` with **Contents: Read and write**
  (dispatch requires write). If a secret is absent the notify step no-ops with a
  warning, so it is safe to roll out gradually.

**`warfactory-lite`** needs:
- `CURSEFORGE_API_KEY` — CurseForge Eternal API key; pakku uses it to resolve CF
  projects during the rebuild.
- The built-in `GITHUB_TOKEN` (no setup) commits the refreshed lock and publishes
  the `pack-latest` release.

## Freezes (protected from auto-update)

`pakku.json` marks these `update_strategy: NONE`, so the rebuild never bumps them:
- `superb-warfare` → `0.8.8` (ashvehicle compatibility)
- `timeless-and-classics-zero` (tacz) → `1.1.7-hotfix2` (ashvehicle/superb compat)
- `Ultimate-Weight` (wfweight) → hand-pinned 1.20.1-Forge snapshot; the rebuild
  refreshes this pin via `ci/repin-wfweight.py` (its release ships many
  loader/MC jars, which defeats `--gh` auto-selection).

## Pending: mcgltf

`MCglTF` had no GitHub release, so it is not yet in the lock. Once its new
`snapshots.yml` has published the rolling `snapshots` prerelease, wire it with:

```bash
pakku add prj --type mod --gh Warfactory-Official/MCglTF
pakku export
```

The rebuild workflow also does this automatically (idempotent) on its next run.

## warforge snapshot vs stale release

`WarForge-Remaintained`'s newest GitHub *release* was `v2.0.0`, so `pakku --gh`
pinned that even though the repo had advanced. The new `snapshots.yml` publishes
a rolling `snapshots` prerelease of the current build; because `pakku --gh`
selects the newest release by date (prereleases included) and its main reobf jar,
the next `pakku update WarForge-Remaintained` (run automatically by the rebuild
workflow) moves warforge onto the fresh snapshot.

## Manual rebuild

`workflow_dispatch` on `warfactory-lite` → optional `update_all` input also runs
`pakku update -a` (bumps every non-frozen project, including CurseForge mods).
