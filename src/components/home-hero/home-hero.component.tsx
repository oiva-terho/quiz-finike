import { useEffect, useState } from 'react';

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
    }, 4000);
    return () => clearInterval(taglineChange);
  });
  return (
    <div className='home-hero'>
      <h1>FINIKE QUIZ IS</h1>
      <p>{heroText[tagline]}</p>
    </div>
  );
};
