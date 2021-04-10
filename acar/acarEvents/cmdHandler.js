const { Message, MessageEmbed } = require("discord.js");

 /**
 * @param {Message} message 
 */

module.exports = (message) => {
    if (message.author.bot ||!message.content.startsWith(global.sistem.prefix) || !message.channel || message.channel.type == "dm") return;
    let args = message.content
      .substring(global.sistem.prefix.length)
      .split(" ");
    let komutcuklar = args[0];
    let bot = message.client;

        //Gereksinimler Başlangıç
            let emojiler = global.emojiler
            let kanallar = global.kanallar
            let roller = global.roller
            let ayarlar = global.ayarlar
            let sistem = global.sistem
            let coinsistem = global.coinsistem
            let terfisistem = global.terfisistem
        //Gereksinimler Bitiş

      if([".tag","!tag"].includes(message.content.toLowerCase())){ 
          return message.channel.wsend("`"+ayarlar.tag+"`"); 
      }
      if([".link","!link"].includes(message.content.toLowerCase())){ 
        return message.channel.wsend("`"+ayarlar.link+"`"); 
      }
      
    args = args.splice(1);
    let calistirici;
    if (bot.komut.has(komutcuklar)) {
      calistirici = bot.komut.get(komutcuklar);
      if (message.member.roles.cache.has(roller.jailRolü) || message.member.roles.cache.has(roller.şüpheliRolü) || message.member.roles.cache.has(roller.yasaklıTagRolü) || (roller.Teyit.kayıtsızRolleri && roller.Teyit.kayıtsızRolleri.some(rol => message.member.roles.cache.has(rol)))) return;
          if(!kanallar.izinliKanallar.some(x => message.channel.id == x) && !message.member.hasPermission('ADMINISTRATOR')) return message.channel.wsend(`Hata: \`Bu komutu sadece komut kanallarında kullanabilirsin.\``).then(x=> x.delete({timeout: 5000}));
      calistirici.onRequest(bot, message, args);
    } else if (bot.komutlar.has(komutcuklar)) {
      calistirici = bot.komutlar.get(komutcuklar);
      if (message.member.roles.cache.has(roller.jailRolü) || message.member.roles.cache.has(roller.şüpheliRolü) || message.member.roles.cache.has(roller.yasaklıTagRolü) || (roller.Teyit.kayıtsızRolleri && roller.Teyit.kayıtsızRolleri.some(rol => message.member.roles.cache.has(rol)))) return;
           if(!kanallar.izinliKanallar.some(x => message.channel.id == x) && !message.member.hasPermission('ADMINISTRATOR')) return message.channel.wsend(`Hata: \`Bu komutu sadece komut kanallarında kullanabilirsin.\``).then(x=> x.delete({timeout: 5000}));
      calistirici.onRequest(bot, message, args);
    }
}

module.exports.config = {
    Event: "message"
}