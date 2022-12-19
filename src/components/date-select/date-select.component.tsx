import './date-select.styles.scss';

type DateSelectProp = {
  dates: string[] | undefined;
  action: (date: string) => void;
};
export const DateSelect = ({ dates, action }: DateSelectProp) => {
  return (
    <div className='dates-select'>
      <span>Date:</span>
      <select defaultValue='' onChange={(e) => action(e.target.value)}>
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
