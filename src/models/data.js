class Data{
    constructor(){
        this.type = "";
        this.object = {};
    }

    static from(json){
        return Object.assign(new Data(), json);
    }
}


module.exports = { Data }