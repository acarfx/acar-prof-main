const { Client, Message} = require("discord.js");
const acar = require("../Reference/acarGet");
const acarDatabase = require("../Reference/acarDatabase");
const ms = require('ms')
module.exports = {
    Isim: "uyarı",
    Komut: ["warn"],
    Kullanim: "warn <@acar/ID> <Sebep>",
    Aciklama: "Belirlenen üyeyi ceza şeklinde uyarır ve cezalarına işler.",
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
    if(!roller.warnHammer.some(oku => message.member.roles.cache.has(oku)) && !roller.altYönetimRolleri.some(oku => message.member.roles.cache.has(oku)) &&  !roller.kurucuRolleri.some(oku => message.member.roles.cache.has(oku)) && !roller.yönetimRolleri.some(oku => message.member.roles.cache.has(oku)) && !message.member.hasPermission('ADMINISTRATOR')) return message.channel.wsend(cevaplar.noyt);
    let uye = message.mentions.members.first() || message.guild.members.cache.get(args[0])
    if(!uye) return message.channel.wsend(cevaplar.üye + ` \`${sistem.prefix}${module.exports.Isim} <@acar/ID> <Sebep>\``);
    if(message.author.id === uye.id) return message.channel.wsend(cevaplar.kendi);
    if(!uye && message.member.roles.highest.position <= uye.roles.highest.position) return message.channel.wsend(cevaplar.yetkiust);
    let sebep = args.splice(1).join(" ");
    if(!sebep) return message.channel.wsend(cevaplar.sebep);
      acarDatabase.cezaEkle(cezano, uye, message.author, "Uyarı", "Uyarılma", sebep, 'Yok', 'Yok!', "Kaldırma İşlemi Yapılamaz!", "warn");
      message.guild.log(acarDatabase.cezaBilgi(cezano), uye, message.author, "Uyarılma", "uyarı-log")
      message.channel.wsend(`${message.guild.emojiGöster(emojiler.HoşGif)} ${uye} kişisi **${sebep}** nedeni ile uyarıldı. (Ceza Numarası: \`#${cezano}\`)`)
      message.react(emojiler.Onay)
    }
};