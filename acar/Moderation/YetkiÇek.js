const {MessageEmbed} = require("discord.js");
const acar = require("../Reference/acarGet");
const acarDatabase = require("../Reference/acarDatabase");
module.exports = {
    Isim: "yetkiçek",
    Komut: ["yetkicek"],
    Kullanim: "yetkiçek <@acar/ID>",
    Aciklama: "Belirlenen üyenin bütün yetkilerini çeker.",
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
   */

  onRequest: async function (client, message, args) {
    let embed = new MessageEmbed().setAuthor(ayarlar.embed.başlık, message.guild.iconURL({dynamic: true})).setColor("RED")
    let userArray = message.content.split(" ");
    let userArgs = userArray.slice(1);
    let user = message.mentions.members.first() || message.guild.members.cache.get(userArgs[0]) || message.guild.members.cache.find(x => x.user.username.toLowerCase() === userArgs.slice(0).join(" ") || x.user.username === userArgs[0])
    if(!roller.kurucuRolleri.some(oku => message.member.roles.cache.has(oku)) && !roller.yönetimRolleri.some(oku => message.member.roles.cache.has(oku)) && !message.member.hasPermission('ADMINISTRATOR')) return message.channel.wsend(cevaplar.noyt).then(x => x.delete({timeout: 5000}));
    if(!user) return message.channel.wsend(cevaplar.üye + ` \`${sistem.prefix}${module.exports.Isim} <@acar/ID>\``).then(x => x.delete({timeout: 5000}));
    if(message.author.id === user.id) return message.channel.wsend(cevaplar.kendi).then(x => x.delete({timeout: 5000}));
    if (message.member.roles.highest.position <= user.roles.highest.position) return message.channel.wsend(cevaplar.yetkiust).then(x => x.delete({timeout: 5000}));
    if(roller.yönetimRolleri.some(x => user.roles.cache.has(x)) && !message.member.hasPermission('ADMINISTRATOR')) return message.channel.wsend('Hata: Rollerin de yönetim rolü barındığından dolayı işlem iptal edildi!').then(x => x.delete({timeout: 5000}));
    let altYetki = message.guild.roles.cache.get(terfisistem.altilkyetki)
    await user.roles.remove(user.roles.cache.filter(rol => altYetki.position <= rol.position));
    if(terfisistem.sistem) acarDatabase.yetkiÇek(user)
    message.guild.kanalBul("yetki-log").wsend(embed.setDescription(`${message.author} isimli yetkili ${user.toString()} isimli kişinin \`${tarihsel(Date.now())}\` tarihinde yetkini çekti!`).setFooter(ayarlar.embed.altbaşlık))
    message.channel.wsend(`${message.guild.emojis.cache.get(emojiler.Onay)} ${user.toString()} isimli üyeyi başarıyla yetkisi çekildi!`).then(x => x.delete({timeout: 5000}));

    }
};