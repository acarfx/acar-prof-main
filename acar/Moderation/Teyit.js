const { Client, Message, MessageEmbed} = require("discord.js");
const acar = require("../Reference/acarGet");
const acarDatabase = require("../Reference/acarDatabase");
module.exports = {
    Isim: "teyit",
    Komut: ["Teyit"],
    Kullanim: "teyit <@acar/ID>",
    Aciklama: "Belirtilen üye ve komutu kullanan üyenin teyit bilgilerini gösterir.",
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
    let kullanıcı = message.mentions.users.first() || message.guild.members.cache.get(args[0]) || await acar.GetUser(args[0]) || (args.length > 0 ? client.users.cache.filter(e => e.username.toLowerCase().includes(args.join(" ").toLowerCase())).first(): message.author) || message.author;
    let uye = message.guild.member(kullanıcı);
    if (!uye) return message.channel.wsend(cevaplar.üyeyok);
    if(!roller.Teyit.teyitciRolleri.some(oku => message.member.roles.cache.has(oku)) && !roller.altYönetimRolleri.some(oku => message.member.roles.cache.has(oku)) && !roller.kurucuRolleri.some(oku => message.member.roles.cache.has(oku)) && !roller.Yetkiler.some(oku => message.member.roles.cache.has(oku)) && !roller.yönetimRolleri.some(oku => message.member.roles.cache.has(oku)) && !message.member.hasPermission('ADMINISTRATOR')) return message.channel.wsend(cevaplar.noyt);
    let teyit = await acarDatabase.teyitÇek(uye);
    let teyitBilgisi;
    if(teyit){
      let erkekTeyit = teyit.erkek || 0;
      let kizTeyit = teyit.kadın || 0;
      teyitBilgisi = `${uye} toplam **${erkekTeyit+kizTeyit}** kayıt yapmış! (**${erkekTeyit}** erkek, **${kizTeyit}** kadın)\n`;
    } else { 
      teyitBilgisi = `${uye} isimli kişinin teyit bilgisi bulunamadı.`
    }
    message.channel.wsend(embed.setDescription(`${teyitBilgisi}`).setFooter(ayarlar.embed.altbaşlık));
    }
};