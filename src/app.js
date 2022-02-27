const { WebSocketServer } = require("ws");
const { newPlayer, actionPlayer } = require("./actions/players");
const { Data } = require("./models/data");
const { Player } = require("./models/players");

const wss = new WebSocketServer({ port: 8080 })
console.log("\x1b[31m%s\x1b[0m", "Server started")


wss.broadcast = function broadcast(data, sender) {
    wss.clients.forEach(function each(client) {
        if (client !== sender) {
            client.send(data);
        }
    });
};

wss.on("connection", ws => {
    ws.on("message", message => {
        var parseMessage = "";

        /** @type {Data} */
        var data = {};
        try {
            parseMessage = JSON.parse(message);
            data = Data.from(parseMessage);
        } catch (e) {
            console.log("\x1b[31m%s\x1b[0m", "Error parsing message")
            return;
        }

        switch (data.type) {
            case "newPlayer":
                newPlayer(ws,data,wss);
                break;
            case "actionPlayer":
                actionPlayer(ws,data,wss);
                break;
        }
        
    })
})

module.exports = { }
