import { useSelector } from 'react-redux';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Keyboard, Mousewheel } from 'swiper';

import { selectPhotoLinks } from '~/store/gallery/gallery.selector';

import './photo-slider.styles.scss';
import 'swiper/css/bundle';
import { Swiper as SwiperClass } from 'swiper/types';

type PhotoSliderProps = {
  photoToOpen: string;
  setPhotoToOpen: (arg0: string) => void;
};
export const PhotoSlider = ({ photoToOpen, setPhotoToOpen }: PhotoSliderProps) => {
  const photoLinks = useSelector(selectPhotoLinks);

  // const photos = photoLinks.slice(+photoToOpen - 2, +photoToOpen + 3);
  // const checkBorders = (n: number) => {
  //   const l = photoLinks.length;
  //   if (n >= l) return 0;
  //   if (n < 0) return l - 1;
  //   return n;
  // };
  // const changePphoto = (swiper: SwiperClass) => {
  //   const n = swiper.previousIndex > swiper.activeIndex ? +photoToOpen + 1 : +photoToOpen - 1;
  //   setPhotoToOpen(checkBorders(n).toString());
  //   swiper.slideTo(2);
  // };

  const keybordHandler = (_swiper: SwiperClass, key: string) => {
    if (+key === 27) return setPhotoToOpen('');
    return;
  };

  return (
    <div className='photo-slider'>
      <Swiper
        modules={[Keyboard, Mousewheel]}
        keyboard={{ enabled: true }}
        mousewheel
        onKeyPress={keybordHandler}
        // onActiveIndexChange={changePphoto}
        onAfterInit={(swiper) => swiper.slideTo(+photoToOpen, 0)}
      >
        {photoLinks.map((link, n) => (
          <SwiperSlide key={n} onClick={() => setPhotoToOpen('')}>
            <img src={link} alt={n.toString()} />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};
