const { Client, Message, MessageEmbed, Guild } = require("discord.js");
module.exports = {
    Isim: "yetenek",
    Komut: ["yetenek"],
    Kullanim: "yetenek @acar/ID <Yetenek İsmi>",
    Aciklama: "Etiketlenen kişiye belirlenen yetenek rolünü verir.",
    Kategori: "Yetkili",
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
      let rolismi;
      let rolid;
    let uye = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
    if(!roller.abilityHammer.some(oku => message.member.roles.cache.has(oku)) && !roller.altYönetimRolleri.some(oku => message.member.roles.cache.has(oku)) &&  !roller.kurucuRolleri.some(oku => message.member.roles.cache.has(oku)) && !roller.yönetimRolleri.some(oku => message.member.roles.cache.has(oku)) && !message.member.hasPermission('ADMINISTRATOR')) return message.channel.wsend(cevaplar.noyt); 
      if(args[1] === "vokal" || args[1] === "Vokal") {
        rolismi = "Vokal"
        rolid = roller.Yetenek.vokalRolü
    } if (args[1] === "müzisyen" || args[1] === "Müzisyen") {
        rolismi = "Müzisyen"
        rolid = roller.Yetenek.müzisyenRolü
    } if (args[1] === "telli" || args[1] === "Telli") {
        rolismi = "Telli"
        rolid = roller.Yetenek.telliRolü
    } if (args[1] === "yayıncı" || args[1] === "Yayıncı") {
        rolismi = "Yayıncı"
        rolid = roller.Yetenek.yayıncıRolü
    } if (args[1] === "yazılımcı" || args[1] === "Yazılımcı") {
        rolismi = "Yazılımcı"
        rolid = roller.Yetenek.yazılımcıRolü
    } if (args[1] === "ressam" || args[1] === "Ressam") {
        rolismi = "Ressam"
        rolid = roller.Yetenek.ressamRolü
    } if (args[1] === "şair" || args[1] === "Şair") {
        rolismi = "Şair"
        rolid = roller.Yetenek.şairRolü
    } if (args[1] === "tasarımcı" || args[1] === "Tasarımcı") {
        rolismi = "Tasarımcı"
        rolid = roller.Yetenek.tasarımcıRolü
    } 
    if (!uye) return message.channel.wsend(`Hata: yetenek rolü verebilmem için lütfen bir üyeyi etiketle __Örn:__ \`${sistem.prefix}${module.exports.Isim} @acar/ID <Yetenek İsmi>\`!`).then(x => x.delete({timeout: 5000}));
           if(message.author.id === uye.id) return message.channel.wsend(cevaplar.kendi).then(amınakoy => amınakoy.delete({timeout: 5000}));
    if(args[1] !== "vokal" && args[1] !== "Vokal" && 
       args[1] !== "müzisyen" && args[1] !== "Müzisyen" &&
       args[1] !== "telli" && args[1] !== "Telli" &&
       args[1] !== "yazılımcı" && args[1] !== "Yazılımcı" &&
       args[1] !== "yayıncı" && args[1] !== "Yayıncı" &&
       args[1] !== "tasarımcı" && args[1] !== "Tasarımcı" &&
       args[1] !== "ressam" && args[1] !== "Ressam" &&
       args[1] !== "şair" && args[1] !== "Şair" 
       ) return message.channel.wsend(embed.setFooter(ayarlar.embed.altbaşlık + ` • Örn; '${sistem.prefix}${module.exports.Isim} @acar/ID müzisyen'`).setDescription(`Yetenek ismi belirlenmedi! lütfen aşağıdaki gibi yetenek ismi belirleyin! \`\`\`• Vokal\n• Müzisyen\n• Telli\n• Yazılımcı\n• Yayıncı\n• Tasarımcı\n• Ressam\n• Şair\`\`\``));
      uye.roles.cache.has(rolid) ? uye.roles.remove(rolid) : uye.roles.add(rolid);
      if(!uye.roles.cache.has(rolid)) {
        message.guild.kanalBul("yetenek-log").wsend(embed.setFooter(ayarlar.embed.altbaşlık).setDescription(`${uye} isimli kişiye **${tarihsel(Date.now())}** tarihinde ${message.author} tarafından **${rolismi}** adlı rol verildi.`))
        message.channel.wsend(`${message.guild.emojiGöster(emojiler.Onay)} Başarıyla ${uye}, isimli kişiye **${rolismi}** rolü verildi.`).catch().then(x => x.delete({timeout: 7000}));
        message.react(emojiler.Onay)
      } else {
        message.guild.kanalBul("yetenek-log").wsend(embed.setFooter(ayarlar.embed.altbaşlık).setDescription(`${uye} isimli kişiye **${tarihsel(Date.now())}** tarihinde ${message.author} tarafından **${rolismi}** adlı rol geri alındı.`))
        
        message.channel.wsend(`${message.guild.emojiGöster(emojiler.Onay)} Başarıyla ${uye}, isimli kişinin **${rolismi}** rolü geri alındı.`).catch().then(x => x.delete({timeout: 7000}));
        message.react(emojiler.Onay)
      };
    }
};