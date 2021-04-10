const { Message } = require("discord.js");
const acar = require("../../Reference/acarGet");
const acarDatabase = require("../../Reference/acarDatabase");
const veriler = new Map();
 /**
 * @param {Message} message 
 */

module.exports = async (message) => {
    if(message.webhookID || message.author.bot || message.channel.type === "dm" || !message.guild || message.content.startsWith(sistem.prefix)) return;
    if(message.member.roles.cache.has(roller.jailRolü) || message.member.roles.cache.has(roller.şüpheliRolü) || message.member.roles.cache.has(roller.yasaklıTagRolü) || (roller.Teyit.kayıtsızRolleri && roller.Teyit.kayıtsızRolleri.some(rol => message.member.roles.cache.has(rol)))) return;
    if(!message.member.user.username.includes(ayarlar.tag) &&  !message.member.roles.cache.has(roller.Teyit.tagRolü)) return;
    if(message.channel.id !== kanallar.chatKanalı) return;
    
    if (terfisistem.yetkiler.some(x => message.member.roles.cache.has(x))) {
        if(message.member.roles.cache.has(terfisistem.sonyetki)) return;
        const veri = veriler.get(message.author.id);
        if (veri && (veri % terfisistem.kacmesajdabir) === 0) { 
          veriler.set(message.author.id, veri + 1);
        acarDatabase.terfiPuanEkle(message.member, terfisistem.odül.mesaj)
        } else veriler.set(message.author.id, veri ? veri + 1 : 1);
        
      }
}

module.exports.config = {
    Event: "message"
}