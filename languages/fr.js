module.exports = class {
    constructor(...args) {
		this.language = {

            NO_DESCRIPTION_PROVIDED: "Aucune description définie",
            NO_USAGE_PROVIDED: "Aucun usage défini",
            NO_EXAMPLES_PROVIDED: "Aucun exemple défini",

            PING_DESCRIPTION: "Répond juste pong",
            PING_USAGE: (prefix) => `${prefix}ping`,
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
}