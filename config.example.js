module.exports = {
    token: "token",
    defaultLanguage: "english",
    prefix: ".",
    permLevels: [
        {
            level: 0,
            name: "User",
            check: () => true
        },
        {
            level: 1,
            name: "Server Moderator",
            check: (message) => (message.guild ? message.member.hasPermission("KICK_MEMBERS") : false)
        },
        {
            level: 2,
            name: "Server Admin",
            check: (message) => (message.guild ? message.member.hasPermission("ADMINISTRATOR") : false)
        },
        {
            level: 3,
            name: "Server Owner",
            check: (message) => (message.guild ? message.author.id === message.guild.owner.user.id : false)
        },
        {
            level: 4,
            name: "Bot Admin",
            check: (message) => message.config.administrators.includes(message.author.id)
        }
    ],
    staff: [
    ],
    administrators: [
    ],
    emotes: {
        error: "❌",
        success: "✅",
        info: "ℹ️"
    },
    embed: {
        color: "#7289da",
        footer: "DenverBot"
    }
}