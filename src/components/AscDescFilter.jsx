import React, { useContext, useState } from 'react';
import FilterContext from '../context/FilterContext';

const typeOptions = ['population',
  'orbital_period',
  'diameter',
  'rotation_period',
  'surface_water'];

function AscDescFilter() {
  const { firstFilter, setFirstFilter } = useContext(FilterContext);
  const [organizer, setOrganizer] = useState({
    column: 'population',
    sort: 'ASC',
  });

  function handleChanges({ target }) {
    const { name, value } = target;
    if (name !== 'order') {
      setOrganizer({ ...organizer, column: value });
    } else {
      setOrganizer({ ...organizer, sort: value });
    }
  }

  function handleButton() {
    const { column, sort } = organizer;

    const unknown = firstFilter.filter((el) => el[column] === 'unknown');
    const know = firstFilter.filter((el) => el[column] !== 'unknown');
    let sortedKnow;
    if (sort === 'ASC') {
      sortedKnow = know.sort((a, b) => a[column] - b[column]);
    } else {
      sortedKnow = know.sort((a, b) => b[column] - a[column]);
    }

    setFirstFilter([...sortedKnow, ...unknown]);
  }

  return (
    <div>
      <select
        data-testid="column-sort"
        name="column"
        onChange={ handleChanges }
        value={ organizer.column }
      >
        { typeOptions.map((el) => (
          <option
            key={ el }
          >
            {el}
          </option>)) }
      </select>

      <input
        type="radio"
        data-testid="column-sort-input-asc"
        name="order"
        onChange={ handleChanges }
        value="ASC"
      />
      <label htmlFor="asc">
        {' '}
        ASC
      </label>
      <input
        type="radio"
        data-testid="column-sort-input-desc"
        name="order"
        onChange={ handleChanges }
        value="DESC"
      />
      <label htmlFor="desc">
        {' '}
        DESC
      </label>

      <button
        data-testid="column-sort-button"
        type="button"
        onClick={ handleButton }

      >
        Ordenar
      </button>

    </div>
  );
}

export default AscDescFilter;
