const Discord = require("discord.js");

module.exports = {

    /**
     * Send an error of permissions
     * @param {string} level The level of the user
     * @param {string} requiredLevel The permissions required
     * @param {object} message The discord message
     */
    perm(level, requiredLevel, message){
        let embed = new Discord.MessageEmbed()
            .setAuthor(message.language.get("ERROR_PERMISSIONS_TITLE"))
            .setDescription(message.language.get("ERROR_PERMISSIONS_CONTENT", level, requiredLevel))
            .setColor("#FF0000")
            .setFooter(message.config.embed.footer);
        message.channel.send(embed);
    },

    /**
     * Send an error if the channel is not NSFW
     * @param {object} message The discord message
     */
    nsfw(message){
        let embed = new Discord.MessageEmbed()
            .setAuthor(message.language.get("ERROR_PERMISSIONS_TITLE"))
            .setDescription(message.language.get("ERROR_PERMISSIONS_CONTENT", level, requiredLevel))
            .setColor("#FF0000")
            .setFooter(message.config.embed.footer);
        message.channel.send(embed);
    }
};