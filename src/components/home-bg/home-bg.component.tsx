import { useEffect, useState } from 'react';

import { adaptiveClassName } from '~/utils/layout.utils';
import './home-bg.styles.scss';

const bgQuantity = new Array(8).fill('');

export const HomeBg = () => {
  const [bgImg, setBgImg] = useState(0);

  useEffect(() => {
    const bgChange = setInterval(() => {
      setBgImg(bgImg === 7 ? 0 : bgImg + 1);
    }, 12000);
    return () => clearInterval(bgChange);
  }, [bgImg]);

  return (
    <div className='home-bg'>
      {bgQuantity.map(([,], i) => (
        <img
          className={adaptiveClassName({ counter: bgImg, key: i, maxQuantity: bgQuantity.length })}
          key={i}
          alt='background'
          src={`/assets/hero${i + 1}.webp`}
        />
      ))}
    </div>
  );
};
