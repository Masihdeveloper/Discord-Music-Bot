const { MessageEmbed } = require("discord.js");
const { support_server } = require("../config.json");
const { LOCALE } = require("../util/EvobotUtil");
const i18n = require("i18n");

i18n.setLocale(LOCALE);

module.exports = {
  name: "help",
  aliases: ["h"],
  description: i18n.__("help.description"),
  execute(message) {
    let commands = message.client.commands.array();

    let helpEmbed = new MessageEmbed()
      .setAuthor(`${message.client.user.username + " " + "Help:"}`, `${message.client.user.displayAvatarURL({ format: "png" })}`)
      .setThumbnail(message.client.user.displayAvatarURL({ format: "png" }))
            .setDescription("Hello, I'm" + 
 message.client.user.tag + ", Playing Rich with So High Quality Songs from YouTube, SoudCloud, Spotify\nMade with ❤️ by [Masih#0258](https://discord.com/users/901765485341859911)\n\n__**🎧Here Is All My Music Command That You Can Use:**__\n\n🔁`+loop`\n⤴️`+move`\n⏺`+np`\n⏸`+pause`\n▶️`+play`\n🎶`+playlist`\n📄`+queue`\n❌`+remove`\n🔼`+resume`\n🔍`+search`\n⭐`+shuffle`\n⏩`+skip`\n⬆️`+skipto`\n⏹`+stop`\n🔊`+volume`\n\n[Support Server](https://discord.gg/ttmZpw7fyj), [GitHub](https://github.com/MasihJs), [Instagram](https://instagram.com/masih_b_dark), [Twitter](https://twitter.com/masih_b_dark), [Twitch](https://twitch.tv/agents__xd)")
      .setColor(`32ff81`)
      .setFooter(`Requested by ${message.author.username} | Made by: Masih#0258`, `${message.author.displayAvatarURL()}`);

helpEmbed.setTimestamp();

    return message.channel.send(helpEmbed).catch(console.error);
  }
};