import { Cell } from "./Cell";
import { Ship } from "./Ship";


export class GameBoard{
    _board=[];
    
    constructor(){
        for(let i=0;i<10;i++){
            let arr=[];
            for(let j=0;j<10;j++){
                let cell=new Cell(i,j);
                arr.push(cell);
            }
            this._board.push(arr);
        }

        this._ships=[];
    }

    addShip(addedShip){
        this._ships.push(addedShip);
    }

    areAllShipsSunk(){
        for(let i=0;i<this._ships.length;i++){
            if(!this._ships[i].isSunk())
                return false;
        }
        return true;
    }

    receiveAttack(i,j){
        this._board[i][j].hit=true;

        let anyShipHit=false;
        for(let k=0;k<this._ships.length;k++){
            anyShipHit=anyShipHit||this._ships[k].hit(i,j);
        }
        return anyShipHit;
    }

    get board(){
        return this._board;
    }
    
    set board(value){
        this._board=value;
    }

    get ships(){
        return this._ships;
    }

    set ships(value){
        this._ships=value;
    }
}