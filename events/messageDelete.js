const Discord = require("discord.js");

module.exports = class {

    constructor (client) {
        this.client = client;
    }

    async run (message) {

            const logs = this.client.models.Guild
            logs.find({ id : message.guild.id }, function (err, req) {
            if (err) { throw err; }
                
                if(req[0].logs){
                    
                    let embed = new Discord.MessageEmbed()
                    .setAuthor(message.author.username, message.author.avatarURL())
                    .setDescription(`${message.language.get('MESSADEDELETE_DESC')}`)
                    .setColor(message.config.embed.color)
                    .addField(`${message.language.get('MESSADEDELETE_FIELD')[0]}`, `${message.channel} (${message.channel.id})`)
                    .addField(`${message.language.get('MESSADEDELETE_FIELD')[1]}`, message.content)
                    .addField(`${message.language.get('MESSADEDELETE_FIELD')[2]}`, `\`\`\`css\n${message.language.get('MESSADEDELETE_FIELD')[3]} = ${message.author.id}\n${message.language.get('MESSADEDELETE_FIELD')[4]} = ${message.id}\`\`\``)
                    .setFooter(message.config.embed.footer)
                    .setTimestamp()
                    message.guild.channels.get(req[0].logs).send(embed);
                }
                
              });

    
}
}