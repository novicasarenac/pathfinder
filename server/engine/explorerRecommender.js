const ITEMS_PER_RESPONSE = 20;

function recommend(sortedGroups) {
  const response = [];
  const emptyGroups = new Set();
  let index = 0;

  while (
    response.length < ITEMS_PER_RESPONSE &&
    emptyGroups.size < sortedGroups.length
  ) {
    const currentGroupIndex = index % sortedGroups.length;

    if (!emptyGroups.has(currentGroupIndex)) {
      const currentGroup = sortedGroups[currentGroupIndex];

      if (currentGroup.length === 0) {
        emptyGroups.add(currentGroupIndex);
      } else {
        response.push(currentGroup.pop());
      }
    }

    index += 1;
  }

  return response;
}

function recommendRepositories(repositoriesPerArea) {
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

  const responseRepos = recommend(sortedReposPerArea);

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

function recommendInterestingPeople(contributorPerRepo) {
  const sortedContributors = contributorPerRepo.map(contributors =>
    contributors.sort(
      (first, second) => first.contributions - second.contributions
    )
  );

  const responseContributors = recommend(sortedContributors);

  return responseContributors.map(contributor => ({
    username: contributor.login,
    avatar: contributor.avatar_url,
    profileLink: contributor.html_url
  }));
}

export default {
  recommendInterestingPeople,
  recommendRepositories
};
