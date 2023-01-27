import { ReactComponent as Vs } from '~/assets/vs.svg';
import './best-rival.styles.scss';

type BestRivalProps = {
  teamName: string;
  win: number;
  loose: number;
  rival: string;
};
export const BestRival = ({ teamName, win, loose, rival }: BestRivalProps) => {
  return (
    <div className='best-rival'>
      <div className='best-rival__teams'>
        <span>{teamName}</span>
        <span>{rival}</span>
      </div>
      <span className='best-rival__vs'>vs.</span>
      <Vs />
      <div className='best-rival__scores'>
        <span>{win}</span>
        <span>{loose}</span>
      </div>
    </div>
  );
};
