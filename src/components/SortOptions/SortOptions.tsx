import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store';
import { changeSortType } from '../../store/action';
import { SortType } from '../../store/reducer';

const SORT_OPTIONS: SortType[] = ['Popular', 'Price: low to high', 'Price: high to low', 'Top rated first'];

export default function SortOptions(): JSX.Element {
  const dispatch = useDispatch();
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-return
  const currentSortType = useSelector((state: RootState) => state.data.sortType);
  const [isOpen, setIsOpen] = useState(false);

  const handleSortClick = (sortType: SortType) => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-call
    dispatch(changeSortType(sortType));
    setIsOpen(false);
  };

  return (
    <form className="places__sorting" action="#" method="get">
      <span className="places__sorting-caption">Sort by</span>
      <span
        className="places__sorting-type"
        tabIndex={0}
        onClick={() => setIsOpen(!isOpen)}
      >
        {currentSortType}
        <svg className="places__sorting-arrow" width="7" height="4">
          <use xlinkHref="#icon-arrow-select"></use>
        </svg>
      </span>
      <ul className={`places__options places__options--custom ${isOpen ? 'places__options--opened' : ''}`}>
        {SORT_OPTIONS.map((option) => (
          <li
            // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
            key={option}
            className={`places__option ${currentSortType === option ? 'places__option--active' : ''}`}
            tabIndex={0}
            onClick={() => handleSortClick(option)}
          >
            {option}
          </li>
        ))}
      </ul>
    </form>
  );
}

