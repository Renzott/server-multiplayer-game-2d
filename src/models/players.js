class Player{
    constructor(name, id, x, y){
        this.name = name;
        this.id = id;
        this.x = x;
        this.y = y;
    }

    static from(json){
        return Object.assign(new Player(), json);
    }
}

module.exports = { Player }