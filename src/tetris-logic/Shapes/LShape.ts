class LShape extends Shape {
    private _leftHanded: boolean;

    constructor(leftHanded: boolean, column: number, rotation: number) {
        super(rotation);
        this._leftHanded = leftHanded;

        let x: number = column / 2;
        let y: number = -2;

        this.points.push(new Point(x, y - 1));
        this.points.push(new Point(x, y));  // All rotation will based on index 1
        this.points.push(new Point(x, y + 1));
        this.points.push(new Point(x + (this._leftHanded ? -1 : 1), y + 1));
    }

    public rotate(): Point[] {
        let newPoints: Point[] = new Array<Point>();
        let rotation: number = (this.rotation + 1) % 4;
        
        switch(rotation) {
            case 0:
                newPoints.push(new Point(this.points[1].x, this.points[1].y - 1));
                newPoints.push(new Point(this.points[1].x, this.points[1].y));
                newPoints.push(new Point(this.points[1].x, this.points[1].y + 1));
                newPoints.push(new Point(this.points[1].x + (this._leftHanded ? -1 : 1), this.points[1].y + 1));
                break;
            case 1:
                newPoints.push(new Point(this.points[1].x + 1, this.points[1].y));
                newPoints.push(new Point(this.points[1].x, this.points[1].y));
                newPoints.push(new Point(this.points[1].x - 1, this.points[1].y));
                newPoints.push(new Point(this.points[1].x - 1, this.points[1].y + (this._leftHanded ? -1 : 1)));
                break;
            case 2:
                newPoints.push(new Point(this.points[1].x, this.points[1].y + 1));
                newPoints.push(new Point(this.points[1].x, this.points[1].y));
                newPoints.push(new Point(this.points[1].x, this.points[1].y - 1));
                newPoints.push(new Point(this.points[1].x + (this._leftHanded ? 1 : -1), this.points[1].y - 1));
                break;
            case 3:
                newPoints.push(new Point(this.points[1].x - 1, this.points[1].y));
                newPoints.push(new Point(this.points[1].x, this.points[1].y));
                newPoints.push(new Point(this.points[1].x + 1, this.points[1].y));
                newPoints.push(new Point(this.points[1].x + 1, this.points[1].y + (this._leftHanded ? 1 : -1)));
                break;
        }

        return newPoints;
    }
}