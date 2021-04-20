const {Guild} = require('discord.js');
const qdb = require('quick.db');
const kdb = new qdb.table('kullanici');
const cdb = new qdb.table("cezalar");
const tdb = new qdb.table("tag");
const pdb = new qdb.table("puan");
const terfidb = new qdb.table("terfiler");
const ms = require('ms');
    class acarDatabase {
        static isimEkle(uye, isim, yas, yetkili, islemismi) {
            kdb.push(`kullanici.${uye}.gecmis`, {
                Isim: isim,
                Yas: yas,
                Yetkili: yetkili,
                islembilgi: islemismi,
                Zaman: Date.now()
              });
              kdb.set(`kullanici.${uye}.songecmis`, {
                Isim: isim,
                Yas: yas
              });
        }
        static isimGuncelle(uye, isim, yaş, işlemismi) {
            kdb.push(`kullanici.${uye}.gecmis`, {
                Isim: isim,
                Yas: yaş,
                islembilgi: işlemismi,
                Zaman: Date.now()
              });
        }
        static teyitEkle(uye, yetkili, cinsiyet) {
            kdb.add(`teyit.${yetkili}.${cinsiyet}`, 1);
        }
        static isimlerÇek(üye) {
            let isimgeçmişi = kdb.get(`kullanici.${üye.id}.gecmis`) || [];
            return isimgeçmişi;
        }
        static cinsiyetBelirle(uye, cinsiyet) {
            kdb.set(`kullanici.${uye.id}.cinsiyet`, cinsiyet)
        }
        static cinsiyetGetir(uye) {
            let getir = kdb.get(`kullanici.${uye.id}.cinsiyet`);
            return getir;
        }
        static kayıtsızYap(uye) {
            kdb.delete(`kullanici.${uye.id}.cinsiyet`);
            kdb.delete(`kullanici.${uye.id}.songecmis`);
        }
        static sonIsimÇek(üye) {
            let sonisim = kdb.fetch(`kullanici.${üye.id}.songecmis`)
            return sonisim;
        }
        static teyitSorgu() {
            let teyitsorgu = kdb.get("teyit") || {};
            return teyitsorgu;
        }
        static teyitÇek(uye) {
            let teyitçek = kdb.get(`teyit.${uye.id}`)
            return teyitçek;
        }
        static cezaEkle(cezanumarasi, uye, yetkili, tip, tur, sebep, sure, as, bz, veritipi) {
            let cezano = cezanumarasi;
            let ceza = {
                No: cezano,
                Aktif: true,
                Cezalanan: uye.id,
                Yetkili: yetkili.id,
                Tip: tip,
                Tur: tur,
                Sebep: sebep,
                AtilanSure: as,
                BitisZaman: bz,
                Kaldiran: "Kaldırma İşlemi Yok!",
                Zaman: Date.now() 
              };
                 kdb.set(`ceza.${cezano}`, ceza);
                 kdb.push(`kullanici.${uye.id}.cezalar`, ceza);
                    if(veritipi === "tempjail") {
                         cdb.push(veritipi, {id: uye.id,No: cezano, kalkmaZamani: Date.now()+ms(sure)});
                         kdb.add(`kullanici.${yetkili.id}.jail`, 1);
                         kdb.add(`kullanici.${uye.id}.cezapuan`, 15);
                     } else if(veritipi === "jail") {
                                cdb.push(`jail`, `j${uye.id}`);
                                kdb.add(`kullanici.${uye.id}.cezapuan`, 20);
                                kdb.add(`kullanici.${yetkili.id}.jail`, 1);
                        } else if(veritipi === "ban") {
                                    kdb.add(`kullanici.${uye.id}.cezapuan`, 30);
                                    kdb.add(`kullanici.${yetkili.id}.ban`, 1);     
                                 } else if(veritipi === "tempmute") {
                                                 cdb.push(veritipi, {id: uye.id,No: cezano, kalkmaZamani: Date.now()+ms(sure)})
                                                 kdb.add(`kullanici.${yetkili.id}.mute`, 1);
                                                 kdb.add(`kullanici.${uye.id}.cezapuan`, 10);
                                            } else if(veritipi === "tempsmute") {
                                                        cdb.push(`tempsmute`, {id: uye.id,No: cezano, kalkmaZamani: Date.now()+ms(sure)})
                                                        kdb.add(`kullanici.${yetkili.id}.sesmute`, 1);
                                                        kdb.add(`kullanici.${uye.id}.cezapuan`, 10);
                                                    } else if(veritipi === "warn") {
                                                                kdb.add(`kullanici.${yetkili.id}.uyari`, 1);
                                                                kdb.add(`kullanici.${uye.id}.cezapuan`, 2);
                                                            } 
                qdb.add(`cezano.${ayarlar.sunucuID}`, 1)
        }
        static kullanıcıBilgisi(uye, tür) {
            if(tür == "uyari") return kdb.get(`kullanici.${uye.id}.uyari`) || 0;
            if(tür == "sesmute") return kdb.get(`kullanici.${uye.id}.sesmute`) || 0;
            if(tür == "mute") return kdb.get(`kullanici.${uye.id}.mute`) || 0;
            if(tür == "jail") return kdb.get(`kullanici.${uye.id}.jail`) || 0;
            if(tür == "ban") return kdb.get(`kullanici.${uye.id}.ban`) || 0;     
        }
        static cezaPuanOku(uye) {
            let oku = kdb.fetch(`kullanici.${uye.id}.cezapuan`) || 0;
            return oku;
        }
        static cezaNoGetir() {
            let cezano = qdb.get(`cezano.${ayarlar.sunucuID}`);
            return cezano;
        }
        static cezaGetir(uye) {
            let cezagetir = kdb.get(`kullanici.${uye.id}.cezalar`)
            return cezagetir;
        }
        static cezaBilgi(cezano) {
            let cezabilgi = kdb.fetch(`ceza.${cezano}`)
            return cezabilgi;
        }
        static sicilTemizle(uye) {
            kdb.delete(`kullanici.${uye}.cezalar`);
            kdb.delete(`kullanici.${uye}.cezapuan`)
        }
        static muteGetir() {
            let muteler = cdb.get(`tempmute`) || [];
            return muteler;
        }
        static smuteGetir() {
            let sesmuteler = cdb.get(`tempsmute`) || [];
            return sesmuteler;
        }
        static jailGetir() {
            let jailgetir =  cdb.get(`tempjail`) || [];
            return jailgetir;
        }
        static yasakTagÇek() {
            let yasakTagli = cdb.get('yasakTaglilar') || [];
            return yasakTagli;
        }
        static yasakTagliEkle(üyeid) {
            cdb.push('yasakTaglilar', `y${üyeid}`);
        }
        static yasakTagliKaldır(uye) {
 	    let yasakTaglilar = cdb.get('yasakTaglilar') || [];
            cdb.set('yasakTaglilar', yasakTaglilar.filter(x => !x.includes(uye.id)));
        }
        static yasakTagCheck(uye) {
            let yasakTaglilar = cdb.get('yasakTaglilar') || [];
            cdb.set("yasakTaglilar", yasakTaglilar.filter(x => !x.includes(uye.id)));
        }
        static mutelerKaldir(i, uye, yetkili) {
            let tempmuteler = cdb.get(`tempmute`) || [];
            cdb.set(`tempmute`, tempmuteler.filter(x => x.id !== uye.id));
            kdb.set(`ceza.${i}.Aktif`, false)
            kdb.set(`ceza.${i}.BitisZaman`, Date.now())
            kdb.set(`ceza.${i}.Kaldiran`, yetkili.id)
        }
        static sesMuteKaldir(i, uye, yetkili) {
            let tempsmuteler = cdb.get(`tempsmute`) || [];
            cdb.set(`tempsmute`, tempsmuteler.filter(x => x.id !== uye.id));
            kdb.set(`ceza.${i}.Aktif`, false)
            kdb.set(`ceza.${i}.BitisZaman`, Date.now())
            kdb.set(`ceza.${i}.Kaldiran`, yetkili.id)
        }
        static sesMuteKontrol(i, uye,) {
            let tempsmuteler = cdb.get(`tempsmute`) || [];
            cdb.set(`tempsmute`, tempsmuteler.filter(x => x.id !== uye.id));
            kdb.set(`ceza.${i}.Aktif`, false)
            kdb.set(`ceza.${i}.BitisZaman`, Date.now())
        }
        static sJailKaldir(i, uye, yetkili) {
            let jaildekiler = cdb.get(`jail`) || [];
            let tempjaildekiler = cdb.get(`tempjail`) || [];
            cdb.set(`jail`, jaildekiler.filter(x => !x.includes(uye.id)));
            cdb.set(`tempjail`, tempjaildekiler.filter(x => x.id !== uye.id));
            kdb.set(`ceza.${i}.Aktif`, false)
            kdb.set(`ceza.${i}.BitisZaman`, Date.now())
            kdb.set(`ceza.${i}.Kaldiran`, yetkili.id)
        }
        static banKaldir(i, uye, yetkili) {
            kdb.set(`ceza.${i}.Aktif`, false)
            kdb.set(`ceza.${i}.BitisZaman`, Date.now())
            kdb.set(`ceza.${i}.Kaldiran`, yetkili.id)
        }
        static async cezaTara() {
            let yasakTaglar = ayarlar.yasakTaglar || [];
            let yasakTaglilar = cdb.get("yasakTaglilar") || [];
            let tempjailler = cdb.get("tempjail") || [];
            let tempmuteler = cdb.get("tempmute") || [];
            let sesmuteler = cdb.get("tempsmute") || [];
            for (let kisi of yasakTaglilar) {
                let uye = client.guilds.cache.get(ayarlar.sunucuID).members.cache.get(kisi.slice(1));
                if (uye && yasakTaglar.some(tag => uye.user.username.includes(tag)) && !uye.roles.cache.has(roller.yasaklıTagRolü)) uye.roles.set(uye.roles.cache.has(roller.boosterRolü) ? [roller.boosterRolü, roller.yasaklıTagRolü] : [roller.yasaklıTagRolü]).catch();
                if (uye && !yasakTaglar.some(tag => uye.user.username.includes(tag)) && uye.roles.cache.has(roller.yasaklıTagRolü)) {
                  cdb.set("yasakTaglilar", yasakTaglilar.filter(x => !x.includes(uye.id)));
                  uye.rolTanımla(roller.yasaklıTagRolü)
                };
              };
              
              for (let ceza of tempmuteler) {
                let uye = client.guilds.cache.get(ayarlar.sunucuID).members.cache.get(ceza.id);
                if (Date.now() >= ceza.kalkmaZamani) {
                  cdb.set("tempmute", tempmuteler.filter(x => x.id !== ceza.id));
                  if (uye && uye.roles.cache.has(roller.muteRolü)) uye.roles.remove(roller.muteRolü)
                  kdb.set(`ceza.${ceza.No}.Aktif`, false)
                  kdb.set(`ceza.${ceza.No}.BitisZaman`, Date.now())
                } else {
                  if (uye && !uye.roles.cache.has(roller.muteRolü)) uye.roles.add(roller.muteRolü)
                };
              };
              for (let ceza of tempjailler) {
                let uye = client.guilds.cache.get(ayarlar.sunucuID).members.cache.get(ceza.id);
                if (Date.now() >= ceza.kalkmaZamani) {
                  cdb.set("tempjail", tempjailler.filter(x => x.id !== ceza.id));
                  if (uye && uye.roles.cache.has(roller.jailRolü)) {
                  let sonisim = acarDatabase.sonIsimÇek(uye);
                  let cinsiyet = acarDatabase.cinsiyetGetir(uye);
                  if(sonisim || cinsiyet) {
                    if(cinsiyet == "erkek") uye.rolTanımla(roller.Teyit.erkekRolleri).then(acar => { if(uye.user.username.includes(ayarlar.tag)) uye.roles.add(roller.Teyit.tagRolü) });
                    if(cinsiyet == "kadın") uye.rolTanımla(roller.Teyit.kadınRolleri).then(acar => { if(uye.user.username.includes(ayarlar.tag)) uye.roles.add(roller.Teyit.tagRolü) });
                    } else { uye.rolTanımla(roller.Teyit.kayıtsızRolleri)}
                }
                  kdb.set(`ceza.${ceza.No}.Aktif`, false)
                  kdb.set(`ceza.${ceza.No}.BitisZaman`, Date.now())
                } else {
                    if (uye && !uye.roles.cache.has(roller.jailRolü)) uye.roles.set(uye.roles.cache.has(roller.boosterRolu) ? [roller.boosterRolu, roller.jailRolü] : [roller.jailRolü])
                };
              };
            for (let ceza of sesmuteler) {
                let uye = client.guilds.cache.get(ayarlar.sunucuID).members.cache.get(ceza.id);
                if (Date.now() >= ceza.kalkmaZamani) {
                  cdb.set("tempsmute", sesmuteler.filter(x => x.id !== ceza.id));
                  if(uye && uye.voice.channel) uye.voice.setMute(false);
                  if(uye) uye.roles.remove(roller.voicemuteRolü);
                  kdb.set(`ceza.${ceza.No}.Aktif`, false)
                  kdb.set(`ceza.${ceza.No}.BitisZaman`, Date.now())
                } else {
                   if(uye) uye.roles.add(roller.voicemuteRolü);
                };
              };
        }
        static coinOku(uye) {
            let puangor = pdb.get(`puancik.${uye.id}.puan`) || 0
            return puangor;
        }

        static coinEkle(uye, miktar) {
            pdb.add(`puancik.${uye.id}.puan`, miktar)
        }

        static coinTemizle(uye) {
                pdb.set(`puancik.${uye.id}.puan`, 0);
        }

        static mesajSil(uye) {
            qdb.delete(`mesajkontrol.${uye.id}`);
        }
        static mesajKontrol(uye) {
            let kontrol = qdb.get(`mesajkontrol.${uye.id}`);
            return kontrol;
        }
        static mesajEkle(uye) {
            qdb.add(`mesajkontrol.${uye.id}`, 1);
        }
        static coinSil(uye, coin) {
            pdb.subtract(`puancik.${uye.id}.puan`, coin);
        }
        static tagaEkle(uye, yetkili, aktif) {
            tdb.set(`tag.${uye.id}`, {
                kontrol: aktif,
                ekleyen: yetkili.id,
                tarih: Date.now()
            })
        }
        static yetkiliTagaEkle(uye, yetkili) {
            tdb.set(`son.${yetkili.id}`, {
                kim: uye.id,
                tarih: Date.now()
            })
            tdb.add(`yetkili.${yetkili.id}`, 1)
        }
        static tagdanÇıkar(uye) {
            let kontrol = tdb.get(`tag.${uye.id}`);
            if(!kontrol) return;
            pdb.subtract(`puancik.${kontrol.ekleyen}.puan`, coinsistem.odül.taglı);
            tdb.subtract(`yetkili.${kontrol.ekleyen}`, 1)
            tdb.delete(`tag.${uye.id}`)
        }
        static tagKontrol(uye) {
          let kontrol = tdb.get(`tag.${uye.id}`);
            return kontrol;
        }
        static yetkiliTagKontrol(yetkili) {
            let kontrol = tdb.get(`yetkili.${yetkili.id}`) || 0;
              return kontrol;
          }
        static sonTaglıKontrol(yetkili) {
            let kontrol = tdb.get(`son.${yetkili.id}`) || {};
            return kontrol;
        }
        static terfiGetir(uye, sunucuid) {
           let getir = terfidb.get(`terfi.${sunucuid}.${uye.id}`)
            return getir;
        }   
        static terfiPuanEkle(uye, puan) {
            const sunucubul = client.guilds.cache.get(ayarlar.sunucuID);
            const getir = terfidb.get(`terfi.${sunucubul.id}.${uye.id}`)
            if(!getir) {
                terfidb.set(`terfi.${sunucubul.id}.${uye.id}`, {
                    puan: 0,
                    toplampuan: 0,
                    seviye: 1,
                    eskiseviye: 0
                });
                return;
            }
            terfidb.add(`terfi.${sunucubul.id}.${uye.id}.puan`, puan)
            terfidb.add(`terfi.${sunucubul.id}.${uye.id}.toplampuan`, puan)
	   // Otomatik Alt Yetki Verme Sistemi!
           // if(getir.seviye >= 3) {
           //     if(!uye.roles.cache.has('817278063615148086')) uye.roles.add('817278063615148086') 
           // } 
           // if(getir.seviye >= 5) {
           //     if(!uye.roles.cache.has('817278063615148086')) uye.roles.add('817278063615148086') 
           //     if(!uye.roles.cache.has('817278063615148088')) uye.roles.add('817278063615148088')
           // }
           // if(getir.seviye >= 7) {
           //     if(!uye.roles.cache.has('817278063615148086')) uye.roles.add('817278063615148086') 
           //     if(!uye.roles.cache.has('817278063615148088')) uye.roles.add('817278063615148088')
           //     if(!uye.roles.cache.has('817278063615148087')) uye.roles.add('817278063615148087')
           // }
           // if(getir.seviye >= 11) {
           //     if(!uye.roles.cache.has('817278063615148086')) uye.roles.add('817278063615148086') 
           //     if(!uye.roles.cache.has('817278063615148088')) uye.roles.add('817278063615148088')
           //     if(!uye.roles.cache.has('817278063615148087')) uye.roles.add('817278063615148087')
           //     if(!uye.roles.cache.has('817278063615148089')) uye.roles.add('817278063615148089')
           // }
            const yeniPuan = getir.seviye * 2 * 250
            if (getir && terfisistem.yetkipuan.some(x => getir.puan >= yeniPuan)) {
              let yeniYetki = terfisistem.yetkipuan.filter(x => x.seviye == getir.seviye);
              yeniYetki = yeniYetki[yeniYetki.length-1];
              const eskiYetki = terfisistem.yetkipuan[terfisistem.yetkipuan.indexOf(yeniYetki)-1];
              uye.roles.add(yeniYetki.rol);
              terfidb.set(`terfi.${sunucubul.id}.${uye.id}.puan`, 0)
              terfidb.set(`terfi.${sunucubul.id}.${uye.id}.seviye`, getir.seviye += 1)
              terfidb.set(`terfi.${sunucubul.id}.${uye.id}.eskiseviye`, getir.seviye -= 1)
             if (eskiYetki && Array.isArray(eskiYetki.rol) && eskiYetki.rol.some(x => uye.roles.cache.has(x)) || eskiYetki && !Array.isArray(eskiYetki.rol) && uye.roles.cache.has(eskiYetki.rol)) uye.roles.remove(eskiYetki.rol);
             sunucubul.kanalBul("terfi-log").wsend(`:tada: ${uye.toString()} üyesi gereken puana ulaştı ve \`${sunucubul.roles.cache.get(yeniYetki.rol).name}\` isimli yetki rolü verildi!`);
            }
        }
        static async yetkiyeBaşlat(uye, sv) {
             terfidb.set(`terfi.${ayarlar.sunucuID}.${uye.id}`, {
                puan: 0,
                toplampuan: sv * 2 * 250,
                seviye: sv += 1,
                eskiseviye: sv -= 1
                });
              let getir = terfidb.get(`terfi.${ayarlar.sunucuID}.${uye.id}`)
              let yeniYetki = terfisistem.yetkipuan.filter(x => x.seviye == getir.eskiseviye);
              yeniYetki = yeniYetki[yeniYetki.length-1];
              if(getir) {
                  if(!uye.roles.cache.has(yeniYetki.rol)) await uye.roles.add(yeniYetki.rol);
                }
        }
        static yetkiÇek(uye) {
            terfidb.delete(`terfi.${ayarlar.sunucuID}.${uye.id}`);
            tdb.delete(`son.${uye.id}`);
            tdb.delete(`yetkili.${uye.id}`);
            kdb.delete(`teyit.${uye.id}`)
        }
    }
module.exports = acarDatabase;
