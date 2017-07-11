/* eslint-disable max-len */
import GitHubApi from 'github';
import dataStorage from '../storage/dataStorage';
import notifications from '../services/notifications';
import euclideanNorm from '../engine/euclideanNorm';

const github = GitHubApi();
github.authenticate({
  type: 'oauth',
  key: process.env.CLIENT_ID,
  secret: process.env.CLIENT_SECRET
});

let interestingFriendsRepositories = [];
let finishedComputing = false;

function computeNormForRepositories(id, languagesToCompute, repos) {
  const promises = [];
  repos.forEach((repo) => {
    promises.push(new Promise((resolve, reject) => {
      github.repos.getLanguages({ owner: repo.owner.login, repo: repo.name }, (error, response) => {
        if (error) {
          reject();
        }
        const repoLanguages = response.data;
        let norm = 0;
        norm = euclideanNorm.computeNorm(repoLanguages, languagesToCompute);
        for (let i = 0; i < interestingFriendsRepositories.length; i++) {
          if (interestingFriendsRepositories[i].norm < norm) {
            if (i === interestingFriendsRepositories.length - 1 || interestingFriendsRepositories[i + 1].norm > norm) {
              for (let j = 0; j < i; j++) {
                interestingFriendsRepositories[j] = interestingFriendsRepositories[j + 1];
              }
              interestingFriendsRepositories[i] = {
                norm,
                repo
              };
            }
          }
        }
        resolve();
      });
    }));
  });
  return promises;
}

function computeNormForUsers(id, languagesToCompute, friends) {
  const promises = [];
  friends.forEach((follower) => {
    promises.push(new Promise((resolve, reject) => {
      github.repos.getForUser({ username: follower.login, per_page: 50 }, function getRepos(err, res) {
        if (err) {
          reject();
        }
        const repos = res.data;
        Promise.all(computeNormForRepositories(id, languagesToCompute, repos)).then(() => {
          if (github.hasNextPage(res)) {
            github.getNextPage(res, getRepos);
          } else {
            resolve();
          }
        });
      });
    }));
  });

  return promises;
}

function computeByFriends(id, number) {
  const languages = dataStorage.getGithubUserLanguagesStatistic(id);
  const sorted = Object.keys(languages).sort((a, b) => languages[b] - languages[a]);
  const languagesToCompute = {};
  for (let i = 0; i < (sorted.length > 3 ? 3 : sorted.length); i++) {
    languagesToCompute[sorted[i]] = languages[sorted[i]];
  }

  const followers = dataStorage.getGithubUserFollowers(id);
  const following = dataStorage.getGithubUserFollowing(id);

  interestingFriendsRepositories = [];
  finishedComputing = false;
  for (let i = 0; i < number; i++) {
    interestingFriendsRepositories.push({
      norm: 0,
      repo: {}
    });
  }

  Promise.all(computeNormForUsers(id, languagesToCompute, followers)).then(() => {
    if (finishedComputing) {
      console.log(interestingFriendsRepositories);
    } else {
      finishedComputing = true;
    }
  });
  Promise.all(computeNormForUsers(id, languagesToCompute, following)).then(() => {
    if (finishedComputing) {
      console.log(interestingFriendsRepositories);
    } else {
      finishedComputing = true;
    }
  });
}

function computeByStars(id, number) {
  const languages = dataStorage.getGithubUserLanguagesStatistic(id);
  const sorted = Object.keys(languages).sort((a, b) => languages[b] - languages[a]);

  for (let i = 0; i < number; i++) {
    github.search.repos({
      q: 'language:' + sorted[i],
      sort: 'stars',
      order: 'desc',
      page: 1,
      per_page: 10 }, (err, res) => {
      const random = Math.floor(Math.random() * (res.data.items.length - 1));
      dataStorage.addGithubUserInterestingRepositories(id, [res.data.items[random], random < res.data.items.length - 2 ? res.data.items[random + 1] : res.data.items[random - 1]]);
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
      page: i + 1,
      per_page: 10 }, (err, res) => {
      const random = Math.floor(Math.random() * (res.data.items.length - 1));
      dataStorage.addGithubUserInterestingRepositories(id, [res.data.items[random]]);
      if (dataStorage.getGithubUserInterestingRepositories(id).length === 10) {
        notifications.sendInterestingRepositories(id);
      }
    });
  }
}

function computeInterestingRepositories(id) {
  computeByStars(id, 3);
  computeRandom(id, 2);
  computeByFriends(id, 2);
}

export default { computeInterestingRepositories };
