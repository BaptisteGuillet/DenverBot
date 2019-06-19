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
                        
                        if(str.length > 1900) {
                            str = str.substr(0, 1900)
                            str = str + "..."
                        }

                        message.react("✅");            
                        message.channel.send(`\`\`\`${str}\`\`\``)

                } catch (err) {
                    
                    message.react("❌");
                    message.channel.send(`\`\`\`${err}\`\`\``)
        
                }


    }
}

module.exports = Eval;