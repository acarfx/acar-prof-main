const {Collection} = require('discord.js');
const fs = require('fs')
client.komutlar = new Collection();
client.komut = new Collection();
const moment = require('moment');
require("moment-duration-format");
require("moment-timezone");
const acarEvent = require('./acarEvent');

class acar {
    static komutYükle() {
        fs.readdir("./acar/Moderation", (err, files) => {
            if(err) return console.error(err);
            files = files.filter(file => file.endsWith(".js"));
            console.log('\x1b[36m%s\x1b[0m', `\n[ ACAR Moderasyon (${files.length}) adet Komut Yüklendi! ]`);
            files.forEach(file => {
            let referans = require(`../Moderation/${file}`);
            if(typeof referans.onLoad === "function") referans.onLoad(global.client);
                client.komutlar.set(referans.Isim, referans);
                    if (referans.Komut) {
                        referans.Komut.forEach(alias => client.komut.set(alias, referans));
                    }
            });
        });
    }
    static sistemGereksinimleri() {
        const sistem = global.sistem = require('../Settings/system');
        const emojiler = global.emojiler = require('../Settings/emojiler.json');
        const kanallar = global.kanallar = require('../Settings/kanallar.json');
        const roller = global.roller = require('../Settings/roller.json');
        const ayarlar = global.ayarlar = require('../Settings/extends.json');
        const coinsistem = global.coinsistem = require('../Settings/coinsystem');
        const terfisistem = global.terfisistem = require('../Settings/terfisystem');
        let aylartoplam = {
            "01": "Ocak",
            "02": "Şubat",
            "03": "Mart",
            "04": "Nisan",
            "05": "Mayıs",
            "06": "Haziran",
            "07": "Temmuz",
            "08": "Ağustos",
            "09": "Eylül",
            "10": "Ekim",
            "11": "Kasım",
            "12": "Aralık"
          };
          global.aylar = aylartoplam;
          const tarihsel = global.tarihsel = function(tarih) {
          let tarihci = moment(tarih).tz("Europe/Istanbul").format("DD") + " " + global.aylar[moment(tarih).tz("Europe/Istanbul").format("MM")] + " " + moment(tarih).tz("Europe/Istanbul").format("YYYY HH:mm")   
          return tarihci;
          };
          const sayilariCevir = global.sayilariCevir = function(x) {
            return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
          };
          const tarihhesapla = global.tarihHesapla = (date) => {
            const startedAt = Date.parse(date);
            var msecs = Math.abs(new Date() - startedAt);
          
            const years = Math.floor(msecs / (1000 * 60 * 60 * 24 * 365));
            msecs -= years * 1000 * 60 * 60 * 24 * 365;
            const months = Math.floor(msecs / (1000 * 60 * 60 * 24 * 30));
            msecs -= months * 1000 * 60 * 60 * 24 * 30;
            const weeks = Math.floor(msecs / (1000 * 60 * 60 * 24 * 7));
            msecs -= weeks * 1000 * 60 * 60 * 24 * 7;
            const days = Math.floor(msecs / (1000 * 60 * 60 * 24));
            msecs -= days * 1000 * 60 * 60 * 24;
            const hours = Math.floor(msecs / (1000 * 60 * 60));
            msecs -= hours * 1000 * 60 * 60;
            const mins = Math.floor((msecs / (1000 * 60)));
            msecs -= mins * 1000 * 60;
            const secs = Math.floor(msecs / 1000);
            msecs -= secs * 1000;
          
            var string = "";
            if (years > 0) string += `${years} yıl`
            else if (months > 0) string += `${months} ay ${weeks > 0 ? weeks+" hafta" : ""}`
            else if (weeks > 0) string += `${weeks} hafta ${days > 0 ? days+" gün" : ""}`
            else if (days > 0) string += `${days} gün ${hours > 0 ? hours+" saat" : ""}`
            else if (hours > 0) string += `${hours} saat ${mins > 0 ? mins+" dakika" : ""}`
            else if (mins > 0) string += `${mins} dakika ${secs > 0 ? secs+" saniye" : ""}`
            else if (secs > 0) string += `${secs} saniye`
            else string += `saniyeler`;
          
            string = string.trim();
            return `\`${string} önce\``;
          };
          
        
    }
    static On() {
      global.client.on('ready', () => {
            client.user.setPresence({ activity: { name: sistem.botdurumu }, status: "dnd" });
            if (client.channels.cache.has(sistem.botseskanal)) client.channels.cache.get(sistem.botseskanal).join().catch();
        });
       global.client.login(global.sistem.token).catch(err => console.error("[ ACAR Professional Main ] Discord API Botun tokenini doğrulayamadı."));
    }

    static Moderation() {
      console.log("\x1b[33m%s\x1b[0m", "[ ACAR Moderation ] Çalıştırıldı!")
      acarEvent.fetchEvent("cmdHandler")
      acarEvent.fetchEvent("./Moderation/memberJoinedServer")
      acarEvent.fetchEvent("./Moderation/userUpdate")
      acarEvent.fetchEvent("./Moderation/memberLeave")
      acarEvent.fetchEvent("./Moderation/cezaTarama")
      acarEvent.fetchEvent("./Moderation/sesMuteTarama")
      acarEvent.fetchEvent("./ModerationPlus/sesLog")
    }
    static sistemÇalıştır(sistemismi) {
      if(sistemismi === "coin") {
        if(coinsistem.sistem) {
          console.log("\x1b[33m%s\x1b[0m", "[ ACAR Coin System ] Çalıştırıldı!")
          acarEvent.fetchEvent("../acarEvents/Coin/messageCoin");
          acarEvent.fetchEvent("../acarEvents/Coin/voiceCoin")
          acarEvent.fetchEvent("../acarEvents/Coin/memberRemoveCoin")
        }
      } if(sistemismi === "terfi") {
        if(terfisistem.sistem) {
          console.log("\x1b[33m%s\x1b[0m", "[ ACAR Auto Staff System ] Çalıştırıldı!")
          acarEvent.fetchEvent("../acarEvents/Terfi/messageTerfi")
          acarEvent.fetchEvent("../acarEvents/Terfi/voiceTerfi")
        }
      }
    }
}

module.exports = acar;