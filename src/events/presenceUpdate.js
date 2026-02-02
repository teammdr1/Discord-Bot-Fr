const { assignRoleByCustomStatus } = require('../utils/roles');

module.exports = {
    name: 'presenceUpdate',
    execute: async (_, newPresence) => {
        if (!newPresence?.member) return;
        if (newPresence.member.user.bot) return;

        assignRoleByCustomStatus(newPresence.member, "presenceUpdate");
    }
};
