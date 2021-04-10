const { Client, Message} = require("discord.js");
const acar = require("../Reference/acarGet");
const acarDatabase = require("../Reference/acarDatabase");
const ms = require('ms')
module.exports = {
    Isim: "unjail",
    Komut: ["unjail"],
    Kullanim: "unjail <@acar/ID>",
    Aciklama: "Belirlenen üyenin aktif cezalandırılmasını kaldırır.",
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
    if(!roller.jailHammer.some(oku => message.member.roles.cache.has(oku)) && !roller.kurucuRolleri.some(oku => message.member.roles.cache.has(oku)) && !roller.altYönetimRolleri.some(oku => message.member.roles.cache.has(oku)) && !roller.yönetimRolleri.some(oku => message.member.roles.cache.has(oku)) && !message.member.hasPermission('ADMINISTRATOR')) return message.channel.wsend(cevaplar.noyt);
    let uye = message.mentions.members.first() || message.guild.members.cache.get(args[0])
    if(!uye) return message.channel.wsend(cevaplar.üye + ` \`${sistem.prefix}${module.exports.Isim} <@acar/ID>\``);
    if(message.author.id === uye.id) return message.channel.wsend(cevaplar.kendi);
    if(!uye.manageable) return message.channel.wsend(cevaplar.dokunulmaz);
    if(message.member.roles.highest.position <= uye.roles.highest.position) return message.channel.wsend(cevaplar.yetkiust);
    let jailgetir = acarDatabase.jailGetir();
    if (jailgetir.some(j => j.id === uye.id)) {
        for (i = cezano; i > 0; i--) {
        let ceza = acarDatabase.cezaBilgi(i)
            if(!ceza) return;
            if(ceza.Cezalanan == uye.id && ceza.Tur == "Cezalandırılma" && ceza.Aktif){
                let sonisim = acarDatabase.sonIsimÇek(uye);
                let cinsiyet = acarDatabase.cinsiyetGetir(uye);
                if(sonisim || cinsiyet) {
                  if(cinsiyet == "erkek") uye.rolTanımla(roller.Teyit.erkekRolleri).then(acar => { if(uye.user.username.includes(ayarlar.tag)) uye.roles.add(roller.Teyit.tagRolü) });
                  if(cinsiyet == "kadın") uye.rolTanımla(roller.Teyit.kadınRolleri).then(acar => { if(uye.user.username.includes(ayarlar.tag)) uye.roles.add(roller.Teyit.tagRolü) });
                  } else { uye.rolTanımla(roller.Teyit.kayıtsızRolleri)}
                acarDatabase.sJailKaldir(i, uye, message.author);
                message.channel.wsend(`${message.guild.emojiGöster(emojiler.HoşGif)} ${uye} kişisinin (\`#${i}\`) numaralı cezalandırılması kaldırıldı!`)
                message.guild.unlog("jail-log", uye, message.member,"unjail", i)
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