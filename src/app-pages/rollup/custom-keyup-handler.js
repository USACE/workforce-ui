import { WithStore } from 'pure-react-carousel';
import { useCallback, useEffect } from 'react';

export default WithStore(
  ({ currentSlide, totalSlides, carouselStore }) => {
    const onKeyup = useCallback(
      (e) => {
        if (e.keyCode === 37) {
          if (currentSlide > 0) {
            carouselStore.setStoreState({ currentSlide: currentSlide - 1 });
          }
        }
        if (e.keyCode === 39) {
          if (currentSlide < totalSlides - 1) {
            carouselStore.setStoreState({ currentSlide: currentSlide + 1 });
          }
        }
      },
      [carouselStore, currentSlide, totalSlides]
    );
    useEffect(() => {
      document.addEventListener('keyup', onKeyup);
      return () => {
        document.removeEventListener('keyup', onKeyup);
      };
    }, [onKeyup]);
    return null;
  },
  (state) => ({
    currentSlide: state.currentSlide,
    totalSlides: state.totalSlides,
  })
);
