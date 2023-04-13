import { GameController } from "./models/GameController";
import { View } from "./View/View";

View.initialize();
View.chooseShipLocations(GameController.placeShips,GameController.finishedPlacingShips);


export function getAttack(){
    return GameController.attack;
}

export function getfinishedPlacingShips(){
    return GameController.finishedPlacingShips;
}

