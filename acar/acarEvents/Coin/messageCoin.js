const { Message, MessageEmbed } = require("discord.js");
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
    acarDatabase.mesajEkle(message.member);
    kontrol = acarDatabase.mesajKontrol(message.member);
    if(kontrol >= coinsistem.kacmesajdabir) {
    acarDatabase.mesajSil(message.member);
    acarDatabase.coinEkle(message.member, coinsistem.odül.mesaj)
   }
}

module.exports.config = {
    Event: "message"
}