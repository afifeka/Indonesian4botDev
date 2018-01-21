// Mengaktifkan Package NPM.js
const Discord = require('discord.js');
const client = new Discord.Client();
const fs = require("fs");
const db = require("quick.db")
const ms = require("ms");

// Searcher
const cheerio = require('cheerio');
const snekfetch = require('snekfetch');
const querystring = require('querystring');

// Cat Random
var cat = "http://random.cat/meow"
var request = require("request");
const {get} = require("snekfetch");

// Dog Random
const randomAnimal = require("random-animal");

// Other Funny Random
var lewd = ["http://gph.is/1Q0g8Z9", "https://cdn.discordapp.com/attachments/382436905926524928/403143965898964992/lewd-S1EHap_w-..gif", "https://media.giphy.com/media/pHH0RsynZHGlG/giphy.gif", "https://media.giphy.com/media/DHT6OLrSGU8z6/giphy.gif", "https://media.giphy.com/media/SFMEPM1LHxdYY/giphy.gif", "https://media.giphy.com/media/MRWsOo2LEQYDu/giphy.gif", "https://media.giphy.com/media/YgthKEUJE7HYA/giphy.gif", "https://media.giphy.com/media/3HD1rvrRk0QhO/giphy.gif", "https://media.giphy.com/media/dIXp5H9gaiZy0/giphy.gif", "https://media.giphy.com/media/fzFoOkVjpJ7ws/giphy.gif", "https://media.giphy.com/media/CeBkcIgzcZBks/giphy.gif"]
var hug = ["https://media.giphy.com/media/mx2EIGDZX5XH2/giphy.gif", "https://media.giphy.com/media/13YrHUvPzUUmkM/giphy.gif", "https://media.giphy.com/media/SZBS27PkBCKmk/giphy.gif", "https://media.giphy.com/media/f6y4qvdxwEDx6/giphy.gif", "https://media.giphy.com/media/5yp8MlXQLLna0/giphy.gif", "https://media.giphy.com/media/wbrgtEbP1GPNS/giphy.gif", "https://media.giphy.com/media/DtJw1cqMCHSvu/giphy.gif", "https://media.giphy.com/media/trJ68zLtt85QA/giphy.gif", "https://media.giphy.com/media/HaC1WdpkL3W00/giphy.gif", "https://media.giphy.com/media/yziFo5qYAOgY8/giphy.gif", "https://media.giphy.com/media/du8yT5dStTeMg/giphy.gif", "https://media.giphy.com/media/NimEavznszKtW/giphy.gif"]
var meow = ["https://media.giphy.com/media/FRg1FUARsn96/giphy.gif", "https://media.giphy.com/media/D0qSdg3fckqDC/giphy.gif", "https://media.giphy.com/media/WVhM2B5Kqqaxa/giphy.gif", "https://media.giphy.com/media/TjPotDPmEKiK4/giphy.gif", "https://media.giphy.com/media/3Ev8JMnsNqUM/giphy.gif", "https://media.giphy.com/media/guGXANpTSTJjG/giphy.gif", "https://media.giphy.com/media/xTiN0m4Q3VbqSJsTcc/giphy.gif", "https://media.giphy.com/media/109TWWxRddcIEg/giphy.gif", "https://media.giphy.com/media/FrEnONcaBGJ0c/giphy.gif", "https://media.giphy.com/media/3ohhwgj45R4n4CL0fS/giphy.gif", "https://media.giphy.com/media/Mc3yOYQDoXCj6/giphy.gif", "https://media.giphy.com/media/uNi7TY86W2kVi/giphy.gif", "https://media.giphy.com/media/13lWraa7dfb7G0/giphy.gif", "https://media.giphy.com/media/kBuMyaqdTIofe/giphy.gif", "https://media.giphy.com/media/nNp3ZSywRFyNi/giphy.gif","https://media.giphy.com/media/13lWraa7dfb7G0/giphy.gif","https://media.giphy.com/media/Fc7LvGqKt3C8/giphy.gif","https://media.giphy.com/media/Mn8aGoNewJl2o/giphy.gif","https://media.giphy.com/media/yFQ0ywscgobJK/giphy.gif","https://media.giphy.com/media/mlvseq9yvZhba/giphy.gif","https://media.giphy.com/media/nNxT5qXR02FOM/giphy.gif","https://media.giphy.com/media/3oriO0OEd9QIDdllqo/giphy.gif","https://media.giphy.com/media/MDJ9IbxxvDUQM/giphy.gif","https://media.giphy.com/media/W3QKEujo8vztC/giphy.gif", "https://media.giphy.com/media/3oEduSbSGpGaRX2Vri/giphy.gif","https://media.giphy.com/media/v6aOjy0Qo1fIA/giphy.gif"]
var cry = ["https://images-ext-2.discordapp.net/external/zH4GTVkeWu7SR_K3uKaLeVZ5QN286zvuYGf0Tz8rJnU/https/cdn.weeb.sh/images/SJRW7U7DZ.gif", "https://images-ext-2.discordapp.net/external/AiYvQZ2ZLMm2rAdkidD0Tm3hIDYo1I6mllbdeVga5Us/https/cdn.weeb.sh/images/Sy1EUa-Zz.gif?format=png&width=400&height=224", "https://images-ext-1.discordapp.net/external/pjwDmf4CIM4FxyfV8XULrc4nyqVGyYuv--3WTr8Upbo/https/cdn.weeb.sh/images/rJUujgJ5Z.gif?width=400&height=225", "https://media.giphy.com/media/4NuAILyDbmD16/giphy.gif", "https://media.giphy.com/media/eHekyNso61EqY/giphy.gif", "https://media.giphy.com/media/eHekyNso61EqY/giphy.gif", "https://media.giphy.com/media/XmPrx6vcB0X6g/giphy.gif","https://media.giphy.com/media/CpoZsKS27cK40/giphy.gif","https://media.giphy.com/media/ROF8OQvDmxytW/giphy.gif", "https://media.giphy.com/media/3fmRTfVIKMRiM/giphy.gif", "https://media.giphy.com/media/Y4z9olnoVl5QI/giphy.gif", "https://media.giphy.com/media/3wy72XTPLo1kk/giphy.gif", "https://media.giphy.com/media/kUYWowJqB78jK/giphy.gif", "https://media.giphy.com/media/l2Sq6JtUsY650LqKc/giphy.gif", "https://media.giphy.com/media/z18p1Aw2R4qnm/giphy.gif","https://media.giphy.com/media/PSBKGtaSBV98A/giphy.gif","https://media.giphy.com/media/D46ikuEng1x1C/giphy.gif","https://media.giphy.com/media/Pok6284jGzyGA/giphy.gif","https://media.giphy.com/media/yGesXBuMnMSdi/giphy.gif"]

