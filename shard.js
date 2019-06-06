const config = require("./config.js"),
Discord = require("discord.js");
const shard = new Discord.ShardingManager("./denver.js", {
  token: config.token,
  autoSpawn: true
});

shard.spawn(2);

shard.on("launch", (shard) => console.log(`[SHARD] Shard ${shard.id}/${shard.totalShards}`));