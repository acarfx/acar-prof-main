const { VoiceState } = require("discord.js");
const acar = require("../../Reference/acarGet");
const acarDatabase = require("../../Reference/acarDatabase");
/**
 * @param {VoiceState} oldState 
 * @param {VoiceState} newState 
 */
module.exports = async (oldState, newState) => {
    if((!oldState.channel && newState.channel) || (oldState.channel && newState.channel)){
        let data = acarDatabase.smuteGetir() || [{id: null,kalkmaZamani: null}];
        let member = newState.member;
        if(!member) return;
        if(data.some(d => d.id == member.id)){
          let d = data.find(x => x.id == member.id);
          if(Date.now() >= d.kalkmaZamani){
            data = data.filter(d => d.id != member.id);
           if (member && member.voice.channel) member.voice.setMute(false);
            member.roles.remove(roller.voicemuteRolü);
            acarDatabase.sesMuteKontrol(d.No, member)
          } else if(member.voice.channel && !member.voice.serverMute){
            member.roles.add(roller.voicemuteRolü);
          }
        }
      }
}

module.exports.config = {
    Event: "voiceStateUpdate"
}