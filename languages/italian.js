const e = require("../config.js").emotes;

module.exports = class {
    constructor(...args) {
		this.language = {

			PREFIX_INFO: (prefix) => `${prefix.length > 0 ? `${e.info} | Mio prefisso su questa gilda è ${prefix} !` : `${e.info} | Nessun prefisso. Digita il comando senza prefisso !`}`,

			NO_DESCRIPTION_PROVIDED: "Non è definita alcuna descrizione",
			NO_USAGE_PROVIDED: "Non è definita alcuna indicazione d'uso",
			NO_EXAMPLES_PROVIDED: "Non è definito alcun esempio",

			ERROR_PERMISSIONS_TITLE: `${e.error} Permessi insufficienti`,
			ERROR_PERMISSIONS_CONTENT: (lvl, rlvl) => `Questo comando richiede il livello di permesso \`${rlvl}\` e hai solo il livello di permesso \`${lvl}\` !`,

			ERROR_COMMAND_GUILDONLY: `${e.error} | Questo comando non è disponibile nei messaggi diretti !`,

			PING_DESCRIPTION: "Risponderà solo \"pong\"",
			PING_USAGE: (prefix) => `${prefix}ping`,
			PING_EXAMPLES: (prefix) => `${prefix}ping`,
			PING_PONG: "Pong !"

        }
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
