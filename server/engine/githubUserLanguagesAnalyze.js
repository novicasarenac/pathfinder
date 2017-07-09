import GitHubApi from 'github';
import dataStorage from '../storage/dataStorage';

const github = GitHubApi();
const languageAnalyzeResult = {};

function computeAndNotify(id) {
  const percentage = {};
  let sum = 0;
  Object.keys(languageAnalyzeResult[id].result).forEach((key) => {
    sum += languageAnalyzeResult[id].result[key];
  });

  Object.keys(languageAnalyzeResult[id].result).forEach((key) => {
    percentage[key] = languageAnalyzeResult[id].result[key] * 100 / sum;
  });

  console.log(percentage);
}

function addToLanguageAnalyzeResult(id, numberOfRepositories, data) {
  Object.keys(data).forEach((key) => {
    if (languageAnalyzeResult[id].result.hasOwnProperty(key)) {
      languageAnalyzeResult[id].result[key] = languageAnalyzeResult[id].result[key] + data[key];
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
    github.repos.getLanguages({ owner: repository.owner.login, repo: repository.name }, (err, res) => {
      addToLanguageAnalyzeResult(id, repositories.length, res.data);
    });
  });
}

export default { analyzeLanguages };
