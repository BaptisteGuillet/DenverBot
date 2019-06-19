const Command = require("../../base/Command.js"),
Discord = require("discord.js"),
util = require("util");

class Eval extends Command {
    constructor (client) {
        super(client, {
            name: "eval",
            description: (language) => language.get("AUTONICK_DESCRIPTION"),
            usage: (language, prefix) => language.get("AUTONICK_USAGE", prefix),
            examples: (language, prefix) => language.get("AUTONICK_EXAMPLES", prefix),
            dirname: __dirname,
            enabled: true,
            guildOnly: true,
            permLevel: "Bot Admin",
            botPermissions: [
                "EMBED_LINKS"
            ],
            nsfw: false,
            adminOnly: true,
            cooldown: 1000
        });
    }

    async run (message, args) {
    
         
        let code = args.join(" ");
        
            try {

                let ev = eval(code)        
                let str = util.inspect(ev, {
                depth: 1
                })
                         
                    str = `${str.replace(new RegExp(`${this.client.token}|${process.env.TOKEN}`, "g"), "nop?")}`;
                        
                        if(str.length > 1800) {
                            str = str.substr(0, 1800)
                            str = str + "..."
                        }

                        message.react("✅");     
            
                        let embedEvalgood =  new Discord.MessageEmbed()
                        .setColor("01FE3C")
                        .addField("Eval :" , "\`\`\`' + str + '\`\`\`")       
                        message.channel.send(embedEvalgood)

                } catch (err) {
                    
                    message.react("❌");
        
                    let embedEvalno =  new Discord.MessageEmbed()
                    .setColor("FE0101")
                    .addField("Error :" , "\`\`\`' + err + '\`\`\`")
                    message.channel.send(embedEvalno)
    
                      
                }


    }
}

module.exports = Eval;