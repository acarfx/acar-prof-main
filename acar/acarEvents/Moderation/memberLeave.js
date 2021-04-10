const { GuildMember } = require("discord.js");
const acar = require("../../Reference/acarGet");
const acarDatabase = require("../../Reference/acarDatabase");
 /**
 * @param {GuildMember} member 
 */

module.exports = async (member) => {
if(member.user.bot) return;

// Taglı
let tagliKontrol = acarDatabase.tagKontrol(member);
if(tagliKontrol) acarDatabase.tagdanÇıkar(member);

// Sunucudan çıkınca Bilgi
let sonisim = acarDatabase.sonIsimÇek(member);
if(sonisim) acarDatabase.isimGuncelle(member.id, sonisim.Isim, sonisim.Yas, 'Sunucudan Ayrılma');

//Terfi sisteminden yetki çektirme!
let yetkibilgi = acarDatabase.terfiGetir(member, ayarlar.sunucuID);
if(yetkibilgi) acarDatabase.yetkiÇek(member);

}

module.exports.config = {
    Event: "guildMemberRemove"
}