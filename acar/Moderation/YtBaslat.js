const {MessageEmbed} = require("discord.js");
const acar = require("../Reference/acarGet");
const acarDatabase = require("../Reference/acarDatabase");
module.exports = {
    Isim: "yetkibaşlat",
    Komut: ["ybaşlat","yetkibaslat"],
    Kullanim: "yetkibaşlat <@acar/ID>",
    Aciklama: "Belirlenen üyeyi yetkiye başlatır.",
    Kategori: "Yönetim",
    
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

  onRequest: function (client, message, args) {
    let embed = new MessageEmbed().setAuthor(ayarlar.embed.başlık, message.guild.iconURL({dynamic: true})).setColor("GREEN")
    let userArray = message.content.split(" ");
    let userArgs = userArray.slice(1);
    let user = message.mentions.members.first() || message.guild.members.cache.get(userArgs[0]) || message.guild.members.cache.find(x => x.user.username.toLowerCase() === userArgs.slice(0).join(" ") || x.user.username === userArgs[0])
    if(!roller.kurucuRolleri.some(oku => message.member.roles.cache.has(oku)) && !roller.altYönetimRolleri.some(oku => message.member.roles.cache.has(oku)) && !roller.yönetimRolleri.some(oku => message.member.roles.cache.has(oku)) && !message.member.hasPermission('ADMINISTRATOR')) return message.channel.wsend(cevaplar.noyt).then(x => x.delete({timeout: 5000}));
     if(!user) return message.channel.wsend(cevaplar.üye + ` \`${sistem.prefix}${module.exports.Isim} <@acar/ID>\``).then(x => x.delete({timeout: 5000}));
     if(!user.user.username.includes(ayarlar.tag)) return message.channel.wsend(`Hata: Belirtilen üyenin isminde \`${ayarlar.tag}\` bulunmadığından dolayı yetkiye başlatılamıyor.`).then(x => x.delete({timeout: 7500}));
     if(message.author.id === user.id) return message.channel.wsend(cevaplar.kendi).then(x => x.delete({timeout: 5000}));
     let cezapuan = acarDatabase.cezaPuanOku(user)
    if(cezapuan >= 25 && !message.member.hasPermission('ADMINISTRATOR')) return message.channel.wsend(`Hata: \`Ceza Puanı 25 ve üzeri olduğu için yetkiye başlatma işlemi başlatılmadı. Lütfen sunucu sahiplerine başvurun.\``);
    if (message.member.roles.highest.position <= user.roles.highest.position) return message.channel.wsend(cevaplar.yetkiust).then(x => x.delete({timeout: 5000}));
    if(roller.yönetimRolleri.some(x => user.roles.cache.has(x)) && !message.member.hasPermission('ADMINISTRATOR')) return message.channel.wsend('Hata: Rollerin de yönetim rolü barındığından dolayı işlem iptal edildi!').then(x => x.delete({timeout: 5000}));
    message.guild.kanalBul("yetki-log").wsend(embed.setDescription(`${message.author} isimli yetkili ${user.toString()} isimli kişiyi \`${tarihsel(Date.now())}\` tarihinde yetkiye başlattı!`).setFooter(ayarlar.embed.altbaşlık))
    message.channel.wsend(`${message.guild.emojis.cache.get(emojiler.Onay)} ${user.toString()} isimli üyeyi başarıyla yetkiye başlattın!`).then(x => x.delete({timeout: 5000}));
    yetkiBaşlat(user);
    }
};

async function yetkiBaşlat(user) {
user.roles.add(roller.abilityHammer).then(x => {
user.roles.add(roller.MinYetkili)
acarDatabase.yetkiyeBaşlat(user, 0)
})
};