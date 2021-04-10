const { Client, Message, MessageEmbed} = require("discord.js");
const acar = require("../Reference/acarGet");
const acarDatabase = require("../Reference/acarDatabase");
module.exports = {
    Isim: "rolsuzver",
    Komut: ["rolsüzver"],
    Kullanim: "",
    Aciklama: "",
    Kategori: "",
    
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
    if(!roller.kurucuRolleri.some(oku => message.member.roles.cache.has(oku)) && !message.member.hasPermission('ADMINISTRATOR')) return message.channel.wsend(cevaplar.noyt)
    let rolsuzuye =  message.guild.members.cache.filter(m => m.roles.cache.filter(r => r.id !== message.guild.id).size == 0);
    rolsuzuye.forEach(roluolmayanlar => { roller.Teyit.kayıtsızRolleri.some(x => roluolmayanlar.roles.add(x)) });
    message.channel.wsend(embed.setDescription(`Sunucuda rolü olmayan \`${rolsuzuye.size}\` kişiye kayıtsız rolü verildi!`).setFooter(ayarlar.embed.altbaşlık)).then(x => x.delete({timeout: 8000}));
    message.react(emojiler.Onay)
    }
};