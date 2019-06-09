const Command = require("../../base/Command.js"),
Discord = require("discord.js");

class Avatar extends Command {
    constructor (client) {
        super(client, {
            name: "avatar",
            description: (language) => language.get("AVATAR_DESCRIPTION"),
            usage: (language, prefix) => language.get("AVATAR_USAGE", prefix),
            examples: (language, prefix) => language.get("AVATAR_EXAMPLES", prefix),
            dirname: __dirname,
            enabled: true,
            guildOnly: false,
            permLevel: "User",
            botPermissions: [],
            nsfw: false,
            adminOnly: false,
            cooldown: 1000
        });
    }

    async run (message, args) {

        let user = await message.tclient.functions.fetchUser(message, args) || message.author;
        
        let embed = new Discord.MessageEmbed()
            .setAuthor(`${message.language.get("AVATAR_TITLE")} ${user.username}:`)
            .setFooter(message.config.embed.footer)
            .setTimestamp()
            .setColor(message.config.embed.color)
            .setImage(user.avatarURL());
        message.channel.send(embed);

    }
}

module.exports = Avatar;