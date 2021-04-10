const { Client, Message, MessageEmbed} = require("discord.js");
const acar = require("../Reference/acarGet");
const acarDatabase = require("../Reference/acarDatabase");
const table = require("table");
const coinIsmi = coinsistem.coinIsmi
module.exports = {
    Isim: "coinmarket",
    Komut: [`${coinIsmi.toLowerCase()}market`],
    Kullanim: "coinmarket",
    Aciklama: "Coin harcamalarınızı buradan sağlayabilirsiniz ve ürünleri görebilirsiniz.",
    Kategori: "Üye",
    
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
    if(!coinsistem.sistem) return; 
    let embed2 = new MessageEmbed().setAuthor(ayarlar.embed.başlık, message.guild.iconURL({dynamic: true})).setColor(ayarlar.embed.renk)
    let embed = new MessageEmbed().setAuthor(ayarlar.embed.başlık, message.guild.iconURL({dynamic: true})).setColor(ayarlar.embed.renk)
    let kullanici = message.author;
    let uye = message.guild.member(kullanici);
    if(!uye.roles.cache.has(roller.Teyit.tagRolü) && !uye.hasPermission('ADMINISTRATOR') && !uye.user.username.includes(ayarlar.tag) && !message.member.hasPermission('ADMINISTRATOR')) return message.channel.wsend(`Hata: İsminiz de \`${ayarlar.tag}\` sembolü bulunmadığından coin işlemi yapamazsınız!`).then(x => x.delete({timeout: 5000}));
    let puansorgu = await acarDatabase.coinOku(uye)
    let urundata = coinsistem.Ürünler
    var filter = msj => msj.author.id === message.author.id && msj.author.id !== client.user.id;
    let urunler = [["ID", "Ürün İsmi", "Ürün Detayı" ,"Ürün Fiyatı"]];
       urunler = urunler.concat(urundata.map(value => { 
         let urunfiyatioku = `${value.urunFiyati} 💵`	
          return [
          `#${value.Id}`,
          `${value.urunAdi}`,
          `${value.urunDetayi}`,
          `${urunfiyatioku}`
        ]
    }))
    let ürünler = await message.channel.wsend(new MessageEmbed().setColor(ayarlar.embed.renk).setAuthor(ayarlar.embed.başlık, message.guild.iconURL({dynamic: true, size: 2048})).setDescription(`\n🤑 **${coinIsmi}** mağazasına hoş geldin ${uye}, \nBurada kendine çeşitli eşyalar ve sunucumuz için işine yarayabilecek \nbelirli özelliklerden satın alabilirsin.`).addField(`${message.guild.emojiGöster(emojiler.Terfi.icon)} Mağaza (\`Bakiye: ${puansorgu} 💵\`)`,`\`\`\`css
${table.table(urunler, {
          border: table.getBorderCharacters(`void`),
          columnDefault: {
            paddingLeft: 0,
            paddingRight: 1,

        },
        columns: {
          0: {
              paddingLeft: 1
          },
          1: {
              paddingLeft: 1
          },
          2: {
              paddingLeft: 1,
              alignment: "center"
          },
          3: {
              paddingLeft: 1,
              paddingRight: 1,
          },
      },
        /**
        * @typedef {function} drawHorizontalLine
        * @param {number} index
        * @param {number} size
        * @return {boolean}
        */
        drawHorizontalLine: (index, size) => {
          return index === 0 || index === 1 || index === size;
      }
      })}\`\`\``).addField(`${message.guild.emojiGöster(emojiler.Terfi.icon)} Ürün nasıl satın alabilirim?`,`Aşağıda beliren tepkiye \`30 Saniye\` içerisinde tıklayarak sohbet kutucuğuna ürünün \`ID\` numarasını girerek satın alabilirsin.`)).then(async m => {
        await m.react(emojiler.Coin.satınAl)
        return m;
      }).catch(err => undefined);
      let tepki = await ürünler.awaitReactions((reaction, user) => user.id == message.author.id, { errors: ["time"], max: 1, time: 30000 }).then(coll => coll.first()).catch(err => {  ürünler.reactions.removeAll(); return; });
      if(!tepki) return;
      if (tepki.emoji.id == emojiler.Coin.satınAl) { 
        let satinal = await message.channel.wsend(`${message.guild.emojiGöster(emojiler.Terfi.icon)} Merhaba, satın almak istediğin ürünün \`#ID\` numarasını girermisiniz?`)
          message.channel.awaitMessages(filter, {max: 1, time: 10000}).then(async acar => {
        let ürünid = acar.first().content
        let alıncakürün = coinsistem.Ürünler[coinsistem.Ürünler.indexOf(coinsistem.Ürünler.find(x => x.Id == ürünid))]
        if(alıncakürün) {
        satinal.delete();
        let satınalma = await message.channel.wsend(`${message.guild.emojiGöster(emojiler.Terfi.icon)} **#${alıncakürün.Id}** numaralı \`${alıncakürün.urunAdi}\` isimli ürünü \`${alıncakürün.urunFiyati} 💵\` fiyatına satın almak istiyormusun? (__Evet__/__Hayır__)`)
        message.channel.awaitMessages(filter, { errors: ["time"], max: 1, time: 10000})
        .then(async acarsatinal => {
            if(acarsatinal.first().content.toLowerCase() === "hayır" || acarsatinal.first().content.toLowerCase() === "Hayır") {
            ürünler.reactions.removeAll();
            message.channel.wsend(`${message.guild.emojiGöster(emojiler.Onay)} \`${alıncakürün.urunAdi}\` isimli ürünü satın almaktan vazcaydın.`).then(x => {x.delete({timeout: 7500})});
            satınalma.delete()
            };
            if(acarsatinal.first().content.toLowerCase() === "evet" || acarsatinal.first().content.toLowerCase() === "Evet") {
                if(puansorgu >= alıncakürün.urunFiyati) {
                    if(alıncakürün.urunRolMu == '1') {
                        if(uye.roles.cache.has(alıncakürün.urunRolId)) return message.channel.wsend(`Hata: \`${alıncakürün.urunAdi}\` isimli ürünü önceden satın almışsın!`).then(x => {
                          ürünler.reactions.removeAll();
                          x.delete({timeout: 7500})
                          satınalma.delete()
                        });
                        if(alıncakürün.urunYetkimi == '1') {
                        if(!roller.kurucuRolleri.some(oku => message.member.roles.cache.has(oku)) && !roller.altYönetimRolleri.some(oku => message.member.roles.cache.has(oku)) && !roller.Yetkiler.some(oku => message.member.roles.cache.has(oku)) && !roller.yönetimRolleri.some(oku => message.member.roles.cache.has(oku)) && !message.member.hasPermission('ADMINISTRATOR')) return message.channel.wsend(`Hata: \`${alıncakürün.urunAdi}\` isimli ürünü sadece yetkililer satın alabilir!`).then(x => {
                          ürünler.reactions.removeAll();
                          x.delete({timeout: 7500}) 
                          satınalma.delete()
                        });
                        } else {
                            uye.roles.add(alıncakürün.urunRolId)
                        }
                        message.channel.wsend(`${message.guild.emojiGöster(emojiler.Terfi.icon)} **${alıncakürün.urunAdi}** isimli ürün size bir hediye gönderdi, lütfen rollerinizi kontrol edin.`).then(x => x.delete({timeout: 7500}))
                    };
                    acarDatabase.coinSil(uye, alıncakürün.urunFiyati)
                    ürünler.reactions.removeAll();
                    satınalma.delete();
                    message.channel.wsend(embed.addField(`Başarılı!`,`\`${alıncakürün.urunAdi}\` isimli ürünü başarıyla satın aldın!`).addField(`Ürün Bilgisi`,`\`#satın-alma-log\` isimli kanala bilgi geçildi.\nÜrün teslimi için yöneticisi olan kişilere başvurun.`).addField('Ürün ve hesap bakiyesi', `\`Ürün Fiyatı: ${alıncakürün.urunFiyati} 💵\``, true).addField(`᲼`,`\`Güncel Bakiye: ${puansorgu - alıncakürün.urunFiyati} 💵\``, true)).then(x => x.delete({timeout: 15000}));
                    message.guild.kanalBul("satın-alma-log").wsend(embed2.setDescription(`${uye} isimli üye **${tarihsel(Date.now())}** tarihinde **${alıncakürün.urunAdi}** isimli ürünü \`${alıncakürün.urunFiyati} 💵\` fiyatına satın aldı.`))
                } else {
                    ürünler.reactions.removeAll();
                    satınalma.delete()
                    message.channel.wsend(`Hata: \`Yeterli ${coinsistem.coinIsmi} bulunamadı.\``).then(x => x.delete({timeout: 7500}));
                }
            }
          })
        } else {
          ürünler = await ürünler.reactions.removeAll();
          satinal.delete();
          ürünler.delete({timeout: 5000});
          return;
        }
        })
      };

    }
};