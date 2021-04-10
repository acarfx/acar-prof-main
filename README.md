# ACAR Professional Moderation & Upstaff & Coin System Bot

Otomatik terfi sistemi içinde bulunan ayrıca coin sistemi içinde bulunan discord botu en yakın zamanda buraya yükleyeceğim.
Gelişmiş cezalandırma sistemi ve ceza bilgi sistemi ayrıca gelişmiş kayıt sistemi ve düzenli bir altyapı bütün hepsi içindedir.
Taglı üye, kayıt, ses ve mesaj aktifliğine göre otomatik yetki atlama ve coin kazanma sistemi içine dahildir dilediğiniz zaman kapatıp açabilirsiniz.
Kayıt olan kişi taglı alım modunda iken cezalıda da olsa yasaklı tagda da olsa üstünde tagı yoksa kayıt işlemi hiç bir şekilde alınamaz ve otomatik kayıt etmez.
Taglı alım modu kapalıysa üyenin cinsiyet verisi varsa otomatik kayıt işlemini alır ve kaydını tamamlar.
Ayrıca istediğiniz veritabanını hızlıca kodlayabileceksiniz sadece ./Reference/acarDatabase.js içindeki fonksiyonları değiştirmeden içindeki kodlamayı değiştirip sistemi kendi dilediğiniz gibi kodlayabileceksiniz.

NOT: Invite sistemini eklemedim çünkü J4J yaptıkları zaman puanın içinden geçebilirler günde 1k kasıp onun için ek dosya koycam kullanmak isteyen kullanabilsin diye! 

### Bu bot hangi sunucuda var?
ilk önce Knaves'de bulundu ayh özledim amk sunucsunu qşlekqşwlke
discord.gg/monarch
discord.gg/feanor
discord.gg/throne

### Bunu öylesine paylaştım!
Fakat en kısa zamnada mongolu ve mysqlli olanını paylaşacağım ayrıca otomatik kanalları kuran ve guard botuyla birlikte çalışan botla beraber koyacağayım 

### Nereleri düzenlemeliyim?
./acar/Settings/ klasöründe bulunan bütün dosyaları ince detayına kadar düzenlemelisiniz aksi taktirde ufak tefek sorunlarla karşılaşabilirsiniz.

### kanallar.json
Kanalların içinde bulunan kanal isimlerini tek tek log kanallarnıza açın yakın zamanda otomatik kuran sistemi de paylaşıcam


### Knaves ve Monarch sunucusundaki gibi altyetkileri de verdirmek istiyorum?
./acar/Reference/acarDatabase.js dosyasında 324. Satırda Monarch ve Knaves tipi yetkiye göre Hammer vermesini ayarlayabilirsiniz!
### Örneğin!
7 Yetkimiz olsun ve o yetkilerde hammerlarıda eklesin ilkte zaten ability ile başlatıyorsunuz onu geçelim

./acar/Settings/terfisystem.js klasöründe;
```javascript
    yetkipuan: [
        { rol: "ilk yetki id", seviye: "0"},
        { rol: "ikinci yetki id", seviye: "1"},
        { rol: "üçüncü yetki id", seviye: "2"},
        { rol: "dördüncü yetki id", seviye: "3"},
        { rol: "beşinci yetki id", seviye: "4"},
        { rol: "altıncı yetki id", seviye: "5"},
        { rol: "yedinci yetki id", seviye: "6"},
    ]
 ```
bu şekilde ayarımız mevcut ve 2 seviye de teleport gelmesini siteyeceğiz yani 3. rütbede
```javascript
if(getir.seviye == 2) { 
  if(!uye.roles.cache.has(roller.teleportHammer)) uye.roles.add(roller.teleportHammer) 
}; 
```
#### Kesinlikle 324 satır kısmına girilmelidir aksi taktirde sistemi bozabilirsiniz.





![image](https://user-images.githubusercontent.com/77089894/112477469-17d58200-8d84-11eb-82d3-6bf07b1cb747.png)
![image](https://user-images.githubusercontent.com/77089894/112474806-21111f80-8d81-11eb-959f-aeb3a317424f.png)
![image](https://user-images.githubusercontent.com/77089894/112474886-37b77680-8d81-11eb-994b-fddf043ce18e.png)
![image](https://user-images.githubusercontent.com/77089894/112476578-18b9e400-8d83-11eb-8f85-d3b5dfae433a.png)
![image](https://user-images.githubusercontent.com/77089894/112476266-c5479600-8d82-11eb-84c3-5fef61ee3a02.png)
