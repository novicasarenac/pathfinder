const RESPONSE_REPOS_COUNT = 20;

export default function recommendRepositories(repositoriesPerArea) {
  // Sorted by ascending order.
  const sortedReposPerArea = repositoriesPerArea.map(repos =>
    repos.sort((first, second) => {
      // eslint-disable-next-line no-prototype-builtins
      if (first.hasOwnProperty('stars')) {
        return first.stars - second.stars;
      }

      return first.stargazers_count - second.stargazers_count;
    })
  );

  const responseRepos = [];
  const emptyAreas = new Set();
  let index = 0;

  while (
    responseRepos.length < RESPONSE_REPOS_COUNT &&
    emptyAreas.size < sortedReposPerArea.length
  ) {
    const currentAreaIndex = index % sortedReposPerArea.length;

    if (!emptyAreas.has(currentAreaIndex)) {
      const currentRepositories = sortedReposPerArea[currentAreaIndex];

      if (currentRepositories.length === 0) {
        emptyAreas.add(currentAreaIndex);
      } else {
        responseRepos.push(currentRepositories.pop());
      }
    }

    index += 1;
  }

  return responseRepos.map((repo) => {
    const name = repo.name;
    const owner = repo.author || repo.owner.login;
    const stars = repo.stars || repo.stargazers_count;
    const language = repo.language;

    return {
      name,
      owner,
      stars,
      language,
      link: `https://github.com/${owner}/${name}`
    };
  });
}
