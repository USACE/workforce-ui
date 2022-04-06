import { WithStore, Dot } from 'pure-react-carousel';
import { useCallback, useEffect } from 'react';

export default WithStore(
  ({ slide, currentSlide, totalSlides, carouselStore }) => {
    const onKeyup = useCallback((e) => {
      if (e.keyCode === 37) {
        //left
        carouselStore.setStoreState({ currentSlide: 2 });
      }
      if (e.keyCode === 39) {
        //right
        carouselStore.setStoreState({ currentSlide: 2 });
      }
    }, []);
    useEffect(() => {
      document.addEventListener('keyup', onKeyup);
      return () => {
        document.removeEventListener('keyup', onKeyup);
      };
    }, [onKeyup]);
    return null;
  },
  (state) => ({ currentSlide: state.currentSlide })
);
