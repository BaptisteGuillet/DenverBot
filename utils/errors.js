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
            .setAuthor(message.language.get("ERROR_NSFW_TITLE"))
            .setDescription(message.language.get("ERROR_NSFW_CONTENT"))
            .setColor("#FF0000")
            .setFooter(message.config.embed.footer);
        message.channel.send(embed);
    },

    /**
     * Send an error message if the command is disabled
     * @param {object} message The discord message
     */
    disabled(message){
        let embed = new Discord.MessageEmbed()
            .setAuthor(message.language.get("ERROR_DISABLED_TITLE"))
            .setDescription(message.language.get("ERROR_DISABLED_CONTENT"))
            .setColor("#FF0000")
            .setFooter(message.config.embed.footer);
        message.channel.send(embed);
    },

    /**
     * Send an error message if the member doesn't have the permission to mention everyone
     * @param {object} message The discord message
     */
    everyone(message){
        let embed = new Discord.MessageEmbed()
            .setAuthor(message.language.get("ERROR_EVERYONE_TITLE"))
            .setDescription(message.language.get("ERROR_EVERYONE_CONTENT"))
            .setColor("#FF0000")
            .setFooter(message.config.embed.footer);
        message.channel.send(embed);
    }
};