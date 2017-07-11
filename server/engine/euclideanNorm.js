function computeNorm(repoLanguages, userLanguages) {
  let sum = 0;
  let languageSum = 0;

  Object.keys(repoLanguages).forEach((key) => {
    languageSum += repoLanguages[key];
  });

  Object.keys(userLanguages).forEach((key) => {
    if (repoLanguages.hasOwnProperty(key)) {
      const value = repoLanguages[key] * 100 / languageSum;
      sum += Math.pow(value * userLanguages[key], 2);
    }
  });
  return Math.sqrt(sum);
}

export default { computeNorm };
