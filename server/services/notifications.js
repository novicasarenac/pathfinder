import wss from '../server';

function sendLanguagesStatistics(id, percentages) {
  wss.clients.forEach((client) => {
    if(client['_ultron'].id === id) {
      client.send(JSON.stringify({ type: 'LANG-STATS', percentages }));
    }
  });
}

export default { sendLanguagesStatistics };
