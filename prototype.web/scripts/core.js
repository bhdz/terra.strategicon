
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
    // It has an orientation and each Hex can have up to 6 edges.
    // Two common edges comprise the borders between two Hexes.
    //
    function Edge (orient) {
        this.orientation = orient % 6;
        this.borderingEdge = null;  // this connects the Edges into Borders
        this.firstPoint = null;
        this.secondPoint = null;
    }
    
    //
    // This represents a path extension from the center till the edges of a Hex
    //  Hexes have 
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
                Xaxis:  null, 
                Yaxis:  null, 
                Zaxis:  null 
            ];
        this.assets = {};
    }
    
    //
    // This sets the map at a given position. Duh!
    //  atPosition  ** Point
    //  hex         ** hex
    //  edges       ** to update with the neighbors
    //  paths       ** to update with the neighbors
    Map.prototype.stampOutHex = function (position, hex, edges, paths) {
        return false;
    }
    
    //
    // This sets the map at a given position. Duh!
    //  atPosition  ** Point
    //  hex         ** hex
    //  edges       ** to update with the neighbors
    //  paths       ** to update with the neighbors
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
    
    Map.prototype.findHex = function (position) {
        return false;
    }
    
    Map.prototype.find = function (what, position) {
        return false;
    }
    
    return {
        Coords: Coords,
        Point:  Point,
        Vector: Vector,
        Edge:   Edge,
        Path:   Path,
        Hex:    Hex,
        Map:    Map
    }
});

