import { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button, BUTTON_CLASSES } from '~/components/button/button.component';
import { DateSelect } from '~/components/date-select/date-select.component';
import { useTranslation } from 'react-i18next';

import { Nouser } from '~/components/nouser/nouser.component';
import { Photo } from '~/components/photo/photo.component';
import { Spinner } from '~/components/spinner/spinner.component';
import { clearPhotos, fetchPhotoLinksStart, setPhotoDate } from '~/store/gallery/gallery.action';

import {
  selectFolders,
  selectPhotoDate,
  selectPhotoLinks,
  selectPhotosLoading,
} from '~/store/gallery/gallery.selector';
import { selectCurrentUser } from '~/store/user/user.selector';

import './gallery.styles.scss';

export const Gallery = () => {
  const dispatch = useDispatch();
  const currentUser = useSelector(selectCurrentUser);
  const foldersList = useSelector(selectFolders);
  const photoLinks = useSelector(selectPhotoLinks);
  const photosLoading = useSelector(selectPhotosLoading);
  const photoDate = useSelector(selectPhotoDate);
  const { t } = useTranslation('translation', { keyPrefix: 'gallery' });

  // Creates window of rendered photos, changes all unrendered photos by empty divs
  const gridRef = useRef<HTMLDivElement>(document.createElement('div'));
  const [start, setStart] = useState(0);
  const [bonusOpened, setBonusOpened] = useState(false);

  const navigationComponent = document.querySelector('.navigation');
  const dateSelectComponent = document.querySelector('.dates-select');
  const gridHeight =
    window.innerHeight -
    (navigationComponent ? navigationComponent.getBoundingClientRect().height : 100) -
    (dateSelectComponent ? dateSelectComponent.getBoundingClientRect().height : 101);

  const grid = document.querySelector('.gallery__grid');
  const gridWidth = grid
    ? +window.getComputedStyle(grid).width.split('.')[0].replace(/\D/g, '')
    : 0;
  const windowWidth = document.documentElement.clientWidth;
  const height = (function () {
    // Checks how many photos on screen depending on media rulles and
    // conts photo height on 3/2 aspect ratio. 10 = photo gap in px
    if (windowWidth < 768) return (gridWidth / 3) * 2;
    if (windowWidth < 1440) return (gridWidth - 10) / 3;
    return (gridWidth - 20) / 4.5;
  })();
  const visibleRows = Math.round(window.innerHeight / height + 2);
  const photosInRow = (function () {
    if (windowWidth < 768) return 1;
    if (windowWidth < 1440) return 2;
    return 3;
  })();
  const getTopHeight = () => (height + 10) * start;
  const getBottomHeight = () => {
    const rowsLeft = photoLinks.length / photosInRow - (start + visibleRows + 1);
    return height * (rowsLeft < 0 ? 0 : rowsLeft);
  };

  const onScroll = (e: Event): void => {
    const target = e.target as HTMLDivElement;
    if (target?.scrollTop) {
      const newStart = Math.floor(target.scrollTop / (height + 10)) - 1;
      setStart(newStart < 0 ? 0 : newStart);
    }
  };

  useEffect(() => {
    const currentGridRef = gridRef.current;
    if (currentGridRef) {
      currentGridRef.addEventListener('scroll', onScroll);
    }
    return () => {
      if (currentGridRef) {
        currentGridRef.removeEventListener('scroll', onScroll);
      }
    };
  });

  const openDate = (date: string) => {
    dispatch(clearPhotos());
    dispatch(setPhotoDate(date));
    dispatch(fetchPhotoLinksStart(date));
    gridRef.current.scrollTop = 0;
    setStart(0);
  };

  const showBonus = () => {
    setBonusOpened(true);
    dispatch(fetchPhotoLinksStart(photoDate, true));
  };

  if (!currentUser) return <Nouser location={t('gallery')} />;
  return (
    <>
      <DateSelect dates={foldersList} currentDate={photoDate} action={openDate} />
      <div className='gallery__grid' style={{ height: gridHeight, overflow: 'auto' }} ref={gridRef}>
        <div className='gallery__space' style={{ height: getTopHeight() }} />
        {currentUser && photoLinks.length !== 0 ? (
          photoLinks
            .slice(start * photosInRow, (start + visibleRows + 1) * photosInRow)
            .map((link, id) => <Photo key={start * photosInRow + id} src={link} />)
        ) : (
          <div className='gallery__notification'>{photosLoading ? <Spinner /> : t('noDate')}</div>
        )}
        {photoLinks.length && !bonusOpened ? (
          <Button buttonType={BUTTON_CLASSES.apply} onClick={showBonus}>
            {t('bonus')}
          </Button>
        ) : null}
        <div className='gallery__space' style={{ height: getBottomHeight() }} />
      </div>
    </>
  );
};
