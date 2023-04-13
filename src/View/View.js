import "./styles.css";

import { getAttack,getfinishedPlacingShips } from "..";

export class View{

    static initialize(){
        this._root=this._getElement(".root");
        this._header=this._createElement("div","header");
        this._message=this._createElement("div","message");
        this._container=this._createElement("div","container");
        this._playerOneGrid=this._createElement("div","player-one-grid");
        this._playerTwoGrid=this._createElement("div","player-two-grid");    
        this._footer=this._createElement("div","footer");

        this._container.appendChild(this._playerOneGrid);
        this._container.appendChild(this._playerTwoGrid);

        this._root.appendChild(this._header);
        this._root.appendChild(this._message);
        this._root.appendChild(this._container);
        this._root.appendChild(this._footer);

        this._header.textContent="BattleShip";
        this._footer.textContent="Copyright © 2023 MahmoudShakour";
        this._message.textContent="choose ships places!";
        
        this._playerOneGrid.appendChild(this._createGrid());
        this._playerTwoGrid.appendChild(this._createGrid());   

    }

    static _createElement(type,name){
        const element=document.createElement(type);
        element.className=name;
        return element;
    }

    static _getElement(selector){
        return document.querySelector(selector);
    }

    static _createGrid(){
        let container=this._createElement("div","grid");
        for(let i=0;i<10;i++){
            let row=this._createRow(i);
            container.appendChild(row);
        }
        return container;
    }

    static _createRow(rowNumber){
        let container=this._createElement("div","row");
        for(let i=0;i<10;i++){
            let cell=this._createElement("div","cell");
            cell.id=rowNumber*10+i;
            container.appendChild(cell);
        }
        return container;
    }

    static activateAttacking(attack,finishedPlacingShips){
        const cells=document.querySelectorAll(".cell");
        
        cells.forEach((cell)=>{
            cell.addEventListener("click",()=>{
                if(!finishedPlacingShips()){
                    console.log("right");
                    return ;
                }
                else if(cell.parentElement.parentElement.parentElement.className==="player-two-grid"&&cell.textContent===""){
                    View._changeCellState(attack,cell,1);
                }
                else if(cell.parentElement.parentElement.parentElement.className==="player-one-grid"&&cell.textContent===""){
                    View._changeCellState(attack,cell,0);
                }
            });
        });
    }

    static _changeCellState(attack,cell,player){
        let id=Number(cell.id);
        let response=attack(Math.floor(id/10),(id%10),player);

        if(!response.legal){
            this._message.textContent="this is not a legal move!";
        }
        else if(response.areAllSunk){
            this._message.textContent="Game is over.";
            cell.textContent="1";
            cell.style.backgroundColor="red";
        }
        else if(response.isHit){
            this._message.textContent="it is a hit!";
            cell.textContent="1";
            cell.style.backgroundColor="red";
        }
        else{
            this._message.textContent="it is a miss!";
            cell.textContent="0";
            cell.style.backgroundColor="blue";
        }
    }

    static chooseShipLocations(placeShip,finishedPlacingShips){
        const cells=document.querySelectorAll(".cell");


        cells.forEach((cell)=>{
            let id=Number(cell.id);
            cell.addEventListener("click",()=>{
                if(finishedPlacingShips()){
                    return ;
                }
                let playerNumber;

                if(cell.parentElement.parentElement.parentElement.className==="player-two-grid")
                    playerNumber=1;   
                else if(cell.parentElement.parentElement.parentElement.className==="player-one-grid")
                    playerNumber=0;

                let response=placeShip(Math.floor(id/10),id%10,playerNumber);
                console.log(response);
                if(response.full){
                    this._message.textContent="you placed all the ships";
                }
                else if(response.placeShips){
                    this._message.textContent="ship is placed well";
                }
                else{
                    this._message.textContent="choosen place is not legal";
                }

                if(finishedPlacingShips()){
                    View.activateAttacking(getAttack(),getfinishedPlacingShips());
                    this._activated=true;
                    this._message.textContent="Begin shooting";
                }
            });
        });
    }
}