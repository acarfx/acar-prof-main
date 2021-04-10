const { Client, Message} = require("discord.js");
const acar = require("../Reference/acarGet");
const acarDatabase = require("../Reference/acarDatabase");
module.exports = {
    Isim: "yt",
    Komut: ["yt"],
    Kullanim: "yt <aç-kapat>",
    Aciklama: "Yöneticisi kapanmış kurucu rolünün yöneticisi açar veya kapatır.",
    Kategori: "Kurucu",
    
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
    if(!message.member.hasPermission('ADMINISTRATOR')) return message.channel.wsend(cevaplar.noyt)
    if(args[0] !== "aç" && args[0] !== "kapat") return message.channel.wsend(`Hata: Yönetici açmak veya kapatmak için lütfen __argümanları__ doldurun Örn: \`.yt aç/kapat\``).then(x => x.delete({timeout: 5000}));
    if(args[0] === "aç") {
        try{ 
          let rol = message.guild.roles.cache.get(roller.ytKurucuRolü)
          rol.editable
          rol.setPermissions(8)
          message.channel.send(`Başarılı: <@&${roller.ytKurucuRolü}> \`adlı role yönetici başarıyla açıldı!\`!`).then(x => x.delete({timeout: 5000}));
          message.react('✅');
            } catch (e) {
              console.log(e);
              message.channel.send('Hata: \`Sistemsel olarak hata oluştu lütfen @acar yetkilisine başvurunuz\`!').then(x => x.delete({timeout: 5000}));
            }
      };
    
      if(args[0] === "kapat") {
        try{
          let rol = message.guild.roles.cache.get(roller.ytKurucuRolü)
          rol.editable
          rol.setPermissions(0)
          message.channel.send(`Başarılı: <@&${roller.ytKurucuRolü}> \`adlı rolün yöneticisi kapatıldı!\`!`).then(x => x.delete({timeout: 5000}));
          message.react('✅');
            } catch (e) {
              console.log(e);
              message.channel.send('Hata: \`Sistemsel olarak hata oluştu lütfen @acar yetkilisine başvurunuz\`!').then(x => x.delete({timeout: 5000}));
            }
        };
    }
};