const { Client, Collection, MessageEmbed } = require("discord.js");
const { promisify } = require("util"),
fs = require("fs"),
path = require("path"),
mongoose = require("mongoose"),
readdir = promisify(fs.readdir);

// Creates new Denver class
class Denver extends Client {

    constructor (options) {
        super(options);
        this.config = require("./config.js"); // Load the config file
        this.commands = new Collection(); // Creates new commands collection
        this.aliases = new Collection(); // Creates new command aliases collection
        this.wait = promisify(setTimeout); // client.wait(1000) - Wait 1 second
        this.functions = require("./utils/functions.js"); // Load the functions file
        this.logger = require("./utils/logger.js"); // Load logger file
        this.errors = require("./utils/errors.js"); // Load errors file
    }

    getLevel (message) {
        let permlvl = 0;
        const permOrder = this.config.permLevels.slice(0).sort((p, c) => p.level < c.level ? 1 : -1);
        while (permOrder.length) {
            const currentLevel = permOrder.shift();
            if(message.guild && currentLevel.guildOnly){
                continue;
            }
            if(currentLevel.check(message)) {
                permlvl = currentLevel.level;
                break;
            }
        }
        return permlvl;
    }

    // This function is used to load a command and add it to the collection
    loadCommand (commandPath, commandName) {
        try {
            const props = new (require(`${commandPath}${path.sep}${commandName}`))(this);
            this.logger.log(`Loading Command: ${props.help.name}. 👌`, "log");
            props.conf.location = commandPath;
            if (props.init){
                props.init(this);
            }
            this.commands.set(props.help.name, props);
            props.conf.aliases.forEach((alias) => {
                this.aliases.set(alias, props.help.name);
            });
            return false;
        } catch (e) {
            return `Unable to load command ${commandName}: ${e}`;
        }
    }

    // This function is used to unload a command (you need to load them again)
    async unloadCommand (commandPath, commandName) {
        let command;
        if(this.commands.has(commandName)) {
            command = this.commands.get(commandName);
        } else if(this.aliases.has(commandName)){
            command = this.commands.get(this.aliases.get(commandName));
        }
        if(!command){
            return `The command \`${commandName}\` doesn't seem to exist, nor is it an alias. Try again!`;
        }
        if(command.shutdown){
            await command.shutdown(this);
        }
        delete require.cache[require.resolve(`${commandPath}${path.sep}${commandName}.js`)];
        return false;
    }

}

// Creates new client
const client = new Denver();

const init = async () => {

    // Connect to the database
    await mongoose.connect("mongodb://localhost:27017/denverbot", {
        useNewUrlParser: true
    });

    client.models = {};
    client.models.Guild = mongoose.model("guild", new mongoose.Schema({
        id: {type: String},
        language: {type: String, default: client.config.defaultLanguage},
        prefix: {type: String, default: client.config.prefix}
    }));

    client.models.User = mongoose.model("user", new mongoose.Schema({
        id: {type: String}
    }));

    // Search for all commands
    let directories = await readdir("./commands/");
    client.logger.log(`Loading a total of ${directories.length} categories.`, "log");
    directories.forEach(async (dir) => {
        let commands = await readdir("./commands/"+dir+"/");
        commands.filter((cmd) => cmd.split(".").pop() === "js").forEach((cmd) => {
            const response = client.loadCommand("./commands/"+dir, cmd);
            if(response){
                client.logger.log(response, "error");
            }
        });
    });

    // Then we load events, which will include our message and ready event.
    const evtFiles = await readdir("./events/");
    client.logger.log(`Loading a total of ${evtFiles.length} events.`, "log");
    evtFiles.forEach((file) => {
        const eventName = file.split(".")[0];
        client.logger.log(`Loading Event: ${eventName}`);
        const event = new (require(`./events/${file}`))(client);
        client.on(eventName, (...args) => event.run(...args));
        delete require.cache[require.resolve(`./events/${file}`)];
    });

    // Gets commands permission
    client.levelCache = {};
    for (let i = 0; i < client.config.permLevels.length; i++) {
        const thisLevel = client.config.permLevels[parseInt(i, 10)];
        client.levelCache[thisLevel.name] = thisLevel.level;
    }
    
    client.login(client.config.token); // Log in to the discord api

};

init();

// if there are errors, log them
client.on("disconnect", () => client.logger.log("Bot is disconnecting...", "warn"))
    .on("reconnecting", () => client.logger.log("Bot reconnecting...", "log"))
    .on("error", (e) => client.logger.log(e, "error"))
    .on("warn", (info) => client.logger.log(info, "log"));

// if there is an unhandledRejection, log them
process.on("unhandledRejection", (err) => {
    client.logger.log("Uncaught Promise Error: "+err, "error");
});