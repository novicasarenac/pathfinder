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
        }).catch((e) => {
          console.log(e);
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
      const interestingArray = [];
      interestingFriendsRepositories.forEach((repo) => {
        interestingArray.push(repo.repo);
      });
      dataStorage.addGithubUserInterestingRepositories(id, interestingArray);
      if (dataStorage.getGithubUserInterestingRepositories(id).length === 10) {
        notifications.sendInterestingRepositories(id);
      }
    } else {
      finishedComputing = true;
    }
  }).catch((err) => {
    console.log(err);
  });
  Promise.all(computeNormForUsers(id, languagesToCompute, following)).then(() => {
    if (finishedComputing) {
      const interestingArray = [];
      interestingFriendsRepositories.forEach((repo) => {
        interestingArray.push(repo.repo);
      });
      dataStorage.addGithubUserInterestingRepositories(id, interestingArray);
      if (dataStorage.getGithubUserInterestingRepositories(id).length === 10) {
        notifications.sendInterestingRepositories(id);
      }
    } else {
      finishedComputing = true;
    }
  }).catch((err) => {
    console.log(err);
  });
}

function computeByStars(id, number) {
  const languages = dataStorage.getGithubUserLanguagesStatistic(id);
  const sorted = Object.keys(languages).sort((a, b) => languages[b] - languages[a]);

  for (let i = 0; i < number / 2; i++) {
    github.search.repos({
      q: 'language:' + sorted[i],
      sort: 'stars',
      order: 'desc',
      page: 1,
      per_page: 10 }, (err, res) => {
      if (err) {
        console.log(err);
      }
      const random = Math.floor(Math.random() * (res.data.items.length - 1));
      dataStorage.addGithubUserInterestingRepositories(id, [res.data.items[random], random < res.data.items.length - 2 ? res.data.items[random + 1] : res.data.items[random - 1]]);
      if (dataStorage.getGithubUserInterestingRepositories(id).length === 10) {
        notifications.sendInterestingRepositories(id);
      }
    });
  }
}

function computeInterestingRepositories(id) {
  if (Object.keys(dataStorage.getGithubUserLanguagesStatistic(id)).length === 0) {
    if (dataStorage.getGithubUserFollowing(id).length === 0 && dataStorage.getGithubUserFollowers(id) === 0) {
      notifications.sendInterestingRepositories(id);
    } else {
      computeByFriends(id, 10);
    }
  } else {
    if (dataStorage.getGithubUserFollowing(id).length === 0 && dataStorage.getGithubUserFollowers(id) === 0) {
      if (Object.keys(dataStorage.getGithubUserLanguagesStatistic(id)).length < 5) {
        notifications.sendInterestingRepositories(id);
      } else {
        computeByStars(id, 10);
      }
    } else {
      if (Object.keys(dataStorage.getGithubUserLanguagesStatistic(id)).length < 3) {
        computeByFriends(id, 10);
      } else {
        computeByStars(id, 6);
        computeByFriends(id, 4);
      }
    }
  }
}

export default { computeInterestingRepositories };
