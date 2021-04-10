const { Client, Message} = require("discord.js");
const acar = require("../Reference/acarGet");
const acarDatabase = require("../Reference/acarDatabase");
const qdb = require("quick.db");
const ms2 = require('parse-ms')
const ms = require('ms')
module.exports = {
    Isim: "ban",
    Komut: ["yasakla","sg","yargı","bedel","allahaemanet"],
    Kullanim: "ban <@acar/ID> <Sebep>",
    Aciklama: "Belirlenen üyeyi sunucudan yasaklar.",
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
      // !roller.yönetimRolleri.some(oku => message.member.roles.cache.has(oku))
    let cezano = acarDatabase.cezaNoGetir() + 1;
    if(!roller.banHammer.some(oku => message.member.roles.cache.has(oku)) && !roller.kurucuRolleri.some(oku => message.member.roles.cache.has(oku)) && !message.member.hasPermission('ADMINISTRATOR')) return message.channel.wsend(cevaplar.noyt);
    let uye = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || await acar.GetUser(args[0]);
    let sunucudabul = message.mentions.members.first() || message.guild.members.cache.get(args[0])
    if(!uye) return message.channel.wsend(cevaplar.üye + ` \`${sistem.prefix}${module.exports.Isim} <@acar/ID> <Sebep>\``);
    if(message.author.id === uye.id) return message.channel.wsend(cevaplar.kendi);
    if(sunucudabul && message.member.roles.highest.position <= sunucudabul.roles.highest.position) return message.channel.wsend(cevaplar.yetkiust);
    if(sunucudabul && roller.banKoru.some(oku => sunucudabul.roles.cache.has(oku)) && !message.member.hasPermission('ADMINISTRATOR')) return message.channel.wsend(cevaplar.yetkilinoban); 
    let sebep = args.splice(1).join(" ");
    if(!sebep) return message.channel.wsend(cevaplar.sebep);
    try {
      const timeout = 86400000
      const acarsınır = 5
      const daily = qdb.fetch(`ban_${message.guild.id}_${message.author.id}`); 
      if (daily !== null && timeout - (Date.now() - daily) > 0) { let time = ms2(timeout - (Date.now() - daily)); 
      message.channel.wsend(`${message.guild.emojiGöster(emojiler.Iptal)} Günlük Kullanım Sınırını Geçtin! **${time.hours} Saat ${time.minutes} Dakika ${time.seconds} Saniye** Sonra tekrar dene.`).then(x => x.delete({timeout: 5000}))
      } else {
      if(!message.member.hasPermission('ADMINISTRATOR')) await qdb.add('bankomut_'+message.guild.id+'_'+message.author.id, 1);
      const uyarılar = await qdb.fetch('bankomut_'+message.guild.id+'_'+message.author.id)
          let limitsorgu;
          if(message.member.hasPermission('ADMINISTRATOR')) {
              limitsorgu = ``
          } else {
              limitsorgu = `( Günlük Limit: __${uyarılar}/${acarsınır}__ )`
          };
    uye.send(`${message.author} (\`${message.author.id}\`) isimli yetkili tarafından **${sebep}** sebebiyle sunucudan yasaklandın! ( __Ceza Numaran: #${cezano}__ )`).catch(acar => {})
    acarDatabase.cezaEkle(cezano, uye, message.author, "Yasaklama", "Yasaklama", sebep, "Yok!", "Yok!", "Yok!", "ban");
    message.guild.members.ban(uye.id, { reason: `Yasaklayan Kişi ID: ${message.author.id} Sebep: ${sebep}`})
    message.guild.log(acarDatabase.cezaBilgi(cezano), uye, message.author, "Yasaklanma", "ban-log")
    message.channel.wsend(`${message.guild.emojiGöster(emojiler.Yasaklandı)} ${uye} kişisi **${sebep}** nedeni ile sunucudan yasaklandı. ${limitsorgu} (Ceza Numarası: \`#${cezano}\`)`)
    message.react(emojiler.Onay)
    if(uyarılar > acarsınır -1)  {
      await qdb.set('ban_'+message.guild.id+'_'+message.author.id, Date.now())
      await qdb.delete(`bankomut_${message.guild.id}_${message.author.id}`)
      }}} catch (error) {
        await qdb.delete(`bankomut_${message.guild.id}_${message.author.id}`)
      }
    }
};