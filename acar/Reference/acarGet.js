async function GetUser(id) {
    try {
        return await global.client.users.fetch(id);
    } catch (error) {
        return undefined;
    }
};

function sayılıEmoji(sayi) {
    var basamakbir = sayi.toString().replace(/ /g, "     ");
    var basamakiki = basamakbir.match(/([0-9])/g);
    basamakbir = basamakbir.replace(/([a-zA-Z])/g, "Belirlenemiyor").toLowerCase();
    if (basamakiki) {
        basamakbir = basamakbir.replace(/([0-9])/g, d => {
            return {
                "0": emojiler.Sayı.sıfır,
                "1": emojiler.Sayı.bir,
                "2": emojiler.Sayı.iki,
                "3": emojiler.Sayı.üç,
                "4": emojiler.Sayı.dört,
                "5": emojiler.Sayı.beş,
                "6": emojiler.Sayı.altı,
                "7": emojiler.Sayı.yedi,
                "8": emojiler.Sayı.sekiz,
                "9": emojiler.Sayı.dokuz
            }[d];
        });
    }
    return basamakbir;
}


global.client.users.getUser = GetUser;
global.client.getUser = GetUser;

module.exports = {
    GetUser,
    sayılıEmoji,
}