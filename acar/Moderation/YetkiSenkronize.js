const { Client, Message} = require("discord.js");
const acar = require("../Reference/acarGet");
const acarDatabase = require("../Reference/acarDatabase");
const { localeData } = require("moment");
module.exports = {
    Isim: "ysenk",
    Komut: ["yetkisenkronize","y"],
    Kullanim: "yetkisenkronize <@acar/ID> <Yetki S.Kodu>",
    Aciklama: "Belirlenen üyeyi terfi sistemine senkronize eder.",
    Kategori: "Kurucu",
    
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
    let işlem = args[0]
    if(işlem !== "u" && işlem !== "r") return;
    if(işlem === "u") {
    let kullArray = message.content.split(" ");
    let kullArgs = kullArray.slice(1);
    let uye = message.mentions.members.first() || message.guild.members.cache.get(kullArgs[1]) || message.guild.members.cache.find(x => x.user.username.toLowerCase() === kullArgs.slice(1).join(" ") || x.user.username === kullArgs[1])
    if(!sistem.staff.some(id => message.author == id)) return;
    if(!uye) return message.channel.wsend(cevaplar.üye + ` \`${sistem.prefix}${module.exports.Isim} u <@acar/ID> <Yetki Numarası>\``).then(x => x.delete({timeout: 5000}));
    if(!uye.user.username.includes(ayarlar.tag)) return message.channel.wsend(`Hata: Belirtilen üyenin isminde \`${ayarlar.tag}\` bulunmadığından dolayı yetkisi sisteme senkronize yapılamıyor.`).then(x => x.delete({timeout: 7500}));
    if(message.author.id === uye.id) return message.channel.wsend(cevaplar.kendi).then(x => x.delete({timeout: 5000}));
    let yetkiKodu = parseInt(args[2]);
    if(isNaN(yetkiKodu)) return message.channel.wsend(cevaplar.argümandoldur + ` \`${sistem.prefix}${module.exports.Isim} <@acar/ID> <Yetki S.Numarası>\``);
    acarDatabase.yetkiyeBaşlat(uye, yetkiKodu)
    message.react(global.emojiler.Onay)
    } else if(işlem === "r") {
      const rol = message.mentions.roles.first() || message.guild.roles.cache.get(args[1]);
      if(!rol) return message.channel.wsend(`Hata: Lütfen bir rol giriniz! __Örn:__ \`${sistem.prefix}${module.exports.Isim} r <@rol/ID>\``);
      if(rol.members.size === 0) return message.channel.wsend(`Hata: \`Belirtilen rolde üye bulunamadı ve işlem iptal edildi!\``);
        rol.members.forEach(async uye => {
          if (uye.user.bot) return;
            if (terfisistem.yetkipuan.some(x => uye.roles.cache.has(x.rol))) {
              let acar = terfisistem.yetkipuan.find(x => uye.roles.cache.has(x.rol))
              let seviye = parseInt(acar.seviye);
              if(!roller.abilityHammer.some(x => uye.roles.cache.has(x))) await uye.roles.add(roller.abilityHammer);
              await acarDatabase.yetkiyeBaşlat(uye, seviye)
              message.channel.wsend(`${message.guild.emojiGöster(emojiler.Onay)} ${uye} kişisi \`${rol.name}\` yetkisine senkronize edildi.`);
            } else return message.channel.wsend(`Hata: \`Belirtilen rolde terfi sistemine bağlı hiçbir üye bulunamadı!\``);
        
        });
    }
    }
};

