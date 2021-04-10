const { GuildMember } = require("discord.js");
const acar = require("../../Reference/acarGet");
const acarDatabase = require("../../Reference/acarDatabase");
 /**
 * @param {GuildMember} member 
 */

module.exports = async (member) => {
if(member.user.bot) return;
let coinoku = acarDatabase.coinOku(member)
if(coinoku >= 5) acarDatabase.coinTemizle(member);
}

module.exports.config = {
    Event: "guildMemberRemove"
}