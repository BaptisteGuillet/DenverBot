const Command = require("../../base/Command.js"),
Discord = require("discord.js");

class Invite extends Command {
    constructor (client) {
        super(client, {
            name: "invite",
            description: (language) => language.get("INVITE_DESCRIPTION"),
            usage: (language, prefix) => language.get("INVITE_USAGE", prefix),
            examples: (language, prefix) => language.get("INVITE_EXAMPLES", prefix),
            dirname: __dirname,
            enabled: true,
            guildOnly: false,
            aliases: [
                "invit"
            ],
            permLevel: "User",
            botPermissions: [],
            nsfw: false,
            adminOnly: false,
            cooldown: 1000
        });
    }

    async run (message, args) {
        var info = new Discord.MessageEmbed()
        .setColor(message.config.embed.color)
        .addField("Invitation", `${message.language.get("INVITE")}`)
        message.channel.send(info)
    }
}

module.exports = Invite;