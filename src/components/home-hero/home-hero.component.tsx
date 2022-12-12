import { useEffect, useState } from 'react';

import { ReactComponent as QuizLogo } from '/public/finike-quiz.svg';
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
    </div>
  );
};
