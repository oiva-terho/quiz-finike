import { useTranslation } from 'react-i18next';

import { ReactComponent as QuizLogo } from '~/assets/finike-quiz.svg';
import { ReactComponent as TelegramLogo } from '~/assets/telegram.svg';
import { ReactComponent as ArrowDown } from '~/assets/arrow-down.svg';
import './home-hero.styles.scss';
import { Button } from '../button/button.component';

export const Heroblock = () => {
  const { t, i18n } = useTranslation('translation', { keyPrefix: 'hero' });
  return (
    <section className='home-hero'>
      <div className='home-hero-shadow' />
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
      <div className='home-hero-text'>
        <p>Квиз - интеллектуальная командная игра, полтора-два часа бурного общения и эмоций.</p>
        <p>Но квиз в Финике - нечто большее.</p>
      </div>
      <a className='home-hero__tg' href='https://t.me/finikequiz'>
        <TelegramLogo />
        <span>{t('chat')}</span>
      </a>
      <ArrowDown id='arrow' />
    </section>
  );
};
