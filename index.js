require('dotenv').config();
const fs = require('fs');
const sound = require('sound-play');
const tmi = require('tmi.js');
const path = require('path');
const messageSound = path.join(__dirname, 'sound.mp3');
const xdArr = require('./xdArray');
const commandList = require('./commandList');

let failCounter = require('./fails.json');

const oofSounds = ['mariooof.mp3', 'minecraftoof.mp3', 'robloxoof.mp3'];

const client = new tmi.Client({
  options: { debug: true },
  connection: {
    secure: true,
    reconnect: true,
  },
  identity: {
    username: 'pingusteifbot',
    password: process.env.TWITCH_OAUTH_TOKEN,
  },
  channels: ['pingusteif'],
});

client.connect();

client.on('message', (channel, tags, message, self) => {
  // Ignore echoed messages.
  if (self) return;

  let playMessageSound = true;

  let command = message.toLowerCase();

  if (command.includes('xd')) {
    let randomXd = xdArr[Math.floor(Math.random() * xdArr.length)];
    client.say(channel, randomXd);
  }

  /* ! Commands */
  if (command[0] == '!') {
    command = command.slice(1);

    switch (command) {
      case 'hello':
        client.say(channel, `@${tags.username}, Yo what's up`);
        break;
      case 'donate':
        client.say(
          channel,
          `@${tags.username}, That'd be​ very cash money of you: https://streamlabs.com/pingusteif`
        );
        break;
      case 'discord':
        client.say(
          channel,
          `@${tags.username}, PinguSteif Discord​: https://discord.gg/CZCRhEQ`
        );
        break;
      case 'icq':
        client.say(channel, `@${tags.username}, 217404635 🌼`);
        break;
      case 'wat':
        client.say(channel, `Wat?`);
        break;
      case 'nicememe':
        client.say(channel, `𝙉𝙞𝙘𝙚 𝙈𝙚𝙢𝙚​ 👌`);
        playSound('nicememe.mp3');
        playMessageSound = false;
        break;
      case 'nicecock':
        client.say(channel, `𝙉𝙞𝙘𝙚 𝘾𝙤𝙘𝙠 🐓 👀`);
        playSound('nicecock.mp3');
        playMessageSound = false;
        break;
      case 'pingu':
        client.say(channel, `${tags.username} ist ein Pinguin 🐧`);
        break;
      case 'steif':
        client.say(channel, `🍆 ( ͡° ͜ʖ ͡°)`);
        break;
      case 'ping':
        client.say(channel, `Pong! 🏓`);
        break;
      case 'hackfleischhassenderzerhacker':
        client.say(channel, `@${tags.username} er zerhackt dich! 🔪`);
        break;
      case 'giveaway':
        client.say(channel, `Willste Isolierband?`);
        break;
      case 'lotto':
        client.say(channel, `Too bad. You lost the lottery ¯\\_(ツ)_/¯`);
        break;
      case 'fail':
        client.say(channel, `ＦＡＩＬ😞👎🎺🚫 No. ${++failCounter.fail}`);
        saveFails();
        break;
      case 'monsterfail':
        playSound('monsterfail.mp3');
        playMessageSound = false;
        client.say(
          channel,
          `MOMOMOMO 𝐌𝐎𝐍𝐒𝐓𝐄𝐑𝐅𝐀𝐈𝐋 (fail) TOTAL MOMOMO𝐌𝐎𝐍𝐒𝐓𝐄𝐑𝐅𝐀𝐈𝐋S: ${++failCounter.monsterfail}`
        );
        saveFails();
        break;
      case 'oof':
        {
          let randomOof =
            oofSounds[Math.floor(Math.random() * oofSounds.length)];
          playSound(randomOof);
          playMessageSound = false;

          client.say(channel, 'OOF');
        }
        break;
      case 'commands': {
        let output = `@${tags.username} List of available commands: `;
        for (let i = 0; i < commandList.length; i++) {
          let cmd = commandList[i];
          if (i == commandList.length - 1) {
            output += `and ${cmd}.`;
          } else {
            output += `${cmd}, `;
          }
        }
        output += ' Try to find the hidden commands 😉';
        client.say(channel, output);
      }
    }
  }
  if (playMessageSound) sound.play(messageSound);
});

function playSound(filename) {
  sound.play(path.join(__dirname, filename));
}

function saveFails() {
  fs.writeFileSync('fails.json', JSON.stringify(failCounter));
}
