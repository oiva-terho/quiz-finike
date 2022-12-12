type AdaptiveClassName = {
  [key: string]: number;
};
export const adaptiveClassName = ({ counter, key, maxQuantity }: AdaptiveClassName): string => {
  if (counter === key) {
    return 'active';
  } else if (counter === key + 1 || (key === maxQuantity - 1 && counter === 0)) {
    return 'outgoing';
  } else return '';
};
