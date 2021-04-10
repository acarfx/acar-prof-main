const acarDatabase = require("../../Reference/acarDatabase");
module.exports = () => {
   let guild = client.guilds.cache.get(ayarlar.sunucuID);
 	setInterval( async () => {
  let channels = guild.channels.cache.filter(channel => channel.type == "voice" && channel.members.size > 0);
  channels.forEach(channel => {
      let members = channel.members.filter(member => !member.user.bot && !member.voice.selfDeaf);
      
      members.forEach(member => {
            if (member.roles.cache.has(roller.jailRolü) || member.roles.cache.has(roller.şüpheliRolü) || member.roles.cache.has(roller.yasaklıTagRolü) || (roller.Teyit.kayıtsızRolleri && roller.Teyit.kayıtsızRolleri.some(rol => member.roles.cache.has(rol)))) return;
            if(!member.user.username.includes(ayarlar.tag) &&  !member.roles.cache.has(roller.Teyit.tagRolü) && member.hasPermission('ADMINISTRATOR')) return;
        acarDatabase.coinEkle(member, coinsistem.odül.ses)
      });
  });
  }, coinsistem.kacmilisaniyesonra);
}

module.exports.config = {
    Event: "ready"
}