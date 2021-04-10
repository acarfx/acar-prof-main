const {MessageEmbed} = require('discord.js');
const acarkre = require('acarkre');
class acarMessage {
    static KufurReklamEngel() {
        acarkre(client, {
            konsolBilgi: ayarlar.acarkre.konsolBilgi,
            küfürEngel: ayarlar.kufurEngel,
            reklamEngel: ayarlar.reklamEngel,
            uyarıMesajı: ayarlar.acarkre.uyariMesaji, 
            izinliKanallar: ayarlar.acarkre.izinliKanallar,
            izinliRoller: roller.yönetimRolleri,
            kufurUyariMesaj: ayarlar.acarkre.kufurUyariMesaji,
            reklamUyariMesaj: ayarlar.acarkre.reklamUyariMesaji,
        });
    }
    static async fotoSpotifyKoru() {
            client.on("message", (message) => {
                if (message.channel.id !== kanallar.photoChatKanalı) { 
                    return;
                }
                if (message.attachments.size < 1) {
                     message.delete();
                    }
            });
            client.on("message", async acar => {
                if (!acar.activity) return;
                if(acar.webhookID || acar.author.bot || acar.channel.type === "dm") return;
                if(acar.channel.id == kanallar.spotifyKanalı) return;
                if (acar.activity.partyID.startsWith("spotify:")) {
                     acar.delete();
                }
            });
    }

    static async mesajLog() {      
            client.on("messageDelete", async (message, channel) => {
          if(message.webhookID || message.author.bot || message.channel.type === "dm") return;
            if (message.author.bot) return;
            let silinenMesaj = message.guild.channels.cache.find(x => x.name === "mesaj-log")
            const embed = new MessageEmbed()
            .setColor("GREEN")
            .setAuthor(`Mesaj silindi.`, message.author.avatarURL())
            .addField("Kullanıcı Tag", message.author.tag, true)
            .addField("Kanal Adı", message.channel.name, true)
            .addField("Silinen Mesaj", "```" + message.content + "```")
            .setThumbnail(message.author.avatarURL())
            silinenMesaj.send(embed);
            
          });
          client.on("messageUpdate", async (oldMessage, newMessage) => {
          if(newMessage.webhookID || newMessage.author.bot || newMessage.channel.type === "dm") return;
            let guncellenenMesaj = newMessage.guild.channels.cache.find(x => x.name === "mesaj-log")
            if (oldMessage.content == newMessage.content) return;
            let embed = new MessageEmbed()
            .setColor("GREEN")
            .setAuthor(`Mesaj Düzenlendi`, newMessage.author.avatarURL())
            .addField("Kullanıcı", newMessage.author)
            .addField("Eski Mesaj", oldMessage.content, true)
            .addField("Yeni Mesaj", newMessage.content, true)
            .addField("Kanal Adı", newMessage.channel.name, true)
            .setThumbnail(newMessage.author.avatarURL())
           guncellenenMesaj.send(embed)
            
          });
    }
   
}

module.exports = acarMessage;