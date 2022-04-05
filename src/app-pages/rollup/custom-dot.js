import { WithStore, Dot } from 'pure-react-carousel';

export default WithStore(
  ({ slide, currentSlide }) => {
    const className =
      slide === currentSlide
        ? 'border-indigo-500 text-indigo-600 border-t-2 pt-4 px-4 inline-flex items-center text-sm font-medium'
        : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 border-t-2 pt-4 px-4 inline-flex items-center text-sm font-medium';
    return (
      <Dot slide={slide} className={className}>
        {slide + 1}
      </Dot>
    );
  },
  (state) => ({ currentSlide: state.currentSlide })
);
