import GitHubApi from 'github';
import dataStorage from '../storage/dataStorage';
import notifications from '../services/notifications';

const github = GitHubApi();
github.authenticate({
  type: 'oauth',
  key: process.env.CLIENT_ID,
  secret: process.env.CLIENT_SECRET
});
const languageAnalyzeResult = {};

function computeAndNotify(id) {
  const percentages = {};
  const allPercentages = {};
  let sum = 0;
  Object.keys(languageAnalyzeResult[id].result).forEach((key) => {
    sum += languageAnalyzeResult[id].result[key];
  });

  Object.keys(languageAnalyzeResult[id].result).forEach((key) => {
    allPercentages[key] = languageAnalyzeResult[id].result[key] * 100 / sum; //eslint-disable-line
  });

  const sorted = Object.keys(allPercentages).sort((a, b) => allPercentages[b] - allPercentages[a]);

  for(var i = 0; i < (sorted.length > 9 ? 9 : sorted.length); i++) { //eslint-disable-line
    percentages[sorted[i]] = allPercentages[sorted[i]];
  }
  dataStorage.setGithubUserLanguagesStatistic(id, percentages);

  if (sorted.length > 9) {
    const percentagesSum = Object.keys(percentages).reduce((acc, b) => acc + percentages[b], 0);
    percentages['Other'] = 100 - percentagesSum;
  }

  console.log(percentages);
  notifications.sendLanguagesStatistics(id, percentages);
}

function addToLanguageAnalyzeResult(id, numberOfRepositories, data) {
  Object.keys(data).forEach((key) => {
    if (languageAnalyzeResult[id].result.hasOwnProperty(key)) { //eslint-disable-line
      languageAnalyzeResult[id].result[key] = languageAnalyzeResult[id].result[key] + data[key];  //eslint-disable-line
    } else {
      languageAnalyzeResult[id].result[key] = data[key];
    }
  });

  languageAnalyzeResult[id].analyzedNumber += 1;
  if (numberOfRepositories === languageAnalyzeResult[id].analyzedNumber) {
    computeAndNotify(id);
  }
}

function analyzeLanguages(id) {
  languageAnalyzeResult[id] = {
    analyzedNumber: 0,
    result: {}
  };

  const repositories = dataStorage.getGithubUserRepositories(id);

  repositories.forEach((repository) => {
    github.repos.getLanguages({ owner: repository.owner.login, repo: repository.name }, (err, res) => { //eslint-disable-line
      addToLanguageAnalyzeResult(id, repositories.length, res.data);
    });
  });
}

export default { analyzeLanguages };
