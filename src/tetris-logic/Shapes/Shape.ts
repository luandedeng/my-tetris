/*
 * Define a point class to store position, and describe the shape. 
*/
class Point {
    public x: number;
    public y: number;
    constructor (x: number, y: number) {
        this.x = x;
        this.y = y;
    }
}

/*
 * Define base class of all shapes.
 */
abstract class Shape {
    protected _points: Point[];
    protected _rotation: number; // 0, 1, 2, 3, clockwise rotate.

    /*
    * Accessors
    */
    get points(): Point[] {
        return this._points;
    }

    get rotation(): number {
        return this._rotation;
    }

    public constructor(rotation: number) {
        this._rotation = (rotation + 1) % 4;
        this._points = new Array<Point>();
    }

    private move(x: number, y: number): Point[] {
        let newPoints: Point[] = new Array<Point>();

        for (let i = 0; i < this._points.length; ++i) {
            newPoints.push(new Point(this._points[i].x + x, this._points[i].y + y));
        }

        return newPoints;
    }

    public setPosition(newPoints: Point[], isRotate = false): void {
        this._points = newPoints;
        if (isRotate) {
            this._rotation = (this._rotation + 1) % 4;
        }
    }

    // Return a set of points to show where the shape will be if we drop it
    public drop(): Point[] {
        return this.move(0, 1);
    }

    // Return a set of points to show where the shape will be if we move it left 
    public moveLeft(): Point[] {
        return this.move(-1, 0);
    }
    
    // Return a set of points to show where the shape will be if we move it right
    public moveRight(): Point[] {
        return this.move(1, 0);
    }

    public abstract rotate(): Point[];
}