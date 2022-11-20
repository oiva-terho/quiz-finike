import { getPhotoLinks } from '~/utils/firebase.utils';
export const Gallery = () => {
  const links = getPhotoLinks('q221111', 10);
  console.log(links);
  return (
    <div>
      Gallery component
      {links.map((link, id) => (
        <img key={id} alt='quizphoto' src={link} />
      ))}
    </div>
  );
};
