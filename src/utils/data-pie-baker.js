export default function PieBaker(items, groupBy, sortAlgos, filterBy) {
  if (!items || !items.length) return [];
  const cache = {};
  let total = 0;
  items.filter(filterBy).forEach((item, i) => {
    if (!cache.hasOwnProperty(item[groupBy]))
      cache[item[groupBy]] = {
        id: item[groupBy],
        group: item[groupBy],
        label: item[groupBy],
        value: 0,
      };
    cache[item[groupBy]].value = cache[item[groupBy]].value + 1;
    total = total + 1;
  });
  return Object.values(cache)
    .map((wedge) => {
      wedge.id = `${wedge.id} (${
        Math.round((wedge.value / total) * 10000) / 100
      }%)`;
      return wedge;
    })
    .sort(sortAlgos[groupBy]);
}
