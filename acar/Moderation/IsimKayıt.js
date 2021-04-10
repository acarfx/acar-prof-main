const { Client, Message, MessageEmbed} = require("discord.js");
const acar = require("../Reference/acarGet");
const acarDatabase = require("../Reference/acarDatabase");
module.exports = {
    Isim: "isim",
    Komut: ["i","nick"],
    Kullanim: "isim <@acar/ID> <İsim> <Yaş>",
    Aciklama: "Belirlenen üye sunucuda kayıtsız ise isim değiştirildikten `.e` ile erkek olarak `.k` ile kadın olarak kayıt edebilirsiniz kayıtlı ise sadece isim değiştirir.",
    Kategori: "Yetkili",
    
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
     let embed = new MessageEmbed().setAuthor(ayarlar.embed.başlık, message.guild.iconURL({dynamic: true})).setColor(ayarlar.embed.renk)
    let uye = message.mentions.members.first() || message.guild.members.cache.get(args[0])
    if(!roller.Teyit.teyitciRolleri.some(oku => message.member.roles.cache.has(oku)) && !roller.kurucuRolleri.some(oku => message.member.roles.cache.has(oku)) && !roller.altYönetimRolleri.some(oku => message.member.roles.cache.has(oku)) && !roller.yönetimRolleri.some(oku => message.member.roles.cache.has(oku)) && !message.member.hasPermission('ADMINISTRATOR')) return message.channel.wsend(cevaplar.noyt)
    if(!uye) return message.channel.wsend(cevaplar.üye + ` \`${sistem.prefix}${module.exports.Isim} <@acar/ID> <Isim> <Yaş>\``);
    if(message.author.id === uye.id) return message.channel.wsend(cevaplar.kendi).then(x => x.delete({timeout: 5000}));
    if(!uye.manageable) return message.channel.wsend(cevaplar.dokunulmaz).then(x => x.delete({timeout: 5000}));
    if(message.member.roles.highest.position <= uye.roles.highest.position) return message.channel.wsend(cevaplar.yetkiust).then(x => x.delete({timeout: 5000}));
    args = args.filter(a => a !== "" && a !== " ").splice(1);
    let setName;
    let isim = args.filter(arg => isNaN(arg)).map(arg => arg.charAt(0).replace('i', "İ").toUpperCase()+arg.slice(1)).join(" ");
    let yaş = args.filter(arg => !isNaN(arg))[0] || undefined;
    if (yaş < ayarlar.minYaş) return message.channel.wsend(cevaplar.yetersizyaş).then(x => x.delete({timeout: 5000}));
    if(!isim || !yaş) return message.channel.wsend(cevaplar.argümandoldur + ` \`${sistem.prefix}${module.exports.Isim} <@acar/ID> <Isim> <Yaş>\``);
    setName = `${uye.user.username.includes(ayarlar.tag) ? ayarlar.tag : (ayarlar.tagsiz ? ayarlar.tagsiz : (ayarlar.tag || ""))} ${isim} | ${yaş}`;
    uye.setNickname(`${setName}`).catch(err => message.channel.wsend(cevaplar.isimapi));
    var filter = msj => msj.author.id === message.author.id && msj.author.id !== client.user.id;
    let isimveri = acarDatabase.isimlerÇek(uye);
    isimveri = isimveri.reverse();
    let isimler = isimveri.length > 0 ? isimveri.map((value, index) => `\`${ayarlar.tag} ${value.Isim} | ${value.Yas}\` (${value.islembilgi}) ${value.Yetkili ? "(<@"+ value.Yetkili + ">)" : ""}`).join("\n") : "";
	let mesaj = await message.channel.wsend(embed
    .setDescription(`${uye} kişisinin ismi başarıyla "${isim} | ${yaş}" olarak değiştirildi, bu üye daha önce bu isimlerle kayıt olmuş.
    \n${message.guild.emojiGöster(emojiler.Iptal)} Kişinin toplamda ${isimveri.length} isim kayıtı bulundu
    ${isimler}\n\nKişinin önceki isimlerine \`${sistem.prefix}isimler @acar/ID\` komutuyla bakarak kayıt işlemini\n gerçekleştirmeniz önerilir.`)
    ).then(x => message.react(emojiler.Onay))
    if(uye.roles.cache.has(roller.Teyit.erkekRolü) || uye.roles.cache.has(roller.Teyit.kadınRolü)) { 
    acarDatabase.isimEkle(uye.id, isim, yaş, message.author.id, `İsim Güncelleme`) 
    message.guild.kanalBul("isim-log").wsend(embed.setDescription(`${uye} isimli üyenin isim ve yaşı **${tarihsel(Date.now())}** tarihinde ${message.author} tarafından \`${setName}\` olarak güncellendi.`).setFooter(ayarlar.embed.altbaşlık))
    };
        // Kayıt İşlemi Yaptırma (Başlangıç) 
        if(uye.roles.cache.has(roller.Teyit.erkekRolü) || uye.roles.cache.has(roller.Teyit.kadınRolü)) return;
        message.channel.awaitMessages(filter, { max: 1, time: 10000 }).then(async collected => {
            if(ayarlar.taglıalım != false && !uye.user.username.includes(ayarlar.tag) && !uye.roles.cache.has(roller.boosterRolü) && !uye.roles.cache.has(roller.vipRolü) && !message.member.hasPermission('ADMINISTRATOR') && !roller.kurucuRolleri.some(oku => message.member.roles.cache.has(oku))) return message.channel.wsend(cevaplar.taglıalım).then(x => x.delete({timeout: 5000}));
            if(Date.now()-uye.user.createdTimestamp < 1000*60*60*24*7 && !message.member.hasPermission('ADMINISTRATOR') && !roller.kurucuRolleri.some(oku => message.member.roles.cache.has(oku)) && !roller.yönetimRolleri.some(oku => message.member.roles.cache.has(oku))) return message.channel.wsend(cevaplar.yenihesap).then(x => x.delete({timeout: 5000}));
            if(uye.roles.cache.has(roller.şüpheliRolü) && uye.roles.cache.has(roller.jailRolü) && uye.roles.cache.has(roller.yasaklıTagRolü) && !message.member.hasPermission('ADMINISTRATOR') && !roller.kurucuRolleri.some(oku => message.member.roles.cache.has(oku)) && !roller.yönetimRolleri.some(oku => message.member.roles.cache.has(oku))) return message.channel.wsend(cevaplar.cezaliüye).then(x => x.delete({timeout: 5000}))    
            if(collected.first().content.toLowerCase() === `${sistem.prefix}kadın` || collected.first().content.toLowerCase() === `${sistem.prefix}k`) {
                kayıtYap(uye, message.member, isim, yaş, "kadın", ayarlar.sunucuID)
                message.channel.wsend(`${message.guild.emojiGöster(emojiler.Onay)} Başarılı! ${uye}, kullanıcısı başarıyla **Kadın** olarak kayıt edildi!`).then(x => x.delete({timeout: 5000}));
            }
            if(collected.first().content.toLowerCase() === `${sistem.prefix}erkek` || collected.first().content.toLowerCase() === `${sistem.prefix}e`) { 
                kayıtYap(uye, message.member, isim, yaş, "erkek", ayarlar.sunucuID)
                message.channel.wsend(`${message.guild.emojiGöster(emojiler.Onay)} Başarılı! ${uye}, kullanıcısı başarıyla **Erkek** olarak kayıt edildi!`).then(x => x.delete({timeout: 5000}));
        }}).catch(acar => acarDatabase.isimEkle(uye.id, isim, yaş, message.author.id, `İsim Güncelleme`))
        // Kayıt İşlemi Yaptırma (Bitiş)
    }
};

