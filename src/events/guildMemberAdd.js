module.exports = {
    name: "guildMemberAdd",
    async execute(member, client) {

        if (!client.captchaEnabled) return;

        // Si le membre n'a que @everyone
        if (member.roles.cache.size === 1) {
            try {
                await member.send("Merci de passer la vérification captcha.");
            } catch {
                await member.kick("Captcha non complété");
            }
        }
    }
};