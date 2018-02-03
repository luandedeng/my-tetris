class IShape extends Shape {
    constructor(column: number, rotation: number) {
        super(rotation);

        let x: number = column / 2;
        let y: number = -2;

        this.points.push(new Point(x, y - 2));
        this.points.push(new Point(x, y - 1));
        this.points.push(new Point(x, y)); // base point index 2
        this.points.push(new Point(x, y + 1));
    }

    public rotate(): Point[] {
        let newPoints: Point[] = new Array<Point>();
        let rotation: number = (this.rotation + 1) % 4;

        switch(rotation) {
            case 0:
            case 2:
                newPoints.push(new Point(this.points[2].x, this.points[2].y - 2));
                newPoints.push(new Point(this.points[2].x, this.points[2].y - 1));
                newPoints.push(new Point(this.points[2].x, this.points[2].y));
                newPoints.push(new Point(this.points[2].x, this.points[2].y + 1));
                break;
            case 1:
            case 3:
                newPoints.push(new Point(this.points[2].x + 2, this.points[2].y));
                newPoints.push(new Point(this.points[2].x + 1, this.points[2].y));
                newPoints.push(new Point(this.points[2].x, this.points[2].y));
                newPoints.push(new Point(this.points[2].x - 1, this.points[2].y));
                break;
        }

        return newPoints;
    }
}