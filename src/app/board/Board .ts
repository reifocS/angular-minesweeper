import { Cell } from './Cell'



export class Board {

    cells: Cell[][];


    static xDirections = [1, -1, 0, 0, 1, 1, -1, -1];
    static yDirections = [0, 0, 1, -1, 1, -1, 1, -1];

    constructor(private size: number, private mines: number) {
        this.cells = [];

        for (let i: number = 0; i < size; i++) {
            this.cells[i] = [];
            for (let j: number = 0; j < size; j++) {
                this.cells[i][j] = new Cell(i, j);
            }
        }
        this.plantMines();
        for (let i: number = 0; i < size; i++) {
            for (let j: number = 0; j < size; j++) {
                let currentCell =  this.cells[i][j];
                let nearbyMines = this.countNearbyMines(currentCell);
                currentCell.setNearbyMines(nearbyMines);
            }
        }
    }

    private plantMines(): void {
        let drawRange = [];
        // form a range of integers...
        for (let i = 0; i < Math.pow(this.size, 2); ++i)
            drawRange[i] = i;
        // suffle it...
        this.shuffle(drawRange);
        // pick the i first integer, plant a mine on it
        for (let i = 0; i < this.mines; ++i) {
            let nb = drawRange[i];
            let row = Math.floor(nb / this.size);
            let col = nb % this.size;
            this.cells[row][col].plantMine();
        }
    }

    private shuffle(array) {
        let currentIndex = array.length, temporaryValue, randomIndex;
        // While there remain elements to shuffle...
        while (0 !== currentIndex) {

            // Pick a remaining element...
            randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex -= 1;

            // And swap it with the current element.
            temporaryValue = array[currentIndex];
            array[currentIndex] = array[randomIndex];
            array[randomIndex] = temporaryValue;


        }
    }

    private countNearbyMines(cell: Cell): number {
        let count = 0;
        let { x, y } = cell.getCoord();
        for (let i = 0; i < Board.xDirections.length; ++i) {
          let deltaX = Board.xDirections[i];
          let deltaY = Board.yDirections[i];
          if (this.isInBoard(x + deltaX, y + deltaY) && this.cells[x + deltaX][y + deltaY].isMined())
            count += 1;
        }
        return count;
      }

      private isInBoard(x: number, y: number) {
        return x >= 0 && y >= 0 && x < this.size && y < this.size;
      }
}