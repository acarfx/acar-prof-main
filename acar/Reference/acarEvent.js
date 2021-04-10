class acarEvent {
    static fetchEvent(fileName) {
        let referans = require(`../acarEvents/${fileName}`);
        global.client.on(referans.config.Event, referans);
        console.log('\x1b[32m%s\x1b[0m', `[ ACAR Default Etkinlik ] ${fileName} yüklendi.`);
    }
}

module.exports = acarEvent;