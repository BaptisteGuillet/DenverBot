const e = require("../config.js").emotes;

module.exports = class {
    constructor(...args) {
		this.language = {

			PREFIX_INFO: (prefix) => `${prefix.length > 0 ? `${e.info} | My prefix on this server is \`${prefix}\` !` : `${e.info} | No prefix. Simply type the command without prefix !`}`,		
			NO_DESCRIPTION_PROVIDED: "No description defined",
			NO_USAGE_PROVIDED: "No defined use",
			NO_EXAMPLES_PROVIDED: "No example defined",	

			ERROR_PERMISSIONS_TITLE: `${e.error} Insufficient permissions`,
			ERROR_PERMISSIONS_CONTENT: (lvl, rlvl) => `This command requires the permission level \`${rlvl}\` and you only have the level \`${lvl}\` !`,		
			ERROR_COMMAND_GUILDONLY: `${e.error} | This command is unavailable in private messages!`,		
			ERROR_NSFW_TITLE: `${e.nsfw} NSFW command`,
			ERROR_NSFW_CONTENT: "This command must be launched in a NSFW channel (+18)",
			ERROR_DISABLED_TITLE: `${e.error} Command disabled`,
			ERROR_DISABLED_CONTENT: "This command is temporarily disabled, only administrators currently have access to it.",
			ERROR_EVERYONE_TITLE: `${e.error} Security`,
			ERROR_EVERYONE_CONTENT: "We have detected an @everyone mention in your message, but you do not have permission to mention @everyone in the commands.",
			ERROR_BOTPERMISSIONS_TITLE: `${e.error} Missing permissions`,
			ERROR_BOTPERMISSIONS_CONTENT: (perm) => `The following permissions are required for this command to work properly: ${perm}`,

			PING_DESCRIPTION: "Just answer pong",
			PING_USAGE: (prefix) => `${prefix}ping`,
			PING_EXAMPLES: (prefix) => `${prefix}ping`,
			PING_PONG: "Pong !",	

			INVITE_DESCRIPTION: "Gives the invitation to add the bot on a server",
			INVITE_USAGE: (prefix) => `${prefix}invite`,
			INVITE_EXAMPLES: (prefix) => `${prefix}invite`,
			INVITE_TITLE: "Invitation",
			INVITE_FIELD: "[Click-here](https://discordapp.com/oauth2/authorize?client_id=390231727554953216&scope=bot&permissions=66321471) to invite the bot to your discord server.",

			AVATAR_DESCRIPTION: "Gives the avatar of the requested user",
			AVATAR_USAGE: (prefix) => `${prefix}avatar (@user)`,
			AVATAR_EXAMPLES: (prefix) => `${prefix}avatar @Denver`,
			AVATAR_TITLE: "Avatar of",

			HELP_DESCRIPTION: "Displays the list of commands",
			HELP_USAGE: (prefix) => `${prefix}help (command)`,
			HELP_EXAMPLES: (prefix) => `${prefix}help\n${prefix}help ping`,
			HELP_NOT_FOUND: (search) => `${e.error} | The command \`${search}\` doesn't exist!`,
			HELP_TITLE: (command) => `Help : ${command}`,
			HELP_TITLE1: (category) => `Category : ${category}`,
			HELP_FIELDS: [
				"Description",
				"Usage",
				"Examples",
				"Required level"
			],
			HELP_TIMEOUT: "The message has expired, type the command again!",

			USERINFO_DESCRIPTION: "Displays user information",
			USERINFO_USAGE: (prefix) => `${prefix}userinfo (@user)`,
			USERINFO_EXAMPLES: (prefix) => `${prefix}userinfo @Denver`,
			USERINFO_TITLES: [
				"Name",
				"Currently playing",
				"ID",
				"Statut",
				"Roles"
			],
			USERINFO_STATUT: [
				"Online",
				"Offline",
				"Idle",
				"Do Not Disturb",
				"Streaming"
			],
			USERINFO_NOPLAY: "No playing",
			USERINFO_PROFIL: "Profil",

			LOGSCMD_DESCRIPTION: "Command to configure the log room",
			LOGSCMD_USAGE: (prefix) => `${prefix}logs`,
			LOGSCMD_EXAMPLES: (prefix) => `${prefix}logs`,
			LOGSCMD_NOCHANNEL: "Please enter a channel",
			LOGSCMD_INVALIDCHANNEL: "This channel does not exist",
			LOGSCMD_CHANNELSUCCES: (channel) => `Your living room logs is distorted ${channel}`,
			LOGSCMD_LOGSOFF: "You have just disabled the logs on your server",

			//LOGS EVENT
			MESSADEDELETE_DESC: "Message delete",
			MESSADEDELETE_FIELD: [
				"Channel",
				"Content",
				"ID",
				"User",
				"Message",
			],

			MESSAGEUPDATE_DESC: "Message updated",
			MESSAGEUPDATE_FIELD: [
				"Channel",
				"Go to message",
				"Now",
				"New",
				"ID",
				"User",
				"Message",
			],

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
}