function kayıtYap(uye, yetkili, isim, yaş, cinsiyet, sunucuID) {
    let rol;
    let rolver;
    if(cinsiyet === "erkek") {
        rol = roller.Teyit.erkekRolü
        rolver = roller.Teyit.erkekRolleri
    } else if(cinsiyet == "kadın") {
        rol = roller.Teyit.kadınRolü
        rolver = roller.Teyit.kadınRolleri
    }
    uye.kayıtRolVer(rolver).then(acar => { if(uye.user.username.includes(ayarlar.tag)) uye.roles.add(roller.Teyit.tagRolü) });
    if(coinsistem.sistem) acarDatabase.coinEkle(yetkili, coinsistem.odül.kayıt)
    acarDatabase.isimEkle(uye.id, isim, yaş, yetkili.id, `<@&${rol}>`);
    acarDatabase.teyitEkle(uye.id, yetkili.id, cinsiyet);
    acarDatabase.cinsiyetBelirle(uye, cinsiyet)
    client.guilds.cache.get(sunucuID).kayıtLog(yetkili, uye, cinsiyet, "kayıt-log");
    setTimeout(() => {
        if(uye.voice.channel) uye.voice.setChannel(kanallar.kayitSonrasiKanal);
    }, 3000);
    // Terfi Sistemi Kayıt Saydırma (START)!
        if(terfisistem.yetkiler.some(x => yetkili.roles.cache.has(x))) {
            if(yetkili.roles.cache.has(terfisistem.sonyetki)) return;  
            if(terfisistem.sistem) acarDatabase.terfiPuanEkle(yetkili, terfisistem.odül.kayıt);
        };
    // Terfi Sistemi Kayıt Saydırma (END)!
}
