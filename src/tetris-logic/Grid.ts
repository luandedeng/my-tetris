class Grid {
    private _rows: number;
    private _columns: number;
    private _blockStatus: boolean[][];

    /*
    * Accessors
    */
    get rows(): number {
        return this._rows;
    }

    get columns(): number {
        return this._columns;
    }

    constructor(rows: number, columns: number) {
        this._rows = rows;
        this._columns = columns;
        this._blockStatus = new Array<Array<boolean>>(rows);
        for (let row: number = 0; row < rows; ++row) {
            this._blockStatus[row] = new Array<boolean>(columns);
        }
    }

    public addShape(shape: Shape): boolean  {
        let ret: boolean = true;

        for (let i: number = 0; i < shape.points.length; ++i) {
            if (shape.points[i].y < 0) {
                ret = false;
                break;
            }
            this._blockStatus[shape.points[i].x][shape.points[i].y] = true;
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
            for (let column = 0; column < this._columns; ++column) {
                if (this._blockStatus[rowMax][column]) {
                    rowComplete = false;
                    break;
                }
            }

            if (rowComplete) {
                indexOfRowsRemoved.push(rowMax - indexOfRowsRemoved.length);

                for (let row: number = rowMax; row > 0; --row) {
                    for (let column: number = 0; column < this._columns; ++column) {
                        this._blockStatus[row][column] = this._blockStatus[row-1][column];
                    }
                }
                this._blockStatus[0][0] = false;

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
                (points[i].x >= this._columns) ||
                (points[i].y >= this._rows)) {
                isValid = false;
                break;
            }

            if (points[i].y >= 0) {
                if (this._blockStatus[points[i].x][points[i].y]) {
                    isValid = false;
                    break;
                }
            }
        }

        return isValid;
    }

    public clearGrid(): void {
        this.setGridStatus(false);
    }
    
    private setGridStatus(status: boolean): void {
        for (let row: number = 0; row < this._rows; ++row) {
            for (let column: number = 0; column < this._columns; ++column) {
                this._blockStatus[row][column] = status;
            }
        }
    }
}