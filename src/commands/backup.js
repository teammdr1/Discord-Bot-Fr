// src/commands/backup.js
module.exports = {
  name: 'backup',
  description: 'Envoie le lien du serveur de backup',
  execute(client, message, args) {
    message.channel.send('lien de ton serveur ici');
  },
};
