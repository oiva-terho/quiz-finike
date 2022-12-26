import { useEffect, useState } from 'react';

import { ReactComponent as QuizLogo } from '~/assets/finike-quiz.svg';
import { ReactComponent as TelegramLogo } from '~/assets/telegram.svg';
import { ReactComponent as MapLogo } from '~/assets/map.svg';
import { adaptiveClassName } from '~/utils/layout.utils';
import './home-hero.styles.scss';

const heroText = [
  'Mind game for everyone',
  'Warm-up for brain: 60 - 80 questions about everything',
  'Reason to get together: more opinions - higher chances',
  'Atmosphere of fun and good competition',
];

export const Heroblock = () => {
  const [tagline, setTagline] = useState(0);

  useEffect(() => {
    const taglineChange = setInterval(() => {
      setTagline(tagline === 3 ? 0 : tagline + 1);
    }, 5000);
    return () => clearInterval(taglineChange);
  });
  return (
    <div className='home-hero'>
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
        <span>Finike</span>
      </a>
      <a className='home-hero__tg' href='https://t.me/finikequiz'>
        <span>Our chat</span>
        <TelegramLogo />
      </a>
    </div>
  );
};
