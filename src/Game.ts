const enum GameState {
    NotStart,
    Initializing,
    Playing,
    Removing,
    Adding,
    GameOver
}
class Game {
    private _score: number;
    private _level: number;
    private _currentShape: Shape;
    private _nextShape: Shape;
    private _grid: Grid;

    /*
    * Accessors
    */
    get score(): number {
        return this._score;
    }

    get level(): number {
        return this._level;
    }

    get currentShape(): Shape {
        return this._currentShape;
    }

    get nextShape(): Shape {
        return this._nextShape;
    }

    get grid(): Grid {
        return this._grid;
    }

    public constructor(rows: number = 20, columns: number = 10) {
        this._grid = new Grid(rows, columns);
        this.resetGame();
    }

    public startNewGame(): void {
        this.resetGame();
    }

    private resetGame(): void {
        this._score = 0;
        this._level = 0;
        this._currentShape = this.generateShape();
        this._nextShape = this.generateShape();
        this._grid.clearGrid();
    }

    private generateShape(): Shape {
        let shape: Shape;
        let randomType: number = Math.floor(Math.random() * 7);
        let randomRotation: number = Math.floor(Math.random() * 4);
       
        switch(randomType) {
            default:
            case 0:
                shape = new IShape(this._grid.columns, randomRotation);
                break;
            case 1:
                shape = new LShape(true, this._grid.columns, randomRotation);
                break;
            case 2:
                shape = new LShape(false, this._grid.columns, randomRotation);
                break;
            case 3:
                shape = new OShape(this._grid.columns, randomRotation);
                break;
            case 4:
                shape = new TShape(this._grid.columns, randomRotation);
                break;
            case 5:
                shape = new ZShape(true, this._grid.columns, randomRotation);
                break;
            case 6:
                shape = new ZShape(false, this._grid.columns, randomRotation);
                break;
       }

       return shape;
    }
}