import { createSelector } from 'redux-bundler';

const apiURL = process.env.REACT_APP_WORKFORCE_API_URL;

const seriesMetrics = {
  name: 'seriesMetrics',
  reducer: (
    state = {
      error: null,
      isLoading: false,
      shouldFetch: false,
      fetchParams: { officeSymbol: null, groupSlug: null },
      data: null,
    },
    { type, payload }
  ) => {
    switch (type) {
      case 'SERIESMETRICS_SHOULD_FETCH':
      case 'SERIESMETRICS_FETCH_STARTED':
      case 'SERIESMETRICS_FETCH_FINISHED':
      case 'SERIESMETRICS_FETCH_ERROR':
        return { ...state, ...payload };
      default:
        return state;
    }
  },
  doSeriesMetricsShouldFetch:
    () =>
    ({ dispatch, store }) => {
      dispatch({
        type: 'SERIESMETRICS_SHOULD_FETCH',
        payload: { shouldFetch: true },
      });
    },
  doSeriesMetricsFetch:
    () =>
    ({ dispatch, store }) => {
      dispatch({
        type: 'SERIESMETRICS_FETCH_STARTED',
        payload: {
          isLoading: true,
          shouldFetch: false,
        },
      });
      const office = store.selectOfficeActive();
      const group = store.selectGroupSelected();

      let url = `${apiURL}/metrics/series`;
      if (office) {
        url += `?office=${office.symbol}`;
        if (group) {
          url += `&group=${group.slug}`;
        }
      }
      fetch(url)
        .then((resp) => resp.json())
        .then((j) => {
          dispatch({
            type: 'SERIESMETRICS_FETCH_FINISHED',
            payload: {
              data: j,
              isLoading: false,
              fetchParams: {
                officeSymbol: office ? office.symbol : null,
                groupSlug: group ? group.slug : null,
              },
            },
          });
        })
        .catch((err) => {
          dispatch({
            type: 'SERIESMETRICS_FETCH_ERROR',
            payload: { error: err },
          });
        });
    },
  selectSeriesMetricsRaw: (state) => state.seriesMetrics,
  selectSeriesMetricsIsLoading: (state) => state.seriesMetrics.isLoading,
  selectSeriesMetricsData: (state) => state.seriesMetrics.data,
  selectSeriesMetricsTotals: createSelector(
    'selectSeriesMetricsData',
    (data) => {
      let totals = { positions: 0, employees: 0, vacancies: 0 };
      if (!data || !data.length) {
        return totals;
      }
      data.forEach((item) => {
        totals.positions += item.allocated;
        totals.employees += item.employees;
      });
      totals.vacancies = totals.positions - totals.employees;
      return totals;
    }
  ),
  // selectSeriesMetricsBulletInfo formats data for Nivo Bullet Chart component for visualization
  selectSeriesMetricsBulletInfo: createSelector(
    'selectSeriesMetricsData',
    (data) => {
      return {
        maxValue: data ? data.reduce((a, b) => Math.max(a, b.target), 0) : 0,
        data: !data
          ? []
          : data.map((d) => ({
              id: d.occupation_code,
              title: `${d.occupation_name} - ${d.occupation_code}`,
              ranges: [d.allocated],
              measures: [d.employees],
              markers: [d.target],
            })),
      };
    }
  ),
  selectSeriesMetricsFetchParams: (state) => state.seriesMetrics.fetchParams,
  reactSeriesMetricsShouldFetch: createSelector(
    'selectSeriesMetricsRaw',
    'selectOfficeActive',
    'selectGroupSelected',
    (raw, office, group) => {
      if (raw.isLoading || raw.shouldFetch) {
        return false;
      }
      if (
        !raw.data ||
        // office is selected; not equal to last fetched office
        (office && office.symbol !== raw.fetchParams.officeSymbol) ||
        // office is not selected; last fetch was for an office
        (!office && raw.fetchParams.officeSymbol) ||
        // group is selected; not equal to last fetched group
        (group && group.slug !== raw.fetchParams.groupSlug) ||
        // group is not selected; last fetch was group-specific
        (!group && raw.fetchParams.groupSlug)
      ) {
        return {
          actionCreator: 'doSeriesMetricsShouldFetch',
        };
      }
    }
  ),
  reactSeriesMetricsFetch: createSelector('selectSeriesMetricsRaw', (raw) => {
    if (raw.isLoading || !raw.shouldFetch) {
      return false;
    }
    return { actionCreator: 'doSeriesMetricsFetch' };
  }),
};

export default seriesMetrics;
