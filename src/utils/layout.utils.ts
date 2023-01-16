const minColor = [255, 255, 203];
const midColor = [252, 81, 159];
const maxColor = [187, 3, 237];

type AdaptiveClassNameProps = {
  [key: string]: number;
};
export const adaptiveClassName = ({
  counter,
  key,
  maxQuantity,
}: AdaptiveClassNameProps): string => {
  if (counter === key) {
    return 'active';
  } else if (counter === key + 1 || (key === maxQuantity - 1 && counter === 0)) {
    return 'outgoing';
  } else return '';
};

type CountResColorProps = {
  [key: string]: number;
};
export const countResColor = ({ min, max, score }: CountResColorProps): string => {
  const mid = Math.round((max - min) / 2);
  const rgb = (arr: number[]) => `rgb(${arr.toString()})`;
  if (score === min) return rgb(minColor);
  if (score === mid) return rgb(midColor);
  if (score === max) return rgb(maxColor);

  const findColor = (color1: number[], color2: number[], offset: number) => {
    const newColor = color1.map((c, i) => {
      return c + Math.round((Math.round(color2[i] - c) / mid) * offset);
    });
    return newColor;
  };

  if (score < mid) return rgb(findColor(minColor, midColor, score - min));
  if (score > mid) return rgb(findColor(midColor, maxColor, score - (min + mid)));
  return '#999';
};

export function debounce(callback: (...args: any[]) => any, delay = 600) {
  let timer: ReturnType<typeof setTimeout> | undefined;
  return (...args: any[]) => {
    if (timer) {
      clearTimeout(timer);
    }
    timer = setTimeout(() => callback(...args), delay);
  };
}
