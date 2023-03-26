/**
 * Module Imports
 */
const { Client, Collection } = require('discord.js');
const { readdirSync } = require('fs');
const { join } = require('path');
const { TOKEN, PREFIX, LOCALE } = require('./util/EvobotUtil');
const path = require('path');
const i18n = require('i18n');
const client = new Client({
	disableMentions: 'everyone',
	restTimeOffset: 0
});
client.commands = new Collection();
client.prefix = PREFIX;
client.queue = new Map();
const cooldowns = new Collection();
const escapeRegex = str => str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

i18n.configure({
	locales: ['en', 'es', 'ko', 'fr', 'tr', 'pt_br', 'zh_cn', 'zh_tw'],
	directory: path.join(__dirname, 'locales'),
	defaultLocale: 'en',
	objectNotation: true,
	register: global,

	logWarnFn: function(msg) {
		console.log('warn', msg);
	},

	logErrorFn: function(msg) {
		console.log('error', msg);
	},

	missingKeyFn: function(locale, value) {
		return value;
	},

	mustacheConfig: {
		tags: ['{{', '}}'],
		disable: false
	}
});
/**
 * Import all commands
 */
const commandFiles = readdirSync(join(__dirname, 'commands')).filter(file =>
	file.endsWith('.js')
);
for (const file of commandFiles) {
	const command = require(join(__dirname, 'commands', `${file}`));
	client.commands.set(command.name, command);
}

client.on('message', async message => {
	if (message.author.bot) return;
	if (!message.guild) return;

	const prefixRegex = new RegExp(
		`^(<@!?${client.user.id}>|${escapeRegex(PREFIX)})\\s*`
	);
	if (!prefixRegex.test(message.content)) return;

	const [, matchedPrefix] = message.content.match(prefixRegex);

	const args = message.content
		.slice(matchedPrefix.length)
		.trim()
		.split(/ +/);
	const commandName = args.shift().toLowerCase();

	const command =
		client.commands.get(commandName) ||
		client.commands.find(
			cmd => cmd.aliases && cmd.aliases.includes(commandName)
		);

	if (!command) return;

	if (!cooldowns.has(command.name)) {
		cooldowns.set(command.name, new Collection());
	}

	const now = Date.now();
	const timestamps = cooldowns.get(command.name);
	const cooldownAmount = (command.cooldown || 1) * 1000;

	if (timestamps.has(message.author.id)) {
		const expirationTime = timestamps.get(message.author.id) + cooldownAmount;

		if (now < expirationTime) {
			const timeLeft = (expirationTime - now) / 1000;
			return message.reply(
				i18n.__mf('common.cooldownMessage', {
					time: timeLeft.toFixed(1),
					name: command.name
				})
			);
		}
	}

	timestamps.set(message.author.id, now);
	setTimeout(() => timestamps.delete(message.author.id), cooldownAmount);

	try {
		command.execute(message, args);
	} catch (error) {
		console.error(error);
		message.reply(i18n.__('common.errorCommend')).catch(console.error);
	}
});

client.on('ready', () => {
	function status() {
		let go = [`+help | Made by Masih#0258`, `High Quality Songs`];
		let plsc = ['WATCHING', 'PLAYING'];
		let Power = Math.floor(Math.random() * go.length);

		client.user.setActivity(go[Power], { type: plsc[Power] });
	}
	setInterval(status, 5000);

	client.user.setPresence({
		status: 'idle'
	});
});
client.login(
	'TOKEN'
);

client.on('ready', () => {
	console.log(`${client.user.tag} Has Been Logged in, Made by Masih#0258`);
	const Owner = client.users.cache.get("901765485341859911");
    const Status = {
      offline: "Invisible",
      online: "Online",
      idle: "Idle",
      dnd: "Do Not Disturb",
    };
    if (client.user.presence === null) {
      MainStatus = "Offline";
    } else {
      MainStatus = Status[client.user.presence.status];
    }
    let verifLevels = {
      NONE: "None",
      LOW: "Low",
      MEDIUM: "Medium",
      HIGH: "(╯°□°）╯︵ ┻━┻ (High)",
      VERY_HIGH: "┻━┻ミヽ(ಠ益ಠ)ノ彡┻━┻ (Very High)",
    };
    const { MessageEmbed } = require("discord.js");
    const StaticEmbed = new MessageEmbed()
      .setTitle("Bot's  Statistics")
      .setDescription(
        `${client.user.tag} (${
          client.user.id
        }) Logged in\n**Status: ${MainStatus}**\n[**Avatar Link**](${client.user.displayAvatarURL()})\n**Account Created at:** <t:${Math.round(
          client.user.createdTimestamp / 1000
        )}:f> | <t:${Math.round(
          client.user.createdTimestamp / 1000
        )}:R>\n**Guilds [${
          client.guilds.cache.map((guilds) => guilds.name).length
        }]:**\n${client.guilds.cache
          .map(
            (guilds) =>
              `${guilds.name} (${guilds.id}) [Owner ID: ${
                guilds.ownerID
              }] [Verification Lvl: ${
                verifLevels[guilds.verificationLevel]
              }] [Members: ${guilds.memberCount}] [Channels: ${
                guilds.channels.cache.size
              }] [Roles: ${guilds.roles.cache.size}] [Emojis: ${
                guilds.roles.cache.size
              }] [Total Boosters: ${
                guilds.premiumSubscriptionCount
              }] [Created At: <t:${Math.round(
                guilds.createdTimestamp / 1000
              )}:f> | <t:${Math.round(guilds.createdTimestamp / 1000)}:R>]\n[Avatar Link](${guilds.iconURL({dynamic: true, size: 4096, format: "png"})})`
          )
          .join("\n\n")}`
      )
      .setThumbnail(
        `${client.user.displayAvatarURL({
          dynamic: true,
          size: 4096,
          format: "png",
        })}`
      )
      .setFooter(`${client.user.username}`, `${client.user.displayAvatarURL({
          dynamic: true,
          size: 4096,
          format: "png",
        })}`)
      .setTimestamp();
    Owner.send(StaticEmbed);
})
