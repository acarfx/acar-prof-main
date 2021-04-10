const { Client, Message, MessageEmbed } = require("discord.js");
const moment = require('moment');
require('moment-duration-format');
const acar = client.veri
module.exports = {
    Isim: "booster",
    Komut: ["b"],
    Kullanim: "booster <Belirlenen Isim>",
    Aciklama: "Sunucuya takviye atan üyeler bu komut ile isim değişimi yapar.",
    Kategori: "Üye",
    TekSunucu: true,
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
    let embed = new MessageEmbed().setAuthor(ayarlar.embed.başlık, message.guild.iconURL({dynamic: true})).setColor(ayarlar.embed.renk)
      if (!message.member.roles.cache.has(roller.boosterRolü) && !message.member.hasPermission('ADMINISTRATOR'))
          return message.channel.wsend(cevaplar.noyt).then(x => x.delete({ timeout: 5000 }));
      let uye = message.guild.member(message.author);
      let yazilacakIsim;
      let isim = args.join(' ');
      if (!isim)
          return message.channel.wsend(`Hata: Lütfen bir isim belirleyiniz!  __Örn:__  \`${sistem.prefix}booster <Belirlenen Isim> Max: 32 Karakter!\``).then(x => x.delete({ timeout: 5000 }));
      
      yazilacakIsim = `${uye.user.username.includes(ayarlar.tag) ? ayarlar.tag : (ayarlar.tagsiz ? ayarlar.tagsiz : (ayarlar.tag || ""))} ${isim}`;
      if(uye.manageable) {
      uye.setNickname(`${yazilacakIsim}`).then(devam => {
      message.channel.wsend(embed.setDescription(`${message.guild.emojiGöster(emojiler.Tag)} Yeni İsim: \`${yazilacakIsim}\`\n${message.guild.emojiGöster(emojiler.Onay)} Başarıyla isminizi değiştirdiniz!\nYeni isminizle havanıza hava katın!`)).catch();
      message.react(emojiler.Onay)
      }).catch(acar => message.channel.wsend(cevaplar.isimapi))
    } else {
      message.channel.wsend(cevaplar.dokunulmaz).then(x => x.delete({timeout: 5000}));
    }
  }
};