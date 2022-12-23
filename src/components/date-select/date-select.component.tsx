import './date-select.styles.scss';

type DateSelectProp = {
  dates: string[] | undefined;
  currentDate: string;
  action: (date: string) => void;
};
export const DateSelect = ({ dates, currentDate, action }: DateSelectProp) => {
  return (
    <div className='dates-select'>
      <span>Date:</span>
      <select defaultValue={currentDate} onChange={(e) => action(e.target.value)}>
        <option value=''>-</option>
        {dates?.length
          ? [...dates]?.reverse().map((date) => (
              <option key={date} value={date}>
                {`${date.slice(4, 6)}.${date.slice(2, 4)}.20${date.slice(0, 2)}`}
              </option>
            ))
          : null}
      </select>
    </div>
  );
};
