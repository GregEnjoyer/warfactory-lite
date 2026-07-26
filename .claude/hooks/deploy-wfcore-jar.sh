#!/usr/bin/env bash
# PostToolUse (Bash) hook: after a wfcore Gradle build, deploy the freshly built (non-slim) wfcore jar
# into the pack's mods/ and the live PrismLauncher instance's mods/, so a recompile is immediately
# playable. Reads the hook JSON on stdin. Silent + never fails the tool (every guard exits 0).

MOD_LIBS="/home/rawhav0kk/projects/wfcore-porting/Warfctory-Modern-Core/build/libs"
PACK_MODS="/home/rawhav0kk/projects/wfcore-porting/warfactory-lite/mods"
INST_MODS="/home/rawhav0kk/games/PrismLauncher/instances/Warfactory-lite-0.0.1(1)/minecraft/mods"

input="$(cat)"
cmd="$(printf '%s' "$input" | jq -r '.tool_input.command // empty' 2>/dev/null)"
[ -n "$cmd" ] || exit 0

# Only act on a Gradle build/assemble (the recompile step) — ignore every other bash command.
case "$cmd" in
    *gradle*build*|*gradlew*assemble*|*gradle*jar*) ;;
    *) exit 0 ;;
esac

# Newest non-slim wfcore jar from the build output.
jar="$(ls -t "$MOD_LIBS"/wfcore-*.jar 2>/dev/null | grep -v -- '-slim' | head -n1)"
[ -n "$jar" ] || exit 0
base="$(basename "$jar")"

deployed=0
for dest in "$PACK_MODS" "$INST_MODS"; do
    [ -d "$dest" ] || continue
    # Replace any existing wfcore jar so versions don't stack up in mods/.
    rm -f "$dest"/wfcore-*.jar
    cp -f "$jar" "$dest/$base" && deployed=1
done

[ "$deployed" -eq 1 ] && printf '{"systemMessage":"Deployed %s to pack + instance mods/"}\n' "$base"
exit 0
