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

    // const officesArray = [
    //   {
    //     id: '91cf44dc-6384-4622-bd9f-0f36e4343413',
    //     name: 'Great Lakes and Ohio River Division',
    //     symbol: 'LRD',
    //     parent_id: null,
    //   },
    //   {
    //     id: '17fa25b8-44a0-4e6d-9679-bdf6b0ee6b1a',
    //     name: 'Buffalo District',
    //     symbol: 'LRB',
    //     parent_id: '91cf44dc-6384-4622-bd9f-0f36e4343413',
    //   },
    //   {
    //     id: 'd8f8934d-e414-499d-bd51-bc93bbde6345',
    //     name: 'Chicago District',
    //     symbol: 'LRC',
    //     parent_id: '91cf44dc-6384-4622-bd9f-0f36e4343413',
    //   },
    //   {
    //     id: 'a8192ad1-206c-4da6-b19e-b7ba7a67aa1f',
    //     name: 'Detroit District',
    //     symbol: 'LRE',
    //     parent_id: '91cf44dc-6384-4622-bd9f-0f36e4343413',
    //   },
    //   {
    //     id: '2f160ba7-fd5f-4716-8ced-4a29f75065a6',
    //     name: 'Huntington District',
    //     symbol: 'LRH',
    //     parent_id: '91cf44dc-6384-4622-bd9f-0f36e4343413',
    //   },
    //   {
    //     id: '433a554d-7b27-4046-89eb-906788eb4046',
    //     name: 'Louisville District',
    //     symbol: 'LRL',
    //     parent_id: '91cf44dc-6384-4622-bd9f-0f36e4343413',
    //   },
    //   {
    //     id: '552e59f7-c0cc-4689-8a4d-e791c028430a',
    //     name: 'Nashville District',
    //     symbol: 'LRN',
    //     parent_id: '91cf44dc-6384-4622-bd9f-0f36e4343413',
    //   },
    //   {
    //     id: '61291eaf-d62f-4846-ad95-87cc86b56851',
    //     name: 'Pittsburgh District',
    //     symbol: 'LRP',
    //     parent_id: '91cf44dc-6384-4622-bd9f-0f36e4343413',
    //   },
    //   {
    //     id: '485d800d-a30d-4fcb-af43-0bea2ce11adb',
    //     name: 'Mississippi Valley Division',
    //     symbol: 'MVD',
    //     parent_id: null,
    //   },
    //   {
    //     id: '1245e3c0-fc72-4621-86b2-24ff7de21f88',
    //     name: 'Memphis District',
    //     symbol: 'MVM',
    //     parent_id: '485d800d-a30d-4fcb-af43-0bea2ce11adb',
    //   },
    // ];

    const OfficeRow = (o, idx) => (
      <tr className="h-16 border border-gray-100 rounded">
        <td className="bg-gray-50">
          <div className="flex items-center pl-5">
            <p className="text-base font-medium leading-none text-gray-700 mr-2">
              {/* {JSON.stringify(o)} */}
              <a href={'/offices/' + o.symbol.toLowerCase()}>
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
          <PageHead title="Offices" />

          <div className="container mx-auto px-6">
            {/* Remove class [ h-64 ] when adding a card block */}
            {/* Remove class [ border-dashed border-2 border-gray-300 ] to remove dotted border */}
            <div className="w-full h-64 rounded border-dashed border-2 ">
              {/* Place your content here */}
              <div className="mt-7 overflow-x-auto">
                <table className="w-full whitespace-nowrap">
                  <tbody>
                    {offices &&
                      offices
                        .filter((office) => office.symbol != null)
                        .map((o, idx) => OfficeRow(o, idx))}
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
