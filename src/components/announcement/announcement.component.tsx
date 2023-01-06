import { ReactComponent as MapLogo } from '~/assets/map.svg';
import './announcement.styles.scss';

export const Announcement = () => {
  return (
    <div className='announcement'>
      <div className='announcement__continetns'>
        <img src='/assets/announcement/nthamerica.webp' alt='' />
        <img src='/assets/announcement/sthamerica.webp' alt='' />
        <img src='/assets/announcement/europe.webp' alt='' />
        <img src='/assets/announcement/africa.webp' alt='' />
      </div>
      <div className='announcement__clouds'>
        <div />
        <div />
        <div />
        <div />
      </div>
      <div className='announcement__plate'>
        <h2>21 октября</h2>
        <div>ПЯТНИЦА | 19:30</div>
        <a href='https://goo.gl/maps/qYo4d3hvxq9kt3a69'>
          <MapLogo />
          &nbsp; Hanımeli cafe
        </a>
        <div>
          Стоимость участия <span>70₺</span>
        </div>
      </div>
      <a href='https://t.me/finikequiz'>t.me/finikequiz</a>
      <div className='announcement__decor'>
        <img src='/assets/announcement/rocks.webp' alt='' />
        <img src='/assets/announcement/leafs-bk.webp' alt='' />
        <img src='/assets/announcement/oranges.webp' alt='' />
        <img src='/assets/announcement/leafs-fr.webp' alt='' />
      </div>
    </div>
  );
};
