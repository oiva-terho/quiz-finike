import { Trans, useTranslation } from 'react-i18next';

import { ReactComponent as MapLogo } from '~/assets/map.svg';
import './announcement.styles.scss';
import { useEffect, useState } from 'react';
import { getFirebaseDoc } from '~/utils/firebase.utils';

interface AnnouncementDB {
  date: string;
  place: string;
  address: string;
  map: string;
  time: string;
  price: number;
}
type AnnouncementDate = { day: string; ordinal: string; month: string; weekday: string };
interface AnnouncementCash extends Omit<AnnouncementDB, 'date'> {
  date: AnnouncementDate;
}

export const Announcement = () => {
  const { t, i18n } = useTranslation('translation', { keyPrefix: 'announcement' });
  const [nextGame, setNextGame] = useState<AnnouncementCash>();
  useEffect(() => {
    const cashedData = localStorage.getItem('nextGame');

    const countNextGameDay = (date: string): AnnouncementDate => {
      const currentYear = new Date().getFullYear();
      const [day, month] = date.split('.').map(Number);
      const weekday = new Date(currentYear, month - 1, day).getDay();
      const fingOrdinal = (number: number) => {
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
      return {
        day: day.toString(),
        ordinal: fingOrdinal(day),
        month: month.toString(),
        weekday: weekday.toString(),
      };
    };
    // Check if there is a cached date
    if (cashedData) {
      const { announcementCash, timestamp } = JSON.parse(cashedData);
      const oneDayInMilliseconds = 24 * 60 * 60 * 1000;
      if (new Date().getTime() - timestamp <= oneDayInMilliseconds) {
        setNextGame(announcementCash);
        console.log('Using cached data:', announcementCash);
        return;
      }
    }

    // If data is not in cache or expired, fetch it and update the cache
    getFirebaseDoc('updatable', 'announcement').then((fetchedDate) => {
      // Return if there is no games planned
      if (fetchedDate?.date === 'none') {
        return setNextGame(undefined);
      }
      const currentTime = new Date().getTime();
      const gameDay = countNextGameDay(fetchedDate?.date);
      const announcementCash: AnnouncementCash = {
        ...(fetchedDate as AnnouncementDB),
        date: gameDay,
      };
      localStorage.setItem(
        'nextGame',
        JSON.stringify({ announcementCash, timestamp: currentTime }),
      );
      setNextGame(announcementCash as AnnouncementCash);
      console.log('Fetched and cached data:', fetchedDate);
    });
  }, []);

  return (
    <section className='announcement'>
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
      {nextGame ? (
        <div className='announcement__plate'>
          <h2>
            {i18n.resolvedLanguage === 'en'
              ? `${t(`months.${nextGame.date.month}`)} ${nextGame.date.day}${nextGame.date.ordinal}`
              : `${nextGame.date.day} ${t(`months.${nextGame.date.month}`)}`}
          </h2>
          <div>
            {t(`weekdays.${nextGame.date.weekday}`).toLocaleUpperCase()} | {nextGame.time}
          </div>
          <a href={nextGame.map}>
            <MapLogo />
            <div>
              <div className='announcement__plate_pub'>{nextGame.place}</div>
              <div className='announcement__plate_addr'>{nextGame.address}</div>
            </div>
          </a>
          <div>
            {t('cost')}
            <span>{nextGame.price}₺</span>
          </div>
        </div>
      ) : (
        <div className='announcement__plate'>
          <h2 className='announcement__plate-nogame'><Trans i18nKey={'multilane'}>{t('nogame')}</Trans></h2>
        </div>
      )}
      <a href='https://t.me/finikequiz'>{t('play')}</a>
    </section>
  );
};
