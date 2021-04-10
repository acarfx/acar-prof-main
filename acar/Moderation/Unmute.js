const { Client, Message} = require("discord.js");
const acar = require("../Reference/acarGet");
const acarDatabase = require("../Reference/acarDatabase");
const ms = require('ms')
module.exports = {
    Isim: "unmute",
    Komut: ["unchatmute"],
    Kullanim: "unchatmute <@acar/ID>",
    Aciklama: "Belirlenen üyenin aktif metin kanallarındaki susuturulmasını kaldırır.",
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
    if(!roller.muteHammer.some(oku => message.member.roles.cache.has(oku)) && !roller.altYönetimRolleri.some(oku => message.member.roles.cache.has(oku)) &&  !roller.kurucuRolleri.some(oku => message.member.roles.cache.has(oku)) && !roller.yönetimRolleri.some(oku => message.member.roles.cache.has(oku)) && !message.member.hasPermission('ADMINISTRATOR')) return message.channel.wsend(cevaplar.noyt);
    let uye = message.mentions.members.first() || message.guild.members.cache.get(args[0])
    if(!uye) return message.channel.wsend(cevaplar.üye + ` \`${sistem.prefix}${module.exports.Isim} <@acar/ID>\``);
    if(message.author.id === uye.id) return message.channel.wsend(cevaplar.kendi);
    if(!uye.manageable) return message.channel.wsend(cevaplar.dokunulmaz);
    if(message.member.roles.highest.position <= uye.roles.highest.position) return message.channel.wsend(cevaplar.yetkiust);
    let tempmuteler = acarDatabase.muteGetir();
    if (tempmuteler.some(j => j.id === uye.id)) {
        for (i = cezano; i > 0; i--) {
        let ceza = acarDatabase.cezaBilgi(i)
            if(!ceza) return;
            if(ceza.Cezalanan == uye.id && ceza.Tur == "Susturulma" && ceza.Aktif){
                acarDatabase.mutelerKaldir(i, uye, message.author);
                if(uye.roles.cache.has(roller.muteRolü)) uye.roles.remove(roller.muteRolü)
                message.channel.wsend(`${message.guild.emojiGöster(emojiler.SusturulmaKaldirildi)} ${uye} kişisinin (\`#${i}\`) numaralı metin kanallarındaki susturulması kaldırıldı!`)
                message.guild.unlog("mute-log", uye, message.member,"unmute", i)
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