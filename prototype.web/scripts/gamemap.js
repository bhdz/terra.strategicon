define(["core","utils"], function(core, utils) {

    function GameCell(posX, posY, posZ, baseTerrain, bordersTerrain) {
        this.hex = new Hex(posX, posY, posZ);
        this.baseTerrain = baseTerrain;
        this.bordersTerrain = bordersTerrain;
    }

    function GameBoard(cellsWidth, cellsHeight) {
        this.cellsWidth = cellsWidth;
        this.cellsHeight = cellsHeight;
    }
    
    GameBoard.prototype.generate = function (where) {
        return null;
    };

    function GameMap(width, height) {
        this.width = width;
        this.height = height;
        this.map = [];
    }
    
    GameMap.prototype.load = function (mapResource) {
    };
    

    return {
        GameCell:   GameCell,
        GameBoard:  GameBoard,
        GameMap:    GameMap
    }
});

