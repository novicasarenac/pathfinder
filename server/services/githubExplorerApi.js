import githubExplorer from 'gh-explore';
import GitHubApi from 'github';
import recommendRepositories from '../engine/explorerRecommender';

const github = GitHubApi();

github.authenticate({
  type: 'oauth',
  key: process.env.CLIENT_ID,
  secret: process.env.CLIENT_SECRET
});

function searchGithub(query) {
  return new Promise((resolve, reject) => {
    github.search.repos(
      {
        q: query,
        sort: 'stars',
        order: 'desc'
      },
      (error, response) => {
        if (error) {
          reject(error);
        } else {
          resolve(response.data.items);
        }
      }
    );
  });
}

function getRepositoriesFromShowcase(showcase) {
  return new Promise((resolve, reject) => {
    githubExplorer.showcases.get({ showcase }, (error, response) => {
      if (error) {
        reject(error);
      } else {
        resolve(response.repositories);
      }
    });
  });
}

function parseRequest(areas) {
  const parsedBody = {
    showcases: null,
    searchQuery: null
  };

  if (areas.includes('Mobile Development')) {
    parsedBody.searchQuery = 'topic:ios+topic:android+topic:mobile';

    // Remove 'Mobile Development' from array
    const index = areas.indexOf('Mobile Development');
    areas.splice(index, 1);
  }

  parsedBody.showcases = areas.map((area) => {
    switch (area) {
      case 'Back-end Web Development':
        return 'web-application-frameworks';

      case 'Front-end Web Development':
        return 'front-end-javascript-frameworks';

      case 'DevOps':
        return 'devops-tools';

      case 'Game Development':
        return 'game-engines';

      case 'Operating Systems':
        return 'open-source-operating-systems';

      case 'Virtual Reality':
      case 'Programming Languages':
      case 'Machine Learning':
      case 'Security':
        return area.toLowerCase().replace(' ', '-');

      default:
        throw new Error('Unsupported explore showchase');
    }
  });

  return parsedBody;
}

function handleExploreRequest(request) {
  const parsedRequest = parseRequest(request.body.areas);

  const promises = parsedRequest.showcases.map(showcase =>
    getRepositoriesFromShowcase(showcase)
  );

  if (parsedRequest.searchQuery) {
    promises.push(searchGithub(parsedRequest.searchQuery));
  }

  Promise.all(promises)
    .then((reposPerArea) => {
      const recommendedRepos = recommendRepositories(reposPerArea);
    })
    .catch(error => console.log(error));
}

export default handleExploreRequest;
