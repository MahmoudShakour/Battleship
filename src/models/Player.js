
export class Player{

    constructor(name,board){
        this._name=name;
        this._board=board;
    }

    get name(){
        return this._name;
    }

    set name(value){
        this._name=value;
    }

    get board(){
        return this._board;
    }

    set board(value){
        this._board=value;
    }
}