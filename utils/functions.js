const mongoose = require("mongoose");

module.exports = {

    /**
     * Gets channel settings
     * @param {object} client The discord client
     * @param {object} channel The channel object
     * @returns The channel data
     */
    async getSettings(client, channel){
        return new Promise(async function(resolve, reject){
            if(channel.guild){
                client.models.Guild.find({id: channel.guild.id}, function (err, result) {
                    if(result[0]){
                        resolve(result[0]);
                    } else {
                        let guild = new client.models.Guild({
                            id: message.guild.id
                        });
                        guild.save();
                        resolve(guild);
                    }
                });
            } else {
                resolve({
                    prefix: "",
                    language: client.config.defaultLanguage
                });
            }
        });
    },

    /**
     * Gets message prefix
     * @param {object} message The Discord message
     * @returns The prefix
     */
    getPrefix(message){
        if(message.channel.type !== "dm"){
            const prefixes = [
                `<@${message.client.user.id}>`,
                "Denver",
                message.settings.prefix
            ];
            let prefix = null;
            prefixes.forEach((p) => {
                if(message.content.startsWith(p)){
                    prefix = p;
                }
            });
            return prefix;
        } else {
            return true;
        }
    }
};