import wss from '../server';
import dataStorage from '../storage/dataStorage';

function notifyClient(id, data) {
  wss.clients.forEach((client) => {
    // eslint-disable-next-line no-underscore-dangle
    if (client._ultron.id === id) {
      client.send(JSON.stringify(data));
    }
  });
}

function sendRecommendedRepositoriesAndPeople(id, repos, people) {
  notifyClient(id, { type: 'EXPLORE_RECOMMENDATION', repos, people });
}

function sendLanguagesStatistics(id, percentages) {
  wss.clients.forEach((client) => {
    if (client._ultron.id === id) {
      client.send(JSON.stringify({ type: 'LANG_STATS', percentages }));
    }
  });
}

function sendSimilarityWithFriends(id) {
  const similarities = [];
  const similarFriends = dataStorage.getGithubUserSimilarityPercentage(id);
  const sorted = Object.keys(similarFriends).sort(
    (a, b) => similarFriends[b] - similarFriends[a]
  );
  for (let i = 0; i < (sorted.length > 5 ? 5 : sorted.length); i++) {
    const friend = dataStorage.getGithubUserFriendByUsername(id, sorted[i]);
    similarities.push({
      profileLink: friend.html_url,
      username: friend.login,
      avatar: friend.avatar_url
    });
  }
  wss.clients.forEach((client) => {
    if (client._ultron.id === id) {
      client.send(
        JSON.stringify({ type: 'SIMILAR_FRIENDS', friends: similarities })
      );
    }
  });
}

function sendInterestingRepositories(id) {
  const repositories = [];
  dataStorage.getGithubUserInterestingRepositories(id).forEach((repository) => {
    if (Object.keys(repository).length > 0) {
      repositories.push({
        owner: repository.owner.login,
        stars: repository.stargazers_count,
        forks: repository.forks_count,
        language: repository.language ? repository.language : 'No language',
        name: repository.name,
        link: repository.html_url
      });
    }
  });

  wss.clients.forEach((client) => {
    if (client._ultron.id === id) {
      client.send(
        JSON.stringify({ type: 'RECOMMENDED_REPOS', repos: repositories })
      );
    }
  });
}

function sendInterestingPeople(id, users) {
  const usersToSend = [];
  users.forEach((user) => {
    usersToSend.push({
      profileLink: user.html_url,
      username: user.login,
      avatar: user.avatar_url
    });
  });

  wss.clients.forEach((client) => {
    if (client._ultron.id === id) {
      client.send(
        JSON.stringify({ type: 'INTERESTING_PEOPLE', people: usersToSend })
      );
    }
  });
}

export default {
  sendLanguagesStatistics,
  sendSimilarityWithFriends,
  sendInterestingRepositories,
  sendInterestingPeople,
  sendRecommendedRepositoriesAndPeople
};
