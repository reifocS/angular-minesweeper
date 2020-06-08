export class Cell {


    private hasMine: boolean;
    private state: 'available' | 'revealed' | 'flagged' = 'available';
    private nearbyMines: number;

    constructor(private x: number, private y: number) {
    }


    public getNearbyMines = () => {
        return this.nearbyMines;
    }

    public setNearbyMines = (nb: number) => {
        this.nearbyMines = nb;
    }

    public getState = () => {
        return this.state;
    }

    public isMined = () => {
        return this.hasMine;
    }

    public getCoord = () => {
        return { x: this.x, y: this.y };
    }

    public setStateTo(state: 'available' | 'revealed' | 'flagged') {
        this.state = state;
    }

    public plantMine = () => {
        this.hasMine = true;
    }

    public flag = () => {
        if (this.state === 'flagged') {
            this.state = 'available';
            return;
        }

        if (this.state === 'revealed')
            return;

        this.state = 'flagged'
    }
}



