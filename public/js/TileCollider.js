import TileResolver from './TileResolver.js';

export default class tileCollider {
    constructor(tileMatrix) {
        this.tiles = new TileResolver(tileMatrix);
    }
    
    test(entity) {
//        const match = this.tiles.matchByPosition(entity.pos.x, entity.pos.y);
//        if(match) {
//            console.log("Matched tile", match, match.tile);
//        }
    }
}
