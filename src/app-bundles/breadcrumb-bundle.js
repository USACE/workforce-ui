import { createSelector } from 'redux-bundler';

// Inspired by: https://reduxbundler.com/#what-about-async-stuff
const breadcrumbBundle = {
  name: 'breadcrumb',
  selectBreadcrumb: createSelector(
    'selectGroupSelected',
    'selectOfficeActive',
    'selectOfficeItemsObject',
    (group, office, officeObj) => {
      if (!officeObj || !Object.keys(officeObj).length) {
        return [];
      }
      if (group) {
        const symbol = group.office_symbol.toLowerCase();
        return [
          { name: 'Home', href: '/' },
          {
            name: officeObj[group.office_symbol].name,
            href: `/offices/${symbol}`,
          },
          { name: group.name, href: null },
        ];
      }
      if (office) {
        return [
          { name: 'Home', href: '/' },
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
