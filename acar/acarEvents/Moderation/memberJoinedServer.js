const { GuildMember, MessageEmbed } = require("discord.js");
const acar = require("../../Reference/acarGet");
const acarDatabase = require("../../Reference/acarDatabase");
 /**
 * @param {GuildMember} member 
 */
module.exports = async (member) => {
  let ayarlar = global.ayarlar
  let client = global.client
  let embed = new MessageEmbed().setAuthor(ayarlar.embed.başlık, member.guild.iconURL({dynamic: true})).setColor(ayarlar.embed.renk).setFooter(ayarlar.embed.altbaşlık)
  let sonisim = acarDatabase.sonIsimÇek(member);
  let cinsiyet = acarDatabase.cinsiyetGetir(member);
  let tempjaildekiler = acarDatabase.jailGetir() || [{id: null}];
  let yasakTaglilar = acarDatabase.yasakTagÇek()
  let guvenilirlik = Date.now()-member.user.createdTimestamp < 1000*60*60*24*7;
  if (!ayarlar.yasakTaglar.some(tag => member.user.username.includes(tag)) && yasakTaglilar.some(x => x.includes(member.id))) await acarDatabase.yasakTagCheck(member)
  if(tempjaildekiler.some(x => x.id === member.id)) { 
    if(sonisim || cinsiyet) member.setNickname(`${member.user.username.includes(ayarlar.tag) ? ayarlar.tag : (ayarlar.tagsiz ? ayarlar.tagsiz : (ayarlar.tag || ""))} ${sonisim.Isim} | ${sonisim.Yas}`)
    member.rolTanımla(roller.jailRolü) 
  } else 
  if(ayarlar.yasakTaglar.some(tag => member.user.username.includes(tag))) {
    if(sonisim || cinsiyet) member.setNickname(`${member.user.username.includes(ayarlar.tag) ? ayarlar.tag : (ayarlar.tagsiz ? ayarlar.tagsiz : (ayarlar.tag || ""))} ${sonisim.Isim} | ${sonisim.Yas}`) 
    member.rolTanımla(roller.yasaklıTagRolü)
  if (!yasakTaglilar.some(id => id.includes(member.id))) acarDatabase.yasakTagliEkle(member.id) } else 
  if (guvenilirlik) { member.rolTanımla(roller.şüpheliRolü)
  member.guild.kanalBul("şüpheli-log").wsend(embed.setDescription(`${member} isimli kişi sunucuya katıldı fakat hesabı ${global.tarihHesapla(member.user.createdAt)} açıldığı için şüpheli olarak işaretlendi.`));
  } else {
  
    if(cinsiyet) {
        member.setNickname(`${member.user.username.includes(ayarlar.tag) ? ayarlar.tag : (ayarlar.tagsiz ? ayarlar.tagsiz : (ayarlar.tag || ""))} ${sonisim.Isim} | ${sonisim.Yas}`)
        if(!ayarlar.taglıalım || member.user.username.includes(ayarlar.tag)) {
          if(cinsiyet == "erkek") {
            rolTanımlama(member, roller.Teyit.erkekRolleri)
            acarDatabase.isimEkle(member.id, sonisim.Isim, sonisim.Yas, client.user.id, `Oto.Bot Kayıt) (<@&${roller.Teyit.erkekRolü}>`);
          } else if(cinsiyet == "kadın") {
            rolTanımlama(member, roller.Teyit.kadınRolleri)
            acarDatabase.isimEkle(member.id, sonisim.Isim, sonisim.Yas, client.user.id, `Oto.Bot Kayıt) (<@&${roller.Teyit.kadınRolü}>`);
        };
      } else {
        acarDatabase.isimEkle(member.id, sonisim.Isim, sonisim.Yas, client.user.id, `İsim Güncelleme`);
        rolTanımlama(member, roller.Teyit.kayıtsızRolleri)
        hosgeldinMesaji(member)
      }
  } else {
  member.setNickname(`${member.user.username.includes(ayarlar.tag) ? ayarlar.tag : (ayarlar.tagsiz ? ayarlar.tagsiz : (ayarlar.tag || ""))} İsim | Yaş`)   
  rolTanımlama(member, roller.Teyit.kayıtsızRolleri)
  hosgeldinMesaji(member)
  }
  }
}

module.exports.config = {
    Event: "guildMemberAdd"
}

function hosgeldinMesaji(member) {
  member.guild.channels.cache.get(kanallar.hoşgeldinKanalı).wsend(`
${client.emojis.cache.get(emojiler.Tag)} **${ayarlar.sunucuIsmi} Sunucusuna Hoş Geldin!** 
${client.emojis.cache.get(emojiler.HosgeldinGif1)} ${member} (\`${member.id}\`), hesabın __${global.tarihsel(member.user.createdAt)}__ tarihinde ${global.tarihHesapla(member.user.createdAt)} oluşturulmuş! :tada:\n
${client.emojis.cache.get(emojiler.HosgeldinGif2)} Seninle birlikte **${acar.sayılıEmoji(member.guild.memberCount)}** kişi olduk! teyit yetkisine sahip yetkililer senin ile ilgilenecektir. 
${client.emojis.cache.get(emojiler.HosgeldinGif3)} Sunucu kurallarımız <#${kanallar.kurallarKanalı}> kanalında belirtilmiştir. Unutma sunucu içerisinde ki \`ceza-i işlemler\` kuralları okuduğunu varsayarak gerçekleştirilecek.
${client.emojis.cache.get(emojiler.HosgeldinGif4)} Tagımıza ulaşmak için herhangi bir kanala \`${global.sistem.prefix}tag\` yazman yeterlidir. Şimdiden iyi eğlenceler! :tada: :tada: :tada:\n\n`);
}

function rolTanımlama(üye, rol) {
let tempmute = acarDatabase.muteGetir() || [{id: null}];
let seslimute = acarDatabase.smuteGetir() || [{id: null}];
üye.rolTanımla(rol).then(acar => {
  if(üye.user.username.includes(ayarlar.tag)) üye.roles.add(roller.Teyit.tagRolü)
  if(seslimute.some(x => x.id === üye.id)) üye.roles.add(roller.voicemuteRolü)
  if(tempmute.some(x => x.id === üye.id)) üye.roles.add(roller.muteRolü)
})

}
