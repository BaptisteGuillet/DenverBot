const Discord = require("discord.js");

module.exports = class {

    constructor (client) {
        this.client = client;
    }

    async run (message) {

        let client = this.client;

        let settings = await client.functions.getSettings(client, message.channel);
        
    }

};