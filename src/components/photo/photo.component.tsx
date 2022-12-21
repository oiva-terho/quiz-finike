import { FC, ImgHTMLAttributes, useState } from 'react';

import './photo.styles.scss';

export const Photo: FC<ImgHTMLAttributes<HTMLImageElement>> = ({ src }) => {
  const [zoom, setZoom] = useState(false);
  return (
    <button
      className={zoom ? 'photo__backing' : 'photo'}
      onClick={() => setZoom(zoom ? false : true)}
    >
      <img src={src} alt='quiz' />
    </button>
  );
};
