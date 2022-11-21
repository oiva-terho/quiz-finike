import { FC, ImgHTMLAttributes } from 'react';

export const Photo: FC<ImgHTMLAttributes<HTMLImageElement>> = ({ src }) => (
  <img src={src} alt='quiz' className='photo' />
);
