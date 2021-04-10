const { Client, Message } = require("discord.js");
module.exports = {
    Isim: "eval",
    Komut: ["eval"],
    Kullanim: "",
    Aciklama: "",
    Kategori: "",
    
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
    if(!sistem.staff.some(id => message.author == id)) return;
    if (!args[0]) return message.channel.send(`Hata: \`kod belirtilmedi!\``);
    let code = args.join(' ');

    function clean(text) {
      if (typeof text !== 'string') text = require('util').inspect(text, { depth: 0 })
      text = text.replace(/`/g, '`' + String.fromCharCode(8203)).replace(/@/g, '@' + String.fromCharCode(8203))
      return text;
    };
    try { 
      var evaled = clean(await eval(code));
      if(evaled.match(new RegExp(`${client.token}`, 'g'))) evaled.replace("token", "Yarrama Bak Tokene Mi baktın!").replace(client.token, "Yasaklı komut").replace("terfitoken", "Yarrak Token Mi Çalcan Sen?").replace(sistem.terfitoken, "Yarrak Oğlu Yarrak!");
      message.channel.send(`${evaled.replace(client.token, "Yasaklı komut")}`, {code: "js", split: true});
    } catch(err) { message.channel.send(err, {code: "js", split: true}) };

}
};