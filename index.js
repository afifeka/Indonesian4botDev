// Mengaktifkan Package NPM.js
const Discord = require('discord.js');
const bot = new Discord.Client();
const fs = require("fs");
const ms = require("ms");

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
bot.on('message', async message => {

    let msg = message.content.toUpperCase();
    let sender = message.author;
    let args = message.content.slice(prefix.length).trim().split(/ +/g);
    let command = args.shift().toLowerCase();
        
    // Perintah

    // KUCING RANDOM
    var cats = ["http://gph.is/Q4BXP3", "http://gph.is/2d8adKP", "http://gph.is/12Si8vm", "http://gph.is/1U0wvs6", "http://gph.is/2vKVWeD", "http://gph.is/11lX02t", "http://gph.is/1OE03xm", "**Gotcha! Kamu gak dapat kucing, kasihan. :joy: **", "https://gph.is/Z0lius", "https://gph.is/28JB2i8", "https://gph.is/15HR0SL", "https://gph.is/2cDbxCu", "https://media.giphy.com/media/vFKqnCdLPNOKc/giphy.gif", "https://media.giphy.com/media/MDJ9IbxxvDUQM/giphy.gif", "https://media.giphy.com/media/JIX9t2j0ZTN9S/giphy.gif", "https://media.giphy.com/media/xJjs8eGVbjNYY/giphy.gif", "https://media.giphy.com/media/3o84U1k2yyjoCQydZm/giphy.gif", "https://media.giphy.com/media/26FPCXdkvDbKBbgOI/giphy.gif", "https://media.giphy.com/media/11fucLQCTOdvBS/giphy.gif", "https://media.giphy.com/media/10rW4Xw9eO0RmU/giphy.gif", "https://media.giphy.com/media/10dU7AN7xsi1I4/giphy.gif", "https://media.giphy.com/media/uTCAwWNtz7U2c/giphy.gif", "https://media.giphy.com/media/3oEduSbSGpGaRX2Vri/giphy.gif"]
    var throwCat = cats[Math.floor(Math.random() * cats.length)];

    if (msg === prefix + 'CAT') {
        message.react("✅");
        message.channel.send(`:cat: Random cat. \n${throwCat}`)
    }

    // USERINFO
    if (msg === prefix + 'USERINFO') {
        message.channel.send(`**Username:** ${user.username} \n**Joined Discord:** ${user.createdTimestamp} \n**Message sent counted:** ${user.lastMessageID}`)
    }

    // ANJING RANDOM
    var dogs = ["https://media.giphy.com/media/l378p0VvTts3st2RG/giphy.gif", "https://media.giphy.com/media/DvyLQztQwmyAM/giphy.gif", "https://media.giphy.com/media/dTJd5ygpxkzWo/giphy.gif", "https://media.giphy.com/media/WZP3qaxYj10gU/giphy.gif", "https://media.giphy.com/media/2FhASosZtLUPe/giphy.gif", "**Gotcha! Kamu gak dapat anjing, kasihan. :joy: **", "https://media.giphy.com/media/RQSuZfuylVNAY/giphy.gif", "https://media.giphy.com/media/Pn1gZzAY38kbm/giphy.gif", "https://media.giphy.com/media/mCRJDo24UvJMA/giphy.gif", "https://media.giphy.com/media/IWon6VgzVwEnu/giphy.gif"]
    var throwDog = dogs[Math.floor(Math.random() * dogs.length)];

    if (msg === prefix + 'DOG') {
        message.react("✅");
        message.channel.send(`:dog: Random dog. \n${throwDog}`)
    }

    // INVITE
    if (msg === prefix + 'INVITE') {
        message.channel.send('https://discordapp.com/oauth2/authorize?client_id=383183866925678604&scope=bot&permissions=2146958591 \n\nhttps://discord.gg/jUHU2vu')
    }

    // PING
    if (msg === prefix + 'PING') {
        message.react("✅")
        let newMes = await message.channel.send('Pinging...');
        newMes.edit(new Date().getTime() - message.createdTimestamp + " ms.");
    }

    // INFO
    if (msg === prefix + 'INFO') {
        message.channel.send('**BOT OWNER**: Ray#2221 \n**HELPER**: ItzMeDwii#9748\n**LAUNCHED**: 12 December 2017 (reseted) \n**LIBRARY**: Discord.js \n**SOFTWARE**: Visual Studio Code, Git Bash & Node.js \n**OFFICIAL RELEASE**: January 2018 \n**THANK YOU FOR SUPPORT ME**: TrueXPixels, Jordie, Aeirety, Mortixx & BlackB1RD \n**FEATURES COMING**: Kick/Ban & Timed Mute ');
    }

    // UPDATE
    if (msg === prefix + 'UPDATE') {
        message.channel.send('**PENGEMBANGAN/PERBAIKAN/UPDATE-NOW-TOPIC** \n\n- Alts not supported in this bot again. \n- Ban Kick Mute diubah, & diperbaiki');
    }

    // AVATAR
    if (msg === prefix + 'AVATAR') {
        message.react("✅");
        message.reply(message.author.displayAvatarURL());
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
        message.channel.send('**SELAMAT DATANG DI INDONESIA DISCORD BOT GUILD!** \n*Bot ini mempunyai sistem Kick/Ban, Fun, dan Game!* \n*Bot ini juga tersedia ALTS MINECRAFT RANDOM dan terdapat akun MC SFA dan NFA!* \nBuruan Invite Bot Ini Ke Server Kalian! \n\n**PREFIX SAAT INI:** ' + prefix + '\n\nNormal: `help`, `avatar`, `info`, `ping`, `update`, `invite`, `hook` \nFun: `cat`, `dog`, `alts` \nModerator: `kick`, `ban`, `unmute`, `mute` \nMusic: `play`, `stop`')
    }

    // MUSIC AUDIO PLAYER
    // PLAY MUSIC COMMAND
    const yt = require('ytdl-core');
    const ffmpeg = require('ffmpeg-binaries')

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

    const swearWords = ["ngentot", "kontol", "kntl", "kntI", "ngentod", "bangsad", "bangsat", "bgst", "bgsd", "pantek", "itil", "bego", "jancok", "babi", "entot", "sange", "sangek"]
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

    // UNMUTE
    if (msg.startsWith(prefix + 'UNMUTE')) {
        let member = message.mentions.members.first();
        member.removeRole(muteRole.id)
            return message.channel.send({embed: {
                color: 0xff2f2f,
                author: {
                    icon_url: bot.user.avatarURL()
                },
                title: "Muted system.",
                description: "Unmuted.",
            timestamp: new Date(),
            footer: {
            icon_url: bot.user.avatarURL,
            text: "© Indonesia | BETA RELEASE | discord.js"
            }
        }
    });
    }

    // KICK
    if (msg.startsWith(prefix + 'KICK')) {

        if (!message.member.roles.some(r=>["Bot Commander", "Chat Moderator", "Administrator", "Moderator", "Owner"].includes(r.name)) )
            return message.channel.send({embed: {
                color: 0xff2f2f,
                author: {
                    icon_url: bot.user.avatarURL()
                },
                title: "Kick clarification.",
                description: "Gagal untuk mengidentifikasi author.",
                fields: [{
                    name: "Anda tidak mempunyai akses untuk menggunakan perintah ini.",
                    value: "Bot Commander, Chat Moderator, Moderator, Administrator, Owner"
                }
            ],
            timestamp: new Date(),
            footer: {
              icon_url: bot.user.avatarURL,
              text: "© Indonesia | BETA RELEASE | discord.js"
            }
        }
    });
        
        let member = message.mentions.members.first();
        if (!member)
            return message.channel.send({embed: {
                color: 0xff2f2f,
                author: {
                    icon_url: bot.user.avatarURL()
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
            icon_url: bot.user.avatarURL(),
            text: "© Indonesia | BETA RELEASE | discord.js"
            }
        }
    });
        if (!member.kickable) 
            return message.channel.send({embed: {
                color: 0xff2f2f,
                author: {
                    icon_url: bot.user.avatarURL()
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
              icon_url: bot.user.avatarURL(),
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
                    icon_url: bot.user.avatarURL()
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
            icon_url: bot.user.avatarURL(),
            text: "© Indonesia | BETA RELEASE | discord.js"
            }
        }
    });
        
        // Now, time for a swift kick in the nuts!
        await member.kick(reason)
            .catch(error => message.reply(`Maaf ${message.author} Saya tidak bisa kick member ini: ${error}`));
            message.channel.send({embed: {
                color: 0xffa500,
                author: {
                    icon_url: bot.user.avatarURL()
                },
                title: "Kick Clarification",
                description: "Yah, balikin saya lagi dong...",
                fields: [{
                    name: "Info:",
                    value: `${user.tag} dikick oleh ${message.author}`
                },
                {
                    name: "Alasan:",
                    value: `${reason}`
                }
            ],
                timestamp: new Date(),
                footer: {
                    icon_url: bot.user.avatarURL(),
                    text: "© Indonesia | BETA RELEASE | discord.js"
                }
            }
        });
    
    }


    // BAN
    if (msg.startsWith(prefix + 'BAN')) {
        if (!message.member.roles.some(r=>["Bot Commander", "Chat Moderator", "Administrator", "Moderator", "Owner"].includes(r.name)) )
            return message.channel.send({embed: {
                    color: 0xff2f2f,
                    author: {
                        icon_url: bot.user.avatarURL()
                    },
                    title: "Ban clarification.",
                    description: "Gagal untuk mengidentifikasi author.",
                    fields: [{
                        name: "Anda tidak mempunyai akses untuk menggunakan perintah ini.",
                        value: "Bot Commander, Chat Moderator, Moderator, Administrator, Owner"
                    }
                ],
                timestamp: new Date(),
                footer: {
                  icon_url: bot.user.avatarURL,
                  text: "© Indonesia | BETA RELEASE | discord.js"
                }
            }
        });
        
        
        let member = message.mentions.members.first();
        if (!member)
            return message.channel.send({embed: {
                color: 0xff2f2f,
                author: {
                    icon_url: bot.user.avatarURL()
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
              icon_url: bot.user.avatarURL(),
              text: "© Indonesia | BETA RELEASE | discord.js"
            }
        }
    });

        if (!member.bannable) 
            return message.channel.send({embed: {
                color: 0xff2f2f,
                author: {
                    icon_url: bot.user.avatarURL()
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
              icon_url: bot.user.avatarURL(),
              text: "© Indonesia | BETA RELEASE | discord.js"
            }
        }
    });
    
        let reason = args.slice(1).join(' ');
        if (!reason)
            return message.channel.send({embed: {
                color: 0xff2f2f,
                author: {
                    icon_url: bot.user.avatarURL()
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
              icon_url: bot.user.avatarURL(),
              text: "© Indonesia | BETA RELEASE | discord.js"
            }
        }
    });
        
        await member.ban(reason)
            .catch(error => message.reply(`Maaf ${message.author} Saya tidak bisa Ban member ini: ${error}`));
            return message.channel.send({embed: {
                color: 0xffa500,
                author: {
                    icon_url: bot.user.avatarURL()
                },
                title: "Banned Clarification",
                description: "Dia barusan kena banned?",
                fields: [{
                    name: "Info:",
                    value: `${user.tag} dibanned oleh ${message.author}`
                },
                {
                    name: "Alasan:",
                    value: `${reason}`
                }
            ],
                timestamp: new Date(),
                footer: {
                    icon_url: bot.user.avatarURL(),
                    text: "© Indonesia | BETA RELEASE | discord.js"
                }
            }
        });
        await message.channel.send('https://giphy.com/gifs/H99r2HtnYs492')
    }

});

bot.on("ready", () => {
    console.log('Bot Dimulai.');
    bot.user.setPresence({ activity: { name: `${bot.guilds.size} servers | ]help`, type: 0 } });
});

bot.login(process.env.BOT_TOKEN);
