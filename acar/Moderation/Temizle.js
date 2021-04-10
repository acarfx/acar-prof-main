  
const { Client, Message } = require("discord.js");
module.exports = {
    Isim: "temizle",
    Komut: ["sil"],
    Kullanim: "sil <1-100>",
    Aciklama: "Belirlenen miktar kadar metin kanallarında ki metinleri temizler.",
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
   * @param {Guild} guild
   */
  onRequest: async (client, message, args) => {
    if(!roller.kurucuRolleri.some(oku => message.member.roles.cache.has(oku)) && !roller.yönetimRolleri.some(oku => message.member.roles.cache.has(oku)) && !message.member.hasPermission('ADMINISTRATOR')) return message.channel.wsend(cevaplar.noyt); 
    if(!args[0] || (args[0] && isNaN(args[0])) || Number(args[0]) < 1 || Number(args[0]) > 100) return message.channel.wsend("Hata: 1-100 arasında silinecek mesaj miktarı belirtmelisin!").then(x => x.delete({timeout: 5000}));
    message.channel.bulkDelete(Number(args[0])).then(x => message.channel.wsend(`${message.guild.emojiGöster(emojiler.Onay)} Başarıyla <#${message.channel.id}> (\`${message.channel.id}\`) adlı kanal da (**${x.size}**) adet mesaj silindi!`).then(x => x.delete({timeout: 5000}).catch(acar => console.log('\x1b[31m%s\x1b[0m','[ÖNEMSİZ HATA] Silinmesi beklenilen mesaj bulunamadı.'))));
  }
};