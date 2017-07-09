import GitHubApi from 'github';
import dataStorage from '../storage/dataStorage';

const github = GitHubApi();
const languageAnalyzeResult = {};

function addToLanguageAnalyzeResult(id, numberOfRepositories, data) {

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
