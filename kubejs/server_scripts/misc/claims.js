

BlockEvents.placed(event => {
  
    const block = event.block;
    const player = event.player;
    const level = event.level;
    
    if (block.id === 'superbwarfare:container') {
       
        let $ChunksAPI = Java.loadClass('dev.ftb.mods.ftbchunks.api.FTBChunksAPI');
        const manager = $ChunksAPI.api().getManager();
         
        const chunkX = Math.floor(block.x / 16);
        const chunkZ = Math.floor(block.z / 16);

        const $ChunkDimPos = Java.loadClass('dev.ftb.mods.ftbchunks.api.ClaimedChunkManager.ClaimedChunk');
        const chunkPos = new $ChunkDimPos(level.dimension, chunkX, chunkZ);
  
        
        // Get the claimed chunk
        const claimedChunk = manager.getChunk(chunkPos);
        
        
        // If not in claimed chunk, you cant place it
        if (!claimedChunk) {
            event.cancel();
            player.tell('§cYou can only place vehicles in claimed Chunks');
        }
    }
});
               