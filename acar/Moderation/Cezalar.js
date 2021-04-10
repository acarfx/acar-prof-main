const {MessageAttachment} = require("discord.js");
const acar = require("../Reference/acarGet");
const acarDatabase = require("../Reference/acarDatabase");
const table = require("table");
const moment = require("moment");
require("moment-duration-format");
require("moment-timezone");
module.exports = {
    Isim: "sicil",
    Komut: ["cezalar"],
    Kullanim: "cezalar <@acar/ID>",
    Aciklama: "Belirtilen üyenin aktif veya deaktif cezalarını belirtir.",
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
    let uye = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || await acar.GetUser(args[0]);
    if (!uye) return message.channel.wsend(cevaplar.üyeyok);
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

        let res = await acarDatabase.cezaGetir(uye) || [];
        if(acarDatabase.cezaGetir(uye)) {
        let data = [["ID", "🔵", "Ceza Tarihi", "Ceza Türü", "Ceza Sebebi"]];
        data = data.concat(res.map(value => {          
          return [
            `#${value.No}`,
            `${acarDatabase.cezaBilgi(value.No).Aktif == true ? "✅" : "❌"}`,
            `${moment(value.Zaman).tz("Europe/Istanbul").format("DD") + " " + aylar[moment(value.Zaman).tz("Europe/Istanbul").format("MM")] + " " + moment(value.Zaman).tz("Europe/Istanbul").format("YYYY HH:mm")}`,
            `${value.Tip}`,
            `${value.Sebep}`
          ]
        }));
        let veriler = table.table(data, {
            columns: {
                0: {
                    paddingLeft: 1
                },
                1: {
                    paddingLeft: 1
                },
                2: {
                    paddingLeft: 1,
                },
                3: {
                    paddingLeft: 1,
                    paddingRight: 1
                },
            },
           border : table.getBorderCharacters(`void`),  
           drawHorizontalLine: function (index, size) {
               return index === 0 || index === 1 || index === size;
           }
       })
        message.channel.wsend(`:no_entry_sign: <@${uye.id}> kişisinin ceza bilgileri aşağıda belirtilmiştir. Tekli bir cezaya bakmak için \`.ceza bilgi ID\` komutunu uygulayınız.\n\`\`\`${veriler}\`\`\``).catch(acar => {
            let dosyahazırla; 
            dosyahazırla = new MessageAttachment(Buffer.from(veriler), `${uye.id}-cezalar.txt`);
            message.channel.wsend(`:no_entry_sign: <@${uye.id}> kişisinin cezaları **Discord API** sınırını geçtiği için metin belgesi hazırlayıp gönderdim, oradan cezaları kontrol edebilirsin.\nTekli bir cezaya bakmak için \`.ceza bilgi ID\` komutunu uygulayınız.`, dosyahazırla); 
        });
    } else {
        message.channel.wsend(`${message.guild.emojiGöster(emojiler.Onay)} Belirtilen kişinin ceza kayıtı bulunamadı.`)
    }
    }
};