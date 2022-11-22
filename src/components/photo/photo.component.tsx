import { FC, ImgHTMLAttributes } from 'react';

import './photo.styles.scss';

export const Photo: FC<ImgHTMLAttributes<HTMLImageElement>> = ({ src }) => (
  <div className='photo'>
    <img src={src} alt='quiz' loading='lazy' />
  </div>
);
