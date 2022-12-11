import { useEffect, useState } from 'react';

import './home-bg.styles.scss';

//preload bg images
for (let i = 1; i < 9; i++) {
  const img = new Image();
  img.src = `/src/assets/hero${i}.webp`;
}

export const HomeBg = () => {
  const [bgImg, setBgImg] = useState(1);

  useEffect(() => {
    const bgChange = setInterval(() => {
      setBgImg(bgImg === 8 ? 1 : bgImg + 1);
    }, 10000);
    return () => clearInterval(bgChange);
  });

  return (
    <div className='home-bg' style={{ backgroundImage: `url('/src/assets/hero${bgImg}.webp')` }} />
  );
};
