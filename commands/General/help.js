const Command = require("../../base/Command.js"),
Discord = require("discord.js");

class Help extends Command {
    constructor (client) {
        super(client, {
            name: "help",
            description: (language) => language.get("HELP_DESCRIPTION"),
            usage: (language, prefix) => language.get("HELP_USAGE", prefix),
            examples: (language, prefix) => language.get("HELP_EXAMPLES", prefix),
            dirname: __dirname,
            enabled: true,
            guildOnly: false,
            aliases: [
                "aide",
                "h"
            ],
            permLevel: "User",
            botPermissions: [
                "EMBED_LINKS"
            ],
            nsfw: false,
            adminOnly: false,
            cooldown: 5000
        });
    }

    async run (message, args) {
        
        if(args[0]){
            let command = message.tclient.commands.get(args[0]) || message.tclient.commands.get(message.tclient.aliases.get(args[0]));
            if(command){
                let commandEmbed = new Discord.MessageEmbed()
                    .setAuthor(message.language.get("HELP_TITLE", command.help.name))
                    .addField(message.language.get("HELP_FIELDS")[0],
                        command.help.description(message.language)
                    )
                    .addField(message.language.get("HELP_FIELDS")[1],
                        command.help.usage(message.language, message.settings.prefix)
                    )
                    .addField(message.language.get("HELP_FIELDS")[2],
                        command.help.examples(message.language, message.settings.prefix)
                    )
                    .addField(message.language.get("HELP_FIELDS")[3],
                        `${message.config.permLevels.find((p) => p.name === command.conf.permLevel).level} (${command.conf.permLevel})`
                    )
                    .setColor(message.config.embed.color)
                    .setFooter(message.config.embed.footer);
                message.channel.send(commandEmbed);
            } else {
                return message.channel.send(message.language.get("HELP_NOT_FOUND", args[0]));
            }
        } else {
            let categories = [];
            message.tclient.commands.forEach((command) => {
                if(!categories.includes(command.help.category)){
                    categories.push(command.help.category);
                }
            });

            let embeds = [];
            categories.forEach((category) => {
                let commands = message.tclient.commands.filter((cmd) => cmd.help.category === category);
                let embed = new Discord.MessageEmbed()
                    .setAuthor(message.language.get("HELP_TITLE1", category))
                    .setDescription(commands.sort().map((cmd) => `\`${cmd.help.name}\``).join(", "))
                    .setColor(message.config.embed.color)
                    .setFooter(message.config.embed.footer);
                embeds.push(embed);
            });

            let i = 0;
            const tdata = await message.channel.send(embeds[parseInt(i, 10)]);
            
            if(embeds[i-1]){
                tdata.react("⬅");
            }
            if(embeds[i+1]){
                tdata.react("➡");
            }
            await tdata.react("❌");

            const reactCollector = tdata.createReactionCollector((reaction, user) => user.id === message.author.id);

            setTimeout(function(){
                reactCollector.stop();
            }, 60000);

            reactCollector.on("collect", async(reaction, user) => {

                // Remove the reaction when the user react to the message
                await reaction.users.remove(message.author.id);

                switch(reaction._emoji.name){
                    case "⬅" :
                        i--;
                        tdata.edit(embeds[parseInt(i, 10)]);
                    case "➡" :
                        i++;
                        tdata.edit(embeds[parseInt(i, 10)]);
                    case "❌" :
                        reactCollector.stop();
                        break;
                }
                
                if(!embeds[i-1]){
                    let r = tdata.reactions.find((r) => r._emoji.name === "⬅");
                    if(r){
                        r.users.remove(message.client.user);
                    }
                } else {
                    tdata.react("⬅");
                }
                if(!embeds[i+1]){
                    let r = tdata.reactions.find((r) => r._emoji.name === "➡");
                    if(r){
                        r.users.remove(message.client.user);
                    }
                } else {
                    tdata.react("➡");
                }

            });

            reactCollector.on("end", () => {
                tdata.delete();
            });
        }
    }
}

module.exports = Help;