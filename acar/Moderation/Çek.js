const { Client, Message, MessageEmbed, Guild } = require("discord.js");
module.exports = {
    Isim: "çek",
    Komut: ["çek", "izinliçek"],
    Kullanim: "izinliçek @acar/ID",
    Aciklama: "Belirlenen üyeye izin ile yanınıza çekersiniz.",
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
  onRequest: async function (client, message, args, guild) {
    let embed = new MessageEmbed().setAuthor(ayarlar.embed.başlık, message.guild.iconURL({dynamic: true})).setColor(ayarlar.embed.renk)
    let uye = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
    if (!uye) return message.channel.wsend("Hata: Ses odana çekilecek üyeyi belirtmelisin!").then(x => x.delete({timeout: 5000}));
    if (!message.member.voice.channel || !uye.voice.channel) return message.channel.wsend("Hata: `Çekmek istediğin kişi seste bulunmuyor veya sen seste bulunmuyorsun.`").then(x => x.delete({timeout: 5000}));
      if (message.member.voice.channelID == uye.voice.channelID) return message.channel.wsend("Hata: `aynı ses kanalındasınız o yüzden işlem iptal edildi.`").then(x => x.delete({timeout: 5000}));  
    if (message.member.roles.highest.position < uye.roles.highest.position) { 
      const reactionFilter = (reaction, user) => {
        return ['✅'].includes(reaction.emoji.name) && user.id === uye.id;
      };
      message.channel.wsend(`${uye}`, {embed: embed.setFooter(ayarlar.embed.altbaşlık).setAuthor(uye.displayName, uye.user.avatarURL({dynamic: true, size: 2048})).setDescription(`${message.author} seni ses kanalına çekmek için izin istiyor! Onaylıyor musun?`)}).then(async msj => {
        await msj.react('✅');
        msj.awaitReactions(reactionFilter, {max: 1, time: 15000, error: ['time']}).then(c => {
        coll => coll.first().catch(err => { mesaj.delete().catch(); return; })
          let cevap = c.first();
      if (cevap) {
        uye.voice.setChannel(message.member.voice.channelID);
            msj.delete();
            message.channel.wsend(embed.setFooter(ayarlar.embed.altbaşlık).setDescription(`${uye}, isimli üye ${message.member} üye tarafından __odasına izin ile çekildi__!`)).then(x => x.delete({timeout: 5000}));
      } else {
             msj.delete();
      message.channel.wsend(embed.setFooter(ayarlar.embed.altbaşlık).setDescription(`${message.guild.emojiGöster(emojiler.Iptal)} __**15** Saniye__ boyunca cevap gelmediği için otomatik olarak iptal edildi!`)).then(x => x.delete({timeout: 5000}));
      };
        });
      });
      } else {
     if (roller.teleportHammer.some(rol => message.member.roles.cache.has(rol)) || roller.kurucuRolleri.some(oku => message.member.roles.cache.has(oku)) || roller.altYönetimRolleri.some(oku => message.member.roles.cache.has(oku)) || roller.yönetimRolleri.some(oku => message.member.roles.cache.has(oku)) || message.member.hasPermission('ADMINISTRATOR'))  {
          await uye.voice.setChannel(message.member.voice.channelID);
          message.channel.wsend(embed.setDescription(`${message.guild.emojiGöster(emojiler.Onay)} ${uye} isimli üye ${message.member} isimli __yetkili tarafından__ çekildi!`)).then(x => x.delete({timeout: 5000}));
        } else {
          const reactionFilter = (reaction, user) => {
            return ['✅'].includes(reaction.emoji.name) && user.id === uye.id;
          };
        };
     };  

    }
};