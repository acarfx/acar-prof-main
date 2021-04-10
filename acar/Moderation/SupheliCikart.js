const { Client, Message} = require("discord.js");
const acar = require("../Reference/acarGet");
const acarDatabase = require("../Reference/acarDatabase");
const ms = require('ms')
module.exports = {
    Isim: "şüpheliçıkart",
    Komut: ["şçıkart"],
    Kullanim: "şüpheliçıkart <@acar/ID>",
    Aciklama: "Belirlenen üyeyi 7 günden önce açılmış ise cezalıdan çıkartmak için kullanılır.",
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
    let cezano = acarDatabase.cezaNoGetir();
    if(!roller.kurucuRolleri.some(oku => message.member.roles.cache.has(oku)) && !roller.altYönetimRolleri.some(oku => message.member.roles.cache.has(oku)) && !roller.yönetimRolleri.some(oku => message.member.roles.cache.has(oku)) && !message.member.hasPermission('ADMINISTRATOR')) return message.channel.wsend(cevaplar.noyt);
    let uye = message.mentions.members.first() || message.guild.members.cache.get(args[0])
    if(!uye) return message.channel.wsend(cevaplar.üye + ` \`${sistem.prefix}${module.exports.Isim} <@acar/ID>\``);
    if(message.author.id === uye.id) return message.channel.wsend(cevaplar.kendi);
    if(!uye.manageable) return message.channel.wsend(cevaplar.dokunulmaz);
    if(message.member.roles.highest.position <= uye.roles.highest.position) return message.channel.wsend(cevaplar.yetkiust);
    uye.setNickname(`${uye.user.username.includes(ayarlar.tag) ? ayarlar.tag : (ayarlar.tagsiz ? ayarlar.tagsiz : (ayarlar.tag || ""))} İsim | Yaş`)   
    uye.rolTanımla(roller.Teyit.kayıtsızRolleri)
    message.channel.wsend(`${message.guild.emojiGöster(emojiler.HoşGif)} ${uye} kişisi şüpheliden çıkartıldı ve kayıtsıza atıldı!`).then(x => x.delete({timeout: 5000}))
    message.react(emojiler.Onay)
    }
};