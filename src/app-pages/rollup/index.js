import Chart1 from './chart-1';
import Chart2 from './chart-2';
import Chart3 from './chart-3';
import Chart4 from './chart-4';
import Chart5 from './chart-5';
import Chart6 from './chart-6';
import Chart7 from './chart-7';
import Chart8 from './chart-8';
import Wrapper from '../../app-components/wrapper';
import CustomDot from './custom-dot';
import CustomKeyUpHandler from './custom-keyup-handler';
import {
  CarouselProvider,
  Slider,
  Slide,
  ButtonBack,
  ButtonNext,
} from 'pure-react-carousel';
import 'pure-react-carousel/dist/react-carousel.es.css';
import CustomDownloadChartButton from './custom-download-chart-button';
const apiUrl = process.env.REACT_APP_WORKFORCE_API_URL;

function Carosel() {
  return (
    <Wrapper title={'Workforce Rollup'}>
      <CarouselProvider
        naturalSlideWidth={100}
        naturalSlideHeight={66}
        totalSlides={8}
      >
        <CustomKeyUpHandler />
        <Slider>
          <Slide index={0}>
            <Chart1 />
          </Slide>
          <Slide index={1}>
            <Chart2 />
          </Slide>
          <Slide index={2}>
            <Chart3 />
          </Slide>
          <Slide index={3}>
            <Chart4 />
          </Slide>
          <Slide index={4}>
            <Chart5 />
          </Slide>
          <Slide index={5}>
            <Chart6 />
          </Slide>
          <Slide index={6}>
            <Chart7 />
          </Slide>
          <Slide index={7}>
            <Chart8 />
          </Slide>
        </Slider>
        <div className="mb-3">
          <CustomDownloadChartButton />
        </div>
        <nav className="border-t border-gray-200 px-4 flex items-center justify-between sm:px-0">
          <ButtonBack>
            <div className="-mt-px w-0 flex-1 flex">
              <span className="border-t-2 border-transparent pt-4 pr-1 inline-flex items-center text-sm font-medium text-gray-500 hover:text-gray-700 hover:border-gray-300">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  aria-hidden="true"
                  className="ml-3 h-5 w-5 text-gray-400"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M7.707 14.707a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l2.293 2.293a1 1 0 010 1.414z"
                    clipRule="evenodd"
                  />
                </svg>
                Previous
              </span>
            </div>
          </ButtonBack>
          <div className="hidden md:-mt-px md:flex">
            <CustomDot slide={0}></CustomDot>
            <CustomDot slide={1}></CustomDot>
            <CustomDot slide={2}></CustomDot>
            <CustomDot slide={3}></CustomDot>
            <CustomDot slide={4}></CustomDot>
            <CustomDot slide={5}></CustomDot>
            <CustomDot slide={6}></CustomDot>
            <CustomDot slide={7}></CustomDot>
          </div>
          <ButtonNext>
            <div className="-mt-px w-0 flex-1 flex justify-end">
              <span className="border-t-2 border-transparent pt-4 pl-1 inline-flex items-center text-sm font-medium text-gray-500 hover:text-gray-700 hover:border-gray-300">
                Next
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  aria-hidden="true"
                  className="ml-3 h-5 w-5 text-gray-400"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  />
                </svg>
              </span>
            </div>
          </ButtonNext>
        </nav>
      </CarouselProvider>
      <div className="mt-6">
        <a className="underline text-indigo-600" href={`${apiUrl}/report/csv`}>
          Download Raw Rollup Data
        </a>
      </div>
    </Wrapper>
  );
}

export default Carosel;
