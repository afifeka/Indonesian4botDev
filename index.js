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

    // INVITE
    if (msg === prefix + 'INVITE') {
        message.channel.send({embed: {
            color: 0xff2f2f,
            description: "Invite Informations",
            fields: [{
                name: "👤 Discord Server:",
                value: 'Join [Discord Server](https://discord.gg/SFsMR2G)'
            },
            {
                name: "📜 Invite Discord Bot:",
                value: 'Invite [Indonesia Discord Bot](https://discordapp.com/oauth2/authorize?client_id=383183866925678604&scope=bot&permissions=2105015551) Into Your Server.'
                },
            ],
            timestamp: new Date(),
            footer: {
                icon_url: client.user.avatarURL,
                text: "© Indonesia | BETA RELEASE | discord.js"
                }
            }
        });
        }

    // USERINFO
    if (msg.startsWith(prefix + 'USERINFO')) {
        message.channel.send({embed: {
            color: 0xff2f2f,
            description: "User Information",
            fields: [{
                name: "👤 Full Username:",
                value: `${message.author.username}#${message.author.discriminator}`
            },
            {
                name: "📜 ID:",
                value: message.author.id
            },
            {
                name: "📅 Created At",
                value: message.author.createdAt
                },
            ],
            timestamp: new Date(),
            footer: {
                icon_url: client.user.avatarURL,
                text: "© Indonesia | BETA RELEASE | discord.js"
                }
            }
        });
    }

    // PING
    if (msg === prefix + 'PING') {
        message.react("✅")
        let newMes = await message.channel.send('Pinging...');
        newMes.edit(new Date().getTime() - message.createdTimestamp + " ms. :ping_pong: Pong!");
    }

    // INFO
    if (msg === prefix + 'INFO') {
        message.channel.send('**BOT OWNER**: Ray#2221 \n**HELPER**: ItzMeDwii#9748\n**LAUNCHED**: 12 December 2017 (reseted) \n**LIBRARY**: Discord.js \n**SOFTWARE**: Visual Studio Code, Git Bash & Node.js \n**OFFICIAL RELEASE**: January 2018 \n**THANK YOU FOR SUPPORT ME**: TrueXPixels, Jordie, Aeirety, Mortixx & BlackB1RD \n**FEATURES COMING**: Kick/Ban & Timed Mute ');
    }

    // UPDATE
    if (msg === prefix + 'UPDATE') {
        message.channel.send('**PENGEMBANGAN/PERBAIKAN/UPDATE-NOW-TOPIC** \n\n- COMMAND USERINFO! \n- COMMAND TANYA! BARU! HAVE FUN!\n- COMMAND INVITE dengan gaya baru! \n- STATUS PLAYING BARU (bukan music player) \n- 30 GUILDS! THX! \n- BAN/KICK membutuhkan PERMISSIONS, BUKAN ROLE!');
    }
    

    // AVATAR
    if (msg === prefix + 'AVATAR') {
        message.react("✅");
        message.reply(message.author.displayAvatarURL());
    }

    // TANYA JAWAB
    var tanyas = ['Ya.', 'Tidak.', 'Mungkin.', 'Gak juga sih.', 'Tidak pernah.', 'Ya, dia terlalu baik bagiku.', 'Aku tidak suka dia.', 'Dia pintar dan cute.', 'Ya, dia jelek.', 'Gak bakalan.', 'Kalau saya liat-liat sih, Ya.', 'Sepertinya jarang.', 'Saya tidak tahu.', 'Bagus.', 'Jelek sekali.', 'Sepertinya, David Beckham.', 'Tidak, dia cringe.', 'Dia yang pemain tik-tok kan? Cringe sekaleh. :v', 'Ngawur.', 'Ya sih, tapi dia aja gak hiraukan kamu.', 'Gak ah.']

    if (msg.startsWith(prefix + 'TANYA')) {
        if (msg === prefix + 'TANYA') {
            if (!args[0])
            return message.reply(prefix + 'tanya <pertanyaan kamu>')
        }
        if (args[1]) message.reply(tanyas[Math.floor(Math.random() * tanyas.length)]);
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
        message.author.send('SUPPORT OUR VIA PATREON \n**4Brother Discord Bot Guild**: http://patreon.com/4brother https://discord.gg/Aze8zTz \n\n**Indonesia Discord Bot Guild**: http://patreon.com/indonesian https://discord.gg/TjnmrMx \n+62 822 5337 9091 VIA PULSA TELKOMSEL & KARTU AS');
    }

    // HELP (SEDERHANA)
    if (msg.startsWith(prefix + 'HELP')) {
        message.react("✅")
        message.channel.send('**SELAMAT DATANG DI INDONESIA DISCORD BOT GUILD!** \n*Bot ini mempunyai sistem Kick/Ban, Fun, dan Game! \nBuruan Invite Bot Ini Ke Server Kalian! \n\n**PREFIX SAAT INI:** ' + prefix + '\n\nNormal: `help`, `avatar`, `info`, `ping`, `update`, `invite`, `userinfo`, `hook` \nFun: `cat`, `tanya` \nModerator: `kick`, `ban`, `mute` \nMusic: `play`, `stop`')
    }

    // MUSIC AUDIO PLAYER
    // PLAY MUSIC COMMAND
    const yt = require('ytdl-core');

    var voice_connection = null;
    var voice_handler = null;
    var text_channel = null;

    if (msg.startsWith(prefix + 'PLAY')) {
        const voiceChannel = message.member.voiceChannel;
        if (!voiceChannel) {
            return message.channel.send({embed: {
                color: 0xff2f2f,
                description: "Mohon masuk ke salah satu voice channel!"
            }});
        }
        voiceChannel.join()
        .then(connection => {
        const args = message.content.split(" ").slice(1);
            let stream = yt(args.join(" "), {audioonly: true});
            yt.getInfo(args.join(" "), function(err, info) {
            const title = info.title
            message.channel.send({embed: {
                    color: 0xff2f2f,
                    description: `**Dimainkan sekarang:** ${title}`
                }});
            const dispatcher = connection.playStream(stream);
            })
        })
    }

    // STOP MUSIC COMMAND
    if (msg.startsWith(prefix + 'STOP')) {
        message.member.voiceChannel.leave()
        return message.channel.send({embed: {
            color: 0xff2f2f,
            description: "Musik dihentikan."
        }});
    }   
                
    // ------------------------- //
    // KATA KATA KOTOR (BANNED) //

    const swearWords = ["ngentot", "kontol", "kntl", "kntI", "ngentod", "bangsad", "bangsat", "bgst", "bgsd", "pantek", "itil", "jancok", "babi", "entot", "sange", "sangek", "bangsaad", "bangsa-t"]
    if (swearWords.some(word => message.content.includes(word)) ) {
    message.delete();
    message.reply('**LANGUAGE!** :rage:')
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
              text: "© Indonesia | BETA RELEASE | discord.js"
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
            text: "© Indonesia | BETA RELEASE | discord.js"
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
              text: "© Indonesia | BETA RELEASE | discord.js"
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
            text: "© Indonesia | BETA RELEASE | discord.js"
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
                  text: "© Indonesia | BETA RELEASE | discord.js"
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
              text: "© Indonesia | BETA RELEASE | discord.js"
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
              text: "© Indonesia | BETA RELEASE | discord.js"
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
              text: "© Indonesia | BETA RELEASE | discord.js"
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
    var interval = setInterval (function () {
        client.user.setPresence({ activity: { name: `${client.guilds.size} guilds | ]help`, type: 3 }})
    }, 1 * 20000);
    
    var interval = setInterval (function () {
        client.user.setPresence({ activity: { name: `${client.users.size} users | ]update`, type: 3 }})
    }, 1 * 20500); 

});

client.login(process.env.BOT_TOKEN);