// Pengaturan Global
const prefix = ']';

// DBL
const dbl = require(`discord-bot-list`)
 
const clientdbl = new dbl({
    token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjM4MzE4Mzg2NjkyNTY3ODYwNCIsImJvdCI6dHJ1ZSwiaWF0IjoxNTE2MzQ0ODg1fQ.5gZpxOtNFuDBrLR3SZJRoxfgeeAC-YWVPUMzpZ4LFSw",
    id: "383183866925678604"
})

clientdbl.postStats("55", (err, res) => {
    if(err) {
        console.error(err)
    } else {
        console.log(res)
    }
})

// Fungsi Webhook
function hook(channel, title, message, color, avatar) {
    
        if (!channel) return console.log('Channel not specified.');
        if (!title) return console.log('Title not specified.');
        if (!message) return console.log('Message not specified.');
        if (!color) color = 'ff2f2f';
        if (!avatar) avatar = 'https://cdn4.iconfinder.com/data/icons/technology-devices-1/500/speech-bubble-128.png'

        color = color.replace(/\s/g, '');
        avatar = avatar.replace(/\s/g, '');
    
        channel.fetchWebhooks()
            .then(webhook => {
    
                let foundHook = webhook.find('name', 'Webhook');
    
                if (!foundHook) {
                    channel.createWebhook('Webhook', 'https://cdn4.iconfinder.com/data/icons/technology-devices-1/500/speech-bubble-128.png')
                        .then(webhook => {
                            webhook.send('', {
                                "username": title,
                                "avatarURL": avatar,
                                "embeds": [{
                                    "color": parseInt(`0x${color}`),
                                    "description":message
                                }]
                            })
                                .catch(error => {
                                    console.log(error);
                                    return channel.send('**Terjadi masalah saat meluncurkan webhook. Silahkan cek konsol.**');
                                })
                        })
                } else {
                    foundHook.send('', {
                        "username": title,
                        "avatarURL": avatar,
                        "embeds": [{
                            "color": parseInt(`0x${color}`),
                            "description":message
                        }]
                    })
                        .catch(error => {
                            console.log(error);
                            return channel.send('**Terjadi masalah saat meluncurkan webhook. Silahkan cek konsol.**');
                        })
                    }
    
            })
    
    }


