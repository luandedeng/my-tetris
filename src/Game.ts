enum GameState {
    Adding_New_Shape,
    Dropping_Shape,
    Finishing_Shape,
    Game_Over
}

enum ShapeMovement {
    Dropping_Down,
    Moving_Left,
    Moving_Right,
    Rotating
}

class GameUpdateEvent extends egret.Event {
    public constructor(type: string = "", bubbles: boolean = false, cancelable: boolean = false) {
        super(type, bubbles, cancelable);
    }
}

class Game extends egret.EventDispatcher{
    private _score: number;
    private _level: number;
    private _currentShape: Shape;
    private _nextShape: Shape;
    private _grid: Grid;
    private _timer: egret.Timer;
    private _currentState: GameState;

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
        super();
        this._grid = new Grid(rows, columns);
        this._timer = new egret.Timer(1000);
        this._timer.addEventListener(egret.TimerEvent.TIMER_COMPLETE, this.update, this);
        this.resetGame();
    }

    public startNewGame(): void {
        this.resetGame();
        this.switchState(GameState.Adding_New_Shape);
        this._timer.start();
    }

    public update(): void {
        let state: GameState = this._currentState;
        switch (state) {
            case GameState.Adding_New_Shape:
                this._currentShape = this._nextShape;
                this._nextShape = this.generateShape();
                this.switchState(GameState.Dropping_Shape);
                break;
            case GameState.Dropping_Shape:
                this.handleShapeMovement(ShapeMovement.Dropping_Down);
                break;
            case GameState.Finishing_Shape:
                let indexes: number[] = this.grid.checkRows(this._currentShape);
                this.calculateScore(indexes.length);
                this.switchState(GameState.Adding_New_Shape);
                break;
            case GameState.Game_Over:
                this._timer.stop();
                break;
        }
        this.notifyUpdate();
    }

    public addNewRows(countOfRows: number): void {
        // TODO
    }

    public dropShape(): void {
        if (this._currentState == GameState.Dropping_Shape) {
            this.handleShapeMovement(ShapeMovement.Dropping_Down);
            this.notifyUpdate();
        }
    }

    public moveShapeToLeft(): void {
        if (this._currentState == GameState.Dropping_Shape) {
            this.handleShapeMovement(ShapeMovement.Moving_Left);
            this.notifyUpdate();
        }
    }

    public moveShapeToRight(): void {
        if (this._currentState == GameState.Dropping_Shape) {
            this.handleShapeMovement(ShapeMovement.Moving_Right);
            this.notifyUpdate();
        }
    }

    public rotateShape(): void {
        if (this._currentState == GameState.Dropping_Shape) {
            this.handleShapeMovement(ShapeMovement.Rotating);
            this.notifyUpdate();
        }
    }

    private notifyUpdate(): void {
        let event: GameUpdateEvent = new GameUpdateEvent();
        this.dispatchEvent(event);
    }

    private handleShapeMovement(movement: ShapeMovement): void {
        let newPos: Point[] = new Array<Point>();
        switch(movement) {
            case ShapeMovement.Dropping_Down:
                newPos = this._currentShape.drop();
                if (this.grid.isPosValid(newPos)) {
                    this._currentShape.setPosition(newPos);
                }
                else {
                    if (this.grid.addShape(this._currentShape)) {
                        this.switchState(GameState.Finishing_Shape);
                    }
                    else {
                        this.switchState(GameState.Game_Over);
                    }
                }
                break;
            case ShapeMovement.Moving_Left:
                newPos = this._currentShape.moveLeft();
                if (this.grid.isPosValid(newPos)) {
                    this._currentShape.setPosition(newPos);
                }
                break;
            case ShapeMovement.Moving_Right:
                newPos = this._currentShape.moveRight();
                if (this.grid.isPosValid(newPos)) {
                    this._currentShape.setPosition(newPos);
                }
                break;
            case ShapeMovement.Rotating:
                newPos = this._currentShape.rotate();
                if (this.grid.isPosValid(newPos)) {
                    this._currentShape.setPosition(newPos, true);
                }
                break;
        }
    }

    private calculateScore(countOfRows: number): void {
        switch (countOfRows) {
            case 1:
                this._score += 100;
                break;
            case 2:
                this._score += 200;
                break;
            case 3:
                this._score += 400;
                break;
            case 4:
                this._score += 800;
                break;
        }
    }

    private switchState(state: GameState) {
        this._currentState = state;
    }

    private resetGame(): void {
        this._score = 0;
        this._level = 0;
        this._currentShape = this.generateShape();
        this._nextShape = this.generateShape();
        this._grid.clearGrid();
        this._timer.stop();
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