const acarDatabase = require("../../Reference/acarDatabase");
module.exports = async () => {
   let guild = client.guilds.cache.get(ayarlar.sunucuID);
 	setInterval( async () => {
  let channels = guild.channels.cache.filter(channel => channel.type == "voice" && channel.members.size > 0 && channel.parent && terfisistem.izinliKategoriler.includes(channel.parentID));
  channels.forEach(channel => {
      let members = channel.members.filter(member => !member.user.bot && !member.voice.selfDeaf && terfisistem.yetkiler.some(x => member.roles.cache.has(x)));
      members.forEach(member => {
            if (member.roles.cache.has(roller.jailRolü) || member.roles.cache.has(roller.şüpheliRolü) || member.roles.cache.has(roller.yasaklıTagRolü) || (roller.Teyit.kayıtsızRolleri && roller.Teyit.kayıtsızRolleri.some(rol => member.roles.cache.has(rol)))) return;
            if(!member.user.username.includes(ayarlar.tag) &&  !member.roles.cache.has(roller.Teyit.tagRolü)) return;
            if(member.roles.cache.has(terfisistem.sonyetki)) return;
            acarDatabase.terfiPuanEkle(member, terfisistem.odül.ses)
      });
  });
  }, terfisistem.kacmilisaniyesonra);
}

module.exports.config = {
    Event: "ready"
}
