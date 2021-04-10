const { GuildMember, Guild, TextChannel, Message, MessageEmbed, ReactionCollector } = require("discord.js");
const Webhooklar = {};
const client = global.client;
const acarDatabase = require('./acarDatabase');
GuildMember.prototype.rolTanımla = function (rolidler = []) {
    let rol = this.roles.cache.clone().filter(e => e.managed).map(e => e.id).concat(rolidler);
    return this.roles.set(rol);
}

GuildMember.prototype.kayıtRolVer = function (rolidler = []) {
    let rol;
    if(this.roles.cache.has(roller.vipRolü)) { 
    rol = this.roles.cache.clone().filter(e => e.managed).map(e => e.id).concat(rolidler).concat(roller.vipRolü) 
    } else {
    rol = this.roles.cache.clone().filter(e => e.managed).map(e => e.id).concat(rolidler)
    };
    return this.roles.set(rol);
}

Guild.prototype.emojiGöster = function(emojiid) {
    let emoji = this.emojis.cache.get(emojiid)
    return emoji;
}

Guild.prototype.kanalBul = function(kanalisim) {
    let kanal = this.channels.cache.find(k => k.name === kanalisim)
    return kanal;
}

 /**
 * @param {String} id
 * @returns {GuildMember} 
 */

Guild.prototype.getMember = async function (id) {
    let member = this.member(id);
    if (!member) {
        try {
            member = await this.members.fetch(id);
        }
        catch (err) {
            member = undefined;
        }
    }
    return member;
}

Guild.prototype.log = async function log(cezano, user, admin, tip, channelName) {
    let channel = this.channels.cache.find(x => x.name === channelName);
    let tur;
    if(tip === "Susturulma") tur = "metin kanallarından susturuldu!"
    if(tip === "Seste Susturulma") tur = "ses kanallarından susturuldu!"
    if(tip === "Cezalandırılma") tur = "cezalandırıldı!"
    if(tip === "Uyarılma") tur = "uyarıldı!"
    if(tip === "Yasaklanma") tur = "yasaklandı!"
    if (channel) {
        let embed = new MessageEmbed()
          .setAuthor(ayarlar.embed.başlık, client.guilds.cache.get(ayarlar.sunucuID).iconURL({dynamic: true, size: 2048})).setColor(ayarlar.embed.renk)
          .setDescription(`${user} üyesi, **${tarihsel(Date.now())}** tarihinde ${admin} tarafından **${cezano.Sebep}** nedeniyle ${tur}`)
          .setFooter(ayarlar.embed.altbaşlık + ` • Ceza Numarası: #${cezano.No}`)

        channel.wsend(embed)
    }
}

Guild.prototype.unlog = async function unlog(channelName, uye, yetkili, tip, cezano) {
    let channel = this.channels.cache.find(x => x.name === channelName);
    let tur;
    if(cezano == "x") {
        if(tip == "unban") tur = "yasaklanması"
    } else {
        if(tip == "unban") tur = `\`#${cezano}\` numaralı yasaklanması`
        if(tip == "unjail") tur = `\`#${cezano}\` numaralı cezalandırılması`
        if(tip == "unmute") tur = `\`#${cezano}\` numaralı metin kanallarındaki susturulması`
        if(tip == "unsesmute") tur = `\`#${cezano}\` numaralı ses kanallarındaki susturulması`
    }
    if (channel) {
        let embed = new MessageEmbed()
          .setAuthor(ayarlar.embed.başlık, client.guilds.cache.get(ayarlar.sunucuID).iconURL({dynamic: true, size: 2048})).setColor(ayarlar.embed.renk)
          .setDescription(`${uye} uyesinin ${tur}, **${tarihsel(Date.now())}** tarihinde ${yetkili} tarafından kaldırıldı.`)
          .setFooter(ayarlar.embed.altbaşlık)
        channel.wsend(embed)
    }
}


Guild.prototype.kayıtLog = async function kayıtLog(yetkili, üye, cins, channelName) {
    let kanal = this.channels.cache.find(k => k.name === channelName);
    let cinsiyet;
    if(cins === "erkek") {
     cinsiyet = "Erkek"
    } else if(cins === "kadın") {
     cinsiyet = "Kadın"
    }
    if(kanal) {
        let embed = new MessageEmbed()
            .setAuthor(ayarlar.embed.başlık, client.guilds.cache.get(ayarlar.sunucuID).iconURL({dynamic: true, size: 2048})).setColor(ayarlar.embed.renk)
            .setDescription(`${üye} isimli üye **${tarihsel(Date.now())}** tarihinde ${yetkili} tarafından **${cinsiyet}** olarak kayıt edildi.`)
            .setFooter(ayarlar.embed.altbaşlık)

        kanal.wsend(embed)
    };
}

TextChannel.prototype.wsend = async function (content, options) {
    if (Webhooklar[this.id]) return (await Webhooklar[this.id].send(content, options));
    let entegrasyonlar = await this.fetchWebhooks();
    let webh = entegrasyonlar.find(e => e.name == client.user.username),
        result;
    if (!webh) {
        webh = await this.createWebhook(client.user.username, {
            avatar: client.user.avatarURL()
        });
        Webhooklar[this.id] = webh;
        result = await webh.send(content, options);
    } else {
        Webhooklar[this.id] = webh;
        result = await webh.send(content, options);
    }
    return result;
};
