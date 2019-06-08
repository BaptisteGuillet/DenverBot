const e = require("../config.js").emotes;

module.exports = class {
    constructor(...args) {
		this.language = {

			PREFIX_INFO: (prefix) => `${prefix.length > 0 ? `${e.info} | Mi prefijo en este servidor es ${prefix} !` : `${e.info} | Sin prefijos. Simplemente escriba el comando sin prefijo !`}`,			
			NO_DESCRIPTION_PROVIDED: "No se ha definido ninguna descripción",
			NO_USAGE_PROVIDED: "Sin uso definido",
			NO_EXAMPLES_PROVIDED: "No hay un ejemplo definido",

			ERROR_PERMISSIONS_TITLE: `${e.error} Permisos insuficientes`,
			ERROR_PERMISSIONS_CONTENT: (lvl, rlvl) => `Este comando requiere el nivel de permiso \`${rlvl}\` y sólo tienes el nivel \`${lvl}\` !`,			
			ERROR_COMMAND_GUILDONLY: `${e.error} | Este comando no está disponible en los mensajes privados !`,

			PING_DESCRIPTION: "Sólo responde pong",
			PING_USAGE: (prefix) => `${prefix}ping`,
			PING_EXAMPLES: (prefix) => `${prefix}ping`,
			PING_PONG: "Pong !",	

			INVITE_DESCRIPTION: "Da la invitación para añadir el bot en un servidor",
			INVITE_USAGE: (prefix) => `${prefix}invite`,
			INVITE_EXAMPLES: (prefix) => `${prefix}invite`,
			INVITE_FIELD: "Invitación",
			INVITE: "[Haga clic aquí](https://discordapp.com/oauth2/authorize?client_id=390231727554953216&scope=bot&permissions=66321471) para invitar al bot a su servidor de Discord."
			
			



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