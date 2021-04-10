const { Client, Message, MessageEmbed} = require("discord.js");
const acar = require("../Reference/acarGet");
const acarDatabase = require("../Reference/acarDatabase");
module.exports = {
    Isim: "topteyit",
    Komut: ["Topteyit"],
    Kullanim: "topteyit",
    Aciklama: "Sunucu genelindeki teyit sıralamasını gösterir.",
    Kategori: "Yetkili",
    
   /**
   * @param {Client} client 
   */
  onLoad: function (client) {

  },

   /**
   * @param {Client} client 
   * @param {Message} message 
   * @param {Array<String>} args 
   */

  onRequest: async function (client, message, args) {
    let embed = new MessageEmbed().setAuthor(ayarlar.embed.başlık, message.guild.iconURL({dynamic: true})).setColor(ayarlar.embed.renk)
    let kullanıcı = message.mentions.users.first() || client.users.cache.get(args[0]) || (args.length > 0 ? client.users.cache.filter(e => e.username.toLowerCase().includes(args.join(" ").toLowerCase())).first(): message.author) || message.author;
    let uye = message.guild.member(kullanıcı);
    if(!roller.Teyit.teyitciRolleri.some(oku => message.member.roles.cache.has(oku)) && !roller.altYönetimRolleri.some(oku => message.member.roles.cache.has(oku)) &&  !roller.kurucuRolleri.some(oku => message.member.roles.cache.has(oku)) && !roller.Yetkiler.some(oku => message.member.roles.cache.has(oku)) && !roller.yönetimRolleri.some(oku => message.member.roles.cache.has(oku)) && !message.member.hasPermission('ADMINISTRATOR')) return message.channel.wsend(cevaplar.noyt);
    let teyitlerigor = await acarDatabase.teyitSorgu();
    let arr = Object.keys(teyitlerigor);
    let teyit = arr.filter(dat => message.guild.members.cache.has(dat)).sort((a,b) => Number((teyitlerigor[b].erkek || 0) + (teyitlerigor[b].kadın || 0)) - Number((teyitlerigor[a].erkek || 0) + (teyitlerigor[a].kadın || 0))).map((value, index) => `\`${index + 1}.\` ${message.guild.members.cache.get(value)} toplam teyitleri \`${sayilariCevir((teyitlerigor[value].erkek || 0) + (teyitlerigor[value].kadın || 0))}\` (\`${sayilariCevir((teyitlerigor[value].erkek || 0))}\` erkek,\`${sayilariCevir((teyitlerigor[value].kadın || 0))}\` kadın)`).splice(0, 20);
    message.channel.wsend(embed.setDescription(`${teyit.join("\n") || "Teyit verisi bulunamadı!"}`).setFooter(ayarlar.embed.altbaşlık));
    }
};