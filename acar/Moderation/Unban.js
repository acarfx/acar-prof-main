const { Client, Message} = require("discord.js");
const acar = require("../Reference/acarGet");
const acarDatabase = require("../Reference/acarDatabase");
const ms = require('ms')
module.exports = {
    Isim: "unban",
    Komut: ["ykaldir"],
    Kullanim: "unban <@acar/ID> <Sebep>",
    Aciklama: "Belirlenen üyenin sunucudaki yasaklamasını kaldırır.",
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
    if(!roller.kurucuRolleri.some(oku => message.member.roles.cache.has(oku)) && !message.member.hasPermission('ADMINISTRATOR')) return message.channel.wsend(cevaplar.noyt);
    if (!args[0] || isNaN(args[0])) return message.channel.wsend(cevaplar.üye + ` \`${sistem.prefix}${module.exports.Isim} <ID> <Sebep>\``);
    let sorguid = args[0]
    let kisi = await client.users.fetch(sorguid);
    if(kisi) { 
      let reason = args.splice(1).join(" ") || "-";
      if(!reason) return message.channel.wsend(cevaplar.sebep + ` \`${sistem.prefix}${module.exports.Isim} <ID> <sebep> \``).then(x => x.delete({timeout: 5000}))
       try {
         message.guild.fetchBans().then(yasaklar=> {
            if(yasaklar.size == 0) return message.channel.wsend(cevaplar.yasaklamayok)
             let yasakliuye = yasaklar.find(yasakli => yasakli.user.id == sorguid)
             if(!yasakliuye) return message.channel.wsend(cevaplar.bulunamadi)
             for (i = cezano; i > 0; i--) {
              let ceza = acarDatabase.cezaBilgi(i)
                  if(!ceza) return;
                  if(ceza.Aktif && ceza.Tur == "Yasaklama" && ceza.Cezalanan == kisi.id){
                      acarDatabase.banKaldir(i, kisi, message.author);
                      message.guild.members.unban(kisi.id);
                      message.channel.wsend(`${message.guild.emojiGöster(emojiler.HoşGif)} ${kisi} kişisinin sunucudaki yasaklaması kaldırıldı!`)
                      message.guild.unlog("ban-log", kisi, message.member,"unban", i)
                      message.react(emojiler.Onay)
                      return;
                  }
               }
               message.guild.members.unban(kisi.id);
               message.channel.wsend(`${message.guild.emojiGöster(emojiler.HoşGif)} ${kisi} kişisinin sunucudaki yasaklaması kaldırıldı!`)
               message.guild.unlog("ban-log", kisi, message.member,"unban", "x")
               message.react(emojiler.Onay)
           })
       } catch (err) {
           console.log(err)
       } 

    };
    }
};