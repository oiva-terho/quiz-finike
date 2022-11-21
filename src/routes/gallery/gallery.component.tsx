import { useDispatch, useSelector } from 'react-redux';
import { Button } from '~/components/button/button.component';
import { Photo } from '~/components/photo/photo.component';
import { fetchPhotoLinksStart } from '~/store/gallery/gallery.action';

import { selectFolders, selectPhotoLinks } from '~/store/gallery/gallery.selector';
import { selectCurrentUser } from '~/store/user/user.selector';

export const Gallery = () => {
  const dispatch = useDispatch();
  const currentUser = useSelector(selectCurrentUser);
  const foldersList = useSelector(selectFolders);
  const photoLinks = useSelector(selectPhotoLinks);

  const openDate = async (date: string) => {
    dispatch(fetchPhotoLinksStart(date, 10));
  };
  return (
    <>
      <h3>Gallery component</h3>
      {currentUser ? (
        foldersList.map((folder) => (
          <Button key={folder} onClick={() => openDate(folder)}>
            {`${folder.slice(5, 7)}.${folder.slice(3, 5)}.20${folder.slice(1, 3)}`}
          </Button>
        ))
      ) : (
        <span>Log in to watch the gallery</span>
      )}
      {currentUser && photoLinks.length !== 0
        ? photoLinks.map((link, id) => <Photo key={id} src={link} />)
        : null}
    </>
  );
};
