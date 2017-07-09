import wss from '../server';

function sendUser(id, user) {
  wss.clients.forEach((client) => {
    if (client['_ultron'].id === id) {
      client.send(JSON.stringify({ type: 'USER', user }));
    }
  });
}

function sendLanguagesStatistics(id, percentages) {
  wss.clients.forEach((client) => {
    if(client['_ultron'].id === id) {
      client.send(JSON.stringify({ type: 'LANG-STATS', percentages }));
    }
  });
}

export default { sendUser, sendLanguagesStatistics };
