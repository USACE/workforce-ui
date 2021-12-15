import { createSelector } from 'redux-bundler';

// Inspired by: https://reduxbundler.com/#what-about-async-stuff
const breadcrumbBundle = {
  name: 'breadcrumb',
  selectBreadcrumb: createSelector(
    'selectGroupSelected',
    'selectOfficeActive',
    'selectOfficeItemsObject',
    'selectQueryString',
    (group, office, officeObj, queryString) => {
      const qs = queryString && '?' + queryString;

      if (!officeObj || !Object.keys(officeObj).length) {
        return [];
      }
      if (group) {
        const symbol = group.office_symbol.toLowerCase();
        return [
          { name: 'Home', href: `/${qs}` },
          {
            name: officeObj[group.office_symbol].name,
            href: `/offices/${symbol}${qs}`,
          },
          { name: group.name, href: null },
        ];
      }
      if (office) {
        return [
          { name: 'Home', href: `/${qs}` },
          {
            name: office.name,
            href: null,
          },
        ];
      }
      return [];
    }
  ),
};

export default breadcrumbBundle;
