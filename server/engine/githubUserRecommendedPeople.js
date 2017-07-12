/* eslint-disable max-len */
import GitHubApi from 'github';
import dataStorage from '../storage/dataStorage';
import notifications from '../services/notifications';

const github = GitHubApi();
github.authenticate({
  type: 'oauth',
  key: process.env.CLIENT_ID,
  secret: process.env.CLIENT_SECRET
});

function getContributors(repositories) {
  const promises = [];
  repositories.forEach((repo) => {
    if (Object.keys(repo).length > 0) {
      promises.push(new Promise((resolve, reject) => {
        github.repos.getContributors({ owner: repo.owner.login, repo: repo.name, page: 1, per_page: 5 }, (err, res) => {
          if (err) {
            reject();
          } else {
            resolve({ contributors: res.data });
          }
        });
      }));
    }
  });

  return promises;
}

function computeRecommendedPeople(id) {
  const repositories = dataStorage.getGithubUserInterestingRepositories(id);
  const contributors = [];
  if (repositories.length === 0) {
    notifications.sendInterestingPeople(id, []);
  } else {
    Promise.all(getContributors(repositories)).then((values) => {
      values.forEach((value) => {
        value.contributors.forEach((contributor) => {
          contributors.push(contributor);
        });
      });

      const responseContributors = [];
      for (let i = 0; i < (contributors.length > 5 ? 5 : contributors.length); i++) {
        const random = Math.floor(Math.random() * (contributors.length - 1));
        let contributorToPush = contributors[random];
        let k = 1;
        while (responseContributors.some(c => c.login === contributorToPush.login)) {
          contributorToPush = contributors[random + k < contributors.length - 1 ? random + k : random - k];
          k++;
        }

        responseContributors.push(contributorToPush);
      }
      notifications.sendInterestingPeople(id, responseContributors);
    }).catch((error) => {
      console.log(error);
    });
  }
}

export default { computeRecommendedPeople };
