import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { ReactComponent as QuizLogo } from '~/assets/finike-quiz.svg';
import { ReactComponent as TelegramLogo } from '~/assets/telegram.svg';
import { ReactComponent as MapLogo } from '~/assets/map.svg';
import { adaptiveClassName } from '~/utils/layout.utils';
import './home-hero.styles.scss';
import { Button } from '../button/button.component';

export const Heroblock = () => {
  const [tagline, setTagline] = useState(0);
  const { t, i18n } = useTranslation('translation', { keyPrefix: 'hero' });
  const heroText = [t('1'), t('2'), t('3'), t('4')];
  useEffect(() => {
    const taglineChange = setInterval(() => {
      setTagline(tagline === 3 ? 0 : tagline + 1);
    }, 5000);
    return () => clearInterval(taglineChange);
  });
  return (
    <div className='home-hero'>
      <Button
        type='submit'
        id='lang'
        onClick={() => {
          i18n.changeLanguage(i18n.resolvedLanguage === 'en' ? 'ru' : 'en');
        }}
      >
        <span>{i18n.resolvedLanguage === 'en' ? 'ru' : 'en'}</span>
      </Button>
      <QuizLogo />
      {heroText.map((text, key) => {
        return (
          <p
            className={adaptiveClassName({
              counter: tagline,
              key: key,
              maxQuantity: heroText.length,
            })}
            key={key}
          >
            {text}
          </p>
        );
      })}
      <a className='home-hero__map' href='https://goo.gl/maps/qYo4d3hvxq9kt3a69'>
        <MapLogo />
        <span>{t('finike')}</span>
      </a>
      <a className='home-hero__tg' href='https://t.me/finikequiz'>
        <span>{t('chat')}</span>
        <TelegramLogo />
      </a>
    </div>
  );
};
