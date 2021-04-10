const { Client, Message, MessageEmbed} = require("discord.js");
const acar = require("../Reference/acarGet");
const acarDatabase = require("../Reference/acarDatabase");
module.exports = {
    Isim: "yardım",
    Komut: ["yardim"],
    Kullanim: "",
    Aciklama: "",
    Kategori: "-",
    
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
    let command = args[0]
    let embed2 = new MessageEmbed().setAuthor(ayarlar.embed.başlık, message.guild.iconURL({dynamic: true, size: 2048})).setColor(ayarlar.embed.renk).setFooter(ayarlar.embed.altbaşlık)
  if (client.komutlar.has(command)) {
  
    command = client.komutlar.get(command)
    embed2
    .addField(`\`\`\`Komut Adı\`\`\``,`
${command.Isim}
      `,true)
      .addField(`\`\`\`Komut Açıklaması\`\`\``,`
${command.Aciklama}
      `,false)
      .addField(`\`\`\`Komut Kullanımı\`\`\``,`
${command.Kullanim}
      `,true)
      .addField(`\`\`\`Komut Alternatifleri\`\`\``,`
${command.Komut[0] ? command.Komut.join(', ') : 'Bulunmuyor'}
      `,true)
      .setColor(ayarlar.embed.renk)
    message.channel.wsend(embed2).then(msg => {
  msg.react(emojiler.Iptal)
  .then(r1 => {
     const cancelFilter1 = (reaction, user) => reaction.emoji.id === emojiler.Iptal && user.id === message.author.id;
      const cancel1 = msg.createReactionCollector(cancelFilter1, { time: 100000 });
      cancel1.on('collect', r1 => {
    message.channel.wsend(new MessageEmbed().setAuthor(ayarlar.embed.başlık, message.guild.iconURL({dynamic: true, size: 2048})).setFooter(ayarlar.embed.altbaşlık).setColor(ayarlar.embed.renk).setDescription(`Başarılı: **${args[0]}** adlı komut bilgisi istek üzerine kapatıldı.`)).then(x =>  x.delete({timeout: 5000}) | x.react("✅"));
        msg.delete();
      })
     })
  });
  return;
}
let embed = new MessageEmbed().setAuthor(ayarlar.embed.başlık + ` - Yardım Menüsü`, message.guild.iconURL({dynamic: true, size: 2048})).setColor(ayarlar.embed.renk).setFooter(ayarlar.embed.altbaşlık)
message.channel.wsend(embed.setDescription(`Aşağıda sunucudaki komutlar sıralandırılmıştır komut bilgisini detaylı öğrenmek için \`${sistem.prefix}${module.exports.Isim} <Komut Ismi>\` komutu ile komutun detaylı bilgilerini görebilirsin.
\`\`\`fix
Kullanılabilir tüm komutlar\`\`\`
\`${client.komutlar.filter(x => x.Kategori === "Yönetim").map(x => sistem.prefix + x.Kullanim ).join('\n')}
${client.komutlar.filter(x => x.Kategori === "Yetkili").map(x => sistem.prefix + x.Kullanim ).join('\n')}
${client.komutlar.filter(x => x.Kategori === "Üye").map(x => sistem.prefix + x.Kullanim ).join('\n')}\``))
    }
};