// Listener Event
client.on('message', async message => {

    let msg = message.content.toUpperCase();
    let sender = message.author;
    let args = message.content.slice(prefix.length).trim().split(/ +/g);
    let command = args.shift().toLowerCase();
        
    // Perintah

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

    // USERINFO
    if (msg.startsWith(prefix + 'USERINFO')) {

        let member = message.mentions.members.first();
        
        if (!member) {
            const embed = new Discord.MessageEmbed()

            .setAuthor(`${message.author.username}`, message.author.displayAvatarURL())
            .setDescription(`Displaying your current **information**`)
            .setColor(0xc61145)
            .setFooter("© Indonesia | BETA v2.06 | discord.js")
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
        .setColor(0xc61145)
        .setFooter("© Indonesia | BETA v2.06 | discord.js")
        .setTimestamp()
        .setThumbnail(member.user.displayAvatarURL())

        .addField("Username:", `${member.user.username}#${member.user.discriminator}`)
        .addField("Created At:", `${member.user.createdAt}`)
        .addField("ID Member:", `${member.user.id}`)

        message.channel.send({embed})
    }

    // SERVERINFO
    if (msg === prefix + 'SERVERINFO') {
        const embed = new Discord.MessageEmbed()

        .setColor(0x474747)
        .setTitle(`Owner by ${message.guild.owner.user.tag} / ${message.guild.ownerID}`)
        .setDescription(`Server info untuk: ${message.guild}`)
        .setFooter("© Indonesia | BETA v2.06 | discord.js")
        .setThumbnail(message.guild.iconURL())
        .setTimestamp()

        .addField("Channels:", `${message.guild.channels.size}`, true)
        .addField("Members:", `**[${message.guild.members.size}]**`, true)
        .addField("Roles:", `${message.guild.roles.size}`, true)
        .addField("Region:", `${message.guild.region}`, true)
        .addField("ID:", `${message.guild.id}`, true)
        .addField("Created At:", message.guild.createdAt)

        message.channel.send({embed})
    }

    // SAYEMBED
    if (msg.startsWith(prefix + 'EMBED')) {
        if (msg === prefix + 'EMBED') {
            const embed = new Discord.MessageEmbed()

            .setDescription(`${prefix}embed <teks>`)

            return message.channel.send({embed})
        }

        let embedarg = args.slice(0).join(' ');

        message.delete()

        const embed = new Discord.MessageEmbed()

            .setDescription(`${embedarg}`)
            .setColor(0xff2f2f)

            message.channel.send({embed})
    }

    // PING
    if (msg === prefix + 'PING') {
        message.react("✅")

        const embed = new Discord.MessageEmbed()
        .setTitle("System Informations")
        .setDescription("default: localhost")
        .setColor(0xefce28)
        .setFooter("© Indonesia | BETA v2.06 | discord.js")
        .setTimestamp()

        .addField(":ping_pong: | Pong!", new Date().getTime() - message.createdTimestamp + ` ms.`)

        message.channel.send({embed});
    }

    // INFO
    if (msg === prefix + 'INFO') {
        const embed = new Discord.MessageEmbed()

        .setColor(0x19fca1)
        .setFooter("© Indonesia | BETA v2.06 | discord.js")
        .setTimestamp()
        
        .addField("Bot Owner:", "Ray#2221")
        .addField("Launched At:", "Samarinda, East Kalimantan / 12 December 2017")
        .addField("Community Manager/Maintenance Technician:", "ItzMeDwii#9748")
        .addField("Tester By:", "The Clu Craft#1063 / Hazim_Tito#9307")
        .addField("Software:", "Visual Studio / Node.js / Heroku (recently for online it)")
        .addField("Library:", "Discord.js")
        .addField("Version:", "BETA v2.06")

        message.channel.send({embed});
    }

    // UPDATE
    if (msg === prefix + 'CHANGELOG') {
        message.channel.send(":information_source: Update **[21th January 2018]** \n\n:white_check_mark: | **Fitur baru:** \n\n• `cry` ditambahkan. \n• `serverinfo` ditambahkan. \n• tag userinfo & avatar available. \n\n:no_entry: | **Fixed:** \n\n• bug on air heroku. \n• uptime di `stats` command. \n• `versi bot` diganti menjadi v2.06")
    }

    // BOTINFO
    String.prototype.toHHMMSS = function () {
        var sec_num = parseInt(this, 10); // don't forget the second param
        var hours   = Math.floor(sec_num / 3600);
        var minutes = Math.floor((sec_num - (hours * 3600)) / 60);
        var seconds = sec_num - (hours * 3600) - (minutes * 60);
    
        if (hours   < 10) {hours   = "0"+hours;}
        if (minutes < 10) {minutes = "0"+minutes;}
        if (seconds < 10) {seconds = "0"+seconds;}
        var time    = hours+':'+minutes+':'+seconds;
        return time;
    }

    var time = process.uptime();
    var uptime = (time + "").toHHMMSS();

    if (msg === prefix + 'STATS') {
        const embed = new Discord.MessageEmbed()
        .setColor(0x474747)
        .setFooter("© Indonesia | BETA v2.06 | discord.js")
        .setTimestamp()

        .addField("Server Joined:", `**${client.guilds.size}** guilds/servers.`)
        .addField("Total User in the Server Joined:", `**${client.users.size}** users total.`)
        .addField("Uptime:", uptime)

        message.channel.send({embed});
    }

    // AVATAR
    if (msg === prefix + 'AVATAR') {
        message.react("✅");
        let member = message.mentions.members.first();
        if (!member) {
            const embed = new Discord.MessageEmbed()
            .setTitle("User Informations")
            .setDescription("Displaying your current avatar.")
            .setColor(0xc61145)
            .setFooter("© Indonesia | BETA v2.06 | discord.js")
            .setTimestamp()
            .setImage(message.author.displayAvatarURL())

            return message.channel.send({embed});
        }

        const embed = new Discord.MessageEmbed()
            .setTitle("User Informations")
            .setDescription("Displaying your current avatar.")
            .setColor(0xc61145)
            .setFooter("© Indonesia | BETA v2.06 | discord.js")
            .setTimestamp()
            .setImage(member.user.displayAvatarURL())

            message.channel.send({embed});
    }

    // TANYA JAWAB
    var tanyas = ['Ya.', 'Tidak.', 'Mungkin.']

    if (msg.startsWith(prefix + 'TANYA')) {
        if (msg === prefix + 'TANYA') {
            return message.reply(prefix + 'tanya <pertanyaan kamu>')
        }

        const embed = new Discord.MessageEmbed()
        .setDescription(tanyas[Math.floor(Math.random() * tanyas.length)])
        .setColor(0x4286f4)

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

    // FAKTA KUCING
    var kucing = ['Tahukah kamu? Bahwa Kucing disebut juga kucing domestik atau kucing rumah adalah sejenis mamalia karnivora dari keluarga Felidae.', 'Kucing disebut dalam bentuk ilmiah:  Felis Catus.', 'Kucing hanya bisa bertahun hidup selama 4 - 5 tahun di alam Bebas.', 'Kalian tahu gak? Kalau kucing mempunyai proses tidur dengan jangka waktu yang sangat lama. Yaitu 12 jam hingga 16 jam daripada jam tidur **Manusia**.', 'Tahukah kamu? Suhu tubuh kucing itu normalnya 38.8 derajat Celsius atau 102 derajat Fahrenheit.', 'Kucing dapat menarik nafasnya selama 20 - 40 kali per menit.', 'Tahukah kamu? Rata-rata kucing mempunyai umur minimal 15 hingga 16 tahun.', 'Tahukah kamu? Kucing pun memakan rumput untuk memperbaiki/membersihkan pencernaannya dan membantu mengeluarkan bulu-bulu yang tertelan dan menumpuk di Lambung.', 'Tahukah kamu? Kucing benci sekali mencium bau aroma Jeruk dan Lemon, sekaligus dia benci parfum lho.', 'Tahukah kamu? Cakupan pandangan kucing 185 derajat lho.', 'Tahukah kamu? Orang yang alergi terhadap kucing pada umumnya alergi terhadap air liur kucing.', "Kucing kampung dapat lari dengan kecepatan 31 mil per jam.", 'Kucing memiliki 230 tulang, yaitu 24 kali lebih banyak dari manusia.', 'Seekor kucing mengetahui perubahan dalam suasana hati kamu, dan kadang-kadang itu akan mempengaruhi kucing kamu lho.', 'Kucing dapat melompat ke ketinggian 5 kali tinggi badannya.', 'Tahukah kamu? Ada sekitar 9600 helai rambut tiap cm2 kulit bagian atas dan sekitar 19200 helai rambut tiap cm2 kulit bagian bawah.']

    if (msg.startsWith(prefix + 'CATFACT')) {
        message.reply(kucing[Math.floor(Math.random() * kucing.length)]);
    }
 
    // WEBHOOK
    if (msg.startsWith(prefix + 'HOOK')) {

        message.delete();

        if (msg === prefix + 'HOOK') {
            return hook(message.channel, 'Instant Webhook Usage', `${prefix}hook <title>, <message>, [WARNAHEX], [AVATARURL]\n\n**<> rekomendasikan\n[] sesuaikan**\n\n[WARNAHEX] Ambil warna tersebut dari HEX: ff2f2f dan hapus **#** \n[AVATARURL] Dapat diambil dengan command **]avatar** dan copy link avatar tsb.`,'ff2f2f','https://cdn4.iconfinder.com/data/icons/technology-devices-1/500/speech-bubble-128.png');
        }

        let hookArgs = message.content.slice(prefix.length + 4).split(",");

        hook (message.channel, hookArgs[0], hookArgs[1], hookArgs[2], hookArgs[3]);

    }

    // SUPPORT
    if (msg.startsWith(prefix + 'SUPPORT')) {
        message.react("✅")
        message.reply('**AKTIFKAN SISTEM IZIN MEMBER DIRECT MESSAGES!**')
        message.author.send('SUPPORT OUR VIA PATREON \n\n**Indonesia Discord Bot Guild**: http://patreon.com/indonesian https://discord.gg/TjnmrMx \n+62 822 5337 9091 VIA PULSA TELKOMSEL & KARTU AS');
    }

    // HELP (SEDERHANA)
    if (msg.startsWith(prefix + 'HELP')) {
        message.react("✅")

        const embed = new Discord.MessageEmbed()

        .setColor(0x19fca1)
        .setFooter("© Indonesia | BETA v2.06 | discord.js")
        .setTimestamp()
        
        .addField("GENERAL & UTILITAS:", "`help` `avatar` `info` `ping` `changelog` `userinfo` `hook` `support` `stats`")
        .addField("FUN & MOODBOOSTER:", "`cat` `dog` `lewd` `hug` `cry` `meow` `tanya` `catfact` `say` `embed`")
        .addField("MODERATOR:", "`kick` `ban` `mute`")
        .addField("MUSIC:", "Under Maintenance")
        .addBlankField(true)
        .addField("Invite & UPVOTES:", "[Click here to invite the bot into your server](https://discordbots.org/bot/383183866925678604)")
        .addField("Support:", "[Click here to the Official Discord Server](https://discord.gg/754HKBP)")    
    
        message.channel.send({embed});
    }   
                 
    // ------------------------- //
    // KATA KATA KOTOR (BANNED) //

    const swearWords = ["nigga", "faggot", "ngentot", "kontol", "kntl", "kntI", "ngentod", "bangsad", "bangsat", "bgst", "bgsd", "pantek", "itil", "jancok", "babi", "entot", "sange", "sangek", "bangsaad", "bangsa-t"]
    if (swearWords.some(word => message.content.includes(word)) ) {
        message.delete(1000).then(msg => message.reply("LANGUAGE! :rage:"))
    }

    // MUTE
    if (msg.startsWith(prefix + 'MUTE')) {
        if (!message.member.roles.some(r=>["Bot Commander", "Chat Moderator", "Administrator", "Moderator", "Owner"].includes(r.name)) )
            return message.reply("Kamu tidak punya izin untuk hal ini! \n\nIngredients: \nChat Moderator \nBot Commander \nAdministrator \nModerator \nOwner");

        let member = message.mentions.members.first();
        if (!member)
        return message.reply("Mohon mention member yang ingin anda mute! \n**Usage:** ]mute <member> <waktu> \n\n**Rumus**: 1d = 1hari, 1h = 1jam, 1m = 1mnt, 1d = 1dtk, 1ms = 1milidtk");

        let muteRole = message.guild.roles.find("name", "Muted");
        if (!muteRole)
        return message.reply("Mohon tambahkan role **Muted** secara manual! \n**Usage:** ]mute <member> <waktu> \n\n**Rumus**: 1d = 1hari, 1h = 1jam, 1m = 1mnt, 1d = 1dtk, 1ms = 1milidtk")

        let time = args[1];
        if (!time)
        return message.reply("Mohon masukkan waktu mute-nya! \n**Usage:** ]mute <member> <waktu> \n\n**Rumus**: 1d = 1hari, 1h = 1jam, 1m = 1mnt, 1d = 1dtk, 1ms = 1milidtk")

        await member.addRole(muteRole.id)
            .catch(error => message.reply(`Maaf ${message.author} Saya tidak bisa mute member ini: ${error}`));
        message.channel.send(`${member.user.tag} dimute selama ${ms(ms(time), {long: true})}`);

        setTimeout(function() {
            member.removeRole(muteRole.id)
            message.channel.send(`${user.tag} Unmuted. Chat dengan bijak dan ikuti peraturan. \n**WAKTU TERAKHIR MUTED**: ${ms(ms(time), {long: true})}`)
        }, ms(time));
    }

    // KICK
    if (msg.startsWith(prefix + 'KICK')) {

        if (!message.member.hasPermission('KICK_MEMBERS'))
            return message.channel.send({embed: {
                color: 0xff2f2f,
                author: {
                    icon_url: client.user.avatarURL()
                },
                title: "Kick clarification.",
                description: "Gagal untuk mengidentifikasi author.",
                fields: [{
                    name: "Anda tidak mempunyai akses untuk menggunakan perintah ini.",
                    value: "Membutuhkan permissions: **Kick Members**"
                }
            ],
            timestamp: new Date(),
            footer: {
              icon_url: client.user.avatarURL,
              text: "© Indonesia | BETA v2.06 | discord.js"
            }
        }
    });
        
        let member = message.mentions.members.first();
        if (!member)
            return message.channel.send({embed: {
                color: 0xff2f2f,
                author: {
                    icon_url: client.user.avatarURL()
                },
                title: "Kick clarification.",
                description: "Gagal untuk mengidentifikasi member.",
                fields: [{
                    name: "Mohon mention Member yang ingin anda Kick dari server ini.",
                    value: `**Usage:** ${prefix}kick <member> <alasan/reason>`
                }
            ],
            timestamp: new Date(),
            footer: {
            icon_url: client.user.avatarURL(),
            text: "© Indonesia | BETA v2.06 | discord.js"
            }
        }
    });
        if (!member.kickable) 
            return message.channel.send({embed: {
                color: 0xff2f2f,
                author: {
                    icon_url: client.user.avatarURL()
                },
                title: "Kick clarification.",
                url: "https://support.discordapp.com/hc/en-us/articles/214836687-Role-Management-101",
                description: "Role hierachi 101.",
                fields: [{
                    name: "Tidak bisa Kick member ini.",
                    value: "Role hierachi? Member ini lebih tinggi dari bot ini?"
                }
            ],
            timestamp: new Date(),
            footer: {
              icon_url: client.user.avatarURL(),
              text: "© Indonesia | BETA v2.06 | discord.js"
            }
        }
    });
        
        // slice(1) removes the first part, which here should be the user mention!
        let reason = args.slice(1).join(' ');
        if (!reason)
            return message.channel.send({embed: {
                color: 0xff2f2f,
                author: {
                    icon_url: client.user.avatarURL()
                },
                title: "Kick clarification.",
                description: "Aduh, tamatlah saya!",
                fields: [{
                    name: "Masukkan reason/alasan mengapa Member ini Dikick dari server ini?",
                    value: `**Usage:** ${prefix}kick <member> <alasan/reason>`
                }
            ],
            timestamp: new Date(),
            footer: {
            icon_url: client.user.avatarURL(),
            text: "© Indonesia | BETA v2.06 | discord.js"
            }
        }
    });
        
        // Now, time for a swift kick in the nuts!
        await member.kick(reason)
            .catch(error => message.reply(`Maaf ${message.author} Saya tidak bisa kick member ini: ${error}`));
            return message.channel.send(`${member.user.tag} telah dikick!`)
    }


    // BAN
    if (msg.startsWith(prefix + 'BAN')) {
        if (!message.member.hasPermission('BAN_MEMBERS'))
            return message.channel.send({embed: {
                    color: 0xff2f2f,
                    author: {
                        icon_url: client.user.avatarURL()
                    },
                    title: "Ban clarification.",
                    description: "Gagal untuk mengidentifikasi author.",
                    fields: [{
                        name: "Anda tidak mempunyai akses untuk menggunakan perintah ini.",
                        value: "Membutuhkan permissions: **Ban Members**"
                    }
                ],
                timestamp: new Date(),
                footer: {
                  icon_url: client.user.avatarURL,
                  text: "© Indonesia | BETA v2.06 | discord.js"
                }
            }
        });
        
        
        let member = message.mentions.members.first();
        if (!member)
            return message.channel.send({embed: {
                color: 0xff2f2f,
                author: {
                    icon_url: client.user.avatarURL()
                },
                title: "Ban clarification.",
                description: "Gagal untuk mengidentifikasi member.",
                fields: [{
                    name: "Mohon mention Member yang ingin anda Ban dari server ini.",
                    value: `**Usage:** ${prefix}ban <member> <alasan/reason>`
                }
            ],
            timestamp: new Date(),
            footer: {
              icon_url: client.user.avatarURL(),
              text: "© Indonesia | BETA v2.06 | discord.js"
            }
        }
    });

        if (!member.bannable) 
            return message.channel.send({embed: {
                color: 0xff2f2f,
                author: {
                    icon_url: client.user.avatarURL()
                },
                title: "Ban clarification.",
                url: "https://support.discordapp.com/hc/en-us/articles/214836687-Role-Management-101",
                description: "Role hierachi 101.",
                fields: [{
                    name: "Tidak bisa Ban member ini.",
                    value: "Role hierachi? Member ini lebih tinggi dari bot ini?"
                }
            ],
            timestamp: new Date(),
            footer: {
              icon_url: client.user.avatarURL(),
              text: "© Indonesia | BETA v2.06 | discord.js"
            }
        }
    });
    
        let reason = args.slice(1).join(' ');
        if (!reason)
            return message.channel.send({embed: {
                color: 0xff2f2f,
                author: {
                    icon_url: client.user.avatarURL()
                },
                title: "Ban clarification.",
                description: "Mengapa? Bagaimana?",
                fields: [{
                    name: "Masukkan reason/alasan mengapa Member ini Dibanned dari server ini?",
                    value: `**Usage:** ${prefix}ban <member> <alasan/reason>`
                }
            ],
            timestamp: new Date(),
            footer: {
              icon_url: client.user.avatarURL(),
              text: "© Indonesia | BETA v2.06 | discord.js"
            }
        }
    });
        
        await member.ban(reason)
            .catch(error => message.reply(`Maaf ${message.author} Saya tidak bisa Ban member ini: ${error}`));
            return message.channel.send(`${member.user.tag} telah dibanned!`)
    }

});

client.on("ready", () => {
    console.log('Bot Dimulai.');
    var statusPlaying = ["Yeah boi.", "ew.", "Cannot read a property '69' of undefined.", "hm....", "Kangen kamuh.", "discordbots.org boi", "Ewing Squad.", "SOMEBODY TOUCH MY SPAGHETT!!! | ]help", "WAAAAAAAAAAAAAAAAAAH", "J U S T  M O N I K A", "JOIN INDONESIA OFFICIAL SERVER | ]help", "DA BEST BOT EVAHHHHHHH | ]help", "]", "DO YOU KNOW DA WEY?!", "Eta Terangkanlah", "OM TELOLET OMMM!!!", "KIDS JAMAN NOW GENERASI MICHIN", "1 + 1 = 6", "MODUS (MODAL KARDUS)", "BOT DENGAN RESOURCE TERPENDYDYCK", `${client.users.size} users / ${client.guilds.size} servers`, "ALAN SURYAAAAAAAJANA"]

    var interval = setInterval (function () {
        client.user.setPresence({ activity: { name: statusPlaying[Math.floor(Math.random() * statusPlaying.length)], type: 0 }})
    }, 1 * 25000);
    
    var interval = setInterval (function () {
        client.user.setPresence({ activity: { name: statusPlaying[Math.floor(Math.random() * statusPlaying.length)], type: 0 }})
    }, 1 * 25000);

})

client.login(process.env.BOT_TOKEN);
