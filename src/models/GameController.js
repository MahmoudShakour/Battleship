import { GameBoard } from "./GameBoard";
import { Player } from "./Player";
import { Ship } from "./Ship";
import { Cell } from "./Cell";

export class GameController{
    
    getNames(){
        let name1="mahmoud";
        this._playerOne=new Player(name1,new GameBoard());

        let name2="computer";
        this._playerTwo=new Player(name2,new GameBoard());
    }

    placeShips(player){
        let length=[2,3,4,4,5];

        for(let k=0;k<5;k++){
            // let i=prompt(k+"th get i");
            // let j=prompt(k+"th get j");
            let ship=new Ship(new Cell(k,k),length[k],true);
            player.board.addShip(ship);
        }
    }

    play(){
        while(true){
            let isDead=this.attack(this._playerTwo);
            if(isDead){
                return this._playerOne.name;
            }
            
            isDead=this.attack(this._playerOne);
            if(isDead){   
                return this._playerTwo.name;
            }
        }
    }

    attack(attackedPlayer){
        let i=prompt("get i");
        let j=prompt("get j");
        i=Number(i);
        j=Number(j);
        let isHit=attackedPlayer.board.receiveAttack(i,j);
        console.log(attackedPlayer+"is hit "+ isHit);
        if(attackedPlayer.board.areAllShipsSunk())
            return true;
        else
            return false;
    }


    startGame(){
        this.getNames();
        this.placeShips(this._playerOne);
        this.placeShips(this._playerTwo);
        
        let winner=this.play();
        console.log(winner);
    }
}