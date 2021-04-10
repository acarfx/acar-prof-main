const { Client, Message, MessageEmbed} = require("discord.js");
const acar = require("../Reference/acarGet");
const acarDatabase = require("../Reference/acarDatabase");
module.exports = {
    Isim: "isimler",
    Komut: ["isimsorgu"],
    Kullanim: "isimler <@acar/ID>",
    Aciklama: "Belirlenen üyenin önceki isim ve yaşlarını gösterir.",
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
    if(!roller.Teyit.teyitciRolleri.some(oku => message.member.roles.cache.has(oku)) && !roller.kurucuRolleri.some(oku => message.member.roles.cache.has(oku)) && !roller.altYönetimRolleri.some(oku => message.member.roles.cache.has(oku)) && !roller.Yetkiler.some(oku => message.member.roles.cache.has(oku)) && !roller.yönetimRolleri.some(oku => message.member.roles.cache.has(oku)) && !message.member.hasPermission('ADMINISTRATOR')) return message.channel.wsend(cevaplar.noyt);
    let kullanıcı = message.mentions.users.first() || message.guild.members.cache.get(args[0]) || await acar.GetUser(args[0]) || (args.length > 0 ? client.users.cache.filter(e => e.username.toLowerCase().includes(args.join(" ").toLowerCase())).first(): message.author) || message.author;
    let uye = message.guild.member(kullanıcı);
    if (!uye) return message.channel.wsend(cevaplar.üyeyok);
    let isimveri = acarDatabase.isimlerÇek(uye);
    isimveri = isimveri.reverse();
    let numara = isimveri.length || `0`;
    let isimler = isimveri.length > 0 ? isimveri.map((value, index) => `\`${ayarlar.tag} ${value.Isim} | ${value.Yas}\` (${value.islembilgi}) ${value.Yetkili ? "(<@"+ value.Yetkili + ">)" : ""}`).join("\n") : "";
	message.channel.wsend(embed.setDescription(`${uye} kişisinin toplamda ${numara} isim kayıtı bulundu.
    \n${isimler}`).setFooter(ayarlar.embed.altbaşlık));
    }
};