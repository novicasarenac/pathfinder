/*eslint-disable*/
function computeSimilarity(statistic1, statistic2) {
  const sumCorrespodent = Object.keys(statistic1).reduce((acc, b) => statistic2.hasOwnProperty(b) ? acc + statistic1[b] * statistic2[b] : acc + 0, 0);
  const sqrtStatistic1 = Math.sqrt(Object.keys(statistic1).reduce((acc, b) => acc + statistic1[b] * statistic1[b], 0));
  const sqrtStatistic2 = Math.sqrt(Object.keys(statistic2).reduce((acc, b) => acc + statistic2[b] * statistic2[b], 0));

  return sumCorrespodent / (sqrtStatistic1 * sqrtStatistic2);
}
/*eslint-enable*/

export default { computeSimilarity };
