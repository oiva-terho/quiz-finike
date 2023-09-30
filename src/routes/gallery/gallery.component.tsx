import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { DateSelect } from '~/components/date-select/date-select.component';
import { GalleryGrid } from '~/components/gallery-grid/gallery-grid.component';

import { clearPhotos, fetchPhotoLinksStart, setPhotoDate } from '~/store/gallery/gallery.action';
import { selectFolders, selectPhotoDate } from '~/store/gallery/gallery.selector';
import { PhotoSlider } from '~/components/photo-slider/photo-slider.component';

export const Gallery = () => {
  const dispatch = useDispatch();
  const foldersList = useSelector(selectFolders);
  const photoDate = useSelector(selectPhotoDate);
  const [photoToOpen, setPhotoToOpen] = useState('');

  const openDate = (date: string) => {
    dispatch(clearPhotos());
    dispatch(setPhotoDate(date));
    dispatch(fetchPhotoLinksStart(date));
  };

  return (
    <>
      <DateSelect dates={foldersList} currentDate={photoDate} action={openDate} />
      <GalleryGrid enlarge={setPhotoToOpen} />
      {photoToOpen && <PhotoSlider photoToOpen={photoToOpen} setPhotoToOpen={setPhotoToOpen} />}
    </>
  );
};
