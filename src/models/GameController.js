import { GameBoard } from "./GameBoard";
import { Player } from "./Player";
import { Ship } from "./Ship";
import { Cell } from "./Cell";

export class GameController{
    static shipLength=[2,3,4,4,5];
    static PlayerOneNextShip=0;
    static PlayerTwoNextShip=0;
    static playerToBeAttacked=1;
    static _playerOne=new Player("mahmoud",new GameBoard());        
    static _playerTwo=new Player("computer",new GameBoard());
    static finishPlacingShips=false;
    
    static attack(i,j,playerNumber){
        let isHit=false,areAllSunk=false,player;

        if(GameController.playerToBeAttacked!==playerNumber){
            return {isHit:isHit,areAllSunk:areAllSunk,legal:false};
        }

        if(playerNumber===1)
            player=GameController._playerTwo;
        else
            player=GameController._playerOne;
    
        isHit=player.board.receiveAttack(i,j);
        areAllSunk=player.board.areAllShipsSunk();
        GameController.playerToBeAttacked=1-GameController.playerToBeAttacked;

        return {isHit:isHit,areAllSunk:areAllSunk,legal:true};
    }

    static finishedPlacingShips(){
        return GameBoard.finishPlacingShips;
    }

    static placeShips(i,j,playerNumber){
        console.log("hi");
        if(playerNumber===0){
            if(GameController.PlayerOneNextShip===5) return {placeShips:false,full:true};

            let canPlaceShip=GameController._playerOne.board.canPlaceShip(i,j,GameController.shipLength[GameController.PlayerOneNextShip]);
            if(canPlaceShip){
                GameController._playerOne.board.addShip(new Ship(new Cell(i,j),GameController.shipLength[GameController.PlayerOneNextShip],true));
                GameController.PlayerOneNextShip++;
                if(GameController.PlayerTwoNextShip===5&&GameController.PlayerOneNextShip===5) GameBoard.finishPlacingShips=true;
                return {placeShips:true,full:false};
            }
            else{
                return {placeShips:false,full:false};
            }
        }
        else if(playerNumber===1){
            if(GameController.PlayerTwoNextShip===5) return {placeShips:false,full:true};

            let canPlaceShip=GameController._playerTwo.board.canPlaceShip(i,j,GameController.shipLength[GameController.PlayerTwoNextShip]);
            if(canPlaceShip){
                GameController._playerTwo.board.addShip(new Ship(new Cell(i,j),GameController.shipLength[GameController.PlayerTwoNextShip],true));
                GameController.PlayerTwoNextShip++;
                if(GameController.PlayerTwoNextShip===5&&GameController.PlayerTwoNextShip===5) GameBoard.finishPlacingShips=true;
                return {placeShips:true,full:false};
            }
            else{
                return {placeShips:false,full:false};
            }
        }
    }
}