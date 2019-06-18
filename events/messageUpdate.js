const Discord = require("discord.js");

module.exports = class {

    constructor (client) {
        this.client = client;
    }

    async run (message, newMessage) {

            const logs = this.client.models.Guild
            logs.find({ id : message.guild.id }, function (err, req) {
            if (err) { throw err; }
                
                if(req[0].logs){
                    
                    let embed = new Discord.MessageEmbed()
                    .setAuthor(message.author.username, message.author.avatarURL())
                    .setColor(message.config.embed.color)
                    .setDescription(`${message.language.get('MESSAGEUPDATE_DESC')}`)
                    .addField(`${message.language.get('MESSAGEUPDATE_FIELD')[0]}`, `${message.channel} (${message.channel.id})\n[${message.language.get('MESSAGEUPDATE_FIELD')[1]}](https://discordapp.com/channels/${message.guild.id}/${message.channel.id}/${message.id})`)
                    .addField(`${message.language.get('MESSAGEUPDATE_FIELD')[2]}`, message.content)
                    .addField(`${message.language.get('MESSAGEUPDATE_FIELD')[3]}`, newMessage.content)
                    .addField(`${message.language.get('MESSAGEUPDATE_FIELD')[4]}`, `\`\`\`css\n${message.language.get('MESSAGEUPDATE_FIELD')[5]} = ${message.author.id}\n${message.language.get('MESSAGEUPDATE_FIELD')[6]} = ${message.id}\`\`\``)
                    .setFooter(message.config.embed.footer)
                    .setTimestamp()
                    message.guild.channels.get(req[0].logs).send(embed);
                }
                
              });

    
}
}