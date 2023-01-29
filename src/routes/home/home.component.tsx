import { HomeBg } from '~/components/home-bg/home-bg.component';
import { Heroblock } from '~/components/home-hero/home-hero.component';
import { Announcement } from '~/components/announcement/announcement.component';

const Home = () => {
  return (
    <div className='home'>
      <HomeBg />
      <Heroblock />
      <Announcement />
    </div>
  );
};

export default Home;
