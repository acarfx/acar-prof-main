const { Client, Message, MessageEmbed, Guild } = require("discord.js");
const acar = require("../Reference/acarGet");
module.exports = {
    Isim: "say",
    Komut: ["istatistik"],
    Kullanim: "say",
    Aciklama: "Sunucunun bütün verilerini gösterir",
    Kategori: "Yönetim",
  /**
   * @param {Client} client 
   */
  onLoad: function (client) {

  },
  /**
   * @param {Client} client 
   * @param {Message} message 
   * @param {Array<String>} args 
   * @param {Guild} guild
   */
  onRequest: async function (client, message, args, guild) {
    let embed = new MessageEmbed().setAuthor(ayarlar.embed.başlık, message.guild.iconURL({dynamic: true})).setColor(ayarlar.embed.renk)
  if(!roller.kurucuRolleri.some(oku => message.member.roles.cache.has(oku)) && !roller.altYönetimRolleri.some(oku => message.member.roles.cache.has(oku)) && !roller.yönetimRolleri.some(oku => message.member.roles.cache.has(oku)) && !message.member.hasPermission('ADMINISTRATOR')) return;
  let boosterRolu = roller.boosterRolü|| undefined;
  message.channel.wsend(embed.setFooter(ayarlar.embed.altbaşlık).setThumbnail(ayarlar.embed.iconURL).setDescription(`**${client.emojis.cache.get(emojiler.Tag)} Sunucumuz da ${acar.sayılıEmoji(message.guild.memberCount)} kişi bulunmakta.
${client.emojis.cache.get(emojiler.Tag)} Sunucumuz da ${acar.sayılıEmoji(message.guild.members.cache.filter(u => u.presence.status != "offline").size)} aktif kişi bulunmakta.
${client.emojis.cache.get(emojiler.Tag)} Sunucumuz da ${acar.sayılıEmoji(message.guild.members.cache.filter(u => u.user.username.includes(ayarlar.tag)).size)} taglı üye bulunmakta.
${client.emojis.cache.get(emojiler.Tag)} Sunucumuzu boostlayan ${acar.sayılıEmoji(message.guild.roles.cache.get(boosterRolu).members.size)} kişi bulunmakta.
${client.emojis.cache.get(emojiler.Tag)} Ses kanallarında ${acar.sayılıEmoji(message.guild.channels.cache.filter(channel => channel.type == "voice").map(channel => channel.members.size).reduce((a, b) => a + b))} kişi bulunmakta.**`)).then(x => x.delete({timeout:10000})); 
    }
};