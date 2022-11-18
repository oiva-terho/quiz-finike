import { getDownloadURL, listAll, list } from 'firebase/storage';
import { storageRef } from '~/utils/firebase.utils';

export const Gallery = () => {
  listAll(storageRef)
    .then((res) => {
      res.prefixes.forEach((folderRef) => {
        list(folderRef, { maxResults: 4 }).then((res) => {
          res.prefixes.forEach((folderRef) => {
            console.log('folderRef', folderRef);
          });
          res.items.forEach((itemRef) => {
            getDownloadURL(itemRef).then((url) => console.log(url));
          });
        });
      });
    })
    .catch((error) => {
      console.log('error', error);
    });
  return <div>Gallery component</div>;
};
