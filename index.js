// Mengaktifkan Package NPM.js
const Discord = require('discord.js');
const client = new Discord.Client();
const fs = require("fs");
const db = require("quick.db")
const ms = require("ms");
const talkedRecently = new Set();
const prefix = ']';
const cheerio = require('cheerio');
const snekfetch = require('snekfetch');
const querystring = require('querystring');
var cat = "http://random.cat/meow"
var request = require("request");
const {get} = require("snekfetch");
const randomHexColor = require('random-hex-color')
const randomAnimal = require("random-animal");
var lewd = ["http://gph.is/1Q0g8Z9", "https://cdn.discordapp.com/attachments/382436905926524928/403143965898964992/lewd-S1EHap_w-..gif", "https://media.giphy.com/media/pHH0RsynZHGlG/giphy.gif", "https://media.giphy.com/media/DHT6OLrSGU8z6/giphy.gif", "https://media.giphy.com/media/SFMEPM1LHxdYY/giphy.gif", "https://media.giphy.com/media/MRWsOo2LEQYDu/giphy.gif", "https://media.giphy.com/media/YgthKEUJE7HYA/giphy.gif", "https://media.giphy.com/media/3HD1rvrRk0QhO/giphy.gif", "https://media.giphy.com/media/dIXp5H9gaiZy0/giphy.gif", "https://media.giphy.com/media/fzFoOkVjpJ7ws/giphy.gif", "https://media.giphy.com/media/CeBkcIgzcZBks/giphy.gif"]
var hug = ["https://media.giphy.com/media/mx2EIGDZX5XH2/giphy.gif", "https://media.giphy.com/media/13YrHUvPzUUmkM/giphy.gif", "https://media.giphy.com/media/SZBS27PkBCKmk/giphy.gif", "https://media.giphy.com/media/f6y4qvdxwEDx6/giphy.gif", "https://media.giphy.com/media/5yp8MlXQLLna0/giphy.gif", "https://media.giphy.com/media/wbrgtEbP1GPNS/giphy.gif", "https://media.giphy.com/media/DtJw1cqMCHSvu/giphy.gif", "https://media.giphy.com/media/trJ68zLtt85QA/giphy.gif", "https://media.giphy.com/media/HaC1WdpkL3W00/giphy.gif", "https://media.giphy.com/media/yziFo5qYAOgY8/giphy.gif", "https://media.giphy.com/media/du8yT5dStTeMg/giphy.gif", "https://media.giphy.com/media/NimEavznszKtW/giphy.gif"]
var meow = ["https://media.giphy.com/media/FRg1FUARsn96/giphy.gif", "https://media.giphy.com/media/D0qSdg3fckqDC/giphy.gif", "https://media.giphy.com/media/WVhM2B5Kqqaxa/giphy.gif", "https://media.giphy.com/media/TjPotDPmEKiK4/giphy.gif", "https://media.giphy.com/media/3Ev8JMnsNqUM/giphy.gif", "https://media.giphy.com/media/guGXANpTSTJjG/giphy.gif", "https://media.giphy.com/media/xTiN0m4Q3VbqSJsTcc/giphy.gif", "https://media.giphy.com/media/109TWWxRddcIEg/giphy.gif", "https://media.giphy.com/media/FrEnONcaBGJ0c/giphy.gif", "https://media.giphy.com/media/3ohhwgj45R4n4CL0fS/giphy.gif", "https://media.giphy.com/media/Mc3yOYQDoXCj6/giphy.gif", "https://media.giphy.com/media/uNi7TY86W2kVi/giphy.gif", "https://media.giphy.com/media/13lWraa7dfb7G0/giphy.gif", "https://media.giphy.com/media/kBuMyaqdTIofe/giphy.gif", "https://media.giphy.com/media/nNp3ZSywRFyNi/giphy.gif","https://media.giphy.com/media/13lWraa7dfb7G0/giphy.gif","https://media.giphy.com/media/Fc7LvGqKt3C8/giphy.gif","https://media.giphy.com/media/Mn8aGoNewJl2o/giphy.gif","https://media.giphy.com/media/yFQ0ywscgobJK/giphy.gif","https://media.giphy.com/media/mlvseq9yvZhba/giphy.gif","https://media.giphy.com/media/nNxT5qXR02FOM/giphy.gif","https://media.giphy.com/media/3oriO0OEd9QIDdllqo/giphy.gif","https://media.giphy.com/media/MDJ9IbxxvDUQM/giphy.gif","https://media.giphy.com/media/W3QKEujo8vztC/giphy.gif", "https://media.giphy.com/media/3oEduSbSGpGaRX2Vri/giphy.gif","https://media.giphy.com/media/v6aOjy0Qo1fIA/giphy.gif"]
var cry = ["https://images-ext-2.discordapp.net/external/zH4GTVkeWu7SR_K3uKaLeVZ5QN286zvuYGf0Tz8rJnU/https/cdn.weeb.sh/images/SJRW7U7DZ.gif", "https://images-ext-2.discordapp.net/external/AiYvQZ2ZLMm2rAdkidD0Tm3hIDYo1I6mllbdeVga5Us/https/cdn.weeb.sh/images/Sy1EUa-Zz.gif?format=png&width=400&height=224", "https://images-ext-1.discordapp.net/external/pjwDmf4CIM4FxyfV8XULrc4nyqVGyYuv--3WTr8Upbo/https/cdn.weeb.sh/images/rJUujgJ5Z.gif?width=400&height=225", "https://media.giphy.com/media/4NuAILyDbmD16/giphy.gif", "https://media.giphy.com/media/eHekyNso61EqY/giphy.gif", "https://media.giphy.com/media/eHekyNso61EqY/giphy.gif", "https://media.giphy.com/media/XmPrx6vcB0X6g/giphy.gif","https://media.giphy.com/media/CpoZsKS27cK40/giphy.gif","https://media.giphy.com/media/ROF8OQvDmxytW/giphy.gif", "https://media.giphy.com/media/3fmRTfVIKMRiM/giphy.gif", "https://media.giphy.com/media/Y4z9olnoVl5QI/giphy.gif", "https://media.giphy.com/media/3wy72XTPLo1kk/giphy.gif", "https://media.giphy.com/media/kUYWowJqB78jK/giphy.gif", "https://media.giphy.com/media/l2Sq6JtUsY650LqKc/giphy.gif", "https://media.giphy.com/media/z18p1Aw2R4qnm/giphy.gif","https://media.giphy.com/media/PSBKGtaSBV98A/giphy.gif","https://media.giphy.com/media/D46ikuEng1x1C/giphy.gif","https://media.giphy.com/media/Pok6284jGzyGA/giphy.gif","https://media.giphy.com/media/yGesXBuMnMSdi/giphy.gif"]

