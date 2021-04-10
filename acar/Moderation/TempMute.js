const { Client, Message} = require("discord.js");
const acar = require("../Reference/acarGet");
const acarDatabase = require("../Reference/acarDatabase");
const ms = require('ms')
module.exports = {
    Isim: "chatmute",
    Komut: ["mute","sustur"],
    Kullanim: "chatmute <@acar/ID> <1s-1m-1h-1y> <Sebep>",
    Aciklama: "Belirlenen üyeyi belirtilen süre boyunca metin kanallarında susturur.",
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
    let cezano = acarDatabase.cezaNoGetir() + 1;
    if(!roller.muteHammer.some(oku => message.member.roles.cache.has(oku)) && !roller.kurucuRolleri.some(oku => message.member.roles.cache.has(oku)) && !roller.altYönetimRolleri.some(oku => message.member.roles.cache.has(oku)) &&  !roller.yönetimRolleri.some(oku => message.member.roles.cache.has(oku)) && !message.member.hasPermission('ADMINISTRATOR')) return message.channel.wsend(cevaplar.noyt);
    let uye = message.mentions.members.first() || message.guild.members.cache.get(args[0])
    if(!uye) return message.channel.wsend(cevaplar.üye + ` \`${sistem.prefix}${module.exports.Isim} <@acar/ID> <1s/1m/1d/1y> <Sebep>\``);
    if(message.author.id === uye.id) return message.channel.wsend(cevaplar.kendi);
    if(message.member.roles.highest.position <= uye.roles.highest.position) return message.channel.wsend(cevaplar.yetkiust);
    let mutegetir = acarDatabase.muteGetir();
    let sure = args[1];
    let sebep = args.splice(2).join(" ");
    if(!sure || !ms(sure)) return message.channel.wsend(cevaplar.süre + ` \`${sistem.prefix}${module.exports.Isim} <@acar/ID> <1s/1m/1d/1y> <Sebep>\``);
    if(!sebep) return message.channel.wsend(cevaplar.sebep);
    let mutezaman = args[1]
    .replace(`d`," Gün")
    .replace(`s`," Saniye")
    .replace(`h`," Saat")
    .replace(`m`," Dakika")
    .replace(`w`," Hafta")
    if (!mutegetir.some(m => m.id == uye.id)) { 
      acarDatabase.cezaEkle(cezano, uye, message.author, "Susturulma", "Susturulma", sebep, sure, mutezaman, "Şuan da susturulu", "tempmute");
      uye.roles.add(roller.muteRolü).catch(err => console.log(`[~ ACAR ~] Mute Rolü eklerken hata oluştu!`));
      message.guild.log(acarDatabase.cezaBilgi(cezano), uye, message.author, "Susturulma", "mute-log")
      message.channel.wsend(`${message.guild.emojiGöster(emojiler.Susturuldu)} ${uye} kişisi **${sebep}** nedeni ile **${mutezaman}** süresince metin kanallarında susturuldu. (Ceza Numarası: \`#${cezano}\`)`)
      message.react(emojiler.Onay)
    } else {
      message.channel.wsend(cevaplar.cezavar);
      message.react(emojiler.Iptal)
    }
    }
};