const e = require("../config.js").emotes;

module.exports = class {
    constructor(...args) {
		this.language = {

			PREFIX_INFO: (prefix) => `${prefix.length > 0 ? `${e.info} | Mon préfixe sur ce serveur est ${prefix} !` : `${e.info} | Aucun préfixe. Tapez simplement la commande sans préfixe !`}`,			
			NO_DESCRIPTION_PROVIDED: "Aucune description définie",
			NO_USAGE_PROVIDED: "Aucun usage défini",
			NO_EXAMPLES_PROVIDED: "Aucun exemple défini",

			ERROR_PERMISSIONS_TITLE: `${e.error} Permissions insuffisantes`,
			ERROR_PERMISSIONS_CONTENT: (lvl, rlvl) => `Cette commande nécessite le niveau de permission \`${rlvl}\` et vous n'avez que le niveau \`${lvl}\` !`,			
			ERROR_COMMAND_GUILDONLY: `${e.error} | Cette commande est indisponible en messages privés !`,

			PING_DESCRIPTION: "Répond juste pong",
			PING_USAGE: (prefix) => `${prefix}ping`,
			PING_EXAMPLES: (prefix) => `${prefix}ping`,
			PING_PONG: "Pong !",	
					
			INVITE_DESCRIPTION: "Donne l'invitation pour add le bot sur un serveur",
			INVITE_USAGE: (prefix) => `${prefix}invite`,
			INVITE_EXAMPLES: (prefix) => `${prefix}invite`,
			INVITE: "[Clique-ici](https://discordapp.com/oauth2/authorize?client_id=390231727554953216&scope=bot&permissions=66321471) pour inviter le bot sur ton serveur discord."

			



        };
    }
    /**
	 * The method to get language strings
	 * @param {string} term The string or function to look up
	 * @param {...*} args Any arguments to pass to the lookup
	 * @returns {string|Function}
	 */
	get(term, ...args) {
		const value = this.language[term];
		switch (typeof value) {
			case "function": return value(...args);
			default: return value;
		}
	}
};