import GitHubApi from 'github';
import dataStorage from '../storage/dataStorage';
import notifications from '../services/notifications';

const github = GitHubApi();
github.authenticate({
  type: 'oauth',
  key: process.env.CLIENT_ID,
  secret: process.env.CLIENT_SECRET
});

const bestByFriends = [];

function computeByFriends(id, number) {
  const languages = dataStorage.getGithubUserLanguagesStatistic(id);
  const sorted = Object.keys(languages).sort((a, b) => languages[b] - languages[a]);
  const followers = dataStorage.getGithubUserFollowers(id);
  const following = dataStorage.getGithubUserFollowing(id);

  bestByFriends[id] = {};
  for(let i = 0; i < number; i++) {
    bestByFriends[i] = {
      norm: 0,
      repo: {}
    };
  }

  followers.forEach((follower) => {
    github.repos.getForUser({username: follower.login, per_page: 50 },(err, res) => {
      const repos = res.data;

      repos.forEach((repo) => {
        github.repos.getLanguages({ owner: repo.owner.login, repo: repo.name }, (err, res) => {
          const repoLanguages = res.data;
          const norm = 0; //TODO euclidean norm
          for (let i = 0; i < bestByFriends.length; i++) {
            if (bestByFriends[i].norm < norm) {
              bestByFriends[i] = {
                norm,
                repo
              };
            }
          }
        })
      });
    });
  })

}

function computeByStars(id, number) {
  const languages = dataStorage.getGithubUserLanguagesStatistic(id);
  const sorted = Object.keys(languages).sort((a, b) => languages[b] - languages[a]);

  for (let i = 0; i < number; i++) {
    github.search.repos({
      q: 'language:'+sorted[i],
      sort: 'stars',
      order: 'desc',
      page: 1,
      per_page: 10 }, (err, res) => {
      const random = Math.floor(Math.random() * (res.data.items.length-1));
      dataStorage.addGithubUserInterestingRepositories(id, [res.data.items[random], random < res.data.items.length-2 ? res.data.items[random+1] : res.data.items[random-1]]);
      if (dataStorage.getGithubUserInterestingRepositories(id).length === 10) {
        notifications.sendInterestingRepositories(id);
      }
    });
  }
}

function computeRandom(id, number) {
  for (let i = 0; i < number; i++) {
    github.search.repos({
      q: 'size:>1',
      sort: 'stars',
      order: 'desc',
      page: i+1,
      per_page: 10 }, (err, res) => {
      const random = Math.floor(Math.random() * (res.data.items.length-1));
      dataStorage.addGithubUserInterestingRepositories(id, [res.data.items[random]]);
      if (dataStorage.getGithubUserInterestingRepositories(id).length === 10) {
        notifications.sendInterestingRepositories(id);
      }
    });
  }
}

function computeInterestingRepositories(id) {
  computeByStars(id, 3);
  computeRandom(id, 4);
}

export default { computeInterestingRepositories };
