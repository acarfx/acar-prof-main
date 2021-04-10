const { Client, Message} = require("discord.js");
const acar = require("../Reference/acarGet");
const acarDatabase = require("../Reference/acarDatabase");
const ms = require('ms')
module.exports = {
    Isim: "unvmute",
    Komut: ["unvoicemute","unsesmute"],
    Kullanim: "unvoicemute <@acar/ID>",
    Aciklama: "Belirlenen üyenin aktif ses kanallarındaki susuturulmasını kaldırır.",
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
    let cezano = acarDatabase.cezaNoGetir();
    if(!roller.voiceMuteHammer.some(oku => message.member.roles.cache.has(oku)) && !roller.altYönetimRolleri.some(oku => message.member.roles.cache.has(oku)) &&  !roller.kurucuRolleri.some(oku => message.member.roles.cache.has(oku)) && !roller.yönetimRolleri.some(oku => message.member.roles.cache.has(oku)) && !message.member.hasPermission('ADMINISTRATOR')) return message.channel.wsend(cevaplar.noyt);
    let uye = message.mentions.members.first() || message.guild.members.cache.get(args[0])
    if(!uye) return message.channel.wsend(cevaplar.üye + ` \`${sistem.prefix}${module.exports.Isim} <@acar/ID>\``);
    if(message.author.id === uye.id) return message.channel.wsend(cevaplar.kendi);
    if(!uye.manageable) return message.channel.wsend(cevaplar.dokunulmaz);
    if(message.member.roles.highest.position <= uye.roles.highest.position) return message.channel.wsend(cevaplar.yetkiust);
    let tempsmuteler = acarDatabase.smuteGetir();
    if (tempsmuteler.some(j => j.id === uye.id)) {
        for (i = cezano; i > 0; i--) {
        let ceza = acarDatabase.cezaBilgi(i)
            if(!ceza) return;
            if(ceza.Cezalanan == uye.id && ceza.Tur == "Ses Susturulma" && ceza.Aktif){
                acarDatabase.sesMuteKaldir(i, uye, message.author);
                if(uye.roles.cache.has(roller.voicemuteRolü)) uye.roles.remove(roller.voicemuteRolü)
                message.channel.wsend(`${message.guild.emojiGöster(emojiler.SusturulmaKaldirildi)} ${uye} kişisinin (\`#${i}\`) numaralı ses kanallarındaki susturulması kaldırıldı!`)
                message.guild.unlog("sesmute-log", uye, message.member,"unsesmute", i)
                message.react(emojiler.Onay)
            break;
            }
         } 
      } else {
        message.channel.wsend(cevaplar.cezayok);
        message.react(emojiler.Iptal)
      }
    }
};