import GitHubApi from 'github';
import dataStorage from '../storage/dataStorage';

const github = GitHubApi();
github.authenticate({
  type: 'oauth',
  key: process.env.CLIENT_ID,
  secret: process.env.CLIENT_SECRET
});

function computeByStars(id, n) {
  const languages = dataStorage.getGithubUserLanguagesStatistic(id);
  const sorted = Object.keys(languages).sort((a, b) => languages[b] - languages[a]);

  for (let i = 0; i < n; i++) {
    github.search.repos({
      q: 'language:'+sorted[i],
      sort: 'stars',
      order: 'desc',
      page: 1,
      per_page: 10 }, (err, res) => {
        const random = Math.floor(Math.random() * (res.data.items.length-1));
        dataStorage.addGithubUserInterestingRepositories(id, [res.data.items[random], random < res.data.items.length-2 ? res.data.items[random+1] : res.data.items[random-1]]);
    });

    if(dataStorage.getGithubUserInterestingRepositories(id).length === 10) {
      //TODO notify
    }
  }
}

function computeInterestingRepositories(id) {
  computeByStars(id, 3);
}

export default { computeInterestingRepositories };
