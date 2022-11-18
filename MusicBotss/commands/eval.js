const { MessageEmbed } = require("discord.js");
module.exports = {
  name: "eval",
  description: "evaluate and run your code!",
  botPerms: ["EMBED_LINKS"],
  async execute(client, message, args) {
    // you can't change this for copy right
    if (message.author.id === '901765485341859911') {
    try {
      const code = args.join(" ");
      if (!code) {
        return message.reply("What do you want to evaluate?");
      }
      let evaled = eval(code);
      if (typeof evaled !== "string") evaled = require("util").inspect(evaled);
      let EvalEmbed = new MessageEmbed()
        .addFields(
          { name: "📫Input:", value: `\`\`\`${code}\`\`\``, inline: true },
          { name: "🗂Output:", value: `\`\`\`${evaled}\`\`\``, inline: true }
        )
        .setColor("9C55FF")
        .setFooter({
          text: `Requested by ${message.author.username}`,
          iconURL: message.author.displayAvatarURL({
            dynamic: true,
            size: 4096,
            format: "png",
          }),
        })
        .setTimestamp();
        message.channel.sendTyping();
      message.reply({ embeds: [EvalEmbed] });
    } catch (err) {
      const ErrorEmbed = new MessageEmbed()
      .setDescription(`\`ERROR\` \`\`\`xl\n${err}\n\`\`\``)
      .setColor("ff4245")
      .setFooter({
        text: `Requested by ${message.author.tag}`,
        iconURL: message.author.displayAvatarURL({ dynamic: true }),
      })
      .setTimestamp()

      message.reply({embeds: [ErrorEmbed]});
    }
    }
    else{
      message.channel.sendTyping();
      message.reply(`❌Sorry You Can't Use this Action | Limited to the Bot Owner Only!`);
    }
  },
};
