export class Cell{

    constructor(i,j){
        this._i=i;
        this._j=j;
        this._hit=false;
    }

    hit(){
        this._hit=true;
    }

    isHit(){
        return this._hit;
    }

    get i(){
        return this._i;
    }

    set i(value){
        this._i=value;
    }

    get j(){
        return this._j;
    }

    set j(value){
        this._j=value;
    }

    static areEqual(cellOne,cellTwo){
        return (cellOne.i===cellTwo.i)&&(cellOne.j===cellTwo.j);
    }
}