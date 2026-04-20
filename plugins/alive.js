const { cmd } = require('../command');

cmd({
    pattern: "alive",
    alias: ["bot", "online"],
    desc: "Check if bot is active with buttons",
    category: "main",
    react: "👋",
    filename: __filename
},
async (conn, mek, m, { from, prefix, reply }) => {
    try {
        // Button definition
        const buttons = [
            {
                name: "quick_reply",
                buttonParamsJson: JSON.stringify({
                    display_text: "📜 MENU",
                    id: `${prefix}menu`
                })
            },
            {
                name: "quick_reply",
                buttonParamsJson: JSON.stringify({
                    display_text: "👤 OWNER",
                    id: `${prefix}owner`
                })
            }
        ];

        // Button message structure
        let msg = {
            viewOnceMessage: {
                message: {
                    interactiveMessage: {
                        body: { 
                            text: "*👋 Hello! I am Hashu-MD is Alive Now!*" 
                        },
                        footer: { 
                            text: "© Created By Hashu" 
                        },
                        header: {
                            title: "BOT STATUS",
                            hasMediaAttachment: true,
                            // Oyaage thumbnail eka mehema danna puluwan
                            thumbnailUrl: "https://files.catbox.moe/vbo0vq.png",
                            imageMessage: null // Image ekak danna onenam meka wenas karanna puluwan
                        },
                        nativeFlowMessage: {
                            buttons: buttons
                        },
                        // Me thiyenne ara crash eka nawaththana safety line eka
                        contextInfo: {
                            mentionedJid: [m.sender], 
                            forwardingScore: 1,
                            isForwarded: false
                        }
                    }
                }
            }
        };

        // Message eka relay kirima
        await conn.relayMessage(from, msg, { messageId: mek.key.id });

    } catch (e) {
        console.log("Alive Button Error: ", e.message);
        // Button wada nathnam normal text message ekak yawamu
        reply("*👋 I am Alive Now!*");
    }
});
