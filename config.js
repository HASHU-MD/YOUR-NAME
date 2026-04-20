const fs = require('fs');
if (fs.existsSync('config.env')) require('dotenv').config({ path: './config.env' });

function convertToBool(text, fault = 'true') {
    return text === fault ? true : false;
}
module.exports = {
SESSION_ID: process.env.SESSION_ID || "7URRVbZD#tdwJZjw2uv2CIFe5UcUiAADhEt0YCwn5lSLOa4jPDP8",
AUTO_RECORDING: process.env.AUTO_RECORDING || "false",
ANTI_BAD_WORD: process.env.ANTI_BAD_WORD || "false",
AUTO_REPLY: process.env.AUTO_REPLY || "false",
ALIVE_IMG: process.env.ALIVE_IMG || "https://files.catbox.moe/l06cb8.jpg",
ALIVE_MSG: process.env.ALIVE_MSG || "HELLO IM YOURE NAME CREATED BY YOUR NAME <NOW ALIVE> "
};
