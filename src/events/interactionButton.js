module.exports = {
    name: "interactionCreate",
    async execute(interaction, client) {

        if (!interaction.isButton()) return;
        if (!interaction.guild) return;
        if (!interaction.member) return;

        try {
            if (interaction.customId === "enable_captcha") {
                client.captchaEnabled = true;

                if (!interaction.replied && !interaction.deferred) {
                    await interaction.reply({ content: "✅ Captcha activé", ephemeral: true });
                }
            }

            if (interaction.customId === "enable_antiraid") {
                client.antiraidEnabled = true;

                if (!interaction.replied && !interaction.deferred) {
                    await interaction.reply({ content: "🚨 AntiRaid activé", ephemeral: true });
                }
            }
        } catch (err) {
            console.log(`Erreur interaction bouton: ${err.message}`);
        }
    }
};