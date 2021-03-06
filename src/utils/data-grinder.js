export default function Grinder(items, groupBy, splitBy, sortAlgos, filterBy) {
  if (!items || !items.length) return [];
  const cache = {};
  items.filter(filterBy).forEach((item, i) => {
    if (!cache.hasOwnProperty(item[groupBy]))
      cache[item[groupBy]] = { group: item[groupBy], total: 0 };
    cache[item[groupBy]].total = cache[item[groupBy]].total + 1;
    if (splitBy) {
      switch (splitBy) {
        case 'expertise':
          if (!cache[item[groupBy]].hasOwnProperty('Coastal')) {
            cache[item[groupBy]].Coastal = 0;
            cache[item[groupBy]].Hydraulics = 0;
            cache[item[groupBy]].Hydrology = 0;
            cache[item[groupBy]]['Water Management'] = 0;
            cache[item[groupBy]]['Water Quality'] = 0;
          }
          if (item.expertise_coastal) ++cache[item[groupBy]].Coastal;
          if (item.expertise_hydraulics) ++cache[item[groupBy]].Hydraulics;
          if (item.expertise_hydrology) ++cache[item[groupBy]].Hydrology;
          if (item.expertise_wm) ++cache[item[groupBy]]['Water Management'];
          if (item.expertise_wq) ++cache[item[groupBy]]['Water Quality'];
          break;
        case 'adv_degree_count':
          if (!cache[item[groupBy]].hasOwnProperty('No Advanced Degree')) {
            cache[item[groupBy]]['No Advanced Degree'] = 0;
            cache[item[groupBy]]['Masters'] = 0;
            cache[item[groupBy]]['PhD'] = 0;
          }
          if (item.adv_degree_count === 0)
            ++cache[item[groupBy]]['No Advanced Degree'];
          if (item.adv_degree_count === 1) ++cache[item[groupBy]]['Masters'];
          if (item.adv_degree_count === 2) ++cache[item[groupBy]]['PhD'];
          break;
        case 'prof_registration_count':
          if (!cache[item[groupBy]].hasOwnProperty('No Registration')) {
            cache[item[groupBy]]['No Registration'] = 0;
            cache[item[groupBy]]['Registered'] = 0;
          }
          if (item.prof_registration_count === 0)
            ++cache[item[groupBy]]['No Registration'];
          if (item.prof_registration_count === 1)
            ++cache[item[groupBy]]['Registered'];
          if (item.prof_registration_count === 2)
            ++cache[item[groupBy]]['Registered'];
          break;
        case 'vacant':
          if (!cache[item[groupBy]].hasOwnProperty('Vacant')) {
            cache[item[groupBy]].Vacant = 0;
            cache[item[groupBy]].Occupied = 0;
          }
          item.is_vacant
            ? ++cache[item[groupBy]].Vacant
            : ++cache[item[groupBy]].Occupied;
          break;
        case 'allocated':
          if (!cache[item[groupBy]].hasOwnProperty('Allocated')) {
            cache[item[groupBy]].Allocated = 0;
            cache[item[groupBy]]['Not Allocated'] = 0;
          }
          item.is_allocated
            ? ++cache[item[groupBy]].Allocated
            : ++cache[item[groupBy]]['Not Allocated'];
          break;
        case 'supervisor':
          if (!cache[item[groupBy]].hasOwnProperty('Supervisor')) {
            cache[item[groupBy]].Supervisor = 0;
            cache[item[groupBy]]['Not Supervisor'] = 0;
          }
          item.is_supervisor
            ? ++cache[item[groupBy]].Supervisor
            : ++cache[item[groupBy]]['Not Supervisor'];
          break;
        default:
          if (!cache[item[groupBy]].hasOwnProperty(item[splitBy]))
            cache[item[groupBy]][item[splitBy]] = 0;
          ++cache[item[groupBy]][item[splitBy]];
      }
    }
  });
  return Object.values(cache).sort(sortAlgos[groupBy]);
}
