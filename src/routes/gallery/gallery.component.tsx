import { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { Button } from '~/components/button/button.component';
import { Photo } from '~/components/photo/photo.component';
import { Spinner } from '~/components/spinner/spinner.component';
import { fetchPhotoLinksStart } from '~/store/gallery/gallery.action';

import {
  selectFolders,
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
  const openDate = (date: string) => {
    dispatch(fetchPhotoLinksStart(date));
    gridRef.current.scrollTop = 0;
    setStart(0);
  };

  const gridRef = useRef<HTMLDivElement>(document.createElement('div'));
  const [start, setStart] = useState(0);

  const height = 400;
  const visibleRows = Math.round(window.innerHeight / height);
  const photosInRow = Math.ceil(window.innerWidth / 639);

  const getTopHeight = () => height * start;
  const getBottomHeight = () => height * (photoLinks.length / photosInRow - (start + visibleRows));

  const onScroll = (e: Event): void => {
    const target = e.target as HTMLDivElement;
    if (target?.scrollTop) {
      setStart(Math.floor(target.scrollTop / height));
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

  return (
    <>
      <div className='gallery__dates'>
        {currentUser ? (
          foldersList.map((folder) => (
            <Button key={folder} onClick={() => openDate(folder)}>
              {`${folder.slice(5, 7)}.${folder.slice(3, 5)}.20${folder.slice(1, 3)}`}
            </Button>
          ))
        ) : (
          <span>Log in to watch the gallery</span>
        )}
      </div>
      <div
        className='gallery__grid'
        style={{ height: window.innerHeight - 140, overflow: 'auto' }}
        ref={gridRef}
      >
        <div className='gallery__space' style={{ height: getTopHeight() }} />
        {currentUser && photoLinks.length !== 0 ? (
          photoLinks
            .slice(start * photosInRow, (start + visibleRows + 1) * photosInRow)
            .map((link, id) => <Photo key={start * photosInRow + id} src={link} />)
        ) : (
          <div className='gallery__notification'>
            {photosLoading ? <Spinner /> : 'Choose the date'}
          </div>
        )}
        <div className='gallery__space' style={{ height: getBottomHeight() }} />
      </div>
    </>
  );
};
