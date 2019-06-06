const Command = require("../../base/Command.js"),
Discord = require("discord.js");

class Ping extends Command {
    constructor (client) {
        super(client, {
            name: "ping",
            description: (language) => language.get("PING_DESCRIPTION"),
            usage: (language) => language.get("PING_USAGE"),
            examples: (language) => language.get("PING_EXAMPLES"),
            dirname: __dirname,
            enabled: true,
            guildOnly: false,
            aliases: [
                "pong"
            ],
            memberPermissions: [],
            botPermissions: [],
            nsfw: false,
            adminOnly: false,
            cooldown: 1000
        });
    }

    async run (message, args, data) {
        message.channel.send(message.language.get("PING_PONG"));
    }
}

module.exports = Ping;