const acarDatabase = require("../../Reference/acarDatabase");
module.exports = () => {
    setInterval(() => {
        acarDatabase.cezaTara();
      }, 10000);
}

module.exports.config = {
    Event: "ready"
}