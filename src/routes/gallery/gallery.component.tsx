import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';

import { getPhotoLinks } from '~/utils/firebase.utils';
import { selectFolders } from '~/store/gallery/gallery.selector';
import { fetchFoldersStart } from '~/store/gallery/gallery.action';

export const Gallery = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchFoldersStart());
  }, [dispatch]);
  const foldersList = useSelector(selectFolders);
  console.log('dates: ', foldersList);

  const links = getPhotoLinks('q221111', 10);
  return (
    <>
      <h3>Gallery component</h3>
      {foldersList.map((folder) => (
        <div key={folder}>
          <h6>{folder}</h6>
        </div>
      ))}
      {links.map((link, id) => (
        <img key={id} alt='quizphoto' src={link} />
      ))}
    </>
  );
};
