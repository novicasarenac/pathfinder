import GitHubApi from 'github';
import dataStorage from '../storage/dataStorage';

const github = GitHubApi();
github.authenticate({
  type: 'oauth',
  key: process.env.CLIENT_ID,
  secret: process.env.CLIENT_SECRET
});

const friendsStatistics = {};

function addToFriendsStatistics(id, numberOfRepositories, repoOwnerUsername, languages) {
  console.log('l');
}

function computeLanguageStatistics(id, numberOfRepositories, repository) {
  github.repos.getLanguages({ owner: repository.owner.login, repo: repository.name }, (err, res) => {
    addToFriendsStatistics(id, numberOfRepositories, repository.owner.login, res.data);
  });
}

function computeRepositoriesStatistics(id, username) {
  github.repos.getForUser({ username, per_page: 15 }, function getRepos(err, res) {
    res.data.forEach((repository) => {
      computeLanguageStatistics(id, res.data.length, repository);
    });

    if (github.hasNextPage(res)) {
      github.getNextPage(res, getRepos);
    }
  });
}

function computeSimilarityWithFollowers(id) {
  dataStorage.getGithubUserFollowers(id).forEach((follower) => {
    computeRepositoriesStatistics(id, follower.login);
  });
}

export default { computeSimilarityWithFollowers };
