const { } = require("../app");
const { Data } = require("../models/data")

const allPlayers = {}


/**  @param {WebSocket} ws */
/**  @param {Data} data */
function newPlayer(ws,data,wss) {
    wss.broadcast(JSON.stringify(data),ws);
}

function actionPlayer(ws,data,wss) {
    var actualData = Data.from(data);

    allPlayers[actualData.object.id] = actualData.object;

    var sendData = new Data();
    sendData.type = "actionPlayer";
    sendData.object = allPlayers;

    wss.broadcast(JSON.stringify(sendData),ws);
}

module.exports = {
    newPlayer,
    actionPlayer
}