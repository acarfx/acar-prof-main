const { Client, Message, MessageEmbed} = require("discord.js");
const acar = require("../Reference/acarGet");
const acarDatabase = require("../Reference/acarDatabase");
module.exports = {
    Isim: "başvuru",
    Komut: ["basvuru"],
    Kullanim: "başvuru <Yetki Başvurusu Açıklaması>",
    Aciklama: "",
    Kategori: "Üye",
    
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
    let platform = {
        web: 'İnternet Tarayıcısı',
        desktop: 'PC (App)',
        mobile: 'Mobil'
      }
    let bilgi;
    let şüphe;
    let birhafta = Date.now()-message.member.user.joinedAt > 1000*60*60*24*7;
    if(message.member.user.presence.status !== 'offline') { bilgi = `Başvuru Yapılan Cihaz: \`${platform[Object.keys(message.member.user.presence.clientStatus)[0]]}\`` } else { bilgi = 'Bağlandığı Cihaz: `Çevrimdışı`' }
    let embed = new MessageEmbed().setAuthor(ayarlar.embed.başlık, message.guild.iconURL({dynamic: true})).setColor(ayarlar.embed.renk).setFooter(ayarlar.embed.altbaşlık)
    if(!message.member.roles.cache.has(roller.Teyit.tagRolü) && !message.member.user.username.includes(ayarlar.tag)) return message.channel.wsend(`Hata: İsminiz de \`${ayarlar.tag}\` sembolü bulunmadığından yetkili başvurusu yapamazsınız!`).then(x => x.delete({timeout: 5000}));
    if(roller.Yetkiler.some(x => message.member.roles.cache.has(x))) return message.channel.wsend(`Hata: \`Yetkili olduğunuz için başvuru işleminde bulunamazsınız.\``);
    //if(!birhafta) return message.channel.wsend(`Hata: \`7 Gün boyunca\` sunucuda bulunmadığın için yetkili işlemi sonlandırıldı.`);
    let cezaPuan = await acarDatabase.cezaPuanOku(message.member)
    if(cezaPuan >= 25) return message.channel.wsend(`Hata: \`Ceza Puanı 25 ve üzeri olduğu için yetki başvurun kalıcı olarak sonlandırıldı.\``);
    let açıklama = args.splice(0).join(" ");
    if(!açıklama) return message.channel.wsend(`Hata: \`Lütfen yetkili başvuru için açıklamanızı yazın.\``);
    if(cezaPuan >= 10) {
        şüphe = `:grey_question: \`Şüpheli!\``
    } else {
        şüphe = `${message.guild.emojiGöster(emojiler.Onay)} \`Geçerli!\``
    }
    message.channel.wsend(`${message.guild.emojiGöster(emojiler.Onay)} Yetkili başvurunuz üst yetkililere iletildi en kısa zamanda sonuçlanacaktır.`).then(x => {
    x.delete({timeout: 5000})
    message.guild.kanalBul("başvurular").wsend(embed.setDescription(`${message.author} kişisinin başvuru detayı`).addField(`__**Kullanıcı Bilgisi**__`, `ID: \`${message.author.id}\`
Oluşturulma Tarihi: \`${tarihsel(message.member.createdAt)}\`
Katılım Tarihi: \`${tarihsel(message.member.joinedAt)}\`
${bilgi}
Ceza Puanı Bilgisi: \`${cezaPuan}\` ( ${şüphe} )
Başvuru Tarihi: \`${tarihsel(Date.now())}\`
`).addField(`__**Kullanıcı Açıklaması**__`, `\`${açıklama}\``))
    })
    message.react(emojiler.Onay)
    }
};