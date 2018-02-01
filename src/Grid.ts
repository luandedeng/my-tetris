class Grid {
    private rows: number;
    private columns: number;
    private blockStatus: boolean[][];
    private currentShape: Shape;

    constructor(rows: number, columns: number) {
        this.rows = rows;
        this.columns = columns;
    }

    public addShape(shape: Shape): boolean  {
        let ret: boolean = true;

        for (let i: number = 0; i < shape.points.length; ++i) {
            if (shape.points[i].y < 0) {
                ret = false;
                break;
            }
            this.blockStatus[shape.points[i].x][shape.points[i].y] = true;
        }

        return ret;
    }

    /*
     * Check if rows are full. since only rows in which last shape is will be effected, 
     * so it's only necessary to check these rows.
     * index of rows erased will be returned.
     */
    public checkRows(lastShape: Shape): number[] {
        let indexOfRowsRemoved: number[] = new Array<number>();

        let rowMin: number;
        let rowMax: number;
        rowMin = rowMax = lastShape.points[0].y;

        // find out the max and min row in last shape.
        for (let i = 1; i < lastShape.points.length; ++i) {
            if (lastShape.points[i].y < rowMin) {
                rowMin = lastShape.points[i].y;
            }
            if (lastShape.points[i].y > rowMax) {
                rowMax = lastShape.points[i].y;
            }
        }
        if (rowMin < 0) {
            rowMin = 0;
        }

        // check each row effected. If it is completed, save its index;
        while (rowMax >= rowMin) {
            let rowComplete: boolean = true;
            for (let column = 0; column < this.columns; ++column) {
                if (this.blockStatus[rowMax][column]) {
                    rowComplete = false;
                    break;
                }
            }

            if (rowComplete) {
                indexOfRowsRemoved.push(rowMax - indexOfRowsRemoved.length);

                for (let row: number = rowMax; row > 0; --row) {
                    for (let column: number = 0; column < this.columns; ++column) {
                        this.blockStatus[row][column] = this.blockStatus[row-1][column];
                    }
                }
                this.blockStatus[0][0] = false;

                rowMin++;
            }
            else {
                rowMax--;
            }
        }

        return indexOfRowsRemoved;
    }

    public isPosValid(points: Point[]): boolean {
        let isValid: boolean = true;

        for (let i: number = 0; i < points.length; ++i) {
            if ((points[i].x < 0) ||
                (points[i].x >= this.columns) ||
                (points[i].y >= this.rows)) {
                isValid = false;
                break;
            }

            if (points[i].y >= 0) {
                if (this.blockStatus[points[i].x][points[i].y]) {
                    isValid = false;
                    break;
                }
            }
        }

        return isValid;
    }

    public initGrid(): void {
        this.setGridStatus(false);
    }

    public clearGrid(): void {
        this.setGridStatus(true);
    }
    
    private setGridStatus(status: boolean): void {
        for (let row: number = 0; row < this.rows; ++row) {
            for (let column: number = 0; column < this.columns; ++column) {
                this.blockStatus[row][column] = status;
            }
        }
    }

    /* 
    private generateShape(): Shape {
        let shape: Shape;
        let randomType: number = Math.floor(Math.random() * 7);
        let randomRotation: number = Math.floor(Math.random() * 4);
       
        switch(randomType) {
            case 0:
                shape = new IShape(this.columns, randomRotation);
                break;
            case 1:
                shape = new LShape(true, this.columns, randomRotation);
                break;
            case 2:
                shape = new LShape(false, this.columns, randomRotation);
                break;
            case 3:
                shape = new OShape(this.columns, randomRotation);
                break;
            case 4:
                shape = new TShape(this.columns, randomRotation);
                break;
            case 5:
                shape = new ZShape(true, this.columns, randomRotation);
                break;
            case 6:
                shape = new ZShape(false, this.columns, randomRotation);
                break;
       }
       
       return shape;
   } 
   */
}