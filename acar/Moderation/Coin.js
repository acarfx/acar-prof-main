const { Client, Message, MessageEmbed} = require("discord.js");
const acar = require("../Reference/acarGet");
const acarDatabase = require("../Reference/acarDatabase");
const coinIsmi = coinsistem.coinIsmi
module.exports = {
    Isim: "coin",
    Komut: [`${coinIsmi.toLowerCase()}`],
    Kullanim: "coin <@acar/ID>",
    Aciklama: "Belirtilen üyenin coin miktarını gösterir.",
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
  if(!coinsistem.sistem) return; 
  let embed = new MessageEmbed().setAuthor(ayarlar.embed.başlık, message.guild.iconURL({dynamic: true, size: 2048})).setFooter(coinIsmi + ' harcamak için .coinmarket komutu ile ürünlere bakabilirsiniz.').setColor(ayarlar.embed.renk)
  let kullanici = message.mentions.users.first() || client.users.cache.get(args[0]) || (args.length > 0 ? client.users.cache.filter(e => e.username.toLowerCase().includes(args.join(" ").toLowerCase())).first(): message.author) || message.author;
  let uye = message.guild.member(kullanici);
  if(!uye.roles.cache.has(roller.Teyit.tagRolü) && !uye.hasPermission('ADMINISTRATOR') && !uye.user.username.includes(ayarlar.tag) && !message.member.hasPermission('ADMINISTRATOR')) return message.channel.wsend(`Hata: İsminiz de \`${ayarlar.tag}\` sembolü bulunmadığından coin miktarınıza bakamazsınız!`).then(x => x.delete({timeout: 5000}));
  let puanoku = await acarDatabase.coinOku(uye)
  message.channel.wsend(embed.setDescription(`${uye} kişisinin güncel __${coinIsmi} Parası__ \`${puanoku} 💵\``)).then(sil => sil.delete({timeout: 8500}));
  
    }
};