const dbl = require("dblposter");
const dblPoster = new dbl(`eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjM4MzE4Mzg2NjkyNTY3ODYwNCIsImJvdCI6dHJ1ZSwiaWF0IjoxNTE3MDYwNjgxfQ.3btGrLTuqkpY-8WJpTDBPf96dXs1-nhgVj32ZdNNYhQ`);
dblPoster.bind(client);

client.on('message', async message => {

    let msg = message.content.toUpperCase();
    let args = message.content.slice(prefix.length).trim().split(/ +/g);
    let command = args.shift().toLowerCase();
    if (message.channel.type === 'dm') return;
    if (message.author.bot) return;

    // COMMAND COOLDOWN
    if (talkedRecently.has(message.author.id)) {
        return;
    }   
       talkedRecently.add(message.author.id);
        setTimeout(() => {
            talkedRecently.delete(message.author.id);
        }, 2500);
    

    const ClientMention = new RegExp(`^<@!?${client.user.id}>`);
    if (message.content.match(ClientMention)) {
        return message.reply(`**Indonesia#1193** prefix: **]**`);
    }

    // RANDOM COLOR
    if (msg === prefix + 'RANDOMCOLOR') {
        const embed = new Discord.MessageEmbed()

        .setDescription("**Random Color:** " + randomHexColor())
        
        message.channel.send({embed})
    }

    // PURGE
    if (msg.startsWith(prefix + 'PURGE') || msg.startsWith(prefix + 'PRUNE')) { 
        async function purge() {
            message.delete();

            if (!message.member.hasPermission("MANAGE_MESSAGES")) {
                const embed = new Discord.MessageEmbed()

                .setDescription("No **Manage Messages** permissions. Sorry, we can't do that.")
                .setColor(0xd82525)

                return message.channel.send({embed})
            }

            if (isNaN(args[0])) {
                const embed = new Discord.MessageEmbed()

                .setDescription("Failed to detect the Argument. \n" + prefix + "**purge | prune** <0/100>")
                .setColor(0xd82525)

                return message.channel.send({embed})
            }

            const fetched = await message.channel.messages.fetch({limit: args[0]});
            console.log(fetched.size + ' deleted!');

            // Deleting the messages
            message.channel.bulkDelete(fetched)
                .catch(error => message.channel.send(`Error: ${error}`));

        }
        purge();

    }

    // KUCING RANDOM 
    if (msg === prefix + 'CAT') {
        message.react("✅")
        try {
			get('https://random.cat/meow').then(response => {
                message.channel.send(":cat: | Here is your random cat.", {files: [{attachment: response.body.file, name: `cat.${response.body.file.split('.')[2]}`}]});
            })
		} catch (e) {
			console.log(e);
		}
    }

    if (msg === prefix + 'DOG') {
        message.react("✅")
        message.channel.send(randomAnimal.dog().then(url => message.channel.send(url + "\n:dog: | Here is your random dog.")).catch(err => message.channel.send(err.message)));
    }

    if (msg === prefix + 'LEWD') {
        message.react("✅")

        const embed = new Discord.MessageEmbed()

        .setDescription(":sweat_smile: | **NANI DESUKA?!!!**")
        .setColor(0xff4444)
        .setImage(lewd[Math.floor(Math.random() * lewd.length)])

        message.channel.send({embed})
    }

    if (msg.startsWith(prefix + 'HUG')) {
        let member = message.mentions.members.first()

        if (!member) {
            return message.channel.send("Tag temenmu dong! :pensive: Akan terasa sepi kalau tidak ada temen. \nhttps://media.giphy.com/media/2GnS81AihShS8/giphy.gif")
        }

        const embed = new Discord.MessageEmbed()

        .setDescription(":hugging: | **Ahh... You hugging with** " + member.user.tag)
        .setColor(0xc61145)
        .setImage(hug[Math.floor(Math.random() * hug.length)])

        message.channel.send({embed})
    }

    if (msg === prefix + 'MEOW') {
        const embed = new Discord.MessageEmbed()

        .setDescription(":cat: | **Oh... so cute.**")
        .setColor(0xff4444)
        .setImage(meow[Math.floor(Math.random() * meow.length)])

        message.channel.send({embed})
    }

    if (msg === prefix + 'CRY') {
        const embed = new Discord.MessageEmbed()

        .setDescription(`${message.author.username} sedang menangis. | :cry:`)
        .setColor(0x474747)
        .setImage(cry[Math.floor(Math.random() * cry.length)])

        message.channel.send({embed})
    }

    if (msg === prefix + 'LOADING') {
        var load = ["https://zippy.gfycat.com/KindheartedEnchantedGelding.webm"]
        const embed = new Discord.MessageEmbed()

        .setImage(`${load}`)
        .setColor(randomHexColor())

        message.channel.send({embed})
    }

    if (msg === prefix + 'BOTSPEAK') {
        message.channel.send("Sorry! I can't talk to you right now, we are under maintenance.")
    }

    // USERINFO
    if (msg.startsWith(prefix + 'USERINFO') || msg.startsWith(prefix + 'USER')) {

        let member = message.mentions.members.first();
        
        if (!member) {
            const embed = new Discord.MessageEmbed()

            .setAuthor(`${message.author.username}`, message.author.displayAvatarURL())
            .setDescription(`Displaying your current **information**`)
            .setColor(randomHexColor())
            .setFooter("© Indonesia | BETA v2.19 | discord.js")
            .setTimestamp()
            .setThumbnail(message.author.displayAvatarURL())

            .addField("Username:", `${message.author.username}#${message.author.discriminator}`)
            .addField("Created At:", `${message.author.createdAt}`)
            .addField("ID Member:", `${message.author.id}`)

            return message.channel.send({embed});
        }

        const embed = new Discord.MessageEmbed()

        .setAuthor(`${member.user.username}`, member.user.displayAvatarURL())
        .setDescription(`Displaying your current **information**`)
        .setColor(randomHexColor())
        .setFooter("© Indonesia | BETA v2.19 | discord.js")
        .setTimestamp()
        .setThumbnail(member.user.displayAvatarURL())

        .addField("Username:", `${member.user.username}#${member.user.discriminator}`)
        .addField("Created At:", `${member.user.createdAt}`)
        .addField("ID Member:", `${member.user.id}`)

        message.channel.send({embed})
    }

    // SERVERINFO
    if (msg === prefix + 'SERVERINFO' || msg === prefix + 'SERVER' || msg === prefix + 'GUILD') {
        const embed = new Discord.MessageEmbed()

        .setColor(randomHexColor())
        .setTitle(`Owner by ${message.guild.owner.user.tag} / ${message.guild.ownerID}`)
        .setDescription(`Server info untuk: ${message.guild}`)
        .setFooter("© Indonesia | BETA v2.19 | discord.js")
        .setThumbnail(message.guild.iconURL())
        .setTimestamp()

        .addField("Channels:", `${message.guild.channels.size}`, true)
        .addField("Members:", `**[${message.guild.members.size}]**`, true)
        .addField("Roles:", `${message.guild.roles.size}`, true)
        .addField("Region:", `${message.guild.region}`, true)
        .addField("ID:", `${message.guild.id}`, true)
        .addField("Created At:", `${message.guild.createdAt}`, true)

        message.channel.send({embed})
    }

    // SAYEMBED
    if (msg.startsWith(prefix + 'EMBED')) {
        if (msg === prefix + 'EMBED') {
            const embed = new Discord.MessageEmbed()

            .setDescription(`${prefix}embed <teks>`)

            return message.channel.send({embed})
        }

        let embedarg = args.slice(0).join(' ')

        message.delete()

        const embed = new Discord.MessageEmbed()

            .setDescription(`${embedarg}`)
            .setColor(randomHexColor())

            message.channel.send({embed})
    }

    // PING
    if (msg === prefix + 'PING') {
        message.react("✅")
        var lat_ms = `${Date.now() - message.createdTimestamp}`
        var api_ms = (client.ping).toFixed(2)

        const embed = new Discord.MessageEmbed()
        .setColor(randomHexColor())
        .setFooter("© Indonesia | BETA v2.19 | discord.js")
        .setTimestamp()
        .setDescription("You Beep, I Boop.")
        .addField("📁 | Latency:", lat_ms + "ms.", true)
        .addField("💻 | API:", api_ms + "ms.", true)

        message.channel.send({embed});
    }

    // INFO
    if (msg === prefix + 'INFO' || msg === prefix + 'INFORMATION' || msg === prefix + 'BOTINFO') {
        const embed = new Discord.MessageEmbed()

        .setColor(randomHexColor())
        .setFooter("© Indonesia | BETA v2.19 | discord.js")
        .setTimestamp()

        .addField("Developer:", "Ray#2221")
        .addField("Created At/Version:", "12 December 2017 / BETA v2.19")
        .addField("Maintenance Technician:", "ItzMeDwii#9748")
        .addField("Tested by:", "The Clu Craft#1063 & 18 tester")
        .addField("Library/Software:", "[Discord.js](https://discord.js.org/) / [Node.js 8.9.4](https://nodejs.org/en/) / [VCS](https://code.visualstudio.com/)")

        message.channel.send({embed});
    }

    // UPDATE
    if (msg === prefix + 'UPDATE' || msg === prefix + 'CHANGELOG') {
        const embed = new Discord.MessageEmbed()

        .setColor(randomHexColor())
        .setFooter("© Indonesia | BETA v2.19 | discord.js")
        .setTimestamp()
        .setDescription("📅 | Updated on 1st February 2018")
        .addField("✅ | Added:", "- Purge command added. \n- Unmute command added. \n- Ratewaifu command added. \n- Botspeak command added [WIP]")
        .addBlankField(true)
        .addField("⛔ | Fixed/Removed:", "- Fixed help command. \n- BETA v2.19 \n- Updated info command. \n- Updated ping command. \n- Updated invite command. \n- Updated avatar command (mentioned available)")

        message.channel.send({embed})
        return;
    }

    // BOTINFO
    const moment = require('moment');
    require('moment-duration-format');
    const duration = moment.duration(client.uptime).format(" D [days], H [hrs], m [mins], s [secs]");

    if (msg === prefix + 'STATS' || msg === prefix + 'RUNTIME' || msg === prefix + 'UPTIME') {
        const embed = new Discord.MessageEmbed()
        .setColor(randomHexColor())
        .setFooter("© Indonesia | BETA v2.19 | discord.js")
        .setTimestamp()

        .addField("📂 Servers:", `**${client.guilds.size}** guilds/servers.`, true)
        .addField("👤 Users:", `**${client.users.size}** users total.`, true)
        .addField("🕘 Uptime:", duration, true)
        .addField("💾 Memory Usage:", `${(process.memoryUsage().rss / 1024 / 1024).toFixed(2)} MB.`, true)
        .addField("💻 OS:", "Windows 7 / 64-bit", true)
        .addField("© Owner:", "Ray#2221", true)

        message.channel.send({embed});
    }

    if (msg.startsWith(prefix + 'RATEWAIFU')) {
        let waifu = args.slice(0).join(' ')
        if (!waifu) {
            return message.reply("Masukkan karakter waifu kesukaanmu!")
        }

        var ratewaifu = ["0/10", "1/10", "2/10", "3/10", "4/10", "5/10", "6/10", "7/10", "8/10", "9/10", "10/10"]
        var tryrate = Math.floor(Math.random() * ratewaifu.length);

        message.channel.send(`:thinking: | **${message.author.username}**, Saya berikan ${tryrate} kepada ${waifu}`)
    }

    // INVITE / SUPPORT
    if (msg === prefix + 'INVITE' || msg === prefix + 'SUPPORT') {
        const embed = new Discord.MessageEmbed()

        .setColor(randomHexColor())
        .setFooter("© Indonesia | BETA v2.19 | discord.js")
        .setTimestamp()
        
        .addField("📨 INVITE:", "[- from Discord Bots.](https://discordbots.org/bot/383183866925678604) \n[- Quick Invite.](https://discordapp.com/oauth2/authorize?client_id=383183866925678604&scope=bot&permissions=2105015551)")
        .addField("📡 SUPPORT ON DONATE:", "[Read Hastebin for donate requirement.](https://hastebin.com/orobiyesod.erl)")
        .addField("⛔ SUPPORT ON SERVER:", "[Discord API](https://discord.gg/discord-api) \n[The Coding Den](https://discord.gg/code) \n[Discord Guide](https://discord.gg/guide) \n[Plexi Development](https://discord.io/plexidev)")

        message.channel.send({embed})
    }

    // AVATAR
    if (msg.startsWith(prefix + 'AVATAR')) {
        message.react("✅");
        
        let user = message.mentions.users.first() || client.users.get(args[0]) || message.author;
        
        const embed = new Discord.MessageEmbed()
            .setDescription(`**${user.username}#${user.discriminator}** avatar.`)
            .setColor(randomHexColor())
            .setFooter("© Indonesia | BETA v2.19 | discord.js")
            .setTimestamp()
            .setImage(user.displayAvatarURL())
            message.channel.send(embed);
    }

    // TANYA JAWAB
    var tanyas = ['Ya.', 'Tidak.', 'Mungkin.', 'Yes.', 'No.', 'Maybe.']

    if (msg.startsWith(prefix + 'TANYA') || msg.startsWith(prefix + '8BALL')) {
        if (msg === prefix + 'TANYA') {
            return message.reply(prefix + 'tanya <pertanyaan kamu>')
        }

        if (msg === prefix + '8BALL') {
            return message.reply(prefix + '8ball <your question>')
        }

        const embed = new Discord.MessageEmbed()
        .setDescription(tanyas[Math.floor(Math.random() * tanyas.length)])
        .setColor(randomHexColor())

        message.channel.send({embed});
    }

    // SAY
    if (msg.startsWith(prefix + 'SAY')) {
        if (msg === prefix + 'SAY') {
            return message.reply(prefix + 'say <kata-kata kamu>')
        }
        
        let katakan = args.slice(0).join(' ');
        
        message.delete()

        await message.channel.send(`${katakan}`);
    }

    // HELP (SEDERHANA)
    if (msg.startsWith(prefix + 'HELP')) {
        message.react('✅')

        try {
            message.reply("Check DM! Dan, mohon aktifkan **allow direct messages** kamu.")

            const embed = new Discord.MessageEmbed()

            .setColor(randomHexColor())
            .setDescription("**INVITE/SUPPORT:** [Click Here to Invite and Join our Support Server](https://discordbots.org/bot/383183866925678604)")
            .setFooter("© Indonesia | BETA v2.19 | discord.js")
            .setTimestamp()

            .addField("GENERAL:", "`randomcolor` `say` `embed` `ping` `tanya/8ball` `randomcolor`")
            .addField("MOODBOOSTER: ", "`cat` `dog` `lewd` `hug` `cry` `meow` `loading` `botspeak [WIP]` `ratewaifu`")
            .addField("ADMINISTRATOR:", "`mute` `unmute` `purge/prune` `ban` `kick`")
            .addField("INFORMATION:", "`serverinfo` `userinfo` `avatar` `uptime` `update` `invite` `info`")

            message.author.send({embed})
        } catch (error) {
            message.reply("Aku tidak bisa kirim pesan ini ke Direct Messages kamu. \nMohon akitfkan **allow direct messages** kamu.")
            return;
        }
    }
                 
    // ------------------------- //
    // KATA KATA KOTOR (BANNED) //

    // MUTE
    if (msg.startsWith(prefix + 'MUTE')) {
        if (!message.member.hasPermission("MUTE_MEMBERS")) {
            return message.reply("No **Mute Members** permissions. We can't do that.")
        }
        
        let member = message.mentions.members.first();
        if (!member)
        return message.reply("Mohon mention member yang ingin anda mute! \n**Usage:** ]mute <member> <waktu> \n\n**Rumus**: 1d = 1hari, 1h = 1jam, 1m = 1mnt, 1d = 1dtk, 1ms = 1milidtk");

        let muteRole = message.guild.roles.find("name", "Muted");
        if (!muteRole) {
            return message.reply("No role Muted.")
        }

        let time = args[1];
        if (!time)
        return message.reply("Mohon masukkan waktu mute-nya! \n**Usage:** ]mute <member> <waktu> \n\n**Rumus**: 1d = 1hari, 1h = 1jam, 1m = 1mnt, 1d = 1dtk, 1ms = 1milidtk")

        await member.addRole(muteRole.id)
            .catch(error => message.reply(`Maaf ${message.author} Saya tidak bisa mute member ini: ${error}`));
        message.channel.send(`${member.user.tag} dimute selama ${ms(ms(time), {long: true})}`);

        setTimeout(function() {
            member.removeRole(muteRole.id)
            message.channel.send(`${member.user.tag} Unmuted. Chat dengan bijak dan ikuti peraturan. \n**WAKTU TERAKHIR MUTED**: ${ms(ms(time), {long: true})}`)
        }, ms(time));
    } else {
        if (msg.startsWith(prefix + 'UNMUTE')) {
            let muteRole = message.guild.roles.find("name", "Muted");
            let member = message.mentions.members.first();
            if (!message.member.hasPermission('ADMINISTRATOR')) {
                return message.reply("No **Administrator** permissions. We can't do that.")
            }

            if (!member) {
                return message.reply("Mohon mention member yang ingin anda **un**mute!")
            }

            if (message.member.roles.has(muteRole)) {
                await member.removeRole(muteRole.id)
                message.channel.send(`${member.user.tag} Unmuted. Chat dengan bijak dan ikuti peraturan.`)
            } else {
                message.channel.send(`${member.user.tag} tidak di**mute**.`)
            }
        }
    }

    // KICK
    if (msg.startsWith(prefix + 'KICK')) {

        if (!message.member.hasPermission('KICK_MEMBERS')) {
            return message.reply("No **Kick Members** permissions. We can't do that.")
        }
        
        let member = message.mentions.members.first();
        let reason = args.slice(1).join(' ');

        if (!member) {
            return message.reply("Tag member yang ingin di kick dari server ini!")
        }

        if (!member.bannable) {
            return message.reply("Maaf. Kami tidak bisa. Karena member ini lebih tinggi perannya dari bot ini.")
        }

        if (!reason)
            return message.reply("Masukkan alasan mengapa anda ingin kick member ini!")
        
        await member.user.send(`Kick: ${reason}`)
        
        await member.kick(reason)
            .catch(error => message.reply(`Maaf ${message.author} Saya tidak bisa kick member ini: ${error}`));
            return message.channel.send(`${member.user.tag} telah dikick!`)
    }


    // BAN
    if (msg.startsWith(prefix + 'BAN')) {
        if (!message.member.hasPermission('BAN_MEMBERS')) {
            return message.reply("No **Ban Members** permissions. We can't do that.")
        }
        
        let member = message.mentions.members.first();
        let reason = args.slice(1).join(' ');

        if (!member) {
            return message.reply("Tag member yang ingin di banned dari server ini!")
        }

        if (!member.bannable) {
            return message.reply("Maaf. Kami tidak bisa. Karena member ini lebih tinggi perannya dari bot ini.")
        }

        if (!reason)
            return message.reply("Masukkan alasan mengapa anda ingin ban member ini!")
        
        await member.user.send(`Banned: ${reason}`)
        await member.ban(reason)
            .catch(error => message.reply(`Maaf ${message.author} Saya tidak bisa Ban member ini: ${error}`));
            return message.channel.send(`${member.user.tag} telah dibanned!`)
    }

});

client.on("ready", () => {
    console.log('Bot dinyalakan oleh Ray#2221');
    function randomStatus() {
        let status = ["AYP", "80! SERVERS ON 4 DAYS!", "4Brother", "XQII", "Gembel Squad", "Discord", "24/7", "Security Management", "Moodbooster System.", "High-quality Maintenance", "DO YOU KNOW DA WEY?", "SOMEBODY TOUCHA MY SPAGHETT?!", "I'M SO FABULOUS", "Spoonfeed", "Indo Army", "Extronus", "HaveFun Squad", "Plexi Development", "Qorygore", "The Dream Craft", "Erpan1140", "Zenmatho", "BeaconCream", "Ewing HD", "Ray#2221", "Spotify", "Partner"];
        let rstatus = Math.floor(Math.random() * status.length);
        client.user.setActivity(status[rstatus], {type: 'STREAMING' , url: 'https://www.twitch.tv/raygd'});

    }; setInterval(randomStatus, 40000)
})

client.login(process.env.BOT_TOKEN);
