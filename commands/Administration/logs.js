const Command = require("../../base/Command.js"),
Discord = require("discord.js");

class Logs extends Command {
    constructor (client) {
        super(client, {
            name: "logs",
            description: (language) => language.get("BACKUP_DESCRIPTION"),
            usage: (language, prefix) => language.get("BACKUP_USAGE", prefix),
            examples: (language, prefix) => language.get("BACKUP_EXAMPLES", prefix),
            dirname: __dirname,
            enabled: true,
            guildOnly: true,
            permLevel: "Server Admin",
            botPermissions: [
                "EMBED_LINKS"
            ],
            nsfw: false,
            adminOnly: true,
            cooldown: 1000
        });
    }

    async run (message, args) {
    
    
        if(args[0] === "on"){
            
            if(!args[1]){
                return message.channel.send(message.language.get('LOGSCMD_NOCHANNEL'));
            }else{
                let channel = message.guild.channels.get(args[1]);
                    
                if(!channel){
                    let tempChannel = args[1];
                    tempChannel = tempChannel.slice(2, -1);
                    let channel = message.guild.channels.get(tempChannel);
                    
                
                    if(!channel){
                        return message.channel.send(message.language.get('LOGSCMD_INVALIDCHANNEL'));
                    }
            

                        const logsDB = this.client.models.Guild;
                        logsDB.updateOne({ id : message.guild.id}, { logs : channel }, function (err){
                            if(err){throw err;}
                            message.channel.send(`${message.language.get('LOGSCMD_CHANNELSUCCES', channel)}`);
                        });
                }
            }
        }else if(args[0] === "off"){
            
            const logsDB = this.client.models.Guild;
            logsDB.updateOne({ id : message.guild.id}, { logs : null }, function (err){
                if(err){throw err;}
                message.channel.send(`${message.language.get('LOGSCMD_LOGSOFF')}`);
            });
        
        }   
      
    }
}

module.exports = Logs;