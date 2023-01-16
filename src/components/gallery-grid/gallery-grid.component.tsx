import { useEffect, useMemo, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';

import { Button, BUTTON_CLASSES } from '~/components/button/button.component';
import { Photo } from '~/components/photo/photo.component';
import { Spinner } from '~/components/spinner/spinner.component';

import {
  selectPhotoDate,
  selectPhotoLinks,
  selectPhotosLoading,
} from '~/store/gallery/gallery.selector';
import { selectCurrentUser } from '~/store/user/user.selector';
import { fetchPhotoLinksStart } from '~/store/gallery/gallery.action';

import './gallery-grid.styles.scss';

type GalleryGridProps = {
  enlarge: (arg0: string) => void;
};
export const GalleryGrid = ({ enlarge }: GalleryGridProps) => {
  const dispatch = useDispatch();
  const currentUser = useSelector(selectCurrentUser);
  const photoLinks = useSelector(selectPhotoLinks);
  const photosLoading = useSelector(selectPhotosLoading);
  const photoDate = useSelector(selectPhotoDate);
  const { t } = useTranslation('translation', { keyPrefix: 'gallery' });

  // Creates window of rendered photos, replaces all unrendered photos by empty divs
  const gridRef = useRef<HTMLDivElement>(document.createElement('div'));
  const [start, setStart] = useState(0);
  const [bonusOpened, setBonusOpened] = useState(false);

  const windowWidth = document.documentElement.clientWidth;
  const windowHeight = window.innerHeight;
  const grid = document.querySelector('.gallery__grid');
  type Config = {
    [index: string]: number;
  };
  const config: Config = useMemo(() => {
    const currentConfig: Config = {};
    currentConfig.gridHeight = (function () {
      const navigationComponent = document.querySelector('.navigation');
      const dateSelectComponent = document.querySelector('.dates-select');
      return (
        windowHeight -
        (navigationComponent ? navigationComponent.getBoundingClientRect().height : 100) -
        (dateSelectComponent ? dateSelectComponent.getBoundingClientRect().height : 101)
      );
    })();
    currentConfig.height = (function () {
      const gridWidth = grid
        ? +window.getComputedStyle(grid).width.split('.')[0].replace(/\D/g, '')
        : 0;
      if (windowWidth < 768) return (gridWidth / 3) * 2;
      if (windowWidth < 1440) return (gridWidth - 10) / 3;
      return (gridWidth - 20) / 4.5;
    })();
    currentConfig.visibleRows = Math.round(windowHeight / currentConfig.height + 2);
    currentConfig.photosInRow = (function () {
      if (windowWidth < 768) return 1;
      if (windowWidth < 1440) return 2;
      return 3;
    })();
    return currentConfig;
  }, [windowWidth, windowHeight, grid]);

  const getTopHeight = () => (config.height + 10) * start;
  const getBottomHeight = () => {
    const rowsLeft = photoLinks.length / config.photosInRow - (start + config.visibleRows + 1);
    return config.height * (rowsLeft < 0 ? 0 : rowsLeft);
  };

  useEffect(() => {
    const currentGridRef = gridRef.current;
    const onScroll = (e: Event): void => {
      const target = e.target as HTMLDivElement;
      if (target?.scrollTop) {
        const newStart = Math.floor(target.scrollTop / (config.height + 10)) - 1;
        setStart(newStart < 0 ? 0 : newStart);
      }
    };
    if (currentGridRef) {
      currentGridRef.addEventListener('scroll', onScroll);
    }
    return () => {
      if (currentGridRef) {
        currentGridRef.removeEventListener('scroll', onScroll);
      }
    };
  }, [gridRef, config]);

  const showBonus = () => {
    dispatch(fetchPhotoLinksStart(photoDate, true));
    setBonusOpened(true);
  };
  useEffect(() => setBonusOpened(false), [photoDate]);

  useEffect(() => {
    const enlargeHandler = (e: Event) => {
      if (e.target instanceof HTMLImageElement) {
        enlarge(e.target.alt);
      }
    };
    const ref = gridRef.current;
    ref.addEventListener('click', enlargeHandler);
    return () => {
      ref.removeEventListener('click', enlargeHandler);
    };
  }, [photoLinks, enlarge]);

  return (
    <div
      className='gallery__grid'
      style={{ height: config.gridHeight, overflow: 'auto' }}
      ref={gridRef}
    >
      <div className='gallery__space' style={{ height: getTopHeight() }} />
      {currentUser && photoLinks.length ? (
        photoLinks
          .slice(start * config.photosInRow, (start + config.visibleRows + 1) * config.photosInRow)
          .map((link, id) => (
            <Photo
              key={start * config.photosInRow + id}
              src={link}
              alt={(start * config.photosInRow + id).toString()}
            />
          ))
      ) : (
        <div className='gallery__notification'>{photosLoading ? <Spinner /> : t('noDate')}</div>
      )}
      {photoLinks.length !== 0 && !bonusOpened && (
        <div className='gallery__bonus' style={{ height: config.height + 'px' }}>
          <Button buttonType={BUTTON_CLASSES.apply} onClick={showBonus}>
            {t('bonus')}
          </Button>
        </div>
      )}
      <div className='gallery__space' style={{ height: getBottomHeight() }} />
    </div>
  );
};
