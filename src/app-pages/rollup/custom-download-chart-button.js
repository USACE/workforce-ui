import { WithStore } from 'pure-react-carousel';
import { useCallback } from 'react';

export default WithStore(
  ({ currentSlide }) => {
    const canvases = document.getElementsByTagName('canvas');
    const handleClick = useCallback(() => {
      const canvas = canvases[currentSlide];
      const lnk = document.createElement('a');
      lnk.download = `workforce-chart-${currentSlide + 1}.png`;
      lnk.href = canvas.toDataURL('image/png;base64');
      const e = new MouseEvent('click', {
        bubbles: false,
        cancelable: true,
        view: window,
      });

      lnk.dispatchEvent(e);
    }, [currentSlide, canvases]);
    return (
      <button
        title="Download current chart as image"
        className="inline-flex items-center p-1 border border-transparent rounded-full shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        onClick={handleClick}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fillRule="evenodd"
            d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z"
            clipRule="evenodd"
          />
        </svg>
      </button>
    );
  },
  (state) => ({
    currentSlide: state.currentSlide,
  })
);
