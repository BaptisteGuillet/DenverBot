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

                let user;
        if (args.length === 0) {
            user = message.author;
        } else {
            user = message.mentions.users.first()
            if (!user) {
            var membres = message.guild.members.array();
            var found = false;
            for (var i in membres) {
                if (args[0] === membres[i]["user"]["id"] || args[0] === membres[i]["user"]["username"]) { 
                user = membres[i]["user"];
                }
            }
            }
            if (!user) {
            message.channel.send("Utilisateur inconnu");
            return;
            }
        }
        
            message.channel.send({
                embed: {
                    "author": {
                        "name": `${message.language.get("AVATAR_TITLE")} **${user.username}** :`,
                    },
                    "footer":{
                        "text": message.config.embed.footer
                    },
                    "color": message.config.embed.color,
                    "timestamp": Date.now(),
                    "image":{
                        "url": user.avatarURL()
                    },
                },
            });


    }
}

module.exports = Avatar;