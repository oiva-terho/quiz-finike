import { FC, ImgHTMLAttributes, useState } from 'react';

import './photo.styles.scss';

export const Photo: FC<ImgHTMLAttributes<HTMLImageElement>> = ({ src }) => {
  const [zoom, setZoom] = useState(false);
  const handleZoom = () => {
    setZoom(zoom ? false : true);
  };
  return (
    <button className={zoom ? 'photo__backing' : 'photo'} onClick={handleZoom}>
      <img src={src} alt='quiz' />
    </button>
  );
};
