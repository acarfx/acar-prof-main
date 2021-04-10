const { Client, Message, Guild, MessageEmbed } = require("discord.js");
module.exports = {
    Isim: "rol",
    Komut: ["rol"],
    Kullanim: "rol <ver-al> <Rol-Id>",
    Aciklama: "Belirlenen üyeye belirlenen rolü verip almak için kullanılır!",
    Kategori: "Yönetim",
    TekSunucu: true,
  /**
   * @param {Client} client 
   */
  onLoad: function (client) {
    
  },
  /**
   * @param {Client} client 
   * @param {Message} message 
   * @param {Array<String>} args 
   * @param {Guild} guild
   */
  onRequest: async function (client, message, args, guild) {
    let embed = new MessageEmbed().setAuthor(ayarlar.embed.başlık, message.guild.iconURL({dynamic: true})).setColor(ayarlar.embed.renk)
    let kullanici = message.mentions.users.first() || message.guild.members.cache.get(args[1])
    let x = message.guild.member(kullanici);
    let rol = message.mentions.roles.first() || message.guild.roles.cache.get(args[2]) || message.guild.roles.cache.find(a => a.name == args.slice(2).join(' '));
    if(!roller.kurucuRolleri.some(oku => message.member.roles.cache.has(oku)) && !roller.roleManager.some(oku => message.member.roles.cache.has(oku)) && !roller.yönetimRolleri.some(oku => message.member.roles.cache.has(oku)) && !message.member.hasPermission('ADMINISTRATOR')) return message.channel.wsend(cevaplar.noyt); 
    if(args[0] !== "ver" && args[0] !== "al") return message.channel.wsend(`Hata: Bir üyeye rol verip almak için lütfen __argümanları__ doldurun Örn: \`.rol ver/al @acar/ID <EtiketRol/RolID>\``).then(x => x.delete({timeout: 5000}));
    if(!kullanici) return message.channel.wsend('Hata: Bir üyeye rol verip almak için lütfen __argümanları__ doldurun Örn: \`.rol ver/al @acar/ID <EtiketRol/RolID>\`').then(x => x.delete({timeout: 5000}));
    if(!rol) return message.channel.wsend('Hata: Bir üyeye rol verip almak için lütfen __argümanları__ doldurun Örn: \`.rol ver/al @acar/ID <EtiketRol/RolID>\`').then(x => x.delete({timeout: 5000}));
    if (message.member.roles.highest.comparePositionTo(rol) < 1) {
      return message.channel.wsend(`Hata: \`Vermek istediğiniz rol sizin rollerinizden üstün!\` hatası sebebiyle işlem yapılamadı!`).then(x => x.delete({timeout: 6000}));
    }
    if(roller.blokluRoller.some(roltara => rol.id === roltara)) {
      return message.channel.wsend(`Hata: \`(Özel Rol) Bu rolü vermezsin veya alamazsın!\` hatası sebebiyle işlem yapılamadı!`).then(x => x.delete({timeout: 6000}));
    }


    if(args[0] === "ver") {
      try{
        
        await (x.roles.add(rol.id).catch())
              message.channel.wsend(`${message.guild.emojiGöster(emojiler.Onay)} ${kullanici} (\`${kullanici.id}\`) isimli üyeye \`${rol.name}\` adlı rolü __başarıyla__ verdin.`).then(x => x.delete({timeout: 5000}));
            message.guild.kanalBul("rol-log").wsend(embed.setDescription(`${message.author} (\`${message.author.id}\`) adlı yetkili ${rol} adlı rolü ${kullanici} (\`${kullanici.id}\`) kişisine verdi.`).setFooter(ayarlar.embed.altbaşlık))
              message.react(emojiler.Onay)
         } catch (e) {
            console.log(e);
            message.channel.wsend('Hata: \`Sistemsel olarak hata oluştu lütfen @acar yetkilisine başvurunuz\`!').then(x => x.delete({timeout: 5000}));
          }
    };
  
    if(args[0] === "al") {
      try{
        await (x.roles.remove(rol.id).catch())
        message.channel.wsend(`${message.guild.emojiGöster(emojiler.Onay)} ${kullanici} (\`${kullanici.id}\`) isimli üyeden \`${rol.name}\` adlı rolü __başarıyla__ aldın.`).then(x => x.delete({timeout: 5000}));
        message.guild.kanalBul("rol-log").wsend(embed.setDescription(`${message.author} (\`${message.author.id}\`) adlı üye ${rol} adlı rolü ${kullanici} (\`${kullanici.id}\`) kişisinden rolü geri aldı.`).setFooter(ayarlar.embed.altbaşlık))
        message.react(emojiler.Onay)
       
          } catch (e) {
            console.log(e);
            message.channel.wsend('Hata: \`Sistemsel olarak hata oluştu lütfen @acar yetkilisine başvurunuz\`!').then(x => x.delete({timeout: 5000}));
          }
      }
  }
};