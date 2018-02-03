class OShape extends Shape {
    constructor(column: number, rotation: number) {
        super(rotation);
        let x: number = column / 2; // start position will be in the middle of horizon
        let y: number = -2; // will start from out of board.

        // Construct OShape point set.
        this.points.push(new Point(x, y));
        this.points.push(new Point(x + 1, y));
        this.points.push(new Point(x, y + 1));
        this.points.push(new Point(x + 1, y + 1));
    }

    public rotate(): Point[] {
        return this.points; // this shape doesn't rotate.
    }
}