const usersMap = new Map();

module.exports = {
    name: "messageCreate",
    async execute(message, client) {

        if (!client.antiraidEnabled) return;
        if (message.author.bot) return;
        if (!message.member) return;

        const limit = 5;       // 5 messages max
        const interval = 2000;  // en 2 secondes (2000 ms)

        let userData = usersMap.get(message.author.id);

        if (!userData) {
            userData = { msgCount: 1 };
            usersMap.set(message.author.id, userData);

            setTimeout(() => {
                usersMap.delete(message.author.id); // réinitialise après 2s
            }, interval);
        } else {
            userData.msgCount++;

            if (userData.msgCount > limit) {
                try {
                    if (message.member.moderatable) {
                        await message.member.timeout(60000, "Spam");
                        message.channel.send(`${message.author} a été mute pour spam.`);
                    } else {
                        message.channel.send(`**⚠️ Impossible de mute ${message.author}, permissions manquantes.**`);
                    }
                } catch (err) {
                    console.log(`Erreur anti-raid: ${err.message}`);
                }
                usersMap.delete(message.author.id); // réinitialise après sanction
            }
        }
    }
};
