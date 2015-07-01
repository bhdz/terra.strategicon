//
// Todo::
//  _I_ .must: Think over whether this whole directory needsz packaging .into:
//   another folder/directory.
//
//&3: 'cus I don't know how require.js will _balk_ .at: me in the phuture{+s?}
//
define(["utils"], function(utils) {

    //
    // Flat Cubic coordinate system. This class translates coordinates by a 
    //  given Vector basis and a dependent geometric object.
    //
    function Coords (axisX, axisY, axisZ) {
        this.axisX = axisX;
        this.axisY = axisY;
        this.axisZ = axisZ;
        this.basis = new Vector(axisX, axisY, axisZ);
    }

    Coords.prototype.translate = function(obj, chosenAxis) {
        // .. this returns the translated mapobj such that it's 
        // .. Coordinate properties are fixed onto The Cubic HexCoordinated Map
        // .. or something like it.
        // .. Each. _obj_ -has ((posX, posY, posZ))
    }    

    //
    // Normalized X,Y,Z coordinates, Cubic coordinate system
    //
    function Point (posX, posY, posZ) {
        this.posX = posX;
        this.posY = posY;
        this.posZ = posZ;
    }
    
    //
    // returns? distance ** to <pt2>
    //
    Point.prototype.distanceTo = function (pt2) {
        return Math.max(
                pt2.posX - this.posX, 
                pt2.posY - this.posY, 
                pt2.posZ - this.posZ
            );
    };
    
    //
    // returns? a path ** of Points to <pt2>
    //&3:
    //  Move me to _Coords_ class cas
    //
    Point.prototype.pathTo = function (pt2) {
        var path = { 
                start: this, 
                intermediate: [ new Point(0,0,0) ], 
                end: pt2 
            };
        return path;
    };
    
    //
    // normalization functions. Fix a coordinate axis and follow the rule of
    // x+y+z "always" == 0
    //
    // TEMPORARY HACK... Reader() .move: -Me into {{
    //    "the Coords class" $ / translate
    //      ... Please...
    // }}
    //
    Point.prototype.normalizeZ = function (x, y) {
        this.posX = x;
        this.posY = y;
        this.posZ = - (x + y);
    }
    
    Point.prototype.normalizeY = function (x, z) {
        this.posX = x;
        this.posY = - (x + z);
        this.posZ = z;
    }
    
    Point.prototype.normalizeX = function (x, y) {
        this.posX = - (y + z);
        this.posY = y;
        this.posZ = z;
    }
    
    //
    // Vector in a Flat Cubic coordinate system
    //  FutureReader():: 
    //      Please -use Coords. class to -change this.x, this.y, this.z
    //
    function Vector (x, y, z) {
        this.x = x;
        this.y = y;
        this.z = z;
    }
    
    Vector.prototype.add = function (other) {
        return new Vector(this.x + other.x, this.y + other.y, this.z + other.z);
    };
    
    Vector.prototype.neg = function() {
        return new Vector(-this.x, -this.y, -this.z);
    };
    
    Vector.prototype.sub = function (other) {
        return this.add(other.neg())
    };
    
    Vector.prototype.mul = function (scalar) {
        return new Vector(this.x * scalar, this.y * scalar, this.z * scalar);
    };
    
    //
    // This represents an edge between two Hexes. 
    // It -has .an orientation. and -each .Hex. can have up to -6 edges.
    // Two _common_ edges .comprise: the borders between two Hexes.
    //
    //&3:
    //  Borders are important ASSET of this GAME PROTOTYPE as you cannot
    //   force units to do interesting things without this CLASS
    //
    function Edge (orient) {
        this.orientation = orient % 6;
        this.borderingEdge = null;  // this connects the Edges into Borders
        this.firstPoint = null;
        this.secondPoint = null;
    }
    
    //
    // This represents a path extension from the center till the edges of a Hex
    //  Hexes -have Centers .and. Paths .and. Borders ..
    //
    function Path (orient) {
        this.orientation = orient % 6;
        this.borderJunction = null;
    }
    
    //
    function Border (edgeSupporting, edgeOpposing) {
        this.edgeSupporting = edgeSupporting;
        this.edgeOpposing = edgeOpposing;
    }
    
    //
    // Higher abstraction over Points and Vectors
    //
    function Hex (posX, posY, posZ) {
        this.point = new Point(posX, posY, posZ);
        this.center = [
                        new Path(0), 
                        new Path(1),
                        new Path(2),
                        new Path(3),
                        new Path(4),
                        new Path(5)
                    ];
                    
        this.edges = [
                        new Edge(0), 
                        new Edge(1),
                        new Edge(2),
                        new Edge(3),
                        new Edge(4),
                        new Edge(5)
                    ];
        this.assets = {}; //All aditional info is kept here
        this.features = {};
        this.other = {};
    }
    
    //
    // This represents a static terrain map
    //  center ** A Point selected to be Zero in the Coords
    //
    function Map (center) {
        this.coords = null;
        if ((typeof center) !== "Point") || ((typeof center) !== "Hex") {
            this.coords = new Coords(0, 0, 0);
        } else {
            this.coords = new Coords(
                        center.posX, 
                        center.posY,
                        center.posZ
                    );
        }
        this.hexes = [];    // all hexes are heaped here. Use hexSearchIndices
        this.hexSearchIndices = {

            };
        this.assets = {};
    }
    
    //
    // This .inserts: _a hex_ .in: the map at a given position. Duh!
    //
    //  &3: This means that ALL ADJANCED hexes must be UPDATED as NECESSARY
    //      given a _S??((distribution==function))::arg
    //
    //  atPosition  ** Point
    //  hex         ** hex
    //  edges       ** to update with the neighbors
    //  paths       ** to update with the neighbors
    //  hexUpdater  ** function object? to .help: Updating _the_ neighbors
    //
    Map.prototype.insertHex = function (position, hex, edges, paths,
        hexUpdater) {
        return false;
    }
    
    //
    // This sets the map at a given position. Duh!
    //  atPosition  ** Point
    //  hex         ** hex
    //  edges       ** to update with the neighbors
    //  paths       ** to update with the neighbors
    //
    Map.prototype.set = function (position, hex, edges, paths) {
        return false;
    }
    
    //
    // This gets the map at a given position. Duh!
    //  atPosition  ** Point
    //  hex         ** hex
    //  edges       ** to update with the neighbors
    //  paths       ** to update with the neighbors
    //
    Map.prototype.get = function (position) {
        var hex = {}
        return hex;
    }
    
    //
    // This .searches. The Map for a given Hex
    //  hexDeterminator ** Is? This the Hex _that_ you're searching Of?
    //
    Map.prototype.findHex = function (position, hexDeterminator) {
        return false;
    }
    
    //
    //  This .finds: Objects on the map
    //
    Map.prototype.find = function (what, position) {
        return false;
    }
    
    //
    // Blende... This .is. a Blende .over. Maps
    //  In other words One can combine Maps into Blendages
    //
    // What is a "Blende .over. Maps"?? ANOTHER MAP::
    //   with different features and whatnot of it's HEXes
    //
    // Blende .is. _a Map_
    //
    function MapBlende(maps) {
        this.maps = maps;
        //this is WRONG on purpose. Game features are stored in the MAP
        // class. Users of this class will be confused as hell if I releas
        // -e it as such.
        // phuture USERS! Use _Blende_ .class. not _Map_\!!
    }
    
    //
    //This I need for the Single inheritance. in Javascript
    // Blende .inherits. Map
    // Everything else, .inhertis: MapObj... Maotaodao -< MeeowTaoDao
    //   No.. Everything else inherits from something else... Gotta rethink 
    //   this whole module.
    //
    function MapObject() {
        this.some_thing = null;
    }
    
    return {
        MapObject: MapObject,
        Coords: Coords,
        Point:  Point,
        Vector: Vector,
        Edge:   Edge,
        Path:   Path,
        Hex:    Hex,
        Map:    Map,
        Blende: MapBlende
    }
});

