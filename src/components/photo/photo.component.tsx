import { FC, ImgHTMLAttributes } from 'react';

import './photo.styles.scss';

export const Photo: FC<ImgHTMLAttributes<HTMLImageElement>> = ({ src, alt = 'quiz' }) => {
  return (
    <div className='photo'>
      <img src={src} alt={alt} />
    </div>
  );
};
