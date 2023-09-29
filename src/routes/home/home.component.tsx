import { Heroblock } from '~/components/home-hero/home-hero.component';
import { Announcement } from '~/components/announcement/announcement.component';

export const Home = () => {
  return (
    <div className='home'>
      <Heroblock />
      <Announcement />
    </div>
  );
};
