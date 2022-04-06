import { createSelector } from 'redux-bundler';
import grinder from '../utils/data-grinder';
import pieBaker from '../utils/data-pie-baker';

const apiUrl = process.env.REACT_APP_WORKFORCE_API_URL;
const statsBundle = {
  name: 'stats',

  getReducer: () => {
    const initialData = {
      _shouldFetch: true,
      items: [],
      filter_office_symbol: '',
      filter_parent_office_symbol: '',
      groupBy: 'office_symbol',
      splitBy: '',
      uniqueValues: null,
    };

    return (state = initialData, { type, payload }) => {
      switch (type) {
        case 'STATS_FETCH_STARTED':
        case 'STATS_FETCH_FINISHED':
        case 'STATS_UPDATE':
          return { ...state, ...payload };
        default:
          return state;
      }
    };
  },

  doStatsFetch:
    () =>
    ({ dispatch }) => {
      dispatch({
        type: 'STATS_FETCH_STARTED',
        payload: {
          _shouldFetch: false,
        },
      });
      const url = `${apiUrl}/report/json`;
      fetch(url)
        .then((response) => response.json())
        .then((data) => {
          dispatch({
            type: 'STATS_FETCH_FINISHED',
            payload: {
              items: data,
            },
          });
        })
        .catch((err) => {
          console.log(err);
        });
    },

  doStatsSetFilterOfficeSymbol:
    (office_symbol) =>
    ({ dispatch }) => {
      dispatch({
        type: 'STATS_UPDATE',
        payload: {
          filter_office_symbol: office_symbol,
        },
      });
    },

  doStatsSetFilterParentOfficeSymbol:
    (parent_office_symbol) =>
    ({ dispatch }) => {
      dispatch({
        type: 'STATS_UPDATE',
        payload: {
          filter_parent_office_symbol: parent_office_symbol,
        },
      });
    },

  doStatsSetSplitBy:
    (splitBy) =>
    ({ dispatch }) => {
      dispatch({
        type: 'STATS_UPDATE',
        payload: {
          splitBy,
        },
      });
    },

  doStatsSetGroupBy:
    (groupBy) =>
    ({ dispatch }) => {
      dispatch({
        type: 'STATS_UPDATE',
        payload: {
          groupBy,
        },
      });
    },

  selectStatsItems: (state) => {
    return state.stats.items;
  },

  selectStatsGroupSortAlgos: () => {
    // this is a mess, but don't know a better way to handle
    // stupid ordinal labels...
    const age_range_sort = {
      'not available': 0,
      'Under 25': 1,
      '25-35': 2,
      '35-45': 3,
      '45-55': 4,
      'Over 55': 5,
    };
    const pay_plan_grade_sort = {
      'DB-1': 0,
      'DB-2': 1,
      'DB-3': 2,
      'DB-4': 3,
      'DB-5': 4,
      'DB-6': 5,
      'DE-1': 6,
      'DE-2': 7,
      'DE-3': 8,
      'DE-4': 9,
      'DE-5': 10,
      'DE-6': 11,
      'DJ-1': 12,
      'DJ-2': 13,
      'DJ-3': 14,
      'DJ-4': 15,
      'DJ-5': 16,
      'DJ-6': 17,
      'DK-1': 18,
      'DK-2': 19,
      'DK-3': 20,
      'DK-4': 21,
      'DK-5': 22,
      'DK-6': 23,
      'GS-3': 24,
      'GS-5': 25,
      'GS-6': 26,
      'GS-7': 27,
      'GS-9': 28,
      'GS-10': 29,
      'GS-11': 30,
      'GS-12': 31,
      'GS-13': 32,
      'GS-14': 33,
      'GS-15': 34,
      'SES-1': 35,
      'SES-2': 36,
      'SES-3': 37,
      'SES-4': 38,
      'SES-5': 39,
      'SES-6': 40,
    };
    const service_range_sort = {
      'not available': 0,
      'Less than 5 years': 1,
      '5-10 years': 2,
      '10-15 years': 3,
      '15-20 years': 4,
      '20-30 years': 5,
      'Over 30 years': 6,
    };
    return {
      age_range: (a, b) => {
        if (age_range_sort[a.group] > age_range_sort[b.group]) return 1;
        if (age_range_sort[a.group] < age_range_sort[b.group]) return -1;
        return 0;
      },
      group_name: (a, b) => {
        if (a.group > b.group) return 1;
        if (a.group < b.group) return -1;
        return 0;
      },
      occupation_code: (a, b) => {
        if (a.group > b.group) return 1;
        if (a.group < b.group) return -1;
        return 0;
      },
      occupation_name: (a, b) => {
        if (a.group > b.group) return 1;
        if (a.group < b.group) return -1;
        return 0;
      },
      office_symbol: (a, b) => {
        if (a.group > b.group) return 1;
        if (a.group < b.group) return -1;
        return 0;
      },
      parent_office_symbol: (a, b) => {
        if (a.group > b.group) return 1;
        if (a.group < b.group) return -1;
        return 0;
      },
      pay_plan_grade: (a, b) => {
        if (pay_plan_grade_sort[a.group] > pay_plan_grade_sort[b.group])
          return 1;
        if (pay_plan_grade_sort[a.group] < pay_plan_grade_sort[b.group])
          return -1;
        return 0;
      },
      service_range: (a, b) => {
        if (service_range_sort[a.group] > service_range_sort[b.group]) return 1;
        if (service_range_sort[a.group] < service_range_sort[b.group])
          return -1;
        return 0;
      },
      title: (a, b) => {
        if (a.group > b.group) return 1;
        if (a.group < b.group) return -1;
        return 0;
      },
      expertise: (a, b) => {
        if (a.group > b.group) return 1;
        if (a.group < b.group) return -1;
        return 0;
      },
      adv_degree_count: (a, b) => {
        if (a.group > b.group) return 1;
        if (a.group < b.group) return -1;
        return 0;
      },
      certification_count: (a, b) => {
        if (a.group > b.group) return 1;
        if (a.group < b.group) return -1;
        return 0;
      },
      prof_registration_count: (a, b) => {
        if (a.group > b.group) return 1;
        if (a.group < b.group) return -1;
        return 0;
      },
      vacant: (a, b) => {
        if (a.group > b.group) return 1;
        if (a.group < b.group) return -1;
        return 0;
      },
      allocated: (a, b) => {
        if (a.group > b.group) return 1;
        if (a.group < b.group) return -1;
        return 0;
      },
      supervisor: (a, b) => {
        if (a.group > b.group) return 1;
        if (a.group < b.group) return -1;
        return 0;
      },
    };
  },

  selectStatsGroupByFields: () => {
    return {
      age_range: 'Age Range',
      group_name: 'Group Name',
      occupation_code: 'Occupation Code',
      occupation_name: 'Occupation',
      office_symbol: 'Office Symbol',
      parent_office_symbol: 'Parent Office Symbol',
      pay_plan_grade: 'Pay Grade',
      service_range: 'Time in Service',
      title: 'Job Title',
    };
  },

  selectStatsSplitByFields: () => {
    return {
      age_range: 'Age Range',
      group_name: 'Group Name',
      occupation_code: 'Occupation Code',
      occupation_name: 'Occupation',
      office_symbol: 'Office Symbol',
      parent_office_symbol: 'Parent Office Symbol',
      pay_plan_grade: 'Pay Grade',
      service_range: 'Time in Service',
      title: 'Job Title',

      expertise: 'Expertise',
      adv_degree_count: 'Advanced Degree Count',
      certification_count: 'Certification Count',
      prof_registration_count: 'Professional Registration Count',
      vacant: 'Occupied/Vacant',
      allocated: 'Allocated',
      supervisor: 'Supervisor',
    };
  },

  selectStatsGroupBy: (state) => {
    return state.stats.groupBy;
  },

  selectStatsSplitBy: (state) => {
    return state.stats.splitBy;
  },

  selectStatsUniqueValues: (state) => {
    return state.stats.uniqueValues;
  },

  selectStatsKeys: createSelector(
    'selectStatsChartData',
    'selectStatsSplitBy',
    (chartData, splitBy) => {
      switch (splitBy) {
        case '':
          return ['total'];
        case 'expertise':
          return [
            'Coastal',
            'Hydraulics',
            'Hydrology',
            'Water Management',
            'Water Quality',
          ];
        case 'vacant':
          return ['Vacant', 'Occupied'];
        case 'allocated':
          return ['Allocated', 'Not Allocated'];
        case 'supervisor':
          return ['Supervisor', 'Not Supervisor'];
        default:
          const uniqueValues = [];
          chartData.forEach((d) => {
            Object.keys(d).forEach((key) => {
              if (uniqueValues.indexOf(key) === -1) uniqueValues.push(key);
            });
          });
          return uniqueValues
            .filter((key) => {
              if (key !== 'group' && key !== 'total') return true;
              return false;
            })
            .sort();
      }
    }
  ),

  selectStatsChartData: createSelector(
    'selectStatsItems',
    'selectStatsGroupBy',
    'selectStatsSplitBy',
    'selectStatsGroupSortAlgos',
    'selectStatsFilter',
    (items, groupBy, splitBy, sortAlgos, filterBy) => {
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
  ),

  selectStatsFilterOfficeSymbol: (state) => {
    return state.stats.filter_office_symbol;
  },

  selectStatsFilterParentOfficeSymbol: (state) => {
    return state.stats.filter_parent_office_symbol;
  },

  selectStatsFilter: createSelector(
    'selectStatsFilterOfficeSymbol',
    'selectStatsFilterParentOfficeSymbol',
    (office_symbol, parent_office_symbol) => {
      return (d) => {
        if (!office_symbol && !parent_office_symbol) return true;
        let match = false;
        if (
          parent_office_symbol &&
          parent_office_symbol === d.parent_office_symbol
        )
          match = true;
        if (office_symbol) {
          if (office_symbol === d.office_symbol) {
            match = true;
          } else {
            match = false;
          }
        }

        return match;
      };
    }
  ),

  selectStatsChart1: createSelector(
    'selectStatsItems',
    'selectStatsGroupSortAlgos',
    (items, sortAlgos) => {
      return grinder(items, 'parent_office_symbol', '', sortAlgos, () => true);
    }
  ),

  selectStatsChart2: createSelector(
    'selectStatsItems',
    'selectStatsGroupSortAlgos',
    (items, sortAlgos) => {
      return pieBaker(items, 'age_range', sortAlgos, () => true);
    }
  ),

  selectStatsChart3: createSelector(
    'selectStatsItems',
    'selectStatsGroupSortAlgos',
    (items, sortAlgos) => {
      return pieBaker(items, 'service_range', sortAlgos, () => true);
    }
  ),

  selectStatsChart4: createSelector(
    'selectStatsItems',
    'selectStatsGroupSortAlgos',
    (items, sortAlgos) => {
      return pieBaker(items, 'pay_plan_grade', sortAlgos, () => true);
    }
  ),

  selectStatsChart5: createSelector(
    'selectStatsItems',
    'selectStatsGroupSortAlgos',
    (items, sortAlgos) => {
      return grinder(
        items,
        'parent_office_symbol',
        'expertise',
        sortAlgos,
        () => true
      );
    }
  ),

  selectStatsChart6: createSelector(
    'selectStatsItems',
    'selectStatsGroupSortAlgos',
    (items, sortAlgos) => {
      return grinder(
        items,
        'parent_office_symbol',
        'prof_registration_count',
        sortAlgos,
        () => true
      );
    }
  ),

  selectStatsChart7: createSelector(
    'selectStatsItems',
    'selectStatsGroupSortAlgos',
    (items, sortAlgos) => {
      return grinder(
        items,
        'parent_office_symbol',
        'vacant',
        sortAlgos,
        () => true
      );
    }
  ),

  selectStatsChart8: createSelector(
    'selectStatsItems',
    'selectStatsGroupSortAlgos',
    (items, sortAlgos) => {
      return grinder(
        items,
        'parent_office_symbol',
        'adv_degree_count',
        sortAlgos,
        () => true
      );
    }
  ),

  reactStatsShouldFetch: (state) => {
    if (state.stats._shouldFetch) return { actionCreator: 'doStatsFetch' };
  },
};

export default statsBundle;
