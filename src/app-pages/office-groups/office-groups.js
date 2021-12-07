import React from 'react';
import { connect } from 'redux-bundler-react';
import Header from '../../app-components/header';
import PageHead from '../../app-components/header/page-head';
// import MyResponsiveBar from '../../app-components/charts/bar';
const OfficeSummary = connect(
  'selectOfficeItemsArray',
  ({ officeItemsArray: offices }) => {
    // const [show, setShow] = useState(false);
    // const [product, setProduct] = useState(false);
    // const [deliverables, setDeliverables] = useState(false);
    // const [profile, setProfile] = useState(false);

    const officeGroupsArray = [
      {
        id: 'c5fbbb80-3cb5-4407-a8b0-d5fd105714fc',
        office_id: '552e59f7-c0cc-4689-8a4d-e791c028430a',
        name: 'Water Resources',
        slug: 'water-resources',
      },
      {
        id: '8c44bda8-cbc7-4348-989d-e3eb2a0148c0',
        office_id: '2f160ba7-fd5f-4716-8ced-4a29f75065a6',
        name: 'Water Management',
        slug: 'water-management',
      },
    ];

    const OfficeGroupRow = (o, idx) => (
      <tr className="h-16 border border-gray-100 rounded">
        <td className="bg-gray-50">
          <div className="flex items-center pl-5">
            <p className="text-base font-medium leading-none text-gray-700 mr-2">
              {/* {JSON.stringify(o)} */}
              <a href={'/offices/' + o.slug}>
                {o.symbol} - {o.name}
              </a>
            </p>
          </div>
        </td>
      </tr>
    );

    return (
      <>
        <div className="absolute bg-gray-200 w-full h-full">
          <Header />

          {/* Page title starts */}
          <PageHead title="Office Sections/Group" />

          <div className="container mx-auto px-6">
            {/* Remove class [ h-64 ] when adding a card block */}
            {/* Remove class [ border-dashed border-2 border-gray-300 ] to remove dotted border */}
            <div className="w-full h-64 rounded border-dashed border-2 ">
              {/* Place your content here */}
              <div className="mt-7 overflow-x-auto">
                <table className="w-full whitespace-nowrap">
                  <tbody>
                    {officeGroupsArray &&
                      officeGroupsArray.map((o, idx) => OfficeGroupRow(o, idx))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
);

export default OfficeSummary;
