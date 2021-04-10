const { Client, Message, MessageEmbed, Guild } = require("discord.js");
const acar = require("../Reference/acarGet");
module.exports = {
    Isim: "sesli",
    Komut: ["sesli"],
    Kullanim: "sesli",
    Aciklama: "Sunucunun seste olan üyelerinin sayısını gösterir.",
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
  if(!roller.kurucuRolleri.some(oku => message.member.roles.cache.has(oku)) &&  !roller.altYönetimRolleri.some(oku => message.member.roles.cache.has(oku)) &&  !roller.yönetimRolleri.some(oku => message.member.roles.cache.has(oku)) && !message.member.hasPermission('ADMINISTRATOR')) return;
  message.channel.wsend(`${client.emojis.cache.get(emojiler.Tag)} **Ses kanallarımız da ${acar.sayılıEmoji(message.guild.channels.cache.filter(channel => channel.type == "voice").map(channel => channel.members.size).reduce((a, b) => a + b))} kişi bulunmakta.**`).then(x => x.delete({timeout:10000})); 
  }
};