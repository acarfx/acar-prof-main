const { User, GuildMember, MessageEmbed } = require("discord.js");
const acar = require("../../Reference/acarGet");
const acarDatabase = require("../../Reference/acarDatabase");
const ms = require("ms");
 /**
 * @param {User} oldUser 
 * @param {User} newUser 
 */
module.exports = async (oldUser, newUser) => {
    if(oldUser.username == newUser.username || oldUser.bot || newUser.bot) return;
    let client = oldUser.client;
    let guild = client.guilds.cache.get(ayarlar.sunucuID);
    if(!guild) return;
    let user = guild.members.cache.get(oldUser.id);
    if(!user) return;
    let yasakTaglilar = acarDatabase.yasakTagÇek();

    /**
     * @type {GuildMember}
     */
    let embed = new MessageEmbed().setAuthor(ayarlar.embed.başlık, guild.iconURL({dynamic: true})).setFooter(ayarlar.embed.altbaşlık)
    if ((ayarlar.yasakTaglar.some(tag => newUser.username.includes(tag))) && (roller.yasaklıTagRolü && !user.roles.cache.has(roller.yasaklıTagRolü))) {
        user.rolTanımla(roller.yasaklıTagRolü)
        user.send(`**${user.guild.name}** sunucumuzun yasaklı taglarından birini kullanıcı adına aldığın için jaile atıldın! Tagı geri bıraktığında jailden çıkacaksın.`)
        guild.kanalBul("yasaklı-tag-log").wsend(embed.setDescription(`${user} adlı kişi ismine **${tarihsel(Date.now())}** tarihinde yasaklı tag aldığı için jaile atıldı.`)).setColor("RED")
        if(!yasakTaglilar.some(x => x.includes(newUser.id))) acarDatabase.yasakTagliEkle(newUser.id);
        return;
      };

    if ((!ayarlar.yasakTaglar.some(tag => newUser.username.includes(tag))) && (roller.yasaklıTagRolü && user.roles.cache.has(roller.yasaklıTagRolü)) && yasakTaglilar.some(x => x.includes(newUser.id))) {
      let sonisim = acarDatabase.sonIsimÇek(user);
      let cinsiyet = acarDatabase.cinsiyetGetir(user);
      if(!ayarlar.taglıalım || user.user.username.includes(ayarlar.tag)) {
        if(sonisim || cinsiyet) {
        if(cinsiyet == "erkek") user.rolTanımla(roller.Teyit.erkekRolleri).then(acar => { if(user.user.username.includes(ayarlar.tag)) user.roles.add(roller.Teyit.tagRolü) });
        if(cinsiyet == "kadın") user.rolTanımla(roller.Teyit.kadınRolleri).then(acar => { if(user.user.username.includes(ayarlar.tag)) user.roles.add(roller.Teyit.tagRolü) });
        } else {
          user.rolTanımla(roller.Teyit.kayıtsızRolleri)
        }
      } else {
      user.rolTanımla(roller.Teyit.kayıtsızRolleri)
      }
       user.send(`**${user.guild.name}** sunucumuzun yasaklı taglarından birine sahip olduğun için cezalıdaydın ve şimdi bu yasaklı tagı çıkardığın için cezalıdan çıkarıldın!`).catch();
       client.channels.cache.get(kanallar.teyitKanalı).send(`${user} Yasaklı tagı bıraktığın için teşekkür ederiz! Ses kanallarından birine gelerek kayıt olabilirsin.`).catch();
       guild.kanalBul("yasaklı-tag-log").wsend(embed.setDescription(`${user} adlı kişi ismine **${tarihsel(Date.now())}** tarihinde yasaklı tagı çıkarttığı için cezalıdan çıkartıldı!`).setColor("GREEN"))
       acarDatabase.yasakTagliKaldır(newUser);
        return;
      };

      if(newUser.username.includes(ayarlar.tag) && !user.roles.cache.has(roller.Teyit.tagRolü)){
        guild.kanalBul("tag-log").wsend(embed.setDescription(`Heyy! ${user} kişisi ismine \`${ayarlar.tag}\` tagı alarak ailemize katıldı!`).setColor("GREEN"));
        if (roller.jailRolü && user.roles.cache.has(roller.jailRülü)) return;
        if (roller.yasaklıTagRolü && user.roles.cache.has(roller.yasaklıTagRolü)) return;
        user.roles.add(roller.Teyit.tagRolü).catch();
        if(user.manageable) user.setNickname(user.displayName.replace(ayarlar.tagsiz, ayarlar.tag))
        acarDatabase.tagaEkle(user, "x", false);
        setTimeout(() => {
          acarDatabase.tagaEkle(user, "x", true);
        }, ms('3m'));
     } else if(!newUser.username.includes(ayarlar.tag) && user.roles.cache.has(roller.Teyit.tagRolü)){
       if(ayarlar.taglıalım) {
            if(user.voice.channel) user.voice.kick()
            user.setNickname(`${user.user.username.includes(ayarlar.tag) ? ayarlar.tag : (ayarlar.tagsiz ? ayarlar.tagsiz : (ayarlar.tag || ""))} İsim | Yaş`)
            user.rolTanımla(roller.Teyit.kayıtsızRolleri)   
        } else {
            user.setNickname(user.displayName.replace(ayarlar.tag, ayarlar.tagsiz))

            let tagRol = guild.roles.cache.get(roller.Teyit.tagRolü);
            user.roles.remove(user.roles.cache.filter(rol => tagRol.position <= rol.position));
        }
        // Terfi Sisteminden Yetkisini Çektirme!
        let yetkibilgi = acarDatabase.terfiGetir(user, ayarlar.sunucuID);
        if(yetkibilgi) acarDatabase.yetkiÇek(user);
        // Taglı komutunun sisteminden çıkartma!
        acarDatabase.tagdanÇıkar(user);
        guild.kanalBul("tag-log").wsend(embed.setDescription(`${user} kişisi isminden \`${ayarlar.tag}\` tagı çıkararak <@&${roller.Teyit.tagRolü}> ailemizden ayrıldı!`).setColor("RED"));
    }
}

module.exports.config = {
    Event: "userUpdate"
}
