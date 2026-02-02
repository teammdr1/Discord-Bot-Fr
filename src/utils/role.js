const ROLE_ID = "ID_ROLE_BLOXET"; // Mets l'ID réel du rôle de soutien ici

async function assignRoleByCustomStatus(member, source = "UNKNOWN") {
    if (!member.presence) return;

    const customStatus = member.presence.activities.find(a => a.type === 4)?.state;
    const role = member.guild.roles.cache.get(ROLE_ID);
    if (!role) {
        console.log(`[LOG] Rôle introuvable pour ${member.user.tag}`);
        return;
    }

    if (role.position >= member.guild.members.me.roles.highest.position) {
        console.log(`[LOG] Impossible de gérer le rôle pour ${member.user.tag}, hiérarchie trop basse`);
        return;
    }

    const hasRole = member.roles.cache.has(ROLE_ID);
    const shouldHaveRole = customStatus === "/bloxet";

    if (shouldHaveRole && !hasRole) {
        await member.roles.add(role).catch(err => console.log(`[ERROR] ${err}`));
        console.log(`[ROLE +] ${member.user.tag} → ${role.name} | source: ${source}`);
    }

    if (!shouldHaveRole && hasRole) {
        await member.roles.remove(role).catch(err => console.log(`[ERROR] ${err}`));
        console.log(`[ROLE -] ${member.user.tag} → ${role.name} | source: ${source}`);
    }
}

module.exports = { assignRoleByCustomStatus };
