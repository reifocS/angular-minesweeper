import {
  Component, Input, OnInit
} from '@angular/core';
import { Board } from './Board '
import { Cell } from './Cell'

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.css']
})
export class BoardComponent implements OnInit {
  @Input() size: number;
  @Input() mines: number;
  board: Cell[][];
  remainingCells: number;
  gameState: 'lost' | 'won' | 'pending' = 'pending';

  constructor() { }

  ngOnInit(): void {
    this.board = new Board(this.size, this.mines).cells;
    this.remainingCells = this.size * this.size - this.mines;
  }

  onClickCell(cell: Cell): void {
    if (cell.getState() !== 'available')
      return;
    if (cell.isMined()) {
      alert('game over');
      this.gameState = 'lost';
      this.revealAllBoard();
      return;
    }
    let count = cell.getNearbyMines();
    cell.setStateTo('revealed');
    --this.remainingCells;
    if (count === 0) {
      //clear surrounding cells
      let { x, y } = cell.getCoord();
      for (let i = 0; i < Board.xDirections.length; ++i) {
        let deltaX = Board.xDirections[i];
        let deltaY = Board.yDirections[i];
        let adjacentCell = this.board[x + deltaX] && this.board[x + deltaX][y + deltaY]
        if (adjacentCell) {
          this.onClickCell(adjacentCell)
        }
      }

    }

    if (this.remainingCells === 0) {
      this.gameState = 'won';
      alert('Win !!')
    }
  }



  private revealAllBoard = () => {
    this.board.forEach(row => row.forEach(cell => cell.setStateTo('revealed')));
  }



  public flagCell(cell: Cell) {
    cell.flag();
  }
  public test() {
    this.board = new Board(this.size, this.mines).cells;
    this.remainingCells = this.size * this.size - this.mines;  
    this.gameState = 'pending';
  }
}
