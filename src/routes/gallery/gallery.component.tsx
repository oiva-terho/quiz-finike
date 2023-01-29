import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';

import { DateSelect } from '~/components/date-select/date-select.component';
import { Nouser } from '~/components/nouser/nouser.component';
import { GalleryGrid } from '~/components/gallery-grid/gallery-grid.component';

import { clearPhotos, fetchPhotoLinksStart, setPhotoDate } from '~/store/gallery/gallery.action';
import { selectFolders, selectPhotoDate } from '~/store/gallery/gallery.selector';
import { selectCurrentUser } from '~/store/user/user.selector';
import { PhotoSlider } from '~/components/photo-slider/photo-slider.component';

const Gallery = () => {
  const dispatch = useDispatch();
  const currentUser = useSelector(selectCurrentUser);
  const foldersList = useSelector(selectFolders);
  const photoDate = useSelector(selectPhotoDate);
  const { t } = useTranslation('translation', { keyPrefix: 'gallery' });
  const [photoToOpen, setPhotoToOpen] = useState('');

  const openDate = (date: string) => {
    dispatch(clearPhotos());
    dispatch(setPhotoDate(date));
    dispatch(fetchPhotoLinksStart(date));
  };

  if (!currentUser) return <Nouser location={t('gallery')} />;
  return (
    <>
      <DateSelect dates={foldersList} currentDate={photoDate} action={openDate} />
      <GalleryGrid enlarge={setPhotoToOpen} />
      {photoToOpen && <PhotoSlider photoToOpen={photoToOpen} setPhotoToOpen={setPhotoToOpen} />}
    </>
  );
};

export default Gallery;
