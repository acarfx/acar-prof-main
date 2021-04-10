const {MessageEmbed} = require("discord.js");
const acar = require("../Reference/acarGet");
const acarDatabase = require("../Reference/acarDatabase");
const moment = require("moment");
require("moment-duration-format");
require("moment-timezone");
module.exports = {
    Isim: "ceza",
    Komut: ["ceza"],
    Kullanim: "ceza bilgi <#Ceza-No>",
    Aciklama: "Belirtilen ceza numarasının ceza bilgilerini ve kime ait olduğunu gösterir.",
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
       let embed = new MessageEmbed().setAuthor(ayarlar.embed.başlık, message.guild.iconURL({dynamic: true})).setColor(ayarlar.embed.renk)
    let sorgu = args[0];
    if(sorgu == "bilgi" || sorgu == "info") {
        if(!args[1]) return message.channel.wsend(`Hata: Lütfen geçerli bir ceza numarası giriniz.`).then(x => x.delete({timeout: 5000}));
        if(Number(args[1]) && args[1].length < 15) {
            let ceza = acarDatabase.cezaBilgi(args[1])
            if(!ceza){
                return message.channel.wsend(`Hata: (\`#${args[1]}\`) numaralı ceza bulunamadı.`).then(x => x.delete({timeout:6500}));
            }
            let aylartoplam = {
                "01": "Ocak",
                "02": "Şubat",
                "03": "Mart",
                "04": "Nisan",
                "05": "Mayıs",
                "06": "Haziran",
                "07": "Temmuz",
                "08": "Ağustos",
                "09": "Eylül",
                "10": "Ekim",
                "11": "Kasım",
                "12": "Aralık"
              };
            let aylar = aylartoplam;
        const kisi = await acar.GetUser(ceza.Cezalanan);
            let kisibilgi;
            if(kisi != `\`Bulunamayan Üye\`` && kisi.username) kisibilgi = `${kisi} (\`${kisi.id}\`)`;
            if(!kisibilgi) kisibilgi = "<@"+ceza.Cezalanan+">" + `(\`${ceza.Cezalanan}\`)`
            let kisi2 = await acar.GetUser(ceza.Yetkili);
            let kisibilgi2;
            if(kisi2 != `\`Bulunamayan Üye\`` && kisi2.username) kisibilgi2 = `${kisi2} (\`${kisi2.id}\`)`;
            if(!kisibilgi2) kisibilgi2 = "Bilinmiyor"
            let Zaman = ceza.Zaman;
            let Bz = ceza.BitisZaman;
            let cezabitme;
            let aktifmi = ceza.Aktif == true ? "✅ Ceza Durumu Aktif" : "❌ Ceza Durumu Aktif Değil!"
            let cezaZaman = ceza.AtilanSure || `Yok!`; 
            let kaldirilma;
            if(ceza.Kaldiran === "Kaldırma İşlemi Yok!") {
              kaldirilma = ``
            } else {
              kaldirilma = "» Ceza'yı Kaldıran: <@" + ceza.Kaldiran + ">" + `(\`${ceza.Kaldiran}\`)`
            };
            if(isNaN(Bz)){
             cezabitme = aktifmi;
            } else {
             cezabitme = aktifmi;  
            }
           let cezabas = moment(Zaman).tz("Europe/Istanbul").format("DD") + " " + aylar[moment(Zaman).tz("Europe/Istanbul").format("MM")] + " " + moment(Zaman).tz("Europe/Istanbul").format("YYYY HH:mm:ss") 
            message.channel.wsend(embed.setDescription(`
            » Üye Bilgisi: ${kisibilgi}
            » Yetkili Bilgisi: ${kisibilgi2}
            » Ceza Tarihi: \`${cezabas}\`
            » Ceza Süresi: \`${cezaZaman}\`
            » Ceza Durumu: \`${cezabitme}\`
            ${kaldirilma}
            `).addField(`» Ceza Türü`, `__` + ceza.Tur + `__` , true).addField(`Ceza Sebebi`,ceza.Sebep,true).setFooter(ayarlar.embed.altbaşlık + ` • Ceza Numarası #${ceza.No}`)).then(x => x.delete({timeout: 30000}));
        }
      return 
      };  

      if(sorgu == "temizle") {
        if(!sistem.staff.some(id => message.author == id)) return;
        if(!Number(args[1])) return message.channel.wsend(cevaplar.üye + ` \`${sistem.prefix}${module.exports.Isim} temizle <@acar/ID>\``);
        acarDatabase.sicilTemizle(args[1]);
        message.react(emojiler.Onay)
        return;
      };
      message.channel.wsend(`Hata: Ceza sorgusu yapmak için öncelikle __Ceza Numarası__ ID'sine ihtiyacın var __Örn__: \`${sistem.prefix}${module.exports.Isim} bilgi <#Ceza-No>\``).then(sil => sil.delete({timeout: 5000}));
  }
};