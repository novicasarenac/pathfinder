function computeNorm(repoLanguages, userLanguages) {
  let sum = 0;
  Object.keys(userLanguages).forEach((key) => {
    if (repoLanguages.hasOwnProperty(key)) {
      sum += repoLanguages[key] * userLanguages[key];
    }
  });
  return Math.sqrt(sum);
}

export default { computeNorm };
