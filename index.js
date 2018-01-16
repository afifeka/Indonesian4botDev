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

// Music Player
// CONTRIBUTOR - ini adalah npm.

// Pengaturan Global
const prefix = ']';

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
    var cat = "http://random.cat/meow"
    var request = require("request");
    const {get} = require("snekfetch"); 

    if (msg === prefix + 'CAT') {
        message.react("✅")
        try {
			get('https://random.cat/meow').then(response => {
                message.channel.send({files: [{attachment: response.body.file, name: `cat.${response.body.file.split('.')[2]}`}]});
            })
		} catch (e) {
			console.log(e);
		}
    }

    // USERINFO
    if (msg.startsWith(prefix + 'USERINFO')) {
        const embed = new Discord.MessageEmbed()

        .setAuthor(`${message.author.username}`, message.author.displayAvatarURL())
        .setDescription(`Displaying your current **information**`)
        .setColor(0xc61145)
        .setFooter("© Indonesia | BETA v1.91 | discord.js")
        .setTimestamp()
        .setThumbnail(message.author.displayAvatarURL())

        .addField("Username:", `${message.author.username}#${message.author.discriminator}`)
        .addField("Created At:", `${message.author.createdAt}`)
        .addField("ID Member:", `${message.author.id}`)

        message.channel.send({embed});
    }

    // SAYEMBED
    if (msg.startsWith(prefix + 'SAYEMBED')) {
        if (msg === prefix + 'SAYEMBED') {
            const embed = new Discord.MessageEmbed()

            .setDescription(`${prefix}sayembed <teks>`)

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
        .setDescription("ip localhost")
        .setColor(0xefce28)
        .setFooter("© Indonesia | BETA v1.91 | discord.js")
        .setTimestamp()

        .addField(":ping_pong: | Pong!", new Date().getTime() - message.createdTimestamp + ` ms.`)

        message.channel.send({embed});
    }

    // INFO
    if (msg === prefix + 'INFO') {
        const embed = new Discord.MessageEmbed()

        .setAuthor(`${message.author.username}`, message.author.displayAvatarURL())
        .setDescription(`Displaying bot information currently`)
        .setColor(0x19fca1)
        .setFooter("© Indonesia | BETA v1.91 | discord.js")
        .setTimestamp()
        
        .addField("BOT OWNER BY:", "Ray#2221")
        .addField("LAUNCHED AT:", "Samarinda, East Kalimantan / 12 December 2017")
        .addField("TESTER BY:", "ItzMeDwii#9748 / The Clu Craft#1063")
        .addField("SOFTWARE:", "Visual Studio / Node.js / Heroku (recently for online it)")
        .addField("LIBRARY:", "Discord.js")
        .addField("VERSION BOT", "BETA v1.91")

        message.channel.send({embed});
    }

    // UPDATE
    if (msg === prefix + 'UPDATE') {
        message.channel.send('**PENGEMBANGAN/PERBAIKAN/UPDATE-NOW-TOPIC** \n\n- Di perbarui command Avatar. \n- Command music ditutup karena Ray#2221 tidak dapat melakukannya sendiri. \n- Butuh kontributor untuk translator dan music. \n- Command baru. **Sayembed** \n- Perbaikan command tanya. \n- Pembaruan di bagian command Info / Help. \n- Quickpoll dihapus.')
    }

    // BOTINFO
    if (msg === prefix + 'BOTINFO') {
        const embed = new Discord.MessageEmbed()
        .setAuthor(`${message.author.username}`, message.author.displayAvatarURL())
        .setTitle("Bot Information")
        .setDescription("Displaying bot information currently")
        .setColor(0xc61145)
        .setFooter("© Indonesia | BETA v1.91 | discord.js")
        .setTimestamp()
        .addBlankField(true)

        .addField("Server Joined:", `**${client.guilds.size}** guilds/servers.`)
        .addField("Total User in the Server Joined:", `**${client.users.size}** users total.`)

        message.channel.send({embed});
    }

    // AVATAR
    if (msg === prefix + 'AVATAR') {
        message.react("✅");
        const embed = new Discord.MessageEmbed()
        .setTitle("User Informations")
        .setDescription("Displaying your current avatar.")
        .setColor(0xc61145)
        .setFooter("© Indonesia | BETA v1.91 | discord.js")
        .setTimestamp()
        .setImage(message.author.displayAvatarURL())

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
    if (msg.startsWith(prefix + 'KATAKAN')) {
        if (msg === prefix + 'KATAKAN') {
            return message.reply(prefix + 'katakan <kata-kata kamu>')
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

        .setTitle("Bot Informations")
        .setDescription(`Displaying all commands in this bot.`)
        .setColor(0x19fca1)
        .setFooter("© Indonesia | BETA v1.91 | discord.js")
        .setTimestamp()
        
        .addField("GENERAL & UTILITAS:", "`help` `avatar` `info` `ping` `update` `userinfo` `hook` ")
        .addField("FUN & MOODBOOSTER:", "`cat` `tanya` `catfact` `katakan` `sayembed`")
        .addField("MODERATOR:", "`kick` `ban` `mute`")
        .addField("MUSIC:", "Kami tidak bisa melakukannya sendiri, klik **Support** untuk mengkontribusi dengan kami.")
        .addBlankField(true)
        .addField("Invite:", "[Click here to invite the bot into your server](https://discordapp.com/oauth2/authorize?client_id=383183866925678604&scope=bot&permissions=2105015551)")
        .addField("Support:", "[Click here to the Official Discord Server](https://discord.gg/TjnmrMx)")    
    
        message.channel.send({embed});
    }   
                 
    // ------------------------- //
    // KATA KATA KOTOR (BANNED) //

    const swearWords = ["ngentot", "kontol", "kntl", "kntI", "ngentod", "bangsad", "bangsat", "bgst", "bgsd", "pantek", "itil", "jancok", "babi", "entot", "sange", "sangek", "bangsaad", "bangsa-t"]
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
              text: "© Indonesia | BETA v1.91 | discord.js"
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
            text: "© Indonesia | BETA v1.91 | discord.js"
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
              text: "© Indonesia | BETA v1.91 | discord.js"
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
            text: "© Indonesia | BETA v1.91 | discord.js"
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
                  text: "© Indonesia | BETA v1.91 | discord.js"
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
              text: "© Indonesia | BETA v1.91 | discord.js"
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
              text: "© Indonesia | BETA v1.91 | discord.js"
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
              text: "© Indonesia | BETA v1.91 | discord.js"
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
    var statusPlaying = ["SOMEBODY TOUCH MY SPAGHETT!!! | ]help", "WAAAAAAAAAAAAAAAAAAH", "J U S T  M O N I K A", "JOIN INDONESIA OFFICIAL SERVER | ]help", "DA BEST BOT EVAHHHHHHH | ]help", "]", "DO YOU KNOW DA WEY?!", "Eta Terangkanlah", "OM TELOLET OMMM!!!", "KIDS JAMAN NOW GENERASI MICHIN", "1 + 1 = 6", "MODUS (MODAL KARDUS)", "BOT DENGAN RESOURCE TERPENDYDYCK", `${client.users.size} users / ${client.guilds.size} servers`, "ALAN SURYAAAAAAAJANA"]
    var throwPlay = statusPlaying[Math.floor(Math.random() * statusPlaying.length)];

    var interval = setInterval (function () {
        client.user.setPresence({ activity: { name: `${throwPlay}`, type: 0 }})
    }, 1 * 15000);
    
    var interval = setInterval (function () {
        client.user.setPresence({ activity: { name: `${throwPlay}`, type: 0 }})
    }, 1 * 15000); 

})

client.login(process.env.BOT_TOKEN);
