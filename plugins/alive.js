const { cmd, commands } = require('../command');
const os = require("os");
const { runtime } = require('../lib/functions');

cmd({
    pattern: "alive",
    alias: ["status", "runtime", "uptime"],
    desc: "Check uptime and system status",
    category: "main",
    react: "👋",
    filename: __filename
},
async (conn, mek, m, { from, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply, sendButton }) => {
    try {
        // පද්ධති තොරතුරු සකස් කිරීම
        const statusText = `╭━━〔 *𝐇𝐀𝐒𝐇𝐀𝐍-𝐌𝐃* 〕━━┈⊷
┃◈╭─────────────·๏
┃◈┃• *👋 ʜɪ*: ${pushname}
┃◈┃• *⏳ ᴜᴘᴛɪᴍᴇ*:  ${runtime(process.uptime())} 
┃◈┃• *📟 ʀᴀᴍ*: ${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)}MB / ${(os.totalmem() / 1024 / 1024).toFixed(2)}MB
┃◈┃• *👨‍💻 ᴏᴡɴᴇʀ*: ᴍʀ ʜᴀꜱʜᴜᴜ </>
┃◈└───────────┈⊷
╰──────────────┈⊷

*𝐇𝐀𝐒𝐇𝐀𝐍-𝐌𝐃 𝐌𝐔𝐋𝐓𝐈 𝐃𝐄𝐕𝐈𝐂𝐄 𝐖𝐇𝐀𝐓𝐒𝐀𝐏𝐏 𝐁𝐎𝐓 𝐂𝐑𝐄𝐀𝐓𝐄𝐃 𝐁𝐘 𝐌𝐑 𝐇𝐀𝐒𝐇𝐔𝐔*`;

        const footerText = "> *𝗣𝗢𝗪𝗘𝗥𝗘𝗗 𝗕𝗬 𝗛𝗔𝗦𝗛𝗔𝗡-𝗠𝗗 𝗩𝗘𝗥𝗦𝗜𝗢𝗡 1*";

        // බොත්තම් සකස් කිරීම
        const buttons = [
            {
                name: "quick_reply",
                buttonParamsJson: JSON.stringify({
                    display_text: "GET MENU 🛠️",
                    id: ".menu"
                })
            },
            {
                name: "cta_url",
                buttonParamsJson: JSON.stringify({
                    display_text: "JOIN CHANNEL 📢",
                    url: "https://whatsapp.com/channel/0029VazhnLzK0IBdwXG4152o"
                })
            }
        ];

        // Button පණිවිඩය යැවීම
        // සටහන: Image එකක් සමඟ Button යැවීමට නම් interactiveMessage header එකට image එක ඇතුළත් කළ යුතුය.
        // නමුත් දැනට index.js එකේ අපි හැදුවේ text buttons නිසා මේ විදිහට පාවිච්චි කරන්න:

        await sendButton(statusText, footerText, buttons);

    } catch (e) {
        console.error("Error in alive command:", e);
        reply(`An error occurred: ${e.message}`);
    }
});
