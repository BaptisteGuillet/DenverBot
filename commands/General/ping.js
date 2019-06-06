const Command = require("../../base/Command.js"),
Discord = require('discord.js');

class Help extends Command {
    constructor (client) {
        super(client, {
            name: "help",
            description: "Affiche la liste des commandes !",
            dirname: __dirname,
            usage: "help",
            enabled: true,
            aliases: ["aide"],
            permission: false,
            botpermissions: [ "SEND_MESSAGES", "EMBED_LINKS" ],
            examples: "$help",
            owner: false,
            cooldown: 2000
        });
    }

    async run (message, args, data) {
        message.channel.send(message.language.get("PING_PONG"));
    }

}

module.exports = Help;