const { Client, Message, MessageEmbed} = require("discord.js");
const acar = require("../Reference/acarGet");
const acarDatabase = require("../Reference/acarDatabase");
module.exports = {
    Isim: "taglılar",
    Komut: ["taglılarım"],
    Kullanim: "taglılar <@acar/ID>",
    Aciklama: "Belirlenen veya komutu kullanan kişi belirlediği taglı sayısını ve en son belirlediği taglı sayısını gösterir.",
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
    let embed = new MessageEmbed().setAuthor(ayarlar.embed.başlık, message.guild.iconURL({dynamic: true})).setColor(ayarlar.embed.renk).setFooter(ayarlar.embed.altbaşlık)
    if(!roller.Teyit.teyitciRolleri.some(oku => message.member.roles.cache.has(oku)) && !roller.kurucuRolleri.some(oku => message.member.roles.cache.has(oku)) && !roller.altYönetimRolleri.some(oku => message.member.roles.cache.has(oku)) && !roller.Yetkiler.some(oku => message.member.roles.cache.has(oku)) && !roller.yönetimRolleri.some(oku => message.member.roles.cache.has(oku)) && !message.member.hasPermission('ADMINISTRATOR')) return message.channel.wsend(cevaplar.noyt);
    let kullanıcı = message.mentions.users.first() || message.guild.members.cache.get(args[0]) || await acar.GetUser(args[0]) || (args.length > 0 ? client.users.cache.filter(e => e.username.toLowerCase().includes(args.join(" ").toLowerCase())).first(): message.author) || message.author;
    let uye = message.guild.member(kullanıcı);
    if (!uye) return message.channel.wsend(cevaplar.üyeyok);
    let taglilar = await acarDatabase.yetkiliTagKontrol(uye);
    let sontaglısı = await acarDatabase.sonTaglıKontrol(uye);
    let bilgi;
    if(acar.GetUser(sontaglısı.kim)) {
        if(taglilar > 0) {
                bilgi = `${uye} isimli kişinin toplam da \`${taglilar}\` adet taglısı mevcut.
                Son taglı kişisi <@${sontaglısı.kim}> olarak \`${tarihsel(sontaglısı.tarih)}\` tarihinde belirlenmiştir.`
            } else if(taglilar == 0) {
                bilgi = `${uye} isimli kişinin taglı bilgisi bulunamadı.`
        }
    }
    message.channel.wsend(embed.setDescription(bilgi))
    }
};