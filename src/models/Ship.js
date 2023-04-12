import { Cell } from "./Cell";

export class Ship{
    _locations=[];
    constructor(start,length,isHorizontal){
        for(let k=start.j;k<start.j+length;k++){
            this._locations.push(new Cell(start.i,k));
        }
        this._length=length;
        this._numberOfHits=0;
    }

    hit(i,j){
        let cell=new Cell(i,j);
        
        for(let k=0;k<this.length;k++){
            if(!this._locations[k].isHit()&&Cell.areEqual(this._locations[k],cell)){
                this._numberOfHits++;
                this._locations[k].hit();
                return true;
            }
        }
        return false;
    }

    isSunk(){
        return this._length===this._numberOfHits;
    }

    get locations(){
        return this._locations;
    }

    set locations(value){
        this._locations=value;
    }

    get length(){
        return this._length;
    }

    set length(value){
        this._length=value;
    }

}