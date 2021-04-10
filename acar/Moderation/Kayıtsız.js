const {MessageEmbed} = require("discord.js");
const acar = require("../Reference/acarGet");
const acarDatabase = require("../Reference/acarDatabase");
module.exports = {
    Isim: "kayıtsız",
    Komut: ["unregisted"],
    Kullanim: "kayıtsız @acar/ID",
    Aciklama: "Belirlenen üyeyi kayıtsız üye olarak belirler.",
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
    let embed = new MessageEmbed().setAuthor(ayarlar.embed.başlık, message.guild.iconURL({dynamic: true})).setColor(ayarlar.embed.renk)
    let uye = message.mentions.members.first() || message.guild.members.cache.get(args[0])
    if(!roller.kurucuRolleri.some(oku => message.member.roles.cache.has(oku)) && !roller.yönetimRolleri.some(oku => message.member.roles.cache.has(oku)) && !roller.altYönetimRolleri.some(oku => message.member.roles.cache.has(oku)) && !message.member.hasPermission('ADMINISTRATOR')) return message.channel.wsend(cevaplar.noyt)
    if(!uye) return message.channel.wsend(cevaplar.üye + ` \`${sistem.prefix}${module.exports.Isim} <@acar/ID>\``);
    if(message.author.id === uye.id) return message.channel.wsend(cevaplar.kendi);
    if(!uye.manageable) return message.channel.wsend(cevaplar.dokunulmaz);
    if(message.member.roles.highest.position <= uye.roles.highest.position) return message.channel.wsend(cevaplar.yetkiust);
    if(uye.roles.cache.has(roller.Teyit.kayıtsızRolü)) return message.channel.wsend(cevaplar.kayıtsız)
    let sebep = args.splice(1).join(" ");
    if(!sebep) return message.channel.wsend(cevaplar.sebep);
    uye.setNickname(`${uye.user.username.includes(ayarlar.tag) ? ayarlar.tag : (ayarlar.tagsiz ? ayarlar.tagsiz : (ayarlar.tag || ""))} İsim | Yaş`)
    uye.rolTanımla(roller.Teyit.kayıtsızRolleri)
    if(uye.voice.channel) uye.voice.kick()
    acarDatabase.kayıtsızYap(uye)
    message.guild.kanalBul("kayıtsız-log").wsend(embed.setDescription(`${uye} isimli üye ${message.author} tarafından **${tarihsel(Date.now())}** tarihinde **${sebep}** nedeniyle kayıtsız üye olarak belirlendi.`).setFooter(ayarlar.embed.altbaşlık))
    message.channel.wsend(`${message.guild.emojiGöster(emojiler.HoşGif)} ${uye} üyesi, **${sebep}** nedeniyle kayıtsız üye olarak belirlendi.`)
    message.react(emojiler.Onay)
    }
};