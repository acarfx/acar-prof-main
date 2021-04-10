const { Client, Message, MessageEmbed} = require("discord.js");
const acar = require("../Reference/acarGet");
const acarDatabase = require("../Reference/acarDatabase");
module.exports = {
    Isim: "taglı",
    Komut: ["taglı"],
    Kullanim: "taglı <@acar/ID>",
    Aciklama: "Belirlenen üyeyi komutu kullanan üyenin taglısı olarak belirler.",
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
      let birhafta = Date.now()-message.member.user.joinedAt > 1000*60*60*24*7;
    let embed = new MessageEmbed().setAuthor(ayarlar.embed.başlık, message.guild.iconURL({dynamic: true})).setColor(ayarlar.embed.renk).setFooter(ayarlar.embed.altbaşlık)
    if(!roller.Teyit.teyitciRolleri.some(oku => message.member.roles.cache.has(oku)) && !roller.kurucuRolleri.some(oku => message.member.roles.cache.has(oku)) && !roller.altYönetimRolleri.some(oku => message.member.roles.cache.has(oku)) && !roller.Yetkiler.some(oku => message.member.roles.cache.has(oku)) && !roller.yönetimRolleri.some(oku => message.member.roles.cache.has(oku)) && !message.member.hasPermission('ADMINISTRATOR')) return message.channel.wsend(cevaplar.noyt);
    let uye = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
    if(!uye) return message.channel.wsend(cevaplar.üye + ` \`${sistem.prefix}${module.exports.Isim} <@acar/ID>\``);
    if(message.author.id === uye.id) return message.channel.wsend(cevaplar.kendi).then(x => x.delete({timeout: 5000}));
    let kontrol = await acarDatabase.tagKontrol(uye);
    if(!kontrol) return message.channel.wsend(`Hata: \`Veritabanında üye taglı olarak görünmedi!\``).then(x => x.delete({timeout: 5000}));
    if(kontrol.kontrol) return message.channel.wsend(`Hata: Bir başka yetkili tarafından \`${tarihsel(kontrol.tarih)}\` tarihinde zaten taglı olarak belirlenmiş.`);
    acarDatabase.tagaEkle(uye, message.author, true)
    acarDatabase.yetkiliTagaEkle(uye, message.author)
    if(coinsistem.sistem) acarDatabase.coinEkle(message.author, coinsistem.odül.taglı)
    message.channel.wsend(embed.setDescription(`${uye} isimli üye \`${tarihsel(Date.now())}\` tarihinde taglı olarak belirledin!`)).then(acar => {
    message.guild.kanalBul("taglı-log").wsend(embed.setDescription(`${uye} isimli üye \`${tarihsel(Date.now())}\` tarihinde ${message.author} tarafından taglı olarak belirlendi.`))
    // Terfi Sistemi Taglı Saydırma (START)!
        if(terfisistem.yetkiler.some(x => message.member.roles.cache.has(x))) {
          if(message.member.roles.cache.has(terfisistem.sonyetki)) return;  
          if(terfisistem.sistem) acarDatabase.terfiPuanEkle(message.member, terfisistem.odül.taglı);
        };
   // Terfi Sistemi Taglı Saydırma (END)!
    })
    }
};