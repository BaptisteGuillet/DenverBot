const Command = require("../../base/Command.js"),
Discord = require("discord.js");

class Userinfo extends Command {
    constructor (client) {
        super(client, {
            name: "userinfo",
            description: (language) => language.get("USERINFO_DESCRIPTION"),
            usage: (language, prefix) => language.get("USERINFO_USAGE", prefix),
            examples: (language, prefix) => language.get("USERINFO_EXAMPLES", prefix),
            dirname: __dirname,
            enabled: true,
            guildOnly: true,
            permLevel: "User",
            aliases: [
                "profil",
                "profile",
                "profils",
                "userinfos"
            ],
            botPermissions: [
                "EMBED_LINKS"
            ],
            nsfw: false,
            adminOnly: false,
            cooldown: 1000
        });
    }

    async run (message, args) {

        let user = await message.tclient.functions.fetchUser(message, args) || message.author;
        

        var statut = user.presence.status
        statut = statut.replace('online', '<:online:541159008837304340> En ligne')
        statut = statut.replace('offline', '<:offline:541159007168102410> Hors-ligne')
        statut = statut.replace('idle', '<:away:541159006627168277> Absent')
        statut = statut.replace('dnd', '<:dnd:541159006941741056> Ne pas déranger')
        statut = statut.replace('streaming', '<:streaming:541159898008911873> En stream')
      
        try {
          var Play = user.presence.activity.name
        } catch {
          var Play = "Aucun jeu."
        }
console.log(user.presence)

            let embed = new Discord.MessageEmbed()
            embed.setAuthor("Profil", this.client.user.avatarURL())
            embed.setThumbnail(user.avatarURL())
           if(user.presence.clientStatus === "null"){ embed.addField(message.language.get('USERINFO_TITLES')[0], `${user.username}#${user.discriminator}`, true)
            
        }else if(user.presence.clientStatus.desktop){embed.addField(message.language.get('USERINFO_TITLES')[0], `${user.username}#${user.discriminator}`, true)
        }else if(user.presence.clientStatus.mobile){embed.addField(message.language.get('USERINFO_TITLES')[0], `${user.username}#${user.discriminator} <:phone:587242842510983188>`)}

            embed.addField(message.language.get('USERINFO_TITLES')[1], `${Play}`, true)
            embed.addField(message.language.get('USERINFO_TITLES')[2], `${user.id}`, true)
            embed.addField(message.language.get('USERINFO_TITLES')[3], `${statut}`, true)
       //    .addField(message.language.get('USERINFO_TITLES')[4], roles.length ? roles.length : "Aucun rôle", true)
            embed.setColor(message.config.embed.color)
            message.channel.send(embed)

    }
}

module.exports = Userinfo;