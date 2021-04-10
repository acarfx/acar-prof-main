const {MessageEmbed} = require("discord.js");
const acar = require("../Reference/acarGet");
const acarDatabase = require("../Reference/acarDatabase");
module.exports = {
    Isim: "terfi",
    Komut: ["yetkim","yetki"],
    Kullanim: "yetkim <@acar/ID>",
    Aciklama: "Belirlenen üye veya kullanan üye eğer ki yetkiliyse onun yetki atlama bilgilerini gösterir.",
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
        if(!terfisistem.sistem) return; 
        let embed = new MessageEmbed()
        let kullArray = message.content.split(" ");
        let kullaniciId = kullArray.slice(1);
        let uye = message.mentions.members.first() || message.guild.members.cache.get(kullaniciId[0]) || message.guild.members.cache.find(x => x.user.username.toLowerCase() === kullaniciId.slice(0).join(" ") || x.user.username === kullaniciId[0]) || message.member;
        if (!terfisistem.yetkiler.some(x => message.member.roles.cache.has(x)) && !roller.kurucuRolleri.some(oku => message.member.roles.cache.has(oku)) && !message.member.hasPermission('ADMINISTRATOR'))  return message.channel.wsend(cevaplar.noyt);
      if(message.member.roles.cache.has(terfisistem.sonyetki) && !message.member.hasPermission('ADMINISTRATOR')) return message.channel.wsend(`Hata: \`Zaten son alt yetkidesin, bütün emeklerin için teşşekür ederiz.\``);
        const puanBilgisi = await acarDatabase.terfiGetir(uye, message.guild.id);
        if(!puanBilgisi) return message.channel.wsend(`Hata: \`Puan Bilgisine Ulaşılamadı!\` hatası nedeniyle bu panele ulaşamazsınız!`);
        const yeniRol = terfisistem.yetkipuan[terfisistem.yetkipuan.indexOf(terfisistem.yetkipuan.find(x => x.seviye == (puanBilgisi ? puanBilgisi.seviye : 0)))] || terfisistem.yetkipuan[terfisistem.yetkipuan.length-1];
        const eskiRol = terfisistem.yetkipuan[terfisistem.yetkipuan.indexOf(terfisistem.yetkipuan.find(x => x.seviye == (puanBilgisi ? puanBilgisi.eskiseviye : 0)))] || terfisistem.yetkipuan[terfisistem.yetkipuan.length-1];
        const puanBelirt = puanBilgisi.seviye * 2 * 250
        const puanBari = terfisistem.yetkiler.some(x => uye.roles.cache.has(x)) && terfisistem.yetkipuan.length > 0 ? `${progressBar(puanBilgisi ? puanBilgisi.puan : 0, puanBelirt, 8, puanBilgisi.puan)} \`${puanBilgisi ? puanBilgisi.puan : 0} / ${puanBelirt}\`` : "";
        let cezapuanoku = acarDatabase.cezaPuanOku(uye);
        let teyitoku = await acarDatabase.teyitÇek(uye);
        let teyitbilgi;
        if(teyitoku) {
        let erkekteyit = teyitoku.erkek || 0;
        let kadınteyit = teyitoku.kadın || 0;
        let toplamteyit = erkekteyit + kadınteyit
        teyitbilgi = `${toplamteyit} adet (Puan Etkisi: +${toplamteyit * terfisistem.odül.kayıt} => ${puanBilgisi.puan})`
        } else {
        teyitbilgi = `0 adet (Puan Etkisi: +0 => ${puanBilgisi.puan})`
        }
        let taglıÇek = acarDatabase.yetkiliTagKontrol(uye);
        let yetkidurumu;
        if(yeniRol) {
          yetkidurumu = `Şu an <@&${eskiRol.rol}> rolündesiniz. <@&${yeniRol.rol}> rolüne ulaşmak için! \`${puanBelirt-puanBilgisi.puan}\` puan kazanmanız gerekiyor.`
        };
        if(yeniRol.rol == eskiRol.rol) yetkidurumu = `Şu an son yetkidesiniz! Emekleriniz için teşekkür ederiz.`;
        message.channel.wsend(embed
          .setAuthor(ayarlar.embed.başlık, message.guild.iconURL({dynamic: true, size: 2048}))
          .setColor(ayarlar.embed.renk)
          .setFooter(ayarlar.embed.altbaşlık)
          .setDescription(`${uye} (${uye.roles.highest}) kullanıcısının yetki yükseltim bilgileri aşağıda belirtilmiştir.`)
          .addField(`Notlar`,`Şuan da \`${cezapuanoku}\` ceza puanın görünmekte, aldığın cezalar senin puan kazanmanı kalıcı olarak etkileyecek. (\`Ceza Puan: ${cezapuanoku}\`)`)
          .addField(`${message.guild.emojis.cache.get(emojiler.Terfi.icon)} Ceza Puan Durumu`,` 
${message.guild.emojis.cache.get(emojiler.Terfi.miniicon)} Toplam Puan: \`${puanBilgisi.puan} (Ceza Etkisi: -${cezapuanoku} => ${puanBilgisi.puan})\``)
          .addField(`${message.guild.emojis.cache.get(emojiler.Terfi.icon)} Genel Puan Durumu`,` 
${message.guild.emojis.cache.get(emojiler.Terfi.miniicon)} Taglı Puan : \`${taglıÇek} adet (Puan Etkisi: +${taglıÇek*terfisistem.odül.taglı} => ${puanBilgisi.puan})\`
${message.guild.emojis.cache.get(emojiler.Terfi.miniicon)} Teyit Puan : \`${teyitbilgi}\``)
          .addField(`${message.guild.emojis.cache.get(emojiler.Terfi.icon)} Puan Durumu`, `Puanınız: \`${puanBilgisi.puan}\` Gereken Puan: \`${puanBelirt-puanBilgisi.puan}\`\n${puanBari}`)
          .addField(`${message.guild.emojis.cache.get(emojiler.Terfi.icon)} Yetki Durumu`, yetkidurumu)
          );
      function progressBar(value, maxValue, size, veri) {
        const progress = Math.round(size * ((value / maxValue) > 1 ? 1 : (value / maxValue)));
        const emptyProgress = size - progress > 0 ? size - progress : 0;
         let progressStart;
            if(veri == 0) progressStart = `${message.guild.emojis.cache.get(emojiler.Terfi.başlangıçBar)}`
            if(veri > 0) progressStart = `${message.guild.emojis.cache.get(emojiler.Terfi.başlamaBar)}`
             const progressText = `${message.guild.emojis.cache.get(emojiler.Terfi.doluBar)}`.repeat(progress);
             const emptyProgressText = `${message.guild.emojis.cache.get(emojiler.Terfi.boşBar)}`.repeat(emptyProgress)
             const bar = progressStart + progressText + emptyProgressText + `${emptyProgress == 0 ? `${message.guild.emojis.cache.get(emojiler.Terfi.doluBitişBar)}` : `${message.guild.emojis.cache.get(emojiler.Terfi.boşBitişBar)}`}`;
        return bar;
      };
  }
};