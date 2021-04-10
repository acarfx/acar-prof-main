const {Client} = require('discord.js');
const client = global.client = new Client({ fetchAllMembers: true });
const acarMessage = require('./acar/Reference/acarMessage');
const acarReply = require("./acar/Reference/acarReply");
const acar = require('./acar/Reference/acar');

// System Required
acar.sistemGereksinimleri();
acarMessage.KufurReklamEngel();
acarMessage.fotoSpotifyKoru();
acarMessage.mesajLog();
acarReply.replyFetch();
acar.komutYükle();
acar.On();

// acar(Util's)
require("./acar/Reference/acarUtils");

// acar(Moderation)
acar.Moderation();

// acar(Sistemler)
acar.sistemÇalıştır("coin");
acar.sistemÇalıştır("terfi");