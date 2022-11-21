import { FC, ImgHTMLAttributes } from 'react';

import './photo.styles.scss';

export const Photo: FC<ImgHTMLAttributes<HTMLImageElement>> = ({ src }) => (
  <img src={src} alt='quiz' className='photo' />
);
