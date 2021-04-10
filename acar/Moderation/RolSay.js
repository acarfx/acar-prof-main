const { Client, Message} = require("discord.js");
const acar = require("../Reference/acarGet");
const acarDatabase = require("../Reference/acarDatabase");
const ms = require('ms')
module.exports = {
    Isim: "rolsay",
    Komut: ["rol-say"],
    Kullanim: "rolsay <Rol-ID>",
    Aciklama: "",
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

  onRequest: async function (client, message, args) {
    if(!roller.kurucuRolleri.some(oku => message.member.roles.cache.has(oku)) && !roller.yönetimRolleri.some(oku => message.member.roles.cache.has(oku)) && !message.member.hasPermission('ADMINISTRATOR')) return message.channel.wsend(cevaplar.noyt); 
    const role = message.mentions.roles.first() || message.guild.roles.cache.get(args[0]) || message.guild.roles.cache.find(x => x.name.match(new RegExp(args.join(' '), 'gi')));
    if (!args[0] || !role || role.id === message.guild.id) return message.channel.wsend('Hata: Belirtilen rol bulunamadı yada rol numarası geçersiz!');
    message.channel.wsend(`Rol: ${role.name} | ${role.id} (${role.members.size < 1 ? 'Bu rolde hiç üye yok!' : role.members.size})`, { code: 'xl' });
    message.channel.wsend(role.members.array().map((x) => x.toString()).join(', '), { code: 'xl', split: { char: ', ' } });
   }
};