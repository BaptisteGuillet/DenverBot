const e = require("../config.js").emotes;



module.exports = class {

    constructor(....args) {

		this.language = {



		PREFIX_INFO: (Präfix) => `${prefix.length > 0 ? `${e.info} | Mein Präfix auf diesem Server ist \`${prefix}\` !` ` : `${e.info} | Kein Präfix. Geben Sie einfach den Befehl ohne Präfix !`}}` ein,		

		NO_DESCRIPTION_PROVIDED: "Keine Beschreibung definiert",

		NO_USAGE_PROVIDED: "Keine definierte Verwendung",

		NO_EXAMPLES_PROVIDED "Kein Beispiel definiert",	



		ERROR_PERMISSIONS_TITLE: `${e.error} Unzureichende Berechtigungen",

		ERROR_PERMISSIONS_CONTENT: (lvl, rlvl) => `Dieser Befehl erfordert die Berechtigungsstufe \`${rlvl}\` und du hast nur die Stufe \`${lvl}\` ` !`,		

		ERROR_COMMAND_GUILDONLY: `${e.error} | Dieser Befehl ist in privaten Nachrichten nicht verfügbar!`,		



		PING_DESCRIPTION: "Antworte einfach auf Pong",

		PING_USAGE: (Präfix) => `${prefix}ping`,

		PING_EXAMPLES: (Präfix) => `${prefix}ping`,

		PING_PONG: "Pong !",	



		INVITE_DESCRIPTION: "Gibt die Einladung, den Bot auf einem Server hinzuzufügen",

		INVITE_USAGE: (Präfix) => `${Präfix}einladen`,

		INVITE_EXAMPLES: (Präfix) => `${Präfix}einladen`,

		INVITE_FIELD: "Einladung",

		INVITE: "[Hier klicken](https://discordapp.com/oauth2/authorize?client_id=390231727554953216&scope=bot&permissions=66321471), um den Bot auf deinen Diskord-Server einzuladen",

		

		AVATAR_DESCRIPTION: "Gibt den Avatar des gewünschten Benutzers an",

		AVATAR_USAGE: (Präfix) => `${präfix}avatar (@user)`,

		AVATAR_EXAMPLES: (Präfix) => `${präfix}avatar @Denver`,

		AVATAR_TITLE: "Avatar of".





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

		Schwitch (typeof value) {

			case "function": return value(....args);

			default: return value;

		}

	}

}

Übersetzt mit www.DeepL.com/Translator
