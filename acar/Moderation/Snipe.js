const { Client, Message, MessageEmbed, Guild } = require("discord.js");
const db = require("quick.db");
const moment = require('moment');
require('moment-duration-format');
module.exports = {
    Isim: "snipe",
    Komut: ["snipe"],
    Kullanim: "snipe",
    Aciklama: "Komutun kullanıldığı kanal da en son silinmiş mesajın içeriğini ve tarihini gösterir.",
    Kategori: "Yönetim",
    TekSunucu: true,
  /**
   * @param {Client} client 
   */
  onLoad: function (client) {
    client.on("messageDelete", async message => {
        if (message.channel.type === "dm" || !message.guild || message.author.bot) return;
        await db.set(`snipe.${message.guild.id}.${message.channel.id}`, { 
            yazar: message.author.id,
            yazilmaTarihi: message.createdTimestamp, 
            silinmeTarihi: Date.now(), 
            dosya: message.attachments.first() ? true : false });
        if (message.content) db.set(`snipe.${message.guild.id}.${message.channel.id}.icerik`, message.content);
    });
  },
  /**
   * @param {Client} client 
   * @param {Message} message 
   * @param {Array<String>} args 
   * @param {Guild} guild
   */
  onRequest: async function (client, message, args, guild) {
    if(!roller.kurucuRolleri.some(oku => message.member.roles.cache.has(oku)) && !roller.altYönetimRolleri.some(oku => message.member.roles.cache.has(oku)) &&  !roller.yönetimRolleri.some(oku => message.member.roles.cache.has(oku)) && !message.member.hasPermission('ADMINISTRATOR')) return message.channel.wsend(cevaplar.noyt);
    let mesaj = db.get(`snipe.${message.guild.id}.${message.channel.id}`);
    if (!mesaj) return message.channel.wsend('Hata: Bu Kanalda silinmiş bir mesaj yok!').then(x => x.delete(5000));
    let mesajYazari = await client.users.fetch(mesaj.yazar);
    let embed = new MessageEmbed().setDescription(`\`Atan Kişi:\` ${mesajYazari} \n\`Yazılma Tarihi:\` ${moment.duration(Date.now() - mesaj.yazilmaTarihi).format("D [gün], H [saat], m [dakika], s [saniye]")} önce\n\`Silinme Tarihi:\` ${moment.duration(Date.now() - mesaj.silinmeTarihi).format("D [gün], H [saat], m [dakika], s [saniye]")} önce ${mesaj.dosya ? "\n**Atılan mesaj dosya içeriyor**" : ""}`).setAuthor(mesajYazari.tag, mesajYazari.avatarURL()).setFooter(ayarlar.embed.altbaşlık).setColor("0x2F3236");
    if (mesaj.icerik) embed.addField('Mesajın İçeriği', mesaj.icerik);
    message.channel.wsend(embed).then(x => x.delete({timeout: 15000}));
    }
};