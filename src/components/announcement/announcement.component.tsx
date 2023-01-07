import { useTranslation } from 'react-i18next';

import { ReactComponent as MapLogo } from '~/assets/map.svg';
import './announcement.styles.scss';

export const Announcement = () => {
  const { t, i18n } = useTranslation('translation', { keyPrefix: 'announcement' });

  const today = new Date();

  const nextGame = () => {
    const nextFriday = () => {
      const weekday = today.getDay();
      if (weekday === 5) return today;
      return new Date(
        today.setDate(today.getDate() + (5 - weekday < 0 ? 5 - weekday + 7 : 5 - weekday)),
      );
    };
    const month = nextFriday().getMonth().toString();
    const day = nextFriday().getDate();
    const ordinal = (number: number) => {
      switch (number) {
        case 1:
          return 'st';
        case 2:
          return 'nd';
        case 3:
          return 'rd';
        default:
          return 'th';
      }
    };
    return i18n.resolvedLanguage === 'en'
      ? `${t(`months.${month}`)} ${day}${ordinal(day)}`
      : `${day} ${t(`months.${month}`)}`;
  };

  return (
    <div className='announcement'>
      <h3>{t('nextGame')}</h3>
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
        <h2>{nextGame()}</h2>
        <div>{t('friday')} | 19:30</div>
        <a href='https://goo.gl/maps/qYo4d3hvxq9kt3a69'>
          <MapLogo />
          Hanımeli Cafe
        </a>
        <div>
          {t('cost')}
          <span>70₺</span>
        </div>
      </div>
      <a href='https://t.me/finikequiz'>{t('play')}</a>
    </div>
  );
};
