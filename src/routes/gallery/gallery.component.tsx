import { useDispatch, useSelector } from 'react-redux';

import { Button } from '~/components/button/button.component';
import { Photo } from '~/components/photo/photo.component';
import { fetchPhotoLinksStart } from '~/store/gallery/gallery.action';

import { selectFolders, selectPhotoLinks } from '~/store/gallery/gallery.selector';
import { selectCurrentUser } from '~/store/user/user.selector';

import './gallery.styles.scss';

export const Gallery = () => {
  const dispatch = useDispatch();
  const currentUser = useSelector(selectCurrentUser);
  const foldersList = useSelector(selectFolders);
  const photoLinks = useSelector(selectPhotoLinks);

  const openDate = (date: string) => {
    dispatch(fetchPhotoLinksStart(date, 9));
  };

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
      <div className='gallery__grid'>
        {currentUser && photoLinks.length !== 0 ? (
          photoLinks.map((link, id) => <Photo key={id} src={link} />)
        ) : (
          <span>Choose the date</span>
        )}
      </div>
    </>
  );
};
