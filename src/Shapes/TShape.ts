class TShape extends Shape {
    constructor(column: number) {
        super();
        let x: number = column / 2;
        let y: number = -2;

        this.points.push(new Point(x - 1, y));
        this.points.push(new Point(x, y));
        this.points.push(new Point(x + 1, y));
        this.points.push(new Point(x, y + 1));
    }

    public rotate(): Point[] {
        let newPoints: Point[];
        let rotation: number = (this.rotation + 1) % 4;

        switch(rotation) {
            case 0:
                newPoints.push(new Point(this.points[1].x - 1, this.points[1].y));
                newPoints.push(new Point(this.points[1].x, this.points[1].y));
                newPoints.push(new Point(this.points[1].x + 1, this.points[1].y));
                newPoints.push(new Point(this.points[1].x, this.points[1].y + 1));
                break;
            case 1:
                newPoints.push(new Point(this.points[1].x, this.points[1].y - 1));
                newPoints.push(new Point(this.points[1].x, this.points[1].y));
                newPoints.push(new Point(this.points[1].x, this.points[1].y + 1));
                newPoints.push(new Point(this.points[1].x - 1, this.points[1].y));
                break;
            case 2:
                newPoints.push(new Point(this.points[1].x + 1, this.points[1].y));
                newPoints.push(new Point(this.points[1].x, this.points[1].y));
                newPoints.push(new Point(this.points[1].x - 1, this.points[1].y));
                newPoints.push(new Point(this.points[1].x, this.points[1].y - 1));
                break;
            case 3:
                newPoints.push(new Point(this.points[1].x, this.points[1].y + 1));
                newPoints.push(new Point(this.points[1].x, this.points[1].y));
                newPoints.push(new Point(this.points[1].x, this.points[1].y - 1));
                newPoints.push(new Point(this.points[1].x + 1, this.points[1].y));
                break;
        }

        return newPoints;
    }
}