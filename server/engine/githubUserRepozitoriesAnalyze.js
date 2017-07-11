import GitHubApi from 'github';
import dataStorage from '../storage/dataStorage';

const github = GitHubApi();
github.authenticate({
  type: 'oauth',
  key: process.env.CLIENT_ID,
  secret: process.env.CLIENT_SECRET
});

function computeByStars(id) {
  const languages = dataStorage.getGithubUserLanguagesStatistic(id);
  const sorted = Object.keys(languages).sort((a, b) => languages[b] - languages[a]);

  for (let i = 0; i < 3; i++) {
    github.search.repos({
      q: 'language:'+sorted[i],
      sort: 'stars',
      order: 'desc',
      page: 1,
      per_page: 10 }, (err, res) => {
        console.log('l');
    });
  }
}

function computeInterestingRepositories(id) {
  computeByStars(id);
}

export default { computeInterestingRepositories };
