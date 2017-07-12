import githubExplorer from 'gh-explore';
import GitHubApi from 'github';
import recommender from '../engine/explorerRecommender';
import notifications from './notifications';

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

function getTopContributors(repo) {
  return new Promise((resolve, reject) => {
    // Contributors list is infinite.
    if (repo.name === 'linux') {
      resolve(null);
    } else {
      github.repos.getContributors(
        {
          owner: repo.owner,
          repo: repo.name,
          page: 1,
          per_page: 10
        },
        (error, response) => {
          if (error) {
            reject(error);
          } else {
            resolve(response.data);
          }
        }
      );
    }
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
  const { id, areas } = request.body;
  const parsedRequest = parseRequest(areas);

  const promises = parsedRequest.showcases.map(showcase =>
    getRepositoriesFromShowcase(showcase)
  );

  if (parsedRequest.searchQuery) {
    promises.push(searchGithub(parsedRequest.searchQuery));
  }

  Promise.all(promises)
    .then((reposPerArea) => {
      const recommendedRepos = recommender.recommendRepositories(reposPerArea);

      const contributorPromises = recommendedRepos.map(repo =>
        getTopContributors(repo)
      );

      Promise.all(contributorPromises).then((contributorsPerRepo) => {
        const interestingPeople = recommender.recommendInterestingPeople(
          // Remove null or undefined.
          contributorsPerRepo.filter(c => c)
        );

        notifications.sendRecommendedRepositoriesAndPeople(
          id,
          recommendedRepos,
          interestingPeople
        );
      });
    })
    .catch(error => console.log(error));
}

export default handleExploreRequest;
