const { Client, Message, MessageEmbed } = require("discord.js");
const acar = require("../Reference/acarGet");
const acarDatabase = require("../Reference/acarDatabase");
const moment = require("moment");
require("moment-duration-format");
module.exports = {
    Isim: "info",
    Komut: ["me", "profil"],
    Kullanim: "info <@acar/ID>",
    Aciklama: "Belirlenen kişinin veya kullanan kişinin sunucu içerisindeki detaylarını ve discord içerisindeki bilgilerini aktarır.",
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
  let kullanici = message.mentions.users.first() || client.users.cache.get(args[0]) || (args.length > 0 ? client.users.cache.filter(e => e.username.toLowerCase().includes(args.join(" ").toLowerCase())).first(): message.author) || message.author;
  let uye = message.guild.member(kullanici);
  if(!uye) return message.channel.wsend(cevaplar.üyeyok);
  if(kullanici.bot) return message.channel.wsend(`Hata: \`Kullanıcı BOT\` belirtilen kullanıcı bot olduğu için işlem iptal edildi.`);
  let yetkiliBilgisi = ``;
  let yetkiliBilgisi1 = ``;
  let platform = {
    web: 'İnternet Tarayıcısı',
    desktop: 'PC (App)',
    mobile: 'Mobil'
  }
  let bilgi;
  if(uye.user.presence.status !== 'offline') { bilgi = `\`Bağlandığı Cihaz:\` ${platform[Object.keys(uye.user.presence.clientStatus)[0]]}` } else { bilgi = '`Bağlandığı Cihaz:` Çevrimdışı' }
  const embed = new MessageEmbed().setColor(ayarlar.embed.renk).setFooter(ayarlar.embed.altbaşlık).setAuthor(kullanici.tag.replace("`", ""), kullanici.avatarURL({dynamic: true, size: 2048})).setThumbnail(kullanici.avatarURL({dynamic: true, size: 2048}))
  .addField(`__**Kullanıcı Bilgisi**__`, `\`ID:\` ${kullanici.id}\n\`Profil:\` ${kullanici}\n${bilgi}\n\`Oluşturulma Tarihi:\` ${moment(kullanici.createdAt).format(`DD/MM/YYYY | HH:mm`)}\n\`Katılma Tarihi:\` ${moment(uye.joinedAt).format(`DD/MM/YYYY | HH:mm`)}\n\`Katılım Sırası:\` ${(message.guild.members.cache.filter(a => a.joinedTimestamp <= uye.joinedTimestamp).size).toLocaleString()}/${(message.guild.memberCount).toLocaleString()}\n\`Rolleri:\` ${uye.roles.cache.size <= 5 ? uye.roles.cache.filter(x => x.name !== "@everyone").map(x => x).join(', ') : `Listelenemedi! (${uye.roles.cache.size})`}`);
  if(uye.hasPermission('ADMINISTRATOR') || (roller.banKoru.some(rol => uye.roles.cache.has(rol)))) {
    let teyit = await acarDatabase.teyitÇek(uye)
    if(teyit){
      let erkekTeyit = teyit.erkek || 0;
      let kizTeyit = teyit.kadın || 0;
      yetkiliBilgisi1 += `toplam da \`${erkekTeyit+kizTeyit}\` kişi teyit etmiş.\n(**${erkekTeyit}** erkek, **${kizTeyit}** kadın)`;
        embed.addField(`__**Teyit Bilgileri**__`, yetkiliBilgisi1);
    }
  };
  let taglı = await acarDatabase.yetkiliTagKontrol(uye)
  if(taglı) {
    if(taglı >= 1) {
      embed.addField(`__**Taglı Bilgileri**__`, `Toplam da \`${taglı}\` adet taglısı mevcut.`);
    } 
  }
  if(roller.banKoru.some(x => uye.roles.cache.has(x)) || uye.hasPermission('ADMINISTRATOR')) {
    let uyari = acarDatabase.kullanıcıBilgisi(uye, "uyari");
    let chatMute = acarDatabase.kullanıcıBilgisi(uye, "mute");
    let sesMute = acarDatabase.kullanıcıBilgisi(uye, "sesmute");
    let ban = acarDatabase.kullanıcıBilgisi(uye, "ban");
    let jail = acarDatabase.kullanıcıBilgisi(uye, "jail");
    let toplam = uyari+chatMute+sesMute+ban+jail;

    yetkiliBilgisi += `Toplam \`${toplam}\` yetki komutu kullanmış.\n(**${uyari}** uyarma, **${chatMute}** chat mute, **${sesMute}** ses mute, **${jail}** jail)\n(**0** atma, **${ban}** yasaklama)`;
    embed.addField(`__**Yetki Kullanım Bilgisi**__`, yetkiliBilgisi);  
  };
       message.channel.wsend(embed);



    }
};